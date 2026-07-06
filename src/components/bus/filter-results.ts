import type { BusResult, ResultFilters, SortOption } from "./result-types";
import { timeWindowOf } from "./results-data";

export const DEFAULT_FILTERS: ResultFilters = {
  busTypes: [],
  amenities: [],
  operators: [],
  minRating: 0,
  maxPrice: 2500,
  departureWindows: [],
  arrivalWindows: [],
  minSeats: 0,
};

export function countActiveFilters(filters: ResultFilters): number {
  let count = 0;
  count += filters.busTypes.length;
  count += filters.amenities.length;
  count += filters.operators.length;
  count += filters.departureWindows.length;
  count += filters.arrivalWindows.length;
  if (filters.minRating > 0) count += 1;
  if (filters.minSeats > 0) count += 1;
  if (filters.maxPrice < DEFAULT_FILTERS.maxPrice) count += 1;
  return count;
}

export function filterResults(results: BusResult[], filters: ResultFilters): BusResult[] {
  return results.filter((bus) => {
    if (
      filters.busTypes.length > 0 &&
      !filters.busTypes.some((t) => bus.busTypeTags.includes(t))
    )
      return false;

    if (filters.amenities.length > 0 && !filters.amenities.every((a) => bus.amenities.includes(a)))
      return false;

    if (filters.operators.length > 0 && !filters.operators.includes(bus.operator)) return false;

    if (bus.rating < filters.minRating) return false;

    if (bus.price > filters.maxPrice) return false;

    if (
      filters.departureWindows.length > 0 &&
      !filters.departureWindows.includes(timeWindowOf(bus.departure))
    )
      return false;

    if (
      filters.arrivalWindows.length > 0 &&
      !filters.arrivalWindows.includes(timeWindowOf(bus.arrival))
    )
      return false;

    if (bus.seatsLeft < filters.minSeats) return false;

    return true;
  });
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function sortResults(results: BusResult[], sort: SortOption): BusResult[] {
  const sorted = [...results];
  switch (sort) {
    case "price":
      return sorted.sort((a, b) => a.price - b.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "fastest":
      return sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "departure":
      return sorted.sort((a, b) => timeToMinutes(a.departure) - timeToMinutes(b.departure));
    case "arrival":
      return sorted.sort((a, b) => timeToMinutes(a.arrival) - timeToMinutes(b.arrival));
    case "recommended":
    default:
      return sorted.sort((a, b) => {
        const scoreOf = (bus: BusResult) =>
          bus.rating * 20 +
          (bus.verified ? 5 : 0) +
          bus.badges.length * 4 -
          bus.price / 100;
        return scoreOf(b) - scoreOf(a);
      });
  }
}
