import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-emerald-400 bg-emerald-400/10";
  if (rating >= 4.0) return "text-green-400 bg-green-400/10";
  if (rating >= 3.5) return "text-amber-400 bg-amber-400/10";
  return "text-rose-400 bg-rose-400/10";
}

export function RatingBadge({ rating, reviewCount, size = "md", showCount = true, className }: RatingBadgeProps) {
  const colorClass = getRatingColor(rating);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-lg font-semibold", colorClass, size === "sm" ? "text-xs" : "text-sm")}>
        <Star size={size === "sm" ? 10 : 12} fill="currentColor" />
        <span>{rating.toFixed(1)}</span>
      </div>
      {showCount && reviewCount && (
        <span className="text-slate-500 text-xs">{reviewCount.toLocaleString("en-IN")} reviews</span>
      )}
    </div>
  );
}
