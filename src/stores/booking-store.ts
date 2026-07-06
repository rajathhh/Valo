"use client";

import { create } from "zustand";
import type { Address, VehicleType, FareEstimate } from "@/types/domain";

export type BookingStep = "locations" | "vehicle" | "confirm" | "matching" | "matched";

interface BookingState {
  step: BookingStep;
  pickup: Address | null;
  destination: Address | null;
  fareEstimates: FareEstimate[];
  selectedVehicle: VehicleType | null;
  setPickup: (a: Address) => void;
  setDestination: (a: Address) => void;
  setFareEstimates: (f: FareEstimate[]) => void;
  selectVehicle: (v: VehicleType) => void;
  goTo: (step: BookingStep) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: "locations",
  pickup: null,
  destination: null,
  fareEstimates: [],
  selectedVehicle: null,
  setPickup: (pickup) => set({ pickup }),
  setDestination: (destination) => set({ destination }),
  setFareEstimates: (fareEstimates) => set({ fareEstimates }),
  selectVehicle: (selectedVehicle) => set({ selectedVehicle }),
  goTo: (step) => set({ step }),
  reset: () =>
    set({ step: "locations", pickup: null, destination: null, fareEstimates: [], selectedVehicle: null }),
}));
