import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { InstagramCTA } from "@/components/ui/InstagramCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: `Contactate con ${siteConfig.name} por WhatsApp o Instagram.`,
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos"
        description="Escribinos por WhatsApp o Instagram para consultar por clases, workshops o cualquier otra duda."
      />

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
          <h3 className="font-heading text-xl text-foreground">Dirección</h3>
          <p className="text-foreground-muted">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}
          </p>
          {siteConfig.address.mapsUrl && (
            <a
              href={siteConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline"
            >
              Ver en el mapa
            </a>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
          <h3 className="font-heading text-xl text-foreground">Escribinos</h3>
          <p className="text-foreground-muted">
            Respondemos por WhatsApp e Instagram durante la semana.
          </p>
          <div className="flex flex-col gap-3">
            <WhatsAppCTA
              phone={siteConfig.social.whatsapp ?? ""}
              message="Hola! Quiero hacer una consulta a Estudio Puntada."
            >
              Escribinos por WhatsApp
            </WhatsAppCTA>
            {siteConfig.social.instagram && (
              <InstagramCTA href={siteConfig.social.instagram}>
                Seguinos en Instagram
              </InstagramCTA>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
