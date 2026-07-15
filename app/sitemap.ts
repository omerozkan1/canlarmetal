import type { MetadataRoute } from "next";
import { site, districts } from "@/config/site";
import { blogPosts } from "@/config/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/ucretli-esya-tahliyesi", changeFrequency: "weekly", priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.6 },
    { path: "/iletisim", changeFrequency: "monthly", priority: 0.7 },
    { path: "/gizlilik-politikasi", changeFrequency: "yearly", priority: 0.3 },
    { path: "/kullanim-sartlari", changeFrequency: "yearly", priority: 0.3 },
  ];

  // absoluteUrl() ile canonical/JSON-LD ile birebir aynı (trailingSlash) URL üretilir.
  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path || "/"),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...districts.map((d) => ({
      url: absoluteUrl(`/${d.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
