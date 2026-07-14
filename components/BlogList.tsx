"use client";

import { useState } from "react";
import { blogPosts, blogFilters, BlogCategory } from "@/config/blog";
import BlogCard from "@/components/BlogCard";

export default function BlogList() {
  const [filter, setFilter] = useState<BlogCategory | "all">("all");

  const posts =
    filter === "all" ? blogPosts : blogPosts.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {blogFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`chip ${filter === f.key ? "chip-active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
