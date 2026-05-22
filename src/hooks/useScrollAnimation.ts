/**
 * useScrollAnimation — Reusable GSAP + ScrollTrigger animation utilities.
 * All transforms are GPU-accelerated (translate3d / opacity only).
 * Import individual helpers as needed in components.
 */

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StaggerRevealOptions {
  /** Selector relative to the container ref */
  targets: string;
  delay?: number;
  stagger?: number;
  yFrom?: number;
  opacityFrom?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

export interface ParallaxOptions {
  yPercent?: number;
  ease?: string;
  start?: string;
  end?: string;
}

export interface ScrubLineOptions {
  /** Selector for the line element */
  lineSelector: string;
  start?: string;
  end?: string;
}

// ─── Hook: Stagger Reveal on Scroll ───────────────────────────────────────────

export function useStaggerReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: StaggerRevealOptions,
) {
  const {
    targets,
    delay = 0,
    stagger = 0.08,
    yFrom = 48,
    opacityFrom = 0,
    duration = 0.75,
    ease = "power3.out",
    start = "top 82%",
    once = true,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const items = gsap.utils.toArray<HTMLElement>(targets, el);
    if (!items.length) return;

    gsap.set(items, { opacity: opacityFrom, y: yFrom, force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      delay,
      force3D: true,
      clearProps: "transform",
    });

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Hook: Parallax Layer ─────────────────────────────────────────────────────

export function useParallaxLayer<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ParallaxOptions = {},
) {
  const { yPercent = -20, ease = "none", start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      yPercent,
      ease,
      force3D: true,
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: true,
      },
    });
    return () => {
      tween.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Hook: Scrub Progress Line (for timeline-style sections) ─────────────────

export function useScrubLine<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: ScrubLineOptions,
) {
  const { lineSelector, start = "top center", end = "bottom center" } = options;

  useEffect(() => {
    if (!containerRef.current) return;
    const line = containerRef.current.querySelector<HTMLElement>(lineSelector);
    if (!line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top center", force3D: true });

    const tween = gsap.to(line, {
      scaleY: 1,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start,
        end,
        scrub: 0.6,
      },
    });

    return () => {
      tween.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Hook: Horizontal marquee-style scrub ────────────────────────────────────

export function useScrubX<T extends HTMLElement>(ref: RefObject<T | null>, xPercent = -30) {
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      xPercent,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Helper: register ScrollTrigger with Lenis RAF ───────────────────────────
// Call once at app root after Lenis is initialised.

export function connectLenisToScrollTrigger(lenis: {
  on: (event: string, cb: (e: { actualScroll: number }) => void) => void;
}) {
  lenis.on("scroll", (e: { actualScroll: number }) => {
    ScrollTrigger.update();
    void e;
  });
  gsap.ticker.add((time) => {
    void time;
  });
  gsap.ticker.lagSmoothing(0);
}
