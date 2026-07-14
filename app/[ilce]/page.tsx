import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, MapPin, ArrowUpRight } from "lucide-react";
import { districts, districtBySlug, site } from "@/config/site";
import { surecAdimlari, guvenRozetleri } from "@/config/services";
import QuickForm from "@/components/QuickForm";
import Breadcrumb from "@/components/Breadcrumb";
import WhatsAppButton from "@/components/WhatsAppButton";
import DistrictsGrid from "@/components/DistrictsGrid";
import { buildGenericMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return districts.map((d) => ({ ilce: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { ilce: string };
}): Metadata {
  const d = districtBySlug(params.ilce);
  if (!d) return { title: "Sayfa bulunamadı" };
  return {
    title: `${d.name} Hurda & Beyaz Eşya Alımı`,
    description: d.seoText,
  };
}

export default function DistrictPage({ params }: { params: { ilce: string } }) {
  const d = districtBySlug(params.ilce);
  if (!d) notFound();

  return (
    <>
      <section className="metal-texture">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Breadcrumb
            items={[{ label: "Ana Sayfa", href: "/" }, { label: d.name }]}
          />

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/10 px-4 py-1.5 text-sm font-medium text-copper-200">
                <MapPin className="h-4 w-4" /> {site.region}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                {d.name} Hurda & Beyaz Eşya Alımı
              </h1>
              <p className="mt-5 max-w-lg text-lg text-graphite-300">{d.seoText}</p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {guvenRozetleri.map((r) => (
                  <span key={r} className="flex items-center gap-2 text-sm font-medium text-graphite-200">
                    <Check className="h-4 w-4 text-copper-400" />
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppButton
                  message={buildGenericMessage(`${d.name} — Hurda / Beyaz Eşya Alımı`)}
                  className="btn-primary text-base"
                >
                  {d.name} İçin Teklif Al
                </WhatsAppButton>
                <Link href="/ucretli-esya-tahliyesi" className="btn-secondary text-base">
                  Ücretli Eşya Tahliyesi <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Mahalleler */}
              {d.neighborhoods.length > 0 && (
                <div className="mt-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-graphite-500">
                    Hizmet Verdiğimiz Mahalleler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.neighborhoods.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/8 bg-graphite-850 px-3 py-1 text-xs text-graphite-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:pl-6">
              <QuickForm defaultIlce={d.name} />
            </div>
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="border-y border-white/8 bg-graphite-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="section-label">Nasıl Çalışıyoruz?</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {d.name}'de 3 Adımda Nakit
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {surecAdimlari.map((a) => (
              <div key={a.step} className="rounded-2xl border border-white/8 bg-graphite-850 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-copper-500 text-lg font-bold text-white shadow-glow">
                  {a.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-graphite-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DİĞER İLÇELER */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="section-label">Diğer Bölgeler</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Hizmet Bölgelerimiz
          </h2>
        </div>
        <DistrictsGrid />
      </section>
    </>
  );
}
