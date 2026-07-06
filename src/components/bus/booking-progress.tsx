"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Seats", path: "/bus/seat" },
  { id: 2, label: "Passengers", path: "/bus/passenger" },
  { id: 3, label: "Offers", path: "/bus/offers" },
  { id: 4, label: "Payment", path: "/bus/payment" },
  { id: 5, label: "Ticket", path: "/bus/ticket" },
];

interface BookingProgressProps {
  currentStep: number;
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Track line */}
        <div className="absolute top-4 left-0 right-0 h-px bg-white/10 z-0" />
        <motion.div
          className="absolute top-4 left-0 h-px z-0"
          style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {STEPS.map((step) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  isDone && "text-white",
                  isActive && "text-white ring-4 ring-indigo-500/30",
                  !isDone && !isActive && "text-slate-500"
                )}
                style={{
                  background: isDone
                    ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                    : isActive
                    ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                    : "rgba(255,255,255,0.06)",
                  border: !isDone && !isActive ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {isDone ? <Check size={14} /> : step.id}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-indigo-400" : isDone ? "text-slate-400" : "text-slate-600"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
