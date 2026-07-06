"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookingProgress } from "@/components/bus/booking-progress";
import { CouponList } from "@/components/bus/coupon-list";
import { FareSummary } from "@/components/bus/fare-summary";
import { mockCoupons } from "@/lib/mock-data";
import { bookingStore } from "@/lib/booking-store";
import type { BookingState, Coupon } from "@/types/bus";

export default function OffersPage() {
  const router = useRouter();
  const [state, setState] = useState<BookingState>(bookingStore.getState());

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

  const fare = bookingStore.getFareSummary();
  const selectedSeatNumbers = state.selectedSeats.map((s) => s.number);

  const handleApply = (coupon: Coupon) => {
    bookingStore.applyCoupon(coupon);
  };

  const handleRemove = (_coupon: Coupon) => {
    bookingStore.removeCoupon();
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => router.push("/bus/passenger")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Passenger Details
        </button>

        <BookingProgress currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold text-white text-lg">Coupons & Offers</h2>
              <p className="text-sm text-slate-500 mt-1">Apply a coupon to save on your booking.</p>
            </div>

            <CouponList
              coupons={mockCoupons}
              appliedCouponId={state.appliedCoupon?.id ?? null}
              totalAmount={fare.baseFare}
              onApply={handleApply}
              onRemove={handleRemove}
            />
          </div>

          <FareSummary
            fare={fare}
            selectedSeats={selectedSeatNumbers}
            nextPath="/bus/payment"
            nextLabel="Continue to Payment"
            appliedCoupon={state.appliedCoupon?.code ?? null}
          />
        </div>
      </div>
    </div>
  );
}
