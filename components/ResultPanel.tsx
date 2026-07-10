"use client";

import { useState } from "react";

interface ResultPanelProps {
  technique: string;
  findings: string;
}

export default function ResultPanel({ technique, findings }: ResultPanelProps) {
  const [techniqueText, setTechniqueText] = useState(technique);
  const [findingsText, setFindingsText] = useState(findings);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-amber-900">
        <strong>AI-Generated Draft — Physician Review Required.</strong> Review, edit, and verify
        all clinical content before entering it into any official medical record.
      </div>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-obgyn-maroon">Operative Technique</h3>
          <button
            onClick={() => copy("technique", techniqueText)}
            className="rounded-md bg-obgyn-navy px-3 py-1 text-xs font-medium text-white hover:bg-opacity-90"
          >
            {copied === "technique" ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <textarea
          value={techniqueText}
          onChange={(e) => setTechniqueText(e.target.value)}
          rows={14}
          className="w-full rounded-md border border-gray-300 p-3 text-sm leading-relaxed focus:border-obgyn-navy focus:outline-none focus:ring-1 focus:ring-obgyn-navy"
        />
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-obgyn-maroon">Operative Findings</h3>
          <button
            onClick={() => copy("findings", findingsText)}
            className="rounded-md bg-obgyn-navy px-3 py-1 text-xs font-medium text-white hover:bg-opacity-90"
          >
            {copied === "findings" ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <textarea
          value={findingsText}
          onChange={(e) => setFindingsText(e.target.value)}
          rows={8}
          className="w-full rounded-md border border-gray-300 p-3 text-sm leading-relaxed focus:border-obgyn-navy focus:outline-none focus:ring-1 focus:ring-obgyn-navy"
        />
      </section>

      <button
        onClick={() => window.print()}
        className="rounded-md border border-obgyn-navy px-4 py-2 text-sm font-medium text-obgyn-navy hover:bg-obgyn-navy hover:text-white"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
