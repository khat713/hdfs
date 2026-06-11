# Effects of Meditation on Student Academic Performance & Behavior

An interactive research site for my final **HDFS** capstone (EDUC 698 · Internship
in Human Development and Family Science) at the **UNC Chapel Hill School of
Education**, advised by Dr. Kara Hume.

After student teaching a third-grade classroom at Carrboro Elementary School, I
ran a two-week daily meditation intervention and measured its effect on reading
scores, test anxiety, and classroom behavior. This site tells that story — the
problem of overtesting, the literature, the method, and the results — with the
real data, figures, student voices, and the take-home family resource I built.

**Live site:** https://khat713.github.io/hdfs/

## Highlights

- Mean reading scores rose from **62.21% → 76%** over two weeks.
- **82.4%** of students said they’d meditate again.
- A printable, QR-coded mindfulness resource for families.

## Tech

- **Vite + React + TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — scroll-linked parallax, reveal-on-scroll, animated counters
  and charts
- Custom SVG data visualizations (no chart library)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to
GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** once.

## Project files

The original deliverables are embedded **live** on the site as Google previews —
visitors can flip through the real documents in-page (the same approach used on
alums-declassified):

- **Research paper** — the full APA write-up (Google Doc)
- **Research poster** — the capstone poster (PowerPoint in Drive)

Downloadable copies also live in `public/assets/docs/`
(`meditation-research-paper.docx`, `meditation-poster.pptx`).

> The embeds rely on the Drive files staying shared as **“Anyone with the link.”**
> If a preview ever shows a sign-in wall, re-check the sharing setting on that file.

---

© Khatmin Thant. Research conducted at Carrboro Elementary School.
