"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookingProgress } from "@/components/bus/booking-progress";
import { SeatLayout } from "@/components/bus/seat-layout";
import { SeatLegend } from "@/components/bus/seat-legend";
import { FareSummary } from "@/components/bus/fare-summary";
import { TripTimeline } from "@/components/bus/trip-timeline";
import { BusLogo } from "@/components/bus/bus-logo";
import { bookingStore } from "@/lib/booking-store";
import type { BookingState, Seat } from "@/types/bus";

export default function SeatPage() {
  const router = useRouter();
  const [state, setState] = useState<BookingState>(bookingStore.getState());

  useEffect(() => {
    const unsubscribe = bookingStore.subscribe(() => setState(bookingStore.getState()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!state.selectedRoute) {
      router.replace("/bus/results");
    }
  }, [state.selectedRoute, router]);

  if (!state.selectedRoute) {
    return null;
  }

  const route = state.selectedRoute;

  const handleSeatToggle = (seat: Seat) => {
    bookingStore.toggleSeat(seat);
  };

  const fare = bookingStore.getFareSummary();
  const selectedSeatNumbers = state.selectedSeats.map((s) => s.number);

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => router.push("/bus/results")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Results
        </button>

        <BookingProgress currentStep={1} />

        <div className="card p-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <BusLogo initials={route.operator.logo} />
              <div>
                <div className="font-semibold text-white">{route.operator.name}</div>
                <div className="text-xs text-slate-500 mt-0.5 capitalize">
                  {route.operator.type} · {route.operator.layout} Seater · {route.busNumber}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <TripTimeline
                departureTime={route.departureTime}
                arrivalTime={route.arrivalTime}
                duration={route.duration}
                from={route.from}
                to={route.to}
                compact
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-6">
            <div className="card p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="font-semibold text-white">Select Your Seats</h2>
                <SeatLegend />
              </div>
              <SeatLayout
                seats={route.seats}
                selectedSeats={state.selectedSeats}
                layout={route.operator.layout}
                onSeatToggle={handleSeatToggle}
              />
            </div>
          </div>

          <FareSummary
            fare={fare}
            selectedSeats={selectedSeatNumbers}
            nextPath="/bus/passenger"
            nextLabel="Continue to Passenger Details"
          />
        </div>
      </div>
    </div>
  );
}
