import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";

// Sağ altta sabit yüzen "Teklif Al" butonu (her sayfada).
export default function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(buildGenericMessage());
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile Teklif Al"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-copper-500 py-3 pl-4 pr-5 font-semibold text-white shadow-glow transition hover:bg-copper-600 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Teklif Al</span>
    </a>
  );
}
