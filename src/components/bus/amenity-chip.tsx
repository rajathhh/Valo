import type { AmenityId } from "./result-types";
import { AMENITY_META } from "./results-data";
import { cn } from "./utils";

interface AmenityChipProps {
  id: AmenityId;
  interactive?: boolean;
  selected?: boolean;
  onToggle?: (id: AmenityId) => void;
  size?: "sm" | "md";
}

export function AmenityChip({
  id,
  interactive = false,
  selected = false,
  onToggle,
  size = "sm",
}: AmenityChipProps) {
  const { label, icon: Icon } = AMENITY_META[id];

  const content = (
    <>
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </>
  );

  const shared = cn(
    "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
    size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-[13px]",
  );

  if (!interactive) {
    return (
      <span
        className={cn(
          shared,
          "border-transparent bg-[#0E463F]/[0.06] text-[#0E463F] dark:bg-white/[0.06] dark:text-[#8FE0D0]",
        )}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onToggle?.(id)}
      className={cn(
        shared,
        selected
          ? "border-transparent bg-gradient-to-r from-[#0E463F] to-[#12615A] text-white shadow-[0_6px_16px_rgba(14,70,63,0.25)]"
          : "border-[#0A1F1B]/12 bg-white/40 text-[#0A1F1B]/65 hover:border-[#0E463F]/30 hover:text-[#0E463F] dark:border-white/10 dark:bg-white/[0.03] dark:text-white/55 dark:hover:border-[#D6A94A]/30 dark:hover:text-[#D6A94A]",
      )}
    >
      {content}
    </button>
  );
}
