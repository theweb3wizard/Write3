"use client";

import { LayoutDashboard, FileText, FolderOpen, BookTemplate, Brain, BarChart3, Settings, CreditCard, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import Logo from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate", icon: FileText },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/library", label: "Library", icon: BookTemplate },
  { href: "/voice-training", label: "Voice Training", icon: Brain },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const isFree = user?.subscription_tier === "free";

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-card-border text-gray-400 hover:text-white cursor-pointer"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-card/80 backdrop-blur-xl border-r border-card-border
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}>
        <div className="p-5 border-b border-card-border">
          <Link href="/dashboard">
            <Logo />
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                  isActive
                    ? "bg-electric-indigo/10 text-electric-indigo border border-electric-indigo/20"
                    : "text-gray-400 hover:text-white hover:bg-card-border/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-card-border space-y-2">
          {isFree && (
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg bg-gradient-premium text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <CreditCard className="h-4 w-4" />
              Upgrade Plan
            </Link>
          )}

          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-electric-indigo/20 flex items-center justify-center text-xs font-bold text-electric-indigo">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username || "User"}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.subscription_tier || "free"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-error hover:bg-error/10 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
