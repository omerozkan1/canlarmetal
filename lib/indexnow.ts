// =============================================================
//  INDEXNOW — Microsoft IndexNow protokolü istemcisi
//  https://www.indexnow.org/documentation
//  Tek/çoklu URL'i arama motorlarına anında bildirir.
//  Yapılandırma (base URL + key) mevcut site config'inden okunur.
// =============================================================

import { site } from "@/config/site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const BASE = site.url.replace(/\/$/, "");
const HOST = site.domain.replace(/\/$/, "");
const KEY = site.indexNowKey;
// Anahtar dosyası public/<key>.txt olarak servis edilir.
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

export type IndexNowResult = {
  ok: boolean;
  status: number;
  statusText: string;
  submitted: string[];
  /** IndexNow durum kodunun insan-okur açıklaması. */
  message: string;
};

/** Göreli yolu (ör. "/blog/x") tam URL'e çevirir; tam URL ise dokunmaz. */
function toAbsolute(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

/** IndexNow HTTP durum kodunu açıklamaya çevirir (spec'e göre). */
function describeStatus(status: number): string {
  switch (status) {
    case 200:
      return "OK — URL'ler kabul edildi.";
    case 202:
      return "Kabul edildi — anahtar doğrulaması bekleniyor.";
    case 400:
      return "Geçersiz istek — URL biçimi hatalı olabilir.";
    case 403:
      return "Yetkisiz — anahtar dosyası bulunamadı veya eşleşmiyor.";
    case 422:
      return "İşlenemedi — URL'ler host ile eşleşmiyor ya da anahtar geçersiz.";
    case 429:
      return "Çok fazla istek — hız sınırı aşıldı, sonra tekrar deneyin.";
    default:
      return `Beklenmeyen durum kodu: ${status}`;
  }
}

/**
 * Bir veya birden fazla URL'i IndexNow'a gönderir.
 * Göreli ("/blog/x") ya da mutlak URL kabul eder.
 */
export async function submitUrls(urls: string | string[]): Promise<IndexNowResult> {
  const list = (Array.isArray(urls) ? urls : [urls])
    .map((u) => u?.trim())
    .filter(Boolean)
    .map(toAbsolute);

  // Aynı URL'i birden çok göndermeyelim.
  const urlList = Array.from(new Set(list));

  if (urlList.length === 0) {
    throw new Error("[IndexNow] Gönderilecek URL yok.");
  }
  if (!KEY) {
    throw new Error("[IndexNow] site.indexNowKey tanımsız — config'i kontrol edin.");
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const result: IndexNowResult = {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    submitted: urlList,
    message: describeStatus(res.status),
  };

  return result;
}

/** Tek URL için kısayol. */
export function submitUrl(url: string): Promise<IndexNowResult> {
  return submitUrls(url);
}

/** Bu güncellemenin gönderdiği tüm URL'leri kolayca üretmek için yardımcılar. */
export const indexNowUrls = {
  home: () => `${BASE}/`,
  blogPost: (slug: string) => `${BASE}/blog/${slug}`,
  district: (slug: string) => `${BASE}/${slug}`,
  page: (path: string) => toAbsolute(path),
};
