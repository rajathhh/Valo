"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, ShieldAlert } from "lucide-react";
import { cn } from "./utils";

interface BoardingDetailsProps {
  open: boolean;
  onToggle: () => void;
  boardingPoint: string;
  boardingAddress: string;
  droppingPoint: string;
  droppingAddress: string;
  cancellationPolicy: string;
}

export function BoardingDetails({
  open,
  onToggle,
  boardingPoint,
  boardingAddress,
  droppingPoint,
  droppingAddress,
  cancellationPolicy,
}: BoardingDetailsProps) {
  return (
    <div className="border-t border-[#0A1F1B]/[0.06] dark:border-white/[0.06]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-6 py-4 text-sm font-semibold text-[#0E463F] transition-colors hover:bg-[#0A1F1B]/[0.02] dark:text-[#7FD8C8] dark:hover:bg-white/[0.03] sm:px-8"
      >
        View details
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 bg-[#0A1F1B]/[0.02] px-6 pb-6 pt-1 dark:bg-white/[0.02] sm:grid-cols-2 sm:px-8">
              <AddressBlock label="Boarding point" point={boardingPoint} address={boardingAddress} />
              <AddressBlock label="Dropping point" point={droppingPoint} address={droppingAddress} />
              <div className={cn("flex gap-3 sm:col-span-2")}>
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#B4842A]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#0A1F1B]/45 dark:text-white/40">
                    Cancellation policy
                  </p>
                  <p className="mt-1 text-sm text-[#0A1F1B]/70 dark:text-white/55">
                    {cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AddressBlock({
  label,
  point,
  address,
}: {
  label: string;
  point: string;
  address: string;
}) {
  return (
    <div className="flex gap-3">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0E463F] dark:text-[#7FD8C8]" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0A1F1B]/45 dark:text-white/40">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-[#0A1F1B] dark:text-white">{point}</p>
        <p className="mt-0.5 text-sm text-[#0A1F1B]/60 dark:text-white/45">{address}</p>
      </div>
    </div>
  );
}
