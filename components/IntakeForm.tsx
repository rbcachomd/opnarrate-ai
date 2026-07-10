"use client";

import { useState } from "react";
import DictationRecorder from "./DictationRecorder";
import StepIndicator from "./StepIndicator";
import { getProcedureOptionsByCategory, type ProcedureCategory } from "@/lib/procedureTemplates";
import { ANESTHESIA_TYPES } from "@/lib/validation";

interface IntakeFormProps {
  onResult: (result: { technique: string; findings: string }) => void;
}

const STEPS = ["Procedure", "Patient", "Diagnoses", "Surgical Team", "Case Summary"];

const initialState = {
  procedureId: getProcedureOptionsByCategory("obstetric")[0]?.id ?? "cesarean_section",
  customProcedureName: "",
  anesthesiaType: ANESTHESIA_TYPES[0],
  patient: {
    nameOrInitials: "",
    hospitalNumber: "",
    age: "",
    address: "",
    admissionDateTime: "",
    operationDateTime: "",
    gravidity: "",
    parity: "",
  },
  diagnoses: { preOp: "", intraOp: "", postOp: "" },
  team: {
    surgeon: "",
    assistantSurgeon: "",
    secondAssist: "",
    scrubNurse: "",
    circulatingNurse: "",
    anesthesiologist: "",
  },
  dictationText: "",
};

export default function IntakeForm({ onResult }: IntakeFormProps) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Extract<ProcedureCategory, "obstetric" | "gynecologic">>(
    "obstetric"
  );
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (newCategory: "obstetric" | "gynecologic") => {
    setCategory(newCategory);
    const optionsForCategory = getProcedureOptionsByCategory(newCategory);
    setForm((f) => ({
      ...f,
      procedureId: optionsForCategory[0]?.id ?? "other",
      customProcedureName: "",
    }));
  };
  const [stepError, setStepError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateNested = <
    K extends "patient" | "diagnoses" | "team",
    F extends keyof (typeof form)[K]
  >(
    section: K,
    field: F,
    value: (typeof form)[K][F]
  ) => setForm((f) => ({ ...f, [section]: { ...f[section], [field]: value } }));

  const validateStep = (): string | null => {
    if (step === 0 && form.procedureId === "other" && !form.customProcedureName.trim()) {
      return "Please name the custom procedure.";
    }
    if (step === 1) {
      const p = form.patient;
      if (!p.nameOrInitials.trim()) return "Patient name/initials is required.";
      if (!p.hospitalNumber.trim()) return "Hospital number is required.";
      if (!p.age) return "Age is required.";
      if (!p.admissionDateTime.trim()) return "Admission date/time is required.";
      if (!p.operationDateTime.trim()) return "Operation date/time is required.";
    }
    if (step === 2 && !form.diagnoses.preOp.trim()) {
      return "Pre-operative diagnosis is required.";
    }
    if (step === 3 && !form.team.surgeon.trim()) {
      return "Surgeon is required.";
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.dictationText.trim().length < 10) {
      setStepError("Please provide at least a brief dictated/typed summary of the case (10+ characters).");
      return;
    }
    setStepError(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate operative note.");
      }
      onResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <StepIndicator steps={STEPS} currentStep={step} />

      <form onSubmit={handleSubmit}>
        {/* Step 0: Procedure */}
        {step === 0 && (
          <Section title="Procedure &amp; Anesthesia">
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">Procedure Category</label>
              <div className="mt-1.5 inline-flex rounded-lg border border-gray-300 p-1">
                {(["obstetric", "gynecologic"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                      category === cat
                        ? "bg-obgyn-maroon text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat === "obstetric" ? "Obstetric" : "Gynecologic"}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Procedure Template"
                value={form.procedureId}
                onChange={(v) => update("procedureId", v)}
                options={getProcedureOptionsByCategory(category).map((o) => ({
                  value: o.id,
                  label: o.label,
                }))}
              />
              {form.procedureId === "other" && (
                <Field
                  label="Custom Procedure Name"
                  required
                  value={form.customProcedureName}
                  onChange={(v) => update("customProcedureName", v)}
                />
              )}
              <SelectField
                label="Anesthesia Type"
                value={form.anesthesiaType}
                onChange={(v) => update("anesthesiaType", v as any)}
                options={ANESTHESIA_TYPES.map((a) => ({ value: a, label: a }))}
              />
            </div>
          </Section>
        )}

        {/* Step 1: Patient */}
        {step === 1 && (
          <Section title="Patient Data">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Patient Name / Initials"
                required
                value={form.patient.nameOrInitials}
                onChange={(v) => updateNested("patient", "nameOrInitials", v)}
              />
              <Field
                label="Hospital Number"
                required
                value={form.patient.hospitalNumber}
                onChange={(v) => updateNested("patient", "hospitalNumber", v)}
              />
              <Field
                label="Age"
                type="number"
                required
                value={form.patient.age}
                onChange={(v) => updateNested("patient", "age", v)}
              />
              <Field
                label="Address"
                value={form.patient.address}
                onChange={(v) => updateNested("patient", "address", v)}
              />
              <Field
                label="Admission Date/Time"
                required
                placeholder="e.g., July 10, 2026, 0600H"
                value={form.patient.admissionDateTime}
                onChange={(v) => updateNested("patient", "admissionDateTime", v)}
              />
              <Field
                label="Operation Date/Time"
                required
                placeholder="e.g., July 10, 2026, 0830H"
                value={form.patient.operationDateTime}
                onChange={(v) => updateNested("patient", "operationDateTime", v)}
              />
              <Field
                label="Gravidity"
                type="number"
                value={form.patient.gravidity}
                onChange={(v) => updateNested("patient", "gravidity", v)}
              />
              <Field
                label="Parity"
                placeholder="e.g., 2103"
                value={form.patient.parity}
                onChange={(v) => updateNested("patient", "parity", v)}
              />
            </div>
          </Section>
        )}

        {/* Step 2: Diagnoses */}
        {step === 2 && (
          <Section title="Diagnoses">
            <div className="grid gap-4">
              <Field
                label="Pre-operative Diagnosis"
                required
                value={form.diagnoses.preOp}
                onChange={(v) => updateNested("diagnoses", "preOp", v)}
              />
              <Field
                label="Intra-operative Diagnosis"
                value={form.diagnoses.intraOp}
                onChange={(v) => updateNested("diagnoses", "intraOp", v)}
              />
              <Field
                label="Post-operative Diagnosis"
                value={form.diagnoses.postOp}
                onChange={(v) => updateNested("diagnoses", "postOp", v)}
              />
            </div>
          </Section>
        )}

        {/* Step 3: Surgical Team */}
        {step === 3 && (
          <Section title="Surgical Team">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Surgeon"
                required
                value={form.team.surgeon}
                onChange={(v) => updateNested("team", "surgeon", v)}
              />
              <Field
                label="Assistant Surgeon"
                value={form.team.assistantSurgeon}
                onChange={(v) => updateNested("team", "assistantSurgeon", v)}
              />
              <Field
                label="Second Assist"
                value={form.team.secondAssist}
                onChange={(v) => updateNested("team", "secondAssist", v)}
              />
              <Field
                label="Scrub Nurse"
                value={form.team.scrubNurse}
                onChange={(v) => updateNested("team", "scrubNurse", v)}
              />
              <Field
                label="Circulating Nurse"
                value={form.team.circulatingNurse}
                onChange={(v) => updateNested("team", "circulatingNurse", v)}
              />
              <Field
                label="Anesthesiologist"
                value={form.team.anesthesiologist}
                onChange={(v) => updateNested("team", "anesthesiologist", v)}
              />
            </div>
          </Section>
        )}

        {/* Step 4: Case Summary */}
        {step === 4 && (
          <Section title="Case Summary">
            <DictationRecorder
              value={form.dictationText}
              onChange={(v) => update("dictationText", v)}
            />
          </Section>
        )}

        {stepError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {stepError}
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || loading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-0"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg bg-obgyn-navy px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-obgyn-maroon px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? "Generating draft…" : "Generate Operative Technique & Findings"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-base font-semibold text-obgyn-maroon">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-obgyn-maroon"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-obgyn-navy focus:outline-none focus:ring-2 focus:ring-obgyn-navy/20"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-obgyn-navy focus:outline-none focus:ring-2 focus:ring-obgyn-navy/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
