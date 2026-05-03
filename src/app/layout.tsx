import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

/**
 * Advanced SEO metadata for ElectoGuide.
 * Includes OpenGraph tags, Twitter Cards, and keywords for maximum SEO score.
 */
export const metadata: Metadata = {
  title: "ElectoGuide | Interactive AI-Powered Election Guide",
  description:
    "An interactive educational platform simplifying the US election process with AI-powered guidance, interactive flashcards, and a visual voting timeline.",
  keywords: [
    "election guide",
    "voting",
    "AI assistant",
    "electoral college",
    "US elections",
    "voter registration",
    "civic education",
  ],
  authors: [{ name: "ElectoGuide Team" }],
  openGraph: {
    title: "ElectoGuide | Interactive AI-Powered Election Guide",
    description:
      "Navigate the election process with confidence using our AI assistant, interactive flashcards, and visual timeline.",
    type: "website",
    locale: "en_US",
    siteName: "ElectoGuide",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectoGuide | AI-Powered Election Guide",
    description:
      "Navigate the election process with confidence using our AI assistant and interactive learning tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root Layout Component
 * Renders the global dashboard layout with a persistent Sidebar and a scrollable content area.
 * @param {object} props - The layout props containing children pages.
 * @returns {JSX.Element} The root HTML layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <div className="dashboard-layout">
          <Sidebar />
          <div className="dashboard-content" role="main">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

