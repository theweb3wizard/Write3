import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-deep-space font-sans">
      <header className="border-b border-card-border bg-card/20 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Credit Purchases</h2>
            <p className="mb-3">Write3 operates on a prepaid credit system. When you purchase credits, you receive immediate access to those credits for content generation.</p>
            <p className="mb-3">If you are unsatisfied with your credit purchase, you may request a refund within <strong className="text-white">14 days</strong> of purchase, provided you have used less than 25% of the purchased credits. Refund requests made after 14 days will be evaluated on a case-by-case basis.</p>
            <p>To request a refund, contact our support team at <strong className="text-white">support@write3.app</strong> with your account email and transaction details. Refunds will be processed within 5-10 business days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Free Tier</h2>
            <p className="mb-3">The Free tier of Write3 is provided at no cost. No refunds are applicable to free accounts, as no payment is collected.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Non-Refundable Items</h2>
            <p className="mb-3">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Credits that have been used (consumed for content generation).</li>
              <li>Purchases where more than 25% of credits have been consumed.</li>
              <li>Third-party blockchain transaction fees (network gas fees).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Changes to This Policy</h2>
            <p className="mb-3">We may update this Refund Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of Write3 after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Contact</h2>
            <p>For refund requests or questions about this policy, please contact us at <strong className="text-white">support@write3.app</strong>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-card-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Write3. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
