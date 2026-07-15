// =============================================================
//  WHATSAPP MESAJ ÜRETİMİ — çekirdek mantık
//  Tüm CTA'lar sonunda buradan geçer. Backend/form submit YOK.
// =============================================================

import { site } from "@/config/site";
import { isBeyazEsya } from "@/config/services";

export function buildWhatsAppUrl(message: string): string {
  const phone = site.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// ---- Şablon A — Alım (ana sayfa hızlı form / ilçe formu) ----
// Zorunlu alanlar (ilçe, mahalle, eşya tipi, kat, asansör) doldurulmadan
// çağrılmaz; yalnızca opsiyonel neZaman boş olabilir ve boşsa satırı basılmaz.
export function buildAlimMessage(opts: {
  ilce: string;
  mahalle: string;
  esyaTipi: string;
  kat: string;
  asansor: string;
  neZaman?: string;
}): string {
  const { ilce, mahalle, esyaTipi, kat, asansor, neZaman } = opts;
  const talep = isBeyazEsya(esyaTipi)
    ? "Beyaz Eşya Alımı"
    : "Eşya / Hurda Alımı";
  const lines = [
    "Merhaba Canlar Metal,",
    `Talebim: ${talep}`,
    `İlçe: ${ilce} / ${mahalle}`,
    `Eşya Tipi: ${esyaTipi}`,
    `Kat: ${kat} | Asansör: ${asansor}`,
  ];
  if (neZaman) lines.push(`Ne zaman: ${neZaman}`);
  lines.push("Fotoğraf gönderip fiyat öğrenmek istiyorum.");
  return lines.join("\n");
}

// ---- Şablon B — Ücretli Tahliye (bilgi toplama) ----
export function buildTahliyeMessage(opts: {
  hizmetTipi: string;
  ilce: string;
  mahalle: string;
  kat: string;
  asansor: string;
  esyalar: { label: string; qty: number }[];
}): string {
  const { hizmetTipi, ilce, mahalle, kat, asansor, esyalar } = opts;
  const esyaStr =
    esyalar.length > 0
      ? esyalar.map((e) => `${e.label} x${e.qty}`).join(", ")
      : "-";
  const konum = mahalle ? `${ilce} / ${mahalle}` : ilce;
  return [
    "Merhaba Canlar Metal,",
    `Talebim: Ücretli Eşya Tahliyesi — ${hizmetTipi}`,
    `Konum: ${konum || "-"}`,
    `Kat: ${kat || "-"} | Asansör: ${asansor || "-"}`,
    `Eşyalar: ${esyaStr}`,
    "Görsel gönderip fiyat teklifi almak istiyorum.",
  ].join("\n");
}

// Genel amaçlı basit "Teklif Al" mesajı (floating buton vb.)
export function buildGenericMessage(context?: string): string {
  return [
    "Merhaba Canlar Metal,",
    context ? `İlgi alanım: ${context}` : "Eski eşya / hurda satmak istiyorum.",
    "Fotoğraf gönderip fiyat öğrenmek istiyorum.",
  ].join("\n");
}
