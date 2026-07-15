"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";

// Harita "facade" — Google Maps iframe'i ağır 3rd-party JS yüklediğinden,
// varsayılan olarak hafif bir placeholder gösterir; kullanıcı tıklayınca
// gerçek iframe yüklenir. Etkileşmeyen ziyaretçiye Maps maliyeti yansımaz.
export default function MapEmbed({ height = 380 }: { height?: number }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={site.mapEmbedSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Canlar Metal Konum"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Haritayı yükle"
      style={{ height }}
      className="metal-texture group flex w-full flex-col items-center justify-center gap-3 bg-graphite-850 text-center transition hover:bg-graphite-800"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-copper-500/15 text-copper-300 transition group-hover:bg-copper-500/25">
        <MapPin className="h-6 w-6" />
      </span>
      <span className="px-4 text-sm text-graphite-300">{site.address}</span>
      <span className="rounded-full bg-copper-500 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-copper-600">
        Haritayı Göster
      </span>
    </button>
  );
}
