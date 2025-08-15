
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
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-xl animate-pulse" />
      
      {/* Main head structure */}
      <div className="relative w-full h-full">
        {/* Head base - metallic panels */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-white to-slate-300 rounded-full shadow-2xl">
          {/* Electric blue accents */}
          <div className="absolute inset-1 bg-gradient-to-br from-blue-500/20 via-cyan-400/30 to-blue-600/20 rounded-full" />
          
          {/* Glowing jawline accent */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-80">
            <div className="w-full h-full bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
          </div>
          
          {/* Temple accents */}
          <div className="absolute top-4 left-2 w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70 animate-pulse" />
          <div className="absolute top-4 right-2 w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70 animate-pulse" />
        </div>

        {/* Semi-transparent headpiece with moving circuitry */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/3 bg-gradient-to-b from-blue-500/30 to-transparent rounded-t-full backdrop-blur-sm border border-cyan-400/30">
          {/* Moving circuitry patterns */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 40 20">
            <path 
              d={`M5 10 L${10 + circuitryPulse * 2} 10 L${15 + circuitryPulse} 5 L${25 + circuitryPulse} 5 L${30 + circuitryPulse * 1.5} 10 L35 10`}
              stroke="cyan" 
              strokeWidth="0.5" 
              fill="none"
              className="animate-pulse"
            />
            <circle cx={10 + circuitryPulse * 2} cy="10" r="0.5" fill="cyan" className="animate-pulse" />
            <circle cx={25 + circuitryPulse} cy="5" r="0.5" fill="blue" className="animate-pulse" />
          </svg>
        </div>

        {/* LED Eyes */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {/* Left Eye */}
          <div className="relative">
            <div className={`w-3 h-3 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 transition-all duration-150 ${getEyeIntensity()}`}>
              {/* Eye blink overlay */}
              <div className={`absolute inset-0 bg-slate-300 rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-0' : 'scale-y-100 opacity-0'}`} />
              {/* Pupil */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-80" />
            </div>
            {/* Eye glow */}
            <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full blur-sm opacity-40 animate-pulse" />
          </div>

          {/* Right Eye */}
          <div className="relative">
            <div className={`w-3 h-3 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 transition-all duration-150 ${getEyeIntensity()}`}>
              {/* Eye blink overlay */}
              <div className={`absolute inset-0 bg-slate-300 rounded-full transition-all duration-150 ${eyeBlink ? 'scale-y-0' : 'scale-y-100 opacity-0'}`} />
              {/* Pupil */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-80" />
            </div>
            {/* Eye glow */}
            <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full blur-sm opacity-40 animate-pulse" />
          </div>
        </div>

        {/* Display Panel (forehead area) */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-slate-400/30 via-cyan-400/20 to-slate-400/30 rounded-full backdrop-blur-sm border border-cyan-400/20">
          {/* Data overlay effect */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex space-x-0.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-0.5 h-0.5 bg-cyan-400 rounded-full transition-opacity duration-300 ${
                    isTyping ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mouth with natural movement */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <svg width="24" height="8" viewBox="0 0 24 8" className="transition-all duration-200">
            <path
              d={getMouthPath()}
              stroke="slate-600"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className={`transition-all duration-200 ${isSpeaking ? 'animate-pulse' : ''}`}
            />
          </svg>
          {/* Flexible material effect around mouth */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent rounded-full blur-sm" />
        </div>

        {/* Soundwave animations on cheeks when speaking */}
        {isSpeaking && (
          <>
            {/* Left cheek soundwaves */}
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
              {[0, 1, 2].map((i) => (
                <div
                  key={`left-${i}`}
                  className="absolute w-0.5 bg-cyan-400/60 rounded-full animate-pulse"
                  style={{
                    left: `${i * 2}px`,
                    height: `${4 + Math.sin(Date.now() * 0.01 + i) * 2}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* Right cheek soundwaves */}
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
              {[0, 1, 2].map((i) => (
                <div
                  key={`right-${i}`}
                  className="absolute w-0.5 bg-cyan-400/60 rounded-full animate-pulse"
                  style={{
                    right: `${i * 2}px`,
                    height: `${4 + Math.sin(Date.now() * 0.01 + i + Math.PI) * 2}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Audio visualizers near neck */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 flex space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-0.5 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full transition-all duration-150 ${
                isSpeaking ? 'animate-pulse' : 'opacity-40'
              }`}
              style={{
                height: `${2 + (isSpeaking ? Math.sin(Date.now() * 0.02 + i) * 2 : 0)}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Backlit logo on chest area */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-cyan-400/30 rounded backdrop-blur-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
            </div>
          </div>
          {/* Dynamic lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-lg animate-pulse" />
        </div>

        {/* Eyebrow sensors for emphasis */}
        {mood === 'thinking' && (
          <>
            <div className="absolute top-5 left-6 w-2 h-0.5 bg-cyan-400 rounded-full transform rotate-12 animate-pulse" />
            <div className="absolute top-5 right-6 w-2 h-0.5 bg-cyan-400 rounded-full transform -rotate-12 animate-pulse" />
          </>
        )}
      </div>

      {/* Clean futuristic interface background elements */}
      <div className="absolute -inset-4 opacity-20 pointer-events-none">
        {/* Soft glowing panels */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded blur-sm animate-pulse" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400 rounded blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500 rounded blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default ChatbotAvatar;
