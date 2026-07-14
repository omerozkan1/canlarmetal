"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";

const navLinks = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#surec", label: "Süreç" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const waHref = buildWhatsAppUrl(buildGenericMessage());

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-graphite-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-graphite-300 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/ucretli-esya-tahliyesi"
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-graphite-100 transition hover:bg-white/5"
          >
            Ücretli Eşya Tahliyesi
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl bg-copper-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-copper-600"
          >
            Teklif Al
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-graphite-900 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-graphite-200 transition hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/ucretli-esya-tahliyesi"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold"
            >
              Ücretli Eşya Tahliyesi <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-copper-500 px-4 py-3 text-sm font-semibold text-white"
            >
              Teklif Al <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
