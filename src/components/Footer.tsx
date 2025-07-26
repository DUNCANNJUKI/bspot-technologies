import { Wifi, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/bspot-logo.png" alt="B-Spot Technologies" className="w-12 h-12" />
              <div className="text-xl font-bold text-foreground">
                B-SPOT <span className="text-primary">TECHNOLOGIES</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Professional WiFi hotspot solutions for businesses, events, and communities. 
              Fast, reliable, and secure internet connectivity you can trust.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+254-750-444-167</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@bspot-tech.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Serving Metro Areas Nationwide</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Services</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Business WiFi</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Event WiFi</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Public Hotspots</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Network Installation</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">24/7 Support</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Optimization</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 B-SPOT TECHNOLOGIES. All rights reserved. | Professional WiFi Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;