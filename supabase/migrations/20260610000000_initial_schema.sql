-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email varchar(255) UNIQUE NOT NULL,
  username varchar(50) UNIQUE,
  avatar_url text,
  wallet_address varchar(42),
  subscription_tier varchar(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator', 'pro', 'agency')),
  monthly_generation_count int DEFAULT 0,
  generations_reset_at timestamptz,
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

-- 3. VOICE_PROFILES TABLE
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
  platform varchar(20) NOT NULL CHECK (platform IN ('twitter', 'discord', 'telegram', 'blog', 'newsletter', 'farcaster')),
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
  platform varchar(20) NOT NULL CHECK (platform IN ('twitter', 'discord', 'telegram', 'blog', 'newsletter', 'farcaster')),
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

-- 6. USAGE_LOGS TABLE
CREATE TABLE public.usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action_type varchar(50) NOT NULL CHECK (action_type IN ('generate', 'edit', 'export', 'voice_train')),
  resource_type varchar(50),
  resource_id uuid,
  tokens_used int DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on usage_logs
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Usage logs RLS policies
CREATE POLICY "Users can view own usage" 
ON public.usage_logs FOR SELECT 
USING (auth.uid() = user_id);

-- 7. SUBSCRIPTIONS TABLE (Paddle Integrations)
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  paddle_subscription_id varchar(100) UNIQUE,
  paddle_customer_id varchar(100),
  plan_type varchar(20) NOT NULL CHECK (plan_type IN ('free', 'creator', 'pro', 'agency')),
  status varchar(20) NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'paused', 'deleted')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscriptions RLS policies
CREATE POLICY "Users can view own subscription" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = user_id);

-- 8. USER SYNC TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, avatar_url, subscription_tier, monthly_generation_count)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'preferred_username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'free',
    0
  );
  
  -- Create initial subscription record
  INSERT INTO public.subscriptions (user_id, plan_type, status)
  VALUES (new.id, 'free', 'active');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. PERFORMANCE INDEXES
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_voice_profiles_project_id ON public.voice_profiles(project_id);
CREATE INDEX idx_content_pieces_project_id ON public.content_pieces(project_id);
CREATE INDEX idx_content_pieces_created_at ON public.content_pieces(created_at DESC);
CREATE INDEX idx_content_pieces_status ON public.content_pieces(status);
CREATE INDEX idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON public.usage_logs(created_at DESC);
CREATE INDEX idx_templates_platform ON public.templates(platform);
CREATE INDEX idx_templates_category ON public.templates(category);
