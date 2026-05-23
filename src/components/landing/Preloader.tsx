import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isLoaded = false;
    const handleLoad = () => {
      isLoaded = true;
    };

    if (document.readyState === "complete") {
      isLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    let current = 0;
    const interval = setInterval(() => {
      // Organic progression mimicking resource parsing
      if (current < 45) {
        current += Math.floor(Math.random() * 4) + 3; // Rapid initial load
      } else if (current < 88) {
        current += Math.floor(Math.random() * 2) + 1; // Slower asset parse phase
      } else if (current < 100) {
        if (isLoaded || current < 98) {
          current += 1; // Crawl to 98-99, then snap to 100 upon document complete
        }
      } else {
        clearInterval(interval);
        // Add a tiny premium delay at 100% before triggering exit
        setTimeout(() => {
          onComplete();
        }, 150);
      }

      setCount(Math.min(current, 100));
    }, 18); // ~55-60fps

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete]);

  return (
    <>
      {/* 1. Staggered underlay panel (creates a rich, cinematic sunset color swipe) */}
      <motion.div
        key="preloader-underlay"
        initial={{ y: "100%", skewY: 0 }}
        exit={{
          y: "-125%",
          skewY: -6,
          transition: {
            duration: 1.05,
            delay: 0.05,
            ease: [0.85, 0, 0.15, 1], // Expo-like easeInOut
          },
        }}
        className="fixed -top-[10vh] left-0 w-full h-[120vh] z-[9998] bg-gradient-sunset pointer-events-none"
      />

      {/* 2. Main preloader content panel (ivory background) */}
      <motion.div
        key="preloader-main"
        initial={{ y: "0%", skewY: 0, scale: 1 }}
        exit={{
          y: "-125%",
          skewY: -6,
          scale: 0.95,
          transition: {
            duration: 1.05,
            ease: [0.85, 0, 0.15, 1], // Expo-like easeInOut
          },
        }}
        className="fixed -top-[10vh] left-0 w-full h-[120vh] z-[9999] flex flex-col items-center justify-center bg-[oklch(0.985_0.012_80)] select-none overflow-hidden"
      >
        {/* Soft warm horizon ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/4 h-[80%] w-[90%] rounded-full blur-[120px] opacity-[0.25]"
          style={{
            background: "radial-gradient(circle, var(--sunset) 0%, var(--coral) 60%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Sleek flight SVG icon */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 text-coral"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 transform rotate-180 text-coral opacity-80"
            >
              <path d="M12 2c-.2 0-.4.1-.5.3L7.3 10.5 2 13.5v1.5l8-2 2 6-2 2v1h4v-1l-2-2 2-6 8 2v-1.5l-5.3-3L12.5 2.3c-.1-.2-.3-.3-.5-.3z" />
            </svg>
          </motion.div>

          {/* Large Elegant Display Counter */}
          <div className="font-display italic text-[14vw] sm:text-[9vw] font-light leading-none tracking-tighter text-foreground tabular-nums flex items-baseline select-none">
            <span>{count}</span>
            <span className="text-[5vw] sm:text-[3vw] ml-1 font-body not-italic text-coral font-semibold">
              %
            </span>
          </div>

          {/* Minimal Progress Line */}
          <div className="w-44 sm:w-64 h-[1.5px] bg-foreground/10 mt-6 relative overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-sunset via-coral to-sunset rounded-full transition-all duration-[18ms] ease-out"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Cinematic Subtitle */}
          <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-foreground/45 font-body font-medium">
            Your Runway to Success
          </p>
        </div>
      </motion.div>
    </>
  );
}
