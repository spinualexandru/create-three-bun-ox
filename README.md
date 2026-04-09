# three-template

A minimal Three.js template for Bun.

It includes:

- a plane
- a sphere resting on the plane
- one directional light
- `OrbitControls`
- a tiny on-screen slider panel for the sphere position and light intensity

## Requirements

- Bun

## Setup

```bash
bun install
```

## Run

```bash
bun run dev
```

The server listens on `PORT` if it is set, otherwise it uses `3000`.

If you are using this repo as a `bun create` template, `bun create` can use the `start` script:

```bash
bun create https://github.com/spinualexandru/three-bun-ox-template my-app
```

## Scripts

```bash
bun run start
bun run dev
bun run fmt
bun run fmt:fix
bun run fmt:check
bun run lint
bun run lint:fix
bun run typecheck
```
