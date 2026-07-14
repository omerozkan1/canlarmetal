import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Anadolu Yakası Hurda & Beyaz Eşya Alımı`,
    template: `%s | ${site.brand}`,
  },
  description:
    "Anadolu Yakası'nda çalışan ya da arızalı beyaz eşya, ikinci el mobilya ve her tür hurda metal alımı. Yerinde tartım, kantar şeffaflığı ve kapınızda peşin nakit ödeme.",
  keywords: [
    "hurda alımı",
    "beyaz eşya alımı",
    "hurda metal",
    "eşya tahliyesi",
    "İstanbul Anadolu Yakası",
    "ikinci el eşya",
  ],
  openGraph: {
    title: `${site.brand} — ${site.region}`,
    description:
      "Beyaz eşya, hurda metal ve ikinci el eşya alımı. Nakit ödeme, yerinde alım.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
