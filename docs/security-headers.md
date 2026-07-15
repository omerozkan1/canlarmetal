# Güvenlik Başlıkları (Security Headers)

Bu proje `output: "export"` ile **statik** olarak dışa aktarılır. Statik export'ta
Next.js `headers()` fonksiyonu çalışmaz — güvenlik başlıkları **hosting/CDN
katmanında** ayarlanır. Aşağıda barındırma sağlayıcısına göre yapılandırma vardır.

Uygulanan başlıklar (CSP, GA + Microsoft Clarity + Google Maps iframe ile uyumlu):

- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

## Netlify / Cloudflare Pages
`public/_headers` dosyası zaten hazır — bu sağlayıcılar dosyayı build çıktısından
otomatik okur. Ek işlem gerekmez.

## Vercel
`public/_headers` desteklenmez. Proje köküne `vercel.json` ekleyin:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://maps.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://c.clarity.ms; frame-src https://www.google.com https://maps.google.com; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" }
      ]
    }
  ]
}
```

## Nginx / Apache (kendi sunucunuz)
Aynı başlıkları sunucu konfigürasyonuna ekleyin (`add_header` / `Header set`).

## Not — CSP ve analytics
CSP, Google Analytics, Microsoft Clarity ve Google Maps embed'e izin verecek
şekilde ayarlanmıştır. Yeni bir üçüncü taraf script eklerseniz ilgili kaynağı
`script-src`/`connect-src`/`img-src`'ye eklemeyi unutmayın; aksi halde tarayıcı
o script'i engeller.
