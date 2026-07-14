import Link from "next/link";
import { Recycle } from "lucide-react";
import { site } from "@/config/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-500 shadow-glow transition group-hover:bg-copper-400">
        <Recycle className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            light ? "text-graphite-900" : "text-white"
          }`}
        >
          Canlar<span className="text-copper-400"> Metal</span>
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-widest ${
            light ? "text-graphite-500" : "text-graphite-400"
          }`}
        >
          Hurda & Eşya Alımı
        </span>
      </span>
    </Link>
  );
}
