import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import airplane from "@/assets/airplane.png";

const SKY =
  "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2000&q=70";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Single sky parallax — slow drift upward as user scrolls
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Plane takeoff: rise + tilt + drift right
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const planeX = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const planeRot = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const planeScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  // Headline gentle parallax
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-[110vh] w-full overflow-hidden">
      {/* Single sky background — GPU-accelerated parallax */}
      <motion.div
        aria-hidden
        style={
          reduce
            ? undefined
            : {
                y: skyY,
                scale: skyScale,
                willChange: "transform",
                backgroundImage: `url(${SKY})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
        }
        className="absolute inset-0 -top-[10%] h-[130%]"
      />

      {/* Warm sky tint overlay (cheap, no extra image) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-hero opacity-55 mix-blend-soft-light"
      />

      {/* Soft sun glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-[600px] w-[600px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, var(--sunset), transparent 60%)" }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-44 pb-32 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-foreground/75"
        >
          <Plane size={12} className="text-coral" />
          Ryna International — Europe Education
        </motion.span>

        <motion.h1
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity, willChange: "transform" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-6 font-display text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] font-semibold leading-[1.05] sm:leading-[0.98] tracking-tight max-w-5xl text-foreground"
        >
          Your Runway to <span className="italic text-gradient-mint">Success</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-7 max-w-xl text-base sm:text-lg text-foreground/75 px-2 sm:px-0"
        >
          Ethical, transparent guidance for students charting their academic journey across Europe —
          from first counselling to landing day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 px-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-7 py-3.5 text-sm font-semibold text-foreground shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
          >
            Contact Us
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium text-foreground hover:bg-cream transition"
          >
            Discover Ryna
          </a>
        </motion.div>
      </div>

      {/* Parallax plane */}
      <motion.img
        src={airplane}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        style={
          reduce
            ? undefined
            : { y: planeY, x: planeX, rotate: planeRot, scale: planeScale, willChange: "transform" }
        }
        className="pointer-events-none select-none absolute z-30 left-[6%] sm:left-[10%] bottom-[22%] sm:bottom-[28%] w-[76%] xs:w-[66%] sm:w-[48%] md:w-[36%] max-w-[640px] drop-shadow-[0_30px_40px_rgba(20,30,80,0.35)]"
      />

      {/* Soft fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
