import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Write3 privacy policy — how we collect, use, and protect your data. We use Supabase for auth, Google Gemini for AI generation, and NowPayments for USDC on Solana transactions. No data sold to third parties.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly when using Write3:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Account Information:</strong> Email address, username, and avatar URL when you sign up via email, GitHub, or Google OAuth.</li>
              <li><strong className="text-white">Content Data:</strong> Generated content pieces, project configurations, brand style analysis data, and template selections.</li>
              <li><strong className="text-white">Payment Information:</strong> We use NowPayments as our payment processor. Write3 does not store any payment credentials. Payment transactions are processed via USDC on the Solana blockchain.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Generate AI-powered content based on your project settings and voice profiles</li>
              <li>Manage your subscription and access to features</li>
              <li>Improve our services through aggregated usage analytics</li>
              <li>Send transactional emails (account confirmation, password reset, billing notices)</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. AI Content Processing</h2>
            <p>Content you generate is processed through OpenRouter, an intermediary API that routes requests to multiple AI model providers including Google (Gemini), Anthropic (Claude), OpenAI (GPT-4o), and DeepSeek. We send your project context, template prompts, and voice profile data to generate content. These providers do not use your data to train their models. See <Link href="https://openrouter.ai/privacy" className="text-electric-indigo hover:underline">OpenRouter's privacy policy</Link> and each provider's respective policy for details.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Data Sharing</h2>
            <p className="mb-3">We share your data only with essential service providers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Supabase:</strong> Database hosting and authentication</li>
              <li><strong className="text-white">OpenRouter:</strong> AI model routing (forwards data to Google, Anthropic, OpenAI, DeepSeek)</li>
              <li><strong className="text-white">NowPayments:</strong> Payment processing</li>
              <li><strong className="text-white">Vercel:</strong> Application hosting and deployment</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention & Deletion</h2>
            <p>You can delete your account and all associated data at any time from the Settings page. Account deletion triggers a cascading removal of all projects, content pieces, voice profiles, and usage logs. Billing records may be retained as required by financial regulations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights (GDPR & CCPA)</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Object to processing of your data</li>
            </ul>
            <p className="mt-3">To exercise these rights, use the account deletion option in Settings or contact us through the dashboard.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Security</h2>
            <p>We implement industry-standard security measures including TLS 1.3 encryption for all data in transit, Row Level Security in our database to ensure data isolation between users, and environment-based secrets management. No sensitive credentials are ever exposed to client-side code.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Updates to This Policy</h2>
            <p>We may update this privacy policy from time to time. Material changes will be communicated via email or through the application. Continued use of Write3 after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>For questions about this privacy policy, contact us through the dashboard.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
