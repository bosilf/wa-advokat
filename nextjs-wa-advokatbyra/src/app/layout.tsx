import type { Metadata } from "next"
import {
  Cormorant_Garamond,
  Dancing_Script,
  Poppins,
} from "next/font/google"

import "./globals.css"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Footer from "@/components/footers/Footer"
import Nav from "@/components/headers/navs/Nav"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const cursive = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "WA Advokatbyrå",
  description: "Advokater specialiserade inom entreprenadrätt och offentlig upphandling",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="sv"
      className={`${serif.variable} ${cursive.variable} ${sans.variable} snap-y snap-proximity motion-reduce:snap-none h-full antialiased`}
    >
      <body className="selection-brand overscroll-y-none min-h-fit flex flex-col overflow-x-hidden">
        <Nav />
        <div className="relative z-20 drop-shadow-5xl bg-canvas min-h-screen">
          {children}
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}