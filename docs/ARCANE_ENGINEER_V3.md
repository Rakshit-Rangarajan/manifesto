# The Arcane Engineer — agreed V3 overhaul

## Creative direction (October 28, 2026)
Sci-fi engineering with a hint of magic. Prioritize engineering credibility and readability over spectacle. Preserve approved portfolio copy, including **“I am lazy, so I automate”**. Position the owner as an AI solutions architect and problem solver, not a generic full-stack developer.

## Signature experience
- **RR Reveal:** short, skippable light-assembly of the initials, with reduced-motion bypass; no blocking preloader.
- **Neural Core:** one cinematic interactive hero centerpiece, glowing violet runes and electric-blue energy, with subtle pointer parallax and a lightweight mobile fallback.
- Hero copy: **“Engineering the impossible”**, supported by the cursive accent **“where logic meets a little magic”**.
- Projects: particle-materializing cards, but prioritize **three substantive engineering case studies early** and keep interactions simple and accessible.
- Experience: constellation timeline with accessible linear fallback.

## Site-wide principles
- Unified design tokens, coordinated dark/light palettes, typography and spacing; avoid unrelated color changes between sections.
- Keep the multilingual brush-lettered name and guarantee full glyph visibility at all viewport sizes.
- Keep navigation visible on desktop; maintain clear focus, contrast, touch targets and reduced-motion support.
- Preserve existing approved phrases and functioning features. NeuralForge remains **Coming Soon**, without public source-code links.
- Remove the unnecessary bottom loader after identifying its actual component; no loading overlay that blocks content.
- Address Three.js animation lifecycle and resource cleanup; avoid layout shifts and expensive continuous animations offscreen.

## Implementation sequence
1. Audit current page/component architecture, dependencies, performance and existing visual inconsistencies; inventory approved copy.
2. Establish Arcane design tokens, type scale, section system, navigation, responsive breakpoints and light/dark variants.
3. Implement RR Reveal and Neural Core with fallback/reduced-motion handling.
4. Rebuild hero and early case studies; redesign remaining sections and constellation timeline while preserving content.
5. Add restrained transitions and remove unnecessary loader; verify performance, accessibility, five-language text fit and browser responsiveness.
6. Run automated tests and manual visual QA; preview in Vercel, review before merge to **v2**. Do not update **main** without explicit approval. Avoid unnecessary deployments.

## Acceptance gates
- No cropped characters or words in English, Japanese, Hindi, Tamil, Kannada on mobile/tablet/desktop.
- No forced waiting for intro; all content keyboard-accessible and usable with reduced motion.
- Cohesive visual identity from hero to footer in both themes.
- Core content and links preserved; no NeuralForge source links.
- Performance, browser tests and review completed before promotion.

Status: Plan restored and isolated on feature branch; implementation and tests pending.
