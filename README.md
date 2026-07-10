# OpNarrate AI

**AI-assisted, evidence-based Operative Technique & Findings generator for OB-GYN surgeons.**

Live demo: `https://opnarrate-ai.vercel.app
Demo video: *(add your 2-minute recording link here — see `docs/demo-script.md`)*

---

## The Problem

OB-GYN surgeons and residents spend 10–20 minutes after every case manually composing the operative technique and findings narrative, re-entering patient, team, and diagnosis data each time, with inconsistent structure across authors. See `docs/01-idea-validation.md` for full evidence and `docs/02-prd.md` for the product requirements.

## What It Does

1. The surgeon fills a structured intake form: patient data, gravidity/parity, pre-/intra-/post-op diagnoses, full surgical team, anesthesia type, and selects a procedure template (Cesarean Section, TAHBSO, Myomectomy, D&C, or custom).
2. The surgeon dictates (via browser speech-to-text) or types a short summary of what was actually performed.
3. Claude (Anthropic) generates a complete **Operative Technique** narrative and **Operative Findings** summary, grounded in a curated, evidence-based procedure step template — not free-form generation — then merged with the dictated case detail.
4. The surgeon reviews and edits the AI draft (clearly labeled **"AI-Generated Draft — Physician Review Required"**), then copies or prints it.

## Why Not Just Use ChatGPT/Claude Directly?

A generic chatbot has no OB-GYN procedure templates, no structured patient/team/diagnosis intake, and no repeatable institutional format — each use starts from zero and risks inconsistent, ungrounded narratives. OpNarrate AI fixes the intake once, grounds every generation in a reviewed procedure template, and produces both required sections (technique + findings) from a single entry.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| AI | Anthropic Claude API (`@anthropic-ai/sdk`), server-side only |
| Validation | Zod |
| Testing | Vitest |
| Voice input | Browser Web Speech API (client-side only; no audio leaves the browser) |
| Hosting | Vercel |
| CI | GitHub Actions |
| Monitoring | Vercel Analytics |

No database or authentication in this MVP — see `docs/02-prd.md` for scope rationale and `docs/v2-github-issue.md` for the planned v2 addition.

## Getting Started (Local Development)

```bash
git clone https://github.com/<your-username>/opnarrate-ai.git
cd opnarrate-ai
npm install
cp .env.example .env.local   # then paste your real ANTHROPIC_API_KEY into .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example`. Required: `ANTHROPIC_API_KEY` (server-side only, never committed). Optional: `ANTHROPIC_MODEL`.

## Testing

```bash
npm test
```

12 unit tests cover input validation (`lib/validation.ts`), prompt construction (`lib/promptBuilder.ts`), and procedure template lookup (`lib/procedureTemplates.ts`).

## Deployment

See `docs/deployment-guide.md` for the full step-by-step (GitHub push → Vercel import → environment variables → live verification → analytics).

## Project Documentation

| Document | Purpose |
|---|---|
| `docs/01-idea-validation.md` | 7-step idea validation, user/problem/market evidence |
| `docs/02-prd.md` | 1-page Product Requirements Document |
| `docs/03-architecture.md` | Architecture notes and data flow |
| `spec.md` | Functional/non-functional spec with acceptance criteria |
| `CLAUDE.md` | Instructions for AI coding assistants working on this repo |
| `.cursorrules` | Cursor-specific coding rules |
| `docs/deployment-guide.md` | Step-by-step deployment walkthrough |
| `docs/demo-script.md` | 2-minute demo recording script |
| `docs/reflection.md` | 1-page project reflection |
| `docs/v2-github-issue.md` | Planned v2 improvement (also filed as a GitHub Issue) |

## Safety & Scope Notice

OpNarrate AI is a **documentation accelerator**, not a diagnostic or autonomous clinical-record tool. All generated content is a draft requiring physician review before entry into any official medical record. The tool does not store, transmit, or persist patient data beyond the ephemeral request needed to generate a draft.

## License

MIT — see intended use above; adapt freely for institutional or training use with appropriate clinical oversight.

## Author

Dr. Cacho — OB-GYN, hospital governance & quality management. Built as a Week 4 graded mini-project (idea validation → PRD → spec/architecture → AI-assisted build → CI/CD → live deployment → documentation).
