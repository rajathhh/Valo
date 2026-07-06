"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Search, TriangleAlert } from "lucide-react";
import type { BusSearchQuery, BusTypeId, City, PassengerCounts } from "./types";
import { DEFAULT_PASSENGERS } from "./data";
import { LocationAutocomplete } from "./location-autocomplete";
import { SwapButton } from "./swap-button";
import { PassengerSelector } from "./passenger-selector";
import { DatePicker } from "./date-picker";
import { BusTypeChips } from "./bus-type-chips";
import { startOfDay } from "./utils";
import { useRouter } from "next/navigation";

export interface BusSearchCardProps {
  onSearch?: (query: BusSearchQuery) => void | Promise<void>;
  className?: string;
}

export function BusSearchCard({ onSearch, className = "" }: BusSearchCardProps) {
  const [from, setFrom] = useState<City | null>(null);
  const [to, setTo] = useState<City | null>(null);
  const [date, setDate] = useState<Date>(() => startOfDay(new Date()));
  const [passengers, setPassengers] = useState<PassengerCounts>(DEFAULT_PASSENGERS);
  const [busTypes, setBusTypes] = useState<BusTypeId[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  

  const sameCity = !!from && !!to && from.id === to.id;
  const canSearch = !!from && !!to && !sameCity && !isSearching;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  async function handleSearch() {
    if (!canSearch || !from || !to) return;
    setIsSearching(true);
    try {
      if (onSearch) {
  await onSearch({
    from,
    to,
    date,
    passengers,
    busTypes,
  });
} else {
  router.push(
  `/bus/results?from=${encodeURIComponent(from.name)}&to=${encodeURIComponent(
    to.name
  )}&date=${date.toISOString()}`
);
}
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className={`relative w-full max-w-[880px] ${className}`}>
      {/* ambient aura behind the card */}
      <div
        aria-hidden
        className="valo-aura pointer-events-none absolute -inset-6 -z-10 rounded-[48px] opacity-70 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-visible rounded-[32px] border border-white/50 bg-white/60 p-6 shadow-[0_30px_80px_rgba(10,31,27,0.18)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0A1F1B]/60 sm:p-8"
      >
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-[var(--valo-display)] text-2xl font-extrabold tracking-tight text-[#0A1F1B] dark:text-white">
              VALO
            </p>
            <p className="text-sm text-[#0A1F1B]/50 dark:text-white/40">
              Book intercity buses across Kerala, reimagined.
            </p>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full bg-[#D6A94A]/15 px-3 py-1.5 text-xs font-semibold text-[#8A661F] dark:bg-[#D6A94A]/10 dark:text-[#D6A94A] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D6A94A]" />
            AI-matched routes
          </div>
        </div>

        {/* FROM / TO */}
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
          <LocationAutocomplete
            label="From"
            placeholder="Leaving from"
            value={from}
            onChange={setFrom}
            excludeId={to?.id}
            accent="gold"
          />

          <div className="z-20 flex justify-center md:mx-[-14px]">
            <SwapButton onSwap={handleSwap} />
          </div>

          <LocationAutocomplete
            label="To"
            placeholder="Going to"
            value={to}
            onChange={setTo}
            excludeId={from?.id}
            accent="coral"
          />
        </div>

        {sameCity && (
          <p className="mt-2 flex items-center gap-1.5 px-1 text-xs font-medium text-[#B4472C]">
            <TriangleAlert className="h-3.5 w-3.5" />
            Origin and destination can&apos;t be the same city.
          </p>
        )}

        {/* DATE / PASSENGERS */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <DatePicker value={date} onChange={setDate} />
          <PassengerSelector value={passengers} onChange={setPassengers} />
        </div>

        {/* BUS TYPES */}
        <div className="mt-5">
          <BusTypeChips value={busTypes} onChange={setBusTypes} />
        </div>

        {/* SEARCH */}
        <motion.button
          type="button"
          disabled={!canSearch}
          onClick={handleSearch}
          whileHover={canSearch ? { scale: 1.01 } : undefined}
          whileTap={canSearch ? { scale: 0.98 } : undefined}
          className="group relative mt-6 flex h-[60px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[20px] text-[16px] font-bold text-white shadow-[0_16px_36px_rgba(255,107,74,0.35)] transition-shadow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          style={{
            backgroundImage:
              "linear-gradient(100deg, #0E463F 0%, #167A6C 45%, #D6A94A 78%, #FF6B4A 100%)",
            backgroundSize: "200% 100%",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#12615A_0%,#1C9385_45%,#E3B75B_78%,#FF7D5C_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {isSearching ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Finding your best buses&hellip;
            </>
          ) : (
            <>
              <Search className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              Search buses
            </>
          )}
        </motion.button>
      </motion.div>

    </div>
  );
}

export default BusSearchCard;
