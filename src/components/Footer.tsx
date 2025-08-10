import { Wifi, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-2 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl luxury-card p-2">
                <img src="/lovable-uploads/b036e33e-4110-40c6-8b4e-b6fa6c3ec745.png" alt="B-Spot Technologies" className="w-full h-full object-contain" />
              </div>
              <div className="text-xl font-bold text-foreground">
                B-SPOT <span className="elegant-text">TECHNOLOGIES</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg max-w-md">
              Crafting premium WiFi experiences that connect communities across Kenya with 
              enterprise-grade reliability and unmatched performance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">+254-750-444-167</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">info@bspot-tech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Nairobi Area Coverage</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6 elegant-text">Premium Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Business WiFi Solutions</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Event WiFi Services</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Network Installation</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">24/7 Technical Support</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">WiFi Optimization</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-6 elegant-text">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About Us</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Our Services</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground font-medium">
              © 2024 B-SPOT TECHNOLOGIES. Crafted with excellence in Kenya.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Wifi className="w-4 h-4 text-primary" />
              <span className="font-medium">Connecting Kenya, One Network at a Time</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;