import Script from "next/script";
import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  IBM_Plex_Mono,
  Manrope,
  Noto_Sans_Malayalam,
} from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "@/styles/globals.css";

import {
  ThemeProvider,
  themeInitScript,
} from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valo.app"),
  title: {
    default: "VALO — Kerala Moves With You",
    template: "%s · VALO",
  },
  description:
    "VALO is Kerala's AI-powered mobility, transit, tourism and local services super app.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#FBF8F1",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#071210",
    },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} ${notoMalayalam.variable}`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>

      <body className="valo-page min-h-screen font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--brand-primary)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ThemeProvider>
              <Header />

              <main id="main-content" className="flex-1">
                {children}
              </main>

              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}