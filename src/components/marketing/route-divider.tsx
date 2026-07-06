import { cn } from "@/lib/utils";

/**
 * A winding channel line — evokes Kerala's backwater routes threading
 * between districts. Used both as a full-width section divider and,
 * scaled up, as the hero's signature background element.
 */
export function RouteDivider({ className, nodes = true }: { className?: string; nodes?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      fill="none"
      preserveAspectRatio="none"
      className={cn("w-full text-[var(--brand-primary)]", className)}
      aria-hidden="true"
    >
      <path
        d="M0 40 C 150 10, 250 70, 400 40 S 650 10, 800 40 S 1050 70, 1200 40"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        className="route-line-path"
      />
      {nodes && (
        <>
          <circle cx="0" cy="40" r="4" fill="currentColor" />
          <circle cx="400" cy="40" r="4" fill="currentColor" />
          <circle cx="800" cy="40" r="4" fill="currentColor" />
          <circle cx="1200" cy="40" r="4" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
