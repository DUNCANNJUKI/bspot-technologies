import { Wifi, Phone, Mail, MapPin, Radio, Rss, Facebook, Youtube } from "lucide-react";
import VisitorCounter from "./VisitorCounter";
import techClimbingMast from "@/assets/tech-climbing-mast.jpg";
import techCables from "@/assets/tech-cables.jpg";
import dataCenter from "@/assets/data-center.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-t border-primary/20 overflow-hidden">
      {/* Animated Tech Images Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tech climbing mast */}
        <div className="absolute top-8 right-8 w-32 h-32 lg:w-48 lg:h-48 rounded-2xl overflow-hidden opacity-20 hover:opacity-40 transition-opacity duration-500">
          <img 
            src={techClimbingMast} 
            alt="Technician climbing network mast" 
            className="w-full h-full object-cover animate-[float_8s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        {/* Tech with cables */}
        <div className="absolute bottom-32 left-8 w-28 h-28 lg:w-40 lg:h-40 rounded-2xl overflow-hidden opacity-20 hover:opacity-40 transition-opacity duration-500">
          <img 
            src={techCables} 
            alt="Technician organizing network cables" 
            className="w-full h-full object-cover animate-[float_6s_ease-in-out_infinite_1s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        {/* Data center */}
        <div className="absolute top-1/2 right-1/4 w-36 h-36 lg:w-52 lg:h-52 rounded-2xl overflow-hidden opacity-15 hover:opacity-35 transition-opacity duration-500 hidden lg:block">
          <img 
            src={dataCenter} 
            alt="Modern data center" 
            className="w-full h-full object-cover animate-[float_10s_ease-in-out_infinite_2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        {/* WiFi Signal decorations */}
        <div className="absolute top-20 left-1/3 opacity-10">
          <Wifi className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <Radio className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-white p-3 sm:p-3.5 lg:p-4 border-3 border-blue-500/60 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:border-cyan-400/80">
                  <img 
                    src="/bspot-logo-128.webp" 
                    alt="B-Spot Technologies Logo" 
                    width="128" 
                    height="128" 
                    loading="lazy" 
                    className="w-full h-full object-contain filter brightness-110 contrast-125 drop-shadow-xl hover:brightness-125 transition-all duration-700" 
                  />
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-700 animate-pulse"></div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent tracking-tight leading-none">
                  B-SPOT
                </div>
                <div className="text-sm font-light text-primary/90 tracking-[0.2em] leading-none mt-1">
                  TECHNOLOGIES
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-10 leading-relaxed max-w-lg text-base">
              Bspot Technologies is Kenya's premier internet solutions provider, specializing in affordable and reliable connectivity. 
              We deliver high-quality internet for homes, businesses, schools, and communities across Nairobi, Kikuyu, Meru, and Regen. 
              Our mission is to make internet access simple, affordable, and dependable for all, empowering digital transformation 
              with seamless connectivity, excellent support, and flexible solutions tailored to your needs.
            </p>
            
            {/* Enhanced Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-primary group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <span className="text-foreground font-semibold block">+254-750-444-167</span>
                  <span className="text-muted-foreground text-sm">24/7 Support Hotline</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-blue-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-primary group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <span className="text-foreground font-semibold block">bspottechnologies@gmail.com</span>
                  <span className="text-muted-foreground text-sm">Business Inquiries</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-primary group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <span className="text-foreground font-semibold block">Nairobi, Kenya</span>
                  <span className="text-muted-foreground text-sm">Nationwide Coverage</span>
                </div>
              </div>
              
              {/* Social Media Links - Better Aligned */}
              <div className="pt-6">
                <h4 className="text-foreground font-bold mb-4 text-base sm:text-lg">Follow Us</h4>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/people/B-Spot-Technologies/61574108452350/?rdid=DTgk4hdhIKNRQlaM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17CUFWVonm%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Follow us on Facebook"
                  >
                    <div className="relative w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#1877F2]/40 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Facebook className="w-5 h-5 text-white relative z-10" fill="white" />
                    </div>
                  </a>
                  <a 
                    href="https://youtube.com/@beeent001?si=pU8Pv6dL_F2VvG6y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Subscribe on YouTube"
                  >
                    <div className="relative w-11 h-11 rounded-xl bg-[#FF0000] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FF0000]/40 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Youtube className="w-5 h-5 text-white relative z-10" fill="white" />
                    </div>
                  </a>
                  <a 
                    href="https://x.com/ent_bee?t=QUDS0XTLVz-3R1wjJO_E-w&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Follow us on X"
                  >
                    <div className="relative w-11 h-11 rounded-xl bg-[#000000] dark:bg-[#FFFFFF] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-slate-500/40 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg 
                        className="w-4 h-4 text-white dark:text-black relative z-10" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-8 text-foreground bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Our Services
            </h3>
            <ul className="space-y-4">
              {[
                "Home Internet (Hotspot & PPPoE)",
                "Business Internet Solutions", 
                "Open-Air Market Hotspots",
                "Schools & Learning Centers",
                "Network Installation",
                "24/7 Technical Support"
              ].map((service, index) => (
                <li key={service} className="group">
                  <a href="#services" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-300 font-medium group">
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-8 text-foreground bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "#home" },
                { name: "About Us", href: "#about" },
                { name: "Our Services", href: "#services" },
                { name: "FAQ", href: "#faq" },
                { name: "Contact", href: "#contact" },
                { name: "Support", href: "#contact" }
              ].map((link, index) => (
                <li key={link.name} className="group">
                  <a href={link.href} className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-300 font-medium group">
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gradient-to-r from-transparent via-primary/20 to-transparent pt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 mb-8">
            <div className="text-center lg:text-left">
              <p className="text-muted-foreground font-medium mb-2">
                © {currentYear} B-SPOT TECHNOLOGIES. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Pioneering the future of connectivity solutions
              </p>
            </div>
            
            {/* Tech Status Indicator */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-emerald-500/20">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                <span className="text-xs sm:text-sm font-medium text-emerald-400 whitespace-nowrap">Network Status: Online</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">99.9% Uptime</span>
              </div>
            </div>
          </div>
          
          {/* Visitor Counter */}
          <div className="flex justify-center pt-6 border-t border-primary/10">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;