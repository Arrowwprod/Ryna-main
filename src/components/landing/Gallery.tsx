/**
 * Gallery — Cinematic slideshow with:
 * ─ Framer Motion AnimatePresence crossfade + directional slide transitions
 * ─ GSAP ScrollTrigger stagger for thumbnail strip reveal
 * ─ Framer Motion floating animation on thumbnails (staggered sinusoidal y)
 * ─ Auto-advance with live progress bar
 * ─ Keyboard navigation (←/→)
 * ─ Lazy-loaded images from src/assets/Gallery/
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Vite eager glob — loads all images from the Gallery folder as URLs
const rawModules = import.meta.glob<{ default: string }>(
  "/src/assets/Gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);
const IMAGES: string[] = Object.values(rawModules).map((m) => m.default);

const AUTO_MS = 4800;

// Slide variants — directional push crossfade
const slide: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 1.04,
    x: dir > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.32, 0, 0.08, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.97,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.48, ease: [0.32, 0, 0.08, 1] },
  }),
};

// Floating thumbnail animation — each has a unique phase offset
function floatVariant(i: number): Variants {
  return {
    animate: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 3 + (i % 3) * 0.6,
        ease: "easeInOut" as any,
        delay: i * 0.22,
      },
    },
  };
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.18)" }}
      whileTap={{ scale: 0.93 }}
      className="absolute top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        [dir === "left" ? "left" : "right"]: "1.25rem",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.button>
  );
}

export function Gallery() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = IMAGES.length;

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number, d: number) => {
    setDir(d);
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setActive((a) => (a + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDir(-1);
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  // ── Auto-advance + progress bar ─────────────────────────────────────────────
  function startCycle() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (reduce) return;

    setProgress(0);
    const step = 100 / (AUTO_MS / 60);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + step;
      });
    }, 60);

    intervalRef.current = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % total);
      setProgress(0);
    }, AUTO_MS);
  }

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, reduce]);

  // Restart on manual navigation
  const navigate = useCallback(
    (idx: number, d: number) => {
      goTo(idx, d);
      startCycle();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goTo],
  );

  // ── Keyboard ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate((active + 1) % total, 1);
      if (e.key === "ArrowLeft") navigate((active - 1 + total) % total, -1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, total, navigate]);

  // ── GSAP: thumbnail strip stagger reveal ────────────────────────────────────
  useEffect(() => {
    if (!thumbsRef.current) return;
    const thumbs = gsap.utils.toArray<HTMLElement>(".gal-thumb", thumbsRef.current);
    gsap.set(thumbs, { opacity: 0, y: 32, scale: 0.88 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: thumbsRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
    tl.to(thumbs, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.06,
      force3D: true,
    });

    return () => {
      tl.kill();
    };
  }, []);

  // ── Auto-scroll active thumb into view ──────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById(`gal-thumb-${active}`);
    const container = thumbsRef.current;
    if (el && container) {
      const containerWidth = container.clientWidth;
      const elLeft = el.offsetLeft;
      const elWidth = el.clientWidth;
      const targetScroll = elLeft - containerWidth / 2 + elWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, [active]);

  if (total === 0) {
    return (
      <section id="gallery" className="py-24 text-center text-foreground/40">
        <p>
          Add images to <code>src/assets/Gallery/</code> to populate the gallery.
        </p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.985 0.012 80) 0%, oklch(0.955 0.028 62) 50%, oklch(0.985 0.012 80) 100%)",
      }}
    >
      {/* Ambient vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(220,130,60,0.09), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-coral">Our Gallery</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-foreground leading-tight">
              Moments that define{" "}
              <span className="italic" style={{ color: "oklch(0.75 0.14 55)" }}>
                the journey
              </span>
              .
            </h2>
          </div>
          {/* Slide counter */}
          <span className="hidden sm:block font-display text-5xl tabular-nums text-foreground/20 leading-none select-none">
            {String(active + 1).padStart(2, "0")}
            <span className="text-2xl"> / {String(total).padStart(2, "0")}</span>
          </span>
        </motion.div>

        {/* ── Main Stage ───────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "16/9",
            maxHeight: "70vh",
            boxShadow: "0 16px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.img
              key={active}
              src={IMAGES[active]}
              alt={`Gallery photo ${active + 1}`}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover select-none"
            />
          </AnimatePresence>

          {/* Dark edge vignette on main image */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* Arrows */}
          <ArrowBtn dir="left" onClick={() => navigate((active - 1 + total) % total, -1)} />
          <ArrowBtn dir="right" onClick={() => navigate((active + 1) % total, 1)} />

          {/* Progress bar */}
          {!reduce && (
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10 z-20">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, oklch(0.72 0.18 30), oklch(0.78 0.16 50))",
                }}
              />
            </div>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i, i > active ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === active ? "1.75rem" : "0.4rem",
                  height: "0.4rem",
                  borderRadius: "9999px",
                  background: i === active ? "oklch(0.72 0.18 30)" : "rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Floating Thumbnail Strip ──────────────────────────────────────── */}
        <div
          ref={thumbsRef}
          className="mt-6 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {IMAGES.map((src, i) => (
            <motion.button
              id={`gal-thumb-${i}`}
              key={i}
              className="gal-thumb shrink-0 snap-start relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => navigate(i, i > active ? 1 : -1)}
              variants={floatVariant(i)}
              animate={reduce ? undefined : "animate"}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: "6rem",
                height: "4.5rem",
                outline: i === active ? "2.5px solid oklch(0.78 0.16 50)" : "2px solid transparent",
                boxShadow:
                  i === active
                    ? "0 0 0 4px rgba(220,140,60,0.25), 0 8px 24px rgba(0,0,0,0.18)"
                    : "0 4px 12px rgba(0,0,0,0.12)",
                transition: "outline 0.25s, box-shadow 0.25s",
              }}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: i === active ? 1 : 0.55, transition: "opacity 0.3s" }}
              />
              {/* Active shimmer overlay */}
              {i === active && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), transparent)",
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
