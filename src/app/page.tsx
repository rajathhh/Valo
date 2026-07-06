import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { TourismHighlight } from "@/components/marketing/tourism-highlight";
import { SafetyBand } from "@/components/marketing/safety-band";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Kerala Moves With You",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <TourismHighlight />
      <SafetyBand />
      <CtaBand />
    </>
  );
}
