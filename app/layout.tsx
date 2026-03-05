import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Rakshit Rangarajan | Full-Stack Developer",
  description: "I build AI Integrated Full-Stack Products.",
  keywords: [
    "Rakshit Rangarajan",
    "ollama",
    "n8n",
    "Angular.js",
    "C#",
    "Large Language Models",
    "Small Language Models",
    "React.js",
    "Tailwind CSS",
    "Bootstrap",
    "TypeScript",
    "Next.js",
    "JavaScript (ES6+)",
    "web development",
    "AI development",
    "AI Personal Assistant",
    "Java",
    "RESTful APIs",
    "MySQL",
    "MongoDB",
    "Python",
    "Bootstrap Studio",
    "Azure Web Services",
    "Google Firebase",
  ],
  authors: [{ name: "Rakshit Rangarajan" }],
  openGraph: {
    title: "Rakshit Rangarajan | Full-Stack Developer",
    description: "I build AI Integrated Full-Stack Products.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
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
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
