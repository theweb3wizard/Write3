import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Write3 terms of service — ethical AI use, credit-based pricing with USDC on Solana, prohibited content policy (no deepfakes, fraud, or market manipulation), and content moderation guidelines.",
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
                <p>Write3 is an AI-powered content generation platform designed for Web3 communities. The Service allows users to generate, edit, and manage content across multiple platforms including Twitter/X, Discord, Telegram, Farcaster, blogs, and newsletters using AI models and customizable style profiles.</p>
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
            <h2 className="text-lg font-semibold text-white mb-3">4. Credits & Billing</h2>
            <p className="mb-3">Write3 offers free usage and prepaid credit packs:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Free Tier:</strong> Limited to 25 content generations per month.</li>
              <li><strong className="text-white">Credit Packs:</strong> Purchase credits in packs of 100 ($10 USDC), 500 ($35 USDC). Credits never expire.</li>
              <li>Payments are processed by NowPayments via USDC on the Solana blockchain. Credit is added immediately upon payment confirmation.</li>
              <li>We reserve the right to change pricing with 30 days notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Ethical AI Use and Prohibited Content</h2>
            <p className="mb-3">Write3 is designed as a productivity tool for human content creators. All generated content requires human review, editing, and explicit approval before publication. You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Generate deepfakes, impersonations, or any content that falsely represents a person or entity</li>
              <li>Create misleading, fraudulent, or deceptive content (including pump-and-dump schemes, rug pulls, scam promotions, or market manipulation)</li>
              <li>Generate hate speech, harassment, discriminatory content, or content promoting violence</li>
              <li>Produce content that violates intellectual property rights, including unauthorized use of copyrighted material</li>
              <li>Create content intended to manipulate financial markets, token prices, or NFT valuations through false or misleading information</li>
              <li>Generate spam, unsolicited bulk messages, or content that violates applicable laws</li>
              <li>Attempt to reverse-engineer, bypass rate limits, or abuse the API in unauthorized ways</li>
              <li>Use the Service to train competing AI models or extract training data</li>
              <li>Share accounts across multiple organizations (each organization requires its own subscription)</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500"><strong className="text-white">Reporting Violations:</strong> If you encounter content that violates these terms, please report it through the dashboard or contact us directly. We investigate all reports and will take appropriate action, including account termination for verified violations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Content Moderation and Safety</h2>
            <p className="mb-3">Write3 implements robust content moderation and filtering mechanisms leveraging industry-leading AI safety features to prevent the generation of prohibited content. These include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Automated content filtering to block prohibited content categories before generation</li>
              <li>Usage monitoring to detect patterns indicative of abuse or policy violations</li>
              <li>Rate limiting and access controls to prevent automated or systematic misuse</li>
              <li>Regular review and updating of moderation rules to address emerging risks</li>
            </ul>
            <p className="mt-3">Despite these safeguards, AI-generated content may occasionally contain inaccuracies or inappropriate outputs. Users are solely responsible for reviewing, editing, and approving all content before publication.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p className="mb-3"><strong className="text-white">Your Content:</strong> You retain full ownership of all content you generate using Write3. We claim no intellectual property rights over your generated content.</p>
            <p className="mb-3"><strong className="text-white">Service IP:</strong> The Write3 platform, including its code, design, branding, templates, and proprietary technology, is owned by Write3. You may not copy, modify, or distribute the platform itself.</p>
            <p><strong className="text-white">Style Profiles:</strong> Content analysis data you provide remains your property. The derived system prompts and analysis results are used solely to provide the Service to you.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>Write3 is provided "as is" without warranties of any kind. We are not liable for damages arising from: (a) AI-generated content inaccuracies, (b) service interruptions or downtime, (c) loss of data, or (d) third-party services integrated with the platform. Our total liability is limited to the amount you paid in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. AI Content Disclaimer</h2>
            <p>Content generated by AI may contain inaccuracies, hallucinations, or inappropriate outputs. You are solely responsible for reviewing and fact-checking all generated content before publishing. Write3 does not guarantee the accuracy, completeness, or appropriateness of AI-generated content for any specific use case.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Termination</h2>
            <p>You may terminate your account at any time via Settings. We may suspend or terminate accounts for violations of these terms. Upon termination, your data will be deleted within 30 days, except as required for legal or billing compliance.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Delaware, United States. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">12. Contact</h2>
                <p>These terms are an agreement between you and the operator of Write3. For questions about these terms, contact us through the dashboard or via the contact information provided on our website.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
