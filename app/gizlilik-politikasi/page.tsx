import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gizlilik Politikası",
  description: `${site.brand} gizlilik politikası. Sitemiz kayıt/veritabanı tutmaz; iletişim WhatsApp üzerinden yürür.`,
  path: "/gizlilik-politikasi",
});

export default function GizlilikPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro={`${site.brand} olarak gizliliğinize önem veriyoruz. Bu politika, ${site.domain} web sitesini ziyaret ettiğinizde verilerinizin nasıl işlendiğini açıklar.`}
      sections={[
        {
          heading: "Veri Sorumlusu",
          body: [
            `Bu web sitesi ${site.brand} tarafından işletilmektedir. Adres: ${site.address}. İletişim: ${site.email}.`,
          ],
        },
        {
          heading: "Veri Toplama",
          body: [
            "Sitemiz statik bir web sitesidir; kayıt formu, üyelik veya veritabanı bulunmaz. Sitede herhangi bir kişisel verinizi toplamaz veya saklamayız.",
            "Fiyat teklifi almak için kullandığınız butonlar, yaptığınız seçimleri (ilçe, eşya tipi vb.) hazır bir WhatsApp mesajına dönüştürür. Bu bilgiler sunucumuza gönderilmez; mesajı gönderip göndermemek tamamen sizin tercihinizdir.",
          ],
        },
        {
          heading: "WhatsApp İletişimi",
          body: [
            "Sizinle iletişimimiz WhatsApp üzerinden yürür. WhatsApp'ta bizimle paylaştığınız telefon numarası, mesaj ve fotoğraflar, yalnızca talebinizi değerlendirmek ve hizmet sunmak amacıyla kullanılır.",
            "Bu platformda paylaşılan bilgiler ayrıca WhatsApp'ın (Meta) kendi gizlilik politikasına tabidir.",
          ],
        },
        {
          heading: "Çerezler ve Üçüncü Taraflar",
          body: [
            "Sitemiz pazarlama veya takip amaçlı çerez kullanmaz. İletişim sayfasındaki konum gösterimi için Google Maps gömülü olabilir; bu servisin kullanımı Google'ın kendi gizlilik politikasına tabidir.",
          ],
        },
        {
          heading: "KVKK Kapsamındaki Haklarınız",
          body: [
            "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz.",
            `Bu haklarınızı kullanmak için ${site.email} adresinden bize ulaşabilirsiniz.`,
          ],
        },
        {
          heading: "İletişim",
          body: [`Gizlilikle ilgili sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`],
        },
      ]}
    />
  );
}
