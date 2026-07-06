import type { BusTypeOption, City } from "./types";

export const ALL_CITIES: City[] = [
  { id: "kochi", name: "Kochi", state: "Kerala", code: "COK" },
  { id: "tvm", name: "Thiruvananthapuram", state: "Kerala", code: "TRV" },
  { id: "kzk", name: "Kozhikode", state: "Kerala", code: "CCJ" },
  { id: "knr", name: "Kannur", state: "Kerala", code: "CNN" },
  { id: "tsr", name: "Thrissur", state: "Kerala", code: "TCR" },
  { id: "kol", name: "Kollam", state: "Kerala", code: "QLN" },
  { id: "alp", name: "Alappuzha", state: "Kerala", code: "AMP" },
  { id: "pkd", name: "Palakkad", state: "Kerala", code: "PGT" },
  { id: "mlp", name: "Malappuram", state: "Kerala", code: "MAP" },
  { id: "ktm", name: "Kottayam", state: "Kerala", code: "KTM" },
  { id: "idk", name: "Munnar", state: "Kerala", code: "MUN" },
  { id: "wnd", name: "Wayanad", state: "Kerala", code: "WYD" },
  { id: "blr", name: "Bengaluru", state: "Karnataka", code: "BLR" },
  { id: "che", name: "Chennai", state: "Tamil Nadu", code: "MAA" },
  { id: "cbe", name: "Coimbatore", state: "Tamil Nadu", code: "CJB" },
  { id: "mdu", name: "Madurai", state: "Tamil Nadu", code: "IXM" },
  { id: "mng", name: "Mangaluru", state: "Karnataka", code: "IXE" },
  { id: "hyd", name: "Hyderabad", state: "Telangana", code: "HYD" },
];

export const POPULAR_CITY_IDS = [
  "kochi",
  "tvm",
  "kzk",
  "blr",
  "tsr",
  "ktm",
];

export const RECENT_SEARCH_IDS = ["kochi", "blr", "mng"];

export const BUS_TYPE_OPTIONS: BusTypeOption[] = [
  { id: "ksrtc", label: "KSRTC" },
  { id: "private", label: "Private" },
  { id: "volvo", label: "Volvo" },
  { id: "sleeper", label: "Sleeper" },
  { id: "semi-sleeper", label: "Semi Sleeper" },
  { id: "seater", label: "Seater" },
  { id: "ac", label: "AC" },
  { id: "non-ac", label: "Non AC" },
  { id: "electric", label: "Electric" },
  { id: "luxury", label: "Luxury" },
];

export const DEFAULT_PASSENGERS = {
  adults: 1,
  children: 0,
  women: 0,
  seniors: 0,
};
