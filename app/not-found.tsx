import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-6xl font-extrabold text-copper-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Sayfa Bulunamadı</h1>
      <p className="mt-3 text-graphite-400">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <Link href="/" className="btn-primary mt-7">
        <Home className="h-5 w-5" /> Ana Sayfaya Dön
      </Link>
    </section>
  );
}
