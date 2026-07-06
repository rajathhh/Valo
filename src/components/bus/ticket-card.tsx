"use client";

import { motion } from "framer-motion";
import { CheckCircle, Bus } from "lucide-react";
import { BookingState } from "@/types/bus";
import { TicketQR } from "./ticket-qr";
import { TicketTimeline } from "./ticket-timeline";
import { BusLogo } from "./bus-logo";
import { formatCurrency } from "@/lib/utils";

interface TicketCardProps {
  booking: BookingState;
  date: string;
}

export function TicketCard({ booking, date }: TicketCardProps) {
  const { selectedRoute, selectedSeats, passengers, bookingId, pnr } = booking;
  if (!selectedRoute) return null;

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <motion.div
      className="rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "linear-gradient(145deg, #16162a, #1a1a30)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,70,229,0.1)",
      }}
    >
      {/* Status bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))",
          borderBottom: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-emerald-400" />
          <span className="font-semibold text-emerald-300 text-sm">Booking Confirmed</span>
        </div>
        <div className="text-xs text-emerald-400/70 font-mono">{bookingId}</div>
      </div>

      <div className="p-6 space-y-6">
        {/* Operator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BusLogo initials={selectedRoute.operator.logo} size="lg" />
            <div>
              <div className="font-bold text-white text-lg">{selectedRoute.operator.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Bus size={11} />
                <span className="font-mono">{selectedRoute.busNumber}</span>
              </div>
            </div>
          </div>
          <TicketQR bookingId={bookingId} pnr={pnr} size={100} />
        </div>

        {/* Divider with dashes */}
        <div className="relative flex items-center gap-0">
          <div className="w-6 h-6 rounded-full -ml-9" style={{ background: "#0f0f1a" }} />
          <div className="flex-1 border-t-2 border-dashed border-white/10" />
          <div className="w-6 h-6 rounded-full -mr-9" style={{ background: "#0f0f1a" }} />
        </div>

        {/* Journey timeline */}
        <TicketTimeline
          from={selectedRoute.from}
          to={selectedRoute.to}
          departureTime={selectedRoute.departureTime}
          arrivalTime={selectedRoute.arrivalTime}
          duration={selectedRoute.duration}
          boardingPoint={selectedRoute.boardingPoint}
          droppingPoint={selectedRoute.droppingPoint}
          date={date}
        />

        {/* Divider */}
        <div className="relative flex items-center gap-0">
          <div className="w-6 h-6 rounded-full -ml-9" style={{ background: "#0f0f1a" }} />
          <div className="flex-1 border-t-2 border-dashed border-white/10" />
          <div className="w-6 h-6 rounded-full -mr-9" style={{ background: "#0f0f1a" }} />
        </div>

        {/* Passengers & Seats */}
        <div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Passengers</div>
          <div className="space-y-2">
            {passengers.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{p.name || "Passenger"}</div>
                    <div className="text-xs text-slate-500 capitalize">{p.gender} · {p.age} yrs</div>
                  </div>
                </div>
                <div className="text-xs font-mono px-2 py-1 rounded-lg text-indigo-300" style={{ background: "rgba(79,70,229,0.12)" }}>
                  Seat {p.seatNumber}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PNR & Payment */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs text-slate-500 mb-1">PNR Number</div>
            <div className="font-mono font-bold text-white text-sm tracking-wider">{pnr}</div>
          </div>
          <div className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs text-slate-500 mb-1">Amount Paid</div>
            <div className="font-bold text-white text-sm">{formatCurrency(totalAmount)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
