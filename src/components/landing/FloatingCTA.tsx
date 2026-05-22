import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "917994017444";
const PHONE_NUMBER = "+917994018444";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi Ryna International! I'd like to know more about studying in Europe.",
);

// High-fidelity official WhatsApp Logo SVG
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none"
    >
      {/* Speech bubble teaser */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden sm:flex items-center gap-2.5 rounded-2xl glass-strong px-4.5 py-2.5 text-xs text-foreground/90 shadow-[var(--shadow-soft)] relative pointer-events-auto border border-foreground/5"
      >
        {/* Dynamic Green Online Dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-body font-light">Chat with us — we reply in minutes</span>
        <span className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-background/80 border-r border-b border-foreground/5" />
      </motion.div>

      {/* Action CTA Buttons Row */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-1 sm:gap-2 rounded-full glass-strong p-1.5 sm:p-2 shadow-2xl shadow-coral/5 pointer-events-auto border border-foreground/5"
      >
        {/* WhatsApp attention-seeking pulse button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-sunset px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {/* Wave Ripple Ring 1 */}
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-gradient-sunset -z-10 blur-[8px]"
          />

          {/* Wave Expanding Ring 2 */}
          <motion.span
            animate={{
              scale: [1, 1.45],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-sunset/50 -z-10"
          />

          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>

        {/* Call button */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call Ryna International"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-foreground/10 active:scale-95 transition-all duration-300"
        >
          <Phone size={12} className="text-foreground/65 shrink-0 sm:w-3.5 sm:h-3.5" />
          <span>Call</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
