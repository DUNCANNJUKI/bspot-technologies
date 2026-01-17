import { Wifi, Router, Server, HardDrive, Globe, Cpu, Network, Signal, Antenna, Cloud, Database, CircuitBoard, Microchip } from "lucide-react";

interface NetworkDecorProps {
  className?: string;
}

const floatingEquipment = [
  // Left side - larger, more visible
  { Icon: Router, position: "top-[5%] left-[3%]", size: "w-10 h-10 md:w-14 md:h-14", delay: 0, duration: 18, glow: true },
  { Icon: Wifi, position: "top-[20%] left-[6%]", size: "w-12 h-12 md:w-18 md:h-18", delay: 2, duration: 22, glow: true },
  { Icon: Server, position: "top-[38%] left-[2%]", size: "w-9 h-9 md:w-13 md:h-13", delay: 4, duration: 16, glow: false },
  { Icon: Antenna, position: "top-[55%] left-[5%]", size: "w-11 h-11 md:w-16 md:h-16", delay: 1, duration: 20, glow: true },
  { Icon: Network, position: "top-[72%] left-[3%]", size: "w-8 h-8 md:w-12 md:h-12", delay: 3, duration: 17, glow: false },
  { Icon: Database, position: "top-[88%] left-[6%]", size: "w-10 h-10 md:w-14 md:h-14", delay: 5, duration: 21, glow: true },

  // Right side - larger, more visible
  { Icon: Globe, position: "top-[8%] right-[4%]", size: "w-11 h-11 md:w-16 md:h-16", delay: 3, duration: 24, glow: true },
  { Icon: Cloud, position: "top-[25%] right-[5%]", size: "w-9 h-9 md:w-13 md:h-13", delay: 0, duration: 19, glow: false },
  { Icon: HardDrive, position: "top-[42%] right-[3%]", size: "w-10 h-10 md:w-14 md:h-14", delay: 4, duration: 17, glow: true },
  { Icon: Cpu, position: "top-[58%] right-[6%]", size: "w-12 h-12 md:w-17 md:h-17", delay: 2, duration: 22, glow: true },
  { Icon: Signal, position: "top-[75%] right-[4%]", size: "w-8 h-8 md:w-12 md:h-12", delay: 5, duration: 16, glow: false },
  { Icon: Microchip, position: "top-[90%] right-[5%]", size: "w-9 h-9 md:w-13 md:h-13", delay: 1, duration: 20, glow: true },

  // Scattered center elements
  { Icon: CircuitBoard, position: "top-[15%] left-[15%]", size: "w-6 h-6 md:w-9 md:h-9", delay: 2, duration: 25, glow: false },
  { Icon: Wifi, position: "top-[45%] right-[15%]", size: "w-7 h-7 md:w-10 md:h-10", delay: 4, duration: 23, glow: true },
  { Icon: Router, position: "top-[75%] left-[18%]", size: "w-6 h-6 md:w-8 md:h-8", delay: 0, duration: 26, glow: false },
  { Icon: Server, position: "top-[30%] right-[18%]", size: "w-5 h-5 md:w-8 md:h-8", delay: 3, duration: 21, glow: true },
];

export function NetworkDecor({ className = "" }: NetworkDecorProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {floatingEquipment.map(({ Icon, position, size, delay, duration, glow }, index) => (
        <div
          key={index}
          className={`absolute ${position} network-icon ${glow ? "network-glow" : ""}`}
          style={{
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          <Icon className={`${size} text-primary`} strokeWidth={1.5} />
        </div>
      ))}

      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
    </div>
  );
}

export default NetworkDecor;
