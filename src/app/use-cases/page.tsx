import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowRight, MessageCircle, BookOpen, Shield, Users, Megaphone, FileCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Discover how Web3 teams use Write3's compliance-safe AI voice clone for technical documentation, community updates, governance proposals, and educational content. Built for DeFi, DAOs, NFT projects, and crypto protocols.",
};

const useCases = [
  {
    icon: Megaphone,
    title: "Community Updates & Announcements",
    description: "Draft weekly development reports, milestone announcements, and ecosystem news that sound like your community's voice — not generic corporate copy. Write3 formats natively for Discord announcements, Twitter threads, and Reddit posts, with compliance guardrails that flag risky language before publishing.",
    highlights: [
      "Draft multi-platform announcements from a single input",
      "Maintain consistent brand voice across Discord, Twitter, and Telegram",
      "Built-in SEC/FCA guardrails catch regulated language before it publishes",
    ],
  },
  {
    icon: FileCode,
    title: "Technical Documentation & Release Notes",
    description: "Generate clear protocol documentation, integration guides, and release notes with consistent technical terminology. Write3's voice cloning ensures your docs read like your team wrote them — because your team trained the voice profile on actual examples.",
    highlights: [
      "Create developer tutorials and integration guides from technical specs",
      "Generate consistent changelogs and release announcements",
      "Maintain your project's unique technical communication style",
    ],
  },
  {
    icon: BookOpen,
    title: "Educational Content & Tutorials",
    description: "Create beginner-friendly guides that onboard new users to your protocol or platform. Write3 breaks down complex Web3 concepts into accessible, well-structured educational content — reviewed and approved by human experts before publication.",
    highlights: [
      "Draft explainers for DeFi protocols, NFT mechanics, and DAO governance",
      "Create structured educational series across blog, Twitter, and newsletter",
      "Generate quiz questions and learning assessments for community education",
    ],
  },
  {
    icon: Users,
    title: "Governance Proposals & DAO Communications",
    description: "Draft clear, structured governance proposals, voting rationales, and community discussion documents. Write3 helps with formatting and clarity while human authors maintain responsibility for accuracy and strategic direction.",
    highlights: [
      "Draft improvement proposals (WIP, ZIP, and custom formats)",
      "Create voting summaries and rationale documents",
      "Generate treasury management reports and budget proposals",
    ],
  },
  {
    icon: Shield,
    title: "Compliance-Critical Content",
    description: "For projects operating in regulated environments, Write3's compliance guardrails automatically scan prompts and generated output for terms that could trigger SEC or FCA scrutiny — including 'guaranteed returns', 'passive income', 'financial advice', and 'price prediction'. Warnings appear before generation, not after publication.",
    highlights: [
      "Automatic scanning of output for regulated financial language",
      "Pre-generation warnings, not post-publication surprises",
      "Audit trail of compliance checks for internal review",
    ],
  },
  {
    icon: MessageCircle,
    title: "Multi-Platform Content Operations",
    description: "Web3 projects managing presence across Discord, Twitter, Reddit, Telegram, and Farcaster use Write3 to maintain consistent messaging everywhere. A single topic generates platform-native formatting for each channel — Twitter threads with tweet breaks, Discord embeds, Reddit posts with proper structure.",
    highlights: [
      "Generate content for 7+ platforms from one topic input",
      "Native formatting per platform — no manual reformatting",
      "Save drafts to library, publish to Discord with one click",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-deep-space font-sans">
      <header className="border-b border-card-border bg-card/20 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-12">
            <Link href="/use-cases" className="text-sm text-electric-indigo font-medium">Use Cases</Link>
            <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-sm text-electric-indigo mb-6">
            <Shield className="h-4 w-4" />
            Compliance-Safe AI for Web3 Teams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Web3 Content, <span className="text-gradient">Compliance-Safe</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Write3 is a compliance-safe AI voice clone for Web3 content creators. Generate authentic, platform-native content for Twitter, Discord, Reddit, Telegram, and blogs — with built-in SEC/FCA guardrails. Every output requires human review before publication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div key={uc.title} className="rounded-xl border border-card-border bg-card p-6 hover:border-electric-indigo/30 transition">
                <div className="p-2.5 rounded-lg bg-electric-indigo/10 w-fit mb-4">
                  <Icon className="h-5 w-5 text-electric-indigo" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{uc.description}</p>
                <ul className="space-y-1.5">
                  {uc.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-electric-indigo mt-0.5">&#8226;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-card-border bg-card p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Voice Clone + Compliance Guardrails</h2>
            <p className="text-gray-400 mb-6">
              Train Write3 on 3-5 writing samples and every generation matches your brand voice — automatically checked for SEC/FCA compliance risks. No generic AI copy. No regulatory surprises.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Creating Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
