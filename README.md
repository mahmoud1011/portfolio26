# Mahmoud Anwar — Portfolio

Unity Gameplay Programmer portfolio. Built with Next.js 15, TypeScript, Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## Stack

- **Framework:** Next.js 15 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS layers
- **Icons:** Lucide React
- **Deployment:** GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Production build

```bash
npm run build
```

Output is in `./out/` — ready for static hosting.

## Deployment

Push to `main` branch. GitHub Actions builds and deploys automatically to `https://mahmoud1011.github.io/portfolio/`.

### One-time GitHub setup required:

1. Go to **Settings → Pages**
2. Set Source to **GitHub Actions**
3. Push to `main` — the workflow handles the rest

## Updating content

All content lives in `src/content/`:

| File | What it controls |
|---|---|
| `projects.ts` | Project case studies, tech tags, links |
| `experience.ts` | Work history ribbon |
| `skills.ts` | Technical skills by domain |
| `meta.ts` | SEO metadata, contact links |

## Adding project images

Place images in `public/images/projects/[project-id]/` and update the `media.src` field in `src/content/projects.ts`.

## Adding project videos

Set `media.type: "video"` and add a `youtubeId` field in `src/content/projects.ts`. The video will display with a custom play button overlay over the poster image.

## Folder structure

```
src/
  components/
    layout/          Container, Section
    navigation/      Navbar, MobileMenu
    sections/
      hero/          HeroSection
      experience/    ExperienceRibbon
      projects/      ProjectsSection, ProjectCard, ProjectMedia
      skills/        SkillsSection
      about/         AboutSection
      contact/       ContactSection
    shared/          Button, Tag, SectionHeading, AnimateIn, ScrollProgress
  content/           All data — edit here to update copy
  hooks/             useInView, useReducedMotion, useCopyToClipboard
  lib/               utils (cn helper)
  types/             TypeScript interfaces
```
