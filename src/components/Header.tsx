import { Button } from "./ui/button";
import { Wifi, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-border/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Professional Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-elegant p-2 shadow-tech-glow border border-primary/20 group-hover:shadow-premium-shadow group-hover:scale-110 transition-all duration-500">
              <img src="./bspot-logo.png" alt="B-Spot Technologies" className="w-full h-full object-contain filter brightness-110 contrast-125" />
            </div>
            <div className="text-lg font-bold text-foreground tracking-tight">
              B-SPOT <span className="elegant-text font-light">TECHNOLOGIES</span>
            </div>
          </div>

          {/* Professional Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-2">Home</a>
            <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-2">Services</a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-2">About</a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-2">Contact</a>
          </nav>

          {/* Professional CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="premium-button rounded-lg px-6 py-2.5 font-medium tracking-wide text-sm">
              <a href="#contact">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Professional Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/10">Home</a>
                <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/10">Services</a>
                <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/10">About</a>
                <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/10">Contact</a>
                <Button asChild className="premium-button rounded-lg w-full mt-4 py-3 font-medium">
                  <a href="#contact">Get Started</a>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;