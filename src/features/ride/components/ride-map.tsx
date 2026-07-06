"use client";

import type { Address } from "@/types/domain";
import { MapPin, Navigation } from "lucide-react";

interface RideMapProps {
  pickup: Address | null;
  destination: Address | null;
}

export function RideMap({ pickup, destination }: RideMapProps) {
  return <MapPlaceholder pickup={pickup} destination={destination} />;
}

function MapPlaceholder({ pickup, destination }: RideMapProps) {
  return (
    <div
      className="relative flex h-full min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
      role="img"
      aria-label="Map placeholder"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 text-center space-y-4">
        <h3 className="text-xl font-semibold">
          VALO Map Preview
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Navigation className="h-4 w-4" />
            <span>{pickup?.label ?? "Select pickup location"}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{destination?.label ?? "Select destination"}</span>
          </div>
        </div>

        <p className="text-sm opacity-70">
          Live Mapbox integration will be enabled after configuring the API key.
        </p>
      </div>
    </div>
  );
}