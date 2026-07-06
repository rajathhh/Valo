import type { BusTypeId } from "./types";

export type AmenityId =
  | "wifi"
  | "charging"
  | "ac"
  | "blanket"
  | "water"
  | "cctv"
  | "tracking";

export type ResultBadgeId = "best-price" | "fastest" | "premium";

export type TimeWindowId = "early-morning" | "morning" | "afternoon" | "night";

export interface BusResult {
  id: string;
  operator: string;
  busType: string;
  busTypeTags: BusTypeId[];
  rating: number;
  reviews: number;
  verified: boolean;
  badges: ResultBadgeId[];
  departure: string;
  arrival: string;
  durationLabel: string;
  durationMinutes: number;
  boardingPoint: string;
  boardingAddress: string;
  droppingPoint: string;
  droppingAddress: string;
  amenities: AmenityId[];
  seatsLeft: number;
  price: number;
  taxes: number;
  cancellationPolicy: string;
}

export type SortOption =
  | "recommended"
  | "price"
  | "rating"
  | "fastest"
  | "departure"
  | "arrival";

export interface ResultFilters {
  busTypes: BusTypeId[];
  amenities: AmenityId[];
  operators: string[];
  minRating: number;
  maxPrice: number;
  departureWindows: TimeWindowId[];
  arrivalWindows: TimeWindowId[];
  minSeats: number;
}

export interface SearchSummary {
  from: string;
  to: string;
  dateLabel: string;
  passengerLabel: string;
}
