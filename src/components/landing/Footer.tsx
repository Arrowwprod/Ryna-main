import { Instagram, Phone, MapPin, ExternalLink } from "lucide-react";
import logo from "@/assets/ryna-logo.jpg";
import { motion } from "framer-motion";

const sections = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Nations", href: "#nations" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// WhatsApp SVG (not in lucide-react)
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative px-6 pt-20 pb-10">
      <div className="relative z-10 mx-auto max-w-7xl grid gap-12 lg:grid-cols-4">
        <div>
          <a href="#home" className="flex items-center gap-3">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-card p-0.5 ring-1 ring-border">
              <img
                src={logo}
                alt="Ryna International"
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span className="font-display text-3xl">
              Ryna<span className="text-coral">.</span>
            </span>
          </a>
          <p className="mt-4 max-w-md text-foreground/85">
            Ryna International — Europe-focused education consultancy. Ethical guidance, transparent
            pathways, lifelong support.
          </p>

          {/* Social icons: Instagram + WhatsApp */}
          <div className="mt-6 flex items-center gap-3">
            {/* Instagram — linked to Ryna account */}
            <a
              href="https://www.instagram.com/ryna_international?utm_source=qr&igsh=OTFjZGh6ODJvcjh0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ryna International on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-coral/15 hover:text-coral transition"
            >
              <Instagram size={16} />
            </a>

            {/* WhatsApp — replaces LinkedIn + MessageCircle */}
            <a
              href="https://wa.me/917994017444"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-coral/15 hover:text-coral transition"
            >
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg">Sections</h4>
          <ul className="mt-4 space-y-2 text-sm text-foreground/85">
            {sections.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="hover:text-coral transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach Us — phone only, no email */}
        <div>
          <h4 className="font-display text-lg">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/85">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-coral shrink-0" />
              <a href="tel:+917994018444" className="hover:text-coral transition-colors">
                +91 7994018444
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon size={14} />
              <a
                href="https://wa.me/917994017444"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coral transition-colors"
              >
                wa.me/7994017444
              </a>
            </li>
            <li className="text-foreground/75">www.rynainternational.com</li>
          </ul>
        </div>

        {/* Symmetrical Google Maps Location Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-lg">Locate Us</h4>
          <motion.a
            href="https://www.google.com/maps/place/RYNA+INTERNATIONAL+LLP/@10.53555,76.2136203,17z/data=!4m14!1m7!3m6!1s0x3ba7efefde7f6441:0x33dcc4d4727151!2sRYNA+INTERNATIONAL+LLP!8m2!3d10.53555!4d76.2161952!16s%2Fg%2F11x_5thz6f!3m5!1s0x3ba7efefde7f6441:0x33dcc4d4727151!8m2!3d10.53555!4d76.2161952!16s%2Fg%2F11x_5thz6f?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-48 w-full flex-col justify-end overflow-hidden rounded-2xl border border-border/40 glass shadow-soft hover:shadow-glow transition-all duration-500 cursor-pointer"
            whileHover={{ y: -4 }}
          >
            {/* Highly Realistic Premium Map Graphic Background */}
            <div className="absolute inset-0 opacity-80 transition-all duration-700 group-hover:scale-105 bg-[oklch(0.985_0.012_80)]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="absolute inset-0 select-none"
                fill="none"
              >
                {/* Coordinate Grid Lines (Soft & Elegant) */}
                <g stroke="currentColor" strokeWidth="0.5" className="stroke-foreground/5" strokeDasharray="3 3">
                  <line x1="40" y1="0" x2="40" y2="180" />
                  <line x1="120" y1="0" x2="120" y2="180" />
                  <line x1="200" y1="0" x2="200" y2="180" />
                  <line x1="280" y1="0" x2="280" y2="180" />
                  
                  <line x1="0" y1="40" x2="320" y2="40" />
                  <line x1="0" y1="100" x2="320" y2="100" />
                  <line x1="0" y1="150" x2="320" y2="150" />
                </g>

                {/* Styled Parks / Greenery Zone */}
                <path
                  d="M0,0 L80,0 L60,50 L0,30 Z M220,120 L320,100 L320,180 L200,180 Z"
                  fill="oklch(0.92 0.05 140 / 0.45)"
                  className="transition-colors duration-500 group-hover:fill-mint/25"
                />
                
                {/* Styled Water Body (Puzha / River / Stream) */}
                <path
                  d="M-20,150 C40,140 100,165 180,155 C240,148 280,160 340,145"
                  stroke="oklch(0.85 0.06 225 / 0.55)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-500 group-hover:stroke-sky/50"
                />
                <path
                  d="M-20,150 C40,140 100,165 180,155 C240,148 280,160 340,145"
                  stroke="oklch(0.92 0.04 220 / 0.8)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Building Blocks / Plots */}
                <g fill="currentColor" className="fill-foreground/4" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1">
                  {/* District block near center */}
                  <rect x="90" y="20" width="30" height="25" rx="3" className="fill-foreground/3 group-hover:fill-coral/5 transition-colors" />
                  <rect x="130" y="15" width="40" height="20" rx="3" className="fill-foreground/3 group-hover:fill-coral/5 transition-colors" />
                  <rect x="95" y="55" width="25" height="20" rx="3" />
                  <rect x="150" y="65" width="35" height="15" rx="3" />
                  
                  {/* West blocks */}
                  <rect x="15" y="60" width="30" height="35" rx="4" />
                  <rect x="20" y="105" width="25" height="20" rx="3" />
                  
                  {/* East blocks */}
                  <rect x="250" y="20" width="45" height="30" rx="4" className="fill-foreground/3" />
                  <rect x="260" y="60" width="35" height="25" rx="3" />
                </g>

                {/* Realistic Street Network (Avenues & Roads) */}
                <g strokeLinecap="round">
                  {/* Main Avenues Underlay (for outline border effect) */}
                  <path d="M-10,48 L330,48 M120,-10 L120,190 M230,-10 L180,190 M-10,105 C80,105 150,90 230,90 L330,90" stroke="oklch(0.85 0.01 80)" strokeWidth="6" />
                  
                  {/* Main Avenues Core */}
                  <path d="M-10,48 L330,48" stroke="white" strokeWidth="3" />
                  <path d="M120,-10 L120,190" stroke="white" strokeWidth="3" />
                  <path d="M230,-10 L180,190" stroke="white" strokeWidth="3" />
                  <path d="M-10,105 C80,105 150,90 230,90 L330,90" stroke="white" strokeWidth="3" />

                  {/* Secondary/Access Streets */}
                  <path d="M45,48 L45,130 L120,130" stroke="white" strokeWidth="2.5" />
                  <path d="M120,72 L230,72" stroke="white" strokeWidth="2.5" />
                  <path d="M180,48 L180,92" stroke="white" strokeWidth="2" />
                  <path d="M230,48 L270,12" stroke="white" strokeWidth="2" />
                  
                  {/* Active Route highlighting to RYNA HQ (Custom Dotted Line) */}
                  <path
                    d="M45,48 L45,130 L120,130 L120,85 M120,85 L165,85"
                    stroke="var(--color-coral)"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="opacity-90 stroke-coral animate-[dash_15s_linear_infinite]"
                  />
                </g>

                {/* Elegant Vintage Compass Rose (Top Right) */}
                <g transform="translate(285, 25)" className="opacity-60">
                  <circle r="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="stroke-foreground/20" />
                  <path d="M0,-14 L0,14 M-14,0 L14,0" stroke="currentColor" strokeWidth="0.5" className="stroke-foreground/30" />
                  {/* Arrowhead */}
                  <polygon points="0,-14 3,-5 0,-8 -3,-5" fill="var(--color-coral)" />
                  <polygon points="0,14 3,5 0,8 -3,5" fill="currentColor" className="fill-foreground/40" />
                  <polygon points="14,0 5,3 8,0 5,-3" fill="currentColor" className="fill-foreground/40" />
                  <polygon points="-14,0 -5,3 -8,0 -5,-3" fill="currentColor" className="fill-foreground/40" />
                  <text x="-3" y="-16" fontSize="6" className="font-sans fill-foreground/70 font-bold">N</text>
                </g>

                {/* Styled Map Scale Legend (Bottom Left) */}
                <g transform="translate(10, 160)" className="opacity-50">
                  <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" strokeWidth="1.5" className="stroke-foreground" />
                  <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="1" className="stroke-foreground" />
                  <line x1="20" y1="-2" x2="20" y2="2" stroke="currentColor" strokeWidth="1" className="stroke-foreground" />
                  <line x1="40" y1="-3" x2="40" y2="3" stroke="currentColor" strokeWidth="1" className="stroke-foreground" />
                  <text x="12" y="-5" fontSize="6" className="font-sans fill-foreground font-semibold">50 m</text>
                </g>

                {/* Coordinate Border Overlay Labels (Matches 10.53555° N, 76.21620° E) */}
                <text x="5" y="45" fontSize="6.5" className="font-sans fill-foreground/30 font-semibold tracking-tight">10.5355° N</text>
                <text x="145" y="174" fontSize="6.5" className="font-sans fill-foreground/30 font-semibold tracking-tight">76.2162° E</text>

                {/* Fine Street Names */}
                <text x="8" y="101" fontSize="5" className="font-sans fill-foreground/40 font-semibold tracking-wider rotate-0">Patturaikkal Rd</text>
                <text x="124" y="30" fontSize="5" className="font-sans fill-foreground/40 font-semibold tracking-wider rotate-90">Kalyan Rd</text>
                <text x="155" y="44" fontSize="5" className="font-sans fill-foreground/40 font-semibold tracking-wider">Avenue 5</text>
              </svg>
            </div>

            {/* Glowing spot where the marker sits */}
            <div className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <span className="absolute h-12 w-12 rounded-full bg-coral/25 animate-pulse" />
              <span className="absolute h-8 w-8 rounded-full bg-coral/35 animate-ping [animation-duration:1.5s]" />
              <span className="absolute h-3.5 w-3.5 rounded-full bg-coral shadow-glow border border-white/40" />
            </div>

            {/* Floating Bobbing Marker Badge */}
            <motion.div
              className="absolute left-[52%] top-[25%] -translate-x-1/2 flex flex-col items-center pointer-events-none"
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-semibold text-white shadow-soft backdrop-blur-sm border border-white/10">
                <MapPin size={10} className="text-coral fill-coral/20 shrink-0" />
                <span className="tracking-wider text-[9px]">RYNA INTERNATIONAL</span>
              </div>
              {/* Little down arrow for badge */}
              <div className="h-1.5 w-1.5 rotate-45 -mt-1 bg-primary border-r border-b border-white/5" />
            </motion.div>

            {/* Ambient vignette background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />

            {/* Footer Badge Detail */}
            <div className="relative z-10 flex w-full items-center justify-between p-4 border-t border-border/30 bg-background/70 backdrop-blur-md">
              <div className="flex flex-col">
                <span className="font-display text-xs font-semibold text-foreground/90 tracking-wide">
                  RYNA HQ • THRISSUR
                </span>
                <span className="text-[10px] text-foreground/60 font-body">Open in Google Maps</span>
              </div>
              <motion.div
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5 text-primary group-hover:bg-coral group-hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <ExternalLink size={12} />
              </motion.div>
            </div>
          </motion.a>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl mt-16 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/65">
        <p>© {new Date().getFullYear()} Ryna International LLP. All rights reserved.</p>
        
        {/* Classy Agency Credit */}
        <div className="flex items-center gap-1 text-[11px] font-sans tracking-wider text-foreground/60 select-none">
          <span>Developed by</span>
          <a
            href="https://arrowwproductions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 hover:text-coral transition-colors duration-350 flex items-center gap-1 group"
          >
            Arroww Productions
            <span className="h-1.5 w-1.5 rounded-full bg-coral/85 group-hover:bg-coral group-hover:scale-125 transition-all duration-350 shadow-[0_0_8px_rgba(255,110,40,0.5)]" />
          </a>
        </div>

        <div className="flex gap-5">
          <a href="#" className="hover:text-coral">
            Privacy
          </a>
          <a href="#" className="hover:text-coral">
            Terms
          </a>
          <a href="#contact" className="hover:text-coral">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
