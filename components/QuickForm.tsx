"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { districts } from "@/config/site";
import {
  esyaTipleri,
  katlar,
  asansorSecenekleri,
  neZamanSecenekleri,
} from "@/config/services";
import { buildWhatsAppUrl, buildAlimMessage } from "@/lib/whatsapp";

// Ana sayfa + ilçe sayfalarında kullanılan hızlı ALIM formu.
// Seçimleri WhatsApp mesajına (Şablon A) çevirir, yeni sekmede açar.
export default function QuickForm({
  defaultIlce,
}: {
  defaultIlce?: string;
}) {
  const [ilce, setIlce] = useState(defaultIlce ?? "");
  const [esyaTipi, setEsyaTipi] = useState("");
  const [kat, setKat] = useState("");
  const [asansor, setAsansor] = useState<string>("");
  const [neZaman, setNeZaman] = useState("");

  function handleSubmit() {
    const message = buildAlimMessage({ ilce, esyaTipi, kat, asansor, neZaman });
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="card bg-graphite-850/90 backdrop-blur">
      <p className="section-label">Hızlı Teklif</p>
      <h3 className="mb-4 text-lg font-bold text-white">
        Eşyanı Anlat, Fiyatı Öğren
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="input-field"
          value={ilce}
          onChange={(e) => setIlce(e.target.value)}
        >
          <option value="">İlçe Seçin</option>
          {districts.map((d) => (
            <option key={d.slug} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          className="input-field"
          value={esyaTipi}
          onChange={(e) => setEsyaTipi(e.target.value)}
        >
          <option value="">Eşya Tipi Seçin</option>
          {esyaTipleri.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="input-field"
          value={kat}
          onChange={(e) => setKat(e.target.value)}
        >
          <option value="">Kat</option>
          {katlar.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          className="input-field"
          value={asansor}
          onChange={(e) => setAsansor(e.target.value)}
        >
          <option value="">Asansör</option>
          {asansorSecenekleri.map((a) => (
            <option key={a} value={a}>
              Asansör: {a}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-graphite-300">Ne zaman?</p>
        <div className="flex flex-wrap gap-2">
          {neZamanSecenekleri.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNeZaman(n)}
              className={`chip ${neZaman === n ? "chip-active" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="btn-primary mt-5 w-full text-base"
      >
        Fiyat Al
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="mt-3 text-center text-xs text-graphite-500">
        Seçimlerini WhatsApp'a taşırız; birkaç fotoğrafla dakikalar içinde fiyat veririz.
      </p>
    </div>
  );
}
