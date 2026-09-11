# Jonathan Arnaldo — Frontend Engineer Portfolio

A single-page React + TypeScript portfolio designed for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Create a GitHub repository (for example `jonathan-arnaldo` or `portfolio`).
2. Push this project to the repository.
3. Run:

```bash
npm install
npm run deploy
```

The included Vite config uses a relative base path (`./`), which makes the generated site work for both a user site and a project site.

Alternatively, you can use GitHub Actions to deploy the `dist` directory after `npm run build`.

## Before publishing

- Add your GitHub URL if you want it visible in the contact area.
- Replace or add project links for any work you can publicly show.
- Add a PDF resume to `public/resume.pdf` and link it from the hero if desired.
- If you don't want to use Google Fonts, remove the `@import` from `src/styles.css` and use system fallbacks.
