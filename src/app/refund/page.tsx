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
            <h2 className="text-lg font-semibold text-white mb-3">1. Subscription Refunds</h2>
            <p className="mb-3">Write3 offers subscription-based access to its AI-powered content generation platform. All subscription fees are charged in advance on a monthly or annual basis.</p>
            <p className="mb-3">If you are unsatisfied with your subscription, you may request a full refund within <strong className="text-white">14 days</strong> of your initial purchase. Refund requests made after 14 days from the initial purchase date will be evaluated on a case-by-case basis.</p>
            <p>To request a refund, contact our support team at <strong className="text-white">support@write3.app</strong> with your account email and subscription details. We will process your refund within 5-10 business days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Partial Refunds</h2>
            <p className="mb-3">Partial refunds may be issued in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You upgraded your plan mid-cycle and the new plan does not meet your needs. A prorated refund for the remaining days may be issued.</li>
              <li>You downgraded your plan mid-cycle and have already paid for a higher tier. The difference may be refunded as account credit applied to future billing.</li>
              <li>A technical issue on our end prevented you from using the service for an extended period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Annual Plan Refunds</h2>
            <p className="mb-3">Annual subscription plans are billed at a discounted rate. Refunds for annual plans are eligible within <strong className="text-white">30 days</strong> of purchase. After 30 days, refunds will be prorated based on the number of months remaining in your billing cycle, minus a processing fee equal to one month of the equivalent monthly plan price.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Non-Refundable Items</h2>
            <p className="mb-3">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Usage overages or add-on purchases beyond the base subscription fee.</li>
              <li>Payments made for prior billing cycles where service was fully rendered.</li>
              <li>Third-party fees incurred through Paddle, our payment processor (e.g., currency conversion fees, chargeback fees).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cancellation Policy</h2>
            <p className="mb-3">You may cancel your subscription at any time from your account settings page. Upon cancellation:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your subscription will remain active until the end of the current billing period.</li>
              <li>No further charges will be made after cancellation.</li>
              <li>You will lose access to premium features once the current period ends.</li>
              <li>Your data will be retained for 30 days after cancellation, after which it may be permanently deleted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Free Tier</h2>
            <p className="mb-3">The Free tier of Write3 is provided at no cost. No refunds are applicable to free accounts, as no payment is collected.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Chargebacks</h2>
            <p className="mb-3">If you dispute a charge through your bank or payment provider, your subscription will be immediately suspended until the dispute is resolved. Write3 reserves the right to permanently terminate accounts that file fraudulent or abusive chargebacks.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p className="mb-3">We may update this Refund Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of Write3 after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
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
