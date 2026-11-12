# EVO — anime portfolio rebuild

Branch: `evo`, based on `v2`. Production is untouched.

## Implemented
- Replaced the home route with a fresh responsive Next.js portfolio.
- Dark and light themes, mobile bottom navigation, mobile menu.
- Sections: Hero, About, Projects (search/filter), Skills, Experience, AI Laboratory, Education, Contact.
- Reused verified links and biographical information from `data/portfolio.ts`.
- Custom brush-script approximation using Kaushan Script (loaded via Google Fonts); the reference's rendered lettering is not a distributable font.
- Accessibility: semantic landmarks, labeled controls, reduced-motion fallback.

## Asset integration required
The approved design package is available in the conversation as `Rakshit_Portfolio_Assets_and_Design.zip`. Its binary image contents have **not** been committed by the GitHub text connector. Upload these two reference images to:
- `public/evo/hero-dark.png` from `hero/dark-reference.png`
- `public/evo/hero-light.png` from `hero/light-reference.png`

These source references contain flattened UI lettering, so for a production-quality hero, crop/extract the character and scenery as background-only assets and keep all text and controls as DOM elements. Current CSS includes gradients as graceful fallbacks until assets are present.

Other approved mockups are visual references, not components; convert them into editable cards and responsive sections rather than displaying full screenshots.

## Verification still needed
- Install dependencies and run `npm run build`, `npm run lint`, and `npm run test:portfolio`.
- Desktop and mobile Playwright visual/interaction checks.
- Validate project URLs, public statuses and all numeric claims before publication.
- Configure preview deployment for branch `evo`; do not deploy to production automatically.
