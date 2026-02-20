import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { MarketingShell } from "@/components/layout/MarketingShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "EduPlan360 | Study Abroad Simplified",
  description: "Expert guidance for your international education journey.",
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hdrs = await headers()
  const nextUrl = hdrs.get('x-invoke-path') ?? hdrs.get('x-pathname') ?? hdrs.get('next-url') ?? ''
  const isAppRoute = nextUrl.startsWith('/admin') || nextUrl.startsWith('/portal')

  const fontClasses = [
    geistSans.variable, geistMono.variable, playfair.variable,
    poppins.variable, inter.variable, "antialiased"
  ].join(' ')

  return (
    <html lang="en">
      <body className={`${fontClasses} ${isAppRoute ? 'bg-slate-50 min-h-screen' : 'flex flex-col min-h-screen'}`}>
        {!isAppRoute && <MarketingHeader />}
        {children}
        {!isAppRoute && (
          <>
            <MarketingShell />
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  )
}

