"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Footer from "./Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-deep-space font-sans flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-deep-space/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-gray-400 hover:text-white transition">Features</Link>
            <Link href="/pricing" className={`text-sm transition ${pathname === "/pricing" ? "text-electric-indigo" : "text-gray-400 hover:text-white"}`}>Pricing</Link>
            <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white transition">Sign In</Link>
            <Link
              href="/auth/login"
              className="rounded-lg bg-gradient-premium px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
