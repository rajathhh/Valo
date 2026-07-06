"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Search, TrendingUp, X } from "lucide-react";
import type { City } from "./types";
import { ALL_CITIES, POPULAR_CITY_IDS, RECENT_SEARCH_IDS } from "./data";
import { cn } from "./utils";

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  value: City | null;
  onChange: (city: City) => void;
  excludeId?: string;
  accent?: "gold" | "coral";
}

export function LocationAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  excludeId,
  accent = "gold",
}: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const popular = useMemo(
    () =>
      POPULAR_CITY_IDS.map((id) => ALL_CITIES.find((c) => c.id === id)).filter(
        (c): c is City => !!c && c.id !== excludeId,
      ),
    [excludeId],
  );

  const recent = useMemo(
    () =>
      RECENT_SEARCH_IDS.map((id) => ALL_CITIES.find((c) => c.id === id)).filter(
        (c): c is City => !!c && c.id !== excludeId,
      ),
    [excludeId],
  );

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return ALL_CITIES.filter(
      (c) =>
        c.id !== excludeId &&
        (c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)),
    ).slice(0, 8);
  }, [query, excludeId]);

  function handleSelect(city: City) {
    onChange(city);
    setQuery("");
    setOpen(false);
  }

  const accentText =
    accent === "gold" ? "text-[#B4842A] dark:text-[#D6A94A]" : "text-[#FF6B4A]";
  const accentRing =
    accent === "gold"
      ? "focus-within:ring-[#D6A94A]/40 focus-within:border-[#D6A94A]/70"
      : "focus-within:ring-[#FF6B4A]/40 focus-within:border-[#FF6B4A]/70";

  return (
    <div ref={rootRef} className="relative flex-1">
      <div
        className={cn(
          "group flex h-[76px] flex-col justify-center rounded-[22px] border border-white/40 bg-white/50 px-5 transition-all duration-200",
          "dark:border-white/10 dark:bg-white/[0.04]",
          "focus-within:bg-white/80 focus-within:shadow-[0_8px_24px_rgba(10,31,27,0.10)] focus-within:ring-2 dark:focus-within:bg-white/[0.08]",
          accentRing,
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A1F1B]/45 dark:text-white/40",
          )}
        >
          <MapPin className={cn("h-3 w-3", accentText)} />
          {label}
        </label>
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          autoComplete="off"
          value={open ? query : value ? value.name : query}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="mt-0.5 w-full truncate bg-transparent text-[19px] font-semibold text-[#0A1F1B] outline-none placeholder:text-[#0A1F1B]/30 dark:text-white dark:placeholder:text-white/25"
        />
        {value && !open && (
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium text-[#0A1F1B]/35 dark:text-white/30">
            {value.code}
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 max-h-[360px] overflow-y-auto rounded-[24px] border border-white/50 bg-white/90 p-2 shadow-[0_24px_60px_rgba(10,31,27,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E1F1B]/95"
          >
            {query.trim() ? (
              suggestions.length > 0 ? (
                <Section title="Suggestions" icon={<Search className="h-3.5 w-3.5" />}>
                  {suggestions.map((c) => (
                    <CityRow key={c.id} city={c} onSelect={handleSelect} />
                  ))}
                </Section>
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                  <X className="h-5 w-5 text-[#0A1F1B]/25 dark:text-white/25" />
                  <p className="text-sm text-[#0A1F1B]/50 dark:text-white/40">
                    No cities match &ldquo;{query}&rdquo;
                  </p>
                </div>
              )
            ) : (
              <>
                {recent.length > 0 && (
                  <Section title="Recent searches" icon={<Clock className="h-3.5 w-3.5" />}>
                    {recent.map((c) => (
                      <CityRow key={c.id} city={c} onSelect={handleSelect} />
                    ))}
                  </Section>
                )}
                <Section
                  title="Popular cities"
                  icon={<TrendingUp className="h-3.5 w-3.5" />}
                >
                  {popular.map((c) => (
                    <CityRow key={c.id} city={c} onSelect={handleSelect} />
                  ))}
                </Section>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-1 last:mb-0">
      <div className="flex items-center gap-1.5 px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0A1F1B]/40 dark:text-white/35">
        {icon}
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function CityRow({
  city,
  onSelect,
}: {
  city: City;
  onSelect: (city: City) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(city)}
      className="flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-left transition-colors hover:bg-[#0A1F1B]/[0.05] dark:hover:bg-white/[0.06]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0E463F]/[0.08] text-[#0E463F] dark:bg-white/10 dark:text-[#D6A94A]">
        <MapPin className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-[#0A1F1B] dark:text-white">
          {city.name}
        </span>
        <span className="block truncate text-xs text-[#0A1F1B]/45 dark:text-white/40">
          {city.state}
        </span>
      </span>
      <span className="shrink-0 text-xs font-medium text-[#0A1F1B]/35 dark:text-white/30">
        {city.code}
      </span>
    </button>
  );
}
