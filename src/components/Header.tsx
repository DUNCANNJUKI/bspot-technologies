import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between h-20">
          {/* Modern Logo with Animation */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl bg-white p-2.5 sm:p-3 lg:p-4 border-3 border-blue-500/60 shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:border-cyan-400/80">
                <img 
                  src="/bspot-logo-128.webp" 
                  alt="B-Spot Technologies Logo" 
                  width="128"
                  height="128"
                  fetchPriority="high"
                  className="w-full h-full object-contain filter brightness-110 contrast-125 drop-shadow-xl group-hover:brightness-125 transition-all duration-700" 
                />
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-700 animate-pulse"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-black bg-gradient-to-r from-white via-primary/90 to-secondary bg-clip-text text-transparent tracking-tight leading-none animate-pulse">
                B-SPOT
              </div>
              <div className="text-sm font-light text-primary/90 tracking-[0.2em] leading-none mt-1 group-hover:text-white transition-colors duration-500">
                TECHNOLOGIES
              </div>
            </div>
          </div>

          {/* Futuristic Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {[
              { name: 'Home', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Services', gradient: 'from-purple-500 to-pink-500' },
              { name: 'About', gradient: 'from-green-500 to-emerald-500' },
              { name: 'Contact', gradient: 'from-orange-500 to-red-500' }
            ].map((item, index) => (
              <a 
                key={item.name}
                href={`#${item.name.toLowerCase()}`} 
                className="relative px-6 py-3 text-sm font-semibold text-white transition-all duration-500 group overflow-hidden rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                
                {/* Shimmer effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 group-hover:opacity-30 blur-sm transition-all duration-500`}></div>
                
                {/* Text */}
                <span className="relative z-10 tracking-wide bg-gradient-to-r from-white to-white/80 bg-clip-text">{item.name}</span>
                
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full`}></div>
              </a>
            ))}
          </nav>

          {/* Modern CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-cyan-400/30 hover:border-cyan-300/50"
            >
              <a href="#contact" className="flex items-center space-x-2 group">
                <span className="relative z-10 tracking-wide">Get Started</span>
                <ChevronDown className="w-4 h-4 rotate-270 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[225deg]" />
                {/* Tech glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 animate-pulse"></div>
              </a>
            </Button>
          </div>

          {/* Ultra-modern Mobile Menu Button */}
          <button
            className="lg:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center group transition-all duration-300 hover:scale-105 hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-xl bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Sleek Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-6 px-2 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl rounded-2xl mt-4 border border-primary/10 shadow-2xl">
            <nav className="flex flex-col space-y-3">
              {[
                { name: 'Home', gradient: 'from-blue-500 to-cyan-500', icon: '🏠' },
                { name: 'Services', gradient: 'from-purple-500 to-pink-500', icon: '⚡' },
                { name: 'About', gradient: 'from-green-500 to-emerald-500', icon: '📋' },
                { name: 'Contact', gradient: 'from-orange-500 to-red-500', icon: '📞' }
              ].map((item, index) => (
                <a 
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`} 
                  className="relative px-6 py-4 text-white font-semibold transition-all duration-300 rounded-xl group overflow-hidden border border-white/10 hover:border-white/30 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 group-hover:opacity-25 transition-all duration-300`}></div>
                  
                  {/* Text with icon */}
                  <span className="relative z-10 tracking-wide flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {item.name}
                  </span>
                  
                  {/* Side accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${item.gradient} scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-full`}></div>
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 px-4">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/50 hover:shadow-xl transition-all duration-500 hover:scale-105 border border-cyan-400/30"
                >
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="tracking-wide">
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