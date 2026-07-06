"use client";

import { motion } from "framer-motion";
import { User, DoorOpen, AlertTriangle } from "lucide-react";
import { Seat as SeatType } from "@/types/bus";
import { Seat } from "./seat";

interface SeatLayoutProps {
  seats: SeatType[];
  selectedSeats: SeatType[];
  layout: "2+2" | "2+1" | "1+1";
  onSeatToggle: (seat: SeatType) => void;
}

export function SeatLayout({ seats, selectedSeats, layout, onSeatToggle }: SeatLayoutProps) {
  const selectedIds = new Set(selectedSeats.map((s) => s.id));
  const rows = Math.max(...seats.map((s) => s.row));
  const cols = layout === "2+2" ? ["A", "B", "", "C", "D"] : ["A", "B", "", "C"];

  const getSeat = (row: number, col: string) => seats.find((s) => s.row === row && s.number === `${row}${col}`);

  return (
    <div className="relative">
      {/* Bus shell */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Driver cabin */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "rgba(79,70,229,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)" }}
            >
              <User size={16} className="text-indigo-400" />
            </div>
            <span className="text-xs text-slate-500">Driver</span>
          </div>
          <div className="flex items-center gap-2">
            <DoorOpen size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">Entrance</span>
          </div>
        </div>

        {/* Seat grid */}
        <div className="p-6">
          {/* Column labels */}
          <div className="flex gap-3 mb-3 pl-8">
            {cols.map((col, i) =>
              col ? (
                <div key={i} className="w-10 text-center text-xs text-slate-600 font-medium">
                  {col}
                </div>
              ) : (
                <div key={i} className="w-4" />
              )
            )}
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
              <motion.div
                key={row}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: row * 0.03 }}
              >
                <div className="w-5 text-center text-xs text-slate-600 font-mono">{row}</div>
                <div className="flex gap-3">
                  {cols.map((col, colIdx) => {
                    if (!col) return <div key={colIdx} className="w-4" />;
                    const seat = getSeat(row, col);
                    if (!seat) return <div key={colIdx} className="w-10 h-10" />;
                    return (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedIds.has(seat.id)}
                        onToggle={onSeatToggle}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency exit */}
        <div
          className="flex items-center justify-end px-6 py-3 gap-2"
          style={{ background: "rgba(245,158,11,0.05)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <AlertTriangle size={12} className="text-amber-500/60" />
          <span className="text-xs text-slate-600">Emergency Exit</span>
        </div>
      </div>
    </div>
  );
}
