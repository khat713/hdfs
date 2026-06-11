import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Brain,
  Download,
  FileText,
  GraduationCap,
  Heart,
  Quote,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  AnimatedNumber,
  Eyebrow,
  Lift,
  Reveal,
  Stagger,
  staggerItem,
  useParallax,
  useScrollProgress,
} from "./components/primitives";
import { Aurora, BreathingOrb, Lotus, MeditatingFigure, WaveDivider } from "./components/decor";
import { Donut, FeelingBars, GradeChart, MeanCompare } from "./components/charts";
import { Lightbox } from "./components/Lightbox";
import {
  asset,
  drive,
  googleEmbed,
  googleView,
  literature,
  meta,
  participants,
  procedure,
  references,
  studentQuotes,
  surveyDonuts,
  surveyFeelings,
} from "./data";
import { motion as m } from "framer-motion";

const NAV = [
  ["Overview", "overview"],
  ["Problem", "problem"],
  ["Research", "literature"],
  ["Method", "method"],
  ["Results", "results"],
  ["Voices", "voices"],
  ["Resource", "resource"],
  ["Project", "artifacts"],
];

export default function App() {
  const scaleX = useScrollProgress();
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const open = (src: string, caption: string) => setLightbox({ src, caption });

  return (
    <div className="grain relative min-h-screen bg-cream">
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[90] h-1 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(to right, var(--color-sage-deep), var(--color-teal), var(--color-amber))",
        }}
      />
      <Nav />

      <Hero />
      <Overview open={open} />
      <Problem />
      <Literature />
      <Method open={open} />
      <Results open={open} />
      <Voices />
      <Resource open={open} />
      <Discussion />
      <Artifacts open={open} />
      <Footer />

      <Lightbox
        src={lightbox?.src ?? null}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}

/* ============================ NAV ============================ */
function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  scrollY.on("change", (v) => setSolid(v > 80));
  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        solid ? "border-b border-ink/8 bg-cream/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-sage-ink">
          <Lotus className="h-7 w-7 text-sage-deep" />
          <span className="font-display text-lg font-semibold tracking-tight">Khatmin Thant</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-ink-soft transition hover:text-sage-deep"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#artifacts"
          className="group flex items-center gap-1.5 rounded-full bg-sage-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-sage-deep"
        >
          The paper
          <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.nav>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yFig = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <Aurora />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--color-mist) 30%, transparent), transparent 60%)",
        }}
      />
      <motion.div style={{ y: yFig }} className="pointer-events-none absolute inset-0 grid place-items-center">
        <BreathingOrb />
      </motion.div>

      <motion.div
        style={{ y: yTitle, opacity }}
        className="relative mx-auto max-w-5xl px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-sage/25 bg-cream/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-sage-deep backdrop-blur"
        >
          <Sparkles size={13} /> HDFS Capstone Research · {meta.date.split(",")[1]}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Can two weeks of{" "}
          <span className="relative whitespace-nowrap text-sage-deep">
            stillness
            <UnderlineDraw />
          </span>{" "}
          <br className="hidden sm:block" />
          calm a classroom of testing?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft"
        >
          A daily meditation routine in a third-grade classroom at Carrboro
          Elementary, and what it did for reading scores, anxiety, and the way
          thirty-six eight-year-olds started their morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#overview"
            className="group flex items-center gap-2 rounded-full bg-sage-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-sage-deep/20 transition hover:bg-sage-deep"
          >
            Read the findings
            <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
          </a>
          <a
            href="#artifacts"
            className="flex items-center gap-2 rounded-full border border-ink/15 bg-cream/60 px-6 py-3 text-sm font-semibold text-ink-soft backdrop-blur transition hover:border-sage/40 hover:text-sage-deep"
          >
            <FileText size={16} /> View the poster & paper
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 text-sm text-muted"
        >
          {meta.author} &nbsp;·&nbsp; {meta.affiliation}
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-faint"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </header>
  );
}

function UnderlineDraw() {
  return (
    <svg className="absolute -bottom-3 left-0 w-full" height="14" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
      <motion.path
        d="M3 8 C 80 13, 200 2, 297 7"
        stroke="var(--color-amber)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ============================ OVERVIEW ============================ */
function Overview({ open }: { open: (s: string, c: string) => void }) {
  const stats = [
    { v: 62.21, d: 2, suf: "%", label: "Mean reading score before", tone: "muted" },
    { v: 76, suf: "%", label: "Mean reading score after", tone: "sage" },
    { v: 82.4, d: 1, suf: "%", label: "Students who’d meditate again", tone: "teal" },
    { v: 36, suf: "", label: "Third-graders in the study", tone: "amber" },
  ];
  return (
    <section id="overview" className="relative scroll-mt-20 bg-sand py-24 sm:py-32">
      <Aurora tones={["var(--color-sage)", "var(--color-mist)", "var(--color-sand-deep)"]} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>The short version</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Mean reading scores rose by nearly{" "}
            <span className="text-sage-deep">fourteen points</span>, and the room
            felt calmer doing it.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <m.div key={s.label} variants={staggerItem}>
              <Lift className="h-full rounded-3xl border border-ink/8 bg-cream/80 p-6 backdrop-blur">
                <div
                  className={`font-display text-4xl font-semibold sm:text-5xl ${
                    s.tone === "sage"
                      ? "text-sage-deep"
                      : s.tone === "teal"
                        ? "text-teal-deep"
                        : s.tone === "amber"
                          ? "text-amber-deep"
                          : "text-muted"
                  }`}
                >
                  <AnimatedNumber value={s.v} decimals={s.d ?? 0} suffix={s.suf} />
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-soft">{s.label}</p>
              </Lift>
            </m.div>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-16 grid items-center gap-10 rounded-[2rem] border border-ink/8 bg-cream/70 p-8 backdrop-blur lg:grid-cols-[1.3fr_1fr] sm:p-12">
            <div>
              <h3 className="font-display text-2xl font-semibold text-sage-ink">Abstract</h3>
              <p className="lead mt-4">
                Third-graders at Carrboro Elementary face a punishing testing
                calendar: roughly <strong>118 assessments across 180 school days</strong>.
                This project asked whether a simple, daily meditation routine could
                soften the toll. For two weeks, every class opened with a guided
                meditation. Reading scores, a teacher survey, and the students’ own
                words were collected before and after.
              </p>
              <p className="lead mt-4">
                The result: a meaningful jump in mean reading performance, a teacher
                who went from hopeful to convinced, and a class that mostly described
                the experience as <em>“calm,” “peaceful,”</em> and worth doing again.
              </p>
            </div>
            <button
              onClick={() => open(asset("figures/ces-logo.png"), "Carrboro Elementary School: “Todos los niños, todos los días”")}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-xl"
            >
              <img
                src={asset("figures/ces-logo.png")}
                alt="Carrboro Elementary School logo"
                className="mx-auto w-full max-w-xs transition group-hover:scale-[1.03]"
                loading="lazy"
              />
              <span className="mt-2 block text-center text-xs font-medium uppercase tracking-widest text-muted">
                The site · Carrboro Elementary
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PROBLEM ============================ */
function Problem() {
  const { ref, y } = useParallax(60);
  return (
    <section
      id="problem"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-sage-ink py-28 text-cream sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <motion.div style={{ y }} className="absolute -right-20 top-10">
          <MeditatingFigure className="h-[34rem] w-[34rem] text-cream" />
        </motion.div>
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow tone="cream">The problem</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
            By the end of third grade, a child here has tested almost{" "}
            <span className="text-mist">118 times.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="flex items-end gap-4">
              <span className="font-display text-[7rem] font-semibold leading-none text-mist sm:text-[10rem]">
                <AnimatedNumber value={118} />
              </span>
              <div className="mb-6 text-cream/70">
                <div className="text-lg font-medium">tests</div>
                <div className="text-sm">in 180 school days</div>
              </div>
            </div>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-cream/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber to-clay"
                initial={{ width: 0 }}
                whileInView={{ width: "66%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-3 text-sm text-cream/60">
              Days spent testing versus teaching. Roughly two of every three weeks
              touch an assessment.
            </p>
          </Reveal>

          <Stagger className="space-y-5">
            {[
              {
                icon: <Brain size={20} />,
                t: "Overtesting backfires",
                b: "Student fatigue, test anxiety, “practice effects,” and false positives all climb with every extra assessment (Brown, 2017).",
              },
              {
                icon: <Heart size={20} />,
                t: "Anxiety has a cost",
                b: "Test anxiety brings sleeplessness, lost appetite, and fear, and it is strongly and negatively tied to performance.",
              },
              {
                icon: <Users size={20} />,
                t: "A lingering pandemic",
                b: "Two years without normal social interaction left academic, social, and emotional gaps still felt in today’s third grade.",
              },
            ].map((c) => (
              <m.div
                key={c.t}
                variants={staggerItem}
                className="flex gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-5 backdrop-blur"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist/15 text-mist">
                  {c.icon}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/70">{c.b}</p>
                </div>
              </m.div>
            ))}
          </Stagger>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider color="var(--color-cream)" />
      </div>
    </section>
  );
}

/* ============================ LITERATURE ============================ */
function Literature() {
  return (
    <section id="literature" className="relative scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow tone="amber">What the research says</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            The case for a calmer classroom is already in the literature.
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {literature.map((l) => (
            <m.div key={l.authors} variants={staggerItem}>
              <Lift className="group h-full rounded-3xl border border-ink/8 bg-sand/60 p-7 transition hover:border-sage/30 hover:bg-sand">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sage/12 px-3 py-1 text-xs font-semibold text-sage-deep">
                    <BookOpen size={13} /> {l.tag}
                  </span>
                  <span className="font-display text-sm text-muted">{l.year}</span>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">“{l.finding}”</p>
                <p className="mt-5 font-display text-base font-semibold text-sage-ink">
                  {l.authors}
                </p>
              </Lift>
            </m.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ METHOD ============================ */
function Method({ open }: { open: (s: string, c: string) => void }) {
  return (
    <section id="method" className="relative scroll-mt-20 bg-sand py-24 sm:py-32">
      <Aurora tones={["var(--color-mist)", "var(--color-sage)", "var(--color-sand-deep)"]} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow tone="teal">How it ran</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Two weeks of morning meditation in one classroom.
          </h2>
        </Reveal>

        {/* participants */}
        <Reveal delay={0.05}>
          <div className="mt-14 grid gap-6 rounded-[2rem] border border-ink/8 bg-cream/70 p-8 backdrop-blur sm:grid-cols-3 sm:p-10">
            <div className="sm:col-span-1">
              <div className="font-display text-6xl font-semibold text-sage-deep">
                <AnimatedNumber value={participants.total} />
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                students in a “traditional” third-grade class, chosen through a UNC
                internship placement.
              </p>
            </div>
            <div className="sm:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-2">
              <MiniStat label="Girls" value={participants.girls} />
              <MiniStat label="Boys" value={participants.boys} />
              <div className="col-span-2 rounded-2xl bg-sand/70 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Class makeup
                </p>
                <div className="flex h-3 overflow-hidden rounded-full">
                  {[
                    ["var(--color-sage-deep)", 32],
                    ["var(--color-teal)", 2],
                    ["var(--color-amber)", 2],
                  ].map(([c, v], i) => (
                    <div key={i} style={{ background: c as string, width: `${((v as number) / 36) * 100}%` }} />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  {participants.demographics.map((d) => (
                    <span key={d.label}>{d.label} · {d.value}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* procedure timeline */}
        <div className="mt-14">
          <Reveal>
            <h3 className="mb-8 font-display text-2xl font-semibold text-sage-ink">
              The procedure
            </h3>
          </Reveal>
          <div className="relative">
            <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-sage/25 sm:left-1/2" />
            <Stagger className="space-y-8" gap={0.12}>
              {procedure.map((p, i) => (
                <m.div
                  key={p.n}
                  variants={staggerItem}
                  className={`relative flex gap-6 sm:w-1/2 ${
                    i % 2 ? "sm:ml-auto sm:flex-row" : "sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-ink font-display text-sm font-semibold text-cream sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    {p.n}
                  </div>
                  <div className={`flex-1 rounded-2xl border border-ink/8 bg-cream/80 p-5 backdrop-blur ${i % 2 ? "sm:ml-6" : "sm:mr-6"}`}>
                    <h4 className="font-display text-lg font-semibold text-ink">{p.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </m.div>
              ))}
            </Stagger>
          </div>
        </div>

        {/* assessment peek */}
        <Reveal>
          <div className="mt-16 rounded-[2rem] border border-ink/8 bg-cream/70 p-8 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-sage-ink">
                The reading assessment
              </h3>
              <span className="text-sm text-muted">Tap to enlarge</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => open(asset(`figures/assessment-${n}.png`), "Practice reading assessment, page sample")}
                  className="group overflow-hidden rounded-xl border border-ink/8 bg-white transition hover:shadow-lg"
                >
                  <img
                    src={asset(`figures/assessment-${n}.png`)}
                    alt={`Assessment page ${n}`}
                    className="h-40 w-full object-cover object-top transition group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-sand/70 p-4">
      <div className="font-display text-3xl font-semibold text-teal-deep">
        <AnimatedNumber value={value} />
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

/* ============================ RESULTS ============================ */
function Results({ open }: { open: (s: string, c: string) => void }) {
  return (
    <section id="results" className="relative scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>The results</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Scores climbed, and anxiety eased.
          </h2>
        </Reveal>

        {/* mean compare + headline */}
        <div className="mt-14 grid gap-10 rounded-[2rem] border border-ink/8 bg-sand/50 p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center sm:p-12">
          <Reveal>
            <MeanCompare />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sage/12 px-3 py-1 text-sm font-semibold text-sage-deep">
                <Sparkles size={14} /> +13.79 points
              </p>
              <p className="lead mt-4">
                The class mean on the practice reading check-in rose from{" "}
                <strong>62.21%</strong> to <strong>76%</strong>. On an individual
                level, students C, E, J, M, O, T, Z and AC each gained roughly{" "}
                <strong>30 points or more</strong>. Not every score rose, but the
                direction of the class was clear.
              </p>
            </div>
          </Reveal>
        </div>

        {/* full per-student chart */}
        <Reveal>
          <div className="mt-8 rounded-[2rem] border border-ink/8 bg-sand/50 p-6 sm:p-10">
            <h3 className="mb-2 font-display text-2xl font-semibold text-sage-ink">
              Every student, before & after
            </h3>
            <p className="mb-8 max-w-2xl text-sm text-ink-soft">
              Each pair compares a student’s last NC reading check-in with their
              post-meditation practice assessment.
            </p>
            <GradeChart />
            <div className="mt-6 text-right">
              <button
                onClick={() => open(asset("figures/grade-table.png"), "Per-student pre/post reading scores (full data table)")}
                className="text-sm font-medium text-teal-deep underline-offset-4 hover:underline"
              >
                See the full data table →
              </button>
            </div>
          </div>
        </Reveal>

        {/* surveys */}
        <Reveal>
          <h3 className="mb-2 mt-16 font-display text-2xl font-semibold text-sage-ink">
            What the students said
          </h3>
          <p className="mb-8 max-w-2xl text-sm text-ink-soft">
            A six-question post-survey gathered the qualitative side of the story.
          </p>
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {surveyDonuts.map((d) => (
            <m.div key={d.question} variants={staggerItem}>
              <Donut question={d.question} segments={d.segments} />
            </m.div>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-6 grid gap-8 rounded-[2rem] border border-ink/8 bg-sand/50 p-8 lg:grid-cols-[1.1fr_1fr] sm:p-10">
            <div>
              <h4 className="mb-5 font-display text-lg font-semibold text-sage-ink">
                “How did the meditation make you feel?”
              </h4>
              <FeelingBars data={surveyFeelings} />
            </div>
            <div className="flex flex-col justify-center gap-4 rounded-2xl bg-sage-ink p-7 text-cream">
              <Quote size={28} className="text-mist" />
              <p className="font-display text-xl leading-relaxed">
                The teacher moved from a 4/5 confidence rating to fully convinced,
                and planned to run meditation again before the End-of-Grade exam.
              </p>
              <div className="mt-2 flex gap-3">
                {["teacher-presurvey", "teacher-postsurvey"].map((f, i) => (
                  <button
                    key={f}
                    onClick={() => open(asset(`figures/${f}.png`), i ? "Teacher post-intervention survey" : "Teacher pre-intervention survey")}
                    className="flex-1 rounded-xl border border-cream/15 bg-cream/5 px-3 py-2 text-xs font-medium text-cream/80 transition hover:bg-cream/10"
                  >
                    {i ? "Post-survey →" : "Pre-survey →"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ VOICES ============================ */
function Voices() {
  const col = (arr: string[], dir: number) => (
    <div className="flex flex-col gap-4">
      {arr.map((q, i) => (
        <Reveal key={i} y={20} delay={i * 0.04}>
          <div className="rounded-2xl border border-ink/8 bg-cream p-5 shadow-sm">
            <Quote size={18} className="mb-2 text-sage/60" />
            <p className="text-[15px] leading-relaxed text-ink-soft">{q}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
  const a = studentQuotes.filter((_, i) => i % 2 === 0);
  const b = studentQuotes.filter((_, i) => i % 2 === 1);
  return (
    <section id="voices" className="relative scroll-mt-20 overflow-hidden bg-sand py-24 sm:py-32">
      <Aurora tones={["var(--color-sage)", "var(--color-mist)", "var(--color-amber)"]} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow tone="amber">In their words</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            What the third-graders made of it.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Unedited responses from the open-ended student survey, honest and
            sometimes funny.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {col(a, 1)}
          {col(b, -1)}
        </div>
      </div>
    </section>
  );
}

/* ============================ RESOURCE ============================ */
function Resource({ open }: { open: (s: string, c: string) => void }) {
  const { ref, y } = useParallax(40);
  return (
    <section id="resource" ref={ref} className="relative scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <Eyebrow tone="teal">The deliverable</Eyebrow>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            A take-home resource for families.
          </h2>
          <p className="lead mt-5">
            Beyond the classroom routine, the project produced a printable
            mindfulness guide for parents, with{" "}
            <strong>QR codes</strong> linking to a meditation playlist and a
            plain-language explainer on why it helps. It is built so a calmer
            morning can travel home, including for the school’s many dual-language
            families.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Step-by-step mindfulness exercises for home",
              "QR code → guided meditation playlist on YouTube",
              "QR code → parent explainer on the benefits",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-deep" />
                {t}
              </li>
            ))}
          </ul>
          <button
            onClick={() => open(asset("figures/resource-handout.png"), "Mindfulness & Meditation: the take-home family resource")}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sage-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-sage-deep"
          >
            View the full resource
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Reveal>

        <motion.div style={{ y }}>
          <Lift>
            <button
              onClick={() => open(asset("figures/resource-handout.png"), "Mindfulness & Meditation: the take-home family resource")}
              className="group relative block w-full"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sage/20 via-teal/20 to-amber/20 blur-2xl" />
              <img
                src={asset("figures/resource-handout.png")}
                alt="Mindfulness and Meditation take-home resource"
                className="relative w-full rounded-2xl border border-ink/8 shadow-2xl transition group-hover:scale-[1.01]"
                loading="lazy"
              />
            </button>
          </Lift>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================ DISCUSSION ============================ */
function Discussion() {
  return (
    <section className="relative scroll-mt-20 bg-sage-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow tone="cream">What it means</Eyebrow>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Implications
            </h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              Even setting test scores aside, the qualitative results lean toward
              success. This echoes Müller et al. (2021), who found that short
              mindfulness breaks support attention and reading comprehension. The
              intervention could scale beyond one classroom to reduce stress and
              anxiety more broadly, and similar resources could reach other
              testing-age students.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="cream">Kept honest</Eyebrow>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Limitations
            </h2>
            <ul className="mt-5 space-y-3 text-cream/80">
              {[
                "One classroom of about 36 students in a school of about 500, so a broader rollout would strengthen the findings.",
                "A two-week window; many students felt it “kind of” worked given the short runway.",
                "No student pre-survey, and absences left several scores out of the analysis.",
                "Morning vs. afternoon meditation across the two classes adds an energy-level confound.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mist" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 rounded-[2rem] border border-cream/12 bg-cream/5 p-8 backdrop-blur sm:p-12">
            <h3 className="font-display text-2xl font-semibold text-mist">Conclusion</h3>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-cream/85">
              Bringing meditation into the classroom shows real potential to lift
              academic scores while lowering anxiety and stress. Paired with a
              take-home resource, that calm can extend to families, which helps
              students steady themselves before, during, and after the tests that
              fill their year. Any continuation should build resources for the many households
              that don’t speak English first.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Live Google preview of the real paper & poster, embedded straight from Drive. */
function DocPreview() {
  const tabs = [
    { id: "paper", label: "Research paper", driveId: drive.paper, kind: "doc" as const },
    { id: "poster", label: "Research poster", driveId: drive.poster, kind: "file" as const },
  ];
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="mt-10 overflow-hidden rounded-[2rem] border border-ink/8 bg-sand/40 p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 px-2 pt-2">
        <div className="flex rounded-full bg-cream p-1 shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active.id === t.id ? "text-cream" : "text-ink-soft hover:text-sage-deep"
              }`}
            >
              {active.id === t.id && (
                <motion.span
                  layoutId="docpill"
                  className="absolute inset-0 rounded-full bg-sage-ink"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 text-xs font-medium text-muted sm:flex">
          <Sparkles size={13} className="text-sage-deep" /> Live Google preview
        </span>
        <a
          href={googleView(active.driveId, active.kind)}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-teal-deep transition hover:underline"
        >
          Open full screen <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-inner sm:aspect-[16/10]">
        <iframe
          key={active.id}
          title={active.label}
          src={googleEmbed(active.driveId, active.kind)}
          className="h-full w-full border-0"
          loading="lazy"
          allow="autoplay"
        />
      </div>
    </div>
  );
}

/* ============================ ARTIFACTS ============================ */
function Artifacts({ open }: { open: (s: string, c: string) => void }) {
  return (
    <section id="artifacts" className="relative scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>The project itself</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
Read the full paper and poster.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            A live preview of the actual documents. Page through the real poster
            and paper right here, or download the originals below.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <DocPreview />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* paper */}
          <Reveal>
            <Lift className="flex h-full flex-col justify-between rounded-[2rem] border border-ink/8 bg-sand/50 p-8">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sage/15 text-sage-deep">
                  <FileText size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                  The research paper
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Full APA write-up covering the problem statement, literature
                  review, methods, results, discussion, and appendices. EDUC 698,
                  advised by{" "}
                  {meta.advisor}.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={googleView(drive.paper, "doc")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-sage-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-sage-deep"
                >
                  <BookOpen size={15} /> Read the paper
                </a>
                <a
                  href={asset("docs/meditation-research-paper.docx")}
                  className="flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-sage/40 hover:text-sage-deep"
                >
                  <Download size={15} /> .docx
                </a>
              </div>
            </Lift>
          </Reveal>

          {/* poster */}
          <Reveal delay={0.08}>
            <Lift className="flex h-full flex-col justify-between rounded-[2rem] border border-ink/8 bg-sand/50 p-8">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/15 text-teal-deep">
                  <GraduationCap size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                  The research poster
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  The capstone poster presented at the UNC School of Education,
                  with its introduction, methods, results, and the take-home
                  resource at a glance.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={googleView(drive.poster, "file")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-teal-deep px-5 py-2.5 text-sm font-semibold text-cream transition hover:opacity-90"
                >
                  <ArrowUpRight size={15} /> Open poster
                </a>
                <a
                  href={asset("docs/meditation-poster.pptx")}
                  className="flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-teal/40 hover:text-teal-deep"
                >
                  <Download size={15} /> .pptx
                </a>
              </div>
            </Lift>
          </Reveal>
        </div>

        {/* figure gallery */}
        <Reveal>
          <h3 className="mb-6 mt-16 font-display text-xl font-semibold text-sage-ink">
            Figures & appendices
          </h3>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[
            ["grade-chart", "Pre vs. post reading scores"],
            ["grade-table", "Per-student data table"],
            ["student-survey", "Student survey results"],
            ["resource-handout", "Take-home resource"],
            ["teacher-presurvey", "Teacher pre-survey"],
            ["teacher-postsurvey", "Teacher post-survey"],
            ["assessment-1", "Reading assessment"],
            ["ces-logo", "Carrboro Elementary"],
          ].map(([f, c]) => (
            <m.button
              key={f}
              variants={staggerItem}
              onClick={() => open(asset(`figures/${f}.png`), c)}
              className="group overflow-hidden rounded-2xl border border-ink/8 bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={asset(`figures/${f}.png`)}
                  alt={c}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="px-3 py-2.5 text-left text-xs font-medium text-ink-soft">{c}</p>
            </m.button>
          ))}
        </Stagger>

        {/* references */}
        <Reveal>
          <details className="mt-14 rounded-2xl border border-ink/8 bg-sand/40 p-6">
            <summary className="cursor-pointer font-display text-lg font-semibold text-sage-ink">
              References
            </summary>
            <ol className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-soft">
              {references.map((r) => (
                <li key={r} className="border-l-2 border-sage/30 pl-4">{r}</li>
              ))}
            </ol>
          </details>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sage-ink py-16 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Lotus className="h-10 w-10 text-mist" />
          <h2 className="max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
            {meta.title}
          </h2>
          <p className="text-cream/70">
            {meta.author} · {meta.course}
          </p>
          <p className="max-w-xl text-sm text-cream/55">
            {meta.affiliation} · Advised by {meta.advisor} · {meta.date}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/khat713"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/20 px-5 py-2 text-sm font-medium transition hover:bg-cream/10"
            >
              GitHub
            </a>
            <a
              href="#top"
              className="rounded-full bg-cream px-5 py-2 text-sm font-medium text-sage-ink transition hover:bg-mist"
            >
              Back to top ↑
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          Built to share research. © {new Date().getFullYear()} {meta.author}.
        </div>
      </div>
    </footer>
  );
}
