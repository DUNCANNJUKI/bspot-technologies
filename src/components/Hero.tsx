import { Button } from "./ui/button";
import { ArrowRight, Wifi, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import networkInfrastructure from "@/assets/network-infrastructure.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-fade-in"
        style={{ backgroundImage: `url(${networkInfrastructure})` }}
      />
      
      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-float opacity-30" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-elegant rounded-lg opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-primary/30 rotate-45 opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Main Heading */}
          <div className="mb-8 animate-scale-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 elegant-text leading-none tracking-tight">
              B-SPOT
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-foreground/90 tracking-widest">
              TECHNOLOGIES
            </h2>
          </div>
          
          {/* Elegant Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Crafting premium WiFi experiences that connect communities across Kenya with 
            <span className="text-primary font-medium"> enterprise-grade reliability</span> and 
            <span className="text-primary font-medium"> unmatched performance</span>.
          </p>

          {/* Premium Feature Icons */}
          <div className="flex justify-center gap-12 mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 luxury-card rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 luxury-card rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Enterprise Secure</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 luxury-card rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Wifi className="w-10 h-10 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Always Reliable</span>
            </div>
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <Button 
              size="lg" 
              className="premium-button text-lg px-10 py-7 rounded-2xl font-semibold tracking-wide"
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-effect border-primary/50 text-primary hover:bg-primary/10 transition-all duration-500 text-lg px-10 py-7 rounded-2xl font-semibold tracking-wide backdrop-blur-md hover-lift"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;