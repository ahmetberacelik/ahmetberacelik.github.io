# Ahmet Bera Çelik — Portfolio

Bilingual (English at `/` and `/projects/<slug>/`, Turkish at `/tr/` and `/tr/projeler/<slug>/`) static portfolio site built with Astro and strict TypeScript.

## Prerequisites

- Node.js 22+
- npm 10+

## Commands

- `npm install` — install dependencies
- `npm run dev` — start local dev server
- `npm run check` (or `npx astro check`) — run Astro and TypeScript type checks
- `npm run build` — build static production output into `dist/`
- `npm run preview` — preview the production build locally

## Project Structure & Content Organization

- `src/content/projects/en/` & `src/content/projects/tr/` — Markdown content collection files for all featured and short projects
- `src/data/en.ts` & `src/data/tr.ts` — typed per-language texts for Hero, About, Leadership, Contact, and UI labels
- `src/assets/media/` — project, portrait, and community event photographs processed through `astro:assets`
- `public/media/` — project videos (`.mp4`)
- `public/cv/` — English and Turkish CV PDFs
- `src/styles/global.css` — design tokens and global typography/layout rules
