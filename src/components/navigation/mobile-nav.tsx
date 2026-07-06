"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/constants";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-full text-[var(--text-primary)]"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col gap-1 bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-elevated)]"
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mb-6 ml-auto flex size-10 items-center justify-center rounded-full"
              >
                <X className="size-5" />
              </button>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-md)] px-4 py-3 font-display text-lg text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-4">
                <Button variant="outline">{t("nav.signIn")}</Button>
                <Button variant="primary">{t("nav.getApp")}</Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
