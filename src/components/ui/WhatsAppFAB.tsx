import { siteConfig } from "@/data/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFAB() {
  if (!siteConfig.social.whatsapp) return null;

  return (
    <a
      href={buildWhatsAppLink(
        siteConfig.social.whatsapp,
        "Hola! Quiero consultar sobre Espacio Puntada."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover motion-reduce:transition-none"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-primary/50 motion-safe:animate-ping motion-reduce:hidden" />
      <WhatsAppIcon size={26} />
    </a>
  );
}
