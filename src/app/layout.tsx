import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingConsultationButton } from "@/components/layout/FloatingConsultationButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EduPlan360 | Study Abroad Simplified",
  description: "Expert guidance for your international education journey. Get admitted to top universities worldwide with visa support and scholarship assistance.",
  icons: {
    icon: '/favicon.ico',
  },
};

import { CookieConsent } from "@/components/ui/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${poppins.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="sticky top-0 z-50">
          <UtilityBar />
          <Navbar />
        </header>
        {children}
        <Footer />
        <FloatingConsultationButton />
        <CookieConsent />
      </body>
    </html>
  );
}
