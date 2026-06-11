import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { grades, meanPre, meanPost } from "../data";

/* ----------------------------------------------------------------------------
 * GradeChart: grouped pre/post bar chart, per student, bars grow on scroll.
 * Hover a pair to read the exact scores.
 * -------------------------------------------------------------------------- */
export function GradeChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div ref={ref} className="w-full">
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Legend swatch="var(--color-faint)" label="Before (NC check-in)" />
        <Legend swatch="var(--color-sage-deep)" label="After (post-meditation)" />
        <span className="ml-auto text-xs text-muted">
          Hover a student to read their scores
        </span>
      </div>

      <div className="relative">
        {/* gridlines */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((g) => (
            <div key={g} className="flex items-center gap-2">
              <span className="w-8 text-right text-[10px] tabular-nums text-faint">
                {g}
              </span>
              <span className="h-px flex-1 bg-ink/5" />
            </div>
          ))}
        </div>

        <div className="relative ml-10 flex h-64 items-end gap-[3px] sm:gap-1.5">
          {grades.map((s, i) => (
            <div
              key={s.id}
              className="group relative flex h-full flex-1 items-end justify-center gap-[2px]"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {hover === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-2 z-20 -translate-y-full whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[11px] text-cream shadow-lg"
                >
                  <span className="font-semibold">Student {s.id}</span>{" "}
                  <span className="text-faint">·</span> {s.pre}% →{" "}
                  <span className="text-mist">{s.post}%</span>
                </motion.div>
              )}
              <motion.span
                className="w-1/2 rounded-t-[3px] bg-faint/70"
                initial={{ height: 0 }}
                animate={inView ? { height: `${s.pre}%` } : {}}
                transition={{ duration: 0.9, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="w-1/2 rounded-t-[3px]"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-sage-deep), var(--color-teal))",
                }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${s.post}%` } : {}}
                transition={{ duration: 0.9, delay: i * 0.02 + 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>
        <div className="ml-10 mt-2 flex gap-[3px] sm:gap-1.5">
          {grades.map((s) => (
            <span
              key={s.id}
              className="flex-1 text-center text-[8px] text-faint sm:text-[9px]"
            >
              {s.id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-muted">
      <span className="h-3 w-3 rounded-sm" style={{ background: swatch }} />
      {label}
    </span>
  );
}

/* ----------------------------------------------------------------------------
 * MeanCompare: the headline 62% -> 76% shift, drawn as two filling columns.
 * -------------------------------------------------------------------------- */
export function MeanCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cols = [
    { label: "Before", value: meanPre, fill: "var(--color-faint)" },
    {
      label: "After",
      value: meanPost,
      fill: "linear-gradient(to top, var(--color-sage-deep), var(--color-teal))",
    },
  ];
  return (
    <div ref={ref} className="flex items-end justify-center gap-8">
      {cols.map((c, i) => (
        <div key={c.label} className="flex flex-col items-center gap-3">
          <div className="relative flex h-52 w-20 items-end overflow-hidden rounded-2xl bg-ink/5 sm:w-24">
            <motion.div
              className="w-full rounded-2xl"
              style={{ background: c.fill }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${c.value}%` } : {}}
              transition={{ duration: 1.2, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute inset-x-0 bottom-3 text-center font-display text-xl font-semibold text-cream mix-blend-luminosity"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.25 + 0.7 }}
            >
              {c.value}%
            </motion.span>
          </div>
          <span className="text-sm font-medium text-ink-soft">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Donut: animated single-question survey breakdown.
 * -------------------------------------------------------------------------- */
const toneColor: Record<string, string> = {
  good: "var(--color-sage-deep)",
  mid: "var(--color-teal)",
  low: "var(--color-amber)",
};

export function Donut({
  question,
  segments,
}: {
  question: string;
  segments: { label: string; value: number; tone: "good" | "mid" | "low" }[];
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const R = 52;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const lead = segments[0];

  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-ink/8 bg-cream/70 p-6 backdrop-blur">
      <div className="relative">
        <svg ref={ref} viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="var(--color-sand-deep)" strokeWidth="14" />
          {segments.map((s) => {
            const len = (s.value / 100) * C;
            const el = (
              <motion.circle
                key={s.label}
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke={toneColor[s.tone]}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${len} ${C - len}`}
                initial={{ strokeDashoffset: C }}
                animate={inView ? { strokeDashoffset: -offset } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex rotate-0 flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold text-sage-ink">
            {lead.value}%
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {lead.label}
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-ink-soft">{question}</p>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: toneColor[s.tone] }} />
            {s.label} {s.value}%
          </span>
        ))}
      </div>
    </div>
  );
}

/* Horizontal "how did meditation make you feel?" bars. */
export function FeelingBars({ data }: { data: { label: string; value: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-sm font-medium text-ink-soft">{d.label}</span>
          <div className="h-7 flex-1 overflow-hidden rounded-full bg-ink/5">
            <motion.div
              className="flex h-full items-center justify-end rounded-full pr-3"
              style={{
                background: "linear-gradient(to right, var(--color-sage), var(--color-teal))",
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${d.value}%` } : {}}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[11px] font-semibold text-white/95">{d.value}%</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
