import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import { getAppUrl } from "@/lib/utils/url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const appUrl = getAppUrl();

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Write3 | AI-Powered Web3 Content Generator",
  description: "Generate Web3-native content for Discord, Telegram, Twitter/X, and Farcaster.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Write3 | AI-Powered Web3 Content Generator",
    description: "Generate authentic Web3-native content for Discord, Telegram, Twitter/X, Farcaster, blogs, and newsletters.",
    url: appUrl,
    siteName: "Write3",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
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
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster theme="dark" position="bottom-right" closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}


