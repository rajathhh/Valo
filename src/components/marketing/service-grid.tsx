"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Car,
  BusFront,
  BedDouble,
  Palmtree,
  WalletMinimal,
  ShieldCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICE_CATALOG } from "@/config/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Car,
  BusFront,
  BedDouble,
  Palmtree,
  WalletMinimal,
  ShieldCheck,
};

const toneClasses: Record<string, string> = {
  backwater: "bg-backwater-50 text-backwater-700 dark:bg-backwater-900/30 dark:text-backwater-300",
  brass: "bg-brass-100 text-brass-700 dark:bg-brass-900/30 dark:text-brass-300",
  laterite: "bg-laterite-100 text-laterite-600 dark:bg-laterite-700/30 dark:text-laterite-300",
};

export function ServiceGrid() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
            Everything, one app
          </span>
          <h2 className="mt-2 font-display text-display-sm font-medium text-[var(--text-primary)]">
            Built for how Kerala actually moves
          </h2>
        </div>
      </div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICE_CATALOG.map((service) => {
          const Icon = ICONS[service.icon] ?? Car;
          return (
            <motion.div key={service.id} variants={fadeUp}>
              <Link
                href={service.href}
                className="group flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[var(--shadow-elevated)]"
              >
                <div>
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-[var(--radius-md)]",
                      toneClasses[service.color]
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-[var(--text-primary)]">
                    {t(service.labelKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{service.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                  {t("common.learnMore")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
