# Standalone Recharge Page

This folder contains a standalone build of the H5 recharge screen. The layout
and visual styles mirror the in-app page so that it can be served separately or
embedded in another host without pulling in the full project.

## Development

```bash
yarn install
yarn dev
```

The development server runs on http://localhost:5173/ by default.

## Production Build

```bash
yarn build
```

The generated assets will be placed in `dist/`. The repository ships with a
pre-built bundle so the page can run immediately by opening
`dist/index.html` in a browser.
