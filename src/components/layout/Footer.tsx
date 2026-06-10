import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm text-gray-500">
              AI-powered Web3 content generation for communities that build the future.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <div className="space-y-2">
              <Link href="/#features" className="block text-sm text-gray-500 hover:text-gray-300 transition">Features</Link>
              <Link href="/pricing" className="block text-sm text-gray-500 hover:text-gray-300 transition">Pricing</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <div className="space-y-2">
              <Link href="/auth/login" className="block text-sm text-gray-500 hover:text-gray-300 transition">Dashboard</Link>
              <Link href="/auth/login" className="block text-sm text-gray-500 hover:text-gray-300 transition">Get Started</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-gray-500 hover:text-gray-300 transition">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-gray-500 hover:text-gray-300 transition">Terms of Service</Link>
              <Link href="/refund" className="block text-sm text-gray-500 hover:text-gray-300 transition">Refund Policy</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Write3. Built for Web3 communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
