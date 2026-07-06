import { MapPin, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface TicketTimelineProps {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  boardingPoint: string;
  droppingPoint: string;
  date: string;
}

export function TicketTimeline({
  from, to, departureTime, arrivalTime, duration, boardingPoint, droppingPoint, date
}: TicketTimelineProps) {
  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Vertical line */}
        <div className="flex flex-col items-center pt-1">
          <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
          <div className="w-px flex-1 my-2" style={{ background: "linear-gradient(to bottom, #4f46e5, #7c3aed)" }} />
          <div className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20" />
        </div>

        {/* Content */}
        <div className="flex-1 pb-1">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">{formatTime(departureTime)}</div>
              <div className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg">{date}</div>
            </div>
            <div className="font-semibold text-slate-200 mt-1">{from}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-indigo-400" />
              <span className="text-xs text-slate-500">{boardingPoint}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-6 -mt-3">
            <Clock size={12} className="text-slate-600" />
            <span className="text-xs text-slate-600">{duration} journey</span>
          </div>

          <div>
            <div className="text-2xl font-bold text-white">{formatTime(arrivalTime)}</div>
            <div className="font-semibold text-slate-200 mt-1">{to}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-violet-400" />
              <span className="text-xs text-slate-500">{droppingPoint}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
