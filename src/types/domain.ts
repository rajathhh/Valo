export type VehicleType = "auto" | "bike" | "cab-economy" | "cab-premium";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Address {
  label: string;
  point: GeoPoint;
  district?: string;
}

export interface FareEstimate {
  vehicleType: VehicleType;
  baseFare: number;
  distanceFare: number;
  surgeMultiplier: number;
  total: number;
  etaMinutes: number;
  distanceKm: number;
}

export type RideStatus =
  | "requested"
  | "matching"
  | "accepted"
  | "arriving"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicleNumber: string;
  vehicleModel: string;
  photoUrl?: string;
  phone: string;
  totalTrips: number;
}

export interface Ride {
  id: string;
  status: RideStatus;
  pickup: Address;
  destination: Address;
  vehicleType: VehicleType;
  fare: FareEstimate;
  driver?: Driver;
  otp?: string;
  requestedAt: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  name: string;
  from: string;
  to: string;
  stops: number;
  operator: "KSRTC" | "Private";
  liveTrackingAvailable: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  type: "hotel" | "homestay" | "houseboat" | "resort";
  district: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  imageQuery: string;
}

export interface TourPackage {
  id: string;
  title: string;
  district: string;
  durationDays: number;
  pricePerPerson: number;
  category: "backwaters" | "hills" | "heritage" | "wildlife" | "beach";
  highlights: string[];
  imageQuery: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  category: "ride" | "cashback" | "topup" | "hotel" | "bus" | "referral";
  amount: number;
  description: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  walletBalance: number;
  valoCoins: number;
  kycVerified: boolean;
}
