import type { Metadata } from "next";
import { Geist, Geist_Mono, Phudu } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import CursorBird from "@/components/three/CursorBird";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ranjith | Cinematic AI UI Portfolio",
  description: "Explore the futuristic portfolio of Ranjith, a Frontend Engineer specializing in cinematic UI engineering, interactive motion systems, and AI-powered interfaces.",
  keywords: ["Ranjith", "Frontend Engineer", "Cinematic UI", "AI Systems", "Interactive Web Design", "Next.js Portfolio", "React Developer"],
  openGraph: {
    title: "Ranjith | Cinematic AI UI Portfolio",
    description: "Futuristic digital experiences built with motion, premium UI architecture, and intelligent systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${phudu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CursorBird />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
