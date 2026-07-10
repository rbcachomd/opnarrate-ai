# v2 GitHub Issue (create this in your repo's Issues tab)

**Title:** Add session persistence and draft history (v2)

**Labels:** enhancement, v2

**Body:**

## Problem
The current MVP is session-only: if a surgeon's browser tab closes or refreshes before copying the generated draft, the note is lost and must be regenerated. There is also no way to review previously generated drafts across a shift with multiple cases.

## Proposed Solution
Add lightweight persistence (e.g., Supabase Postgres) so that:
1. Each generated draft (technique + findings + the intake data that produced it) is saved automatically after generation.
2. A simple "Recent Cases" list lets the surgeon reopen and re-edit a draft from earlier in the shift.
3. Optional lightweight auth (e.g., Supabase Auth, magic link) so drafts are scoped to the logged-in physician rather than shared across all visitors.

## Why This Is the Right Next Step
This was explicitly deferred from v1 to keep the MVP's secret/config surface small (see `docs/02-prd.md`, Scope Out section) and to ship faster. It is the single highest-value addition raised in early informal user feedback: surgeons want continuity across a multi-case OR day.

## Acceptance Criteria
- Drafts persist across page reloads for a logged-in user.
- No patient-identifiable data is stored without the user's explicit action (e.g., an opt-in "Save this case" toggle, off by default, to keep default behavior privacy-conservative).
- Existing MVP functionality (generation without login) continues to work for users who skip authentication.
