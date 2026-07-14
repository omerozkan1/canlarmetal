import type { Metadata } from "next";
import { Check } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { site, districts } from "@/config/site";
import { aboutShort } from "@/config/services";
import { buildGenericMessage } from "@/lib/whatsapp";
import { pageMetadata, jsonLdGraph, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda",
  description:
    "Canlar Metal — İstanbul Anadolu Yakası'nda beyaz eşya, hurda metal ve ikinci el eşya alımı. Geleneksel esnaf güveni, yerinde tartım ve peşin nakit ödeme.",
  path: "/hakkimizda",
});

const values = [
  "Yerinde ve şeffaf değerlendirme",
  "Aynı gün servis imkânı",
  "Nakit ödeme garantisi",
  "12 ilçede geniş hizmet ağı",
];

export default function HakkimizdaPage() {
  const schema = jsonLdGraph([
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Hakkımızda", path: "/hakkimizda" },
    ]),
  ]);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımızda" }]} />
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Hakkımızda
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-graphite-300">{aboutShort}</p>

      <p className="mt-4 text-lg leading-relaxed text-graphite-300">
        {site.region}'nın {districts.length} ilçesinde ({districts.map((d) => d.name).join(", ")})
        hizmet veriyoruz. Tek iletişim kanalımız WhatsApp'tır; fotoğraf gönderin,
        hızlıca teklif alın.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {values.map((v) => (
          <li key={v} className="flex items-center gap-2 rounded-xl border border-white/8 bg-graphite-850 px-4 py-3 text-sm text-graphite-200">
            <Check className="h-4 w-4 shrink-0 text-copper-400" />
            {v}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <WhatsAppButton message={buildGenericMessage()} className="btn-primary">
          Ücretsiz Teklif Al
        </WhatsAppButton>
      </div>
    </section>
  );
}
