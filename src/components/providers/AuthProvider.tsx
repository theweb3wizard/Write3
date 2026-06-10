"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession, setUser, setStatus, fetchProfile } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    const initializeAuth = async () => {
      setStatus("loading");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setSession(session);
          await fetchProfile(session.user.id);
        } else {
          setSession(null);
          setUser(null);
          setStatus("unauthenticated");
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setStatus("unauthenticated");
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setSession(session);
        await fetchProfile(session.user.id);
      } else {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setStatus, fetchProfile]);

  return <>{children}</>;
}
