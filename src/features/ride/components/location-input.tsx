"use client";

import * as React from "react";
import { Search, MapPin } from "lucide-react";
import { KERALA_LANDMARKS } from "@/lib/data/landmarks";
import type { Address } from "@/types/domain";
import { cn } from "@/lib/utils";

export function LocationInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: Address | null;
  onChange: (address: Address) => void;
  placeholder: string;
}) {
  const [query, setQuery] = React.useState(value?.label ?? "");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => {
    if (!query) return KERALA_LANDMARKS.slice(0, 6);
    const q = query.toLowerCase();
    return KERALA_LANDMARKS.filter(
      (l) => l.label.toLowerCase().includes(q) || l.district?.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">{label}</span>
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3">
          <span className="shrink-0 text-[var(--brand-primary)]">{icon}</span>
          <input
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
          />
          <Search className="size-4 shrink-0 text-[var(--text-muted)]" />
        </div>
      </label>

      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-elevated)]"
        >
          {results.map((landmark) => (
            <li key={landmark.label}>
              <button
                type="button"
                role="option"
                aria-selected={value?.label === landmark.label}
                onClick={() => {
                  onChange(landmark);
                  setQuery(landmark.label);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg-surface-raised)]",
                  value?.label === landmark.label && "bg-[var(--bg-surface-raised)]"
                )}
              >
                <MapPin className="size-4 shrink-0 text-[var(--text-muted)]" />
                <span>
                  <span className="block text-sm font-medium text-[var(--text-primary)]">{landmark.label}</span>
                  <span className="block text-xs text-[var(--text-muted)]">{landmark.district}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
