import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Clock, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || "home";
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id], main > div:first-child');
    sections.forEach((section, index) => {
      if (!section.id && index === 0) {
        section.id = "home";
      }
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-background/80 via-background/70 to-background/80 border-b border-primary/10 shadow-2xl overflow-hidden">
      {/* Animated Background Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <img 
          src="/bspot-bg-logo-512.webp" 
          alt="" 
          width="512"
          height="512"
          loading="lazy"
          className="w-96 h-96 object-contain animate-[swing_6s_ease-in-out_infinite]" 
        />
      </div>
      {/* Modern accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Modern Logo with Animation */}
          <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-white p-1.5 sm:p-2 border-2 border-primary/40 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/60">
                <img 
                  src="/bspot-logo-128.webp" 
                  alt="B-Spot Technologies Logo" 
                  width="128"
                  height="128"
                  className="w-full h-full object-contain filter brightness-110 contrast-125 drop-shadow-md group-hover:brightness-125 transition-all duration-500" 
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent tracking-tight leading-none">
                B-SPOT
              </div>
              <div className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-foreground/70 tracking-[0.15em] leading-none mt-0.5">
                TECHNOLOGIES
              </div>
            </div>
          </div>

          {/* Futuristic Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {[
              { name: 'Home', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Services', gradient: 'from-purple-500 to-pink-500' },
              { name: 'About', gradient: 'from-green-500 to-emerald-500' },
              { name: 'FAQ', gradient: 'from-yellow-500 to-orange-500' },
              { name: 'Contact', gradient: 'from-orange-500 to-red-500' }
            ].map((item, index) => {
              const isActive = activeSection === item.name.toLowerCase();
              return (
                <a 
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`} 
                  className={`relative px-4 xl:px-5 py-2 text-sm font-semibold text-foreground transition-all duration-300 group overflow-hidden rounded-lg border hover:scale-105 ${
                    isActive 
                      ? 'border-primary/40 bg-primary/10' 
                      : 'border-transparent hover:border-primary/20 hover:bg-primary/5'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} transition-all duration-300 ${
                    isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
                  }`}></div>
                  
                  {/* Text */}
                  <span className="relative z-10 tracking-wide">{item.name}</span>
                  
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${item.gradient} transition-transform duration-300 origin-center rounded-full ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </a>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Digital Clock - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground/80 tracking-wider font-mono">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </span>
            </div>

            {/* Theme Toggle - Hidden on small screens */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex w-9 h-9 lg:w-10 lg:h-10 items-center justify-center rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-foreground absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-foreground absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </button>

            {/* CTA Button - Desktop only */}
            <Button 
              asChild 
              className="hidden lg:flex bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <a href="#contact" className="flex items-center space-x-1.5">
                <span>Get Started</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group transition-all duration-300 hover:bg-primary/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 text-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 text-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 px-2 bg-background/95 backdrop-blur-xl rounded-xl mt-2 border border-primary/10 shadow-lg">
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'Home', gradient: 'from-blue-500 to-cyan-500' },
                { name: 'Services', gradient: 'from-purple-500 to-pink-500' },
                { name: 'About', gradient: 'from-green-500 to-emerald-500' },
                { name: 'FAQ', gradient: 'from-yellow-500 to-orange-500' },
                { name: 'Contact', gradient: 'from-orange-500 to-red-500' }
              ].map((item) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <a 
                    key={item.name}
                    href={`#${item.name.toLowerCase()}`} 
                    className={`relative px-4 py-3 text-foreground font-medium transition-all duration-200 rounded-lg ${
                      isActive 
                        ? 'bg-primary/10' 
                        : 'hover:bg-primary/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-lg transition-opacity duration-200 ${
                      isActive ? 'opacity-10' : 'opacity-0'
                    }`}></div>
                    <span className="relative z-10">{item.name}</span>
                  </a>
                );
              })}
              
              {/* Mobile CTA */}
              <div className="pt-3 px-2">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold py-3 rounded-lg"
                >
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;