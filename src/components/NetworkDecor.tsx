import { useState, useEffect } from "react";

// Network equipment image URLs - routers, access points, switches, etc.
const networkImages = [
  { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&h=90&fit=crop", label: "Server Rack" },
  { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=120&h=90&fit=crop", label: "Network Cables" },
  { url: "https://images.unsplash.com/photo-1606765962248-7a15d43e0f56?w=120&h=90&fit=crop", label: "WiFi Router" },
  { url: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=120&h=90&fit=crop", label: "Data Center" },
  { url: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=120&h=90&fit=crop", label: "Network Switch" },
  { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&h=90&fit=crop", label: "Fiber Optics" },
  { url: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=120&h=90&fit=crop", label: "Access Point" },
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=90&fit=crop", label: "Tech Hardware" },
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const leftImages = networkImages.slice(0, 4);
  const rightImages = networkImages.slice(4, 8);

  const renderSide = (side: "left" | "right") => {
    const images = side === "left" ? leftImages : rightImages;
    
    return (
      <div
        className={`hidden 2xl:flex flex-col gap-3 fixed ${
          side === "left" ? "left-2" : "right-2"
        } top-1/2 -translate-y-1/2 z-10 max-h-[80vh] overflow-y-auto scrollbar-hide`}
      >
        {/* Network Equipment Images */}
        <div className="flex flex-col gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-20 h-14 object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                loading="lazy"
              />
              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1">
                <span className="text-[9px] font-medium text-primary-foreground truncate px-1">
                  {img.label}
                </span>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Advertise Here Banner */}
        {showAd && (
          <div
            className={`mt-2 px-2 py-1.5 rounded-lg border-2 border-dashed transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-0.5 ${
              adVisible
                ? "border-primary bg-primary/15 shadow-lg shadow-primary/30"
                : "border-muted-foreground/30 bg-muted/20"
            }`}
          >
            <p
              className={`text-[10px] font-bold text-center transition-all duration-300 ${
                adVisible ? "text-primary scale-105" : "text-muted-foreground scale-100"
              }`}
            >
              📢 Advertise
            </p>
            <p
              className={`text-[8px] text-center transition-all duration-300 ${
                adVisible ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Here
            </p>
          </div>
        )}
      </div>
    );
  };

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
