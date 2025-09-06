# Joey Hou Gallery Monorepo

Turbo + PNPM monorepo with Next.js apps and shared packages.

## Quick Start

1. Install PNPM and Node 20 (see `.nvmrc`).
2. Install deps: `pnpm install`.
3. Dev all apps: `pnpm dev`.
4. Open web: `http://localhost:3000`.

## Structure

- `apps/web` — Public site (Next.js 14 App Router).
- `apps/admin` — Admin dashboard scaffold.
- `packages/ui` — Shared MUI components.
- `packages/atoms` — Jotai state atoms.
- `packages/config` — Shared ESLint/Prettier configs.
- `packages/tsconfig` — Shared TypeScript configs.

## Scripts

- Root: `pnpm dev|build|lint|test|typecheck|format` via Turbo.
- App: `pnpm --filter web dev` to run a single app.

