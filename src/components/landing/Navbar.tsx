import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/ryna-logo.jpg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#nations", label: "Nations" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-[var(--shadow-soft)]">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-card p-0.5 ring-1 ring-border">
              <img
                src={logo}
                alt="Ryna International"
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span className="font-display text-xl tracking-tight">
              Ryna<span className="text-coral">.</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-foreground/80 hover:text-mint transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-mint transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center rounded-full bg-gradient-sunset px-5 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
          >
            Book a Call
          </a>

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-2 glass rounded-2xl p-4 overflow-hidden shadow-lg border border-border/40"
            >
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-foreground/85 hover:text-mint hover:bg-card/50 transition-all duration-200 text-sm font-medium"
                    >
                      <span>{l.label}</span>
                      <ChevronRight size={16} className="text-foreground/40" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border/40">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-sunset py-3 text-sm font-medium text-foreground shadow-[var(--shadow-glow)] hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  Book a Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
