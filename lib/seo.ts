// =============================================================
//  SEO YARDIMCILARI — canonical URL + JSON-LD (schema.org) üreticileri
//  Tüm yapılandırılmış veri buradan tek elden üretilir.
// =============================================================

import type { Metadata } from "next";
import { site } from "@/config/site";
import type { District } from "@/config/site";
import type { BlogPost } from "@/config/blog";

const BASE = site.url.replace(/\/$/, "");

/**
 * Göreli yolu mutlak (canonical) URL'e çevirir.
 * Site trailingSlash:true kullandığından, dosya olmayan yollara sona "/" eklenir
 * ki canonical, sitemap ve JSON-LD URL'leri birebir aynı olsun.
 */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  // Uzantısı olan (dosya) yollara veya zaten "/" ile bitenlere dokunma.
  const withSlash = /\.[a-z0-9]+$/i.test(p) || p.endsWith("/") ? p : `${p}/`;
  return `${BASE}${withSlash}`;
}

/**
 * Ortak sayfa metadata'sı üretir: canonical + OpenGraph + Twitter.
 * Her sayfada tekrar tekrar yazmamak için tek noktadan.
 */
export function pageMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: string[];
  publishedTime?: string;
}): Metadata {
  const { title, description, path, type = "website", images, publishedTime } = opts;
  const canonical = absoluteUrl(path);
  // OG görselleri; boyut+alt ile — sosyal kart tarayıcıları kartı hemen ölçüp
  // gösterebilsin (aksi halde string URL, layout'un boyutlu görselini ezerdi).
  const ogImages = (images ?? [site.seo.ogImage]).map((src) => ({
    url: absoluteUrl(src),
    width: 1200,
    height: 630,
    alt: `${site.brand} — Hurda & Beyaz Eşya Alımı`,
  }));
  const twitterImages = ogImages.map((img) => img.url);
  // Başlık verilmeyen sayfalarda (ör. ana sayfa) marka + slogan kullanılır;
  // verilen başlıklara marka soneki eklenir (template ile aynı biçim).
  const socialTitle = title
    ? `${title} | ${site.brand}`
    : `${site.brand} — Anadolu Yakası Hurda & Beyaz Eşya Alımı`;

  return {
    // title verilmediğinde anahtarı hiç basma ki layout'un title.default'u geçerli
    // olsun; title:undefined basılırsa Next varsayılanı ezip boş bırakır.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.brand,
      locale: "tr_TR",
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: twitterImages,
    },
  };
}

// ---- schema.org @id sabitleri (grafik düğümlerini birbirine bağlar) ----
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;
const LOCALBUSINESS_ID = `${BASE}/#localbusiness`;

/** Organization şeması. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.brand,
    legalName: site.business.legalName,
    url: absoluteUrl("/"),
    email: site.email,
    telephone: `+${site.phone}`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.svg"),
    },
    image: absoluteUrl(site.seo.ogImage),
    sameAs: [site.social.instagram].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.business.streetAddress,
      addressLocality: site.business.addressLocality,
      addressRegion: site.business.addressRegion,
      postalCode: site.business.postalCode,
      addressCountry: site.business.addressCountry,
    },
  };
}

/** WebSite şeması (arama kutusu potansiyeli dahil). */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.brand,
    inLanguage: "tr-TR",
    publisher: { "@id": ORG_ID },
  };
}

/** LocalBusiness şeması — yerel SEO'nun kalbi. */
export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": LOCALBUSINESS_ID,
    name: site.brand,
    image: absoluteUrl(site.seo.ogImage),
    url: absoluteUrl("/"),
    telephone: `+${site.phone}`,
    email: site.email,
    priceRange: site.business.priceRange,
    currenciesAccepted: "TRY",
    paymentAccepted: "Nakit",
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.region,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.business.streetAddress,
      addressLocality: site.business.addressLocality,
      addressRegion: site.business.addressRegion,
      postalCode: site.business.postalCode,
      addressCountry: site.business.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.business.geo.latitude,
      longitude: site.business.geo.longitude,
    },
    openingHoursSpecification: site.business.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.social.instagram].filter(Boolean),
    parentOrganization: { "@id": ORG_ID },
  };
}

/** BreadcrumbList şeması. items: {name, path?} — son öğe path'siz olabilir. */
export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: absoluteUrl(it.path) } : {}),
    })),
  };
}

/** Service şeması (tekil hizmet). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: site.region },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(opts.path),
      servicePhone: `+${site.phone}`,
    },
  };
}

/** FAQPage şeması. */
export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BlogPosting şeması. */
export function blogPostingSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "tr-TR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: absoluteUrl(site.seo.ogImage),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** İlçe sayfası için konuma özgü LocalBusiness türevi. */
export function districtBusinessSchema(d: District) {
  return {
    "@type": "LocalBusiness",
    name: `${site.brand} — ${d.name}`,
    description: d.seoText,
    url: absoluteUrl(`/${d.slug}`),
    image: absoluteUrl(site.seo.ogImage),
    telephone: `+${site.phone}`,
    priceRange: site.business.priceRange,
    parentOrganization: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: d.name,
      containedInPlace: { "@type": "AdministrativeArea", name: site.region },
    },
    // İşletmenin fiziki adresi (aynı işletme, o ilçeye hizmet veriyor).
    address: {
      "@type": "PostalAddress",
      streetAddress: site.business.streetAddress,
      addressLocality: site.business.addressLocality,
      addressRegion: site.business.addressRegion,
      postalCode: site.business.postalCode,
      addressCountry: site.business.addressCountry,
    },
  };
}

/**
 * Verilen şema düğümlerini tek bir @graph içinde JSON-LD string'ine sarar.
 * <script type="application/ld+json"> içeriğinde kullanılır.
 */
export function jsonLdGraph(nodes: object[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
