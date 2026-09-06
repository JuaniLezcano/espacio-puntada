import type { Metadata } from "next";
import { workshops } from "@/data/workshops";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Workshops",
  description: "Próximos workshops de costura en Espacio Puntada: fechas, cupos y precios.",
  path: "/workshops",
});

const statusOrder: Record<(typeof workshops)[number]["status"], number> = {
  proximo: 0,
  agotado: 1,
  finalizado: 2,
};

export default function WorkshopsPage() {
  const sorted = [...workshops].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Workshops"
        title="Próximos workshops"
        description="Encuentros puntuales para aprender una técnica o terminar un proyecto en una sola jornada."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </div>
    </Container>
  );
}
