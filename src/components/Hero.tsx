import { Button } from "./ui/button";
import { ArrowRight, Wifi, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            B-SPOT
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            TECHNOLOGIES
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional WiFi hotspot solutions delivering fast, reliable, and secure internet connectivity 
            for businesses, events, and communities.
          </p>

          {/* Feature Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card-shadow mb-3">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Fast Speed</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card-shadow mb-3">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card-shadow mb-3">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Reliable</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-tech-glow transition-all duration-300 text-lg px-8 py-6"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-primary rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;