# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Application code (modules, components, pages). Prefer feature‑first folders.
- `assets/`: Static files (images, fonts). Keep originals in `assets/raw/`, optimized in `assets/optimized/`.
- `public/`: Public files served as‑is (favicons, robots.txt).
- `tests/`: Unit/integration tests mirroring `src/` structure.
- `scripts/`: Developer utilities (build, release, maintenance).
- `config/`: Tooling configs (lint, format, test). Check in minimal, documented defaults.

If you add or reorganize directories, update this document accordingly.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server with hot reload.
- `npm run build`: Production build to `dist/` with minification.
- `npm test`: Run unit tests once; CI uses the same entry.
- `npm run test:watch`: Watch mode for rapid feedback.
- `npm run lint` / `npm run format`: Lint and format the codebase.

Examples assume a Node toolchain. If adding another stack, expose equivalent `make` or `scripts/*` wrappers and document them here.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF‑8; LF line endings.
- Language: TypeScript preferred (`.ts/.tsx`).
- Filenames: kebab‑case for files (`image-card.tsx`); PascalCase for React components; snake_case for scripts.
- Imports: absolute from `src/` using a path alias (e.g., `@/gallery/...`).
- Tooling: Prettier for formatting; ESLint with TypeScript rules for linting.

## Testing Guidelines
- Framework: Vitest or Jest; use React Testing Library for UI.
- Location: `tests/` or colocated `*.test.ts(x)` next to source.
- Coverage: Target ≥ 80% lines/branches for changed code.
- Naming: Match source path (e.g., `src/gallery/loader.ts` → `tests/gallery/loader.test.ts`).

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (e.g., `feat: add masonry layout`, `fix: handle EXIF rotation`).
- Branches: `feature/<slug>`, `fix/<slug>`, `chore/<slug>`.
- PRs: Clear description, linked issue (`Closes #123`), screenshots or recordings for UI changes, test plan, and checklist that lint/tests pass.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and add `.env.example` with placeholders.
- Large binaries/media: store optimized assets only; use Git LFS if needed.
- Pin Node version via `.nvmrc`; prefer LTS.

