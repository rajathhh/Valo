"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, User, Users } from "lucide-react";
import type { PassengerCounts } from "./types";
import { cn } from "./utils";

const MAX_TOTAL = 9;

interface Row {
  key: keyof PassengerCounts;
  label: string;
  hint: string;
  min: number;
}

const ROWS: Row[] = [
  { key: "adults", label: "Adults", hint: "12+ years", min: 1 },
  { key: "children", label: "Children", hint: "Below 12 years", min: 0 },
  { key: "women", label: "Women", hint: "Ladies-only seats", min: 0 },
  { key: "seniors", label: "Senior citizens", hint: "60+ years", min: 0 },
];

interface PassengerSelectorProps {
  value: PassengerCounts;
  onChange: (value: PassengerCounts) => void;
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const total = value.adults + value.children + value.women + value.seniors;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function update(key: keyof PassengerCounts, delta: number, min: number) {
    const next = Math.max(min, value[key] + delta);
    const nextTotal = total - value[key] + next;
    if (nextTotal > MAX_TOTAL) return;
    onChange({ ...value, [key]: next });
  }

  return (
    <div ref={rootRef} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-[76px] w-full flex-col justify-center rounded-[22px] border border-white/40 bg-white/50 px-5 text-left transition-all duration-200",
          "dark:border-white/10 dark:bg-white/[0.04]",
          "hover:bg-white/70 dark:hover:bg-white/[0.07]",
          open && "bg-white/80 shadow-[0_8px_24px_rgba(10,31,27,0.10)] ring-2 ring-[#D6A94A]/40 dark:bg-white/[0.08]",
        )}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A1F1B]/45 dark:text-white/40">
          <Users className="h-3 w-3 text-[#B4842A] dark:text-[#D6A94A]" />
          Passengers
        </span>
        <span className="mt-0.5 text-[19px] font-semibold text-[#0A1F1B] dark:text-white">
          {total} {total === 1 ? "passenger" : "passengers"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+10px)] z-30 w-[320px] rounded-[24px] border border-white/50 bg-white/90 p-4 shadow-[0_24px_60px_rgba(10,31,27,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E1F1B]/95"
          >
            <div className="flex flex-col divide-y divide-[#0A1F1B]/[0.06] dark:divide-white/[0.06]">
              {ROWS.map((row) => (
                <div key={row.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[15px] font-semibold text-[#0A1F1B] dark:text-white">
                      {row.label}
                    </p>
                    <p className="text-xs text-[#0A1F1B]/45 dark:text-white/40">{row.hint}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CounterButton
                      icon={<Minus className="h-3.5 w-3.5" />}
                      disabled={value[row.key] <= row.min}
                      onClick={() => update(row.key, -1, row.min)}
                    />
                    <span className="w-4 text-center text-[15px] font-semibold tabular-nums text-[#0A1F1B] dark:text-white">
                      {value[row.key]}
                    </span>
                    <CounterButton
                      icon={<Plus className="h-3.5 w-3.5" />}
                      disabled={total >= MAX_TOTAL}
                      onClick={() => update(row.key, 1, row.min)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[16px] bg-[#0E463F]/[0.06] px-4 py-2.5 dark:bg-white/[0.05]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-[#0A1F1B]/70 dark:text-white/60">
                <User className="h-3.5 w-3.5" />
                Total
              </span>
              <span className="text-sm font-bold text-[#0A1F1B] dark:text-white">{total}</span>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-[16px] bg-[#0E463F] py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] dark:bg-[#D6A94A] dark:text-[#0A1F1B]"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CounterButton({
  icon,
  disabled,
  onClick,
}: {
  icon: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-full border transition-colors",
        disabled
          ? "cursor-not-allowed border-[#0A1F1B]/10 text-[#0A1F1B]/20 dark:border-white/10 dark:text-white/20"
          : "border-[#0E463F]/20 text-[#0E463F] hover:border-[#0E463F] hover:bg-[#0E463F] hover:text-white dark:border-white/20 dark:text-white dark:hover:border-[#D6A94A] dark:hover:bg-[#D6A94A] dark:hover:text-[#0A1F1B]",
      )}
    >
      {icon}
    </motion.button>
  );
}
