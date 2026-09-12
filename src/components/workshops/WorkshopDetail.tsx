import type { Workshop } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { InstagramCTA } from "@/components/ui/InstagramCTA";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import { BookingForm } from "@/components/workshops/BookingForm";
import { siteConfig } from "@/data/site-config";
import { formatDate } from "@/lib/format";

const statusBadge: Record<Workshop["status"], { label: string; tone: "success" | "warning" | "danger" | "neutral" }> = {
  proximo: { label: "Próximo", tone: "success" },
  agotado: { label: "Agotado", tone: "danger" },
  finalizado: { label: "Finalizado", tone: "neutral" },
};

export function WorkshopDetail({ workshop }: { workshop: Workshop }) {
  const badge = statusBadge[workshop.status];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <LightboxGallery
          layout="hero"
          images={[
            { src: workshop.coverImage, alt: workshop.title },
            ...workshop.gallery.map((src) => ({
              src,
              alt: `${workshop.title} - foto adicional`,
            })),
          ]}
        />

        <p className="mt-8 whitespace-pre-line text-foreground-muted">
          {workshop.description}
        </p>
      </div>

      <aside className="h-fit rounded-2xl border border-foreground/10 p-6">
        <Badge tone={badge.tone}>{badge.label}</Badge>
        <h1 className="mt-3 font-heading text-3xl text-foreground">
          {workshop.title}
        </h1>

        <dl className="mt-6 space-y-3 text-sm">
          <InfoRow label="Fecha" value={workshop.dateLabel ?? formatDate(workshop.date)} />
          <InfoRow label="Duración" value={workshop.durationLabel} />
          <InfoRow
            label="Ubicación"
            value={
              workshop.locationAddress
                ? `${workshop.locationName} — ${workshop.locationAddress}`
                : workshop.locationName
            }
          />
          <InfoRow
            label="Cupo"
            value={`${workshop.spotsLeft} de ${workshop.capacity} lugares disponibles`}
          />
        </dl>

        {workshop.status === "proximo" && workshop.reservationType === "internal" && (
          <BookingForm workshopSlug={workshop.slug} />
        )}

        {workshop.status === "proximo" && workshop.reservationType === "external" && (
          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppCTA
              phone={siteConfig.social.whatsapp ?? ""}
              message={workshop.whatsappMessage ?? undefined}
              className="w-full"
            >
              Reservar por WhatsApp
            </WhatsAppCTA>
            {workshop.instagramHandle && siteConfig.social.instagram && (
              <InstagramCTA href={siteConfig.social.instagram} className="w-full">
                Consultar por Instagram
              </InstagramCTA>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-foreground/10 pb-3">
      <dt className="text-foreground-muted">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
