"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import type { SortOption } from "./result-types";
import { SORT_OPTIONS } from "./results-data";
import { cn } from "./utils";

interface ResultsToolbarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export function ResultsToolbar({
  resultCount,
  sort,
  onSortChange,
  onOpenFilters,
  activeFilterCount,
}: ResultsToolbarProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeLabel = SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "Recommended";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_16px_40px_rgba(10,31,27,0.08)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0A1F1B]/50 sm:p-6">
      <div>
        <h2 className="text-xl font-bold text-[#0A1F1B] dark:text-white sm:text-2xl">
          {resultCount} {resultCount === 1 ? "bus" : "buses"} found
        </h2>
        <p className="mt-0.5 text-sm text-[#0A1F1B]/50 dark:text-white/40">
          Showing the best options for your trip
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenFilters}
          className="relative flex items-center gap-2 rounded-2xl border border-[#0A1F1B]/12 bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#0A1F1B]/75 transition-colors hover:border-[#0E463F]/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FF6B4A] text-[11px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div ref={rootRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors",
              open
                ? "border-[#0E463F]/40 bg-white/90 text-[#0E463F] dark:border-[#D6A94A]/40 dark:bg-white/10 dark:text-[#D6A94A]"
                : "border-[#0A1F1B]/12 bg-white/60 text-[#0A1F1B]/75 hover:border-[#0E463F]/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70",
            )}
          >
            Sort: <span className="font-bold">{activeLabel}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+8px)] z-30 w-56 rounded-2xl border border-white/50 bg-white/95 p-1.5 shadow-[0_20px_50px_rgba(10,31,27,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E1F1B]/95"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.id);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#0A1F1B]/75 transition-colors hover:bg-[#0A1F1B]/[0.05] dark:text-white/65 dark:hover:bg-white/[0.06]"
                  >
                    {opt.label}
                    {sort === opt.id && <Check className="h-4 w-4 text-[#0E463F] dark:text-[#D6A94A]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
