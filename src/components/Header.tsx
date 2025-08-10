import { Button } from "./ui/button";
import { Wifi, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 rounded-xl luxury-card p-2 group-hover:shadow-tech-glow transition-all duration-300">
              <img src="/lovable-uploads/b036e33e-4110-40c6-8b4e-b6fa6c3ec745.png" alt="B-Spot Technologies" className="w-full h-full object-contain" />
            </div>
            <div className="text-xl font-bold text-foreground tracking-tight">
              B-SPOT <span className="elegant-text">TECHNOLOGIES</span>
            </div>
          </div>

          {/* Elegant Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#home" className="text-foreground hover:text-primary transition-all duration-300 font-medium tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Home</a>
            <a href="#services" className="text-foreground hover:text-primary transition-all duration-300 font-medium tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Services</a>
            <a href="#about" className="text-foreground hover:text-primary transition-all duration-300 font-medium tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-all duration-300 font-medium tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Contact</a>
          </nav>

          {/* Premium CTA Button */}
          <div className="hidden md:block">
            <Button className="premium-button rounded-xl px-6 py-3 font-semibold tracking-wide">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              <Button className="bg-gradient-primary hover:shadow-tech-glow transition-all duration-300 w-full mt-4">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;