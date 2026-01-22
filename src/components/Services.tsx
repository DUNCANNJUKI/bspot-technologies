import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Wifi, Building, Calendar, Users, Settings, Headphones } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FloatingAdBanner } from "./FloatingAdBanner";
import wifiConnectivity from "@/assets/wifi-connectivity.webp";
import accessPoint from "@/assets/access-point.webp";

interface ServiceCardProps {
  icon: typeof Wifi;
  title: string;
  description: string;
  features: string[];
  index: number;
}

function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <Card
        className="luxury-card h-full hover:shadow-tech-glow transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group border-primary/20 hover:border-primary/40"
        style={{
          background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--card) / 0.9))",
        }}
      >
        <CardHeader className="pb-4 sm:pb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-tech-glow group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground relative z-10" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight leading-tight bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
            {description}
          </CardDescription>
          <ul className="space-y-2 sm:space-y-3">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-center text-sm text-foreground/80 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${(index * 100) + (idx * 75) + 200}ms` }}
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-primary rounded-full mr-3 sm:mr-4 flex-shrink-0 shadow-tech-glow" />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const services = [
    {
      icon: Wifi,
      title: "Home Internet",
      description: "Enjoy stable, high-speed internet for all your daily needs with Hotspot & PPPoE connection options.",
      features: ["Streaming & gaming", "Online classes", "24/7 support"],
    },
    {
      icon: Building,
      title: "Business Internet Solutions",
      description: "Reliable high-capacity connections with dedicated support for small, medium, and large businesses.",
      features: ["Dedicated support", "High-capacity", "Flexible packages"],
    },
    {
      icon: Users,
      title: "Open-Air Market Hotspots",
      description: "Wide-area Wi-Fi coverage for vendors and customers in busy open-air markets.",
      features: ["Wide coverage", "Instant access", "Affordable rates"],
    },
    {
      icon: Calendar,
      title: "Schools & Learning Centers",
      description: "Free or subsidized school Wi-Fi with secure network access for students and teachers.",
      features: ["Secure access", "High coverage", "Technical support"],
    },
    {
      icon: Settings,
      title: "Network Installation",
      description: "Professional setup and configuration of WiFi infrastructure tailored to your needs.",
      features: ["Site survey", "Equipment provision", "Configuration"],
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      description: "Round-the-clock technical assistance to ensure your network runs smoothly.",
      features: ["Remote monitoring", "Rapid response", "Preventive maintenance"],
    },
  ];

  return (
    <div className="py-20 sm:py-24 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Floating Advertise Banners */}
      <FloatingAdBanner position="right" delay={0} className="top-24" />
      <FloatingAdBanner position="left" delay={2} className="bottom-32" />

      {/* Tech Background Elements */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center opacity-8 blur-sm"
        style={{ backgroundImage: `url(${wifiConnectivity})` }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cover bg-center opacity-8 blur-sm"
        style={{ backgroundImage: `url(${accessPoint})` }}
      />

      {/* Dynamic Tech Elements */}
      <div
        className="absolute top-32 left-16 w-24 h-24 border-2 border-primary/30 rounded-full animate-pulse opacity-60"
        style={{ boxShadow: "0 0 30px hsl(195, 100%, 50% / 0.3)" }}
      />
      <div
        className="absolute bottom-32 right-16 w-20 h-20 bg-gradient-primary rounded-lg rotate-45 animate-spin opacity-20"
        style={{ animationDuration: "20s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Our Services</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            From homes to businesses, schools to markets—we deliver
            <span className="text-primary font-bold"> fast, affordable, and reliable</span> internet solutions
            that keep you connected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
