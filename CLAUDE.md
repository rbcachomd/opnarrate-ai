# CLAUDE.md — Project Instructions for AI Coding Assistants

This file guides any AI coding assistant (Claude Code, Cursor, etc.) working on this repository.

## Project
OpNarrate AI — a Next.js 14 app that generates OB-GYN operative technique and findings narratives from structured case data, a curated procedure template, and a physician's dictated summary. See `spec.md` and `docs/03-architecture.md` for full requirements.

## Ground Rules
1. **Never hardcode secrets.** The Claude/Anthropic API key is read only via `process.env.ANTHROPIC_API_KEY` inside server-side Route Handlers. Never reference it in client components, never print it in logs, never commit a real value to `.env` (only `.env.example` with placeholder names is tracked).
2. **All AI calls happen server-side.** Route Handlers under `app/api/**` are the only place the Anthropic SDK is imported.
3. **Ground generation in templates.** Do not let the model free-generate operative narratives with no template anchor — always pass the matching entry from `lib/procedureTemplates.ts` into the prompt.
4. **Validate all input.** Every API route must validate its request body with a `zod` schema from `lib/validation.ts` before using it.
5. **Keep components typed.** Use TypeScript strictly; no `any` unless justified with a comment.
6. **Test pure logic.** `lib/promptBuilder.ts` and `lib/validation.ts` must remain pure/testable functions with no network calls, and must have unit test coverage under `tests/`.
7. **Label AI output.** Any UI surface showing generated text must include the label "AI-Generated Draft — Physician Review Required."
8. **Commit style.** Use Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `ci:`, `chore:`) with meaningful, scoped messages — no "wip" or "update" commits.
9. **Styling.** Tailwind CSS utility classes only; no separate CSS-in-JS libraries.
10. **No new dependencies** without checking they are actively maintained and necessary; prefer the existing stack (Next.js, Tailwind, zod, @anthropic-ai/sdk, Vitest).

## Directory Map
```
app/                 Next.js App Router pages + API routes
components/          Client React components
lib/                 Pure logic: templates, prompt builder, validation
tests/               Vitest unit tests
docs/                Idea validation, PRD, architecture, reflection, demo script
.github/workflows/   CI configuration
```

## Definition of Done for Any Change
- `npm run lint` passes.
- `npm test` passes.
- `npm run build` succeeds.
- No secret values introduced anywhere in the diff.
- Relevant doc (`spec.md`, `README.md`) updated if behavior changed.
