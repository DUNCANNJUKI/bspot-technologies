import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Wifi, Building, Calendar, Users, Settings, Headphones } from "lucide-react";
import wifiConnectivity from "@/assets/wifi-connectivity.jpg";
import accessPoint from "@/assets/access-point.jpg";

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
    <section id="services" className="py-24 bg-gradient-secondary relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center opacity-8 animate-fade-in"
        style={{ backgroundImage: `url(${wifiConnectivity})` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cover bg-center opacity-8 animate-fade-in"
        style={{ backgroundImage: `url(${accessPoint})`, animationDelay: '0.5s' }}
      />
      
      {/* Floating Design Elements */}
      <div className="absolute top-32 left-16 w-20 h-20 border border-primary/10 rounded-full animate-float opacity-40" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-primary/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-scale-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Our <span className="elegant-text">Premium Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Crafted solutions that transform connectivity experiences with 
            <span className="text-primary font-medium"> enterprise precision</span> and 
            <span className="text-primary font-medium"> unwavering reliability</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="luxury-card hover:shadow-elegant-shadow transition-all duration-500 hover-lift animate-slide-up group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="pb-6">
                <div className="w-20 h-20 bg-gradient-elegant rounded-2xl flex items-center justify-center mb-6 shadow-tech-glow group-hover:scale-110 transition-all duration-500">
                  <service.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-foreground font-bold tracking-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-3 h-3 bg-gradient-elegant rounded-full mr-4 flex-shrink-0" />
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