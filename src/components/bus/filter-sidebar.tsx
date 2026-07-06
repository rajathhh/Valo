"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const BUS_TYPES = ["Seater", "Sleeper", "Semi-Sleeper"];
const AMENITIES = ["WiFi", "Charging", "Blanket", "Water Bottle", "USB", "Live Tracking"];
const DEPARTURE_TIMES = [
  { label: "Before 6 AM", value: "before-6" },
  { label: "6 AM – 12 PM", value: "6-12" },
  { label: "12 PM – 6 PM", value: "12-18" },
  { label: "After 6 PM", value: "after-18" },
];

const RATINGS = [4.5, 4.0, 3.5, 3.0];
const OPERATORS = ["KSRTC Swift", "Kallada Travels", "Parveen Travels", "VRL Travels"];

interface FilterSidebarProps {
  onSortChange?: (sort: string) => void;
  activeSort?: string;
}

type CheckedState = Record<string, boolean>;

export function FilterSidebar({ onSortChange, activeSort = "recommended" }: FilterSidebarProps) {
  const [busTypes, setBusTypes] = useState<CheckedState>({});
  const [amenities, setAmenities] = useState<CheckedState>({});
  const [departures, setDepartures] = useState<CheckedState>({});
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedOperators, setSelectedOperators] = useState<CheckedState>({});

  const toggleFilter = (state: CheckedState, setState: React.Dispatch<React.SetStateAction<CheckedState>>, key: string) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = () => {
    setBusTypes({});
    setAmenities({});
    setDepartures({});
    setMinRating(null);
    setSelectedOperators({});
  };

  const hasFilters = Object.values({ ...busTypes, ...amenities, ...departures, ...selectedOperators }).some(Boolean) || minRating !== null;

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "departure", label: "Departure Time" },
    { value: "duration", label: "Duration" },
    { value: "rating", label: "Top Rated" },
  ];

  return (
    <div className="space-y-5">
      {/* Sort */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={15} className="text-indigo-400" />
          <h3 className="font-semibold text-white text-sm">Sort By</h3>
        </div>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange?.(opt.value)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                activeSort === opt.value
                  ? "text-indigo-300 font-medium"
                  : "text-slate-400 hover:text-slate-200"
              )}
              style={activeSort === opt.value ? { background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.2)" } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-sm">Filters</h3>
          {hasFilters && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300">
              <X size={11} />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* Bus Type */}
          <FilterSection title="Bus Type">
            {BUS_TYPES.map((type) => (
              <FilterChip
                key={type}
                label={type}
                checked={!!busTypes[type]}
                onChange={() => toggleFilter(busTypes, setBusTypes, type)}
              />
            ))}
          </FilterSection>

          {/* Departure Time */}
          <FilterSection title="Departure Time">
            {DEPARTURE_TIMES.map((t) => (
              <FilterChip
                key={t.value}
                label={t.label}
                checked={!!departures[t.value]}
                onChange={() => toggleFilter(departures, setDepartures, t.value)}
              />
            ))}
          </FilterSection>

          {/* Amenities */}
          <FilterSection title="Amenities">
            {AMENITIES.map((a) => (
              <FilterChip
                key={a}
                label={a}
                checked={!!amenities[a]}
                onChange={() => toggleFilter(amenities, setAmenities, a)}
              />
            ))}
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Minimum Rating">
            <div className="flex gap-2 flex-wrap">
              {RATINGS.map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(minRating === r ? null : r)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                    minRating === r
                      ? "text-amber-300 border-amber-500/40"
                      : "text-slate-400 hover:text-amber-300"
                  )}
                  style={{
                    background: minRating === r ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
                    border: minRating === r ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Star size={10} fill={minRating === r ? "currentColor" : "none"} />
                  {r}+
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Operators */}
          <FilterSection title="Operators">
            {OPERATORS.map((op) => (
              <FilterChip
                key={op}
                label={op}
                checked={!!selectedOperators[op]}
                onChange={() => toggleFilter(selectedOperators, setSelectedOperators, op)}
              />
            ))}
          </FilterSection>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <motion.button
      onClick={onChange}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200",
        checked ? "text-indigo-300" : "text-slate-400 hover:text-slate-200"
      )}
      style={checked ? { background: "rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.25)" } : { background: "transparent" }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 transition-all",
          checked ? "bg-indigo-500" : "border border-white/15"
        )}
      >
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </div>
      {label}
    </motion.button>
  );
}
