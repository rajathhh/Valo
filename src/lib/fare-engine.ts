import type { FareEstimate, VehicleType } from "@/types/domain";

interface VehicleProfile {
  type: VehicleType;
  label: string;
  capacity: number;
  baseFare: number;
  perKm: number;
  speedKmh: number;
  icon: "Bike" | "Car" | "CarTaxiFront";
}

export const VEHICLE_PROFILES: VehicleProfile[] = [
  { type: "bike", label: "Bike", capacity: 1, baseFare: 20, perKm: 6, speedKmh: 32, icon: "Bike" },
  { type: "auto", label: "Auto", capacity: 3, baseFare: 30, perKm: 11, speedKmh: 26, icon: "CarTaxiFront" },
  { type: "cab-economy", label: "Cab Economy", capacity: 4, baseFare: 55, perKm: 14, speedKmh: 30, icon: "Car" },
  { type: "cab-premium", label: "Cab Premium", capacity: 4, baseFare: 90, perKm: 19, speedKmh: 30, icon: "Car" },
];

/**
 * Estimate distance between two lat/lng points using the haversine formula,
 * then pad by a road-network factor (Kerala's roads rarely run straight).
 */
export function estimateRoadDistanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const straightLineKm = 2 * R * Math.asin(Math.sqrt(h));
  const ROAD_NETWORK_FACTOR = 1.35;
  return straightLineKm * ROAD_NETWORK_FACTOR;
}

/**
 * Compute fare estimates for every vehicle type on a given trip.
 * `surgeMultiplier` would come from valo-ai-service's real-time demand
 * predictor in production; here it's derived from time-of-day as a
 * realistic stand-in.
 */
export function computeFareEstimates(distanceKm: number, date: Date = new Date()): FareEstimate[] {
  const hour = date.getHours();
  const isPeak = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20);
  const isLateNight = hour >= 23 || hour <= 5;
  const surgeMultiplier = isPeak ? 1.25 : isLateNight ? 1.15 : 1.0;

  return VEHICLE_PROFILES.map((profile) => {
    const distanceFare = distanceKm * profile.perKm;
    const subtotal = profile.baseFare + distanceFare;
    const total = Math.round(subtotal * surgeMultiplier);
    const etaMinutes = (distanceKm / profile.speedKmh) * 60 + 4; // +4 min avg driver approach

    return {
      vehicleType: profile.type,
      baseFare: profile.baseFare,
      distanceFare: Math.round(distanceFare),
      surgeMultiplier,
      total,
      etaMinutes: Math.round(etaMinutes),
      distanceKm,
    };
  });
}
