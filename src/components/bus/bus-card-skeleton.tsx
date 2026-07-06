export function BusCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[0_16px_40px_rgba(10,31,27,0.08)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0A1F1B]/50 sm:p-8">
      <div className="grid animate-pulse gap-6 lg:grid-cols-[1.3fr_1.4fr_0.9fr] lg:gap-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3.5">
            <div className="h-14 w-14 rounded-2xl bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-full bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
              <div className="h-3 w-1/2 rounded-full bg-[#0A1F1B]/[0.06] dark:bg-white/[0.06]" />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-16 rounded-full bg-[#0A1F1B]/[0.06] dark:bg-white/[0.06]" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 border-t border-[#0A1F1B]/[0.06] pt-5 dark:border-white/[0.06] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="h-8 w-16 rounded-full bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
          <div className="h-1 flex-1 rounded-full bg-[#0A1F1B]/[0.06] dark:bg-white/[0.06]" />
          <div className="h-8 w-16 rounded-full bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
        </div>
        <div className="space-y-3 border-t border-[#0A1F1B]/[0.06] pt-5 dark:border-white/[0.06] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="h-9 w-24 rounded-full bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
          <div className="h-11 w-full rounded-2xl bg-[#0A1F1B]/[0.08] dark:bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}
