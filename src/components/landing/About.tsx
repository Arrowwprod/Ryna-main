import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Globe, ShieldCheck, Compass } from "lucide-react";

const IMG_PRIMARY =
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=70";
const IMG_SECONDARY =
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=70";

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
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=60"
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

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Globe className="text-sky shrink-0 animate-[spin_40s_linear_infinite]" size={20} />,
                title: "15+ Countries",
                label: "European Reach",
                desc: "Curated programs in Italy, Germany, France, and top destinations.",
                color: "rgba(56,189,248,0.12)",
              },
              {
                icon: <ShieldCheck className="text-sunset shrink-0" size={20} />,
                title: "100%",
                label: "Transparent Process",
                desc: "Ethical counseling, zero hidden charges, complete document visibility.",
                color: "rgba(245,158,11,0.12)",
              },
              {
                icon: <Compass className="text-coral shrink-0 group-hover:rotate-45 transition-transform duration-500" size={20} />,
                title: "End-to-End",
                label: "Personal Support",
                desc: "From initial applications and visas to pre-departure and local stays.",
                color: "rgba(244,63,94,0.12)",
              },
            ].map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl border border-border/30 glass p-5 flex flex-col justify-between shadow-soft hover:shadow-glow transition-all duration-350 cursor-pointer overflow-hidden"
              >
                {/* Refraction radial glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${s.color}, transparent 60%)`
                  }}
                />

                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5 text-foreground/80 group-hover:bg-foreground/10 group-hover:text-foreground transition-all duration-300">
                    {s.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/45 group-hover:text-foreground/60 transition-colors duration-300">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <div className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {s.title}
                  </div>
                  <div className="text-xs font-semibold text-foreground/85 mt-1 tracking-wide">
                    {s.label}
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground/60 mt-2 font-body group-hover:text-foreground/75 transition-colors duration-300">
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
