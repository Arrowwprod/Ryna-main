import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useLenis } from "@/components/LenisProvider";
import { Preloader } from "@/components/landing/Preloader";
import { Navbar } from "@/components/landing/Navbar";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Countries } from "@/components/landing/Countries";
import { Process } from "@/components/landing/Process";
import { Nations } from "@/components/landing/Nations";
import { Team } from "@/components/landing/Team";
import { Gallery } from "@/components/landing/Gallery";
import { Contact } from "@/components/landing/Contact";
import { Reviews } from "@/components/landing/Reviews";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const lenis = useLenis();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, lenis]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <main className="relative bg-background text-foreground overflow-x-clip">
      <Navbar />
      <FloatingCTA />
      <Toaster position="top-center" richColors />
      <Hero />
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-24 h-24 bg-gradient-to-b from-transparent to-[oklch(0.985_0.012_80)]"
      />
      <About />
      {/* About → Services bleed: tall gradient ending in transparent lets the mountain show through */}
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-24 h-48 bg-gradient-to-b from-[oklch(0.985_0.012_80)] via-[oklch(0.985_0.012_80/0.6)] to-transparent"
      />
      <Services />
      {/* Services → Countries bleed: mirrors About→Services technique */}
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-24 h-48 bg-gradient-to-b from-[oklch(0.985_0.012_80/0.0)] via-[oklch(0.985_0.012_80/0.5)] to-[oklch(0.985_0.012_80)]"
      />
      <Countries />
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-20 h-20 bg-gradient-to-b from-[oklch(0.985_0.012_80)] to-[oklch(0.97_0.025_80)]"
      />
      <Process />
      <Nations />
      {/* Nations → Team bleed: gradient fade transition for continuous background image */}
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-24 h-48 bg-gradient-to-b from-[oklch(0.985_0.012_80/0.0)] via-[oklch(0.985_0.012_80/0.5)] to-[oklch(0.985_0.012_80)]"
      />
      <Team />
      <Gallery />
      <div
        aria-hidden
        className="pointer-events-none relative z-10 -mt-20 h-20 bg-gradient-to-b from-[oklch(0.985_0.012_80)] to-[oklch(0.985_0.012_80)]"
      />
      <div className="relative">
        <Contact />
        <Reviews />
        <Footer />
      </div>
    </main>
    </>
  );
}
