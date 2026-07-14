// =============================================================
//  HİZMET İÇERİKLERİ + FORM SEÇENEKLERİ
//  Ana sayfa hızlı formu ve hizmet kartları buradan beslenir.
// =============================================================

// Beyaz eşya kategorisindeki tipler (talebim satırını belirler)
export const beyazEsyaTipleri: string[] = [
  "Buzdolabı",
  "Çamaşır Makinesi",
  "Bulaşık Makinesi",
  "Fırın / Ocak",
  "Klima",
  "Kombi",
  "Derin Dondurucu",
];

// Beyaz eşya dışındaki tipler (hurda / ikinci el vb.)
export const digerEsyaTipleri: string[] = [
  "Hurda Metal (demir, bakır, alüminyum...)",
  "Kablo / Akü",
  "İkinci El Eşya",
  "Diğer",
];

// Ana sayfa hızlı formdaki "Eşya Tipi" seçenekleri (beyaz eşya + diğer)
export const esyaTipleri: string[] = [...beyazEsyaTipleri, ...digerEsyaTipleri];

// Seçilen eşya tipi beyaz eşya mı?
export const isBeyazEsya = (tip: string): boolean =>
  beyazEsyaTipleri.includes(tip);

// Kat seçenekleri (hem ana form hem tahliye sihirbazı)
export const katlar: string[] = [
  "Bodrum",
  "1. Kat",
  "2. Kat",
  "3. Kat",
  "4. Kat",
  "5. Kat+",
];

export const asansorSecenekleri = ["Evet", "Hayır"] as const;

// "Ne zaman?" pill'leri
export const neZamanSecenekleri: string[] = [
  "Bugün",
  "Yarın",
  "2-3 Gün",
  "Bu Hafta",
  "Esnek",
];

// Güven rozeti şeridi (hero altı)
export const guvenRozetleri: string[] = [
  "Peşin Nakit",
  "Yerinde Tartım",
  "Kantar Şeffaflığı",
  "Aynı Gün Alım",
];

// Ana sayfa "Hizmetlerimiz" kartları
export type ServiceCard = {
  icon: "fridge" | "scrap" | "trash";
  title: string;
  desc: string;
  items: string[];
  href?: string; // link verilecekse (ör. tahliye sayfası)
  cta: string;
};

export const serviceCards: ServiceCard[] = [
  {
    icon: "fridge",
    title: "Beyaz Eşya Alımı",
    desc: "Çalışsın çalışmasın; buzdolabı, çamaşır ve bulaşık makinesi, fırın, klima, kombi… Yerinde değer biçer, peşin öderiz.",
    items: ["Arızalı çalışır ayrımı yok", "Yerinde nakit ödeme", "Kapıdan alım"],
    cta: "Teklif Al",
  },
  {
    icon: "scrap",
    title: "Hurda Metal Alımı",
    desc: "Demir, bakır, alüminyum, sarı, kablo, akü — kantarda tartar, günün piyasasından hesaplarız.",
    items: ["Güncel piyasa değeri", "Kantarda şeffaf tartım", "Toplu alım avantajı"],
    cta: "Teklif Al",
  },
  {
    icon: "trash",
    title: "Ücretli Eşya Tahliyesi",
    desc: "Değeri olmayan eşya, ev/depo boşaltma ve moloz için ücretli, temiz ve hızlı tahliye.",
    items: ["Mobilya atımı", "Ev & depo boşaltma", "Moloz & bodrum temizliği"],
    href: "/ucretli-esya-tahliyesi",
    cta: "Teklif Al",
  },
];

// Süreç adımları
export const surecAdimlari = [
  {
    step: 1,
    title: "Fotoğrafı At",
    desc: "WhatsApp'tan eşyanın halini gösteren birkaç kare yolla.",
  },
  {
    step: 2,
    title: "Fiyatı Konuş",
    desc: "Ekibimiz görselden değer biçsin, günün piyasasına göre en iyi fiyatı versin.",
  },
  {
    step: 3,
    title: "Kapında Nakit",
    desc: "Anlaşılan saatte geliriz, yerinde tartar, elden peşin öderiz.",
  },
];

// Güven bölümü — hakkımızda kısa metni
export const aboutShort =
  "Canlar Metal, Anadolu Yakası'nda hurda ve eski eşya alımını geleneksel esnaf güveniyle, modern ve hızlı bir hizmete dönüştürür. Tartımı adresinizde yapar, fiyatı açık söyler, ödemeyi peşin yaparız.";
