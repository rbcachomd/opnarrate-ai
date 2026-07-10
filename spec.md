# spec.md — OpNarrate AI

## 1. Purpose
Generate an evidence-based, hospital-record-ready **Operative Technique** narrative and **Operative Findings** summary for OB-GYN procedures, from (a) structured case data, (b) a curated procedure template, and (c) a physician's dictated summary of what was performed.

## 2. Users
OB-GYN consultants, fellows, and residents, immediately post-operatively.

## 3. Functional Requirements

### FR-1 Intake Form
The system SHALL collect:
- Patient data: name/initials, hospital number, age, address, admission date/time, operation date/time.
- Obstetric history: gravidity, parity.
- Diagnoses: pre-operative, intra-operative, post-operative.
- Surgical team: surgeon, assistant surgeon, second assistant (optional), scrub nurse, circulating nurse, anesthesiologist.
- Anesthesia type.
- Procedure selection (from a template list: Cesarean Section, TAHBSO, Myomectomy, D&C, and an "Other / custom" free-text option).

### FR-2 Dictation
The system SHALL allow the user to dictate (via browser `SpeechRecognition`) or type a free-text summary of what was performed. Dictated audio SHALL NOT be transmitted to any server; only the resulting text is used.

### FR-3 AI Generation
On submit, the system SHALL send the validated intake payload to `/api/generate`, which SHALL call the Claude API with a prompt grounded in the matching procedure template, and SHALL return:
- `technique`: full blow-by-blow operative technique narrative.
- `findings`: operative findings summary.

### FR-4 Review & Export
The system SHALL display both outputs in editable text areas, labeled "AI-Generated Draft — Physician Review Required," with copy-to-clipboard and print actions. The system SHALL NOT auto-submit output to any external record.

### FR-5 Validation
The system SHALL validate all intake fields server-side (required fields present, string length limits, enum constraints on procedure/anesthesia type) before calling the AI provider, and SHALL return a 400 error with a descriptive message on invalid input.

### FR-6 Secrets
The system SHALL read the Claude API key exclusively from a server-side environment variable and SHALL NOT expose it to client-side code or commit it to version control.

## 4. Non-Functional Requirements
- Response time target: draft generation in under 30 seconds for a typical case.
- Availability: best-effort (Vercel free tier acceptable for MVP).
- Browser support: latest Chrome/Edge for full dictation support; graceful text-only fallback elsewhere.

## 5. Out of Scope (v1)
Database persistence, authentication, multi-user roles, EMR/HIS integration, audit trail, e-signature, payment processing.

## 6. Acceptance Criteria
1. Given a completed intake form and a procedure selection, when the user submits, then both `technique` and `findings` are returned and rendered within 30 seconds under normal network conditions.
2. Given a missing required field, when the user submits, then the client displays a validation error and no API call is made to the AI provider.
3. Given the deployed app, when opened in an incognito window, then the form loads and a full generation round-trip succeeds.
4. Given the repository, no `ANTHROPIC_API_KEY` or equivalent secret value appears in any tracked file.

## 7. Revision Log
| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-07-10 | Initial draft after Phase 1/2 review |
| 1.0 | 2026-07-10 | Revised after spec review: clarified FR-2 (no audio transmitted), added FR-6 explicit secrets requirement, added acceptance criteria 3–4 |
