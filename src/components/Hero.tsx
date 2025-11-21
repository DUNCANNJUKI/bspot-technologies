import { Button } from "./ui/button";
import { ArrowRight, Wifi, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import networkInfrastructure from "@/assets/network-infrastructure.webp";
import kenyanFiber from "@/assets/kenyan-tech-fiber.jpg";
import kenyanClimbing from "@/assets/kenyan-tech-climbing.jpg";
import kenyanAccessPoint from "@/assets/kenyan-tech-access-point.jpg";
import AnimatedNetwork from "./AnimatedNetwork";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background Images - Kenyan Technicians */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
          style={{ 
            backgroundImage: `url(${kenyanFiber})`,
            animationDelay: '0s',
            animationDuration: '15s',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
          style={{ 
            backgroundImage: `url(${kenyanClimbing})`,
            animationDelay: '5s',
            animationDuration: '15s',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
          style={{ 
            backgroundImage: `url(${kenyanAccessPoint})`,
            animationDelay: '10s',
            animationDuration: '15s',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
        />
      </div>
      
      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-98" />
      
      {/* Animated Network Visualization */}
      <AnimatedNetwork />
      
      {/* Simplified Geometric Elements - Reduced for performance */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-primary/15 rounded-full opacity-40 hidden md:block" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-primary/20 rotate-45 opacity-30 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Technology-Empowered Main Heading */}
          <div className="mb-12 animate-scale-in matrix-effect">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tech-title leading-none tracking-tight digital-flicker">
              B-SPOT
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tech-subtitle tracking-widest">
              TECHNOLOGIES
            </h2>
          </div>
          
          {/* Professional Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed animate-slide-up font-medium" style={{ animationDelay: '0.3s' }}>
            Connecting communities with affordable and seamless internet connections through 
            <span className="text-secondary font-semibold"> enterprise-grade reliability</span> and 
            <span className="text-secondary font-semibold"> innovative solutions</span>.
          </p>

          {/* Professional Feature Icons */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col items-center group">
              <div className="w-18 h-18 sm:w-24 sm:h-24 luxury-card rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-tech-glow transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                <Zap className="w-9 h-9 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-white/90 tracking-wide">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-18 h-18 sm:w-24 sm:h-24 luxury-card rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-tech-glow transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                <Shield className="w-9 h-9 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-white/90 tracking-wide">Enterprise Secure</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-18 h-18 sm:w-24 sm:h-24 luxury-card rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-tech-glow transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                <Wifi className="w-9 h-9 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-white/90 tracking-wide">Always Reliable</span>
            </div>
          </div>

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <Button 
              asChild
              size="lg" 
              className="premium-button text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 rounded-xl font-semibold tracking-wide"
            >
              <a href="#contact">
                Start Your Journey
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
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
