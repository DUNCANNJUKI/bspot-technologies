import { Wifi, Router, Server, HardDrive, Radio, Globe, Cpu, Network, Signal, Cable } from "lucide-react";

interface NetworkDecorProps {
  className?: string;
}

const floatingEquipment = [
  { Icon: Router, position: "top-[8%] left-[5%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "0s", duration: "20s", opacity: "opacity-[0.06]" },
  { Icon: Server, position: "top-[15%] right-[8%]", size: "w-8 h-8 md:w-12 md:h-12", delay: "2s", duration: "18s", opacity: "opacity-[0.05]" },
  { Icon: Wifi, position: "top-[35%] left-[3%]", size: "w-12 h-12 md:w-16 md:h-16", delay: "1s", duration: "22s", opacity: "opacity-[0.07]" },
  { Icon: HardDrive, position: "top-[45%] right-[4%]", size: "w-9 h-9 md:w-13 md:h-13", delay: "3s", duration: "19s", opacity: "opacity-[0.05]" },
  { Icon: Radio, position: "top-[60%] left-[6%]", size: "w-7 h-7 md:w-11 md:h-11", delay: "4s", duration: "21s", opacity: "opacity-[0.06]" },
  { Icon: Globe, position: "top-[70%] right-[6%]", size: "w-11 h-11 md:w-15 md:h-15", delay: "0.5s", duration: "23s", opacity: "opacity-[0.04]" },
  { Icon: Cpu, position: "top-[25%] left-[92%]", size: "w-8 h-8 md:w-12 md:h-12", delay: "2.5s", duration: "17s", opacity: "opacity-[0.05]" },
  { Icon: Network, position: "top-[80%] left-[4%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "1.5s", duration: "20s", opacity: "opacity-[0.06]" },
  { Icon: Signal, position: "top-[55%] right-[92%]", size: "w-6 h-6 md:w-10 md:h-10", delay: "3.5s", duration: "24s", opacity: "opacity-[0.05]" },
  { Icon: Cable, position: "top-[90%] right-[10%]", size: "w-9 h-9 md:w-12 md:h-12", delay: "4.5s", duration: "18s", opacity: "opacity-[0.04]" },
];

export function NetworkDecor({ className = "" }: NetworkDecorProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Floating network equipment icons */}
      {floatingEquipment.map(({ Icon, position, size, delay, duration, opacity }, index) => (
        <div
          key={index}
          className={`absolute ${position} ${opacity} animate-float-gentle`}
          style={{ 
            animationDelay: delay, 
            animationDuration: duration,
          }}
        >
          <Icon 
            className={`${size} text-primary/80 drop-shadow-sm`} 
            strokeWidth={1.5}
          />
        </div>
      ))}

      {/* Subtle gradient orbs for depth */}
      <div 
        className="absolute top-[20%] left-[15%] w-64 h-64 md:w-96 md:h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDuration: "12s" }} 
      />
      <div 
        className="absolute bottom-[25%] right-[10%] w-72 h-72 md:w-[28rem] md:h-[28rem] bg-secondary/3 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDuration: "15s", animationDelay: "3s" }} 
      />
      <div 
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-accent/2 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDuration: "18s", animationDelay: "6s" }} 
      />

      {/* Animated connection paths */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="networkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="networkGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Curved network paths */}
        <path
          d="M0,20% Q25%,10% 50%,20% T100%,15%"
          fill="none"
          stroke="url(#networkGradient1)"
          strokeWidth="2"
          className="animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <path
          d="M0,50% Q30%,35% 60%,50% T100%,45%"
          fill="none"
          stroke="url(#networkGradient2)"
          strokeWidth="1.5"
          className="animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <path
          d="M0,80% Q35%,70% 70%,80% T100%,75%"
          fill="none"
          stroke="url(#networkGradient1)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </svg>
    </div>
  );
}

export default NetworkDecor;
