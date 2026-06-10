"use client";

import { TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";

const trendingTopics = [
  { title: "L2 Scaling Solutions Hit New ATH", description: "Generate market commentary on recent L2 milestones", type: "Market Commentary" },
  { title: "New Regulatory Framework Proposal", description: "Create analysis of proposed crypto regulations", type: "Regulatory Analysis" },
  { title: "DeFi Protocol Launches Governance Token", description: "Draft an announcement for a new token launch", type: "Launch Announce" },
];

export default function TrendingTopics() {
  return (
    <div className="rounded-xl border border-card-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-sm font-semibold text-white">Trending in Web3</h3>
      </div>

      <div className="space-y-2">
        {trendingTopics.map((topic, i) => (
          <Link
            key={i}
            href={`/generate?topic=${encodeURIComponent(topic.title)}`}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-card-border/30 transition group"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-2 w-2 rounded-full bg-neon-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-neon-cyan transition truncate">
                {topic.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-500 whitespace-nowrap">
              {topic.type}
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-gray-600 group-hover:text-gray-400 transition flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
