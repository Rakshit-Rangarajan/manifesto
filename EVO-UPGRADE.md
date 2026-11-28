# Evo upgrade checklist

Branch: `evo` only. Preserve production, deployment method, anime hero and opt-in Potter mode.

## Phase 1 — Performance (in progress)
- [x] Client-side project navigation and search feedback (`4c97e47`).
- [x] Adaptive ambient particles and visibility gating (`815ce5e`).
- [x] Nearby cinematic artwork loading (`42698eb`).
- [x] Hidden-tab scroll loop suspension (`dd80691`).
- [x] Batch scroll geometry reads before style writes; reset mobile travel (`3aaf927`).
- [x] Reduce mobile backdrop filters (`50fa56c`).
- [x] Verify both hero PNGs exist on evo and replace 15 raw GitHub URL references with same-origin public paths (`fda9975`).
- [ ] Measure hero dimensions/bytes and generate responsive formats when binary tooling is available.
- [x] Pause multilingual name scramble offscreen/in hidden tabs and respect live reduced-motion preference (`3671e78`).
- [ ] Audit remaining lazy assets and reduced-motion behavior.
- [ ] Build and measure performance; no benchmark claimed yet.

## Remaining phases
- [ ] 2 — Visual consistency across anime hero, light/dark and opt-in Potter mode.
- [ ] 3 — Mobile/tablet navigation and accessibility.
- [ ] 4 — Flagship project architecture, evidence, links and concise AI positioning.
- [ ] 5 — Weather, music and personalization reliability.
- [ ] 6 — Build, unit tests, Playwright, links/contact (no real messages), SEO and Lighthouse across devices.

## 2026-11-27 progress
Source inspection and GitHub writes confirmed. Runtime build, browser tests and performance measurements not yet verified. Next: inspect local hero assets and remaining motion CSS before changing asset references.

### 19:16 IST cycle
Verified both hero PNG blob references on evo before changing CSS. Same-origin paths follow the existing public asset convention; static-export subpath behavior and actual network requests still need browser verification. No image compression, build or benchmark claimed. Next: inspect remaining motion and responsive asset options, then visual consistency.

### 20:19 IST cycle
- [x] Expose hero visibility to CSS and suspend residual halo/weather animation loops offscreen or in hidden tabs (`5cb5dc7`, `f935158`).
- [x] Disable ambient CSS animations and transitions for reduced-motion users.
- [ ] Responsive image compression and remaining lazy asset audit still pending; no binary processing or runtime measurements performed in this cycle.
Next: inspect responsive asset generation options and remaining chapter motion; then phase 2.

### 22:23 IST cycle
- [x] Remove duplicate portrait nodes and asset assignment from fixed cinematic stage; existing CSS already hid these layers. Remove obsolete artwork URLs and persistent compositing hints (`dea2e8a`, `614e8b0`, `a7ac7f9`).
- [ ] Responsive binary image processing and runtime verification remain pending. Next: proceed with phase 2 source improvements while retaining these verification items.

### 2026-11-28 00:25 IST cycle — Phase 2
- [x] Remove competing minimal stylesheet section gradient; chapter transition stylesheet owns the canvas. Blend hobbies into adjacent sections and use theme foreground/accent tokens for headings and leads (`4b9b6c6`).
- [ ] Verify visual contrast and chapter continuity in light, dark and opt-in Potter modes in browser. No runtime verification or production deployment performed.
Next: audit theme-specific overrides and mobile hero clipping; responsive image processing and build benchmarks remain open.

### 2026-11-28 02:17 IST cycle
- [x] Remove fixed mobile hero height cap at <=600px; use stable viewport minimum and allow content growth (`7c5f4b9`).
- [ ] Verify actual hero layout on short screens, zoomed text and all themes; runtime testing not performed.

### 2026-11-28 03:20 IST cycle
- [x] Extend flexible hero height to tablet widths (601–900px); keep About content fully opaque at mobile/tablet widths (`416e439`).
- [ ] Verify tablet landscape, text zoom and theme contrast in browser. Source changes only; build and runtime checks remain pending.

### 2026-11-28 07:23 IST cycle — Phase 3
- [x] Increase navigation target heights to 44px, account for mobile bottom safe area and add inset theme-specific keyboard focus rings (`4166fd7`).
- [ ] Verify narrow-screen target widths, landscape scrolling, focus visibility and safe-area overlap in browser; no runtime tests executed.

### 2026-11-28 09:23 IST cycle — Phase 3
- [x] Prevent mobile navigation targets shrinking below 44px width; allow horizontal scrolling when items exceed available width (`00dd9c5`).
- [ ] Verify narrow viewport scrolling, keyboard focus and touch target dimensions in browser. Source change only; no runtime tests executed.

### 2026-11-28 12:16 IST cycle — Phase 4
- [x] Inspect actual Evo homepage component and clarify AERO, Pantheon and Mnemosyne architecture flows; qualify the headline productivity figure as reported internal POC improvement; align hero overline with AI solutions positioning (`900a771`).
- [ ] Verify repository evidence, project links and rendered case studies; no build or browser tests executed. Next: evidence/link audit, then phase 5.

### 2026-11-28 13:19 IST cycle — Phase 4
- [x] Verify repository visibility via GitHub metadata: AERO-BM, NeuralForge, Mnemosyne, Ouroboros, The-Office and Project-Athena are private; SayCymraeg is public. Remove private repository CTAs from homepage and case-study routes while retaining public source and case studies (`1b182f4`, `b7f8b58`).
- [ ] Verify rendered links, README evidence and demo availability; no build or browser tests executed. Next: phase 5 weather/music reliability, with evidence and runtime checks retained.

### 2026-11-28 16:24 IST cycle — Phase 5
- [x] Inspect ambient and audio components; bound weather fetches to 10 seconds, prevent overlapping requests, skip hidden tabs, refresh on visibility, abort on unmount and isolate cache failures (`c4adfb9`).
- [ ] Verify offline, timeout, malformed cache and visibility behavior in browser. Next: audio scheduling and preference persistence. No runtime tests executed.


### 2026-11-28 19:24 IST cycle — Phase 5
- [x] Resolve audio component via Evo homepage imports; guard concurrent starts and stale resume attempts, disconnect old audio buses on stop, reset scheduling on visibility changes, retry gesture unlock and persist mute preference with optional storage (`f0964f0`).
- [ ] Browser verification of autoplay, rapid toggles, hidden tabs and reload persistence; inspect theme preference handling next. No runtime tests executed.
