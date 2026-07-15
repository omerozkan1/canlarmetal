// =============================================================
//  MERKEZİ SİTE KONFİGÜRASYONU
//  Marka, telefon, ilçeler, metinler burada. Sonradan tek yerden düzenle.
// =============================================================

export const site = {
  brand: "Canlar Metal",
  brandShort: "Canlar",
  domain: "canlarmetal.com.tr",
  url: "https://canlarmetal.com.tr",

  // WhatsApp — uluslararası format, başında + ve boşluk OLMADAN.
  phone: "905324810513",
  // Görünen telefon (arama için)
  phoneDisplay: "+90 532 481 05 13",

  // İkinci telefon
  phone2: "905365138681",
  phone2Display: "+90 536 513 86 81",

  email: "info@canlarmetal.com.tr",
  address: "Sahrayıcedid Mah. Üstçeşme Sok. No:16, Kadıköy/İstanbul",

  region: "İstanbul Anadolu Yakası",

  // Güven rozetleri (rakama girmeyen, iddiasız)
  stats: [
    { value: "Aynı Gün", label: "Servis İmkânı" },
    { value: "Peşin", label: "Yerinde Nakit Ödeme" },
    { value: "12 İlçe", label: "Anadolu Yakası" },
    { value: "7/24", label: "WhatsApp Destek" },
  ],

  social: {
    instagram: "https://www.instagram.com/canlarmetal0",
  },

  // Google Maps embed — adres araması (API key gerektirmez)
  mapEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Sahrayıcedid Mah. Üstçeşme Sok. No:16, Kadıköy/İstanbul") +
    "&output=embed",

  // İnce duyuru barı (tıklanır)
  announcement: {
    text: "Anadolu Yakası Hurda & Beyaz Eşya Alımı — Aynı Gün Peşin Nakit",
    href: "/",
  },

  // Hero metinleri
  hero: {
    title: "Hurdanız Yük Değil, Değer.",
    subtitle:
      "Kadıköy'den Anadolu Yakası'nın her ilçesine; çalışan ya da arızalı beyaz eşya, ikinci el mobilya ve her tür hurda metali yerinde tartıp değerinde, peşin nakit alıyoruz.",
  },

  // Google Analytics 4 Measurement ID (yalnızca production'da yüklenir)
  gaMeasurementId: "G-GCTEJ9ENLG",

  // Microsoft Clarity Project ID (yalnızca production'da yüklenir)
  clarityProjectId: "xmr2wll95m",

  // IndexNow API anahtarı — public/<key>.txt ile aynı olmalı.
  // Gizli değildir; spec gereği herkese açık key dosyasında da yayınlanır.
  indexNowKey: "f92d087e0f87f85a2449259364ee5c6f",

  // ---- SEO / yapılandırılmış veri ----
  seo: {
    // Varsayılan sosyal paylaşım görseli — 1200x630 PNG (FB/LinkedIn/X SVG render etmez)
    ogImage: "/og-image.png",
    // Arama motoru doğrulama kodları (elde varsa doldurun; boşsa etiket basılmaz)
    verification: {
      google: "",
      yandex: "",
      // Bing Webmaster (msvalidate.01)
      bing: "80BB24702D5BC483D8356E932AA94DD3",
    },
    // Genel anahtar kelimeler (içerikle uyumlu)
    keywords: [
      "hurda metal",
      "hurda metal alımı",
      "metal geri dönüşüm",
      "beyaz eşya alımı",
      "ikinci el eşya alımı",
      "eşya tahliyesi",
      "hurdacı",
      "İstanbul Anadolu Yakası hurdacı",
      "Canlar Metal",
    ],
  },

  // İşletme künyesi — LocalBusiness / Organization şeması için
  business: {
    legalName: "Canlar Metal",
    // Adres bileşenleri (PostalAddress)
    streetAddress: "Sahrayıcedid Mah. Üstçeşme Sok. No:16",
    addressLocality: "Kadıköy",
    addressRegion: "İstanbul",
    postalCode: "34734",
    addressCountry: "TR",
    // Yaklaşık koordinatlar (Kadıköy / Sahrayıcedid)
    geo: { latitude: 40.9745, longitude: 29.0805 },
    // Çalışma saatleri (schema.org openingHours biçimi)
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "20:00" },
      { days: ["Sunday"], opens: "10:00", closes: "18:00" },
    ],
    priceRange: "₺₺",
  },

  // Sık sorulan sorular — FAQPage şeması + ileride sayfada gösterim
  faq: [
    {
      q: "Arızalı beyaz eşya alıyor musunuz?",
      a: "Evet. Buzdolabı, çamaşır ve bulaşık makinesi, klima, kombi ve fırın gibi cihazları çalışsın çalışmasın alıyoruz. Arızalı cihazlar hurda değeri üzerinden değerlendirilir.",
    },
    {
      q: "Fiyatı nasıl belirliyorsunuz?",
      a: "Hurda metalde fiyat; metalin cinsi, ağırlığı (kantarda önünüzde tartılır) ve günün piyasa değerine göre belirlenir. Beyaz eşyada ise cihazın tipi, durumu ve içerdiği değerli parçalar dikkate alınır.",
    },
    {
      q: "Hangi bölgelerde hizmet veriyorsunuz?",
      a: "İstanbul Anadolu Yakası'nın 12 ilçesinde (Kadıköy, Üsküdar, Ataşehir, Maltepe, Kartal, Pendik, Tuzla, Ümraniye, Çekmeköy, Sancaktepe, Sultanbeyli, Beykoz) yerinde alım yapıyoruz.",
    },
    {
      q: "Ödemeyi nasıl yapıyorsunuz?",
      a: "Ödeme, eşya alındığı anda adresinizde elden peşin nakit olarak yapılır.",
    },
    {
      q: "Randevu almak için ne yapmalıyım?",
      a: "WhatsApp'tan eşyanızın birkaç fotoğrafını ve adresinizi gönderin; ekibimiz size hızlıca teklif sunup uygun bir saat için randevu oluşturur.",
    },
  ],
};

export type SiteConfig = typeof site;

// =============================================================
//  İLÇELER — SADECE İstanbul Anadolu Yakası (12)
//  slug ilçe sayfası URL'ini, mahalleler tahliye sihirbazını besler.
// =============================================================

export type District = {
  slug: string;
  name: string;
  // İlçe sayfası SEO metni (placeholder — düzenlenebilir)
  seoText: string;
  neighborhoods: string[];
};

export const districts: District[] = [
  {
    slug: "atasehir",
    name: "Ataşehir",
    seoText:
      "Ataşehir'de çalışan ya da arızalı beyaz eşya ve her tür hurda metali yerinde tartıp değerinde alıyoruz. Aynı gün servis, kapınızda peşin nakit.",
    neighborhoods: ["Barbaros", "Küçükbakkalköy", "İçerenköy", "Yenişehir", "Ferhatpaşa", "Mustafa Kemal"],
  },
  {
    slug: "beykoz",
    name: "Beykoz",
    seoText:
      "Beykoz'da dar sokaklara kadar gelir, eski ve arızalı beyaz eşyanızı, hurda metalinizi kapınızdan alırız. Yerinde tartım, peşin ödeme.",
    neighborhoods: ["Kavacık", "Anadoluhisarı", "Paşabahçe", "Çubuklu", "Acarlar"],
  },
  {
    slug: "cekmekoy",
    name: "Çekmeköy",
    seoText:
      "Çekmeköy'de ikinci el beyaz eşya, arızalı cihaz ve hurda metal alımı. Aynı gün randevu, kantarda şeffaf tartım, elden peşin ödeme.",
    neighborhoods: ["Merkez", "Taşdelen", "Alemdağ", "Hamidiye", "Mimar Sinan", "Cumhuriyet"],
  },
  {
    slug: "kadikoy",
    name: "Kadıköy",
    seoText:
      "Kadıköy'de arızalı buzdolabı, çamaşır makinesi ve klimadan her tür hurda metale kadar yerinde değer biçer, aynı gün peşin öderiz. Merkez ofisimiz Sahrayıcedid'te.",
    neighborhoods: ["Caferağa", "Fenerbahçe", "Göztepe", "Kozyatağı", "Suadiye", "Bostancı", "Erenköy", "Sahrayıcedit"],
  },
  {
    slug: "kartal",
    name: "Kartal",
    seoText:
      "Kartal hattında beyaz eşya, ikinci el ve hurda metal alımında çoğu zaman aynı gün randevu veriyoruz. Güvenilir esnaf, yerinde tartım, peşin nakit.",
    neighborhoods: ["Yakacık", "Soğanlık", "Cevizli", "Uğur Mumcu", "Petrol İş", "Orhantepe"],
  },
  {
    slug: "maltepe",
    name: "Maltepe",
    seoText:
      "Maltepe'de eski ve arızalı beyaz eşyanızı, demir-bakır-alüminyum hurdanızı günün piyasasından alıyoruz. Aynı gün servis, kantarda şeffaf tartım.",
    neighborhoods: ["Bağlarbaşı", "Cevizli", "Fındıklı", "Gülsuyu", "Küçükyalı", "Zümrütevler", "Altayçeşme"],
  },
  {
    slug: "pendik",
    name: "Pendik",
    seoText:
      "Pendik'te bozuk beyaz eşya, ev boşaltma ve hurda metal alımını tek elden yapıyoruz. Neyin satılıp neyin tahliye edileceğini birlikte planlar, peşin öderiz.",
    neighborhoods: ["Batı", "Doğu", "Çamçeşme", "Kaynarca", "Güllübağlar", "Yenişehir", "Velibaba"],
  },
  {
    slug: "sancaktepe",
    name: "Sancaktepe",
    seoText:
      "Sancaktepe'de tadilat ve inşaat kaynaklı hurda demirden beyaz eşyaya kadar alım yapıyoruz. Toplu teslimde avantaj, kantarda tartım, elden peşin.",
    neighborhoods: ["Abdurrahmangazi", "Sarıgazi", "Yenidoğan", "Meclis", "Osmangazi", "Emek"],
  },
  {
    slug: "sultanbeyli",
    name: "Sultanbeyli",
    seoText:
      "Sultanbeyli'de hurda demir, bakır, alüminyum ve beyaz eşya alımı. Hızlı servis, yerinde tartım ve peşin nakit ödeme ile güvenilir esnaf.",
    neighborhoods: ["Abdurrahmangazi", "Mehmet Akif", "Fatih", "Battalgazi", "Hasanpaşa", "Turgutreis"],
  },
  {
    slug: "tuzla",
    name: "Tuzla",
    seoText:
      "Tuzla'da çalışır ikinci el beyaz eşyadan hurda metale kadar yerinde değerlendirme yapıyoruz. Marka ve durumuna göre en iyi fiyat, kapınızda peşin ödeme.",
    neighborhoods: ["Aydınlı", "İçmeler", "Postane", "Cami", "Şifa", "Yayla", "Anadolu"],
  },
  {
    slug: "umraniye",
    name: "Ümraniye",
    seoText:
      "Ümraniye'de en yakın hurdacıyı aramak yerine WhatsApp'tan yazın; adresinize gelir, kantar sonucunu ve güncel kilo değerini şeffafça paylaşır, peşin öderiz.",
    neighborhoods: ["Atatürk", "Çakmak", "Yamanevler", "Namık Kemal", "İnkılap", "Tantavi", "Site"],
  },
  {
    slug: "uskudar",
    name: "Üsküdar",
    seoText:
      "Üsküdar'da bakır, alüminyum ve demir hurdasını cinsine göre ayrıştırıp günün piyasasından alıyoruz. Beyaz eşya ve ikinci el için de yerinde peşin ödeme.",
    neighborhoods: ["Altunizade", "Kısıklı", "Kuzguncuk", "Çengelköy", "Ümraniye Yolu", "Bulgurlu", "Kirazlıtepe"],
  },
];

export const districtBySlug = (slug: string): District | undefined =>
  districts.find((d) => d.slug === slug);
