import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OpNarrate AI — OB-GYN Operative Documentation Assistant",
  description:
    "AI-assisted, template-grounded generator for OB-GYN operative technique and findings narratives.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
