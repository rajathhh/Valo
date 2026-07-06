"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BatteryCharging,
  Bed,
  Building2,
  Crown,
  Snowflake,
  Sparkles,
  Armchair,
  Ban,
  BusFront,
  Star,
} from "lucide-react";
import type { BusTypeId } from "./types";
import { BUS_TYPE_OPTIONS } from "./data";
import { cn } from "./utils";

const ICONS: Record<BusTypeId, ReactNode> = {
  ksrtc: <Building2 className="h-3.5 w-3.5" />,
  private: <BusFront className="h-3.5 w-3.5" />,
  volvo: <Star className="h-3.5 w-3.5" />,
  sleeper: <Bed className="h-3.5 w-3.5" />,
  "semi-sleeper": <Bed className="h-3.5 w-3.5" />,
  seater: <Armchair className="h-3.5 w-3.5" />,
  ac: <Snowflake className="h-3.5 w-3.5" />,
  "non-ac": <Ban className="h-3.5 w-3.5" />,
  electric: <BatteryCharging className="h-3.5 w-3.5" />,
  luxury: <Crown className="h-3.5 w-3.5" />,
};

interface BusTypeChipsProps {
  value: BusTypeId[];
  onChange: (value: BusTypeId[]) => void;
}

export function BusTypeChips({ value, onChange }: BusTypeChipsProps) {
  function toggle(id: BusTypeId) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  }

  return (
    <div>
      <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A1F1B]/45 dark:text-white/40">
        <Sparkles className="h-3 w-3 text-[#B4842A] dark:text-[#D6A94A]" />
        Bus type
        <span className="font-normal normal-case text-[#0A1F1B]/30 dark:text-white/25">
          &middot; optional
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {BUS_TYPE_OPTIONS.map((opt) => {
          const active = value.includes(opt.id);
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-150",
                active
                  ? "border-transparent bg-gradient-to-r from-[#0E463F] to-[#12615A] text-white shadow-[0_6px_16px_rgba(14,70,63,0.28)]"
                  : "border-[#0A1F1B]/12 bg-white/40 text-[#0A1F1B]/65 hover:border-[#0E463F]/30 hover:bg-white/70 hover:text-[#0E463F] dark:border-white/10 dark:bg-white/[0.03] dark:text-white/55 dark:hover:border-[#D6A94A]/30 dark:hover:bg-white/[0.07] dark:hover:text-[#D6A94A]",
              )}
            >
              {ICONS[opt.id]}
              {opt.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
