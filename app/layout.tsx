import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import {
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/seo";

const DEFAULT_DESCRIPTION =
  "Anadolu Yakası'nda çalışan ya da arızalı beyaz eşya, ikinci el mobilya ve her tür hurda metal alımı. Yerinde tartım, kantar şeffaflığı ve kapınızda peşin nakit ödeme.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Anadolu Yakası Hurda & Beyaz Eşya Alımı`,
    template: `%s | ${site.brand}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: site.brand,
  keywords: site.seo.keywords,
  authors: [{ name: site.brand, url: site.url }],
  creator: site.brand,
  publisher: site.brand,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} — Anadolu Yakası Hurda & Beyaz Eşya Alımı`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.brand} — Hurda & Beyaz Eşya Alımı`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — Anadolu Yakası Hurda & Beyaz Eşya Alımı`,
    description: DEFAULT_DESCRIPTION,
    images: [site.seo.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: site.brand,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "business",
  ...(site.seo.verification.google || site.seo.verification.yandex
    ? {
        verification: {
          ...(site.seo.verification.google ? { google: site.seo.verification.google } : {}),
          ...(site.seo.verification.yandex ? { yandex: site.seo.verification.yandex } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
    { media: "(prefers-color-scheme: light)", color: "#0b0d10" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchema = jsonLdGraph([
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
  ]);

  return (
    <html lang="tr">
      <body>
        <JsonLd data={globalSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={site.gaMeasurementId} />
      )}
    </html>
  );
}
