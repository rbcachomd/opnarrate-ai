import { getTemplate } from "./procedureTemplates";
import type { GenerateRequest } from "./validation";

/**
 * Pure function: assembles the system + user prompt sent to Claude.
 * No network calls here — this keeps prompt logic independently unit-testable.
 */

export const SYSTEM_PROMPT = `You are a clinical documentation assistant supporting Filipino OB-GYN surgeons.
You draft OPERATIVE TECHNIQUE and OPERATIVE FINDINGS sections for a hospital operative record.

Rules you must always follow:
1. Ground the Operative Technique in the provided procedure step outline, adapted using the physician's dictated summary. Do not invent steps that contradict the dictation.
2. Write in formal, third-person, past-tense operative-note style used in Philippine hospital records.
3. TECHNICAL SPECIFICITY: the reference step outline provides generic, structural wording (e.g., "appropriate suture," "planned incision"). Treat this generic wording only as a fallback. Whenever the physician's dictation states a concrete technical detail — suture material and size (e.g., Vicryl 0, chromic 2-0, Monocryl 3-0), incision type (e.g., Pfannenstiel, Maylard, Joel-Cohen, midline vertical), needle/instrument specifics, closure technique (e.g., continuous locking, interrupted, Connell, subcuticular), number of layers, or any other named technical detail — you must use that exact detail in the corresponding step of the narrative instead of the generic wording. Never silently drop a technical specific the physician dictated, and never invent a specific (e.g., a suture brand or size) that was not stated.
4. The Operative Findings section should summarize what was found intraoperatively (organs, pathology, estimated blood loss if mentioned, complications if any), based only on the dictation and provided diagnoses — do not fabricate findings not supported by the input.
5. Never claim certainty about information not provided; if a detail is not mentioned, omit it or keep the reference outline's generic phrasing rather than guessing a specific.
6. Return your response as strict JSON with exactly two string fields: "technique" and "findings". Do not include any text outside the JSON object.`;

export function buildUserPrompt(input: GenerateRequest): string {
  const template = getTemplate(input.procedureId);
  const procedureName =
    input.procedureId === "other" && input.customProcedureName
      ? input.customProcedureName
      : template.label;

  const teamLines = [
    `Surgeon: ${input.team.surgeon}`,
    input.team.assistantSurgeon ? `Assistant Surgeon: ${input.team.assistantSurgeon}` : null,
    input.team.secondAssist ? `Second Assist: ${input.team.secondAssist}` : null,
    input.team.scrubNurse ? `Scrub Nurse: ${input.team.scrubNurse}` : null,
    input.team.circulatingNurse ? `Circulating Nurse: ${input.team.circulatingNurse}` : null,
    input.team.anesthesiologist ? `Anesthesiologist: ${input.team.anesthesiologist}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `PROCEDURE: ${procedureName}

REFERENCE STEP OUTLINE (ground the narrative in this sequence, adapting to the dictation below):
${template.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

CASE DATA:
- Age: ${input.patient.age}
- Gravidity/Parity: G${input.patient.gravidity} P${input.patient.parity || "0"}
- Admission: ${input.patient.admissionDateTime}
- Operation start: ${input.patient.operationDateTime}
- Anesthesia: ${input.anesthesiaType}

DIAGNOSES:
- Pre-operative: ${input.diagnoses.preOp}
- Intra-operative: ${input.diagnoses.intraOp || "(not specified)"}
- Post-operative: ${input.diagnoses.postOp || "(not specified)"}

SURGICAL TEAM:
${teamLines}

PHYSICIAN'S DICTATED SUMMARY OF WHAT WAS PERFORMED:
"""
${input.dictationText}
"""

Using the reference step outline as your structural anchor and the dictated summary as the source of case-specific detail, produce the Operative Technique and Operative Findings. If the dictation mentions specific suture types/sizes, incision type, closure technique, or other named technical detail, use that exact wording in place of the outline's generic phrasing at the corresponding step. Respond with strict JSON only: {"technique": "...", "findings": "..."}`;
}
