"use client";

import { useState } from "react";
import IntakeForm from "@/components/IntakeForm";
import ResultPanel from "@/components/ResultPanel";

export default function Home() {
  const [result, setResult] = useState<{ technique: string; findings: string } | null>(null);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-obgyn-maroon">OpNarrate AI</h1>
        <p className="mt-1 text-sm text-gray-600">
          Evidence-based Operative Technique &amp; Findings generator for OB-GYN — dictate your
          case summary, review a grounded AI draft in seconds.
        </p>
      </header>

      {!result ? (
        <IntakeForm onResult={setResult} />
      ) : (
        <div className="space-y-4">
          <ResultPanel technique={result.technique} findings={result.findings} />
          <button
            onClick={() => setResult(null)}
            className="text-sm font-medium text-obgyn-navy underline"
          >
            ← Start a new case
          </button>
        </div>
      )}

      <footer className="mt-12 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
        OpNarrate AI is a documentation accelerator, not a substitute for clinical judgment or
        institutional recordkeeping requirements. All output requires physician review.
      </footer>
    </main>
  );
}
