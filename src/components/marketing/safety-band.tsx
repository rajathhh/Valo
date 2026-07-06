"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, PhoneCall, Share2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const pillars = [
  { icon: ShieldCheck, title: "SOS in one tap", body: "Instantly alerts local police and your emergency contacts with live location." },
  { icon: Share2, title: "Live trip sharing", body: "Share your route and ETA with family — updates every 30 seconds." },
  { icon: Mic, title: "Women Safety+", body: "Optional trip audio recording, encrypted and stored only if you flag a concern." },
  { icon: PhoneCall, title: "24×7 response desk", body: "A dedicated safety team, reachable in Malayalam and English, day or night." },
];

export function SafetyBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-backwater-900)] px-6 py-14 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-backwater-300">Safety Centre</span>
          <h2 className="mt-2 font-display text-display-sm font-medium text-white">
            Every ride, watched over
          </h2>
          <p className="mt-3 text-backwater-100">
            Built with women commuters, night-shift workers, and solo travellers in mind.
          </p>
        </div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={fadeUp} className="rounded-[var(--radius-lg)] bg-white/5 p-5">
              <Icon className="size-6 text-brass-400" />
              <h3 className="mt-4 font-display text-base font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-backwater-100">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button variant="accent" size="lg" asChild>
            <Link href="/safety">Explore Safety Centre</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
