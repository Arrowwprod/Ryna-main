/**
 * LenisProvider — Initialises Lenis smooth scroll and connects it to
 * GSAP's ScrollTrigger RAF loop for perfect synchronisation.
 *
 * Drop this at the root of the app (inside main.tsx or App wrapper).
 */

import { useEffect, useRef, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Context (expose lenis instance to children if needed) ───────────────────
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

// ─── Provider ────────────────────────────────────────────────────────────────
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // OSMO expo ease
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Wire Lenis scroll events → ScrollTrigger (critical for scrub accuracy)
    lenis.on("scroll", ScrollTrigger.update);

    // Wire GSAP ticker → Lenis RAF so both share a single rAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
