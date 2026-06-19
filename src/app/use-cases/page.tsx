import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowRight, FileText, MessageCircle, BookOpen, Building2, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Discover how Web3 teams use Write3's compliance-safe AI voice clone for technical documentation, community updates, governance proposals, and educational content. Built for DeFi, DAOs, NFT projects, and crypto protocols.",
};

const useCases = [
  {
    icon: FileText,
    title: "Technical Documentation & Drafting",
    description: "Write3 helps technical writers and developers draft clear, accurate documentation for protocols, smart contracts, and dApps. From API references to integration guides, our AI assists in structuring complex technical information while you maintain full editorial control.",
    highlights: [
      "Draft protocol documentation and README files",
      "Create developer tutorials and integration guides",
      "Generate consistent technical terminology across documents",
    ],
  },
  {
    icon: MessageCircle,
    title: "Community Updates & Announcements",
    description: "Community managers use Write3 to draft regular project updates, milestone announcements, and ecosystem news. The tool helps maintain consistent messaging across Discord, Telegram, and Twitter while preserving each project's unique community voice.",
    highlights: [
      "Draft weekly community updates and development reports",
      "Create consistent multi-platform announcements",
      "Maintain brand voice across all communication channels",
    ],
  },
  {
    icon: BookOpen,
    title: "Educational Content & Tutorials",
    description: "Create educational content that helps onboard new users to your protocol or platform. Write3 assists in breaking down complex Web3 concepts into accessible, well-structured educational materials that undergo human expert review before publication.",
    highlights: [
      "Draft beginner-friendly guides and explainers",
      "Create structured educational series and courses",
      "Generate quiz questions and learning assessments",
    ],
  },
  {
    icon: Building2,
    title: "Governance Proposals & DAO Communications",
    description: "DAO contributors use Write3 to draft clear, structured governance proposals, voting rationales, and community discussion documents. The AI assists with formatting and clarity while human authors maintain responsibility for accuracy and strategic direction.",
    highlights: [
      "Draft improvement proposals (e.g., WIP, ZIP formats)",
      "Create voting summaries and rationale documents",
      "Draft treasury management reports and budget proposals",
    ],
  },
  {
    icon: Shield,
    title: "Compliance & Risk Communication",
    description: "Legal and compliance teams can leverage Write3 to draft clear risk disclosures, terms updates, and compliance communications. All content requires expert legal review and approval before any publication or distribution.",
    highlights: [
      "Draft risk disclosure statements and disclaimers",
      "Create clear terms of service updates communication",
      "Draft incident response and post-mortem summaries",
    ],
  },
  {
    icon: Users,
    title: "Project Management & Internal Updates",
    description: "Development teams use Write3 to streamline internal communication by drafting standup summaries, sprint reports, and project milestones. This allows team members to focus more time on building while maintaining clear project documentation.",
    highlights: [
      "Draft sprint retrospectives and progress reports",
      "Create structured meeting agendas and notes",
      "Generate consistent project status updates",
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
            <FileText className="h-4 w-4" />
            Professional Use Cases
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for <span className="text-gradient">Professional Content Teams</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Write3 is a productivity tool designed for human content creators in the Web3 space. 
            Every piece of generated content requires human review, editing, and approval before publication.
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
            <h2 className="text-2xl font-bold text-white mb-3">Human-Centric AI Assistance</h2>
            <p className="text-gray-400 mb-6">
              Write3 is designed to augment human creativity, not replace it. Our platform provides drafting assistance 
              and structure suggestions, but every piece of content is reviewed, refined, and approved by human creators 
              before it reaches your audience.
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
