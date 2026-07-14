import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, postBySlug, categoryLabels } from "@/config/blog";
import Breadcrumb from "@/components/Breadcrumb";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { buildGenericMessage } from "@/lib/whatsapp";
import {
  pageMetadata,
  jsonLdGraph,
  breadcrumbSchema,
  blogPostingSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = postBySlug(params.slug);
  if (!post) return { title: "Yazı bulunamadı", robots: { index: false, follow: false } };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = jsonLdGraph([
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    blogPostingSchema(post),
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <span className="rounded-full bg-copper-500/15 px-3 py-1 text-xs font-semibold text-copper-300">
        {categoryLabels[post.category]}
      </span>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-graphite-300">
        {post.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-copper-400/30 bg-copper-500/10 p-6 text-center">
        <h2 className="text-xl font-bold text-white">Eşyanızı değerinde satın</h2>
        <p className="mt-2 text-graphite-300">
          Fotoğraf gönderin, dakikalar içinde teklif alın.
        </p>
        <div className="mt-5 flex justify-center">
          <WhatsAppButton message={buildGenericMessage(post.title)} className="btn-primary">
            Ücretsiz Teklif Al
          </WhatsAppButton>
        </div>
      </div>

      {/* İlgili yazılar */}
      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">İlgili Yazılar</h2>
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-copper-400 hover:text-copper-300">
            Tümü <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </article>
  );
}
