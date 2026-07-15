import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import { site } from "@/config/site";
import { buildGenericMessage } from "@/lib/whatsapp";
import { pageMetadata, jsonLdGraph, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description: `Canlar Metal ile iletişime geçin. 7/24 WhatsApp, iki telefon hattı ve e-posta. ${site.region}, Kadıköy.`,
  path: "/iletisim",
});

export default function IletisimPage() {
  const schema = jsonLdGraph([
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "İletişim", path: "/iletisim" },
    ]),
    { "@type": "ContactPage", name: "İletişim — Canlar Metal", url: `${site.url}/iletisim` },
  ]);

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "7/24 Destek Hattı",
      href: null,
    },
    { icon: Mail, title: "E-posta", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, title: "Adres", value: site.address, href: null },
  ];

  const phones = [
    { name: "Sercan Türk", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { name: "Emircan Türk", value: site.phone2Display, href: `tel:${site.phone2}` },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }]} />
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        İletişim
      </h1>
      <p className="mt-3 max-w-2xl text-graphite-400">
        Tek dönüşüm kanalımız WhatsApp'tır — fotoğraf gönderip hızlıca fiyat
        alabilirsiniz. Aşağıdaki kanallardan da bize ulaşabilirsiniz.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((c) => {
          const Icon = c.icon;
          const inner = (
            <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-graphite-850 p-5 transition hover:border-copper-400/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-copper-500/15 text-copper-300">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{c.title}</span>
                <span className="mt-0.5 block text-sm text-graphite-400">{c.value}</span>
              </span>
            </div>
          );
          return c.href ? (
            <a key={c.title} href={c.href}>{inner}</a>
          ) : (
            <div key={c.title}>{inner}</div>
          );
        })}
      </div>

      {/* Telefon — iki numara ortak grid */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-white">Telefon</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {phones.map((p) => (
            <a key={p.href} href={p.href}>
              <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-graphite-850 p-5 transition hover:border-copper-400/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-copper-500/15 text-copper-300">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{p.name}</span>
                  <span className="mt-0.5 block text-sm text-graphite-400">{p.value}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <WhatsAppButton message={buildGenericMessage()} className="btn-primary text-base">
          WhatsApp'tan Yazın
        </WhatsAppButton>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-white/8">
        <MapEmbed height={360} />
      </div>
    </section>
  );
}
