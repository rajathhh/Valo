"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, MapPin, ArrowRight, Loader2, PhoneCall, MessageCircle, Star } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { computeFareEstimates, estimateRoadDistanceKm } from "@/lib/fare-engine";
import { LocationInput } from "./location-input";
import { VehicleSelect } from "./vehicle-select";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/card";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { formatINR, formatDistance, formatEta, sleep } from "@/lib/utils";
import type { Driver, FareEstimate } from "@/types/domain";

const RideMap = dynamic(() => import("./ride-map").then((m) => m.RideMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[var(--bg-surface-raised)]" />,
});

const SAMPLE_DRIVERS: Driver[] = [
  { id: "d1", name: "Rajeev Nair", rating: 4.9, vehicleNumber: "KL 07 AX 4521", vehicleModel: "Maruti Suzuki Dzire", phone: "+91 98470 XXXXX", totalTrips: 6210 },
  { id: "d2", name: "Sudheesh K.", rating: 4.8, vehicleNumber: "KL 11 BY 8834", vehicleModel: "Bajaj RE Auto", phone: "+91 94470 XXXXX", totalTrips: 3894 },
  { id: "d3", name: "Anitha Babu", rating: 5.0, vehicleNumber: "KL 01 CZ 1290", vehicleModel: "Hyundai Aura", phone: "+91 96330 XXXXX", totalTrips: 5027 },
];

export function RideBookingFlow() {
  const {
    step, pickup, destination, fareEstimates, selectedVehicle,
    setPickup, setDestination, setFareEstimates, selectVehicle, goTo, reset,
  } = useBookingStore();
  
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [driver, setDriver] = React.useState<Driver | null>(null);
  const [otp] = React.useState(() => String(Math.floor(1000 + Math.random() * 9000)));

  React.useEffect(() => {
    if (pickup && destination) {
      const km = estimateRoadDistanceKm(pickup.point, destination.point);
      setFareEstimates(computeFareEstimates(km));
      goTo("vehicle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, destination]);

  async function handleConfirm() {
    goTo("matching");
    await sleep(2200);
    setDriver(SAMPLE_DRIVERS[Math.floor(Math.random() * SAMPLE_DRIVERS.length)]!);
    goTo("matched");
  }

const selectedEstimate = fareEstimates.find(
  (e: FareEstimate) => e.vehicleType === selectedVehicle
);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
      {/* Left panel: booking flow */}
      <div className="order-2 lg:order-1">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {(step === "locations" || step === "vehicle") && (
              <motion.div key="locations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <LocationInput
                  label="Pickup"
                  icon={<Navigation className="size-4" />}
                  value={pickup}
                  onChange={setPickup}
                  placeholder="Enter pickup location"
                />
                <LocationInput
                  label="Destination"
                  icon={<MapPin className="size-4" />}
                  value={destination}
                  onChange={setDestination}
                  placeholder="Where are you headed?"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {step === "vehicle" && fareEstimates.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{formatDistance(fareEstimates[0]!.distanceKm)} trip</span>
                <span>Choose your ride</span>
              </div>
              <VehicleSelect estimates={fareEstimates} selected={selectedVehicle} onSelect={selectVehicle} />
              <Button
                size="lg"
                className="mt-5 w-full"
                disabled={!selectedVehicle}
                onClick={() => goTo("confirm")}
              >
                Continue <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          )}

          {step === "confirm" && selectedEstimate && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <TripSummary pickupLabel={pickup!.label} destinationLabel={destination!.label} />
              <div className="rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Base + distance fare</span>
                  <span className="font-mono">{formatINR(selectedEstimate.baseFare + selectedEstimate.distanceFare)}</span>
                </div>
                {selectedEstimate.surgeMultiplier > 1 && (
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Surge ({selectedEstimate.surgeMultiplier}×)</span>
                    <span className="font-mono text-[var(--color-laterite-500)]">
                      +{formatINR(selectedEstimate.total - selectedEstimate.baseFare - selectedEstimate.distanceFare)}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2 text-base font-semibold text-[var(--text-primary)]">
                  <span>Total</span>
                  <span className="font-mono">{formatINR(selectedEstimate.total)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={handleConfirm}>
                Confirm ride · {formatINR(selectedEstimate.total)}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => goTo("vehicle")}>
                Change vehicle
              </Button>
            </motion.div>
          )}

          {step === "matching" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-10 text-center">
              <Loader2 className="size-8 animate-spin text-[var(--brand-primary)]" />
              <div>
                <p className="font-display text-lg font-medium text-[var(--text-primary)]">Finding your driver</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Matching you with a nearby, top-rated driver…</p>
              </div>
            </motion.div>
          )}

          {step === "matched" && driver && selectedEstimate && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] p-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] font-display text-lg font-semibold text-white">
                  {driver.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="font-display text-base font-medium text-[var(--text-primary)]">{driver.name}</p>
                  <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Star className="size-3 fill-brass-500 text-brass-500" /> {driver.rating} · {driver.totalTrips.toLocaleString("en-IN")} trips
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{driver.vehicleModel} · {driver.vehicleNumber}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex size-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--brand-primary)]" aria-label="Call driver">
                    <PhoneCall className="size-4" />
                  </button>
                  <button className="flex size-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--brand-primary)]" aria-label="Message driver">
                    <MessageCircle className="size-4" />
                  </button>
                </div>
              </div>
              <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--border-default)] p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Share this OTP with your driver</p>
                <p className="mt-1 font-mono text-3xl font-semibold tracking-[0.3em] text-[var(--text-primary)]">{otp}</p>
              </div>
              <p className="text-center text-sm text-[var(--text-secondary)]">
                Arriving in <strong>{formatEta(selectedEstimate.etaMinutes)}</strong>
              </p>
              <Button variant="outline" className="w-full" onClick={reset}>
                Book another ride
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right: map */}
      <div className="relative order-1 h-[380px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] lg:order-2 lg:h-[640px]">
        <RideMap pickup={pickup} destination={destination} />
        {step === "vehicle" && (
          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <GlassPanel className="p-3">
              <Button className="w-full" size="sm" onClick={() => setSheetOpen(true)}>
                View vehicle options
              </Button>
            </GlassPanel>
          </div>
        )}
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Choose your ride">
        <VehicleSelect
          estimates={fareEstimates}
          selected={selectedVehicle}
          onSelect={(v) => {
            selectVehicle(v);
            setSheetOpen(false);
          }}
        />
      </BottomSheet>
    </div>
  );
}

function TripSummary({ pickupLabel, destinationLabel }: { pickupLabel: string; destinationLabel: string }) {
  return (
    <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
        <span className="text-sm text-[var(--text-primary)]">{pickupLabel}</span>
      </div>
      <div className="ml-[4.5px] h-4 border-l border-dashed border-[var(--border-default)]" />
      <div className="flex items-start gap-3">
        <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[var(--color-laterite-500)]" />
        <span className="text-sm text-[var(--text-primary)]">{destinationLabel}</span>
      </div>
    </div>
  );
}
