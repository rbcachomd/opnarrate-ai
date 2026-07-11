"use client";

import { useEffect, useRef, useState } from "react";

interface DictationRecorderProps {
  value: string;
  onChange: (text: string) => void;
}

/**
 * Wraps the browser's native Web Speech API (SpeechRecognition) so the physician
 * can dictate a summary of the case. No audio is ever transmitted to a server —
 * transcription happens entirely client-side in supporting browsers. Falls back
 * to a plain textarea when the API is unavailable.
 */
export default function DictationRecorder({ value, onChange }: DictationRecorderProps) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-PH";

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        onChange((value ? value + " " : "") + finalTranscript.trim());
      }
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Dictated / typed summary of what was performed
        </label>
        {supported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              isListening
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-obgyn-navy text-white hover:bg-opacity-90"
            }`}
          >
            {isListening ? "● Stop Dictation" : "🎙 Start Dictation"}
          </button>
        )}
      </div>
      {!supported && (
        <p className="text-xs text-amber-700">
          Voice dictation is not supported in this browser. Please type the summary below (works
          in Chrome/Edge desktop).
        </p>
      )}
      <p className="text-xs text-gray-500">
        Tip: mention specific details as you dictate — incision type, suture material and size,
        closure technique — and the AI will use your exact wording instead of generic phrasing.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="e.g., Performed primary low transverse cesarean section via Pfannenstiel incision for arrest of dilatation. Uterine incision closed in two layers with Vicryl 0, continuous locking. Delivered live baby boy, cephalic, good cry. Placenta delivered complete. Estimated blood loss 500 mL. No complications..."
        className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-obgyn-navy focus:outline-none focus:ring-1 focus:ring-obgyn-navy"
        required
        minLength={10}
      />
    </div>
  );
}
