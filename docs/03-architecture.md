# Architecture Notes — OpNarrate AI

## Overview
A single-page Next.js 14 (App Router) application. All AI calls happen server-side via a Next.js Route Handler, so the Claude API key never reaches the browser. No database in the MVP; all state is client-side React state within a session.

```
┌─────────────────────────────┐        ┌──────────────────────────────┐        ┌───────────────────┐
│   Browser (Client)          │  POST  │  Next.js Route Handler        │  API   │  Anthropic Claude  │
│  - Intake Form               │ ─────▶ │  /app/api/generate/route.ts   │ ─────▶ │  Messages API      │
│  - Procedure Selector        │        │  - zod validation             │        │  (server-side key)  │
│  - Web Speech API dictation  │        │  - prompt builder (templates) │        │                     │
│  - Result panel (edit/copy)  │ ◀───── │  - error handling              │ ◀───── │                     │
└─────────────────────────────┘  JSON   └──────────────────────────────┘  JSON   └───────────────────┘
```

## Components
- **`app/page.tsx`** — main UI: renders `<IntakeForm>`, `<ResultPanel>`.
- **`components/IntakeForm.tsx`** — patient/team/diagnosis fields, procedure selector, dictation control; client component.
- **`components/DictationRecorder.tsx`** — wraps the browser `SpeechRecognition` API (Web Speech API); degrades gracefully to manual text entry when unsupported (e.g., non-Chromium browsers).
- **`components/ResultPanel.tsx`** — displays generated Operative Technique + Operative Findings; editable `<textarea>`, copy-to-clipboard, print.
- **`app/api/generate/route.ts`** — server Route Handler: validates request body with `zod`, builds a grounded prompt from `lib/procedureTemplates.ts` + user input, calls Anthropic Claude via `@anthropic-ai/sdk`, returns structured JSON `{ technique, findings }`.
- **`lib/procedureTemplates.ts`** — curated, evidence-based step outlines per procedure (source-referenced) used to ground generation and reduce hallucination.
- **`lib/promptBuilder.ts`** — pure function assembling the system + user prompt from template + form data + dictation transcript. Unit-tested.
- **`lib/validation.ts`** — zod schemas for the intake payload. Unit-tested.

## Data Flow
1. User selects a procedure template and fills structured fields (or edits pre-filled defaults).
2. User dictates or types a summary of what was performed.
3. On submit, the client POSTs `{ procedure, patient, team, diagnoses, anesthesia, dictationText }` to `/api/generate`.
4. The route handler validates input, builds the grounded prompt, calls Claude, and returns `{ technique, findings }`.
5. The client renders both sections as editable text, clearly labeled **"AI-Generated Draft — Physician Review Required."**

## AI Capability (Core Feature)
Claude (Anthropic Messages API) generates the Operative Technique narrative and Operative Findings, constrained to:
- The selected procedure's evidence-based step template (grounding source, not free generation).
- The physician's dictated summary (case-specific detail).
- The structured form fields (patient, team, diagnoses, anesthesia) inserted verbatim into the header of the note — not hallucinated.

## Security & Privacy
- `ANTHROPIC_API_KEY` stored only as a server-side environment variable (Vercel Project Settings / GitHub Actions secret) — never committed, never sent to the client.
- No patient data is persisted server-side; requests are stateless and not logged with identifiable content in production.
- All intake fields validated and sanitized via `zod` before being interpolated into any prompt or rendered in the UI (mitigates prompt-injection and XSS).
- `.env.example` documents required variables without real values; `.gitignore` excludes `.env*`.

## Deployment Topology
- **Host:** Vercel (Next.js-native, zero-config).
- **CI:** GitHub Actions runs lint + unit tests on every push/PR (`.github/workflows/ci.yml`).
- **CD:** Vercel's native GitHub integration auto-deploys `main` on merge (no deployment secrets need to live in GitHub Actions).
- **Monitoring:** `@vercel/analytics` (page views/web vitals) as basic usage monitoring for the MVP.

## Non-Functional Requirements
| Requirement | Approach |
|---|---|
| No hardcoded secrets | Env vars only, `.env` gitignored, `.env.example` provided |
| Input validation | `zod` schemas on all API input |
| Testability | Pure functions (`promptBuilder`, `validation`) unit-tested independent of network calls |
| Accessibility | Semantic HTML form elements, labeled inputs, keyboard-operable dictation toggle |
| Graceful degradation | Dictation falls back to manual typing if `SpeechRecognition` unsupported |
