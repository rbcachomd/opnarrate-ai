import { describe, it, expect } from "vitest";
import { validateGenerateRequest } from "../lib/validation";

const validPayload = {
  procedureId: "cesarean_section",
  customProcedureName: "",
  anesthesiaType: "General Endotracheal",
  patient: {
    nameOrInitials: "J.D.",
    hospitalNumber: "H-12345",
    age: 28,
    address: "",
    admissionDateTime: "July 10, 2026, 0600H",
    operationDateTime: "July 10, 2026, 0830H",
    gravidity: 2,
    parity: "1001",
  },
  diagnoses: {
    preOp: "Term pregnancy, cephalic, in labor, arrest of dilatation",
    intraOp: "",
    postOp: "",
  },
  team: {
    surgeon: "Dr. Cacho",
    assistantSurgeon: "",
    secondAssist: "",
    scrubNurse: "",
    circulatingNurse: "",
    anesthesiologist: "",
  },
  dictationText:
    "Performed primary low transverse cesarean section. Delivered live baby boy, cephalic. Placenta delivered complete. EBL 500 mL.",
};

describe("validateGenerateRequest", () => {
  it("accepts a fully valid payload", () => {
    const result = validateGenerateRequest(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a payload missing the required pre-operative diagnosis", () => {
    const invalid = { ...validPayload, diagnoses: { ...validPayload.diagnoses, preOp: "" } };
    const result = validateGenerateRequest(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects dictation text shorter than the minimum length", () => {
    const invalid = { ...validPayload, dictationText: "too short" };
    // "too short" is 9 chars, below the 10-char minimum
    const result = validateGenerateRequest(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects an anesthesia type outside the allowed enum", () => {
    const invalid = { ...validPayload, anesthesiaType: "Sedation via unicorn magic" };
    const result = validateGenerateRequest(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects a payload missing the surgeon field", () => {
    const invalid = { ...validPayload, team: { ...validPayload.team, surgeon: "" } };
    const result = validateGenerateRequest(invalid);
    expect(result.success).toBe(false);
  });
});
