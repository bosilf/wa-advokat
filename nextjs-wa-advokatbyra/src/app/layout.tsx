import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Poppins } from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cursive = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WA Advokatbyrå",
  description:
    "Advokater specialiserade inom entreprenadrätt och offentlig upphandling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${serif.variable} ${cursive.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="overscroll-y-none min-h-fit flex flex-col overflow-x-hidden">
        <div className="fixed pointer-events-none bg-white/20 -top-200 mix-blend-overlay rounded-full -right-100 z-9 size-300 blur-3xl" />
        <div className="fixed pointer-events-none bg-contract-light/10 mix-blend-overlay top-0 rounded-full right-0 z-2 size-100 blur-3xl" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
