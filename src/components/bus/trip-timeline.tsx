import { MapPin } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface TripTimelineProps {
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  boardingPoint?: string;
  droppingPoint?: string;
  compact?: boolean;
}

export function TripTimeline({
  departureTime,
  arrivalTime,
  duration,
  from,
  to,
  boardingPoint,
  droppingPoint,
  compact = false,
}: TripTimelineProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{formatTime(departureTime)}</div>
          <div className="text-xs text-slate-500 mt-0.5">{from}</div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="text-xs text-slate-500">{duration}</div>
          <div className="w-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-violet-500/50" />
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{formatTime(arrivalTime)}</div>
          <div className="text-xs text-slate-500 mt-0.5">{to}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1" />
          <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/50 to-violet-500/50 my-1 min-h-[40px]" />
          <div className="w-3 h-3 rounded-full bg-violet-500" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <div className="text-2xl font-bold text-white">{formatTime(departureTime)}</div>
            <div className="text-sm font-medium text-slate-300">{from}</div>
            {boardingPoint && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={11} className="text-slate-500" />
                <span className="text-xs text-slate-500">{boardingPoint}</span>
              </div>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{formatTime(arrivalTime)}</div>
            <div className="text-sm font-medium text-slate-300">{to}</div>
            {droppingPoint && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={11} className="text-slate-500" />
                <span className="text-xs text-slate-500">{droppingPoint}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400 font-medium">{duration}</div>
        </div>
      </div>
    </div>
  );
}
