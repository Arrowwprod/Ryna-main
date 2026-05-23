import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const IMG_PRIMARY =
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=webp&fit=crop&w=800&q=65";
const IMG_SECONDARY =
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?fm=webp&fit=crop&w=500&q=65";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 sm:py-40 px-6 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?fm=webp&fit=crop&w=1000&q=40"
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute right-0 top-0 h-full w-3/5 object-cover object-left opacity-[0.055]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.985_0.012_80)] from-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.012_80)] via-transparent to-[oklch(0.985_0.012_80)]" />
      </div>
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-coral">About Us</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-foreground">
            A consultancy built on{" "}
            <span className="italic text-gradient-sky">trust &amp; transparency</span>.
          </h2>
          <p className="mt-6 text-foreground/75 leading-relaxed">
            Ryna International is a Europe-focused education consultancy dedicated to guiding
            students toward quality higher education across Europe. We provide expert counseling,
            university admissions support, and student visa guidance through a transparent and
            ethical approach.
          </p>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            By partnering with reputed European institutions, we help students choose the right
            academic pathway and confidently begin their international education journey.
          </p>

          <div className="mt-16 grid sm:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "European Reach",
                subtitle: "15+ Countries",
                desc: "Curated academic pathways spanning Germany, Italy, France, and Europe’s finest destinations.",
              },
              {
                num: "02",
                title: "Transparent Process",
                subtitle: "100% Ethical",
                desc: "Honest counseling and zero hidden charges, ensuring complete document and portal visibility.",
              },
              {
                num: "03",
                title: "Personal Support",
                subtitle: "End-to-End",
                desc: "Providing dedicated guidance from initial application and visa to accommodation and local stay.",
              },
            ].map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col pt-8 border-t border-foreground/10 hover:border-coral/40 transition-colors duration-500 cursor-default"
              >
                {/* Minimal elegant accent border on hover */}
                <div className="absolute top-0 left-0 w-0 h-[1.5px] bg-coral group-hover:w-full transition-all duration-500 ease-out" />
                
                {/* Premium Serif Number */}
                <span className="font-display italic font-light text-5xl text-foreground/15 group-hover:text-coral/30 group-hover:-translate-y-1 transition-all duration-500 select-none">
                  {s.num}
                </span>

                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-coral/80">
                    {s.subtitle}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/65 font-body font-light group-hover:text-foreground/80 transition-colors duration-500">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Layered imagery with parallax */}
        <div className="relative h-[360px] xs:h-[420px] sm:h-[520px] md:h-[600px]">
          <motion.div
            style={reduce ? undefined : { y: yA }}
            className="absolute top-0 right-0 w-[78%] h-[70%] rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]"
          >
            <img
              src={IMG_PRIMARY}
              alt="View through an airplane window over Europe at sunrise"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            style={reduce ? undefined : { y: yB }}
            className="absolute bottom-0 left-0 w-[58%] h-[48%] rounded-3xl overflow-hidden shadow-[var(--shadow-sky)] ring-4 ring-background"
          >
            <img
              src={IMG_SECONDARY}
              alt="European cityscape rooftops at golden hour"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute -z-10 -bottom-10 -right-10 h-72 w-72 rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(circle, var(--sunset), transparent 65%)" }}
          />
        </div>
      </div>
    </section>
  );
}
