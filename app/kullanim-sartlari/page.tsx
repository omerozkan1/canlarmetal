import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: `${site.brand} kullanım şartları. Fiyatlar yerinde/görsel değerlendirme sonrası belirlenir.`,
};

export default function KullanimSartlariPage() {
  return (
    <LegalPage
      title="Kullanım Şartları"
      intro={`${site.brand} web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Lütfen hizmetlerimizden yararlanmadan önce bu şartları okuyunuz.`}
      sections={[
        {
          heading: "Hizmet Kapsamı",
          body: [
            `${site.brand}, ${site.region}'nda beyaz eşya, hurda metal ve ikinci el eşya alımı ile ücretli eşya tahliyesi hizmeti sunar.`,
          ],
        },
        {
          heading: "Fiyatlandırma",
          body: [
            "Ücretli eşya tahliyesi sayfasındaki sihirbaz bir fiyat üretmez; yalnızca talebinizi toplayıp WhatsApp'a taşır.",
            "Kesin fiyat, ekibimizin eşyaları görsel veya yerinde değerlendirmesi sonucu belirlenir.",
          ],
        },
        {
          heading: "Sorumluluk",
          body: [
            "Sitedeki içerik bilgilendirme amaçlıdır. Nihai anlaşma WhatsApp üzerinden karşılıklı mutabakatla yapılır.",
          ],
        },
        {
          heading: "İletişim",
          body: [`Sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`],
        },
      ]}
    />
  );
}
