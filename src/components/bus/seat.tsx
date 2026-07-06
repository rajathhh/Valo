"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Seat as SeatType, SeatType as SeatStatus } from "@/types/bus";
import { cn } from "@/lib/utils";

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  onToggle: (seat: SeatType) => void;
}

const seatStyles: Record<SeatStatus, string> = {
  available: "cursor-pointer hover:border-indigo-400/60 hover:text-white",
  booked: "cursor-not-allowed opacity-60",
  ladies: "cursor-pointer hover:border-pink-400/60",
  reserved: "cursor-not-allowed opacity-60",
  selected: "cursor-pointer",
  empty: "opacity-0 pointer-events-none",
};

const seatColors: Record<SeatStatus, React.CSSProperties> = {
  available: { background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)" },
  booked: { background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.25)" },
  ladies: { background: "rgba(236,72,153,0.08)", border: "1.5px solid rgba(236,72,153,0.3)" },
  reserved: { background: "rgba(245,158,11,0.08)", border: "1.5px solid rgba(245,158,11,0.25)" },
  selected: { background: "linear-gradient(135deg, rgba(79,70,229,0.4), rgba(124,58,237,0.4))", border: "1.5px solid rgba(79,70,229,0.6)" },
  empty: {},
};

export function Seat({ seat, isSelected, onToggle }: SeatProps) {
  if (seat.type === "empty") {
    return <div className="w-10 h-10" />;
  }

  const isClickable = seat.type === "available" || seat.type === "ladies" || isSelected;
  const status: SeatStatus = isSelected ? "selected" : seat.type;

  return (
    <motion.button
      onClick={() => isClickable && onToggle(seat)}
      className={cn(
        "relative w-10 h-10 rounded-xl flex items-center justify-center text-xs font-semibold transition-all duration-200",
        seatStyles[status]
      )}
      style={seatColors[status]}
      whileHover={isClickable ? { scale: 1.08, y: -1 } : {}}
      whileTap={isClickable ? { scale: 0.92 } : {}}
      title={`Seat ${seat.number}${seat.type === "booked" ? " (Booked)" : seat.type === "ladies" ? " (Ladies)" : ""}`}
    >
      {isSelected ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
          <Check size={14} className="text-indigo-300" />
        </motion.div>
      ) : seat.type === "booked" || seat.type === "reserved" ? (
        <X size={12} className="text-rose-400/70" />
      ) : (
        <span className={cn(
          "text-xs",
          status === "ladies" ? "text-pink-300" : "text-slate-400"
        )}>
          {seat.number}
        </span>
      )}

      {/* Seat back visual */}
      <div
        className="absolute top-0 left-0 right-0 h-2 rounded-t-xl opacity-50"
        style={{
          background: isSelected
            ? "rgba(79,70,229,0.6)"
            : seat.type === "ladies"
            ? "rgba(236,72,153,0.4)"
            : seat.type === "booked"
            ? "rgba(239,68,68,0.3)"
            : "rgba(255,255,255,0.08)",
        }}
      />
    </motion.button>
  );
}
