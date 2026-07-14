import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Hurda & Eşya Rehberi — Anadolu Yakası",
  description:
    "Hurda metal ve beyaz eşyanın değerini belirleyen etkenler, ilçe ilçe alım rehberleri ve geri dönüşüm ipuçları. Anadolu Yakası için pratik bilgiler.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Blog" }]} />
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Hurda Beyaz Eşya Rehberi — İstanbul Anadolu Yakası
      </h1>
      <p className="mt-3 max-w-2xl text-graphite-400">
        Hurda alımı, fiyatlandırma ve ilçe bazlı rehberler. Aradığınız konuyu
        filtreleyerek bulun.
      </p>

      <div className="mt-10">
        <BlogList />
      </div>
    </section>
  );
}
