interface LegendItem {
  color: React.CSSProperties;
  label: string;
  dotColor?: string;
}

const LEGEND_ITEMS: LegendItem[] = [
  {
    color: { background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)" },
    label: "Available",
  },
  {
    color: { background: "linear-gradient(135deg, rgba(79,70,229,0.4), rgba(124,58,237,0.4))", border: "1.5px solid rgba(79,70,229,0.6)" },
    label: "Selected",
  },
  {
    color: { background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.25)" },
    label: "Booked",
  },
  {
    color: { background: "rgba(236,72,153,0.08)", border: "1.5px solid rgba(236,72,153,0.3)" },
    label: "Ladies",
  },
];

export function SeatLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex-shrink-0"
            style={item.color}
          />
          <span className="text-xs text-slate-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
