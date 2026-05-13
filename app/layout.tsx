import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.suyashpatil.me"),
  title: {
    default: "Suyash Patil — Software Engineer · Data & AI Systems",
    template: "%s · Suyash Patil",
  },
  description:
    "Software Engineer with 3.5+ years building data-intensive backend systems, ML platforms, MLOps workflows, and GenAI applications in financial services.",
  keywords: [
    "Suyash Patil",
    "Software Engineer",
    "Machine Learning Engineer",
    "ML Platform Engineer",
    "Data Engineer",
    "GenAI Engineer",
    "RAG",
    "MLOps",
    "Apache Spark",
    "Airflow",
    "AWS",
    "Python",
    "Capgemini",
    "IIIT Bhopal",
  ],
  authors: [{ name: "Suyash Pradeep Patil" }],
  creator: "Suyash Pradeep Patil",
  openGraph: {
    title: "Suyash Patil — Software Engineer · Data & AI Systems",
    description:
      "Building data-intensive backend systems, ML platforms, MLOps workflows, and GenAI applications.",
    url: "https://www.suyashpatil.me",
    siteName: "Suyash Patil",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suyash Patil — Software Engineer · Data & AI Systems",
    description:
      "Building data-intensive backend systems, ML platforms, MLOps workflows, and GenAI applications.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeInit = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      if (stored === 'fun') document.documentElement.classList.add('fun');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-bg text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
