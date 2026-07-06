import type { ReactNode } from "react";
import { BadgeCheck, Crown, Sparkles, Zap } from "lucide-react";
import type { ResultBadgeId } from "./result-types";
import { cn } from "./utils";

type Variant = ResultBadgeId | "verified";

const CONFIG: Record<Variant, { label: string; icon: ReactNode; className: string }> = {
  verified: {
    label: "Verified operator",
    icon: <BadgeCheck className="h-3 w-3" />,
    className: "bg-[#0E463F]/10 text-[#0E463F] dark:bg-white/10 dark:text-[#7FD8C8]",
  },
  "best-price": {
    label: "Best price",
    icon: <Sparkles className="h-3 w-3" />,
    className: "bg-[#FF6B4A]/12 text-[#B4472C] dark:bg-[#FF6B4A]/15 dark:text-[#FF9478]",
  },
  fastest: {
    label: "Fastest",
    icon: <Zap className="h-3 w-3" />,
    className: "bg-[#D6A94A]/15 text-[#8A661F] dark:bg-[#D6A94A]/15 dark:text-[#D6A94A]",
  },
  premium: {
    label: "Premium",
    icon: <Crown className="h-3 w-3" />,
    className: "bg-[#0A1F1B]/8 text-[#0A1F1B] dark:bg-white/10 dark:text-white",
  },
};

interface BadgePillProps {
  variant: Variant;
  className?: string;
}

export function BadgePill({ variant, className = "" }: BadgePillProps) {
  const config = CONFIG[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        config.className,
        className,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
