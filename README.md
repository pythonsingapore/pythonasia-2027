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
npm run preview  # Preview the production build locally
```

## Routes

- `/` — conference landing page
- `/schedule` — illustrative conference schedule
- `/speakers` — speaker directory
- `/coc` — Code of Conduct

## Accessibility

The interface includes keyboard-operable controls, semantic landmarks, responsive navigation, visible focus states, and a reduced-motion mode. Decorative motion is hidden from assistive technology and must remain non-blocking.

When changing animations or layout, run both the test suite and production build. Please also check compact layouts and `prefers-reduced-motion` before opening a pull request.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the development and pull-request workflow.

## License

This project is available under the [MIT License](LICENSE).
