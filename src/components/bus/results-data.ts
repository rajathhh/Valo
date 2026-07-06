import type { LucideIcon } from "lucide-react";
import {
  BatteryCharging,
  Snowflake,
  ShieldCheck,
  Wifi,
  Layers,
  Droplets,
  Radar,
} from "lucide-react";
import type {
  AmenityId,
  BusResult,
  SortOption,
  TimeWindowId,
} from "./result-types";

export const AMENITY_META: Record<AmenityId, { label: string; icon: LucideIcon }> = {
  wifi: { label: "WiFi", icon: Wifi },
  charging: { label: "Charging", icon: BatteryCharging },
  ac: { label: "AC", icon: Snowflake },
  blanket: { label: "Blanket", icon: Layers },
  water: { label: "Water bottle", icon: Droplets },
  cctv: { label: "CCTV", icon: ShieldCheck },
  tracking: { label: "Live tracking", icon: Radar },
};

export const TIME_WINDOW_META: Record<
  TimeWindowId,
  { label: string; range: string; startHour: number; endHour: number }
> = {
  "early-morning": { label: "Early morning", range: "12am – 6am", startHour: 0, endHour: 6 },
  morning: { label: "Morning", range: "6am – 12pm", startHour: 6, endHour: 12 },
  afternoon: { label: "Afternoon", range: "12pm – 6pm", startHour: 12, endHour: 18 },
  night: { label: "Night", range: "6pm – 12am", startHour: 18, endHour: 24 },
};

export const SORT_OPTIONS: Array<{ id: SortOption; label: string }> = [
  { id: "recommended", label: "Recommended" },
  { id: "price", label: "Lowest price" },
  { id: "rating", label: "Highest rating" },
  { id: "fastest", label: "Fastest" },
  { id: "departure", label: "Departure time" },
  { id: "arrival", label: "Arrival time" },
];

export const RATING_FILTERS = [4.5, 4, 3.5, 3];

export const MAX_PRICE = 2500;
export const MIN_PRICE = 300;

export const MOCK_OPERATORS = [
  "KSRTC Swift",
  "Kallada Travels",
  "GreenLine Holidays",
  "VRL Travels",
  "Sharma Transports",
];

function hourOf(time: string): number {
  const [h] = time.split(":").map(Number);
  return h;
}

export const MOCK_RESULTS: BusResult[] = [
  {
    id: "b1",
    operator: "KSRTC Swift",
    busType: "AC Sleeper (2+1)",
    busTypeTags: ["ksrtc", "sleeper", "ac"],
    rating: 4.8,
    reviews: 1204,
    verified: true,
    badges: ["best-price"],
    departure: "21:30",
    arrival: "06:00",
    durationLabel: "8h 30m",
    durationMinutes: 510,
    boardingPoint: "Kochi Vyttila Hub",
    boardingAddress: "Vyttila Mobility Hub, NH66, Kochi, Kerala 682019",
    droppingPoint: "Bengaluru Satellite Bus Stand",
    droppingAddress: "Satellite Bus Stand, Mysore Road, Bengaluru 560026",
    amenities: ["wifi", "charging", "ac", "cctv", "tracking"],
    seatsLeft: 18,
    price: 799,
    taxes: 62,
    cancellationPolicy:
      "Free cancellation up to 6 hours before departure. 50% refund within 6 hours.",
  },
  {
    id: "b2",
    operator: "Kallada Travels",
    busType: "Volvo Multi-Axle",
    busTypeTags: ["private", "volvo", "ac"],
    rating: 4.7,
    reviews: 986,
    verified: true,
    badges: [],
    departure: "22:15",
    arrival: "06:40",
    durationLabel: "8h 25m",
    durationMinutes: 505,
    boardingPoint: "Ernakulam South",
    boardingAddress: "Kallada Travels Office, Ernakulam South Railway Station Rd",
    droppingPoint: "Majestic",
    droppingAddress: "Kempegowda Bus Station (Majestic), Bengaluru 560009",
    amenities: ["wifi", "charging", "ac", "blanket", "cctv"],
    seatsLeft: 12,
    price: 999,
    taxes: 75,
    cancellationPolicy:
      "Free cancellation up to 12 hours before departure. 30% refund within 12 hours.",
  },
  {
    id: "b3",
    operator: "GreenLine Holidays",
    busType: "Luxury Sleeper",
    busTypeTags: ["luxury", "sleeper", "ac"],
    rating: 4.9,
    reviews: 742,
    verified: true,
    badges: ["premium", "fastest"],
    departure: "20:45",
    arrival: "05:10",
    durationLabel: "8h 25m",
    durationMinutes: 505,
    boardingPoint: "Kaloor",
    boardingAddress: "GreenLine Lounge, Kaloor Stadium Link Rd, Kochi",
    droppingPoint: "Electronic City",
    droppingAddress: "Electronic City Toll Gate, Bengaluru 560100",
    amenities: ["wifi", "charging", "ac", "blanket", "water", "cctv", "tracking"],
    seatsLeft: 9,
    price: 1199,
    taxes: 88,
    cancellationPolicy:
      "Free cancellation up to 24 hours before departure. Non-refundable within 24 hours.",
  },
  {
    id: "b4",
    operator: "VRL Travels",
    busType: "Semi Sleeper (2+2)",
    busTypeTags: ["private", "semi-sleeper", "non-ac"],
    rating: 4.2,
    reviews: 1520,
    verified: true,
    badges: [],
    departure: "19:00",
    arrival: "05:30",
    durationLabel: "10h 30m",
    durationMinutes: 630,
    boardingPoint: "Aluva",
    boardingAddress: "VRL Terminal, Aluva Bypass Rd, Kochi",
    droppingPoint: "Madiwala",
    droppingAddress: "Madiwala Bus Stand, Bengaluru 560068",
    amenities: ["charging", "cctv"],
    seatsLeft: 24,
    price: 549,
    taxes: 41,
    cancellationPolicy:
      "Free cancellation up to 6 hours before departure. 50% refund within 6 hours.",
  },
  {
    id: "b5",
    operator: "Sharma Transports",
    busType: "Electric AC Seater",
    busTypeTags: ["electric", "seater", "ac"],
    rating: 4.5,
    reviews: 318,
    verified: false,
    badges: ["premium"],
    departure: "07:15",
    arrival: "16:20",
    durationLabel: "9h 05m",
    durationMinutes: 545,
    boardingPoint: "Thrissur Sakthan Stand",
    boardingAddress: "Sakthan Thampuran Bus Stand, Thrissur 680001",
    droppingPoint: "Silk Board",
    droppingAddress: "Silk Board Junction, Bengaluru 560068",
    amenities: ["wifi", "charging", "ac", "water", "tracking"],
    seatsLeft: 6,
    price: 899,
    taxes: 68,
    cancellationPolicy:
      "Free cancellation up to 12 hours before departure. 30% refund within 12 hours.",
  },
  {
    id: "b6",
    operator: "KSRTC Swift",
    busType: "Non-AC Seater",
    busTypeTags: ["ksrtc", "seater", "non-ac"],
    rating: 3.9,
    reviews: 2033,
    verified: true,
    badges: [],
    departure: "14:00",
    arrival: "23:45",
    durationLabel: "9h 45m",
    durationMinutes: 585,
    boardingPoint: "Thiruvananthapuram Central",
    boardingAddress: "KSRTC Central Bus Station, Thampanoor, TVM 695001",
    droppingPoint: "Shantinagar",
    droppingAddress: "Shantinagar Bus Terminal, Bengaluru 560027",
    amenities: ["charging"],
    seatsLeft: 31,
    price: 399,
    taxes: 32,
    cancellationPolicy:
      "Free cancellation up to 6 hours before departure. 50% refund within 6 hours.",
  },
];

export function timeWindowOf(time: string): TimeWindowId {
  const h = hourOf(time);
  if (h < 6) return "early-morning";
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "night";
}
