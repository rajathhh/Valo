"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useThemeStore, type ThemeMode } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

const options: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
  { mode: "light", icon: Sun, label: "Light theme" },
  { mode: "dark", icon: Moon, label: "Dark theme" },
  { mode: "system", icon: Monitor, label: "System theme" },
];

export function ThemeToggle() {
  const { mode, setMode } = useThemeStore();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] p-1"
    >
      {options.map(({ mode: m, icon: Icon, label }) => (
        <button
          key={m}
          role="radio"
          aria-checked={mode === m}
          aria-label={label}
          onClick={() => setMode(m)}
          className={cn(
            "flex size-7 items-center justify-center rounded-full transition-colors",
            mode === m
              ? "bg-[var(--brand-primary)] text-white"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
