import { Clock, MapPin, Waves, Mountain, Landmark, Leaf, Sun } from "lucide-react";
import type { TourPackage } from "@/types/domain";
import { Badge } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categoryArt: Record<TourPackage["category"], { icon: typeof Waves; gradient: string; label: string }> = {
  backwaters: { icon: Waves, gradient: "from-backwater-600 to-backwater-400", label: "Backwaters" },
  hills: { icon: Mountain, gradient: "from-backwater-800 to-brass-500", label: "Hill Station" },
  heritage: { icon: Landmark, gradient: "from-brass-600 to-brass-300", label: "Heritage" },
  wildlife: { icon: Leaf, gradient: "from-backwater-700 to-backwater-300", label: "Wildlife" },
  beach: { icon: Sun, gradient: "from-brass-500 to-laterite-400", label: "Beach" },
};

export function TourCard({ pkg }: { pkg: TourPackage }) {
  const art = categoryArt[pkg.category];
  const Icon = art.icon;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-shadow hover:shadow-[var(--shadow-elevated)]">
      <div
        className={cn("relative flex h-40 items-end justify-between bg-gradient-to-br p-4", art.gradient)}
        role="img"
        aria-label={pkg.imageQuery}
      >
        <Badge tone="neutral" className="bg-white/25 text-white backdrop-blur-sm">
          {art.label}
        </Badge>
        <Icon className="size-9 text-white/90" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]">
          <MapPin className="size-3" /> {pkg.district}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-[var(--text-primary)]">
          {pkg.title}
        </h3>
        <ul className="mt-3 space-y-1.5">
          {pkg.highlights.slice(0, 2).map((h) => (
            <li key={h} className="text-sm text-[var(--text-secondary)]">
              · {h}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <Clock className="size-3" /> {pkg.durationDays}D trip
          </span>
          <span className="font-display text-base font-semibold text-[var(--text-primary)]">
            {formatINR(pkg.pricePerPerson)}
            <span className="text-xs font-normal text-[var(--text-muted)]">/person</span>
          </span>
        </div>
      </div>
    </article>
  );
}
