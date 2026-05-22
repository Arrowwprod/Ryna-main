/**
 * Process — OSMO/Webflow-inspired cinematic timeline.
 * ─ No image panels. No numbering.
 * ─ Warm palette only (coral / sunset). No blue.
 * ─ Vertical scrub-progress line driven by GSAP ScrollTrigger.
 * ─ Each step stagger-reveals via GSAP x-slide.
 * ─ Framer Motion parallax ambient glow layer.
 * ─ GPU-accelerated transforms only (translate3d / opacity / scaleY).
 */

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import airportBgImage from "@/assets/nejc-soklic-f-vOig-sJzc-unsplash.jpg";

gsap.registerPlugin(ScrollTrigger);

// Warm palette only — coral alternates with sunset, no blue, no mint
const steps = [
  {
    t: "Initial Consultation",
    d: "We start with a deep-dive session — understanding your academic background, aspirations, budget, and preferred destinations.",
    accent: "var(--coral)",
  },
  {
    t: "Course & University Selection",
    d: "We shortlist the most suitable European universities and programmes, matched precisely to your profile and career goals.",
    accent: "var(--sunset)",
  },
  {
    t: "Application & Admission Support",
    d: "Every document, every essay, every deadline — we prepare, review and submit your applications with surgical accuracy.",
    accent: "var(--coral)",
  },
  {
    t: "Offer Letter & Confirmation",
    d: "Once offers arrive, we guide you through comparing, accepting and confirming your enrolment with confidence.",
    accent: "var(--sunset)",
  },
  {
    t: "Student Visa Guidance",
    d: "Our advisors walk you through every visa requirement, document checklist, and appointment — step by step.",
    accent: "var(--coral)",
  },
  {
    t: "Pre-Departure Support",
    d: "Cultural orientation, packing guides, airport tips, and a final check-in before you take flight.",
    accent: "var(--sunset)",
  },
  {
    t: "Post-Departure Support",
    d: "We help you settle in smoothly — from securing vetted student accommodation to airport transfers and local registration support.",
    accent: "var(--coral)",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const contrailRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // ── Framer: ambient glow parallax ───────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const airportBgY = useTransform(scrollYProgress, [0, 1], ["5%", "-12%"]);

  // ── GSAP: indicator tracker + contrail ───────────────────────────────
  useEffect(() => {
    if (!indicatorRef.current || !contrailRef.current || !timelineRef.current) return;

    const track = timelineRef.current;
    const indicator = indicatorRef.current;
    const contrail = contrailRef.current;
    const DOT_H = 32; // px (height of sleek flight SVG icon)

    // Initialise centered at top
    gsap.set(indicator, { y: -DOT_H / 2, force3D: true });
    gsap.set(contrail, { height: 0, force3D: true });

    // Single ScrollTrigger drives both indicator Y and contrail height
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top 65%",
      end: "bottom 55%",
      scrub: 0.8,
      onUpdate(self) {
        const maxY = track.offsetHeight;
        const y = self.progress * maxY;
        gsap.set(indicator, { y: y - DOT_H / 2, force3D: true });
        gsap.set(contrail, { height: y, force3D: true });
      },
    });

    // ── GSAP: stagger-reveal step cards (alternating x-slide) ───────────
    const cards = gsap.utils.toArray<HTMLElement>(".proc-card", track);
    const dots = gsap.utils.toArray<HTMLElement>(".proc-dot", track);
    const isMobile = window.innerWidth < 768;

    gsap.set(cards, { opacity: 0, x: (i) => (isMobile ? 24 : (i % 2 === 0 ? -52 : 52)), force3D: true });
    gsap.set(dots, { scale: 0, opacity: 0, force3D: true });

    cards.forEach((card, i) => {
      const dot = dots[i];
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform",
        scrollTrigger: { trigger: card, start: "top 83%", toggleActions: "play none none none" },
      });
      if (dot) {
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          force3D: true,
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-28 md:py-40 overflow-x-clip">
      {/* ── Ambient gradient layer — warm coral/sunset only ─────────────── */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: glowY, willChange: "transform" }}
        className="pointer-events-none absolute inset-x-0 -top-20 h-[140%] -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.97_0.025_80)] via-background to-background" />
        <div
          className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, var(--coral), transparent 70%)" }}
        />
        <div
          className="absolute top-2/3 left-[-10%] h-[500px] w-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, var(--sunset), transparent 70%)" }}
        />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-coral">Our Process</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            Seven steps to <span className="italic text-gradient-mint">take flight</span>.
          </h2>
          <p className="mt-5 text-sm text-foreground/55 leading-relaxed max-w-sm mx-auto">
            Every journey is different. Our process adapts to you — while keeping every milestone
            clear and stress-free.
          </p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative">
          {/* ── Track: faint static guide line ─────────────────────────── */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-foreground/10 -translate-x-1/2 animate-pulse" />

          {/* ── Contrail: warm gradient fill that grows with the indicator ───── */}
          <div
            ref={contrailRef}
            className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 origin-top pointer-events-none rounded-full"
            style={{
              width: "3px",
              height: 0,
              background:
                "linear-gradient(to bottom, transparent, var(--sunset) 30%, var(--coral))",
              opacity: 0.65,
            }}
          />

          {/* ── Sleek Minimalist Flight Scroll-Tracked Indicator ────────────────────── */}
          <div
            ref={indicatorRef}
            aria-hidden
            className="absolute left-6 md:left-1/2 top-0 z-20 pointer-events-none flex items-center justify-center text-coral"
            style={{
              width: 32,
              height: 32,
              marginLeft: -16,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full transform rotate-180 drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] text-coral"
            >
              <path d="M12 2c-.2 0-.4.1-.5.3L7.3 10.5 2 13.5v1.5l8-2 2 6-2 2v1h4v-1l-2-2 2-6 8 2v-1.5l-5.3-3L12.5 2.3c-.1-.2-.3-.3-.5-.3z" />
            </svg>
          </div>

          <div className="space-y-0">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={s.t}
                  className="relative grid md:grid-cols-2 gap-0 items-center"
                  style={{ minHeight: "200px" }}
                >
                  {/* ── Centre dot ──────────────────────────────────── */}
                  <div className="absolute left-6 md:left-1/2 top-[52px] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div
                      className="proc-dot h-4 w-4 rounded-full ring-4 ring-background shadow-lg"
                      style={{
                        background: s.accent,
                        boxShadow: `0 0 20px 4px ${s.accent}60`,
                      }}
                    />
                  </div>

                  {/* ── Content cell ─────────────────────────────────── */}
                  <div
                    className={`proc-card pl-14 pr-6 md:px-12 py-8 md:py-10 ${isLeft ? "md:text-right" : "md:order-last"}`}
                  >
                    {/* Thin accent rule — replaces numbering system */}
                    <div
                      className={`mb-4 h-0.5 w-10 rounded-full ${isLeft ? "md:ml-auto" : "ml-0"}`}
                      style={{ background: s.accent }}
                    />

                    <h3 className="font-display text-2xl md:text-3xl text-foreground leading-snug">
                      {s.t}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-xs inline-block">
                      {s.d}
                    </p>
                  </div>

                  {/* Empty cell for alternating layout */}
                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{
          y: airportBgY,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          willChange: "transform",
        }}
        className="pointer-events-none absolute inset-x-0 -bottom-[650px] h-[1100px] z-0"
      >
        {/* Layer A — airport sunset photograph */}
        <img
          src={airportBgImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 50%", opacity: 0.48 }}
        />
        {/* Layer B — warm golden-hour amber tint */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(255,150,60,0.18) 0%, rgba(255,110,40,0.10) 45%, transparent 75%)",
          }}
        />
        {/* Layer C — sunbeam radial glow */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 45% at 50% 80%, rgba(255,160,80,0.14), transparent 70%)",
          }}
        />
      </motion.div>
    </section>
  );
}
