# Project Reflection (1 Page)
**Project:** OpNarrate AI | **Author:** Dr. Cacho | **Date:** July 10, 2026

## What I Built and Why
OpNarrate AI addresses a genuine, daily documentation burden in OB-GYN practice: composing the operative technique and findings narrative after every case. Rather than building a generic AI chatbot, I deliberately grounded the AI generation step in curated, evidence-based procedure templates (Cesarean Section, TAHBSO, Myomectomy, D&C) so the model adapts a clinically reviewed step sequence to the specific case, instead of free-generating content with no anchor. This directly reflects my institutional experience: in quality audits and residency evaluation, the recurring finding is not "surgeons forget what they did," but that translating a clear operative memory into a complete, structured, hospital-record-format narrative under time pressure is where quality slips.

## What Worked Well
- The **template-grounding approach** kept the AI feature honest to its stated purpose (an accelerator, not an autonomous generator) and gave the project a genuine differentiating angle rather than a chatbot wrapper.
- Separating **pure logic** (`lib/promptBuilder.ts`, `lib/validation.ts`, `lib/procedureTemplates.ts`) from the network-calling API route made the core logic fully unit-testable without mocking the Anthropic client, which kept the test suite fast and meaningful (12 tests covering validation edge cases, prompt content, and template fallback behavior).
- Choosing a **lean stack** (no database, no auth) for the MVP kept the build, deployment, and secret-management surface small — appropriate for a single-session documentation accelerator and for the scope of a graded mini-project.

## What I Would Do Differently
- **Persistence** was intentionally deferred; in real use, a surgeon should be able to save drafts across a shift rather than lose them on a page refresh. This is the top v2 candidate (see `docs/v2-github-issue.md`).
- I would add a **structured evaluation step** — a small held-out set of past (de-identified) operative notes to compare against AI-generated drafts for completeness, before wider departmental piloting.
- Given more time, I would add **audit logging of edits** (draft vs. final, without storing patient identifiers) to demonstrate, for accreditation purposes, that physician review meaningfully changes AI output rather than being rubber-stamped.

## Key Learning
Building an AI feature that clinicians can trust is less about model capability and more about **constraining what the model is allowed to invent**. Grounding generation in a template that already carries institutional/clinical legitimacy — and being explicit in the UI that output is a draft requiring review — is what makes an AI documentation tool appropriate for a regulated clinical environment, versus a generic productivity gimmick.

## Alignment with the Assignment
This project completed all five phases: idea validation (7 steps) and PRD; architecture, spec, `CLAUDE.md`, and `.cursorrules`; a working build with the core AI feature, tests, and secret/input-validation checks; GitHub Actions CI and live deployment with environment variables and basic analytics; and this documentation set, including a v2 GitHub issue for the next priority improvement.
