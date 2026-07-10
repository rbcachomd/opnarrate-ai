"use client";

import { useState } from "react";
import IntakeForm from "@/components/IntakeForm";
import ResultPanel from "@/components/ResultPanel";

export default function Home() {
  const [result, setResult] = useState<{ technique: string; findings: string } | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center print:hidden">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-obgyn-maroon text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M9 3v4a3 3 0 003 3v0a3 3 0 003-3V3M6 9v3a6 6 0 0012 0V9M12 15v6M9 21h6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Op<span className="text-obgyn-maroon">Narrate</span> AI
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-obgyn-navy hover:underline print:hidden"
            >
              ← Start a new case
            </button>
          </div>
        )}

        <footer className="mt-12 border-t border-gray-200 pt-5 text-center text-xs leading-relaxed text-gray-400 print:hidden">
          OpNarrate AI is a documentation accelerator, not a substitute for clinical judgment or
          institutional recordkeeping requirements. All output requires physician review.
        </footer>
      </div>
    </main>
  );
}
