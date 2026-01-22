import { Megaphone } from "lucide-react";

interface FloatingAdBannerProps {
  position?: "left" | "right";
  delay?: number;
  className?: string;
}

export function FloatingAdBanner({ 
  position = "right", 
  delay = 0,
  className = ""
}: FloatingAdBannerProps) {
  const positionClasses = position === "left" 
    ? "left-4 sm:left-6" 
    : "right-4 sm:right-6";

  return (
    <div
      className={`absolute ${positionClasses} z-20 pointer-events-auto hidden lg:block ${className}`}
      style={{
        animation: `float-gentle 6s ease-in-out infinite, pulse-glow 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <a
        href="#contact"
        onClick={() => {
          sessionStorage.setItem('inquiry_type', 'advertising');
        }}
        className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground animate-pulse" />
        <span className="text-xs sm:text-sm font-bold text-primary-foreground whitespace-nowrap">
          Advertise With Us
        </span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-ping" />
      </a>
    </div>
  );
}

export default FloatingAdBanner;
