import { Wifi, Phone, Mail, MapPin, Radio, Rss, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-t border-primary/20 overflow-hidden">
      {/* Animated WiFi Hotspot Signs Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* WiFi Signal 1 */}
        <div className="absolute top-10 left-10 opacity-10">
          <Wifi className="w-16 h-16 text-primary animate-[wifi-swing-1_8s_ease-in-out_infinite]" />
        </div>
        {/* WiFi Signal 2 */}
        <div className="absolute top-20 right-20 opacity-15">
          <Radio className="w-12 h-12 text-cyan-400 animate-[wifi-swing-2_6s_ease-in-out_infinite_0.5s]" />
        </div>
        {/* WiFi Signal 3 */}
        <div className="absolute bottom-32 left-1/4 opacity-8">
          <Rss className="w-20 h-20 text-blue-400 animate-[wifi-swing-3_10s_ease-in-out_infinite_1s]" />
        </div>
        {/* WiFi Signal 4 */}
        <div className="absolute top-1/2 right-10 opacity-12">
          <Wifi className="w-14 h-14 text-purple-400 animate-[wifi-swing-1_7s_ease-in-out_infinite_1.5s]" />
        </div>
        {/* WiFi Signal 5 */}
        <div className="absolute bottom-20 right-1/3 opacity-10">
          <Radio className="w-18 h-18 text-emerald-400 animate-[wifi-swing-2_9s_ease-in-out_infinite_2s]" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
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
              B-SPOT Technologies is Kenya's premier WiFi solutions provider, specializing in enterprise-grade connectivity infrastructure. 
              With 2 years of proven excellence, we deliver cutting-edge network solutions across Nairobi, Kikuyu, Meru, and Regen. 
              Our certified engineering team ensures 99.9% uptime, 24/7 technical support, and scalable solutions for businesses, 
              events, and public spaces. From small businesses to large-scale deployments, we connect communities with affordable, 
              seamless, and secure internet that powers digital transformation.
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
                  <span className="text-foreground font-semibold block">info@bspot-tech.com</span>
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
              
              {/* Social Media Links */}
              <div className="pt-4">
                <h4 className="text-foreground font-bold mb-4 text-lg">Connect With Us</h4>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.facebook.com/people/B-Spot-Technologies/61574108452350/?rdid=DTgk4hdhIKNRQlaM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17CUFWVonm%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:from-blue-600/40 group-hover:to-blue-500/30 transition-all duration-300 border border-blue-500/30">
                      <Facebook className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </a>
                  <a 
                    href="https://youtube.com/@beeent001?si=pU8Pv6dL_F2VvG6y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-red-500/10 flex items-center justify-center group-hover:scale-110 group-hover:from-red-600/40 group-hover:to-red-500/30 transition-all duration-300 border border-red-500/30">
                      <Youtube className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                  <a 
                    href="https://x.com/ent_bee?t=QUDS0XTLVz-3R1wjJO_E-w&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/20 to-slate-600/10 flex items-center justify-center group-hover:scale-110 group-hover:from-slate-700/40 group-hover:to-slate-600/30 transition-all duration-300 border border-slate-500/30">
                      <svg 
                        className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" 
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
                "Enterprise WiFi Solutions",
                "Event Connectivity Services", 
                "Network Infrastructure",
                "Smart Home Integration",
                "IoT Connectivity Solutions",
                "Cloud Network Management"
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
                { name: "Contact", href: "#contact" },
                { name: "Support Portal", href: "#support" },
                { name: "Network Status", href: "#status" }
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
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-muted-foreground font-medium mb-2">
                © 2024 B-SPOT TECHNOLOGIES. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Pioneering the future of connectivity solutions
              </p>
            </div>
            
            {/* Tech Status Indicator */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-6 py-3 rounded-full border border-emerald-500/20">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                <span className="text-sm font-medium text-emerald-400">Network Status: Online</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;