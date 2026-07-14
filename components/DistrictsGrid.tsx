import Link from "next/link";
import { MapPin } from "lucide-react";
import { districts } from "@/config/site";

export default function DistrictsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {districts.map((d) => (
        <Link
          key={d.slug}
          href={`/${d.slug}`}
          className="group flex items-center gap-2 rounded-xl border border-white/8 bg-graphite-850 px-4 py-3 text-sm font-medium text-graphite-200 transition hover:border-copper-400/50 hover:bg-copper-500/10 hover:text-white"
        >
          <MapPin className="h-4 w-4 text-copper-400" />
          {d.name}
        </Link>
      ))}
    </div>
  );
}
