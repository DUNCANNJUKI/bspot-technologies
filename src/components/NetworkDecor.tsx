import { Wifi, Router, Server, HardDrive, Radio, Globe, Cpu, Network, Signal, Cable, Antenna, Cloud, Database, Monitor, Smartphone, Laptop, Tablet, Watch, Headphones, Speaker, Printer, ScanLine, CircuitBoard, Microchip, Usb, Bluetooth, Nfc, Cast, Airplay, Share2 } from "lucide-react";

interface NetworkDecorProps {
  className?: string;
}

const floatingEquipment = [
  // Left side equipment
  { Icon: Router, position: "top-[5%] left-[3%]", size: "w-8 h-8 md:w-12 md:h-12", delay: "0s", duration: "25s", opacity: "opacity-[0.08]", rotate: "rotate-12" },
  { Icon: Wifi, position: "top-[18%] left-[8%]", size: "w-14 h-14 md:w-20 md:h-20", delay: "1.5s", duration: "28s", opacity: "opacity-[0.06]", rotate: "-rotate-6" },
  { Icon: Server, position: "top-[32%] left-[2%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "3s", duration: "22s", opacity: "opacity-[0.07]", rotate: "rotate-3" },
  { Icon: Antenna, position: "top-[48%] left-[6%]", size: "w-12 h-12 md:w-16 md:h-16", delay: "0.5s", duration: "26s", opacity: "opacity-[0.05]", rotate: "-rotate-12" },
  { Icon: Network, position: "top-[62%] left-[4%]", size: "w-9 h-9 md:w-13 md:h-13", delay: "2s", duration: "24s", opacity: "opacity-[0.06]", rotate: "rotate-6" },
  { Icon: Database, position: "top-[78%] left-[7%]", size: "w-11 h-11 md:w-15 md:h-15", delay: "4s", duration: "27s", opacity: "opacity-[0.04]", rotate: "-rotate-3" },
  { Icon: CircuitBoard, position: "top-[92%] left-[3%]", size: "w-8 h-8 md:w-11 md:h-11", delay: "1s", duration: "23s", opacity: "opacity-[0.05]", rotate: "rotate-9" },
  
  // Right side equipment
  { Icon: Globe, position: "top-[6%] right-[4%]", size: "w-12 h-12 md:w-18 md:h-18", delay: "2.5s", duration: "30s", opacity: "opacity-[0.06]", rotate: "-rotate-9" },
  { Icon: Cloud, position: "top-[20%] right-[7%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "0s", duration: "26s", opacity: "opacity-[0.07]", rotate: "rotate-6" },
  { Icon: HardDrive, position: "top-[35%] right-[3%]", size: "w-9 h-9 md:w-12 md:h-12", delay: "3.5s", duration: "24s", opacity: "opacity-[0.05]", rotate: "-rotate-6" },
  { Icon: Cpu, position: "top-[50%] right-[6%]", size: "w-13 h-13 md:w-17 md:h-17", delay: "1s", duration: "28s", opacity: "opacity-[0.06]", rotate: "rotate-12" },
  { Icon: Radio, position: "top-[65%] right-[4%]", size: "w-8 h-8 md:w-11 md:h-11", delay: "4.5s", duration: "22s", opacity: "opacity-[0.05]", rotate: "-rotate-3" },
  { Icon: Signal, position: "top-[80%] right-[8%]", size: "w-11 h-11 md:w-15 md:h-15", delay: "2s", duration: "25s", opacity: "opacity-[0.04]", rotate: "rotate-3" },
  { Icon: Microchip, position: "top-[94%] right-[5%]", size: "w-7 h-7 md:w-10 md:h-10", delay: "0.5s", duration: "27s", opacity: "opacity-[0.05]", rotate: "-rotate-12" },
  
  // Center-left floating
  { Icon: Monitor, position: "top-[12%] left-[18%]", size: "w-6 h-6 md:w-9 md:h-9", delay: "3s", duration: "32s", opacity: "opacity-[0.04]", rotate: "rotate-6" },
  { Icon: Laptop, position: "top-[40%] left-[15%]", size: "w-7 h-7 md:w-10 md:h-10", delay: "1.5s", duration: "29s", opacity: "opacity-[0.03]", rotate: "-rotate-9" },
  { Icon: Bluetooth, position: "top-[68%] left-[20%]", size: "w-5 h-5 md:w-8 md:h-8", delay: "4s", duration: "26s", opacity: "opacity-[0.04]", rotate: "rotate-12" },
  
  // Center-right floating
  { Icon: Smartphone, position: "top-[15%] right-[18%]", size: "w-6 h-6 md:w-9 md:h-9", delay: "2s", duration: "31s", opacity: "opacity-[0.03]", rotate: "-rotate-6" },
  { Icon: Cast, position: "top-[45%] right-[16%]", size: "w-7 h-7 md:w-10 md:h-10", delay: "0s", duration: "28s", opacity: "opacity-[0.04]", rotate: "rotate-3" },
  { Icon: Share2, position: "top-[72%] right-[20%]", size: "w-5 h-5 md:w-8 md:h-8", delay: "3.5s", duration: "25s", opacity: "opacity-[0.03]", rotate: "-rotate-12" },
  
  // Top and bottom scattered
  { Icon: Cable, position: "top-[3%] left-[35%]", size: "w-6 h-6 md:w-9 md:h-9", delay: "1s", duration: "33s", opacity: "opacity-[0.03]", rotate: "rotate-45" },
  { Icon: Usb, position: "top-[4%] right-[40%]", size: "w-5 h-5 md:w-7 md:h-7", delay: "2.5s", duration: "30s", opacity: "opacity-[0.04]", rotate: "-rotate-45" },
  { Icon: Nfc, position: "bottom-[5%] left-[30%]", size: "w-6 h-6 md:w-8 md:h-8", delay: "0.5s", duration: "27s", opacity: "opacity-[0.03]", rotate: "rotate-15" },
  { Icon: Airplay, position: "bottom-[4%] right-[35%]", size: "w-5 h-5 md:w-7 md:h-7", delay: "4s", duration: "29s", opacity: "opacity-[0.04]", rotate: "-rotate-15" },
];

export function NetworkDecor({ className = "" }: NetworkDecorProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Floating network equipment icons */}
      {floatingEquipment.map(({ Icon, position, size, delay, duration, opacity, rotate }, index) => (
        <div
          key={index}
          className={`absolute ${position} ${opacity} ${rotate} animate-float-gentle`}
          style={{ 
            animationDelay: delay, 
            animationDuration: duration,
          }}
        >
          <Icon 
            className={`${size} text-primary/80 drop-shadow-lg transition-all duration-1000`} 
            strokeWidth={1.2}
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
