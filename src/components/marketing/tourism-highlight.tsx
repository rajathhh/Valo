"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TOUR_PACKAGES } from "@/lib/data/tour-packages";
import { TourCard } from "./tour-card";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function TourismHighlight() {
  return (
    <section className="bg-[var(--bg-surface-raised)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
              AI-curated itineraries
            </span>
            <h2 className="mt-2 font-display text-display-sm font-medium text-[var(--text-primary)]">
              Where Kerala takes you next
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/tourism">
              View all packages <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TOUR_PACKAGES.slice(0, 3).map((pkg) => (
            <motion.div key={pkg.id} variants={fadeUp}>
              <TourCard pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
