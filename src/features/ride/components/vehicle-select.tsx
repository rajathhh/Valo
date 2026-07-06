"use client";

import { Bike, Car, CarTaxiFront } from "lucide-react";
import type { FareEstimate, VehicleType } from "@/types/domain";
import { VEHICLE_PROFILES } from "@/lib/fare-engine";
import { formatINR, formatEta, cn } from "@/lib/utils";

const ICONS = { Bike, Car, CarTaxiFront } as const;

export function VehicleSelect({
  estimates,
  selected,
  onSelect,
}: {
  estimates: FareEstimate[];
  selected: VehicleType | null;
  onSelect: (v: VehicleType) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Choose a vehicle" className="space-y-2.5">
      {estimates.map((estimate) => {
        const profile = VEHICLE_PROFILES.find((p) => p.type === estimate.vehicleType)!;
        const Icon = ICONS[profile.icon];
        const isSelected = selected === estimate.vehicleType;

        return (
          <button
            key={estimate.vehicleType}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(estimate.vehicleType)}
            className={cn(
              "flex w-full items-center gap-4 rounded-[var(--radius-md)] border p-4 text-left transition-colors",
              isSelected
                ? "border-[var(--brand-primary)] bg-[var(--color-backwater-50)] dark:bg-[var(--color-ink-800)]"
                : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-default)]"
            )}
          >
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full",
                isSelected ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--bg-surface-raised)] text-[var(--text-secondary)]"
              )}
            >
              <Icon className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-base font-medium text-[var(--text-primary)]">{profile.label}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatEta(estimate.etaMinutes)} away · seats {profile.capacity}
                {estimate.surgeMultiplier > 1 && (
                  <span className="ml-1.5 font-semibold text-[var(--color-laterite-500)]">
                    {estimate.surgeMultiplier.toFixed(2)}× surge
                  </span>
                )}
              </p>
            </div>
            <p className="font-mono text-base font-semibold text-[var(--text-primary)]">{formatINR(estimate.total)}</p>
          </button>
        );
      })}
    </div>
  );
}
