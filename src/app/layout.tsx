import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { getAppUrl } from "@/lib/utils/url";
import { defaultMetadata } from "@/lib/seo/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const appUrl = getAppUrl();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Write3",
  url: appUrl,
  description: "Generate authentic Web3-native content for Discord, Telegram, Twitter/X, Farcaster, blogs, and newsletters.",
  applicationCategory: "ContentGeneration",
  operatingSystem: "Web",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan" },
    { "@type": "Offer", price: "29", priceCurrency: "USD", description: "Creator plan" },
    { "@type": "Offer", price: "69", priceCurrency: "USD", description: "Pro plan" },
    { "@type": "Offer", price: "199", priceCurrency: "USD", description: "Agency plan" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Write3 | AI-Powered Web3 Content Generator",
    template: "%s | Write3",
  },
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  verification: {
    google: "gfSpne3c8Ou3eCSNSUGXFjtZmv4S8bo4_7CfiN3qyqY",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Write3 | AI-Powered Web3 Content Generator",
    description: defaultMetadata.description as string,
    url: appUrl,
    siteName: "Write3",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Write3 - AI-Powered Web3 Content Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write3 | AI-Powered Web3 Content Generator",
    description: "Generate authentic Web3-native content for your community.",
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <QueryProvider>
          <AuthProvider>
            {children}
            <Analytics />
            <Toaster theme="dark" position="bottom-right" closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}


