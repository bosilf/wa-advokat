import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NavMenu from "@/components/headers/NavMenu";
import Footer from "@/components/footers/Footer";
import HeroHome from "@/components/heros/HeroHome";
import Navigation from "@/components/headers/navs/Navigation";
import Nav from "@/components/headers/navs/Nav";


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
})

const cursive = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


export const metadata: Metadata = {
  title: "WA Advokatbyrå",
  description: "Välkommen till WA Advokatbyrås hemsida",
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
      <body className="overscroll-y-none min-h-fit flex flex-col overflow-x-hidden">
        <Nav />
        <HeroHome />
        <NavMenu />
          {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
