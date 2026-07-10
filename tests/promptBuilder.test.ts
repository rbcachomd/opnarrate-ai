import { describe, it, expect } from "vitest";
import { buildUserPrompt, SYSTEM_PROMPT } from "../lib/promptBuilder";
import type { GenerateRequest } from "../lib/validation";

const sample: GenerateRequest = {
  procedureId: "tahbso",
  customProcedureName: "",
  anesthesiaType: "Spinal",
  patient: {
    nameOrInitials: "M.R.",
    hospitalNumber: "H-99887",
    age: 47,
    address: "",
    admissionDateTime: "July 9, 2026, 1800H",
    operationDateTime: "July 10, 2026, 0700H",
    gravidity: 3,
    parity: "3003",
  },
  diagnoses: {
    preOp: "Myoma uteri, large",
    intraOp: "Myoma uteri with adenomyosis",
    postOp: "Myoma uteri with adenomyosis, s/p TAHBSO",
  },
  team: {
    surgeon: "Dr. Cacho",
    assistantSurgeon: "Dr. Santos",
    secondAssist: "",
    scrubNurse: "N. Reyes",
    circulatingNurse: "N. Cruz",
    anesthesiologist: "Dr. Bautista",
  },
  dictationText: "Uterus enlarged to 14 weeks size, adnexa grossly normal bilaterally, EBL 400 mL.",
};

describe("buildUserPrompt", () => {
  it("includes the procedure template steps grounding the generation", () => {
    const prompt = buildUserPrompt(sample);
    expect(prompt).toContain("REFERENCE STEP OUTLINE");
    expect(prompt).toContain("Round ligaments identified");
  });

  it("includes all required case data fields", () => {
    const prompt = buildUserPrompt(sample);
    expect(prompt).toContain("Dr. Cacho");
    expect(prompt).toContain("Myoma uteri, large");
    expect(prompt).toContain("Spinal");
    expect(prompt).toContain(sample.dictationText);
  });

  it("instructs strict JSON output in the system prompt", () => {
    expect(SYSTEM_PROMPT).toContain('"technique"');
    expect(SYSTEM_PROMPT).toContain('"findings"');
  });

  it("falls back to the custom procedure name for 'other' procedures", () => {
    const custom: GenerateRequest = {
      ...sample,
      procedureId: "other",
      customProcedureName: "Laparoscopic Salpingectomy",
    };
    const prompt = buildUserPrompt(custom);
    expect(prompt).toContain("Laparoscopic Salpingectomy");
  });
});
