import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ----------------------------------------------------------------------------
 * Reveal — fades + slides children in the first time they enter the viewport.
 * -------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered container + item helpers */
export function Stagger({
  children,
  className = "",
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ----------------------------------------------------------------------------
 * AnimatedNumber — counts up to `value` when scrolled into view.
 * -------------------------------------------------------------------------- */
export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(value * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------------
 * useParallax — maps page scroll to a translateY for a given element.
 * -------------------------------------------------------------------------- */
export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

/* Section eyebrow label */
export function Eyebrow({
  children,
  tone = "sage",
}: {
  children: ReactNode;
  tone?: "sage" | "amber" | "teal" | "cream";
}) {
  const tones: Record<string, string> = {
    sage: "text-sage-deep",
    amber: "text-amber-deep",
    teal: "text-teal-deep",
    cream: "text-mist",
  };
  return (
    <div className={`mb-4 flex items-center gap-3 ${tones[tone]}`}>
      <span className="h-px w-8 bg-current opacity-50" />
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em]">
        {children}
      </span>
    </div>
  );
}

/* A soft progress-linked motion value for the floating reading bar */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return scaleX;
}

/* Magnetic-ish hover lift used on cards */
export function Lift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rx = useSpring(mvY, { stiffness: 200, damping: 18 });
  const ry = useSpring(mvX, { stiffness: 200, damping: 18 });

  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        mvX.set(px * 8);
        mvY.set(-py * 8);
      }}
      onMouseLeave={() => {
        mvX.set(0);
        mvY.set(0);
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
