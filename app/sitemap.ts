import type { MetadataRoute } from "next";
import { site, districts } from "@/config/site";
import { blogPosts } from "@/config/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

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
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, changeFrequency: "weekly" as const })),
    ...districts.map((d) => ({ url: `${base}/${d.slug}`, changeFrequency: "monthly" as const })),
    ...blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: "monthly" as const })),
  ];
}
