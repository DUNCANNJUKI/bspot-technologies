import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetchCount = async () => {
      try {
        // Call the function to increment visitor count
        const { data, error } = await supabase.rpc('increment_visitor_count');
        
        if (error) {
          console.error("Error incrementing visitor count:", error);
          // Fallback: just fetch the current count
          const { data: visitors } = await supabase
            .from('site_visitors')
            .select('count')
            .single();
          
          if (visitors) {
            setCount(visitors.count);
          }
        } else {
          setCount(data);
        }
      } catch (err) {
        console.error("Error with visitor counter:", err);
      } finally {
        setIsLoading(false);
      }
    };

    incrementAndFetchCount();
  }, []);

  // Animate the counter
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = count / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= count) {
          setDisplayCount(count);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [count]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-full border border-primary/20 backdrop-blur-sm">
      <Users className="w-5 h-5 text-primary animate-pulse" />
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground font-medium">Site Visitors</span>
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {displayCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
