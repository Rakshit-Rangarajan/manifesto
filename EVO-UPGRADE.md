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
