"use client";

import { useState } from "react";
import DictationRecorder from "./DictationRecorder";
import { PROCEDURE_OPTIONS } from "@/lib/procedureTemplates";
import { ANESTHESIA_TYPES } from "@/lib/validation";

interface IntakeFormProps {
  onResult: (result: { technique: string; findings: string }) => void;
}

const initialState = {
  procedureId: PROCEDURE_OPTIONS[0]?.id ?? "cesarean_section",
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
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Procedure */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-obgyn-maroon">Procedure</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Procedure Template</label>
            <select
              value={form.procedureId}
              onChange={(e) => update("procedureId", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
            >
              {PROCEDURE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {form.procedureId === "other" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Custom Procedure Name</label>
              <input
                type="text"
                value={form.customProcedureName}
                onChange={(e) => update("customProcedureName", e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Anesthesia Type</label>
            <select
              value={form.anesthesiaType}
              onChange={(e) => update("anesthesiaType", e.target.value as any)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
            >
              {ANESTHESIA_TYPES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Patient */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-obgyn-maroon">Patient Data</legend>
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
      </fieldset>

      {/* Diagnoses */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-obgyn-maroon">Diagnoses</legend>
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
      </fieldset>

      {/* Surgical Team */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-obgyn-maroon">Surgical Team</legend>
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
      </fieldset>

      {/* Dictation */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-semibold text-obgyn-maroon">Case Summary</legend>
        <DictationRecorder
          value={form.dictationText}
          onChange={(v) => update("dictationText", v)}
        />
      </fieldset>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-obgyn-maroon px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Generating…" : "Generate Operative Technique & Findings"}
      </button>
    </form>
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
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-obgyn-navy focus:outline-none focus:ring-1 focus:ring-obgyn-navy"
      />
    </div>
  );
}
