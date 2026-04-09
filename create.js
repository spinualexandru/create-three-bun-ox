#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const arg = process.argv[2];

if (!arg || arg === "--help" || arg === "-h") {
  console.log("Usage: create-three-bun-ox <project-name>");
  process.exit(arg ? 0 : 1);
}

const dest = resolve(arg);

if (existsSync(dest)) {
  console.error(`Directory "${basename(dest)}" already exists.`);
  process.exit(1);
}

mkdirSync(dest, { recursive: true });

const files = [
  "index.html",
  "server.ts",
  "tsconfig.json",
  ".oxlintrc.json",
  ".oxfmtrc.json",
  "bun.lock",
];

for (const file of files) {
  cpSync(join(__dirname, file), join(dest, file));
}

cpSync(join(__dirname, "src"), join(dest, "src"), { recursive: true });

writeFileSync(
  join(dest, ".gitignore"),
  [
    "node_modules",
    "out",
    "dist",
    "*.tgz",
    ".cache",
    "*.tsbuildinfo",
    ".env",
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local",
  ].join("\n") + "\n",
);

writeFileSync(
  join(dest, "package.json"),
  JSON.stringify(
    {
      name: basename(dest),
      version: "0.1.0",
      type: "module",
      scripts: {
        dev: "bun --hot ./server.ts",
        start: "bun run dev",
        fmt: "oxfmt server.ts index.html src package.json tsconfig.json .oxlintrc.json .oxfmtrc.json",
        "fmt:fix": "bun run fmt",
        "fmt:check":
          "oxfmt --check server.ts index.html src package.json tsconfig.json .oxlintrc.json .oxfmtrc.json",
        lint: "oxlint server.ts src",
        "lint:fix": "oxlint --fix server.ts src",
        typecheck: "tsc --noEmit",
      },
      dependencies: { three: "0.183.2" },
      devDependencies: {
        "@types/bun": "latest",
        "@types/three": "0.180.0",
        oxfmt: "0.44.0",
        oxlint: "1.59.0",
        typescript: "^6.0.2",
      },
    },
    null,
    2,
  ) + "\n",
);

console.log("Installing dependencies...");
try {
  execSync("bun install", { cwd: dest, stdio: "inherit" });
} catch {
  console.error("Failed to install dependencies. Run `bun install` manually.");
}

console.log(`\nDone! Created ${basename(dest)}`);
console.log(`\n  cd ${arg}`);
console.log("  bun run dev\n");