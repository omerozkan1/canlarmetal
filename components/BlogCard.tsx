import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, categoryLabels } from "@/config/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-white/8 bg-graphite-850 p-5 transition hover:border-copper-400/40 hover:bg-graphite-800"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-copper-500/15 px-3 py-1 text-xs font-semibold text-copper-300">
          {categoryLabels[post.category]}
        </span>
        <ArrowUpRight className="h-4 w-4 text-graphite-500 transition group-hover:text-copper-400" />
      </div>
      <h3 className="mb-2 text-base font-bold leading-snug text-white group-hover:text-copper-100">
        {post.title}
      </h3>
      <p className="line-clamp-3 flex-1 text-sm text-graphite-400">{post.excerpt}</p>
    </Link>
  );
}
