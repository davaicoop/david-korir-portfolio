# David Korir — Personal Portfolio

A scroll-driven personal portfolio for **David Kipngetich Korir**, built by updating the existing BVK portfolio codebase in place.

## Stack
- React 19
- Vite 8
- React Router dependency retained from the original project
- GSAP + ScrollTrigger for reversible scroll-linked animation

## Experience
- Navy / charcoal foundation and one amber accent, with a retained light theme
- Scroll progress indicator and active section navigation
- Responsive sticky navigation with mobile menu
- Dark / light mode persisted in localStorage
- Scroll-scrubbed hero, staged project cards, data-backed skill meters and SVG experience timeline
- Reduced-motion mode with all content immediately visible
- Keyboard-accessible project dialogs with focus trapping, Escape and focus restoration
- Skill groups preserving the existing proficiency values
- Working contact form that prepares a `mailto:` message without pretending a backend exists
- BVK live and GitHub links
- SEO metadata

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Intentional placeholders
Replace these when available:
- Huawei start/end dates
- Expected graduation year
- Exact Huawei certificate names
- Exact Coursera certificate names
- BNB Manager repository URL
- Founder Projects repository URL
- LinkedIn URL
- Deployed portfolio URL

The BVK live website and BVK repository are already connected to their provided URLs.

## Safely test the redesign

Work only on `feature/portfolio-redesign`. David confirmed production commit
`41ba4455b0d2e9b13d0ed61d399a1f7bd908026b` as the known-good version.
Do not modify or merge into `production` or `main`.

From an existing clone, first run `git status`. If there are uncommitted changes,
preserve them before switching branches; do not reset or discard them.

```bash
git fetch origin
git switch feature/portfolio-redesign
git pull --ff-only origin feature/portfolio-redesign
npm ci
npm run dev
```

If the feature branch does not yet exist locally, use
`git switch --track origin/feature/portfolio-redesign` instead of the switch above.

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers desktop and three responsive widths, dialog keyboard
navigation, theme persistence, contact validation, scroll reversibility and
reduced motion. A successful build does not replace a visual review.

Manual review: scroll down and back up; test all project buttons and the BVK
links; switch themes; test mobile navigation; use Tab / Shift+Tab / Escape;
enable reduced motion; prepare an email and confirm the email app opens.
The contact form has no backend and does not send or store submissions.
Project illustrations are labelled concept schematics, not product screenshots.
Existing biography, dates, project descriptions, URLs and skill values were
preserved; factual updates remain the owner's decision.

Do not point the live customer Render service at this feature branch. Test
locally or use a separate preview service; production promotion is David's task.
