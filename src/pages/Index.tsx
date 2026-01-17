import { lazy, Suspense, useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSkeleton from "@/components/ServicesSkeleton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { NetworkDecor } from "@/components/NetworkDecor";
import { ParticleGrid } from "@/components/ParticleGrid";
import PageSkeleton from "@/components/PageSkeleton";

// Lazy load components to reduce initial bundle size and improve performance
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const AdvertiseSection = lazy(() => import("@/components/AdvertiseSection"));
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
    <div className="min-h-screen bg-background font-sans w-full overflow-x-hidden relative">
      {/* Particle grid background effect (TEMP DISABLED FOR DEBUG) */}
      {/* <ParticleGrid /> */}
      {/* Floating network equipment background (TEMP DISABLED FOR DEBUG) */}
      {/* <NetworkDecor /> */}
      <Header />
      <main className="pt-20 w-full overflow-x-hidden relative z-10">
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
          <AnimatedSection id="advertise">
            <AdvertiseSection />
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
