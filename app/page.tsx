import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  Scale,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  MessageCircle,
} from "lucide-react";
import { site } from "@/config/site";
import {
  serviceCards,
  surecAdimlari,
  guvenRozetleri,
  aboutShort,
} from "@/config/services";
import { blogPosts } from "@/config/blog";
import QuickForm from "@/components/QuickForm";
import AnnouncementBar from "@/components/AnnouncementBar";
import ServiceIcon from "@/components/ServiceIcon";
import DistrictsGrid from "@/components/DistrictsGrid";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";
import {
  pageMetadata,
  jsonLdGraph,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description:
    "Anadolu Yakası'nda hurda metal, çalışan ya da arızalı beyaz eşya ve ikinci el eşya alımı. Yerinde tartım, kantar şeffaflığı, kapınızda peşin nakit ödeme.",
  path: "/",
});

const rozetIcon = [Banknote, Scale, ShieldCheck, Zap];

export default function HomePage() {
  const waHref = buildWhatsAppUrl(buildGenericMessage());

  const schema = jsonLdGraph([
    breadcrumbSchema([{ name: "Ana Sayfa", path: "/" }]),
    ...serviceCards.map((s) =>
      serviceSchema({
        name: s.title,
        description: s.desc,
        path: s.href ?? "/",
      })
    ),
    faqSchema(site.faq),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <AnnouncementBar />

      {/* HERO */}
      <section className="metal-texture relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/10 px-4 py-1.5 text-sm font-medium text-copper-200">
              <span className="h-2 w-2 rounded-full bg-copper-400" />
              {site.region}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {site.hero.title}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-graphite-300">
              {site.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton message={buildGenericMessage()} className="btn-primary text-base">
                Ücretsiz Teklif Al
              </WhatsAppButton>
              <Link href="/ucretli-esya-tahliyesi" className="btn-secondary text-base">
                Ücretli Eşya Tahliyesi
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Güven rozeti şeridi */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {guvenRozetleri.map((r, i) => {
                const Icon = rozetIcon[i] ?? Check;
                return (
                  <span key={r} className="flex items-center gap-2 text-sm font-medium text-graphite-200">
                    <Icon className="h-4 w-4 text-copper-400" />
                    {r}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Hızlı form kartı */}
          <div className="lg:pl-6">
            <QuickForm />
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          label="Neler Alıyoruz?"
          title="Hizmetlerimiz"
          desc="Eski, arızalı ve kullanılmayan eşyalarınız için üç ana hizmet."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {serviceCards.map((s) => (
            <div key={s.title} className="card flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper-500/15 text-copper-300">
                <ServiceIcon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-graphite-400">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-graphite-300">
                    <Check className="h-4 w-4 shrink-0 text-copper-400" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-2">
                {s.href ? (
                  <Link href={s.href} className="btn-secondary w-full">
                    {s.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <WhatsAppButton
                    message={buildGenericMessage(s.title)}
                    className="btn-primary w-full"
                  >
                    {s.cta}
                  </WhatsAppButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SÜREÇ */}
      <section id="surec" className="border-y border-white/8 bg-graphite-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            label="Nasıl İşliyor?"
            title="3 Adımda Nakit"
            desc="Süreç WhatsApp üzerinden ilerler, hızlı ve zahmetsizdir."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {surecAdimlari.map((a) => (
              <div key={a.step} className="relative rounded-2xl border border-white/8 bg-graphite-850 p-6">
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

      {/* GÜVEN / HAKKIMIZDA + İSTATİSTİK */}
      <section className="metal-texture">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <p className="section-label">Hakkımızda</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Köklü Esnaflık, Şeffaf Kantar.
            </h2>
            <p className="mt-4 text-graphite-300">{aboutShort}</p>

            {/* İletişim kanalları kartı */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-graphite-850 p-4 transition hover:border-copper-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper-500/15 text-copper-300">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">WhatsApp</span>
                  <span className="block text-xs text-graphite-400">7/24 destek hattı</span>
                </span>
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-graphite-850 p-4 transition hover:border-copper-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper-500/15 text-copper-300">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">Merkez Ofis</span>
                  <span className="block text-xs text-graphite-400">{site.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {site.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/8 bg-graphite-850 p-6 text-center">
                <p className="text-3xl font-extrabold text-copper-400">{s.value}</p>
                <p className="mt-1 text-sm text-graphite-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG & REHBER */}
      <section className="border-t border-white/8 bg-graphite-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading
              label="Hurda & Eşya Rehberi"
              title="Hurda Beyaz Eşya Rehberi"
              desc="İstanbul Anadolu Yakası için hurda, beyaz eşya ve geri dönüşüm rehberleri."
            />
            <Link href="/blog" className="mb-10 hidden shrink-0 items-center gap-1 text-sm font-semibold text-copper-400 hover:text-copper-300 sm:inline-flex">
              Tümünü Gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="metal-texture">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Eskiyi Nakite Çevirin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-graphite-300">
            Fotoğraf gönderin, dakikalar içinde teklif alın. Anlaşırsanız aynı gün
            kapınızdan nakit ödeme ile alalım.
          </p>
          <div className="mt-7 flex justify-center">
            <WhatsAppButton message={buildGenericMessage()} className="btn-primary text-base">
              Ücretsiz Fiyat Teklifi Al
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* HİZMET BÖLGELERİ */}
      <section className="border-t border-white/8 bg-graphite-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            label="Nerede Hizmet Veriyoruz?"
            title="Hizmet Bölgelerimiz"
            desc="İstanbul Anadolu Yakası'nın 12 ilçesinde yerinde alım."
          />
          <DistrictsGrid />
        </div>
      </section>

      {/* KONUM / HARİTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading label="Konumumuz" title="Bizi Haritada Bulun" center />
        <div className="overflow-hidden rounded-2xl border border-white/8">
          <iframe
            src={site.mapEmbedSrc}
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Canlar Metal Konum"
          />
        </div>
      </section>
    </>
  );
}
