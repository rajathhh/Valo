"use client";

import { BookingState, BusRoute, Coupon, Passenger, PaymentMethod, Seat } from "@/types/bus";

const DEFAULT_STATE: BookingState = {
  selectedRoute: null,
  selectedSeats: [],
  passengers: [],
  appliedCoupon: null,
  paymentMethod: null,
  bookingId: "",
  pnr: "",
};

function generateId(prefix: string): string {
  return `${prefix}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

class BookingStore {
  private state: BookingState;
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("valo_booking");
      this.state = saved ? JSON.parse(saved) : { ...DEFAULT_STATE };
    } else {
      this.state = { ...DEFAULT_STATE };
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("valo_booking", JSON.stringify(this.state));
    }
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getState(): BookingState {
    return this.state;
  }

  setSelectedRoute(route: BusRoute) {
    this.state = { ...DEFAULT_STATE, selectedRoute: route };
    this.save();
  }

  toggleSeat(seat: Seat) {
    const exists = this.state.selectedSeats.find((s) => s.id === seat.id);
    if (exists) {
      this.state = {
        ...this.state,
        selectedSeats: this.state.selectedSeats.filter((s) => s.id !== seat.id),
      };
    } else {
      if (this.state.selectedSeats.length >= 6) return;
      this.state = {
        ...this.state,
        selectedSeats: [...this.state.selectedSeats, { ...seat, type: "selected" }],
      };
    }
    this.save();
  }

  setPassengers(passengers: Passenger[]) {
    this.state = { ...this.state, passengers };
    this.save();
  }

  applyCoupon(coupon: Coupon) {
    this.state = { ...this.state, appliedCoupon: coupon };
    this.save();
  }

  removeCoupon() {
    this.state = { ...this.state, appliedCoupon: null };
    this.save();
  }

  setPaymentMethod(method: PaymentMethod) {
    this.state = { ...this.state, paymentMethod: method };
    this.save();
  }

  confirmBooking() {
    this.state = {
      ...this.state,
      bookingId: generateId("VLO"),
      pnr: generateId("PNR"),
    };
    this.save();
  }

  getFareSummary() {
    const baseFare = this.state.selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const gst = Math.round(baseFare * 0.05);
    const convenienceFee = 30;
    let discount = 0;
    const coupon = this.state.appliedCoupon;
    if (coupon) {
      if (coupon.discountType === "flat") {
        discount = coupon.discount;
      } else {
        discount = Math.round((baseFare * coupon.discount) / 100);
        if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
      }
    }
    const total = baseFare + gst + convenienceFee - discount;
    return { baseFare, gst, convenienceFee, discount, total };
  }
}

export const bookingStore = new BookingStore();
