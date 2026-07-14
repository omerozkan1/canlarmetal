// =============================================================
//  BLOG / REHBER İÇERİKLERİ
//  SEO odaklı placeholder yazılar. body markdown-benzeri düz metin.
// =============================================================

export type BlogCategory = "ilce" | "fiyat" | "rehber";

export const categoryLabels: Record<BlogCategory, string> = {
  ilce: "İlçe Rehberi",
  fiyat: "Fiyat",
  rehber: "Rehber",
};

// Liste filtre pill'leri
export const blogFilters: { key: BlogCategory | "all"; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "ilce", label: "İlçe Rehberi" },
  { key: "fiyat", label: "Fiyat" },
  { key: "rehber", label: "Rehber" },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  date: string; // görsel amaçlı
  // Basit paragraf dizisi (placeholder içerik)
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kadikoy-bozuk-buzdolabi-kac-para-eder",
    title: "Kadıköy'de Bozuk Buzdolabı Kaç Para Eder?",
    category: "fiyat",
    excerpt:
      "Soğutmayan ya da arızalı buzdolabınız çöp değil. Kadıköy'de bozuk buzdolabının değerini belirleyen kriterleri anlattık.",
    date: "2025-01-10",
    body: [
      "Bozuk bir buzdolabı ilk bakışta değersiz görünür; oysa kompresör, bakır boru hattı ve sac gövde geri dönüşümde karşılık bulur. Bu yüzden Kadıköy'de çalışmayan buzdolapları için de teklif veriyoruz.",
      "Değeri belirleyen başlıca etkenler: cihazın boyutu (tek/çift kapı, no-frost), içindeki bakır miktarı, sac ağırlığı ve günün hurda piyasası. Güncel alım aralığı için [GÜNCEL FİYAT] bandımıza WhatsApp'tan bakabilirsiniz.",
      "Caferağa'dan Bostancı'ya Kadıköy'ün tüm mahallelerinde aynı gün geliriz; buzdolabını yerinde tartar, değerini açıkça söyler, peşin öderiz.",
    ],
  },
  {
    slug: "uskudar-hurda-metal-bakir-aluminyum-demir-kilo-fiyati",
    title: "Üsküdar Hurda Metal Alımı: Bakır, Alüminyum, Demir Kilo Fiyatı",
    category: "ilce",
    excerpt:
      "Üsküdar'da bakır, alüminyum ve demir hurdası kilo başına neye göre fiyatlanır? Kantar ve piyasa mantığını açıkladık.",
    date: "2025-01-08",
    body: [
      "Üsküdar'da her metal cinsinin ayrı bir kilo değeri vardır: bakır en yüksek, ardından alüminyum ve sarı, en sonda demir gelir. Güncel kilo fiyatları için [GÜNCEL FİYAT] listemizi WhatsApp'tan isteyin.",
      "Fiyat, metalin cinsi kadar temizliğine de bağlıdır; kablo içindeki bakır ya da alaşımdan ayrıştırılmış alüminyum daha yüksek değerlenir. Tartımı önünüzde, kantarda yaparız.",
      "Altunizade, Kısıklı, Çengelköy ve tüm Üsküdar mahallelerinde yerinde alım ve peşin ödeme yapıyoruz.",
    ],
  },
  {
    slug: "atasehir-eski-camasir-makinesi-nakite-cevirme",
    title: "Ataşehir'de Eski Çamaşır Makinesini Nakite Çevirmenin Yolu",
    category: "ilce",
    excerpt:
      "Ataşehir'de arızalı ya da eski çamaşır makinenizi hurdaya vermeden önce bilmeniz gerekenler.",
    date: "2025-01-05",
    body: [
      "Çamaşır makinesini tamir ettirmek her zaman mantıklı olmaz; motor arızası veya kazan sorunu varsa cihazı hurda/ikinci el olarak değerlendirmek daha kârlı olabilir.",
      "Makinenin motoru, karşı ağırlığı ve sac gövdesi geri dönüşümde değer taşır. Çalışır durumdaki makineler ise ikinci el olarak daha yüksek fiyat bulur. Güncel alım bandı için [GÜNCEL FİYAT].",
      "Ataşehir'de Barbaros, Küçükbakkalköy, İçerenköy ve çevre mahallelerde WhatsApp'tan fotoğraf gönderin, aynı gün kapınızda olalım.",
    ],
  },
  {
    slug: "maltepe-kartal-ayni-gun-hurda-beyaz-esya-alimi",
    title: "Maltepe & Kartal Hattında Aynı Gün Hurda Beyaz Eşya Alımı",
    category: "ilce",
    excerpt:
      "Maltepe ve Kartal hattında hurda metal ve beyaz eşya için aynı gün servis nasıl işliyor?",
    date: "2025-01-02",
    body: [
      "Maltepe ve Kartal, servis ağımızın en yoğun olduğu hatlardan biri; bu bölgelerde çoğu zaman aynı gün randevu verebiliyoruz.",
      "Hem beyaz eşya (buzdolabı, çamaşır makinesi, klima, kombi) hem de her tür hurda metali alıyoruz. Metal tarafında tartım kantarda, önünüzde yapılır; güncel değer için [GÜNCEL FİYAT].",
      "Bağlarbaşı, Cevizli, Yakacık, Soğanlık ve çevre mahallelerde WhatsApp'tan ulaşın, saatini birlikte belirleyelim.",
    ],
  },
  {
    slug: "pendik-ev-bosaltma-atmak-mi-satmak-mi",
    title: "Pendik'te Ev Boşaltıyorum: Eşyaları Atmak mı, Satmak mı?",
    category: "rehber",
    excerpt:
      "Pendik'te ev boşaltırken hangi eşya satılır, hangisi ücretli tahliye ile atılır? Pratik bir karar rehberi.",
    date: "2024-12-28",
    body: [
      "Ev boşaltırken eşyaları üç grupta düşünmek işi kolaylaştırır: satılabilir (çalışan beyaz eşya, sağlam mobilya), hurda değeri olan (metal, bozuk cihaz) ve değeri olmayan (yıpranmış, kırık eşya).",
      "İlk iki grup için biz alım yaparız; üçüncü grup ve moloz için ise ücretli eşya tahliyesi devreye girer. Böylece hem gelir elde eder hem de evi tek seferde boşaltırsınız.",
      "Pendik Batı, Doğu, Kaynarca ve çevresinde WhatsApp'tan fotoğraf gönderin; neyin satılıp neyin tahliye edileceğini birlikte planlayalım.",
    ],
  },
  {
    slug: "umraniye-en-yakin-hurdaci-nasil-bulunur",
    title: "Ümraniye'de En Yakın Hurdacı Nasıl Bulunur?",
    category: "ilce",
    excerpt:
      "Ümraniye'de güvenilir, kantarı şeffaf bir hurdacıyı nasıl seçersiniz? Dikkat edilecek noktalar.",
    date: "2024-12-25",
    body: [
      "İyi bir hurdacıyı ayırt eden şey mesafe değil, şeffaflıktır: tartımı önünüzde yapması, metal cinsini doğru ayırması ve fiyatı açıkça söylemesi.",
      "Ümraniye'de yerinde tartım ve peşin ödeme ile çalışıyoruz; kantar sonucunu ve güncel kilo değerini ([GÜNCEL FİYAT]) sizinle paylaşırız.",
      "Atatürk, Çakmak, Yamanevler ve tüm Ümraniye mahallelerinde adresinize geliriz — 'en yakın' aramak yerine WhatsApp'tan yazmanız yeterli.",
    ],
  },
  {
    slug: "arizali-klima-kombi-deger-mi-anadolu-yakasi",
    title: "Arızalı Klima ve Kombi Değer mi? Anadolu Yakası Alım Rehberi",
    category: "rehber",
    excerpt:
      "Sökülmüş ya da arızalı klima ve kombi hurda olarak değerli midir? İçlerindeki metaller ne kadar eder?",
    date: "2024-12-22",
    body: [
      "Klima ve kombi, içerdikleri bakır ve alüminyum nedeniyle hurda değeri yüksek cihazlardandır. Arızalı olmaları bu değeri büyük ölçüde etkilemez.",
      "Klimada iç ünite, dış ünite ve bakır boru hattı ayrı değerlenir; kombide ise bakır eşanjör öne çıkar. Güncel alım aralığı için [GÜNCEL FİYAT].",
      "Anadolu Yakası genelinde sökme konusunda deneyimliyiz; destek gerekiyorsa WhatsApp'tan belirtin, planı birlikte kuralım.",
    ],
  },
  {
    slug: "tuzla-cekmekoy-ikinci-el-beyaz-esya-alimi",
    title: "Tuzla ve Çekmeköy'de İkinci El Beyaz Eşya Kaça Alınır?",
    category: "fiyat",
    excerpt:
      "Tuzla ve Çekmeköy'de çalışır durumdaki ikinci el beyaz eşyanın değerini ne belirler?",
    date: "2024-12-18",
    body: [
      "İkinci el beyaz eşyada fiyatı belirleyen en önemli şey cihazın çalışır ve temiz olmasıdır. Marka, yaş ve enerji sınıfı da değeri etkiler.",
      "Çalışan bir buzdolabı ya da çamaşır makinesi, hurdaya göre belirgin şekilde yüksek değerlenir. Net bandı görmek için fotoğraf gönderin; güncel aralık [GÜNCEL FİYAT].",
      "Tuzla ve Çekmeköy'ün tüm mahallelerinde yerinde değerlendirme ve peşin ödeme yapıyoruz.",
    ],
  },
  {
    slug: "hurda-fiyatlari-neye-gore-belirlenir-kantar-cins-piyasa",
    title: "Hurda Fiyatları Neye Göre Belirlenir? Kantar, Cins ve Piyasa",
    category: "fiyat",
    excerpt:
      "Hurda metal fiyatını belirleyen üç temel etken: kantar (ağırlık), metalin cinsi ve günün piyasası. Şeffaf bir açıklama.",
    date: "2024-12-15",
    body: [
      "Hurda fiyatı üç şeye dayanır: ağırlık (kantar), metalin cinsi (bakır > alüminyum/sarı > demir) ve o günkü piyasa değeri. Bu üçü netleşmeden sağlıklı fiyat verilemez.",
      "Bu yüzden sitede sabit fiyat listesi yayınlamıyoruz; piyasa günlük değişir. Güncel değeri WhatsApp'tan anlık paylaşırız ([GÜNCEL FİYAT]).",
      "Tartımı her zaman sizin önünüzde, kantarda yaparız — kaç kilo, hangi cins, kaç lira, hepsi açık.",
    ],
  },
  {
    slug: "beykoz-eski-mobilya-tahliyesi-ucretli-mi-ucretsiz-mi",
    title: "Beykoz'da Eski Mobilya Tahliyesi: Ücretli mi, Ücretsiz mi?",
    category: "rehber",
    excerpt:
      "Beykoz'da eski mobilyanız ne zaman ücretsiz alınır, ne zaman ücretli tahliye gerekir? Ayrımı netleştirdik.",
    date: "2024-12-12",
    body: [
      "Kural basit: bir eşyanın hurda ya da ikinci el değeri, taşıma masrafını karşılıyorsa alım ücretsizdir — hatta size ödeme yaparız. Karşılamıyorsa ücretli tahliye gerekir.",
      "Sağlam mobilya ve metal aksamlı eşyalar genelde ilk gruba girer. Yıpranmış, kırık ya da değeri olmayan eşyalar ile moloz ise ücretli tahliye kapsamındadır.",
      "Beykoz'da Kavacık, Anadoluhisarı, Paşabahçe ve çevresinde dar sokaklarda taşıma deneyimimizle çalışıyoruz; fotoğraf gönderin, hangi kapsama girdiğini söyleyelim.",
    ],
  },
  {
    slug: "sancaktepe-sultanbeyli-hurda-demir-alim",
    title: "Sancaktepe ve Sultanbeyli'de Hurda Demir Alımı",
    category: "ilce",
    excerpt:
      "Sancaktepe ve Sultanbeyli'de hurda demir ve inşaat demiri alımı nasıl işler, fiyatı ne belirler?",
    date: "2024-12-10",
    body: [
      "Sancaktepe ve Sultanbeyli'de tadilat ve inşaat kaynaklı hurda demir yoğun çıkar. Demir, cinsine ve temizliğine göre kilo bazında değerlenir; güncel değer için [GÜNCEL FİYAT].",
      "Toplu demir tesliminde avantaj sağlıyoruz. Tartım kantarda, önünüzde yapılır ve ödeme peşin elden verilir.",
      "Sarıgazi, Yenidoğan, Abdurrahmangazi ve çevre mahallelerde adresinize gelir, yükü birlikte tartarız.",
    ],
  },
  {
    slug: "buzdolabi-camasir-makinesi-firin-hangisi-ne-kadar-eder",
    title: "Buzdolabı, Çamaşır Makinesi, Fırın: Hangisi Ne Kadar Eder?",
    category: "fiyat",
    excerpt:
      "Beyaz eşyalar arasında hurda/ikinci el değeri en yüksek olan hangisi? Karşılaştırmalı bir bakış.",
    date: "2024-12-06",
    body: [
      "Beyaz eşyaların değeri içerdiği metale ve çalışır olup olmamasına göre değişir. Buzdolabı bakır kompresörü sayesinde öne çıkarken, çamaşır makinesi ağır sac gövdesi ve motoruyla değer taşır; fırın ise ağırlıklı olarak sac hurdasıdır.",
      "Çalışan bir cihaz her zaman ikinci el olarak daha yüksek değerlenir. Arızalıda ise devreye hurda değeri girer. Cihaza özel güncel bandı görmek için [GÜNCEL FİYAT].",
      "Hangi eşyanız olursa olsun, fotoğraf gönderin; tipine göre en doğru değeri söyleyip yerinde peşin ödeyelim.",
    ],
  },
];

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
