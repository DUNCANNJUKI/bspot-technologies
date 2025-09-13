
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
  const [circuitryPulse, setCircuitryPulse] = useState(0);

  // Eye blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Circuitry pulse animation
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setCircuitryPulse(prev => (prev + 1) % 4);
    }, 800);

    return () => clearInterval(pulseInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const getEyeIntensity = () => {
    switch (mood) {
      case 'happy': return 'brightness-125 saturate-150';
      case 'thinking': return 'brightness-75 hue-rotate-45';
      case 'error': return 'brightness-110 hue-rotate-180';
      default: return 'brightness-100';
    }
  };

  const getMouthPath = () => {
    if (isSpeaking) {
      return "M8 12 C10 14, 14 14, 16 12 C14 13, 10 13, 8 12"; // Speaking mouth
    }
    switch (mood) {
      case 'happy': return "M8 11 Q12 15 16 11"; // Smile
      case 'error': return "M8 13 Q12 9 16 13"; // Frown
      default: return "M8 12 L16 12"; // Neutral
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto flex items-center justify-center`}>
      {/* Outer holographic circle with animated border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 p-0.5 shadow-2xl">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-400/30">
          {/* Animated scanning ring */}
          <div className="absolute inset-1 rounded-full border-2 border-cyan-400/40 animate-pulse">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          
          {/* Inner robotic head container - perfectly centered */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-inner flex items-center justify-center">
            {/* Robotic face structure */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-full shadow-lg border border-slate-300">
              
              {/* Metallic panel lines */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
              
              {/* Circuit pattern forehead */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-slate-800/10 rounded-full border border-cyan-400/30">
                <svg className="w-full h-full" viewBox="0 0 40 12">
                  <path d="M2 6 L10 6 L15 3 L25 3 L30 6 L38 6" stroke="rgb(34 211 238)" strokeWidth="0.5" fill="none" className="animate-pulse" />
                  <circle cx="10" cy="6" r="0.5" fill="rgb(34 211 238)" className="animate-ping" />
                  <circle cx="30" cy="6" r="0.5" fill="rgb(59 130 246)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                </svg>
              </div>
              
              {/* LED Eyes with more robotic design */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {/* Left Eye */}
                <div className="relative">
                  <div className="w-4 h-4 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full transition-all duration-150 ${getEyeIntensity()}`}>
                      <div className={`absolute inset-0 bg-slate-800 rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-100' : 'scale-y-0'}`} />
                      <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-90" />
                    </div>
                  </div>
                  <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full blur-sm opacity-30 animate-pulse" />
                </div>
                
                {/* Right Eye */}
                <div className="relative">
                  <div className="w-4 h-4 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full transition-all duration-150 ${getEyeIntensity()}`}>
                      <div className={`absolute inset-0 bg-slate-800 rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-100' : 'scale-y-0'}`} />
                      <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-90" />
                    </div>
                  </div>
                  <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full blur-sm opacity-30 animate-pulse" />
                </div>
              </div>
              
              {/* Status indicator (forehead) */}
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-slate-800/20 rounded-full border border-cyan-400/20 flex items-center justify-center">
                <div className="flex space-x-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-0.5 h-0.5 bg-cyan-400 rounded-full transition-opacity duration-300 ${
                        isTyping ? 'animate-pulse' : 'opacity-40'
                      }`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Robotic mouth with speaker grille */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center">
                <div className="flex space-x-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
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
              
              {/* Neck connector */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b border-x border-slate-400">
                <div className="absolute inset-0.5 bg-gradient-to-b from-cyan-400/20 to-blue-500/20 rounded-b" />
              </div>
              
              {/* Temple sensors */}
              <div className="absolute top-3 left-1 w-1 h-2 bg-slate-800 rounded-full border border-cyan-400/50">
                <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60" />
              </div>
              <div className="absolute top-3 right-1 w-1 h-2 bg-slate-800 rounded-full border border-cyan-400/50">
                <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60" />
              </div>
              
              {/* Mood-based features */}
              {mood === 'thinking' && (
                <>
                  <div className="absolute top-2 left-2 w-1.5 h-0.5 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute top-2 right-2 w-1.5 h-0.5 bg-yellow-400 rounded-full animate-pulse" />
                </>
              )}
              
              {isSpeaking && (
                <>
                  {/* Sound waves */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={`left-wave-${i}`}
                        className="absolute w-0.5 bg-cyan-400/40 rounded-full animate-pulse"
                        style={{
                          left: `${i * 1.5}px`,
                          height: `${2 + Math.sin(Date.now() * 0.02 + i) * 1}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={`right-wave-${i}`}
                        className="absolute w-0.5 bg-cyan-400/40 rounded-full animate-pulse"
                        style={{
                          right: `${i * 1.5}px`,
                          height: `${2 + Math.sin(Date.now() * 0.02 + i + Math.PI) * 1}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Orbital data points */}
          <div className="absolute inset-0 rounded-full">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.sin((Date.now() * 0.001) + (i * Math.PI / 2)) * 30}%`,
                  left: `${50 + Math.cos((Date.now() * 0.001) + (i * Math.PI / 2)) * 40}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background tech pattern */}
      <div className="absolute -inset-2 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full border border-dashed border-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
      </div>
    </div>
  );
};

export default ChatbotAvatar;
