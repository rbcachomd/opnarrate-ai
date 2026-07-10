import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpNarrate AI — OB-GYN Operative Documentation Assistant",
  description:
    "AI-assisted, template-grounded generator for OB-GYN operative technique and findings narratives.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
