# IndexNow Entegrasyonu

Bu proje, Microsoft'un [IndexNow](https://www.indexnow.org/documentation) protokolünü
kullanarak yeni/güncellenen sayfaları Bing, Yandex ve diğer katılımcı arama
motorlarına **anında** bildirir. IndexNow'a yapılan tek bir gönderim tüm katılımcı
motorlar arasında paylaşılır.

## Bileşenler

| Dosya | Görevi |
|-------|--------|
| `public/f92d087e0f87f85a2449259364ee5c6f.txt` | Kalıcı IndexNow anahtar dosyası. `https://canlarmetal.com.tr/<key>.txt` adresinden erişilir. İçeriği anahtarın kendisidir. |
| `config/site.ts` → `site.indexNowKey` | Anahtarın tek merkezi kaynağı. Dosya adıyla aynı olmalıdır. |
| `lib/indexnow.ts` | Yeniden kullanılabilir istemci: `submitUrl()`, `submitUrls()`. Base URL'i `site.url`'den okur. |
| `scripts/indexnow.ts` | `npm run indexnow` CLI'ı. |
| `.github/workflows/indexnow.yml` | Deploy sonrası otomatik gönderim (GitHub Action). |

> **Not:** IndexNow anahtarı gizli değildir — spec gereği herkese açık `<key>.txt`
> dosyasında yayınlanır. Bu yüzden config'te tutulması güvenlik sorunu değildir.

## Elle Kullanım

```bash
# Sitedeki TÜM URL'leri gönder (sitemap ile aynı küme)
npm run indexnow

# Yalnızca belirli yol(lar)ı gönder (göreli veya mutlak)
npm run indexnow -- /blog/yeni-yazi-slug
npm run indexnow -- /kadikoy /atasehir
npm run indexnow -- https://canlarmetal.com.tr/ucretli-esya-tahliyesi
```

Başarılı gönderim `HTTP 200` (kabul) veya `HTTP 202` (kabul, anahtar doğrulaması
bekleniyor) döndürür. Kod içinden de kullanılabilir:

```ts
import { submitUrl, submitUrls, indexNowUrls } from "@/lib/indexnow";

await submitUrl("/blog/yeni-yazi");
await submitUrls([indexNowUrls.blogPost("yeni-yazi"), indexNowUrls.home()]);
```

## Otomatik Bildirim

### Yeni blog yazısı yayınlandığında

Yeni yazı `config/blog.ts` içindeki `blogPosts` dizisine eklenir. Yayına
çıktıktan sonra IndexNow'a bildirmenin iki yolu:

1. **Otomatik (önerilen):** `.github/workflows/indexnow.yml`, `config/blog.ts`
   değiştiğinde `main`'e push sonrası tetiklenir ve `npm run indexnow` çalıştırır.
   Ek işlem gerekmez — yazıyı ekleyip push'layın.

2. **Elle:** Deploy tamamlandıktan sonra sadece yeni yazının URL'ini gönderin:
   ```bash
   npm run indexnow -- /blog/<yeni-slug>
   ```

### Yeni hizmet/sayfa eklendiğinde

Yeni bir sayfa (`app/<yol>/page.tsx`) veya ilçe (`config/site.ts` → `districts`)
eklendiğinde:

1. **Otomatik:** Aynı workflow `app/**/page.tsx` ve `config/site.ts` değişikliklerini
   de izler; deploy sonrası tüm URL'leri yeniden bildirir.

2. **Elle:** Sadece yeni sayfayı gönderin:
   ```bash
   npm run indexnow -- /yeni-hizmet-sayfasi
   ```

> **Sitemap'i güncellemeyi unutmayın:** IndexNow, sitemap'in yerini tutmaz.
> Yeni içerik `app/sitemap.ts`'e otomatik yansır (config'ten okur), ayrıca IndexNow
> ile hızlı bildirim yapılır.

## Neden Deploy Sonrası (Runtime Değil)?

Bu site `next.config.mjs`'te `output: "export"` ile **statik** olarak dışa
aktarılır. Canlı bir Next.js sunucusu, API route veya server action yoktur.
Dolayısıyla:

- IndexNow gönderimi bir **build/deploy sonrası adımda** yapılmalıdır.
- Anahtar dosyası (`public/<key>.txt`) **canlıya çıktıktan sonra** arama motorları
  tarafından doğrulanabilir. Yayında olmayan bir siteye gönderim `403/422` ile
  reddedilir.

GitHub Action bu yüzden en doğru çözümdür: kod deploy edildikten sonra çalışır,
canlı anahtar dosyasını referans gösterir ve URL'leri güvenle bildirir.
