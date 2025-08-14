import { useEffect, useState } from "react";

const AppLoader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img 
            src="/bspot-logo.png" 
            alt="B-SPOT Technologies" 
            className="w-24 h-24 animate-pulse"
          />
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default AppLoader;