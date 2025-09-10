
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { useSecurityHeaders } from "@/hooks/useSecurityHeaders";

const Index = () => {
  useSecurityHeaders();
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
      <ChatbotWidget />
    </div>
  );
};

export default Index;
