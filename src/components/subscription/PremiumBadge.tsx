import { Sparkles } from "lucide-react";

interface PremiumBadgeProps {
  size?: "sm" | "md";
}

export default function PremiumBadge({ size = "sm" }: PremiumBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-warning/10 text-warning border border-warning/20 ${
      size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
    }`}>
      <Sparkles className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      Premium
    </span>
  );
}
