"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Home, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { TicketCard } from "@/components/bus/ticket-card";
import { bookingStore } from "@/lib/booking-store";
import { formatDate } from "@/lib/utils";
import type { BookingState } from "@/types/bus";

export default function TicketPage() {
  const router = useRouter();
  const [state, setState] = useState<BookingState>(bookingStore.getState());

  useEffect(() => {
    const unsubscribe = bookingStore.subscribe(() => setState(bookingStore.getState()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!state.selectedRoute || !state.bookingId) {
      router.replace(state.selectedRoute ? "/bus/payment" : "/bus/results");
    }
  }, [state.selectedRoute, state.bookingId, router]);

  if (!state.selectedRoute || !state.bookingId) {
    return null;
  }

  const date = formatDate(new Date());

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <motion.div
          className="flex flex-col items-center text-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            <PartyPopper size={24} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">Your Trip is Booked!</h1>
          <p className="text-sm text-slate-500">
            A confirmation with your e-ticket has been sent to your email and phone.
          </p>
        </motion.div>

        <TicketCard booking={state} date={date} />

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => window.print()} className="btn-primary flex-1">
            <Download size={16} />
            Download Ticket
          </button>
          <button onClick={() => router.push("/bus/results")} className="btn-ghost flex-1">
            <Home size={16} />
            Book Another Trip
          </button>
        </div>
      </div>
    </div>
  );
}
