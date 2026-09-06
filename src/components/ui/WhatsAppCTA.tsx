import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons";

interface WhatsAppCTAProps {
  phone: string;
  message?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WhatsAppCTA({
  phone,
  message,
  children,
  variant = "primary",
  size = "md",
  className,
}: WhatsAppCTAProps) {
  return (
    <Button
      href={buildWhatsAppLink(phone, message)}
      external
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsAppIcon />
      {children}
    </Button>
  );
}
