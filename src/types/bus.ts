export type SeatType = "available" | "booked" | "ladies" | "reserved" | "selected" | "empty";
export type DeckType = "lower" | "upper";
export type BusType = "seater" | "sleeper" | "semi-sleeper";
export type SeatLayout = "2+2" | "2+1" | "1+1";

export interface Seat {
  id: string;
  number: string;
  type: SeatType;
  deck: DeckType;
  row: number;
  col: number;
  price: number;
  isLadies?: boolean;
  isWindow?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface BusOperator {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  type: BusType;
  layout: SeatLayout;
  amenities: string[];
  cancellationPolicy: string;
}

export interface BusRoute {
  id: string;
  operator: BusOperator;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  boardingPoint: string;
  droppingPoint: string;
  price: number;
  originalPrice: number;
  seatsAvailable: number;
  totalSeats: number;
  badges: ("best-price" | "fastest" | "premium")[];
  seats: Seat[];
  liveTracking: boolean;
  busNumber: string;
}

export interface Passenger {
  id: string;
  seatNumber: string;
  seatId: string;
  name: string;
  age: string;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  discountType: "flat" | "percent";
  maxDiscount?: number;
  minAmount: number;
  validUntil: string;
  category: "cashback" | "bank" | "wallet" | "general";
  bankName?: string;
  walletName?: string;
  isApplied?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "upi" | "card" | "wallet" | "netbanking" | "emi";
  name: string;
  icon: string;
  description?: string;
  isPopular?: boolean;
}

export interface BookingState {
  selectedRoute: BusRoute | null;
  selectedSeats: Seat[];
  passengers: Passenger[];
  appliedCoupon: Coupon | null;
  paymentMethod: PaymentMethod | null;
  bookingId: string;
  pnr: string;
}

export interface FareSummary {
  baseFare: number;
  gst: number;
  convenienceFee: number;
  discount: number;
  total: number;
}
