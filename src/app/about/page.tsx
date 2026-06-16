import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Shield, Mail, MapPin, Building2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Write3 AI",
  description: "Write3 is an AI-powered content productivity platform purpose-built for Web3 communities. We help community managers, DAO contributors, and Web3 marketing teams create authentic content efficiently.",
};

export default function AboutPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">About Write3</h1>
        <p className="text-sm text-gray-500 mb-10">AI-powered content productivity for Web3 communities</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Mission</h2>
            <p>
              Write3 is a productivity platform that helps Web3 community managers, DAO contributors, and marketing 
              teams draft authentic, on-brand content efficiently. We believe AI should augment human creativity — 
              not replace it. Every piece of content generated through Write3 requires human review, editing, and 
              explicit approval before publication.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Technology</h2>
            <p className="mb-3">
              Write3 leverages industry-leading large language models including GPT-4o, Claude 3.5 Sonnet, and 
              Google Gemini to deliver high-quality, contextually aware content generation. Our platform combines 
              these foundation models with proprietary prompt engineering and style alignment technology to ensure 
              output that matches each project&apos;s unique voice.
            </p>
            <p>
              We implement robust content moderation and filtering mechanisms to prevent the generation of 
              prohibited content, and we continuously update our safety systems to address emerging risks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Commitment</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Ethical AI Use:</strong> We are committed to responsible AI development and prohibit the use of our platform for deepfakes, impersonation, fraudulent content, or any activity that violates our Terms of Service or Paddle&apos;s Acceptable Use Policy.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-electric-indigo flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Human in the Loop:</strong> Write3 is designed as a drafting and productivity tool. All generated content is intended to be reviewed, refined, and approved by human creators before publication.</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Transparency:</strong> We clearly disclose that our platform uses AI assistance and provide users with the tools and information they need to make informed decisions about the content they publish.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Company Information</h2>
            <div className="rounded-xl border border-card-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">The Web3 Wizard</p>
                  <p className="text-xs text-gray-500">Operator of Write3</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">251 Little Falls Drive</p>
                  <p className="text-xs text-gray-500">Wilmington, DE 19808, United States</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">support@write3.io</p>
                  <p className="text-xs text-gray-500">For support inquiries</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Report Misuse</h2>
            <p>
              If you encounter content generated through Write3 that violates our Terms of Service or Acceptable Use 
              Policy — including deepfakes, impersonation, fraud, hate speech, or any prohibited content — please 
              report it immediately to <strong className="text-white">abuse@write3.io</strong>. We investigate all 
              reports and take appropriate action, including account termination for verified violations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
            <p>
              For general inquiries: <strong className="text-white">hello@write3.io</strong><br />
              For support: <strong className="text-white">support@write3.io</strong><br />
              For legal matters: <strong className="text-white">legal@write3.io</strong><br />
              To report abuse: <strong className="text-white">abuse@write3.io</strong>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
