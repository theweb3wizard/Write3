import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Write3 ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We reserve the right to update these terms at any time, with notice provided via email or in-app notification.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>Write3 is an AI-powered content generation platform designed for Web3 communities. The Service allows users to generate, edit, and manage content across multiple platforms including Twitter/X, Discord, Telegram, Farcaster, blogs, and newsletters using AI models and customizable voice profiles.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Account Registration</h2>
            <p className="mb-3">To use the Service, you must create an account. You agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not create accounts using automated methods or for prohibited activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Subscriptions & Billing</h2>
            <p className="mb-3">Write3 offers free and paid subscription tiers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Free Tier:</strong> Limited to 50 content generations per month with basic features and watermark.</li>
              <li><strong className="text-white">Paid Tiers:</strong> Creator ($29/mo), Pro ($69/mo), and Agency ($199/mo). Each tier provides additional features as described on the Pricing page.</li>
              <li>All payments are processed by Paddle. Subscriptions auto-renew unless canceled. Refund requests are handled per Paddle's refund policy.</li>
              <li>We reserve the right to change pricing with 30 days notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p className="mb-3">You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Generate content that violates any applicable law or regulation</li>
              <li>Create misleading, fraudulent, or deceptive content (including pump-and-dump schemes, rug pulls, or scam promotions)</li>
              <li>Generate hate speech, harassment, or content promoting violence</li>
              <li>Attempt to reverse-engineer, bypass rate limits, or abuse the API in unauthorized ways</li>
              <li>Use the Service to train competing AI models or extract training data</li>
              <li>Share accounts across multiple organizations (each organization requires its own subscription)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p className="mb-3"><strong className="text-white">Your Content:</strong> You retain full ownership of all content you generate using Write3. We claim no intellectual property rights over your generated content.</p>
            <p className="mb-3"><strong className="text-white">Service IP:</strong> The Write3 platform, including its code, design, branding, templates, and proprietary technology, is owned by Write3. You may not copy, modify, or distribute the platform itself.</p>
            <p><strong className="text-white">Voice Profiles:</strong> Voice training data you provide remains your property. The derived system prompts and analysis results are used solely to provide the Service to you.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>Write3 is provided "as is" without warranties of any kind. We are not liable for damages arising from: (a) AI-generated content inaccuracies, (b) service interruptions or downtime, (c) loss of data, or (d) third-party services integrated with the platform. Our total liability is limited to the amount you paid in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. AI Content Disclaimer</h2>
            <p>Content generated by AI may contain inaccuracies, hallucinations, or inappropriate outputs. You are solely responsible for reviewing and fact-checking all generated content before publishing. Write3 does not guarantee the accuracy, completeness, or appropriateness of AI-generated content for any specific use case.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
            <p>You may terminate your account at any time via Settings. We may suspend or terminate accounts for violations of these terms. Upon termination, your data will be deleted within 30 days, except as required for legal or billing compliance.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Delaware, United States. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contact</h2>
            <p>For questions about these terms, contact us at legal@write3.io.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
