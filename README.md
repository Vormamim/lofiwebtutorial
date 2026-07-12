# LoFiWeb Tutorial

A **self-paced web development course inside an IDE**, in a dark-academia
dress. Part of the Vormamim NSW HSC Software Engineering family (alongside
*LoFiWeb*, *LoFiGameLab* and the *SQL & Secure Software* course). Students aged
14-15 work through **four courses of ten lessons each** — theory in plain
English, one idea at a time — and finish with a **50-minute practical
examination**. Everything runs in the browser with no accounts and no external
requests, so it works offline, behind school firewalls, and on GitHub Pages.

## Pages

| File | What it is |
|---|---|
| `index.html` | Landing page — begin the course, see progress, or sit the exam |
| `ide.html` | The IDE: three editors, live VormWeb preview + console, the **Lessons** slide-out and tutor modal |
| `progress.html` | Progress report: per-lesson status, effort statistics, teacher notes, downloadable report |
| `exam.html` | The practical examination: 8 questions, 40 marks, 50-minute countdown, provenance-stamped downloads |

## How the course works

- The **Lessons** slide-out lists all four courses. Clicking a lesson opens a
  **tutor modal**: small theory pages (Back/Next) ending in a *Your task* page.
- Every task demands the student's **own content** — sample code can be loaded,
  but a completion check fails if the final work is nearly identical to it.
- The task page shows a **live checklist** (e.g. "a bullet list with three
  items"). All checks pass — the lesson is complete. Progress is stored in
  `localStorage`.

## Effort tracking (read this bit, teachers)

While a lesson is active the IDE records typed vs pasted characters, largest
single paste, active minutes and preview runs. On completion it evaluates
advisory flags:

- **Mostly pasted** — most of the final code arrived via paste
- **Matches sample** — the "own work" is a near-copy of the example
- **Untaught syntax** — the code uses constructs this course never teaches
  (arrow functions, template literals, `querySelector`, `fetch`, ... — the
  classic signature of pasted AI answers)
- **One shot** — checks passed after a single large paste with almost no editing

Flags never block completion. They appear on the progress page and in the
downloadable report as conversation starters. Be honest with your class about
the limits: this is all client-side, and a determined student can clear
`localStorage` — the flags raise the effort bar and give you signals, not proof.
The strongest evidence remains talking to the student about their code.

## The examination

`exam.html` runs the eight-question practical (from the original `exam.md`):
independent questions, per-question self-check lists, and a countdown that
survives page reloads. **Save question** downloads a single self-contained
`.html` whose footer comment carries a provenance record — typed/pasted
percentages, minutes, run count and a checksum — so markers see how the code
was produced.

## Run it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Build a distributable / deploy

```bash
bash tools/build_dist.sh          # assembles dist/
```

Deploy to **GitHub Pages**: push, then Settings - Pages - deploy from `main`
(root). `.nojekyll` is included; `dist/` is git-ignored.

## Editing content (teacher notes)

- **Lessons:** `js/lessons.js` — plain data. Each lesson:
  `{ id, title, goal, pages: [markdown], sample: {html,css,js}|null, task, checks }`.
  Check types: `{ html: "css selector", min }`, `{ css: "regex" }`,
  `{ js: "regex", min }`, `{ differs: true }`.
- **Exam:** the `window.EXAM` block at the bottom of `js/lessons.js`.
- **Engine:** `js/progress.js` (checker, telemetry, flags, report) — the flag
  thresholds live near the top and are deliberately easy to tune.
