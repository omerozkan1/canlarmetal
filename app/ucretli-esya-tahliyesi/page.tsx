import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ShieldCheck, ChevronRight } from "lucide-react";
import TahliyeWizard from "@/components/tahliye/TahliyeWizard";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Ücretli Eski Eşya Tahliye Hizmeti — Hızlı Teklif",
  description:
    "İstanbul Anadolu Yakası'nda mobilya atımı, ev boşaltma ve depo-bodrum temizliği. 5 adımlı sihirbaz ile bilgilerinizi toplayıp WhatsApp'tan net teklif alın.",
};

export default function TahliyePage() {
  return (
    <>
      {/* HERO */}
      <section className="metal-texture">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <nav className="mb-6 flex items-center gap-1 text-sm text-graphite-500">
            <Link href="/" className="hover:text-copper-400">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-graphite-300">Ücretli Eşya Tahliyesi</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/10 px-4 py-1.5 text-sm font-medium text-copper-200">
                <ShieldCheck className="h-4 w-4" /> Hızlı ve Şeffaf Teklif
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Ücretli Eski Eşya Tahliye Hizmeti
              </h1>
              <p className="mt-5 max-w-lg text-lg text-graphite-300">
                Değeri olmayan mobilya ve eşyalarınızı sizin için taşıyıp tahliye
                ediyoruz. {site.region}'nda hizmet — birkaç adımda bilgilerinizi
                girin, WhatsApp'tan görsel iletip net teklif alın.
              </p>
              <a href="#hesapla" className="btn-primary mt-7 text-base">
                Teklif Al
                <ArrowDown className="h-5 w-5" />
              </a>
            </div>

            <ul className="grid gap-3 sm:grid-cols-1">
              {[
                "Mobilya Atımı — koltuk, gardırop, yatak vb.",
                "Ev Boşaltma — tüm eşyalar dahil",
                "Depo & Bodrum — temizlik ve boşaltma",
                "Yerinde değerlendirme, net teklif",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-graphite-850 px-4 py-3 text-sm text-graphite-200"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-copper-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SİHİRBAZ */}
      <section className="border-t border-white/8 bg-graphite-900 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <p className="section-label">5 Adımlı Talep Formu</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Bilgilerinizi Girin, Teklif Alın
            </h2>
          </div>
          <TahliyeWizard />
        </div>
      </section>
    </>
  );
}
