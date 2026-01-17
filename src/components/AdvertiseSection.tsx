import { Megaphone } from "lucide-react";

interface AdvertiseSectionProps {
  className?: string;
}

const advertiseBanners = [
  { text: "Advertise Here", delay: 0, position: "left-[10%] top-[20%]" },
  { text: "Advertise With Us", delay: 1.5, position: "right-[15%] top-[30%]" },
  { text: "Advertise Here", delay: 3, position: "left-[20%] bottom-[25%]" },
  { text: "Advertise With Us", delay: 4.5, position: "right-[10%] bottom-[20%]" },
  { text: "Advertise Here", delay: 2, position: "left-[5%] top-[50%]" },
  { text: "Advertise With Us", delay: 5, position: "right-[5%] top-[55%]" },
];

export function AdvertiseSection({ className = "" }: AdvertiseSectionProps) {
  return (
    <section id="advertise" className={`relative py-16 sm:py-20 overflow-hidden ${className}`}>
      {/* Floating Advertise Banners */}
      {advertiseBanners.map((banner, index) => (
        <div
          key={index}
          className={`absolute ${banner.position} z-10 pointer-events-auto`}
          style={{
            animation: `float-gentle 6s ease-in-out infinite, pulse-glow 3s ease-in-out infinite`,
            animationDelay: `${banner.delay}s`,
          }}
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-primary-foreground whitespace-nowrap">
              {banner.text}
            </span>
          </a>
        </div>
      ))}

      {/* Center Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Megaphone className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Advertising Opportunities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Advertise With Us</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Reach thousands of tech-savvy customers across Kenya. Partner with us to grow your brand visibility.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
        >
          <Megaphone className="w-5 h-5" />
          Contact Us to Advertise
        </a>
      </div>
    </section>
  );
}

export default AdvertiseSection;
