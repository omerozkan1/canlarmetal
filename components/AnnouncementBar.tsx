import Link from "next/link";
import { Megaphone, ChevronRight } from "lucide-react";
import { site } from "@/config/site";

export default function AnnouncementBar() {
  return (
    <Link
      href={site.announcement.href}
      className="group flex items-center justify-center gap-2 bg-copper-600/90 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-copper-600"
    >
      <Megaphone className="h-4 w-4 shrink-0" />
      <span>{site.announcement.text}</span>
      <span className="hidden items-center font-semibold underline-offset-2 group-hover:underline sm:inline-flex">
        İncele <ChevronRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
