import { Wifi, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg luxury-card p-1.5">
                <img src="/lovable-uploads/b036e33e-4110-40c6-8b4e-b6fa6c3ec745.png" alt="B-Spot Technologies" className="w-full h-full object-contain" />
              </div>
              <div className="text-lg font-bold text-foreground">
                B-SPOT <span className="elegant-text font-light">TECHNOLOGIES</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
              Connecting communities with affordable and seamless internet connections through 
              enterprise-grade reliability and unmatched performance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">+254-750-444-167</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">info@bspot-tech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">Nairobi Area Coverage</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Business WiFi Solutions</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Event WiFi Services</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Network Installation</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">24/7 Technical Support</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">WiFi Optimization</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Home</a></li>
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">About Us</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Our Services</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Professional Bottom Bar */}
        <div className="border-t border-border/20 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm font-medium">
              © 2024 B-SPOT TECHNOLOGIES. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Wifi className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Connecting communities nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;