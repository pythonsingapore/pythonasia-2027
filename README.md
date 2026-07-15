# Python Asia 2027

The public website for Python Asia 2027 in Singapore.

The site is a responsive React and Vite application with an editorial, pan-Asian visual direction. GSAP powers the landing-page choreography and the decorative opening sequences on the schedule, speakers, and Code of Conduct routes.

## Local development

Requirements:

- Node.js 20 or later
- npm 10 or later

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

The local site is served at `http://127.0.0.1:5173/` by default.

## Available commands

```bash
npm run dev      # Start the local development server
npm test         # Run the motion and layout contract tests
npm run build    # Create a production build in dist/
npm run build:pages # Create the GitHub Pages build and route entries
npm run preview  # Preview the production build locally
```

## Routes

- `/` — conference landing page
- `/schedule` — illustrative conference schedule
- `/speakers` — speaker directory
- `/coc` — Code of Conduct

## Accessibility

The interface includes keyboard-operable controls, semantic landmarks, responsive navigation, and visible focus states. Decorative motion is hidden from assistive technology and must remain non-blocking.

When changing animations or layout, run both the test suite and production build. Please also check that the full motion system remains smooth and non-blocking at compact widths before opening a pull request.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the development and pull-request workflow.

## Deployment

The site deploys to GitHub Pages from `main` through `.github/workflows/deploy-pages.yml`.
Repository administrators must select **GitHub Actions** under **Settings → Pages → Build and deployment** once. See [the GitHub Pages deployment guide](docs/deployment/github-pages.md) for the architecture and verification checklist.

## License

This project is available under the [MIT License](LICENSE).
