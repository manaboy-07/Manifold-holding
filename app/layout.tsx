import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Navigation, Footer } from "@/components/site";
import MotionShell from "../components/motion/MotionShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Manifold Holdings — Enterprise Technology & Digital Transformation",

  description:
    "Manifold Holdings brings together specialised companies across enterprise infrastructure, networks, cloud modernisation, cybersecurity, datacentres, and applied AI.",

  keywords: [
    "Enterprise Infrastructure",
    "Digital Transformation",
    "Manifold Computers Limited",
    "Manifold Enterprise Solutions",
    "Datacentre Solutions",
    "West Africa Technology",
  ],

  authors: [{ name: "Manifold Holdings" }],

  openGraph: {
    title: "Manifold Holdings — Enterprise Technology Foundations",
    description:
      "Enterprise infrastructure and digital transformation for organizations operating at scale.",
    type: "website",
    locale: "en_US",
    siteName: "Manifold Holdings",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manifold Holdings",
    description:
      "Enterprise infrastructure and digital transformation across West Africa.",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col bg-white font-sans text-black selection:bg-[#FD018B] selection:text-white">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-[#FD018B] px-5 py-3 text-sm font-semibold text-white shadow-lg focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FD018B]"
        >
          Skip to content
        </a>

        {/* The corrected Navigation includes its own Suspense boundary. */}
        <Navigation />

        <main
          id="main-content"
          tabIndex={-1}
          className="w-full flex-1 pt-[76px] focus:outline-none"
        >
          <MotionShell>{children}</MotionShell>
        </main>

        {/* The corrected Footer calculates its year inside useEffect. */}
        <Footer />
      </body>
    </html>
  );
}
