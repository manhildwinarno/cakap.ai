# PROJECT KNOWLEDGE BASE: CAKAP.AI

**Generated:** 2026-05-29
**Platform:** Next.js (App Router) + Prisma + Google Gemini API
**Role:** AI-Powered Interview Coach (JuaraVibeCoding)

## OVERVIEW

Cakap.AI is a Next.js App Router application backed by PostgreSQL (via Prisma), NextAuth (Google Provider), and the Google Gemini SDK.

This `AGENTS.md` is the absolute rulebook for any AI coding agent operating in this repository. You must read this before scaffolding, refactoring, or debugging any code.

## STRUCTURE

```text
./
├── prisma/           # Database schema and migrations
├── public/           # Static assets (images, icons)
├── src/
│   ├── app/          # Next.js App Router (Pages & API Routes)
│   ├── components/   # React components (UI primitives & feature chunks)
│   ├── lib/          # Utilities, Prisma Client, Gemini setup, NextAuth options
│   └── types/        # Global TypeScript interfaces
├── PRD.md            # Product Requirements & User Flow
└── DESIGN.md         # UI/UX guidelines and color hex codes

```

## ROOT COMMANDS

```bash
npm run dev           # Start local development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npx prisma studio     # Open local database GUI
npx prisma db push    # Sync schema to database during prototyping

```

## GLOBAL WHERE TO LOOK

| Task               | Location                         | Notes                                                |
| ------------------ | -------------------------------- | ---------------------------------------------------- |
| Route Pages        | `src/app/**/page.tsx`            | All public and private UI pages.                     |
| Global Layout      | `src/app/layout.tsx`             | Font setup (Inter), global providers.                |
| AI Integration     | `src/app/api/interview/route.ts` | Next.js API route handling Gemini SDK calls.         |
| Database Schema    | `prisma/schema.prisma`           | Define models here, then run `npx prisma db push`.   |
| Auth Configuration | `src/lib/auth.ts`                | NextAuth.js configuration and callbacks.             |
| Reusable UI        | `src/components/ui/`             | shadcn/ui generic primitives (Card, Button, etc.).   |
| Complex UI         | `src/components/`                | Custom composed components (e.g., `bento-grid.tsx`). |

## GLOBAL CONVENTIONS

- **Use `npm**` for all package management commands.
- **Strict TypeScript:** Do not use `any`. Always define interfaces for Gemini JSON responses and component props.
- **Server vs. Client:** Default to Server Components (`page.tsx`). Use `"use client"` only at the top of highly interactive components (like the chat input dock or framer-motion wrappers).
- **Styling:** Use Tailwind CSS exclusively. Follow the exact color palette defined in `DESIGN.md` (`bg-[#F8FAFC]`, `text-[#0F172A]`, etc.).
- **Icons:** Use ONLY `lucide-react`. Do not install or use any other icon libraries.
- **Animations:** Use `framer-motion` for subtle, premium UI transitions.

## GLOBAL ANTI-PATTERNS

- **NO Pages Router:** Do not create a `src/pages/` directory. We strictly use the App Router (`src/app/`).
- **NO Plain CSS:** Do not write custom CSS in `globals.css` unless absolutely necessary for complex animations. Use Tailwind utility classes.
- **NO Direct DB Calls in Components:** Do not call Prisma directly inside Client Components. Route database mutations through Server Actions or API routes.
- **NO Unstructured AI Outputs:** Never allow the Gemini API to return plain text. You must enforce `response_mime_type: "application/json"` in the Gemini SDK configuration.
- **NO Cluttered Navbars:** Follow the exact Immersive Mode rules from the PRD. The `src/app/simulation/page.tsx` must NOT render the global header/navbar.

## COMPONENT DEVELOPMENT GUIDE

### shadcn/ui Usage

- All raw UI elements must be generated via shadcn/ui.
- When instructed to create a form or a card, immediately utilize `src/components/ui/card.tsx`, `button.tsx`, and `input.tsx`.
- Do not build custom buttons or cards from scratch `<div>` tags if a shadcn primitive exists.

### Layout & Composition

- Ensure all main layouts use `max-w-6xl` or `max-w-5xl` to maintain a focused SaaS aesthetic.
- Avoid nesting deeper than necessary. Extract repetitive structures into local components within the same file before moving them to `src/components/`.

## API & BACKEND GUIDE

### NextAuth

- Use Google Provider. The session must be accessible server-side via `getServerSession()` before allowing access to `/home` or `/simulation`.

### Gemini API

- The core AI logic resides in `src/app/api/interview/route.ts`.
- The API route receives the user's prompt and the entire conversation history context.
- The system prompt inside the route must stringently define the S.T.A.R. framework evaluation criteria.
- Parse the JSON response securely before sending it back to the client. Handle API timeout gracefully.
