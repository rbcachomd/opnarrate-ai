# Product Requirements Document (1-Page)
**Product:** OpNarrate AI — AI-Assisted Operative Technique & Findings Generator
**Owner:** Dr. Cacho | **Version:** 1.0 | **Date:** July 10, 2026

## Problem
OB-GYN surgeons spend 10–20 minutes per case manually composing operative technique and findings narratives, with inconsistent structure, delayed completion, and duplicated data entry across patient, OR-team, and diagnosis fields. See `docs/01-idea-validation.md` for full evidence.

## Target User
OB-GYN consultants, fellows, and residents documenting completed surgical cases in Philippine hospitals, immediately post-operatively.

## Goal / Success Criteria
| Goal | Metric (MVP demo) |
|---|---|
| Reduce time to complete an operative note | Draft generated in <30 seconds vs. 10–20 minutes manual |
| Improve structural completeness | 100% of required fields (patient data, team, diagnoses, anesthesia) present in every generated note |
| Maintain clinical safety | Every output labeled "AI-Generated Draft — Physician Review Required"; no auto-submission to any medical record |

## Scope (In)
1. Structured intake form: patient/hospital data, admission & operation time, gravidity/parity, pre-op/intra-op/post-op diagnosis, surgical team (surgeon, assistant, 2nd assist, scrub nurse, circulating nurse, anesthesiologist), anesthesia type.
2. Procedure template selector (Cesarean Section, TAHBSO, Myomectomy, D&C, others extensible).
3. Voice dictation capture (browser Web Speech API) of "what was done," transcribed to text.
4. AI generation (Claude API) of: (a) full blow-by-blow Operative Technique narrative, (b) Operative Findings, grounded in the selected procedure template + dictation transcript + form data.
5. Editable output panel; copy-to-clipboard and print/export.
6. Input validation (required fields, safe text handling) and no hardcoded secrets.

## Scope (Out / v2)
- No database persistence or login in MVP (session-only; each session is a fresh case).
- No integration with hospital EMR/HIS (v2 candidate).
- No multi-user roles, audit trail, or e-signature (v2 candidate).
- No payment processing.

## Differentiating Angle
Template-grounded (not open-ended) AI generation, purpose-built for OB-GYN operative documentation, fusing structured intake with spoken case summary — not a generic chatbot wrapper.

## Key Risks
| Risk | Mitigation |
|---|---|
| AI hallucination of clinical detail | Template-grounded prompting; mandatory physician review label; no auto-finalization |
| Sensitive patient data exposure | No persistence by default; no hardcoded secrets; input never logged server-side beyond ephemeral request handling |
| Over-reliance by trainees | README/UI messaging positions tool as a documentation accelerator, not a substitute for surgical judgment or supervision |

## Release Plan
MVP deployed to a public live URL (Vercel), public GitHub repo, GitHub Actions CI, documented and demoed per Week 4 assignment requirements.
