"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  message: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

// Verilen mesajı wa.me linkine çevirir ve yeni sekmede açar.
export default function WhatsAppButton({
  message,
  children,
  className = "btn-whatsapp",
  showIcon = true,
}: Props) {
  const href = buildWhatsAppUrl(message);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {showIcon && <MessageCircle className="h-5 w-5" />}
      {children}
    </a>
  );
}
