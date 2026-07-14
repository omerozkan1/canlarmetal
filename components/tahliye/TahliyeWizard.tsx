"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  X,
  Search,
  Info,
  RotateCcw,
} from "lucide-react";
import { districts } from "@/config/site";
import { katlar, asansorSecenekleri } from "@/config/services";
import { serviceTypes, itemPresets, ServiceType, SelectedItem } from "@/config/pricing";
import ServiceIcon from "@/components/ServiceIcon";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildTahliyeMessage } from "@/lib/whatsapp";

export default function TahliyeWizard() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | null>(null);
  const [ilce, setIlce] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [kat, setKat] = useState("");
  const [asansor, setAsansor] = useState("");
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const selectedDistrict = districts.find((d) => d.name === ilce);

  // Sonuç kartı DOM'a eklendikten sonra oraya kaydır
  useEffect(() => {
    if (showResult) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResult]);

  // ---- Eşya yönetimi ----
  function addPreset(key: string, label: string) {
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { key, label, qty: 1 }];
    });
  }
  function addFreeItem() {
    const label = search.trim();
    if (!label) return;
    const key = `free-${label.toLowerCase()}`;
    addPreset(key, label);
    setSearch("");
  }
  function changeQty(key: string, delta: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }
  function removeItem(key: string) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function reset() {
    setStep(1);
    setService(null);
    setIlce("");
    setMahalle("");
    setKat("");
    setAsansor("");
    setItems([]);
    setSearch("");
    setShowResult(false);
  }

  // ---- Adım geçişleri ----
  const canNext =
    (step === 1 && !!service) ||
    (step === 2 && !!ilce) ||
    step === 3 ||
    (step === 4 && !!kat && !!asansor) ||
    (step === 5 && items.length > 0);

  function next() {
    if (step === 5) {
      setShowResult(true);
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div id="hesapla" className="mx-auto max-w-3xl">
      {/* Progress bar 1–5 */}
      <div className="mb-8 flex items-center">
        {[1, 2, 3, 4, 5].map((n, idx) => (
          <div key={n} className="flex flex-1 items-center last:flex-none">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                n < step
                  ? "bg-copper-500 text-white"
                  : n === step
                  ? "bg-copper-500 text-white ring-4 ring-copper-500/25"
                  : "bg-graphite-800 text-graphite-500"
              }`}
            >
              {n < step ? <Check className="h-4 w-4" /> : n}
            </div>
            {idx < 4 && (
              <div
                className={`mx-1 h-0.5 flex-1 rounded ${
                  n < step ? "bg-copper-500" : "bg-graphite-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="card min-h-[340px]">
        {/* ADIM 1 — Hizmet tipi */}
        {step === 1 && (
          <div>
            <StepTitle n={1} title="Hangi hizmeti almak istiyorsunuz?" />
            <div className="grid gap-4 sm:grid-cols-3">
              {serviceTypes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setService(s)}
                  className={`flex flex-col items-start rounded-xl border p-5 text-left transition ${
                    service?.key === s.key
                      ? "border-copper-400 bg-copper-500/10"
                      : "border-white/10 bg-graphite-900 hover:border-copper-400/50"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-copper-500/15 text-copper-300">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="mt-3 font-bold text-white">{s.title}</span>
                  <span className="mt-1 text-xs text-graphite-400">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ADIM 2 — İlçe */}
        {step === 2 && (
          <div>
            <StepTitle n={2} title="Hangi ilçedesiniz?" />
            <select
              className="input-field"
              value={ilce}
              onChange={(e) => {
                setIlce(e.target.value);
                setMahalle("");
              }}
            >
              <option value="">İlçe Seçin</option>
              {districts.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ADIM 3 — Mahalle */}
        {step === 3 && (
          <div>
            <StepTitle n={3} title="Hangi mahallede?" />
            {selectedDistrict ? (
              <>
                <select
                  className="input-field"
                  value={mahalle}
                  onChange={(e) => setMahalle(e.target.value)}
                >
                  <option value="">Mahalle Seçin (opsiyonel)</option>
                  {selectedDistrict.neighborhoods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-graphite-500">
                  Listede yoksa boş bırakabilirsiniz — WhatsApp'ta belirtirsiniz.
                </p>
              </>
            ) : (
              <p className="text-graphite-400">Önce ilçe seçin.</p>
            )}
          </div>
        )}

        {/* ADIM 4 — Kat & asansör */}
        {step === 4 && (
          <div>
            <StepTitle n={4} title="Kat ve asansör bilgisi" />
            <p className="mb-2 text-sm font-medium text-graphite-300">Kaçıncı kattasınız?</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {katlar.map((k) => (
                <button
                  key={k}
                  onClick={() => setKat(k)}
                  className={`chip ${kat === k ? "chip-active" : ""}`}
                >
                  {k}
                </button>
              ))}
            </div>
            <p className="mb-2 text-sm font-medium text-graphite-300">Asansör var mı?</p>
            <div className="flex gap-2">
              {asansorSecenekleri.map((a) => (
                <button
                  key={a}
                  onClick={() => setAsansor(a)}
                  className={`chip ${asansor === a ? "chip-active" : ""}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ADIM 5 — Eşyalar */}
        {step === 5 && (
          <div>
            <StepTitle n={5} title="Eşyaları yazın veya seçin" />

            <p className="mb-2 text-sm font-medium text-graphite-300">En Çok Seçilenler</p>
            <div className="mb-5 flex flex-wrap gap-2">
              {itemPresets.map((p) => (
                <button
                  key={p.key}
                  onClick={() => addPreset(p.key, p.label)}
                  className="chip"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {p.label}
                </button>
              ))}
            </div>

            {/* Serbest metin arama */}
            <div className="mb-5 flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-500" />
                <input
                  className="input-field !pl-10"
                  placeholder="Eşya yazın: eski koltuk, metal hurda, sandalye, koli..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFreeItem()}
                />
              </div>
              <button onClick={addFreeItem} className="btn-secondary shrink-0 px-4">
                Ekle
              </button>
            </div>

            {/* Seçilen eşyalar */}
            {items.length > 0 ? (
              <div className="space-y-2">
                {items.map((i) => (
                  <div
                    key={i.key}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-graphite-900 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-graphite-100">{i.label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(i.key, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-graphite-800 text-graphite-200 hover:bg-graphite-700"
                        aria-label="Azalt"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.key, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-graphite-800 text-graphite-200 hover:bg-graphite-700"
                        aria-label="Artır"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(i.key)}
                        className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-graphite-500 hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Kaldır"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-white/10 py-6 text-center text-sm text-graphite-500">
                Henüz eşya eklenmedi. Yukarıdan seçin veya yazın.
              </p>
            )}
          </div>
        )}

        {/* Navigasyon */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 1}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Geri
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 5 ? "Bilgileri Topla" : "Devam Et"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* SONUÇ KARTI — bilgi özeti + WhatsApp */}
      {showResult && service && (
        <div ref={resultRef} id="sonuc" className="mt-8 scroll-mt-24">
          <div className="card border-copper-400/30 bg-gradient-to-b from-copper-500/10 to-transparent">
            <p className="section-label">Talep Özeti</p>
            <h3 className="text-lg font-bold text-white">Bilgileriniz Hazır</h3>
            <p className="mt-2 text-sm text-graphite-400">
              Aşağıdaki bilgileri WhatsApp'a taşıyıp fotoğraf ekleyin — ekibimiz
              hızlıca net fiyat teklifi versin.
            </p>

            {/* Özet tablo */}
            <div className="mt-6 overflow-hidden rounded-xl border border-white/8">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/8">
                  <Row label="Hizmet" value={service.title} />
                  <Row
                    label="Eşyalar"
                    value={items.map((i) => `${i.label} x${i.qty}`).join(", ") || "-"}
                  />
                  <Row label="İlçe / Mahalle" value={mahalle ? `${ilce} / ${mahalle}` : ilce} />
                  <Row label="Kat / Asansör" value={`${kat} · Asansör: ${asansor}`} />
                </tbody>
              </table>
            </div>

            {/* Bilgi notu */}
            <div className="mt-5 flex gap-2 rounded-xl border border-white/8 bg-graphite-900 p-4 text-sm text-graphite-300">
              <Info className="h-5 w-5 shrink-0 text-copper-400" />
              <p>
                Kesin fiyat için ekip eşyaları görmeli. WhatsApp'tan görsel iletin,
                size en uygun teklifi sunalım.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                message={buildTahliyeMessage({
                  hizmetTipi: service.title,
                  ilce,
                  mahalle,
                  kat,
                  asansor,
                  esyalar: items.map((i) => ({ label: i.label, qty: i.qty })),
                })}
                className="btn-primary flex-1 text-base"
              >
                WhatsApp'tan Gönder — Teklif Al
              </WhatsAppButton>
              <button onClick={reset} className="btn-secondary">
                <RotateCcw className="h-4 w-4" /> Yeniden Başla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-copper-400">
        Adım {n} / 5
      </p>
      <h3 className="mt-1 text-xl font-bold text-white">{title}</h3>
    </div>
  );
}

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-copper-500/5" : ""}>
      <td className="w-40 px-4 py-3 align-top text-graphite-400">{label}</td>
      <td className={`px-4 py-3 ${highlight ? "font-bold text-white" : "text-graphite-200"}`}>
        {value}
      </td>
    </tr>
  );
}
