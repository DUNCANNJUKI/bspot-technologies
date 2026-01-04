
import { lazy, Suspense, useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSkeleton from "@/components/ServicesSkeleton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { NetworkDecor } from "@/components/NetworkDecor";
import PageSkeleton from "@/components/PageSkeleton";

// Lazy load components to reduce initial bundle size and improve performance
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show skeleton for initial load
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageSkeleton />;
  }
  return (
    <div className="min-h-screen bg-background font-sans w-full overflow-x-hidden">
      <Header />
      {/* Network equipment decorations on sides */}
      <NetworkDecor position="both" showAd={true} />
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
          <AnimatedSection id="testimonials">
            <Testimonials />
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
