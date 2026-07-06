"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, ChevronDown } from "lucide-react";
import { Passenger } from "@/types/bus";
import { cn } from "@/lib/utils";

interface PassengerFormProps {
  passenger: Passenger;
  index: number;
  onChange: (updated: Passenger) => void;
  errors: Partial<Record<keyof Passenger, string>>;
}

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export function PassengerForm({ passenger, index, onChange, errors }: PassengerFormProps) {
  const [genderOpen, setGenderOpen] = useState(false);

  const update = (field: keyof Passenger, value: string) => {
    onChange({ ...passenger, [field]: value });
  };

  return (
    <motion.div
      className="rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ background: "linear-gradient(145deg, #16162a, #1a1a30)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-indigo-300"
            style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.25)" }}
          >
            {index + 1}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Passenger {index + 1}</div>
            <div className="text-xs text-slate-500 mt-0.5">Seat {passenger.seatNumber}</div>
          </div>
        </div>
        <span
          className="px-2.5 py-1 rounded-lg text-xs text-indigo-300 font-medium"
          style={{ background: "rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.2)" }}
        >
          Seat {passenger.seatNumber}
        </span>
      </div>

      {/* Form fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <FormField label="Full Name" error={errors.name} icon={<User size={14} />}>
          <input
            type="text"
            placeholder="Enter full name"
            value={passenger.name}
            onChange={(e) => update("name", e.target.value)}
            className={cn("input-field", errors.name && "border-rose-500/50 focus:border-rose-500")}
          />
        </FormField>

        {/* Age */}
        <FormField label="Age" error={errors.age}>
          <input
            type="number"
            placeholder="Age"
            value={passenger.age}
            min={1}
            max={120}
            onChange={(e) => update("age", e.target.value)}
            className={cn("input-field", errors.age && "border-rose-500/50 focus:border-rose-500")}
          />
        </FormField>

        {/* Gender */}
        <FormField label="Gender" error={errors.gender}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setGenderOpen(!genderOpen)}
              className={cn(
                "input-field flex items-center justify-between text-left",
                !passenger.gender && "text-slate-500",
                errors.gender && "border-rose-500/50"
              )}
            >
              <span>{passenger.gender ? GENDERS.find((g) => g.value === passenger.gender)?.label : "Select gender"}</span>
              <ChevronDown size={14} className={cn("text-slate-500 transition-transform", genderOpen && "rotate-180")} />
            </button>
            {genderOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-1 z-20 rounded-2xl overflow-hidden"
                style={{ background: "#1e1e35", border: "1px solid rgba(255,255,255,0.1)" }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => {
                      update("gender", g.value);
                      setGenderOpen(false);
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </FormField>

        {/* Phone */}
        <FormField label="Phone Number" error={errors.phone} icon={<Phone size={14} />}>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={passenger.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={cn("input-field", errors.phone && "border-rose-500/50 focus:border-rose-500")}
          />
        </FormField>

        {/* Email */}
        <div className="md:col-span-2">
          <FormField label="Email Address" error={errors.email} icon={<Mail size={14} />}>
            <input
              type="email"
              placeholder="your@email.com"
              value={passenger.email}
              onChange={(e) => update("email", e.target.value)}
              className={cn("input-field", errors.email && "border-rose-500/50 focus:border-rose-500")}
            />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}

function FormField({
  label,
  children,
  error,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <div className={icon ? "[&>input]:pl-9" : ""}>{children}</div>
      </div>
      {error && (
        <motion.p
          className="text-xs text-rose-400 flex items-center gap-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
