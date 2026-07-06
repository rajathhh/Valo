"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "./utils";

interface PriceCardProps {
  price: number;
  taxes: number;
  seatsLeft: number;
  onViewSeats: () => void;
  className?: string;
}

export function PriceCard({ price, taxes, seatsLeft, onViewSeats, className = "" }: PriceCardProps) {
  const urgent = seatsLeft <= 10;

  return (
    <div className={cn("flex flex-col justify-between", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0A1F1B]/40 dark:text-white/35">
          Starting from
        </p>
        <p className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[15px] font-bold text-[#0A1F1B]/50 dark:text-white/40">₹</span>
          <span className="text-[40px] font-black leading-none tracking-tight text-[#0E463F] dark:text-[#7FD8C8]">
            {price.toLocaleString("en-IN")}
          </span>
        </p>
        <p className="mt-1 text-xs text-[#0A1F1B]/40 dark:text-white/35">
          + ₹{taxes} taxes &amp; fees
        </p>
        <p
          className={cn(
            "mt-2.5 inline-flex items-center gap-1 text-sm font-bold",
            urgent ? "text-[#B4472C]" : "text-[#0E463F] dark:text-[#7FD8C8]",
          )}
        >
          {urgent && <Flame className="h-3.5 w-3.5" />}
          {seatsLeft} seats left
        </p>
      </div>

      <motion.button
        type="button"
        onClick={onViewSeats}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0E463F] to-[#167A6C] py-3.5 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(14,70,63,0.3)] transition-shadow hover:shadow-[0_14px_30px_rgba(14,70,63,0.4)]"
      >
        View seats
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
