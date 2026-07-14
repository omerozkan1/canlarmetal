import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-graphite-500">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {it.href ? (
            <Link href={it.href} className="hover:text-copper-400">
              {it.label}
            </Link>
          ) : (
            <span className="text-graphite-300">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-4 w-4" />}
        </span>
      ))}
    </nav>
  );
}
