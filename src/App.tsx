import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLoader from "./components/AppLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="w-full overflow-x-hidden">
        {isLoading ? (
          <AppLoader onLoadComplete={() => setIsLoading(false)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </TooltipProvider>
  );
};

export default App;
