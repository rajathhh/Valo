"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookingProgress } from "@/components/bus/booking-progress";
import { PaymentMethodCard } from "@/components/bus/payment-method";
import { PaymentSummary } from "@/components/bus/payment-summary";
import { mockPaymentMethods } from "@/lib/mock-data";
import { bookingStore } from "@/lib/booking-store";
import type { BookingState, PaymentMethod } from "@/types/bus";

export default function PaymentPage() {
  const router = useRouter();
  const [state, setState] = useState<BookingState>(bookingStore.getState());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = bookingStore.subscribe(() => setState(bookingStore.getState()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!state.selectedRoute) {
      router.replace("/bus/results");
    } else if (state.selectedSeats.length === 0) {
      router.replace("/bus/seat");
    } else if (state.passengers.length === 0) {
      router.replace("/bus/passenger");
    }
  }, [state.selectedRoute, state.selectedSeats.length, state.passengers.length, router]);

  if (!state.selectedRoute || state.selectedSeats.length === 0 || state.passengers.length === 0) {
    return null;
  }

  const route = state.selectedRoute;
  const fare = bookingStore.getFareSummary();

  const handleSelect = (method: PaymentMethod) => {
    bookingStore.setPaymentMethod(method);
  };

  const handlePay = () => {
    if (!state.paymentMethod || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      bookingStore.confirmBooking();
      router.push("/bus/ticket");
    }, 1600);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => router.push("/bus/offers")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Offers
        </button>

        <BookingProgress currentStep={4} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold text-white text-lg">Choose Payment Method</h2>
              <p className="text-sm text-slate-500 mt-1">Select how you&apos;d like to pay for your booking.</p>
            </div>

            <div className="space-y-3">
              {mockPaymentMethods.map((method, index) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={state.paymentMethod?.id === method.id}
                  onSelect={handleSelect}
                  index={index}
                />
              ))}
            </div>
          </div>

          <PaymentSummary
            fare={fare}
            route={{
              from: route.from,
              to: route.to,
              departureTime: route.departureTime,
              operator: { name: route.operator.name },
            }}
            passengerCount={state.passengers.length}
            appliedCoupon={state.appliedCoupon?.code ?? null}
            onPay={handlePay}
            isLoading={isLoading}
          />
        </div>

        {!state.paymentMethod && (
          <p className="text-center text-xs text-slate-500">Select a payment method to continue.</p>
        )}
      </div>
    </div>
  );
}
