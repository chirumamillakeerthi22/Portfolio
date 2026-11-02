# Keerthi Chirumamilla — Portfolio

Personal portfolio for Keerthi Chirumamilla (Data Engineering · Data Analytics · Python & SQL).
React 19 + TypeScript + Vite + Tailwind CSS v4. No UI framework, no animation library, no tracking, no cookies.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Update the content

Every fact on the site lives in **`src/data/profile.ts`**: summary, internships, skills (each with
where it was used), projects and their case studies, repositories, certifications, education.
Edit that file only; components read from it.

- **Resumes:** replace the PDFs in `public/resume/` (keep the file names, or update `resumes` in the data file).
- **Project screenshots:** add a real screenshot to `public/projects/` (WebP, about 1600×1000) and set
  `screenshot: '/projects/veyoraq.webp'` on the project. Until then the card shows the architecture diagram.
- **Certificate links:** add `credentialUrl` to a certification and a “Verify” link appears.
- **Site URL:** set `VITE_SITE_URL` (see `.env.example`) so canonical, Open Graph, `robots.txt` and
  `sitemap.xml` use the deployed address. Default: the portfolio URL printed on the resume.

## Theme system

- `index.html` applies the theme before first paint (no flash), from `localStorage['theme-preference']`
  or `prefers-color-scheme`.
- `src/theme/ThemeProvider.tsx` holds the preference (`system` | `light` | `dark`), listens to
  operating-system changes while *System* is selected, persists the choice and syncs open tabs.
- Colours are CSS variables in `src/index.css` (`:root` / `[data-theme='dark']`), mapped to Tailwind
  colour names (`bg-elev`, `text-muted`, `border-line`, `bg-accent`, …). Both themes are designed separately.

## Structure

```
src/
  data/profile.ts          content (single source of truth)
  theme/                   ThemeProvider, ThemeSwitcher (System / Light / Dark)
  hooks/                   scroll reveal, active-section tracking
  components/              Nav, Hero, PipelineVisual, About, Experience, Skills,
                           Projects (cards + <dialog> case studies), ArchitectureDiagram,
                           GitHubSection, Credentials, Contact, Footer
public/                    resume PDFs, favicon, og-image, apple-touch-icon
```

## Deploy (Vercel)

Framework preset **Vite**, build command `npm run build`, output `dist`. `vercel.json` adds cache and
security headers. Set `VITE_SITE_URL` in the Vercel project if the domain changes.

## Accessibility & privacy notes

Skip link, one `h1`, labelled landmarks, keyboard-operable theme radio group, native `<dialog>` with
focus return, visible focus rings, `prefers-reduced-motion` respected, axe-core clean in both themes.
Fonts are self-hosted (no request to Google Fonts), and the GitHub section is static, so visiting the
site sends no data to third parties.
