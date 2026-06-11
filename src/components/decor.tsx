import { motion } from "framer-motion";

/* A hand-drawn-feel lotus mark used as the project's emblem. */
export function Lotus({ className = "", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden>
      <g stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 78 C60 52 60 40 60 26 C50 40 46 60 60 78 C74 60 70 40 60 26Z" />
        <path d="M60 78 C40 64 30 50 28 34 C44 40 56 56 60 78Z" />
        <path d="M60 78 C80 64 90 50 92 34 C76 40 64 56 60 78Z" />
        <path d="M60 78 C30 74 14 64 8 50 C28 48 50 60 60 78Z" />
        <path d="M60 78 C90 74 106 64 112 50 C92 48 70 60 60 78Z" />
      </g>
    </svg>
  );
}

/* A seated meditation silhouette (from the project's resource handout vocabulary). */
export function MeditatingFigure({ className = "", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <g stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="26" r="11" />
        <path d="M30 78 C30 56 38 44 50 44 C62 44 70 56 70 78" />
        <path d="M30 78 C36 70 44 67 50 67 C56 67 64 70 70 78" />
        <path d="M30 74 C22 70 18 74 22 80 C26 84 34 82 38 76" />
        <path d="M70 74 C78 70 82 74 78 80 C74 84 66 82 62 76" />
      </g>
    </svg>
  );
}

/* The slowly drifting aurora blobs that sit behind most sections. */
export function Aurora({ tones = ["var(--color-sage)", "var(--color-teal)", "var(--color-amber)"] }: { tones?: string[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-drift absolute -left-32 top-0 h-[42rem] w-[42rem] rounded-full opacity-[0.16] blur-[90px]"
        style={{ background: tones[0] }}
      />
      <div
        className="animate-drift absolute right-[-10rem] top-40 h-[38rem] w-[38rem] rounded-full opacity-[0.14] blur-[90px]"
        style={{ background: tones[1], animationDelay: "-8s" }}
      />
      <div
        className="animate-drift absolute bottom-[-10rem] left-1/3 h-[34rem] w-[34rem] rounded-full opacity-[0.12] blur-[90px]"
        style={{ background: tones[2], animationDelay: "-14s" }}
      />
    </div>
  );
}

/* The breathing halo behind the hero figure — a literal "breathe in / out" cue. */
export function BreathingOrb() {
  return (
    <div className="relative grid place-items-center">
      <motion.div
        className="absolute h-[26rem] w-[26rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-teal) 45%, transparent) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[19rem] w-[19rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-sage) 55%, transparent) 0%, transparent 60%)",
        }}
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      {/* concentric guide rings */}
      <div className="animate-spin-slow absolute h-[30rem] w-[30rem] rounded-full border border-sage/20" />
      <div className="absolute h-[23rem] w-[23rem] rounded-full border border-teal/20" />
    </div>
  );
}

/* Thin animated wave divider between two sections. */
export function WaveDivider({ flip = false, color = "var(--color-sand)" }: { flip?: boolean; color?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""}`}
      style={{ height: "70px" }}
      aria-hidden
    >
      <path
        d="M0,64 C240,112 480,16 720,40 C960,64 1200,120 1440,72 L1440,120 L0,120 Z"
        fill={color}
      />
    </svg>
  );
}
