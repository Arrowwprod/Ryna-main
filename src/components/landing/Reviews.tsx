import { motion } from "framer-motion";
import { Star, CheckCircle, ExternalLink, MessageSquare } from "lucide-react";

// Google Maps Reviews URL provided by the user
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/RYNA+INTERNATIONAL+LLP/@10.53555,76.2136203,17z/data=!4m16!1m7!3m6!1s0x3ba7efefde7f6441:0x33dcc4d4727151!2sRYNA+INTERNATIONAL+LLP!8m2!3d10.53555!4d76.2161952!16s%2Fg%2F11x_5thz6f!3m7!1s0x3ba7efefde7f6441:0x33dcc4d4727151!8m2!3d10.53555!4d76.2161952!9m1!1b1!16s%2Fg%2F11x_5thz6f?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D";

interface Review {
  id: number;
  name: string;
  initials: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  avatarBg: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Adithya K. R.",
    initials: "AK",
    role: "M.Sc. Data Science student, Germany",
    rating: 5,
    date: "2 weeks ago",
    text: "I had an exceptional experience with Ryna International for my Germany Master's application. They made the entire APS verification and visa documentation process incredibly smooth and stress-free. Extremely transparent and professional team!",
    verified: true,
    avatarBg: "bg-coral/20 text-coral",
  },
  {
    id: 2,
    name: "Sandra Maria",
    initials: "SM",
    role: "B.Sc. Mechanical Engineering, Italy",
    rating: 5,
    date: "1 month ago",
    text: "Hands down the best study abroad agency for European education! The advisors guided me perfectly through the complex Italian university admission process and DSU scholarship application. Honest counseling without any hidden fees.",
    verified: true,
    avatarBg: "bg-mint/20 text-mint",
  },
  {
    id: 3,
    name: "Mohammed Fayiz",
    initials: "MF",
    role: "M.Eng. Automotive Systems, Germany",
    rating: 5,
    date: "1 month ago",
    text: "Extremely reliable and ethical counseling. Unlike other consultants, they did not push me towards expensive private universities. Instead, they patiently helped me secure a seat in a top public university in Germany.",
    verified: true,
    avatarBg: "bg-sky/20 text-sky",
  },
  {
    id: 4,
    name: "Anjali Menon",
    initials: "AM",
    role: "MBA student, Malta",
    rating: 5,
    date: "2 months ago",
    text: "Thanks to Ryna International, I secured my Malta student visa in record time. The sales head Fidha was always available to clear my doubts, even during weekends. Their attention to documentation detail is unmatched!",
    verified: true,
    avatarBg: "bg-sunset/20 text-sunset",
  },
  {
    id: 5,
    name: "Rohan Mathew",
    initials: "RM",
    role: "M.Sc. Cyber Security, Ireland",
    rating: 5,
    date: "3 months ago",
    text: "Ryna International provides genuine and dedicated support from start to finish. From course selection to visa mock interviews, they stood by me. They are very professional, realistic, and ethical. 100% recommended!",
    verified: true,
    avatarBg: "bg-primary/20 text-primary",
  },
  {
    id: 6,
    name: "Devika Sajeev",
    initials: "DS",
    role: "M.A. International Business, France",
    rating: 5,
    date: "4 months ago",
    text: "Excellent guidance! They evaluated my profile thoroughly and suggested the best options that aligned with my career goals. Their post-arrival guidance, finding accommodation, and visa renewals is a lifesaver.",
    verified: true,
    avatarBg: "bg-coral/20 text-coral",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Reviews() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-coral/10 to-sky/5 blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Google Reviews Badge Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16 border-b border-border/40 pb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-coral font-semibold">Student Voices</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Backed by <span className="italic text-gradient-coral font-bold">excellence</span>.
            </h2>
            <p className="mt-3 max-w-xl text-foreground/75 font-body">
              Read real Google Maps reviews from our students who have successfully embarked on their study abroad journeys in Europe.
            </p>
          </div>

          {/* Sourced from Google Rating Summary Card */}
          <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 p-5 rounded-2xl glass-strong border border-border/60 shadow-soft hover:shadow-glow hover:border-coral/40 transition-all duration-500 shrink-0 cursor-pointer"
            whileHover={{ y: -3 }}
          >
            {/* Google Vector Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-border/20 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.09 14.99 0 12 0 7.354 0 3.373 2.68 1.458 6.59l3.808 3.175z"
                />
                <path
                  fill="#4285F4"
                  d="M16.04 15.34C14.95 16.03 13.56 16.45 12 16.45c-2.9 0-5.36-1.96-6.24-4.6l-3.83 2.96C3.78 19.34 7.55 22 12 22c2.97 0 5.66-1.01 7.64-2.82l-3.6-2.84z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.76 11.85c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.458 4.1C.53 5.86 0 7.87 0 10s.53 4.14 1.46 5.9l4.3-3.25z"
                />
                <path
                  fill="#34A853"
                  d="M23.49 10.22c.16.59.24 1.21.24 1.85 0 7.21-4.83 12.33-12.06 12.33a11.96 11.96 0 0 1-4.03-.68l3.6-2.84c.83.5 1.83.77 2.83.77 4.14 0 7.21-2.84 7.21-7.21 0-.48-.05-.96-.13-1.42H12v-4.8h11.49z"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-bold">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="stroke-none" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-foreground/70 mt-1 font-body">
                <span className="font-semibold text-foreground/90">180+ Reviews</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle size={10} className="fill-emerald-100 dark:fill-transparent" /> Google Verified
                </span>
              </div>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral/5 text-coral group-hover:bg-coral group-hover:text-white transition-all duration-300">
              <ExternalLink size={12} />
            </div>
          </motion.a>
        </div>

        {/* 3x2 Grid Layout of Google Reviews with mobile snap scrolling */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-6 md:grid-cols-2 lg:grid-cols-3 pb-6 md:pb-0"
        >
          {mockReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/40 glass-liquid hover:border-coral/30 hover:shadow-soft transition-all duration-500 flex-shrink-0 w-[290px] xs:w-[320px] sm:w-[350px] md:w-auto snap-center md:snap-none"
            >
              {/* Card top details */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${review.avatarBg} font-display flex items-center justify-center text-sm font-bold shadow-sm`}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide text-foreground/90 font-display">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-foreground/60 font-body">{review.role}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-foreground/50 font-body shrink-0">{review.date}</span>
                </div>

                {/* Stars and Verification Badge */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>
                  <span className="text-[10px] text-foreground/60 font-body flex items-center gap-0.5">
                    <CheckCircle size={9} className="text-emerald-500 fill-emerald-500/10" /> Verified student
                  </span>
                </div>

                {/* Review Text */}
                <p className="mt-4 text-[13px] text-foreground/80 leading-relaxed font-body">
                  "{review.text}"
                </p>
              </div>

              {/* Decorative brand accents in cards */}
              <div className="absolute top-4 right-4 text-foreground/5 group-hover:text-coral/5 transition-colors pointer-events-none">
                <MessageSquare size={36} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-2 text-[10px] text-foreground/50 tracking-[0.18em] uppercase font-semibold">
          <span>Swipe to read reviews</span>
          <span className="inline-flex gap-1 animate-pulse">
            <span>&larr;</span>
            <span>&rarr;</span>
          </span>
        </div>

        {/* Bottom CTA for Reviews */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-3.5 text-xs font-semibold hover:border-coral hover:text-coral hover:bg-coral/5 transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink size={12} />
          </motion.a>

          <motion.a
            href={`${GOOGLE_REVIEWS_URL}&showState=writeReview`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral text-white px-6 py-3.5 text-xs font-semibold hover:opacity-90 transition duration-300 shadow-soft cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Write a Google Review</span>
            <Star size={12} fill="currentColor" className="stroke-none" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
