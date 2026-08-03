# create-three-bun-ox

A minimal Three.js template for Bun.

It includes:

- a plane
- the Three.js logo loaded from a `.glb` with `GLTFLoader`, scaled and rested on the plane
- one directional light and a hemisphere fill light
- `OrbitControls`
- a tiny on-screen slider panel for the logo rotation and light intensity

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

Quickstart:

```bash
bunx create-three-bun-ox my-app
```

Or with npm:

```bash
npm create three-bun-ox my-app
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
