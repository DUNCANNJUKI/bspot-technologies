import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Wifi, Building, Calendar, Users, Settings, Headphones } from "lucide-react";
import wifiConnectivity from "@/assets/wifi-connectivity.webp";
import accessPoint from "@/assets/access-point.webp";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Business WiFi Solutions",
      description: "Reliable internet connectivity for offices, retail stores, and commercial spaces with enterprise-grade security.",
      features: ["24/7 monitoring", "Scalable bandwidth", "Enterprise security"]
    },
    {
      icon: Calendar,
      title: "Event WiFi Services",
      description: "Temporary high-capacity WiFi solutions for conferences, festivals, and special events.",
      features: ["Quick deployment", "High user capacity", "Event analytics"]
    },
    {
      icon: Users,
      title: "Public Hotspot Management",
      description: "Comprehensive WiFi solutions for hotels, restaurants, and public venues.",
      features: ["Guest portal", "Usage analytics", "Brand customization"]
    },
    {
      icon: Settings,
      title: "Network Installation",
      description: "Professional setup and configuration of WiFi infrastructure tailored to your needs.",
      features: ["Site survey", "Equipment provision", "Configuration"]
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      description: "Round-the-clock technical assistance to ensure your network runs smoothly.",
      features: ["Remote monitoring", "Rapid response", "Preventive maintenance"]
    },
    {
      icon: Wifi,
      title: "WiFi Optimization",
      description: "Performance tuning and optimization of existing WiFi networks for maximum efficiency.",
      features: ["Speed optimization", "Coverage analysis", "Performance reports"]
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-gradient-secondary relative overflow-hidden animate-fade-in">
      {/* Professional Background Elements */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center opacity-6 animate-fade-in"
        style={{ backgroundImage: `url(${wifiConnectivity})` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cover bg-center opacity-6 animate-fade-in"
        style={{ backgroundImage: `url(${accessPoint})`, animationDelay: '0.5s' }}
      />
      
      {/* Refined Design Elements */}
      <div className="absolute top-32 left-16 w-16 h-16 border border-primary/8 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-primary/5 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            Our <span className="elegant-text">Premium Services</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Professional solutions that deliver exceptional connectivity experiences with 
            <span className="text-primary font-semibold"> enterprise precision</span> and 
            <span className="text-primary font-semibold"> unwavering reliability</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="luxury-card hover:shadow-elegant-shadow transition-all duration-500 hover-lift animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4 sm:pb-6">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-elegant rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-tech-glow group-hover:scale-110 transition-all duration-500">
                  <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-foreground font-bold tracking-tight leading-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-elegant rounded-full mr-3 sm:mr-4 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;