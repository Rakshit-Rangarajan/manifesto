import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import LenisProvider from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ModalProvider } from "@/components/ModalContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rakshit Rangarajan",
  jobTitle: "Full-Stack Developer & AI Enthusiast",
  url: "https://rakshitr.co.in",
  description: "Full-Stack Developer who masters AI to automate workflows, fix vibe-coded code, and deliver maximum efficiency. Built workflows before the AI boom.",
  sameAs: [
    "https://github.com/Rakshit-Rangarajan",
    "https://x.com/rakshit_r",
    "https://linkedin.com/in/rakshit-rangarajan",
  ],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "GSAP",
    "WebGL",
    "AI Integration",
    "Large Language Models",
    "Vibe Coding",
    "Automation",
  ],
  alumniOf: "University of Texas at Dallas",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dallas",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rakshitr.co.in"),
  title: "Rakshit Rangarajan | Full-Stack Developer & AI Enthusiast",
  description: "Full-Stack Developer who weaponizes AI to automate workflows, fix vibe-coded code, and deliver maximum efficiency. Built workflows before the AI boom.",
  keywords: [
    "Rakshit Rangarajan",
    "Full-Stack Developer",
    "AI Enthusiast",
    "React Developer",
    "Next.js Developer",
    "Vibe Coding",
    "AI Automation",
    "TypeScript",
    "GSAP Animations",
    "WebGL Developer",
    "Dallas Developer",
    "Freelance Developer",
    "AI Tools Expert",
    "Prompt Engineering",
  ],
  authors: [{ name: "Rakshit Rangarajan" }],
  creator: "Rakshit Rangarajan",
  publisher: "Rakshit Rangarajan",
  openGraph: {
    title: "Rakshit Rangarajan | Full-Stack Developer & AI Enthusiast",
    description: "I weaponize AI to automate workflows, fix vibe-coded code, and deliver maximum efficiency. Studied and worked pre-AI, mastered it post-AI.",
    type: "website",
    url: "https://rakshitr.co.in",
    siteName: "Rakshit Rangarajan",
    locale: "en_US",
    alternateLocale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakshit Rangarajan | Full-Stack Developer & AI Enthusiast",
    description: "I weaponize AI to automate workflows, fix vibe-coded code, and deliver maximum efficiency.",
    creator: "@rakshit_r",
    site: "@rakshit_r",
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased scrollbar-hide">
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_CLOUDFLARE_TOKEN"}'
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ModalProvider>
            <LenisProvider>
              <CustomCursor />
              {children}
            </LenisProvider>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
