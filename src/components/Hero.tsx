import { Button } from "./ui/button";
import { ArrowRight, Wifi, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import networkInfrastructure from "@/assets/network-infrastructure.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 animate-fade-in"
        style={{ backgroundImage: `url(${networkInfrastructure})` }}
      />
      
      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-98" />
      
      {/* Refined Geometric Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-primary/15 rounded-full animate-float opacity-40" />
      <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-elegant rounded-lg opacity-15 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-primary/20 rotate-45 opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Professional Main Heading */}
          <div className="mb-12 animate-scale-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 elegant-text leading-none tracking-tight">
              B-SPOT
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground/90 tracking-widest">
              TECHNOLOGIES
            </h2>
          </div>
          
          {/* Professional Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Connecting communities with affordable and seamless internet connections through 
            <span className="text-primary font-semibold"> enterprise-grade reliability</span> and 
            <span className="text-primary font-semibold"> innovative solutions</span>.
          </p>

          {/* Professional Feature Icons */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 luxury-card rounded-xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 luxury-card rounded-xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Enterprise Secure</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 luxury-card rounded-xl flex items-center justify-center mb-4 group-hover:shadow-tech-glow transition-all duration-500 group-hover:scale-110">
                <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Always Reliable</span>
            </div>
          </div>

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <Button 
              size="lg" 
              className="premium-button text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 rounded-xl font-semibold tracking-wide"
            >
              Start Your Journey
              <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-effect border-primary/30 text-primary hover:bg-primary/10 transition-all duration-500 text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 rounded-xl font-semibold tracking-wide backdrop-blur-md hover-lift"
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