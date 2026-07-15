/**
 * IndexNow gönderim CLI'ı — `npm run indexnow`
 *
 * Kullanım:
 *   npm run indexnow                     -> sitedeki tüm URL'leri gönderir (sitemap ile aynı küme)
 *   npm run indexnow -- /blog/yeni-yazi  -> yalnızca verilen yol(lar)ı gönderir
 *   npm run indexnow -- https://canlarmetal.com.tr/kadikoy
 *
 * Yapılandırma (base URL + key) config/site.ts'ten okunur; burada sır tutulmaz.
 */
import { site, districts } from "@/config/site";
import { blogPosts } from "@/config/blog";
import { submitUrls } from "@/lib/indexnow";

const BASE = site.url.replace(/\/$/, "");

/** Sitedeki tüm indekslenebilir yolları üretir (sitemap kaynaklarıyla aynı). */
function allSiteUrls(): string[] {
  const staticRoutes = [
    "",
    "/ucretli-esya-tahliyesi",
    "/blog",
    "/hakkimizda",
    "/iletisim",
    "/gizlilik-politikasi",
    "/kullanim-sartlari",
  ];
  return [
    ...staticRoutes.map((r) => `${BASE}${r || "/"}`),
    ...districts.map((d) => `${BASE}/${d.slug}`),
    ...blogPosts.map((p) => `${BASE}/blog/${p.slug}`),
  ];
}

async function main() {
  // `npm run indexnow -- <url...>` -> process.argv[2..]
  const args = process.argv.slice(2).filter(Boolean);
  const urls = args.length > 0 ? args : allSiteUrls();

  console.log(`[IndexNow] ${urls.length} URL gönderiliyor...`);
  for (const u of urls) console.log(`  • ${u}`);

  try {
    const result = await submitUrls(urls);
    if (result.ok) {
      console.log(`\n[IndexNow] ✓ Başarılı (HTTP ${result.status}) — ${result.message}`);
    } else {
      console.error(`\n[IndexNow] ✗ Başarısız (HTTP ${result.status}) — ${result.message}`);
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("\n[IndexNow] ✗ Gönderim hatası:", err instanceof Error ? err.message : err);
    process.exitCode = 1;
  }
}

main();
