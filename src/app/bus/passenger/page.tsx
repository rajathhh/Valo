"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookingProgress } from "@/components/bus/booking-progress";
import { PassengerForm } from "@/components/bus/passenger-form";
import { FareSummary } from "@/components/bus/fare-summary";
import { bookingStore } from "@/lib/booking-store";
import type { BookingState, Passenger } from "@/types/bus";

type ErrorsMap = Record<string, Partial<Record<keyof Passenger, string>>>;

function buildInitialPassengers(state: BookingState): Passenger[] {
  return state.selectedSeats.map((seat) => {
    const existing = state.passengers.find((p) => p.seatId === seat.id);
    if (existing) return existing;
    return {
      id: `pax-${seat.id}`,
      seatNumber: seat.number,
      seatId: seat.id,
      name: "",
      age: "",
      gender: "" as Passenger["gender"],
      phone: "",
      email: "",
    };
  });
}

function validatePassenger(passenger: Passenger): Partial<Record<keyof Passenger, string>> {
  const errors: Partial<Record<keyof Passenger, string>> = {};

  if (!passenger.name.trim()) errors.name = "Name is required";
  else if (passenger.name.trim().length < 2) errors.name = "Name is too short";

  const age = Number(passenger.age);
  if (!passenger.age) errors.age = "Age is required";
  else if (Number.isNaN(age) || age < 1 || age > 120) errors.age = "Enter a valid age";

  if (!passenger.gender) errors.gender = "Select a gender";

  if (!passenger.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\+?\d{10,13}$/.test(passenger.phone.replace(/\s/g, ""))) errors.phone = "Enter a valid phone number";

  if (!passenger.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email.trim())) errors.email = "Enter a valid email";

  return errors;
}

export default function PassengerPage() {
  const router = useRouter();
  const [state, setState] = useState<BookingState>(bookingStore.getState());
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [errors, setErrors] = useState<ErrorsMap>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = bookingStore.subscribe(() => setState(bookingStore.getState()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!state.selectedRoute || state.selectedSeats.length === 0) {
      router.replace(state.selectedRoute ? "/bus/seat" : "/bus/results");
      return;
    }
    if (!initialized) {
      setPassengers(buildInitialPassengers(state));
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedRoute, state.selectedSeats.length]);

  const fare = useMemo(() => bookingStore.getFareSummary(), [state.selectedSeats, state.appliedCoupon]);
  const selectedSeatNumbers = state.selectedSeats.map((s) => s.number);

  if (!state.selectedRoute || state.selectedSeats.length === 0 || !initialized) {
    return null;
  }

  const handleChange = (updated: Passenger) => {
    setPassengers((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setErrors((prev) => ({ ...prev, [updated.id]: {} }));
  };

  const handleContinue = () => {
    const nextErrors: ErrorsMap = {};
    let hasErrors = false;

    passengers.forEach((p) => {
      const passengerErrors = validatePassenger(p);
      if (Object.keys(passengerErrors).length > 0) {
        hasErrors = true;
        nextErrors[p.id] = passengerErrors;
      }
    });

    setErrors(nextErrors);
    if (hasErrors) return;

    bookingStore.setPassengers(passengers);
    router.push("/bus/offers");
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => router.push("/bus/seat")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Seat Selection
        </button>

        <BookingProgress currentStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold text-white text-lg">Passenger Details</h2>
              <p className="text-sm text-slate-500 mt-1">
                Please provide details for all {passengers.length} passenger{passengers.length > 1 ? "s" : ""}.
              </p>
            </div>

            {passengers.map((passenger, index) => (
              <PassengerForm
                key={passenger.id}
                passenger={passenger}
                index={index}
                onChange={handleChange}
                errors={errors[passenger.id] || {}}
              />
            ))}
          </div>

          <FareSummary
            fare={fare}
            selectedSeats={selectedSeatNumbers}
            nextLabel="Continue to Offers"
            onContinue={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
