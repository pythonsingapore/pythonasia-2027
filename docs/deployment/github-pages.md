# GitHub Pages deployment

This document describes how Python Asia 2027 is built and published as a static GitHub Pages site.

## Goal

Publish the repository at:

`https://pythonsingapore.github.io/pythonasia-2027/`

The landing page and the `/schedule`, `/speakers`, and `/coc` routes must work when opened directly or refreshed. Local development must continue to work from `http://127.0.0.1:5173/`.

## Architecture

### Base-aware URLs

GitHub project sites are served below the repository name rather than at the domain root. Production builds therefore use `/pythonasia-2027/` as Vite's base URL.

A small path utility will provide:

- Asset URLs rooted at the active Vite base.
- Internal links rooted at the active Vite base.
- Route parsing that removes the deployment base before matching application routes.

External URLs, email links, and fragment-only links remain unchanged.

### Static route entry points

Vite produces a single `dist/index.html`. A post-build script will copy that entry file into:

- `dist/schedule/index.html`
- `dist/speakers/index.html`
- `dist/coc/index.html`

It will also create `dist/404.html` as a defensive fallback. This preserves clean URLs and lets GitHub Pages serve direct route requests without hash routing.

### GitHub Actions deployment

The Pages workflow will:

1. Check out `main`.
2. Install the declared Node.js version and npm dependencies.
3. Run the automated tests.
4. Run the Pages-specific production build.
5. Upload `dist/` as the Pages artifact.
6. Deploy through GitHub's `github-pages` environment.

The workflow runs on pushes to `main` and can also be started manually with `workflow_dispatch`.

## Failure handling

- Missing route output causes the Pages build to fail.
- Missing referenced assets cause automated tests to fail.
- Failed tests or builds prevent deployment.
- GitHub's deployment job runs only after the build job succeeds.
- Deployment concurrency cancels stale runs while preserving the newest launch attempt.

## Verification

Before publishing, the repository must demonstrate:

- All automated tests pass.
- The standard production build passes.
- The Pages production build passes with `/pythonasia-2027/` asset URLs.
- All four static HTML entry points exist.
- Generated HTML and bundles contain no unintended root-only internal URLs.
- The deployed landing page and each direct route load without console or asset errors.

## One-time GitHub setup

After the deployment workflow is merged:

1. Open the repository's **Settings** tab.
2. Select **Pages** under **Code and automation**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and select the Pages workflow.
5. Use **Run workflow** to start a manual deployment if the merge did not already trigger one.
6. Open the deployment URL shown in the completed workflow.

Repository administrators only need to perform the Pages source selection once.
