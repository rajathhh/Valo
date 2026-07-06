"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/card";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Link from "next/link";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:pb-28">
      {/* Ambient backwater gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, var(--color-backwater-100) 0%, transparent 60%), radial-gradient(50% 40% at 90% 0%, var(--color-brass-100) 0%, transparent 55%)",
        }}
      />
      {/* Winding route-line, large-scale, behind content */}
      <svg
        viewBox="0 0 1200 500"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full opacity-[0.16] text-[var(--brand-primary)]"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 380 C 150 300, 250 460, 420 380 S 650 260, 800 350 S 1050 460, 1260 340"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="route-line-path"
        />
      </svg>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8"
      >
        <div className="flex flex-col justify-center">
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]"
          >
            {t("hero.eyebrow")}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="max-w-xl font-display text-display-lg font-medium leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-display-xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/ride">
                {t("hero.ctaPrimary")} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tourism">{t("hero.ctaSecondary")}</Link>
            </Button>
          </motion.div>

          <motion.dl variants={fadeUp} className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--border-subtle)] pt-6">
            {[
              ["14", "Districts covered"],
              ["8 min", "Avg. pickup time"],
              ["4.8★", "Average driver rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-semibold text-[var(--text-primary)]">{value}</dt>
                <dd className="mt-1 text-xs text-[var(--text-muted)]">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div variants={fadeUp} className="lg:pt-6">
          <GlassPanel className="p-6 sm:p-8">
            <h2 className="font-display text-lg font-medium text-[var(--text-primary)]">{t("hero.ctaPrimary")}</h2>
            <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="sr-only">{t("hero.pickupLabel")}</span>
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3.5">
                  <Navigation className="size-4 shrink-0 text-[var(--brand-primary)]" />
                  <input
                    placeholder={t("hero.pickupLabel")}
                    defaultValue="Kozhikode Beach"
                    className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </label>
              <label className="block">
                <span className="sr-only">{t("hero.destinationLabel")}</span>
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3.5">
                  <MapPin className="size-4 shrink-0 text-[var(--color-laterite-500)]" />
                  <input
                    placeholder={t("hero.destinationLabel")}
                    className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </label>
              <Button type="submit" size="lg" className="w-full" asChild>
                <Link href="/ride">
                  {t("hero.ctaPrimary")} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
              Works offline too — QR tickets sync when you&apos;re back online.
            </p>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </section>
  );
}
