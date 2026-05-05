# Portfolio Website (GitHub Pages)

This portfolio is a static website designed for GitHub Pages deployment from the `main` branch using GitHub Actions.

## Quick Start

1. Update your personal details in `index.html`.
2. Replace skills and project text with data from your latest resume.
3. Place your latest resume PDF at `assets/Ignacio_Phil_Harry_Resume.pdf`.
4. Commit and push to `main`.

## Deployment

- Workflow file: `.github/workflows/deploy-pages.yml`
- In GitHub repository settings:
  - Go to **Pages**.
  - Set source to **GitHub Actions**.
- After pushing to `main`, GitHub Actions deploys automatically.

## Notes

- This implementation avoids Node.js tooling because Node/npm are not currently installed in the local environment.
- If you install Node.js later, this can be migrated to React + Vite while keeping the same design/content structure.
