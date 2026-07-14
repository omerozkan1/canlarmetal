// =============================================================
//  ÜCRETLİ EŞYA TAHLİYESİ — SİHİRBAZ VERİLERİ (client-side)
//  Fiyat hesaplama YOK. Sihirbaz bilgileri toplayıp WhatsApp'a taşır.
// =============================================================

// Hizmet tipleri (Adım 1)
export type ServiceType = {
  key: string;
  title: string;
  desc: string;
  icon: "sofa" | "home" | "warehouse";
};

export const serviceTypes: ServiceType[] = [
  {
    key: "mobilya",
    title: "Mobilya Atımı",
    desc: "Koltuk, gardırop, yatak vb.",
    icon: "sofa",
  },
  {
    key: "ev-bosaltma",
    title: "Ev Boşaltma",
    desc: "Tüm eşyalar dahil",
    icon: "home",
  },
  {
    key: "depo-bodrum",
    title: "Depo-Bodrum",
    desc: "Temizlik & boşaltma",
    icon: "warehouse",
  },
];

// Adım 5 hızlı seçim çipleri
export type ItemPreset = {
  key: string;
  label: string;
};

export const itemPresets: ItemPreset[] = [
  { key: "tekli-koltuk", label: "Tekli Koltuk" },
  { key: "uclu-l-koltuk", label: "Üçlü/L Koltuk" },
  { key: "gardrop-2k", label: "Gardrop 2 Kapılı" },
  { key: "cift-yatak", label: "Çift Kişilik Yatak" },
  { key: "tek-yatak", label: "Tek Kişilik Yatak" },
  { key: "baza-cift", label: "Baza Çift" },
  { key: "yemek-masasi", label: "Yemek Masası+Sandalye" },
  { key: "kitaplik", label: "Kitaplık/Raf" },
];

// Sihirbazda seçilen eşya
export type SelectedItem = {
  key: string;
  label: string;
  qty: number;
};
