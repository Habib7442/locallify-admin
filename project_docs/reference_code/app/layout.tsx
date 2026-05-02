import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import AppwritePing from "@/components/AppwritePing";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Locallify | Cinematic Digital Pages for Local Legends",
    template: "%s | Locallify",
  },
  description: "Transform your business into a digital landmark. Locallify delivers high-conversion, WhatsApp-first digital pages for local legends across India. Born in the North East.",
  keywords: [
    "Locallify Pages",
    "Digital Business Cards India",
    "WhatsApp Marketing India",
    "Local Business Growth NE India",
    "Premium Web Design India",
    "Locallify",
    "Digital Spotlight India"
  ],
  authors: [{ name: "Locallify Team" }],
  creator: "Locallify",
  publisher: "Locallify",
  metadataBase: new URL("https://locallify.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Locallify | Cinematic Digital Pages for Local Legends",
    description: "High-conversion digital presence for India's elite businesses. Managed for you, delivered via WhatsApp.",
    url: "https://locallify.in",
    siteName: "Locallify",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Locallify - The New Local Standard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locallify | Digital Pages for Local Business Legends",
    description: "Claim your digital spotlight across India. Premium pages, zero tech, 100% results.",
    images: ["/og_image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-plus-jakarta text-zinc-900 bg-white selection:bg-[#0066FF] selection:text-white">
        <AppwritePing />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
