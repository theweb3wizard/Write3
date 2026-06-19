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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Write3",
      url: appUrl,
      description: "Generate authentic Web3-native content for Twitter, Discord, Reddit, and Telegram. AI writing tool built for crypto communities, DAOs, and DeFi protocols.",
      applicationCategory: "ContentGeneration",
      operatingSystem: "Web",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan — 25 generations/month" },
        { "@type": "Offer", price: "10", priceCurrency: "USD", description: "Starter — 100 credits" },
        { "@type": "Offer", price: "35", priceCurrency: "USD", description: "Creator — 500 credits" },
      ],
      featureList: [
        "Multi-platform content generation for Twitter, Discord, Reddit, Telegram, Blog, Newsletter",
        "Brand voice training and style alignment",
        "One-click publish to Twitter and Discord",
        "USDC on Solana payments — no credit card required",
        "AI compliance guardrails for Web3 content",
      ],
    },
    {
      "@type": "Organization",
      name: "Write3",
      url: appUrl,
      description: "AI-powered Web3 content generation platform for crypto communities, DAOs, and DeFi protocols.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
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
    title: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
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
        alt: "Write3 - AI-powered Web3 content with compliance guardrails",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
    description: "Clone your brand voice. Generate compliant Web3 content. No SEC risk.",
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


