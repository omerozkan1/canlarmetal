"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { districts } from "@/config/site";
import {
  esyaTipleri,
  katlar,
  asansorSecenekleri,
  neZamanSecenekleri,
} from "@/config/services";
import { buildWhatsAppUrl, buildAlimMessage } from "@/lib/whatsapp";

// Zorunlu alan anahtarları ve boşken gösterilecek mesajlar.
type FieldKey = "ilce" | "mahalle" | "esyaTipi" | "kat" | "asansor";

const ERROR_MESSAGES: Record<FieldKey, string> = {
  ilce: "İlçe seçiniz.",
  mahalle: "Mahalle seçiniz.",
  esyaTipi: "Eşya tipi seçiniz.",
  kat: "Kat seçiniz.",
  asansor: "Asansör bilgisini seçiniz.",
};

// Ana sayfa + ilçe sayfalarında kullanılan hızlı ALIM formu.
// Zorunlu alanlar doldurulmadan WhatsApp açılmaz; seçim yapılınca hata temizlenir.
export default function QuickForm({
  defaultIlce,
}: {
  defaultIlce?: string;
}) {
  const [ilce, setIlce] = useState(defaultIlce ?? "");
  const [mahalle, setMahalle] = useState("");
  const [esyaTipi, setEsyaTipi] = useState("");
  const [kat, setKat] = useState("");
  const [asansor, setAsansor] = useState<string>("");
  const [neZaman, setNeZaman] = useState("");

  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});

  // Odaklama/scroll için alan referansları.
  const refs: Record<FieldKey, React.RefObject<HTMLSelectElement>> = {
    ilce: useRef<HTMLSelectElement>(null),
    mahalle: useRef<HTMLSelectElement>(null),
    esyaTipi: useRef<HTMLSelectElement>(null),
    kat: useRef<HTMLSelectElement>(null),
    asansor: useRef<HTMLSelectElement>(null),
  };

  // Seçili ilçenin mahalleleri (ilçe değişince mahalle sıfırlanır).
  const neighborhoods = useMemo(
    () => districts.find((d) => d.name === ilce)?.neighborhoods ?? [],
    [ilce]
  );

  // Bir alan geçerli değer aldığında o alanın hatasını anında temizler.
  function clearError(key: FieldKey) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit() {
    const values: Record<FieldKey, string> = { ilce, mahalle, esyaTipi, kat, asansor };
    const order: FieldKey[] = ["ilce", "mahalle", "esyaTipi", "kat", "asansor"];

    const nextErrors: Partial<Record<FieldKey, boolean>> = {};
    for (const key of order) {
      if (!values[key]) nextErrors[key] = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // İlk geçersiz alana scroll + focus.
      const firstInvalid = order.find((k) => nextErrors[k]);
      if (firstInvalid) {
        const el = refs[firstInvalid].current;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }
      return;
    }

    // Tüm zorunlu alanlar geçerli — mesajı ancak burada üret.
    const message = buildAlimMessage({ ilce, mahalle, esyaTipi, kat, asansor, neZaman });
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Hata durumunda kırmızı kenarlık; erişilebilirlik için aria-invalid.
  const fieldClass = (key: FieldKey) =>
    `input-field${errors[key] ? " border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`;

  return (
    <div className="card bg-graphite-850/90 backdrop-blur">
      <p className="section-label">Hızlı Teklif</p>
      <h3 className="mb-4 text-lg font-bold text-white">
        Eşyanı Anlat, Fiyatı Öğren
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <select
            ref={refs.ilce}
            aria-label="İlçe"
            aria-invalid={!!errors.ilce}
            className={fieldClass("ilce")}
            value={ilce}
            onChange={(e) => {
              setIlce(e.target.value);
              // İlçe değişince mahalle sıfırlanır ve ilgili hatalar güncellenir.
              setMahalle("");
              if (e.target.value) clearError("ilce");
            }}
          >
            <option value="">İlçe Seçin</option>
            {districts.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.ilce && (
            <p className="mt-1 text-xs text-red-400">{ERROR_MESSAGES.ilce}</p>
          )}
        </div>

        <div>
          <select
            ref={refs.mahalle}
            aria-label="Mahalle"
            aria-invalid={!!errors.mahalle}
            className={fieldClass("mahalle")}
            value={mahalle}
            disabled={!ilce}
            onChange={(e) => {
              setMahalle(e.target.value);
              if (e.target.value) clearError("mahalle");
            }}
          >
            <option value="">
              {ilce ? "Mahalle Seçin" : "Önce ilçe seçin"}
            </option>
            {neighborhoods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.mahalle && (
            <p className="mt-1 text-xs text-red-400">{ERROR_MESSAGES.mahalle}</p>
          )}
        </div>

        <div>
          <select
            ref={refs.esyaTipi}
            aria-label="Eşya tipi"
            aria-invalid={!!errors.esyaTipi}
            className={fieldClass("esyaTipi")}
            value={esyaTipi}
            onChange={(e) => {
              setEsyaTipi(e.target.value);
              if (e.target.value) clearError("esyaTipi");
            }}
          >
            <option value="">Eşya Tipi Seçin</option>
            {esyaTipleri.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.esyaTipi && (
            <p className="mt-1 text-xs text-red-400">{ERROR_MESSAGES.esyaTipi}</p>
          )}
        </div>

        <div>
          <select
            ref={refs.kat}
            aria-label="Kat"
            aria-invalid={!!errors.kat}
            className={fieldClass("kat")}
            value={kat}
            onChange={(e) => {
              setKat(e.target.value);
              if (e.target.value) clearError("kat");
            }}
          >
            <option value="">Kat</option>
            {katlar.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          {errors.kat && (
            <p className="mt-1 text-xs text-red-400">{ERROR_MESSAGES.kat}</p>
          )}
        </div>

        <div>
          <select
            ref={refs.asansor}
            aria-label="Asansör"
            aria-invalid={!!errors.asansor}
            className={fieldClass("asansor")}
            value={asansor}
            onChange={(e) => {
              setAsansor(e.target.value);
              if (e.target.value) clearError("asansor");
            }}
          >
            <option value="">Asansör</option>
            {asansorSecenekleri.map((a) => (
              <option key={a} value={a}>
                Asansör: {a}
              </option>
            ))}
          </select>
          {errors.asansor && (
            <p className="mt-1 text-xs text-red-400">{ERROR_MESSAGES.asansor}</p>
          )}
        </div>
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
      <p className="mt-3 text-center text-xs text-graphite-300">
        Seçimlerini WhatsApp'a taşırız; birkaç fotoğrafla dakikalar içinde fiyat veririz.
      </p>
    </div>
  );
}
