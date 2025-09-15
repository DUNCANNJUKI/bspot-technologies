import React, { useState, useEffect } from 'react';

interface ChatbotAvatarProps {
  isTyping?: boolean;
  isSpeaking?: boolean;
  mood?: 'neutral' | 'happy' | 'thinking' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const ChatbotAvatar: React.FC<ChatbotAvatarProps> = ({
  isTyping = false,
  isSpeaking = false,
  mood = 'neutral',
  size = 'md'
}) => {
  const [eyeBlink, setEyeBlink] = useState(false);
  const [wingFlap, setWingFlap] = useState(0);
  const [antennaeGlow, setAntennaeGlow] = useState(false);
  const [buzzParticles, setBuzzParticles] = useState(0);

  // Eye blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Wing flapping animation - faster when typing/active
  useEffect(() => {
    const wingInterval = setInterval(() => {
      setWingFlap(prev => (prev + 1) % 4);
    }, isTyping || isSpeaking ? 150 : 400);

    return () => clearInterval(wingInterval);
  }, [isTyping, isSpeaking]);

  // Antennae sensor glow
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setAntennaeGlow(prev => !prev);
    }, 1500);

    return () => clearInterval(glowInterval);
  }, []);

  // Buzzing particles
  useEffect(() => {
    const buzzInterval = setInterval(() => {
      setBuzzParticles(prev => (prev + 1) % 8);
    }, 200);

    return () => clearInterval(buzzInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const getEyeIntensity = () => {
    switch (mood) {
      case 'happy': return 'brightness-125 saturate-150 scale-110';
      case 'thinking': return 'brightness-90 hue-rotate-15';
      case 'error': return 'brightness-110 hue-rotate-45 animate-bounce';
      default: return 'brightness-100';
    }
  };

  const getWingRotation = () => {
    const baseRotation = wingFlap % 2 === 0 ? 'rotate-12' : 'rotate-45';
    const intensity = isTyping || isSpeaking ? 'scale-110' : 'scale-100';
    return `${baseRotation} ${intensity}`;
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto flex items-center justify-center`}>
      {/* Buzzing particle field */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping"
            style={{
              top: `${20 + Math.sin((buzzParticles * 0.5) + (i * Math.PI / 3)) * 40}%`,
              left: `${30 + Math.cos((buzzParticles * 0.5) + (i * Math.PI / 3)) * 50}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.6 + Math.sin(buzzParticles + i) * 0.3
            }}
          />
        ))}
      </div>

      {/* Wings */}
      <div className="absolute inset-0 overflow-visible">
        {/* Left wing */}
        <div 
          className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 transition-all duration-200 ${getWingRotation()}`}
          style={{ transformOrigin: 'right center' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-200/50 via-blue-300/40 to-transparent rounded-full border border-cyan-300/60 backdrop-blur-sm shadow-lg">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            {/* Wing veins */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 24">
              <path d="M3 4 Q8 8 13 4 M3 8 Q8 12 13 8 M3 12 Q8 16 13 12 M3 16 Q8 20 13 16" 
                    stroke="cyan" strokeWidth="0.4" fill="none" opacity="0.7" />
              <circle cx="8" cy="6" r="0.5" fill="white" opacity="0.8" />
              <circle cx="8" cy="12" r="0.5" fill="white" opacity="0.8" />
              <circle cx="8" cy="18" r="0.5" fill="white" opacity="0.8" />
            </svg>
          </div>
        </div>
        
        {/* Right wing */}
        <div 
          className={`absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 transition-all duration-200 ${getWingRotation().replace('rotate-12', '-rotate-12').replace('rotate-45', '-rotate-45')}`}
          style={{ transformOrigin: 'left center' }}
        >
          <div className="w-full h-full bg-gradient-to-bl from-cyan-200/50 via-blue-300/40 to-transparent rounded-full border border-cyan-300/60 backdrop-blur-sm shadow-lg">
            <div className="absolute inset-1 rounded-full bg-gradient-to-bl from-white/30 to-transparent"></div>
            {/* Wing veins */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 24">
              <path d="M3 4 Q8 8 13 4 M3 8 Q8 12 13 8 M3 12 Q8 16 13 12 M3 16 Q8 20 13 16" 
                    stroke="cyan" strokeWidth="0.4" fill="none" opacity="0.7" />
              <circle cx="8" cy="6" r="0.5" fill="white" opacity="0.8" />
              <circle cx="8" cy="12" r="0.5" fill="white" opacity="0.8" />
              <circle cx="8" cy="18" r="0.5" fill="white" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Antennae */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <div className="w-0.5 h-4 bg-gradient-to-t from-amber-600 via-yellow-500 to-yellow-400 rounded-full relative">
          <div className={`absolute -top-1 -left-0.5 w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-lg ${
            antennaeGlow ? 'bg-cyan-400 shadow-cyan-400 animate-pulse' : 'bg-yellow-400'
          }`}>
            <div className="absolute inset-0.5 rounded-full bg-white/50"></div>
            {/* Sensor ring */}
            <div className="absolute -inset-0.5 rounded-full border border-cyan-300/40 animate-spin" style={{animationDuration: '3s'}}></div>
          </div>
        </div>
        <div className="w-0.5 h-4 bg-gradient-to-t from-amber-600 via-yellow-500 to-yellow-400 rounded-full relative">
          <div className={`absolute -top-1 -left-0.5 w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-lg ${
            antennaeGlow ? 'bg-cyan-400 shadow-cyan-400 animate-pulse' : 'bg-yellow-400'
          }`}>
            <div className="absolute inset-0.5 rounded-full bg-white/50"></div>
            {/* Sensor ring */}
            <div className="absolute -inset-0.5 rounded-full border border-cyan-300/40 animate-spin" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Main bee body */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 border-2 border-amber-600/60 shadow-xl overflow-hidden">
        {/* Black stripes */}
        <div className="absolute inset-0">
          <div className="absolute top-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-800 via-black to-slate-800 opacity-90 rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-black to-slate-800 opacity-90 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-800 via-black to-slate-800 opacity-90 rounded-full"></div>
        </div>
        
        {/* Honeycomb circuit pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 48 48">
            <defs>
              <pattern id="honeycomb" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <polygon points="4,0 7,2 7,6 4,8 1,6 1,2" stroke="#fbbf24" strokeWidth="0.3" fill="none" />
              </pattern>
            </defs>
            <rect width="48" height="48" fill="url(#honeycomb)" />
          </svg>
        </div>
        
        {/* Metallic sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full"></div>
        
        {/* Robotic head features */}
        <div className="absolute inset-1 rounded-full flex items-center justify-center">          
          {/* Compound eyes */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            <div className={`w-3 h-3 rounded-full bg-gradient-radial from-emerald-300 via-green-400 to-emerald-600 shadow-lg transition-all duration-200 border border-emerald-700/50 ${getEyeIntensity()}`}>
              <div className={`absolute inset-0 bg-black rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-100' : 'scale-y-0'}`} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
              {/* Hexagonal compound pattern */}
              <div className="absolute inset-0.5 rounded-full opacity-70">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <defs>
                    <pattern id="compound-eye" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                      <polygon points="2,0 3.5,1 3.5,3 2,4 0.5,3 0.5,1" stroke="white" strokeWidth="0.2" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="24" height="24" fill="url(#compound-eye)" />
                </svg>
              </div>
              {/* Eye glow */}
              <div className="absolute inset-0 rounded-full bg-emerald-400 blur-sm opacity-40 animate-pulse"></div>
            </div>
            
            <div className={`w-3 h-3 rounded-full bg-gradient-radial from-emerald-300 via-green-400 to-emerald-600 shadow-lg transition-all duration-200 border border-emerald-700/50 ${getEyeIntensity()}`}>
              <div className={`absolute inset-0 bg-black rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-100' : 'scale-y-0'}`} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
              {/* Hexagonal compound pattern */}
              <div className="absolute inset-0.5 rounded-full opacity-70">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <rect width="24" height="24" fill="url(#compound-eye)" />
                </svg>
              </div>
              {/* Eye glow */}
              <div className="absolute inset-0 rounded-full bg-emerald-400 blur-sm opacity-40 animate-pulse"></div>
            </div>
          </div>
          
          {/* Central sensor nose */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full animate-pulse shadow-lg border border-red-500">
            <div className="absolute inset-0 bg-red-400 rounded-full blur-sm opacity-60"></div>
          </div>
          
          {/* Robotic mandibles/mouth */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-1.5 bg-slate-800 rounded border border-slate-600 flex items-center justify-center overflow-hidden">
              <div className="flex space-x-0.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-200 ${
                      isSpeaking ? 'animate-pulse' : 'opacity-60'
                    }`}
                    style={{
                      height: `${2 + (isSpeaking ? Math.sin(Date.now() * 0.02 + i) * 1 : 0)}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Mandibles */}
            <div className="absolute -top-0.5 -left-1 w-1 h-1 bg-slate-700 transform rotate-45 rounded-sm border border-slate-600"></div>
            <div className="absolute -top-0.5 -right-1 w-1 h-1 bg-slate-700 transform -rotate-45 rounded-sm border border-slate-600"></div>
          </div>
        </div>
        
        {/* Status LEDs */}
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
          <div className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 shadow-sm ${
            mood === 'happy' ? 'bg-green-400 animate-pulse' : 
            mood === 'thinking' ? 'bg-blue-400 animate-pulse' : 
            mood === 'error' ? 'bg-red-400 animate-bounce' : 
            'bg-yellow-400'
          }`}></div>
          <div className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 shadow-sm ${
            isTyping ? 'bg-cyan-400 animate-pulse' : 'bg-amber-600'
          }`}></div>
          <div className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 shadow-sm ${
            isSpeaking ? 'bg-purple-400 animate-pulse' : 'bg-amber-600'
          }`}></div>
        </div>
        
        {/* Tech panel accents */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-80"></div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-1.5 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full opacity-60"></div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-0.5 h-1.5 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full opacity-60"></div>
      </div>
      
      {/* Holographic aura */}
      <div className="absolute -inset-1 rounded-full bg-gradient-radial from-yellow-400/30 via-amber-500/20 to-transparent animate-pulse border border-yellow-400/40 pointer-events-none"></div>
    </div>
  );
};

export default ChatbotAvatar;