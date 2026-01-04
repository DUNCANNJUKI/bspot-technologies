import { Wifi, Radio, Server, Globe, Cpu, Signal, Router, HardDrive, Network, Smartphone } from "lucide-react";

interface FloatingTechIconsProps {
  variant?: "sparse" | "dense";
  className?: string;
}

const icons = [
  { Icon: Wifi, color: "text-primary", delay: "0s", position: "top-[10%] left-[5%]", size: "w-8 h-8 md:w-12 md:h-12" },
  { Icon: Radio, color: "text-secondary", delay: "1s", position: "top-[20%] right-[8%]", size: "w-6 h-6 md:w-10 md:h-10" },
  { Icon: Server, color: "text-accent", delay: "2s", position: "top-[40%] left-[3%]", size: "w-7 h-7 md:w-9 md:h-9" },
  { Icon: Globe, color: "text-primary", delay: "0.5s", position: "top-[60%] right-[5%]", size: "w-10 h-10 md:w-14 md:h-14" },
  { Icon: Cpu, color: "text-secondary", delay: "1.5s", position: "bottom-[30%] left-[7%]", size: "w-6 h-6 md:w-8 md:h-8" },
  { Icon: Signal, color: "text-accent", delay: "2.5s", position: "bottom-[15%] right-[10%]", size: "w-8 h-8 md:w-11 md:h-11" },
  { Icon: Router, color: "text-primary", delay: "0.8s", position: "top-[75%] left-[12%]", size: "w-5 h-5 md:w-7 md:h-7" },
  { Icon: HardDrive, color: "text-secondary", delay: "1.8s", position: "top-[5%] right-[20%]", size: "w-6 h-6 md:w-8 md:h-8" },
  { Icon: Network, color: "text-accent", delay: "3s", position: "bottom-[40%] right-[3%]", size: "w-9 h-9 md:w-12 md:h-12" },
  { Icon: Smartphone, color: "text-primary", delay: "1.2s", position: "bottom-[60%] left-[2%]", size: "w-5 h-5 md:w-7 md:h-7" },
];

export function FloatingTechIcons({ variant = "sparse", className = "" }: FloatingTechIconsProps) {
  const displayIcons = variant === "sparse" ? icons.slice(0, 6) : icons;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {displayIcons.map(({ Icon, color, delay, position, size }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-[0.08] animate-float`}
          style={{ animationDelay: delay, animationDuration: `${6 + index}s` }}
        >
          <Icon className={`${size} ${color}`} />
        </div>
      ))}
      
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 100%, 50%)" />
            <stop offset="50%" stopColor="hsl(280, 85%, 60%)" />
            <stop offset="100%" stopColor="hsl(330, 85%, 55%)" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q25,30 50,50 T100,50"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <path
          d="M0,80 Q40,60 80,80 T160,80"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          className="animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </svg>

      {/* Glowing orbs */}
      <div className="absolute top-[15%] left-[20%] w-32 h-32 md:w-48 md:h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 md:w-56 md:h-56 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      <div className="absolute top-[50%] right-[30%] w-24 h-24 md:w-36 md:h-36 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "4s" }} />
    </div>
  );
}

export default FloatingTechIcons;
