import { Wifi, Phone, Mail, MapPin, Radio } from "lucide-react";
import VisitorCounter from "./VisitorCounter";
import { SocialLinks } from "./SocialLinks";
import { FloatingTechIcons } from "./FloatingTechIcons";
import techClimbingMast from "@/assets/tech-climbing-mast.jpg";
import techCables from "@/assets/tech-cables.jpg";
import dataCenter from "@/assets/data-center.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-t border-primary/20 overflow-hidden">
      {/* Floating Tech Icons Background */}
      <FloatingTechIcons variant="sparse" />

      {/* Animated Tech Images Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tech climbing mast */}
        <div className="absolute top-8 right-8 w-32 h-32 lg:w-48 lg:h-48 rounded-2xl overflow-hidden opacity-15 hover:opacity-30 transition-opacity duration-500">
          <img 
            src={techClimbingMast} 
            alt="Technician climbing network mast" 
            className="w-full h-full object-cover animate-[float_8s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        {/* Tech with cables */}
        <div className="absolute bottom-32 left-8 w-28 h-28 lg:w-40 lg:h-40 rounded-2xl overflow-hidden opacity-15 hover:opacity-30 transition-opacity duration-500">
          <img 
            src={techCables} 
            alt="Technician organizing network cables" 
            className="w-full h-full object-cover animate-[float_6s_ease-in-out_infinite_1s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        {/* Data center */}
        <div className="absolute top-1/2 right-1/4 w-36 h-36 lg:w-52 lg:h-52 rounded-2xl overflow-hidden opacity-10 hover:opacity-25 transition-opacity duration-500 hidden lg:block">
          <img 
            src={dataCenter} 
            alt="Modern data center" 
            className="w-full h-full object-cover animate-[float_10s_ease-in-out_infinite_2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-card p-3 sm:p-3.5 border-2 border-primary/40 shadow-xl hover:shadow-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105">
                  <img 
                    src="/bspot-logo-128.webp" 
                    alt="B-Spot Technologies Logo" 
                    width="128" 
                    height="128" 
                    loading="lazy" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  B-SPOT
                </div>
                <div className="text-sm font-medium text-primary/80 tracking-[0.15em] mt-0.5">
                  TECHNOLOGIES
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg text-sm sm:text-base">
              Kenya's premier internet solutions provider, specializing in affordable and reliable connectivity 
              for homes, businesses, schools, and communities across Nairobi, Kikuyu, Meru, and Regen.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a href="tel:+254750444167" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">+254-750-444-167</span>
              </a>
              <a href="mailto:bspottechnologies@gmail.com" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">bspottechnologies@gmail.com</span>
              </a>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">Nairobi, Kenya</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-3 text-sm">Follow Us</h4>
              <SocialLinks size="md" />
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold mb-6 text-foreground">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Home Internet",
                "Business Solutions", 
                "Market Hotspots",
                "Schools WiFi",
                "Network Installation",
                "24/7 Support"
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-bold mb-6 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "FAQ", href: "#faq" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} B-SPOT TECHNOLOGIES. All rights reserved.
              </p>
            </div>
            
            {/* Status Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Network Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">99.9% Uptime</span>
              </div>
            </div>
          </div>
          
          {/* Visitor Counter */}
          <div className="flex justify-center pt-6 mt-6 border-t border-border/30">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;