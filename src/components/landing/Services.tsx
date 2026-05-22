import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    n: "01",
    t: "Personalized Academic Counseling",
    d: "One-on-one sessions mapping your strengths to the right programme.",
    accent: "var(--coral)",
  },
  {
    n: "02",
    t: "Country & University Selection",
    d: "Shortlist best-fit institutions across 17 European destinations.",
    accent: "var(--sunset)",
  },
  {
    n: "03",
    t: "Application & Admission Support",
    d: "Documents, essays, deadlines — prepared and submitted with precision.",
    accent: "var(--coral)",
  },
  {
    n: "04",
    t: "Offer Letter Assistance",
    d: "Guidance through comparing, accepting and confirming your enrolment.",
    accent: "var(--sunset)",
  },
  {
    n: "05",
    t: "Student Visa Guidance",
    d: "Step-by-step visa documentation support from start to approval.",
    accent: "var(--coral)",
  },
  {
    n: "06",
    t: "Education Loan & Financial Guidance",
    d: "Trusted loan partners and scholarship leads, tailored to your needs.",
    accent: "var(--sunset)",
  },
  {
    n: "07",
    t: "Pre-Departure Orientation",
    d: "Cultural, logistical and academic guidance before you take off.",
    accent: "var(--coral)",
  },
  {
    n: "08",
    t: "Accommodation Assistance",
    d: "Safe, vetted student housing options close to your campus.",
    accent: "var(--sunset)",
  },
];

const BG_IMG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=70";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".svc-card", gridRef.current);
    gsap.set(cards, { opacity: 0, y: 40, force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.07,
      force3D: true,
      clearProps: "transform",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /*
      overflow-x-clip (not hidden) so the background image can extend above
      the section boundary to bleed into the About section above it.
    */
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-x-clip"
      style={{ paddingTop: "5rem", paddingBottom: "7rem" }}
    >
      {/* ── Mountain panorama + illumination — all inside one masked wrapper ──
          The mask-image applies to the entire wrapper, so every child layer
          (image, warm tint, sunbeam) fades to transparent at top & bottom
          together. Nothing bleeds past the masked edge → no hard line. */}
      <motion.div
        ref={bgRef}
        aria-hidden
        style={{
          ...(reduce ? undefined : { y: bgY, willChange: "transform" }),
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 28%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 28%, black 82%, transparent 100%)",
        }}
        className="pointer-events-none absolute inset-x-0 -top-40 h-[calc(100%+10rem)] z-0"
      >
        {/* Layer A — mountain photograph */}
        <img
          src={BG_IMG}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%", opacity: 0.48 }}
        />
        {/* Layer B — warm golden-hour amber tint */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,150,60,0.18) 0%, rgba(255,110,40,0.10) 45%, transparent 75%)",
          }}
        />
        {/* Layer C — sunbeam radial glow (centre at ~30% of wrapper = heading area)
            Inside the wrapper so it shares the top/bottom mask fade. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 45% at 50% 30%, rgba(255,160,80,0.14), transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={headRef}
          style={reduce ? undefined : { y: headY, willChange: "transform" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-coral">Our Services</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              Eight services.
              <br />
              One <span className="italic text-gradient-mint">seamless journey</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-foreground/60 leading-relaxed md:text-right">
            End-to-end support — from first conversation to your first day abroad.
          </p>
        </motion.div>

        {/* Glass card grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <div
              key={s.n}
              className="svc-card group relative rounded-2xl p-6 cursor-default transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.24)",
                backdropFilter: "blur(20px) saturate(1.5) brightness(1.05)",
                WebkitBackdropFilter: "blur(20px) saturate(1.5) brightness(1.05)",
                border: "1px solid rgba(255,255,255,0.50)",
                boxShadow:
                  "0 6px 32px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(255,255,255,0.15) inset",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 30% 0%, ${s.accent}14, transparent 70%)`,
                }}
              />

              {/* Number */}
              <span
                className="font-display text-2xl font-bold tabular-nums leading-none"
                style={{ color: s.accent }}
              >
                {s.n}
              </span>

              {/* Title */}
              <h3 className="mt-4 font-display text-lg leading-snug text-foreground">{s.t}</h3>

              {/* Description */}
              <p className="mt-2 text-xs text-foreground/70 leading-relaxed">{s.d}</p>

              {/* Bottom accent line — grows on hover */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
                style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
