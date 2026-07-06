import { BusRoute, Coupon, PaymentMethod, Seat } from "@/types/bus";

export const generateSeats = (layout: "2+2" | "2+1" | "1+1", totalRows: number): Seat[] => {
  const seats: Seat[] = [];
  const price = 450;

  const ladiesRows = [1, 2];
  const bookedSeats = ["1A", "2B", "3C", "4D", "5A", "6B", "7C", "8A"];

  if (layout === "2+2") {
    for (let row = 1; row <= totalRows; row++) {
      const cols = ["A", "B", "C", "D"];
      cols.forEach((col, colIndex) => {
        const seatNumber = `${row}${col}`;
        const isLadies = ladiesRows.includes(row) && (col === "A" || col === "B");
        const isBooked = bookedSeats.includes(seatNumber);

        seats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber,
          type: isBooked ? "booked" : isLadies ? "ladies" : "available",
          deck: "lower",
          row,
          col: colIndex,
          price,
          isLadies,
          isWindow: col === "A" || col === "D",
        });
      });
    }
  } else if (layout === "2+1") {
    for (let row = 1; row <= totalRows; row++) {
      const cols = ["A", "B", "C"];
      cols.forEach((col, colIndex) => {
        const seatNumber = `${row}${col}`;
        const isLadies = ladiesRows.includes(row) && col === "A";
        const isBooked = bookedSeats.includes(seatNumber);

        seats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber,
          type: isBooked ? "booked" : isLadies ? "ladies" : "available",
          deck: row <= Math.floor(totalRows / 2) ? "lower" : "upper",
          row,
          col: colIndex,
          price,
          isLadies,
          isWindow: col === "A" || col === "C",
        });
      });
    }
  }

  return seats;
};

export const mockRoutes: BusRoute[] = [
  {
    id: "route-001",
    operator: {
      id: "op-001",
      name: "KSRTC Swift",
      logo: "KS",
      rating: 4.5,
      reviewCount: 2841,
      type: "seater",
      layout: "2+2",
      amenities: ["wifi", "charging", "water", "live-tracking"],
      cancellationPolicy: "Free cancellation up to 2 hours before departure",
    },
    from: "Kozhikode",
    to: "Thiruvananthapuram",
    departureTime: "06:00",
    arrivalTime: "12:30",
    duration: "6h 30m",
    boardingPoint: "Kozhikode KSRTC Bus Stand",
    droppingPoint: "Thiruvananthapuram Central Bus Stand",
    price: 420,
    originalPrice: 520,
    seatsAvailable: 18,
    totalSeats: 40,
    badges: ["best-price"],
    seats: generateSeats("2+2", 10),
    liveTracking: true,
    busNumber: "KL-11-AB-1234",
  },
  {
    id: "route-002",
    operator: {
      id: "op-002",
      name: "Kallada Travels",
      logo: "KT",
      rating: 4.8,
      reviewCount: 5120,
      type: "sleeper",
      layout: "2+1",
      amenities: ["wifi", "charging", "blanket", "water", "usb", "live-tracking"],
      cancellationPolicy: "Free cancellation up to 4 hours before departure",
    },
    from: "Kozhikode",
    to: "Thiruvananthapuram",
    departureTime: "07:30",
    arrivalTime: "13:45",
    duration: "6h 15m",
    boardingPoint: "Kozhikode Palayam",
    droppingPoint: "Thiruvananthapuram Thampanoor",
    price: 680,
    originalPrice: 800,
    seatsAvailable: 6,
    totalSeats: 30,
    badges: ["fastest", "premium"],
    seats: generateSeats("2+1", 10),
    liveTracking: true,
    busNumber: "KL-07-CD-5678",
  },
  {
    id: "route-003",
    operator: {
      id: "op-003",
      name: "Parveen Travels",
      logo: "PT",
      rating: 4.3,
      reviewCount: 1893,
      type: "semi-sleeper",
      layout: "2+2",
      amenities: ["charging", "water", "usb"],
      cancellationPolicy: "50% refund up to 6 hours before departure",
    },
    from: "Kozhikode",
    to: "Thiruvananthapuram",
    departureTime: "08:00",
    arrivalTime: "14:30",
    duration: "6h 30m",
    boardingPoint: "Kozhikode KSRTC Bus Stand",
    droppingPoint: "Thiruvananthapuram Statue Junction",
    price: 390,
    originalPrice: 450,
    seatsAvailable: 24,
    totalSeats: 45,
    badges: [],
    seats: generateSeats("2+2", 11),
    liveTracking: false,
    busNumber: "KL-02-EF-9012",
  },
  {
    id: "route-004",
    operator: {
      id: "op-004",
      name: "VRL Travels",
      logo: "VR",
      rating: 4.6,
      reviewCount: 3204,
      type: "sleeper",
      layout: "2+1",
      amenities: ["wifi", "charging", "blanket", "water", "usb", "live-tracking"],
      cancellationPolicy: "Full refund up to 24 hours before departure",
    },
    from: "Kozhikode",
    to: "Thiruvananthapuram",
    departureTime: "21:00",
    arrivalTime: "05:30",
    duration: "8h 30m",
    boardingPoint: "Kozhikode Medical College",
    droppingPoint: "Thiruvananthapuram Central",
    price: 750,
    originalPrice: 950,
    seatsAvailable: 12,
    totalSeats: 36,
    badges: ["premium"],
    seats: generateSeats("2+1", 12),
    liveTracking: true,
    busNumber: "KL-05-GH-3456",
  },
];

export const mockCoupons: Coupon[] = [
  {
    id: "coup-001",
    code: "VALO50",
    title: "₹50 Off on First Booking",
    description: "Get flat ₹50 off on your first bus booking with VALO",
    discount: 50,
    discountType: "flat",
    minAmount: 200,
    validUntil: "2025-12-31",
    category: "general",
    isApplied: false,
  },
  {
    id: "coup-002",
    code: "KERALA20",
    title: "20% Off Kerala Routes",
    description: "Enjoy 20% cashback on all Kerala bus routes, max ₹150",
    discount: 20,
    discountType: "percent",
    maxDiscount: 150,
    minAmount: 300,
    validUntil: "2025-11-30",
    category: "cashback",
    isApplied: false,
  },
  {
    id: "coup-003",
    code: "HDFC100",
    title: "₹100 Off with HDFC Card",
    description: "Use your HDFC credit or debit card and save ₹100",
    discount: 100,
    discountType: "flat",
    minAmount: 500,
    validUntil: "2025-10-31",
    category: "bank",
    bankName: "HDFC Bank",
    isApplied: false,
  },
  {
    id: "coup-004",
    code: "PAYTM75",
    title: "₹75 Cashback via Paytm",
    description: "Pay via Paytm wallet and get ₹75 instant cashback",
    discount: 75,
    discountType: "flat",
    minAmount: 400,
    validUntil: "2025-12-15",
    category: "wallet",
    walletName: "Paytm",
    isApplied: false,
  },
  {
    id: "coup-005",
    code: "SUPER30",
    title: "30% Off — Super Saver",
    description: "Special discount of 30% on premium bus routes, max ₹200",
    discount: 30,
    discountType: "percent",
    maxDiscount: 200,
    minAmount: 600,
    validUntil: "2025-09-30",
    category: "general",
    isApplied: false,
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-001",
    type: "upi",
    name: "UPI",
    icon: "upi",
    description: "GPay, PhonePe, BHIM & more",
    isPopular: true,
  },
  {
    id: "pm-002",
    type: "card",
    name: "Credit / Debit Card",
    icon: "card",
    description: "Visa, Mastercard, RuPay",
    isPopular: true,
  },
  {
    id: "pm-003",
    type: "wallet",
    name: "Mobile Wallets",
    icon: "wallet",
    description: "Paytm, PhonePe, Amazon Pay",
    isPopular: false,
  },
  {
    id: "pm-004",
    type: "netbanking",
    name: "Net Banking",
    icon: "bank",
    description: "All major banks supported",
    isPopular: false,
  },
  {
    id: "pm-005",
    type: "emi",
    name: "EMI",
    icon: "emi",
    description: "No-cost EMI on select cards",
    isPopular: false,
  },
];
