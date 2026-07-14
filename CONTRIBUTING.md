# Contributing

Thank you for helping improve the Python Asia 2027 website.

## Before you start

- Search existing issues and pull requests before opening a duplicate.
- Keep changes focused. Separate unrelated fixes into different pull requests.
- Do not commit local caches, generated builds, QA captures, credentials, or agent working files.
- Use only assets that the project is allowed to redistribute, and document any required attribution.

## Development workflow

1. Fork the repository and create a branch from `main`.
2. Install dependencies with `npm ci`.
3. Run the site with `npm run dev`.
4. Make the smallest change that solves the issue.
5. Run `npm test` and `npm run build`.
6. Open a pull request that explains the change and how it was verified.

For visual changes, include desktop and mobile evidence in the pull-request description rather than committing temporary screenshots to the repository.

## Design and accessibility

- Preserve the established conference identity and existing content unless the issue explicitly calls for copy changes.
- Keep controls keyboard accessible and focus indicators visible.
- Keep decorative artwork out of the accessibility tree.
- Provide a complete static experience for people who prefer reduced motion.
- Check for horizontal overflow at compact widths.

## Reporting conduct concerns

Please contact the Python Singapore team at [pyconsg@computing.sg](mailto:pyconsg@computing.sg).
