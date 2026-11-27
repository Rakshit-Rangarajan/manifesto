# Evo upgrade checklist

Branch: `evo` only. Preserve production, deployment method, anime hero and opt-in Potter mode.

## Phase 1 — Performance (in progress)
- [x] Client-side project navigation and search feedback (`4c97e47`).
- [x] Adaptive ambient particles and visibility gating (`815ce5e`).
- [x] Nearby cinematic artwork loading (`42698eb`).
- [x] Hidden-tab scroll loop suspension (`dd80691`).
- [x] Batch scroll geometry reads before style writes; reset mobile travel (`3aaf927`).
- [x] Reduce mobile backdrop filters (`50fa56c`).
- [ ] Audit hero image hosting, dimensions and responsive formats; verify assets before replacing URLs.
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
