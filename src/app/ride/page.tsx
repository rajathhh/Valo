import type { Metadata } from "next";
import { RideBookingFlow } from "@/features/ride/components/ride-booking-flow";

export const metadata: Metadata = {
  title: "Book a Ride",
  description: "Book an auto, bike, or cab ride anywhere across Kerala's 14 districts with live fare estimates.",
};

export default function RidePage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-medium text-[var(--text-primary)]">Book a ride</h1>
        <p className="mt-2 max-w-xl text-[var(--text-secondary)]">
          Real-time fares, transparent surge pricing, and drivers who know Kerala&apos;s roads — from city hops to
          hill-station transfers.
        </p>
      </div>
      <RideBookingFlow />
    </section>
  );
}
