export const BRAND = {
  name: "VALO",
  tagline: "Kerala Moves With You",
  taglineMl: "കേരളം നിങ്ങളോടൊപ്പം സഞ്ചരിക്കുന്നു",
  supportPhone: "1800-425-VALO",
  supportEmail: "support@valo.app",
} as const;

export const KERALA_DISTRICTS = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
] as const;

export type KeralaDistrict = (typeof KERALA_DISTRICTS)[number];

export const SERVICE_CATALOG = [
  {
    id: "ride",
    labelKey: "services.ride",
    href: "/ride",
    icon: "Car",
    description: "Auto, cab, and bike rides across all 14 districts",
    color: "backwater",
  },
  {
    id: "bus",
    labelKey: "services.bus",
    href: "/bus",
    icon: "BusFront",
    description: "Live KSRTC and private bus tracking with offline QR tickets",
    color: "brass",
  },
  {
    id: "hotels",
    labelKey: "services.hotels",
    href: "/hotels",
    icon: "BedDouble",
    description: "Homestays, houseboats, and hotels from Kovalam to Kasaragod",
    color: "backwater",
  },
  {
    id: "tourism",
    labelKey: "services.tourism",
    href: "/tourism",
    icon: "Palmtree",
    description: "AI-curated itineraries for backwaters, hills, and heritage",
    color: "brass",
  },
  {
    id: "wallet",
    labelKey: "services.wallet",
    href: "/wallet",
    icon: "WalletMinimal",
    description: "VALO Coins, UPI, and offline-ready QR payments",
    color: "backwater",
  },
  {
    id: "safety",
    labelKey: "services.safety",
    href: "/safety",
    icon: "ShieldCheck",
    description: "SOS, live trip sharing, and Women Safety+ features",
    color: "laterite",
  },
] as const;

export const NAV_LINKS = [
  { labelKey: "nav.ride", href: "/ride" },
  { labelKey: "nav.bus", href: "/bus" },
  { labelKey: "nav.hotels", href: "/hotels" },
  { labelKey: "nav.tourism", href: "/tourism" },
  { labelKey: "nav.partner", href: "/partner" },
  { labelKey: "nav.driver", href: "/driver" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Ride Booking", href: "/ride" },
    { label: "Bus Tracking", href: "/bus" },
    { label: "Hotels & Homestays", href: "/hotels" },
    { label: "Tourism Packages", href: "/tourism" },
    { label: "VALO Wallet", href: "/wallet" },
  ],
  company: [
    { label: "About VALO", href: "/about" },
    { label: "Become a Partner", href: "/partner" },
    { label: "Drive with VALO", href: "/driver" },
    { label: "Contact Us", href: "/contact" },
  ],
  trust: [
    { label: "Safety Centre", href: "/safety" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "DPDPA Compliance", href: "/legal/dpdpa" },
  ],
} as const;

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "wss://realtime.valo.app";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.valo.app/v2";
