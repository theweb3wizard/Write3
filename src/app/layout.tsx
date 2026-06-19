import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { getAppUrl } from "@/lib/utils/url";
import { defaultMetadata, organizationSchema, softwareAppSchema, siteTitle } from "@/lib/seo/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const appUrl = getAppUrl();

const jsonLd = { "@context": "https://schema.org", "@graph": [softwareAppSchema, organizationSchema] };

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: siteTitle,
    template: "%s | Write3",
  },
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  verification: {
    google: "gfSpne3c8Ou3eCSNSUGXFjtZmv4S8bo4_7CfiN3qyqY",
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: siteTitle,
    description: "Clone your brand voice with AI. Generate compliance-safe Web3 content for Twitter, Discord, Reddit. Built-in SEC/FCA guardrails. Pay with USDC. No generic AI copy.",
    url: appUrl,
    siteName: "Write3",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Write3 — Compliance-safe AI voice clone for Web3 content" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "AI voice clone for Web3. Write once, publish everywhere. SEC/FCA compliant. USDC on Solana.",
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


