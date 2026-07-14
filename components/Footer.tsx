import Link from "next/link";
import { Instagram, Phone, MessageCircle, Mail } from "lucide-react";
import Logo from "./Logo";
import { site, districts } from "@/config/site";
import { buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";

export default function Footer() {
  const waHref = buildWhatsAppUrl(buildGenericMessage());

  return (
    <footer className="border-t border-white/8 bg-graphite-900">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-graphite-400">
              {site.region}'nda beyaz eşya, hurda metal ve ikinci el eşya alımı.
              Nakit ödeme, yerinde alım.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-ic"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-sm text-graphite-400">
              <li><Link href="/#hizmetler" className="hover:text-copper-400">Hizmetlerimiz</Link></li>
              <li><Link href="/#surec" className="hover:text-copper-400">Süreç</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-copper-400">Hakkımızda</Link></li>
              <li><Link href="/blog" className="hover:text-copper-400">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5 text-sm text-graphite-400">
              <li><Link href="/#hizmetler" className="hover:text-copper-400">Beyaz Eşya Alımı</Link></li>
              <li><Link href="/#hizmetler" className="hover:text-copper-400">Hurda Metal Alımı</Link></li>
              <li><Link href="/#hizmetler" className="hover:text-copper-400">İkinci El Alımı</Link></li>
              <li><Link href="/ucretli-esya-tahliyesi" className="hover:text-copper-400">Ücretli Eşya Tahliyesi</Link></li>
              <li><Link href="/iletisim" className="hover:text-copper-400">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              İletişim
            </h4>
            <ul className="space-y-3 text-sm text-graphite-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-copper-400" />
                <a href={`tel:${site.phone}`} className="hover:text-copper-400">
                  Sercan Türk · {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-copper-400" />
                <a href={`tel:${site.phone2}`} className="hover:text-copper-400">
                  Emircan Türk · {site.phone2Display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-copper-400" />
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-copper-400">7/24 WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-copper-400" />
                <a href={`mailto:${site.email}`} className="hover:text-copper-400">{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* İlçe hızlı linkleri */}
        <div className="mt-10 border-t border-white/8 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-graphite-500">
            Hizmet Bölgeleri
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-graphite-500">
            {districts.map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className="hover:text-copper-400">
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-graphite-500 sm:flex-row">
          <p>© {site.brand} — Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/gizlilik-politikasi" className="hover:text-copper-400">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:text-copper-400">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
