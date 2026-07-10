# Idea Validation Report
**Project:** OpNarrate AI — AI-Assisted Operative Technique & Findings Generator for OB-GYN
**Prepared by:** Dr. Cacho
**Date:** July 10, 2026
**Status:** Validated — Proceed to Build

---

## Step 1 — Problem Statement

OB-GYN surgeons and residents spend significant non-clinical time after every operation writing the **operative technique** (the blow-by-blow narrative of what was done in the OR) and the **operative findings**, by hand or by free-dictation into a transcription service. This documentation is:

- **Time-consuming** — a full narrative for a Cesarean section, TAHBSO, myomectomy, or D&C typically takes 10–20 minutes to compose from memory after a case, often delayed to the end of a long OR day.
- **Inconsistent** — narrative quality, completeness, and terminology vary by author, shift fatigue, and seniority (consultant vs. resident), creating audit and medico-legal exposure.
- **Administratively heavy** — patient demographics, OR team roster (surgeon, assistant, second assist, scrub nurse, circulating nurse, anesthesiologist), anesthesia type, and diagnoses (pre-op, intra-op, post-op) must be re-entered manually into the operative record every time, duplicating data already known at the time of booking.
- **A known residency training gap** — trainees are expected to internalize "acceptable" evidence-based operative narrative structure, but templates and mentorship on this are inconsistent across training institutions.

**Core problem:** There is no fast, structured, evidence-based way for an OB-GYN surgeon to convert a short spoken summary of a completed case into a complete, hospital-record-ready operative technique and findings note.

## Step 2 — Target User

| Attribute | Description |
|---|---|
| **Primary user** | OB-GYN consultants and residents/fellows-in-training performing surgery in Philippine hospitals (public and private) |
| **Secondary user** | Residency training officers reviewing trainee operative documentation for standards compliance |
| **Context of use** | Immediately post-operatively, in the OR lounge or at the nurses' station, often time-pressured between cases |
| **Pain frequency** | Daily to several times per week for high-volume OB-GYN services |
| **Technical comfort** | Moderate — comfortable with hospital EMR/HIS and mobile devices, but not developers |

## Step 3 — Evidence the Problem Is Real

1. **Direct professional experience** — as a practicing OB-GYN and residency program leader, the requester has firsthand and second-hand (co-resident/consultant) experience of operative-note documentation burden and variability across trainees.
2. **Structural evidence** — Philippine hospital accreditation (PhilHealth, DOH, PHA) and ISO-aligned quality/audit systems require complete, timely, legible operative records; incomplete or delayed operative notes are a recurring audit finding in departmental quality reviews.
3. **Residency training evidence** — the Philippine Board of Obstetrics and Gynecology training standards expect graduating residents to produce accurate, complete operative documentation as a competency; inconsistent narrative quality is a recurring observation in graduate preparedness assessments.
4. **Analogous market evidence** — general-surgery and radiology dictation/transcription tools (e.g., Dragon Medical, generic AI scribes such as Nuance DAX, Abridge, Suki) validate strong willingness-to-pay in the broader clinical documentation-burden market, though none are OB-GYN operative-technique specific or template-driven for the Philippine setting.

## Step 4 — Market / Competitive Scan

| Existing solution | Gap for this user |
|---|---|
| Hospital EMR free-text fields | No structure, no AI generation, no dictation-to-narrative translation |
| Generic ambient AI scribes (Abridge, Suki, Nuance DAX) | Built for outpatient consult notes, not OR operative narratives; expensive; US/enterprise-priced; not OB-GYN procedure-template aware |
| Generic ChatGPT/Claude web chat | No structured intake form, no OB-GYN procedure templates, no OR-team/patient-data fields, no repeatable institutional format — a "generic chatbot wrapper" with no domain value |
| Manual dictation + transcriptionist | Slow (hours to days turnaround), added cost, still requires physician editing |

**Conclusion:** No existing tool combines (a) OB-GYN-specific evidence-based operative-technique templates, (b) structured patient/OR-team/diagnosis intake, and (c) voice dictation of what was actually done, fused by AI into one hospital-record-ready narrative.

## Step 5 — Riskiest Assumption & Test

**Riskiest assumption:** Surgeons will trust and use an AI-generated operative narrative if it is grounded in a structured, evidence-based procedure template (rather than free-form AI generation), because clinical and medico-legal accuracy is non-negotiable.

**Test performed:** Informal review of the prompt-grounding design (template-first generation with mandatory human review/edit before finalization, no auto-submission to the medical record) against Philippine hospital documentation and audit-readiness norms, and against POGS/PBOG expectations for resident-authored operative notes.

**Result:** Assumption holds provided the app (a) always requires physician review/edit of the generated draft before it is considered final, (b) clearly labels output as an AI-assisted draft, and (c) grounds generation in curated procedure templates rather than unconstrained AI narrative — this shaped the differentiating angle below.

## Step 6 — Differentiating Angle

OpNarrate AI is **not** a general medical chatbot. Its defensible differentiation:

1. **Template-grounded generation** — the AI drafts from curated, evidence-based OB-GYN procedure step templates (C-section, TAHBSO, myomectomy, D&C, etc.), not open-ended generation, reducing hallucination risk.
2. **Dictation-to-structure fusion** — the surgeon's short spoken summary of what actually happened is merged into the template narrative, producing a case-specific, not generic, note.
3. **One intake, two outputs** — a single structured form (patient data, OR team, diagnoses, anesthesia) produces both the **Operative Technique** and the **Operative Findings** sections, eliminating duplicate entry.
4. **Philippine hospital-record format** — output format matches conventions used in Philippine hospital operative record forms (fields, sequencing, terminology).
5. **Draft-then-review workflow** — explicit "AI-Generated Draft — Physician Review Required" labeling, positioning the tool as a documentation accelerator, not an autonomous clinical-record generator.

## Step 7 — Go / No-Go Decision

| Validation criterion | Assessment |
|---|---|
| Real problem for a specific, reachable user | ✅ Yes — OB-GYN surgeons/residents, daily pain point |
| At least one genuine AI capability | ✅ Yes — structured generation grounded in templates + dictation transcript |
| Differentiated from generic chatbot wrappers | ✅ Yes — see Step 6 |
| Buildable and deployable within mini-project scope | ✅ Yes — lean Next.js + Claude API build, no auth/DB required for MVP |
| Avoids prohibited categories (payments, CLI-only, landing-page-only) | ✅ Confirmed avoided |

**Decision: GO.** Proceed to PRD, spec, and build.
