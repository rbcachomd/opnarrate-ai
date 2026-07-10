"use client";

import { useState } from "react";

interface ResultPanelProps {
  technique: string;
  findings: string;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M7 3.5A1.5 1.5 0 018.5 2h5A1.5 1.5 0 0115 3.5v9A1.5 1.5 0 0113.5 14h-5A1.5 1.5 0 017 12.5v-9z" />
      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-1h-1.5v1h-7v-9H6V6H4.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.9 3.9 6.7-6.7a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
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
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 print:hidden">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.28 11.18c.75 1.334-.213 2.987-1.742 2.987H3.72c-1.53 0-2.493-1.653-1.743-2.987l6.28-11.18zM10 8a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 8zm0 7a.9.9 0 100-1.8.9.9 0 000 1.8z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm text-amber-900">
          <strong>AI-Generated Draft — Physician Review Required.</strong> Review, edit, and
          verify all clinical content before entering it into any official medical record.
        </p>
      </div>

      <ResultCard
        title="Operative Technique"
        text={techniqueText}
        onTextChange={setTechniqueText}
        rows={16}
        copied={copied === "technique"}
        onCopy={() => copy("technique", techniqueText)}
      />

      <ResultCard
        title="Operative Findings"
        text={findingsText}
        onTextChange={setFindingsText}
        rows={8}
        copied={copied === "findings"}
        onCopy={() => copy("findings", findingsText)}
      />

      <div className="flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-obgyn-navy px-4 py-2 text-sm font-medium text-obgyn-navy transition-colors hover:bg-obgyn-navy hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M5 2.75A.75.75 0 015.75 2h8.5a.75.75 0 01.75.75V6h.5A2.25 2.25 0 0117.75 8.25v4.5A2.25 2.25 0 0115.5 15h-.5v1.25a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75V15h-.5A2.25 2.25 0 012.25 12.75v-4.5A2.25 2.25 0 014.5 6h.5V2.75zm1.5.75V6h7V3.5h-7zm-2 6.25a.75.75 0 000 1.5h.5v-1.5h-.5zM6.5 12v3h7v-3h-7z"
              clipRule="evenodd"
            />
          </svg>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

function ResultCard({
  title,
  text,
  onTextChange,
  rows,
  copied,
  onCopy,
}: {
  title: string;
  text: string;
  onTextChange: (v: string) => void;
  rows: number;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-obgyn-maroon">
          {title}
        </h3>
        <button
          onClick={onCopy}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors print:hidden ${
            copied
              ? "bg-green-600 text-white"
              : "bg-obgyn-navy text-white hover:opacity-90"
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        rows={rows}
        className="w-full resize-y border-0 p-5 text-sm leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-obgyn-navy/20"
      />
    </section>
  );
}
