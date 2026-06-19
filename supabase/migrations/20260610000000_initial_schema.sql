-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email varchar(255) UNIQUE NOT NULL,
  username varchar(50) UNIQUE,
  avatar_url text,
  credit_balance int DEFAULT 0,
  free_generations_used int DEFAULT 0,
  free_generations_reset_at timestamptz DEFAULT now(),
  total_generations int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users RLS policies
CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- 2. PROJECTS TABLE (without voice_profile_id FK first)
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  description text,
  project_type varchar(50) NOT NULL CHECK (project_type IN ('defi', 'nft', 'dao', 'infrastructure', 'gamefi', 'other')),
  tone_setting int DEFAULT 50 CHECK (tone_setting >= 0 AND tone_setting <= 100),
  voice_profile_id uuid, -- Will link to voice_profiles.id later
  platforms text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects RLS policies
CREATE POLICY "Users can manage own projects" 
ON public.projects FOR ALL 
USING (auth.uid() = user_id);

-- 3. SOCIAL ACCOUNTS TABLE
CREATE TABLE public.user_social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform varchar(20) NOT NULL CHECK (platform IN ('discord')),
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  discord_webhook_url text,
  handle varchar(100),
  twitter_id varchar(100),
  is_connected boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

ALTER TABLE public.user_social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own social accounts"
ON public.user_social_accounts FOR ALL
USING (auth.uid() = user_id);

-- 4. VOICE_PROFILES TABLE
CREATE TABLE public.voice_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  training_data text,
  characteristics jsonb DEFAULT '{}'::jsonb,
  system_prompt text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key back to projects for circular dependency
ALTER TABLE public.projects 
ADD CONSTRAINT fk_projects_voice_profile 
FOREIGN KEY (voice_profile_id) 
REFERENCES public.voice_profiles(id) 
ON DELETE SET NULL;

-- Enable RLS on voice_profiles
ALTER TABLE public.voice_profiles ENABLE ROW LEVEL SECURITY;

-- Voice Profiles RLS policies
CREATE POLICY "Users can manage own voice profiles" 
ON public.voice_profiles FOR ALL 
USING (
  project_id IN (
    SELECT id FROM public.projects WHERE user_id = auth.uid()
  )
);

-- 4. TEMPLATES TABLE
CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  description text,
  platform varchar(20) NOT NULL CHECK (platform IN ('twitter', 'discord', 'telegram', 'blog', 'newsletter', 'farcaster', 'reddit')),
  content_type varchar(50) NOT NULL,
  category varchar(50) NOT NULL,
  default_prompt text NOT NULL,
  system_message text,
  variables jsonb DEFAULT '{}'::jsonb,
  example_output text,
  is_premium boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on templates
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Templates RLS policies (Viewable by everyone)
CREATE POLICY "Templates are viewable by everyone" 
ON public.templates FOR SELECT 
USING (true);

-- 5. CONTENT_PIECES TABLE
CREATE TABLE public.content_pieces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  template_id uuid REFERENCES public.templates(id) ON DELETE SET NULL,
  platform varchar(20) NOT NULL CHECK (platform IN ('twitter', 'discord', 'telegram', 'blog', 'newsletter', 'farcaster', 'reddit')),
  content_type varchar(50) NOT NULL,
  title varchar(200),
  body text NOT NULL,
  status varchar(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  metadata jsonb DEFAULT '{}'::jsonb,
  ai_model_used varchar(50) NOT NULL,
  tokens_used int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on content_pieces
ALTER TABLE public.content_pieces ENABLE ROW LEVEL SECURITY;

-- Content Pieces RLS policies
CREATE POLICY "Users can manage project content" 
ON public.content_pieces FOR ALL 
USING (
  project_id IN (
    SELECT id FROM public.projects WHERE user_id = auth.uid()
  )
);

-- 6. PAYMENTS TABLE
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  nowpayments_id varchar(100),
  tx_hash varchar(100),
  amount_usd numeric(10,2) NOT NULL,
  credits_purchased int NOT NULL,
  currency varchar(10) DEFAULT 'usdc',
  network varchar(20) DEFAULT 'solana',
  status varchar(20) NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(nowpayments_id)
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Payments RLS policies
CREATE POLICY "Users can view own payments" 
ON public.payments FOR SELECT 
USING (auth.uid() = user_id);

-- 7. USER SYNC TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, avatar_url, credit_balance, free_generations_used)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'preferred_username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    0,
    0
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. ADD CREDITS FUNCTION
CREATE OR REPLACE FUNCTION public.add_credits(user_id uuid, amount int)
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET credit_balance = credit_balance + amount,
      updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. DEDUCT CREDIT FUNCTION
CREATE OR REPLACE FUNCTION public.deduct_credit(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET credit_balance = credit_balance - 1,
      total_generations = total_generations + 1,
      updated_at = now()
  WHERE id = user_id AND credit_balance > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. INCREMENT FREE USAGE FUNCTION
CREATE OR REPLACE FUNCTION public.increment_free_usage(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET free_generations_used = free_generations_used + 1,
      total_generations = total_generations + 1,
      updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. PUBLISH CONTENT FUNCTION
CREATE OR REPLACE FUNCTION public.publish_content(content_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.content_pieces
  SET status = 'published',
      updated_at = now()
  WHERE id = content_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. PERFORMANCE INDEXES
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_voice_profiles_project_id ON public.voice_profiles(project_id);
CREATE INDEX idx_content_pieces_project_id ON public.content_pieces(project_id);
CREATE INDEX idx_content_pieces_created_at ON public.content_pieces(created_at DESC);
CREATE INDEX idx_content_pieces_status ON public.content_pieces(status);
CREATE INDEX idx_templates_platform ON public.templates(platform);
CREATE INDEX idx_templates_category ON public.templates(category);
