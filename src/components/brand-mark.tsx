import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  animate?: boolean;
  className?: string;
}

/* EstaRosa petal emblem, recolored in blue/turquoise palette */
export function BrandMark({ size = 48, animate = false, className }: Props) {
  const petals = 12;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn(className)}
      aria-label="EstaRosa logo"
    >
      <defs>
        <linearGradient id="er-pet-l" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.2 260)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.7 0.13 220)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="er-pet-r" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.14 200)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.8 0.13 180)" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="er-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="oklch(0.85 0.1 210)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.6 0.18 240)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* outer thin border */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="oklch(0.72 0.13 195)" strokeWidth="1" opacity="0.6" />
      {/* outer petal ring */}
      <g className={animate ? "animate-breath-slow" : ""} style={{ transformOrigin: "60px 60px" }}>
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (360 / petals) * i;
          const left = i < petals / 2;
          return (
            <ellipse
              key={`o-${i}`}
              cx="60"
              cy="22"
              rx="14"
              ry="34"
              fill={left ? "url(#er-pet-l)" : "url(#er-pet-r)"}
              transform={`rotate(${angle} 60 60)`}
            />
          );
        })}
      </g>
      {/* mid petal ring */}
      <g className={animate ? "animate-breath" : ""} style={{ transformOrigin: "60px 60px", animationDelay: "0.5s" }}>
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (360 / petals) * i + 15;
          const left = i < petals / 2;
          return (
            <ellipse
              key={`m-${i}`}
              cx="60"
              cy="38"
              rx="9"
              ry="22"
              fill={left ? "url(#er-pet-l)" : "url(#er-pet-r)"}
              opacity="0.85"
              transform={`rotate(${angle} 60 60)`}
            />
          );
        })}
      </g>
      {/* glowing core */}
      <circle cx="60" cy="60" r="24" fill="url(#er-core)" className={animate ? "animate-breath" : ""} style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="3" fill="#ffffff" />
    </svg>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark size={36} />
      <span className="text-xl font-bold tracking-tight text-gradient-brand">EstaRosa</span>
    </div>
  );
}
