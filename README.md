# David Korir — Personal Portfolio

A refinement of the existing React portfolio, preserving its charcoal, red and
amber identity, biography, experience, education, security section and contact
links. Development stays on `feature/portfolio-redesign`. `main` and `production`
remain unchanged at `41ba4455b0d2e9b13d0ed61d399a1f7bd908026b`.

## Local review

Use Node.js 22.12 or newer (CI uses Node.js 24). From an existing clone:

```bash
git status
git fetch origin
git switch feature/portfolio-redesign
git pull --ff-only origin feature/portfolio-redesign
npm ci
npm run dev
```

If the branch does not exist locally, use
`git switch --track origin/feature/portfolio-redesign` instead. Preserve any
uncommitted local work before switching. The development URL is
`http://localhost:5173/`.

For a fresh clone:

```bash
git clone --branch feature/portfolio-redesign https://github.com/davaicoop/david-korir-portfolio.git
cd david-korir-portfolio
npm ci
npm run dev
```

## Validation

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite checks 1440, 1280, 1024, 768, 430, 390, 375 and 360px layouts,
all five case studies, image loading, public link targets, contact validation,
keyboard dialogs, mobile menu focus, theme persistence, section refreshes,
storage failure, reversible motion and reduced motion. Screenshots are retained
in `test-results/`; the GitHub Actions `portfolio-browser-review` artifact also
contains the browser report and responsive screenshots. No real emails are sent.

## Project showcase

Project descriptions and stacks come from the repositories, not guessed claims.
Data, cards, links and dialogs are separate modules under `src/data` and
`src/components`.

| Project | Verified source | Live / access |
| --- | --- | --- |
| BNB Manager | `davaicoop/bnb-manager` | https://davaicoop-bnb-manager.onrender.com/ — account required; private source |
| BVK Adult Foster Care | `davaicoop/bvk-adult-foster-care` | https://bvk-adult-foster-care-0k12.onrender.com/ — public website; private source |
| DAVAI Automation | `davaicoop/davai-automation`, `feature/automation-agency-mvp` | Current deployment requires invited access; public source is linked |
| David Korir Portfolio | `davaicoop/david-korir-portfolio` | https://david-korir-portfolio.onrender.com/ — existing production version |
| Internal Service Ordering Platform | Existing portfolio experience | Enterprise work; no public repository or demo |

Private repositories are identified explicitly with their correct repository
addresses in the case study. Public visitors are offered a code walkthrough
request rather than a GitHub button that would appear as a 404 without access.
DAVAI's workflow examples are illustrative; its server audit endpoint validates
and stores requests. No connected CRM, messaging service or customer metrics
are claimed. The earlier `blue-vervian-kindred` repository is a related BVK
prototype, so it is not presented as a separate flagship product.

## Performance and accessibility

- Real project screenshots use local 560px / 1008px WebP variants, lazy loading,
  explicit dimensions and descriptive alternative text. Provenance is in
  `public/projects/README.md`; the DAVAI asset is a labelled project illustration.
- The existing DM Sans and Space Grotesk fonts are served locally as WOFF2 with
  `font-display: swap`. SIL Open Font License files are included.
- GSAP / ScrollTrigger load separately after the initial render. Content and
  navigation stay available if motion cannot load.
- A passive scroll listener updates progress through one animation frame. React
  state changes only when the active section changes, avoiding a full app render
  on every scroll frame. Listeners and animations are cleaned up on unmount.
- Reduced-motion mode displays complete content. Dialogs trap focus, support
  Escape, and restore the original trigger. Mobile navigation supports keyboard
  focus and dismissal. All project actions are visible on touch devices.
- Animated skill indicators are decorative. No unsupported numerical proficiency
  ratings are presented.

The contact form prepares a `mailto:` draft in the visitor's email app; it has no
backend and does not automatically send or store a message. Existing biography
and experience dates are preserved. There was no CV download or resume file in
the current production or feature branch, so no fabricated CV is introduced.

Do not merge this branch into `main` or `production` automatically, or change the
live Render portfolio service to this branch. Review it locally first.
