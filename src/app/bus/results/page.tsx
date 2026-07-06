"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResultsHeader } from "@/components/bus/results-header";
import { FilterSidebar } from "@/components/bus/filter-sidebar";
import { BusCard } from "@/components/bus/bus-card";
import { ResultsLoadingSkeleton } from "@/components/bus/loading-skeleton";
import { mockRoutes } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { BusRoute } from "@/types/bus";

function sortRoutes(routes: BusRoute[], sort: string): BusRoute[] {
  const list = [...routes];
  switch (sort) {
    case "price-low":
      return list.sort((a, b) => a.price - b.price);
    case "price-high":
      return list.sort((a, b) => b.price - a.price);
    case "departure":
      return list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    case "duration":
      return list.sort((a, b) => a.duration.localeCompare(b.duration));
    case "rating":
      return list.sort((a, b) => b.operator.rating - a.operator.rating);
    default:
      return list;
  }
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useState("recommended");

  const from = searchParams.get("from") || "Kozhikode";
  const to = searchParams.get("to") || "Thiruvananthapuram";
  const date = formatDate(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const routes = useMemo(() => sortRoutes(mockRoutes, activeSort), [activeSort]);

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <ResultsHeader from={from} to={to} date={date} totalResults={routes.length} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          <FilterSidebar onSortChange={setActiveSort} activeSort={activeSort} />

          <div className="space-y-4">
            {loading ? (
              <ResultsLoadingSkeleton />
            ) : routes.length > 0 ? (
              routes.map((route, index) => <BusCard key={route.id} route={route} index={index} />)
            ) : (
              <div className="card p-10 text-center text-slate-400">
                No buses found for this route. Try modifying your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoadingSkeleton />}>
      <ResultsContent />
    </Suspense>
  );
}
