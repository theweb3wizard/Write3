-- Align live database with codebase expectations
-- Safe to re-run idempotently

-- 1. USERS TABLE — ensure all required columns exist
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS credit_balance int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS free_generations_used int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS free_generations_reset_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS total_generations int DEFAULT 0;

-- Migrate data from old column names (only if old columns still exist)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'monthly_generation_count') THEN
    UPDATE public.users SET free_generations_used = COALESCE(monthly_generation_count, 0) WHERE free_generations_used = 0;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'generations_reset_at') THEN
    UPDATE public.users SET free_generations_reset_at = COALESCE(generations_reset_at, now()) WHERE free_generations_reset_at = now();
  END IF;
END $$;

-- Drop old columns
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'subscription_tier') THEN
    ALTER TABLE public.users DROP COLUMN subscription_tier;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'monthly_generation_count') THEN
    ALTER TABLE public.users DROP COLUMN monthly_generation_count;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'generations_reset_at') THEN
    ALTER TABLE public.users DROP COLUMN generations_reset_at;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'wallet_address') THEN
    ALTER TABLE public.users DROP COLUMN wallet_address;
  END IF;
END $$;

-- 2. SOCIAL ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS public.user_social_accounts (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage own social accounts') THEN
    CREATE POLICY "Users can manage own social accounts" ON public.user_social_accounts FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 3. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
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

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own payments') THEN
    CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

-- 4. RPC FUNCTIONS
CREATE OR REPLACE FUNCTION public.add_credits(user_id uuid, amount int)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.users SET credit_balance = credit_balance + amount, updated_at = now() WHERE id = user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.deduct_credit(user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.users SET credit_balance = credit_balance - 1, total_generations = total_generations + 1, updated_at = now() WHERE id = user_id AND credit_balance > 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_free_usage(user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.users SET free_generations_used = free_generations_used + 1, total_generations = total_generations + 1, updated_at = now() WHERE id = user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.publish_content(content_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.content_pieces SET status = 'published', updated_at = now() WHERE id = content_id;
END;
$$;

-- 5. USER SYNC TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, avatar_url, credit_balance, free_generations_used)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'preferred_username', split_part(new.email, '@', 1)), new.raw_user_meta_data->>'avatar_url', 0, 0);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. DROP OLD SUBSCRIPTIONS TABLE
DROP TABLE IF EXISTS public.subscriptions CASCADE;

-- 7. INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_profiles_project_id ON public.voice_profiles(project_id);
CREATE INDEX IF NOT EXISTS idx_content_pieces_project_id ON public.content_pieces(project_id);
CREATE INDEX IF NOT EXISTS idx_content_pieces_created_at ON public.content_pieces(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_pieces_status ON public.content_pieces(status);
CREATE INDEX IF NOT EXISTS idx_templates_platform ON public.templates(platform);
CREATE INDEX IF NOT EXISTS idx_templates_category ON public.templates(category);
