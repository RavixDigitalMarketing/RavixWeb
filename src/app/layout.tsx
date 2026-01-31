import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ravix Digital Agency | Creative Agency",
  description: "Creating digital magic that scales. Premium web design, development, and marketing solutions.",
  keywords: ["digital agency", "web design", "nextjs", "creative agency", "UI/UX"],
  openGraph: {
    title: "Ravix Digital Agency | Creative Agency",
    description: "Creating digital magic that scales.",
    url: "https://ravix.agency",
    siteName: "Ravix Digital Agency",
    locale: "en_US",
    type: "website",
  },
};

import { TransitionProvider } from "@/components/layout/TransitionContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <TransitionProvider>
              {children}
            </TransitionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
