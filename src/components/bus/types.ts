export type CityKind = "popular" | "recent" | "suggested";

export interface City {
  id: string;
  name: string;
  state: string;
  code: string;
  kind?: CityKind;
}

export interface PassengerCounts {
  adults: number;
  children: number;
  women: number;
  seniors: number;
}

export type BusTypeId =
  | "ksrtc"
  | "private"
  | "volvo"
  | "sleeper"
  | "semi-sleeper"
  | "seater"
  | "ac"
  | "non-ac"
  | "electric"
  | "luxury";

export interface BusTypeOption {
  id: BusTypeId;
  label: string;
}

export type DateQuickPick = "today" | "tomorrow" | "weekend" | "next-friday";

export interface BusSearchQuery {
  from: City | null;
  to: City | null;
  date: Date;
  passengers: PassengerCounts;
  busTypes: BusTypeId[];
}
