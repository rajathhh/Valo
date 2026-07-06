"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, isSameDay, startOfDay } from "./utils";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return startOfDay(d);
}

function nextWeekendSaturday(from: Date): Date {
  const d = new Date(from);
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  return addDays(d, diff);
}

function nextFriday(from: Date): Date {
  const d = new Date(from);
  const day = d.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  return addDays(d, diff);
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(value.getFullYear(), value.getMonth(), 1),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => startOfDay(new Date()), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const days = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<Date | null> = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewMonth]);

  function pick(date: Date) {
    onChange(startOfDay(date));
    setViewMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setOpen(false);
  }

  const quickPicks = [
    { label: "Today", date: today },
    { label: "Tomorrow", date: addDays(today, 1) },
    { label: "This weekend", date: nextWeekendSaturday(today) },
    { label: "Next Friday", date: nextFriday(today) },
  ];

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
          <Calendar className="h-3 w-3 text-[#B4842A] dark:text-[#D6A94A]" />
          Journey date
        </span>
        <span className="mt-0.5 text-[19px] font-semibold text-[#0A1F1B] dark:text-white">
          {value.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+10px)] z-30 w-[320px] rounded-[24px] border border-white/50 bg-white/90 p-4 shadow-[0_24px_60px_rgba(10,31,27,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E1F1B]/95 sm:w-[340px]"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPicks.map((qp) => (
                <button
                  key={qp.label}
                  type="button"
                  onClick={() => pick(qp.date)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    isSameDay(qp.date, value)
                      ? "border-[#0E463F] bg-[#0E463F] text-white dark:border-[#D6A94A] dark:bg-[#D6A94A] dark:text-[#0A1F1B]"
                      : "border-[#0A1F1B]/15 text-[#0A1F1B]/70 hover:border-[#0E463F]/40 hover:text-[#0E463F] dark:border-white/15 dark:text-white/60 dark:hover:border-[#D6A94A]/50 dark:hover:text-[#D6A94A]",
                  )}
                >
                  {qp.label}
                </button>
              ))}
            </div>

            <div className="mb-2 flex items-center justify-between px-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() =>
                  setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
                }
                className="grid h-7 w-7 place-items-center rounded-full text-[#0A1F1B]/50 transition-colors hover:bg-[#0A1F1B]/[0.06] dark:text-white/50 dark:hover:bg-white/[0.08]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold text-[#0A1F1B] dark:text-white">
                {viewMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
                }
                className="grid h-7 w-7 place-items-center rounded-full text-[#0A1F1B]/50 transition-colors hover:bg-[#0A1F1B]/[0.06] dark:text-white/50 dark:hover:bg-white/[0.08]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
              {WEEKDAYS.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="text-[11px] font-semibold text-[#0A1F1B]/35 dark:text-white/30"
                >
                  {w}
                </span>
              ))}
              {days.map((d, i) => {
                if (!d) return <span key={`empty-${i}`} />;
                const disabled = d < today;
                const selected = isSameDay(d, value);
                const isToday = isSameDay(d, today);
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    disabled={disabled}
                    onClick={() => pick(d)}
                    className={cn(
                      "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition-colors",
                      disabled &&
                        "cursor-not-allowed text-[#0A1F1B]/20 dark:text-white/15",
                      !disabled &&
                        !selected &&
                        "text-[#0A1F1B]/80 hover:bg-[#0E463F]/10 dark:text-white/70 dark:hover:bg-white/10",
                      selected &&
                        "bg-[#0E463F] text-white shadow-[0_4px_14px_rgba(14,70,63,0.35)] dark:bg-[#D6A94A] dark:text-[#0A1F1B]",
                      !selected && isToday && !disabled && "ring-1 ring-[#D6A94A]/60",
                    )}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
