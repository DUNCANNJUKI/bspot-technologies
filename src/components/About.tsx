import { Card, CardContent } from "./ui/card";
import { Megaphone } from "lucide-react";

const About = () => {

  const values = [
    {
      title: "Affordable Packages",
      description: "Pricing designed for every household, business, and community."
    },
    {
      title: "Reliable Connectivity",
      description: "Consistent speeds and uptime you can trust."
    },
    {
      title: "Quick Installation",
      description: "Fast setup with minimal downtime."
    },
    {
      title: "Excellent Customer Support",
      description: "Friendly support staff always ready to assist."
    }
  ];

  return (
    <div className="py-20 sm:py-24 bg-background relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary rounded-full animate-pulse" style={{ boxShadow: 'var(--tech-glow)' }} />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-secondary rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-primary rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Who We Are</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            At Bspot Technologies, we provide high-quality internet solutions designed to keep you connected—whether at home, at work, in school, or in public spaces.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mt-4">
            We believe <span className="text-primary font-bold">reliable internet should be simple, accessible, and affordable</span> for everyone.
          </p>
        </div>

        {/* Company Overview */}
        <div className="text-center mb-16 sm:mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-secondary bg-clip-text text-transparent">Serving Communities Across Kenya</h3>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-10 sm:mb-12 leading-relaxed">
              Bspot Technologies delivers trusted connectivity solutions across multiple regions, 
              empowering homes, businesses, schools, and communities with seamless internet access.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="luxury-card rounded-2xl p-4 sm:p-6 lg:p-8 hover:-translate-y-2 transition-all duration-500 animate-scale-in group border-primary/20 hover:border-primary/40 relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <h4 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3 relative z-10">Nairobi</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium relative z-10">Capital Excellence</p>
                <div className="w-full h-1 bg-gradient-primary rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-2xl p-4 sm:p-6 lg:p-8 hover:-translate-y-2 transition-all duration-500 animate-scale-in group border-primary/20 hover:border-primary/40 relative overflow-hidden" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <h4 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3 relative z-10">Kikuyu</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium relative z-10">Community Focus</p>
                <div className="w-full h-1 bg-gradient-primary rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-2xl p-4 sm:p-6 lg:p-8 hover:-translate-y-2 transition-all duration-500 animate-scale-in group border-primary/20 hover:border-primary/40 relative overflow-hidden" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <h4 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3 relative z-10">Meru</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium relative z-10">Regional Innovation</p>
                <div className="w-full h-1 bg-gradient-primary rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-2xl p-4 sm:p-6 lg:p-8 hover:-translate-y-2 transition-all duration-500 animate-scale-in group border-primary/20 hover:border-primary/40 relative overflow-hidden" style={{ animationDelay: '0.7s' }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <h4 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3 relative z-10">Regen</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium relative z-10">Network Growth</p>
                <div className="w-full h-1 bg-gradient-primary rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-secondary bg-clip-text text-transparent">Our Mission</h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">To make internet access simple, affordable, and dependable for all communities</span>, 
                empowering homes, businesses, and learning environments with seamless connectivity.
              </p>
            </div>
            
            {/* Advertise With Us Blinking Popup */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 animate-pulse cursor-pointer"
                onClick={() => {
                  // Set a flag to indicate advertising inquiry
                  sessionStorage.setItem('inquiry_type', 'advertising');
                }}
              >
                <Megaphone className="w-5 h-5 text-primary-foreground animate-bounce" />
                <span className="text-sm sm:text-base font-bold text-primary-foreground whitespace-nowrap">
                  Advertise With Us
                </span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">Why Choose Bspot Technologies?</h3>
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="luxury-card hover:-translate-y-2 transition-all duration-500 animate-slide-up group border-primary/20 hover:border-primary/40 relative overflow-hidden" 
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent">{value.title}</h4>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{value.description}</p>
                  <div className="w-full h-1 bg-gradient-primary rounded-full mt-4 sm:mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </CardContent>
              </Card>
            ))}
            <Card 
              className="luxury-card hover:-translate-y-2 transition-all duration-500 animate-slide-up group border-primary/20 hover:border-primary/40 relative overflow-hidden" 
              style={{ animationDelay: `${1 + values.length * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent">Flexible Options</h4>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">Hotspot, PPPoE, wide-area Wi-Fi, and community solutions—whatever you need, we deliver.</p>
                <div className="w-full h-1 bg-gradient-primary rounded-full mt-4 sm:mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;