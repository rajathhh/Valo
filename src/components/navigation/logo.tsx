import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className ?? ""}`} aria-label="VALO home">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" r="14" className="fill-[var(--brand-primary)]" />
        <path
          d="M7 17c1.5-4 3-6 5-6s2.5 3 4 3 2.5-4.5 4.5-4.5S23 13 23 13"
          stroke="var(--brand-accent)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">VALO</span>
    </Link>
  );
}
