import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";

export interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  wallet_address: string | null;
  subscription_tier: "free" | "creator" | "pro" | "agency";
  monthly_generation_count: number;
  generations_reset_at: string | null;
  created_at: string;
  updated_at: string;
}

interface UserState {
  user: UserProfile | null;
  session: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setUser: (user: UserProfile | null) => void;
  setSession: (session: any | null) => void;
  setStatus: (status: "loading" | "authenticated" | "unauthenticated") => void;
  fetchProfile: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  status: "loading",
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setStatus: (status) => set({ status }),
  fetchProfile: async (userId) => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      set({ user: data as UserProfile, status: "authenticated" });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      set({ status: "unauthenticated", user: null, session: null });
    }
  },
  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, session: null, status: "unauthenticated" });
  },
}));
export type { UserState };
