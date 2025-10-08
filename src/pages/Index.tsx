
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load ChatbotWidget to reduce initial bundle size
const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-tech w-full overflow-x-hidden">
      <Header />
      <main className="pt-20 w-full overflow-x-hidden">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </div>
  );
};

export default Index;
