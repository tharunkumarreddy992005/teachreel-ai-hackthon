import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechReel AI - Don't Stop Scrolling. Upgrade What You Discover.",
  description: "AI-powered Latent Interest Discovery, Dynamic Interest DNA, and Pedagogical Recommendation Engine for Short-Form Video.",
  keywords: ["AI recommendations", "learning roadmap", "short-form education", "interest graph", "latent inference", "MongoDB Atlas"],
  authors: [{ name: "TechReel AI Engineering Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#090d16",
  openGraph: {
    title: "TechReel AI - Educational Short-Form Video Recommender",
    description: "Don't stop scrolling. Upgrade what you discover with AI-driven latent interest inference.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
