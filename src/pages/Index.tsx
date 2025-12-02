
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSkeleton from "@/components/ServicesSkeleton";
import { AnimatedSection } from "@/components/AnimatedSection";

// Lazy load components to reduce initial bundle size and improve performance
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans w-full overflow-x-hidden">
      <Header />
      <main className="pt-20 w-full overflow-x-hidden">
        <Hero />
        <Suspense fallback={<ServicesSkeleton />}>
          <AnimatedSection id="services">
            <Services />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
          <AnimatedSection id="about">
            <About />
          </AnimatedSection>
          <AnimatedSection id="faq">
            <FAQ />
          </AnimatedSection>
          <AnimatedSection id="contact">
            <Contact />
          </AnimatedSection>
          <Footer />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </div>
  );
};

export default Index;
