import { cn } from "@/lib/utils";

interface BusLogoProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const gradients: Record<string, string> = {
  KS: "from-blue-500 to-indigo-600",
  KT: "from-emerald-500 to-teal-600",
  PT: "from-violet-500 to-purple-700",
  VR: "from-orange-500 to-red-600",
  default: "from-indigo-500 to-violet-700",
};

const sizes = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
};

export function BusLogo({ initials, size = "md", className }: BusLogoProps) {
  const gradient = gradients[initials] || gradients.default;
  return (
    <div
      className={cn(
        "rounded-2xl flex items-center justify-center font-bold text-white flex-shrink-0",
        `bg-gradient-to-br ${gradient}`,
        sizes[size],
        className
      )}
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
    >
      {initials}
    </div>
  );
}
