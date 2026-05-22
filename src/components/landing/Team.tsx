/**
 * Team — Founder spotlight + social channel preview cards + core team members.
 * ─ Founder photo: local Anas.jpg
 * ─ Social cards: Founder Instagram, Founder YouTube,
 *                 Company Instagram, Company YouTube
 * ─ Core Team: Arya Surendran, Adv Hima Sathyan, Aswin K Vinayan, Fidha Binth Ashique
 */

import { motion, Variants } from "framer-motion";
import AnasPhoto from "@/assets/Anas.jpg";
import FidhaPhoto from "@/assets/Team members/photo_15_2026-05-21_21-58-07.jpg";
import AswinPhoto from "@/assets/Team members/photo_10_2026-05-21_21-58-07.jpg";
import HimaPhoto from "@/assets/Team members/photo_11_2026-05-21_21-58-07.jpg";
import AryaPhoto from "@/assets/Team members/photo_12_2026-05-21_21-58-07.jpg";

// ── Social channel data ──────────────────────────────────────────────────────
const socials = [
  {
    id: "founder-ig",
    entity: "Founder",
    platform: "Instagram",
    handle: "@malayalee_from_croatia",
    url: "https://www.instagram.com/malayalee_from_croatia?igsh=MWt5eTd4ODEweGs4cA==",
    followers: "Follow",
    description:
      "Personal insights, student stories & behind-the-scenes of Europe education journeys.",
    glowGradient: "from-sunset/20 via-coral/20 to-sunset/20",
    borderGradient: "from-sunset via-coral to-sunset",
    accentColor: "text-coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "founder-yt",
    entity: "Founder",
    platform: "YouTube",
    handle: "Malayalee from Croatia",
    url: "https://youtube.com/@malayaleefromcroatia?si=9yt_VrRlWD-s6PUX",
    followers: "Subscribe",
    description: "Study abroad vlogs, visa tips, and real student experiences studying in Europe.",
    glowGradient: "from-coral/20 via-sunset/20 to-coral/20",
    borderGradient: "from-coral via-sunset to-coral",
    accentColor: "text-sunset",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "company-ig",
    entity: "Ryna International",
    platform: "Instagram",
    handle: "@ryna_international",
    url: "https://www.instagram.com/ryna_international?utm_source=qr&igsh=OTFjZGh6ODJvcjh0",
    followers: "Follow",
    description:
      "University highlights, student success stories, and Europe education inspiration.",
    glowGradient: "from-sky/20 via-coral/20 to-sunset/20",
    borderGradient: "from-sky via-coral to-sunset",
    accentColor: "text-coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "company-yt",
    entity: "Ryna International",
    platform: "YouTube",
    handle: "Ryna International",
    url: "https://youtube.com/@rynainternational?si=oeZBwwBe6dED1tVZ",
    followers: "Subscribe",
    description:
      "Official channel — counseling sessions, destination guides, and admissions walkthroughs.",
    glowGradient: "from-sky/20 via-sunset/20 to-sky/20",
    borderGradient: "from-sky via-sunset to-sky",
    accentColor: "text-sky",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ── Core Team data ──────────────────────────────────────────────────────
const coreTeam = [
  {
    id: "arya",
    name: "Arya Surendran",
    role: "General Manager",
    image: AryaPhoto,
    glowGradient: "from-coral/25 via-sunset/20 to-coral/25",
    borderGradient: "from-coral via-sunset to-coral",
    accentColor: "text-coral",
    objectPosition: "50% 15%", // Pushed down to keep head inside frame
  },
  {
    id: "fidha",
    name: "Fidha Binth Ashique",
    role: "Sales Head",
    image: FidhaPhoto,
    glowGradient: "from-coral/25 via-sky/20 to-coral/25",
    borderGradient: "from-coral via-sky to-coral",
    accentColor: "text-coral",
    objectPosition: "50% 15%", // Pushed down to keep head inside frame
  },
  {
    id: "aswin",
    name: "Aswin K Vinayan",
    role: "Media Team Head",
    image: AswinPhoto,
    glowGradient: "from-sunset/25 via-coral/20 to-sunset/25",
    borderGradient: "from-sunset via-coral to-sunset",
    accentColor: "text-sunset",
    objectPosition: "50% 50%", // standard centering
  },
  {
    id: "hima",
    name: "Adv Hima Sathyan",
    role: "Legal Representative",
    image: HimaPhoto,
    glowGradient: "from-sky/25 via-sunset/20 to-sky/25",
    borderGradient: "from-sky via-sunset to-sky",
    accentColor: "text-sky",
    objectPosition: "50% 15%", // Pushed down to keep head inside frame
  },
];

export function Team() {
  // Coordinated Motion Animation Variants
  const cardVariants: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.09,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      y: -8,
      scale: 1.015,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 0, scale: 0.95 },
    hover: {
      opacity: 0.35,
      scale: 1.05,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const borderVariants: Variants = {
    initial: { opacity: 0.15 },
    animate: { opacity: 0.15 },
    hover: { opacity: 1, transition: { duration: 0.4 } },
  };

  const iconVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    animate: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: -6,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;

  const ctaVariants: Variants = {
    initial: { y: isMobileDevice ? 0 : 20, opacity: isMobileDevice ? 1 : 0 },
    animate: { y: isMobileDevice ? 0 : 20, opacity: isMobileDevice ? 1 : 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="team" className="relative py-32 px-6">
      {/* Subtle bg texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=60"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.012_80)] via-[oklch(0.985_0.012_80/0.4)] to-[oklch(0.985_0.012_80)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-coral">Meet the Founder</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            The person behind <span className="italic text-gradient-mint">your journey</span>.
          </h2>
        </div>

        {/* ── Founder card ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-3xl glass-strong overflow-hidden grid sm:grid-cols-[300px_1fr]"
        >
          {/* Accent top line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-sunset via-coral to-sunset rounded-t-3xl sm:col-span-2" />

          {/* Photo */}
          <div className="relative h-64 sm:h-auto">
            <img
              src={AnasPhoto}
              alt="Muhammed Anas KU — Founder of Ryna International"
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/5" />
          </div>

          {/* Bio */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-coral">
              Founder & Designated Partner
            </p>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl text-foreground">
              Muhammed Anas KU
            </h3>
            <p className="mt-4 text-foreground/70 leading-relaxed max-w-lg">
              Driving Ryna's mission to deliver ethical, transparent, Europe-focused education
              guidance for ambitious students. With firsthand experience navigating international
              admissions, Anas built Ryna to be the partner he wished he had.
            </p>

            {/* Quick social links inline */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/malayalee_from_croatia?igsh=MWt5eTd4ODEweGs4cA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-foreground/15 hover:border-coral hover:text-coral transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://youtube.com/@malayaleefromcroatia?si=9yt_VrRlWD-s6PUX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-foreground/15 hover:border-coral hover:text-coral transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Social preview cards ───────────────────────────────────────── */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-5">Follow along</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {socials.map((s, i) => {
              return (
                <motion.a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
                  className="group relative block rounded-3xl p-[1.5px] cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-coral/5"
                >
                  {/* Ambient Glow Backdrop */}
                  <motion.div
                    variants={glowVariants}
                    className={`absolute inset-0 bg-gradient-to-tr ${s.glowGradient} blur-2xl rounded-3xl -z-20 pointer-events-none`}
                  />

                  {/* Border-shining background */}
                  <motion.div
                    variants={borderVariants}
                    className={`absolute inset-0 bg-gradient-to-tr ${s.borderGradient} rounded-3xl -z-10`}
                  />

                  {/* Main Content Pane */}
                  <div className="relative rounded-[22.5px] bg-[oklch(0.985_0.012_80/0.8)] backdrop-blur-2xl p-6 h-full flex flex-col justify-between overflow-hidden">
                    {/* Spotlight light refraction bubble */}
                    <div
                      className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${s.glowGradient} blur-xl group-hover:scale-150 transition-transform duration-700 -z-10 pointer-events-none`}
                    />

                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-coral/80 font-body">
                          {s.entity === "Ryna International" ? "Company" : "Founder"}
                        </span>
                        <motion.div
                          variants={iconVariants}
                          className={`text-foreground/35 group-hover:${s.accentColor} transition-colors duration-300`}
                        >
                          {s.icon}
                        </motion.div>
                      </div>

                      {/* Platform & Handle */}
                      <div className="mt-5">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 font-bold font-body">
                          {s.platform}
                        </span>
                        <h4
                          className={`font-display italic text-lg sm:text-xl text-foreground font-normal tracking-tight mt-1 group-hover:${s.accentColor} transition-colors duration-300`}
                        >
                          {s.handle}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="mt-3.5 text-xs text-foreground/60 leading-relaxed font-body font-light">
                        {s.description}
                      </p>
                    </div>

                    {/* Bottom CTA Row (Reveal Effect) */}
                    <div className="h-10 mt-6 overflow-hidden relative flex items-center">
                      <motion.div
                        variants={ctaVariants}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4.5 py-2.5 rounded-full border border-foreground/15 text-foreground hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300"
                      >
                        {s.followers}
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ── Core Team Members ───────────────────────────────────────── */}
        <div className="mt-24">
          <span className="text-xs uppercase tracking-[0.3em] text-coral">Core Team</span>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
            The pillars of <span className="italic text-gradient-mint">our support</span>.
          </h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((m, i) => {
              return (
                <motion.div
                  key={m.id}
                  custom={i + 2} // offset delay from socials slightly
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
                  className="group relative flex flex-col rounded-3xl p-[1.5px] cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-coral/5 h-full"
                >
                  {/* Ambient Glow Backdrop */}
                  <motion.div
                    variants={glowVariants}
                    className={`absolute inset-0 bg-gradient-to-tr ${m.glowGradient} blur-2xl rounded-3xl -z-20 pointer-events-none`}
                  />

                  {/* Border-shining background */}
                  <motion.div
                    variants={borderVariants}
                    className={`absolute inset-0 bg-gradient-to-tr ${m.borderGradient} rounded-3xl -z-10`}
                  />

                  {/* Main Content Pane */}
                  <div className="relative rounded-[22.5px] bg-[oklch(0.985_0.012_80/0.8)] backdrop-blur-2xl overflow-hidden h-full flex flex-col justify-between">
                    {/* Portrait Photo with dynamic Zoom */}
                    <div className="relative h-72 w-full overflow-hidden">
                      <img
                        src={m.image}
                        alt={`${m.name} — ${m.role} of Ryna International`}
                        style={{ objectPosition: m.objectPosition }}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Premium Portrait shading gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.985_0.012_80)] via-transparent to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />
                    </div>

                    {/* Team Member Details */}
                    <div className="p-6 relative z-10 -mt-10 bg-gradient-to-t from-[oklch(0.985_0.012_80)] via-[oklch(0.985_0.012_80)] to-transparent pt-12 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Role tag */}
                        <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-foreground/40 font-body">
                          {m.role}
                        </span>

                        {/* Name (luxurious serif italic accents) */}
                        <h4
                          className={`font-display text-xl text-foreground font-normal tracking-tight mt-1 group-hover:${m.accentColor} transition-colors duration-300`}
                        >
                          {m.name}
                        </h4>
                      </div>

                      {/* Small elegant decorative quote / motto or placeholder info for card balance */}
                      <div className="mt-5 pt-3 border-t border-foreground/5 flex items-center justify-between">
                        <span className="text-[10px] text-foreground/40 font-body font-light">
                          Ryna Core Team
                        </span>
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            m.accentColor === "text-coral"
                              ? "bg-coral"
                              : m.accentColor === "text-sky"
                                ? "bg-sky"
                                : "bg-sunset"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
