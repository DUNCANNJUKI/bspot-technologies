
import { Wifi, Radio, Zap } from "lucide-react";

const AnimatedNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Network Masts */}
      <div className="absolute top-20 left-1/4 animate-float">
        <div className="relative">
          <div className="w-3 h-16 bg-primary/60 rounded-t-lg mb-2"></div>
          <div className="w-8 h-2 bg-primary/40 rounded-full mb-1"></div>
          <div className="w-6 h-1 bg-primary/30 rounded-full mx-1"></div>
          <Radio className="w-6 h-6 text-primary absolute -top-2 -left-1.5" />
          
          {/* Animated WiFi Signals */}
          <div className="absolute -top-8 -left-8">
            <div className="w-16 h-16 border-2 border-primary/30 rounded-full animate-ping"></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-2 border-primary/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-primary/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <div className="absolute top-32 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <div className="relative">
          <div className="w-3 h-16 bg-primary/60 rounded-t-lg mb-2"></div>
          <div className="w-8 h-2 bg-primary/40 rounded-full mb-1"></div>
          <div className="w-6 h-1 bg-primary/30 rounded-full mx-1"></div>
          <Radio className="w-6 h-6 text-primary absolute -top-2 -left-1.5" />
          
          {/* Animated WiFi Signals */}
          <div className="absolute -top-8 -left-8">
            <div className="w-16 h-16 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-2 border-primary/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-primary/50 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Community Buildings */}
      <div className="absolute bottom-32 left-1/6 animate-fade-in">
        <div className="relative">
          <div className="w-12 h-8 bg-muted/60 rounded-t-lg"></div>
          <div className="w-16 h-12 bg-muted/40 rounded-b-lg"></div>
          <Wifi className="w-4 h-4 text-primary absolute -top-1 left-4" />
          
          {/* Connection Signals to Community */}
          <div className="absolute -top-4 left-6">
            <div className="w-8 h-8 border border-primary/40 rounded-full animate-pulse"></div>
            <div className="absolute top-1 left-1 w-6 h-6 border border-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-2 left-2 w-4 h-4 border border-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-1/6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="relative">
          <div className="w-12 h-8 bg-muted/60 rounded-t-lg"></div>
          <div className="w-16 h-12 bg-muted/40 rounded-b-lg"></div>
          <Wifi className="w-4 h-4 text-primary absolute -top-1 left-4" />
          
          {/* Connection Signals to Community */}
          <div className="absolute -top-4 left-6">
            <div className="w-8 h-8 border border-primary/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1 left-1 w-6 h-6 border border-primary/50 rounded-full animate-pulse" style={{ animationDelay: '1.3s' }}></div>
            <div className="absolute top-2 left-2 w-4 h-4 border border-primary/60 rounded-full animate-pulse" style={{ animationDelay: '1.6s' }}></div>
          </div>
        </div>
      </div>

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(43, 96%, 56%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Connection from mast to community */}
        <path
          d="M 25% 25% Q 50% 35% 17% 70%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        
        <path
          d="M 75% 35% Q 50% 45% 83% 65%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Inter-mast connection */}
        <path
          d="M 25% 25% Q 50% 15% 75% 35%"
          stroke="url(#connectionGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>

      {/* Floating Data Packets */}
      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>

      {/* Signal Strength Indicators */}
      <div className="absolute top-1/4 left-1/2 flex space-x-1 animate-fade-in" style={{ animationDelay: '2s' }}>
        <div className="w-1 h-4 bg-primary/60 animate-pulse"></div>
        <div className="w-1 h-6 bg-primary/70 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-1 h-8 bg-primary/80 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-1 h-10 bg-primary animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>

      {/* Network Coverage Zones */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-primary/20 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-primary/20 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default AnimatedNetwork;
