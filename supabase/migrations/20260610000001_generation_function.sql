-- Function to increment generation count and log usage
CREATE OR REPLACE FUNCTION public.increment_generation_count(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET monthly_generation_count = monthly_generation_count + 1,
      updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly generation counts (run via cron or manually)
CREATE OR REPLACE FUNCTION public.reset_monthly_generations()
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET monthly_generation_count = 0,
      generations_reset_at = now(),
      updated_at = now()
  WHERE generations_reset_at IS NULL
     OR generations_reset_at < date_trunc('month', now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS to allow service role to call these functions
GRANT EXECUTE ON FUNCTION public.increment_generation_count TO service_role;
GRANT EXECUTE ON FUNCTION public.reset_monthly_generations TO service_role;
