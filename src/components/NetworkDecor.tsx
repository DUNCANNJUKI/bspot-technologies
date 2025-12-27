import { useState, useEffect } from "react";

// Network equipment image URLs (placeholder images representing routers, access points, etc.)
const networkImages = [
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop", // Server rack
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=150&fit=crop", // Network cables
  "https://images.unsplash.com/photo-1606765962248-7a15d43e0f56?w=200&h=150&fit=crop", // Router
  "https://images.unsplash.com/photo-1562408590-e32931084e23?w=200&h=150&fit=crop", // Data center
];

interface NetworkDecorProps {
  position?: "left" | "right" | "both";
  showAd?: boolean;
  className?: string;
}

export function NetworkDecor({ position = "both", showAd = true, className = "" }: NetworkDecorProps) {
  const [adVisible, setAdVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAdVisible((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const renderSide = (side: "left" | "right") => (
    <div
      className={`hidden xl:flex flex-col gap-4 fixed ${side === "left" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10`}
    >
      {/* Network Equipment Images */}
      <div className="flex flex-col gap-3">
        {networkImages.slice(side === "left" ? 0 : 2, side === "left" ? 2 : 4).map((img, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-lg border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <img
              src={img}
              alt={`Network equipment ${idx + 1}`}
              className="w-24 h-18 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Advertise Here Banner */}
      {showAd && (
        <div
          className={`mt-4 px-3 py-2 rounded-lg border-2 border-dashed transition-all duration-300 cursor-pointer hover:scale-105 ${
            adVisible
              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
              : "border-primary/40 bg-primary/5"
          }`}
        >
          <p
            className={`text-xs font-bold text-center transition-all duration-300 ${
              adVisible ? "text-primary" : "text-primary/60"
            }`}
          >
            📢 Advertise
          </p>
          <p
            className={`text-[10px] text-center transition-all duration-300 ${
              adVisible ? "text-primary" : "text-primary/60"
            }`}
          >
            Here
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      {(position === "left" || position === "both") && renderSide("left")}
      {(position === "right" || position === "both") && renderSide("right")}
    </div>
  );
}

// Floating network elements for section backgrounds
export function FloatingNetworkElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating router icon */}
      <div className="absolute top-20 left-[10%] opacity-10 animate-float">
        <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>
      
      {/* Floating wifi signal */}
      <div className="absolute bottom-32 right-[15%] opacity-10 animate-float" style={{ animationDelay: "1s" }}>
        <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
      </div>

      {/* Floating ethernet */}
      <div className="absolute top-1/2 left-[5%] opacity-10 animate-float" style={{ animationDelay: "2s" }}>
        <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"/>
        </svg>
      </div>
    </div>
  );
}

export default NetworkDecor;
