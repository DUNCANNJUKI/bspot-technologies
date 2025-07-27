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
    <section id="services" className="py-20 bg-gradient-secondary relative overflow-hidden">
      {/* Background Images */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center opacity-10 animate-fade-in"
        style={{ backgroundImage: `url(${wifiConnectivity})` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cover bg-center opacity-10 animate-fade-in"
        style={{ backgroundImage: `url(${accessPoint})`, animationDelay: '0.5s' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive WiFi solutions designed to meet your connectivity needs with 
            professional installation, management, and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-card-shadow transition-all duration-300 hover:-translate-y-2 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-tech-glow">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 text-base">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
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