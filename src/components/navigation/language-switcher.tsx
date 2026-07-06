"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import * as React from "react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  function setLocale(next: Locale) {
    document.cookie = `VALO_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <Languages className="size-3.5" />
        {localeNames[locale]}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-elevated)]"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={locale === l}
                onClick={() => setLocale(l)}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-surface-raised)]",
                  locale === l && "font-semibold text-[var(--brand-primary)]"
                )}
              >
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
