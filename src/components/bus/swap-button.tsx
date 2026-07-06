"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
  className?: string;
}

export function SwapButton({ onSwap, className = "" }: SwapButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onSwap}
      aria-label="Swap from and to cities"
      className={`valo-swap-orb group relative grid h-12 w-12 shrink-0 place-items-center rounded-full ${className}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
    >
      {/* breathing brass ring */}
      <span className="valo-swap-ring absolute inset-0 rounded-full" />
      {/* glass disc */}
      <span className="absolute inset-[3px] rounded-full bg-white/80 shadow-[0_2px_10px_rgba(10,31,27,0.18)] backdrop-blur-xl transition-colors dark:bg-white/10" />
      <motion.span
        className="relative z-10 grid place-items-center text-[#0E463F] dark:text-[#EAF5F1]"
        whileTap={{ rotate: 180 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <ArrowLeftRight className="h-5 w-5 rotate-90 md:rotate-0" strokeWidth={2.25} />
      </motion.span>
    </motion.button>
  );
}
