# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
- `pnpm dev` - Start all apps in development mode (parallel)
- `pnpm --filter web dev` - Start only the web app
- `pnpm --filter admin dev` - Start only the admin app
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages
- `pnpm test` - Run tests across all packages
- `pnpm format` - Format code using Prettier

### Individual Package Commands
- `vitest` - Run tests (used by both apps and packages)
- `tsc -p tsconfig.json --noEmit` - Type check without emitting files
- `eslint .` or `eslint src --ext .ts,.tsx` - Lint specific directories
- `tsc -w` - Watch mode for TypeScript compilation (packages only)
- `prettier --write .` - Format files using Prettier

## Architecture

### Monorepo Structure
This is a **Turborepo + PNPM** monorepo with Next.js applications and shared packages.

**Applications:**
- `apps/web` - Public site using Next.js 14 App Router (main application)
- `apps/admin` - Admin dashboard scaffold

**Shared Packages:**
- `@joey/ui` - Shared MUI React components (peer deps: React, MUI, Emotion)
- `@joey/atoms` - Jotai state management atoms (peer deps: React, Jotai) 
- `@joey/config` - Shared ESLint and Prettier configurations
- `@joey/tsconfig` - Shared TypeScript configurations

### Technology Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **UI Library:** Material-UI (MUI) v5 with Emotion styling
- **State Management:** Jotai for atomic state management
- **Testing:** Vitest with React Testing Library
- **Linting/Formatting:** ESLint + Prettier (centralized configs)
- **Package Manager:** PNPM with workspace protocol references

### Key Dependencies
- **Web App Additional:** Cloudinary (images), PostHog (analytics), Stripe/PayPal (payments), React Hook Form, date-fns, Ramda
- **Build System:** Turbo for orchestrating builds and tasks across packages

### Configuration Notes
- Next.js transpiles workspace packages (`@joey/ui`, `@joey/atoms`) 
- Image optimization configured for Cloudinary and YouTube thumbnails
- Workspace packages use peer dependencies to avoid duplication
- All packages share TypeScript and linting configurations via workspace references

### Development Workflow
1. Run `pnpm install` to install dependencies
2. Use `pnpm dev` to start all apps or `pnpm --filter <app> dev` for individual apps  
3. Web app runs on `http://localhost:3000`
4. Make changes to shared packages in `packages/` and they'll be automatically transpiled
5. Always run `pnpm lint` and `pnpm typecheck` before committing changes

### Testing
- All packages use Vitest with React Testing Library
- Run tests with `pnpm test` (all packages) or `vitest` (current package)
- Tests are configured to run in watch mode during development