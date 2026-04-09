# create-three-bun-ox

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

If you publish this package to npm as `create-three-bun-ox`, users can scaffold it with:

```bash
bun create create-three-bun-ox
```

You can also use the GitHub repo directly:

```bash
bun create github.com/spinualexandru/create-three-bun-ox my-app
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
