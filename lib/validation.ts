import { z } from "zod";

/**
 * Server-side validation schema for the intake payload sent to /api/generate.
 * Keeping this in a pure module (no network/AI imports) makes it independently
 * unit-testable and reusable from the client for inline form validation.
 */

export const PatientSchema = z.object({
  nameOrInitials: z.string().trim().min(1, "Patient name/initials is required").max(100),
  hospitalNumber: z.string().trim().min(1, "Hospital number is required").max(50),
  age: z.coerce.number().int().min(0).max(120),
  address: z.string().trim().max(200).optional().default(""),
  admissionDateTime: z.string().trim().min(1, "Admission date/time is required").max(60),
  operationDateTime: z.string().trim().min(1, "Operation date/time is required").max(60),
  gravidity: z.coerce.number().int().min(0).max(20).optional().default(0),
  parity: z.string().trim().max(20).optional().default(""),
});

export const DiagnosesSchema = z.object({
  preOp: z.string().trim().min(1, "Pre-operative diagnosis is required").max(300),
  intraOp: z.string().trim().max(300).optional().default(""),
  postOp: z.string().trim().max(300).optional().default(""),
});

export const SurgicalTeamSchema = z.object({
  surgeon: z.string().trim().min(1, "Surgeon is required").max(100),
  assistantSurgeon: z.string().trim().max(100).optional().default(""),
  secondAssist: z.string().trim().max(100).optional().default(""),
  scrubNurse: z.string().trim().max(100).optional().default(""),
  circulatingNurse: z.string().trim().max(100).optional().default(""),
  anesthesiologist: z.string().trim().max(100).optional().default(""),
});

export const ANESTHESIA_TYPES = [
  "General Endotracheal",
  "Spinal",
  "Epidural",
  "Combined Spinal-Epidural",
  "Local with Sedation",
  "Other",
] as const;

export const GenerateRequestSchema = z.object({
  procedureId: z.string().trim().min(1, "Procedure selection is required").max(50),
  customProcedureName: z.string().trim().max(150).optional().default(""),
  anesthesiaType: z.enum(ANESTHESIA_TYPES),
  patient: PatientSchema,
  diagnoses: DiagnosesSchema,
  team: SurgicalTeamSchema,
  dictationText: z
    .string()
    .trim()
    .min(10, "Please provide at least a brief dictated/typed summary of the case")
    .max(6000, "Dictation text is too long (max 6000 characters)"),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export function validateGenerateRequest(payload: unknown) {
  return GenerateRequestSchema.safeParse(payload);
}
