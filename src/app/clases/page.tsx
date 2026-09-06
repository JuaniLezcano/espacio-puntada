import type { Metadata } from "next";
import { scheduleSlots } from "@/data/schedule";
import { classIncludes, classConditions } from "@/data/class-info";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WeeklySchedule } from "@/components/schedule/WeeklySchedule";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { siteConfig } from "@/data/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Clases",
  description: "Horarios disponibles para las clases regulares de costura en Espacio Puntada.",
  path: "/clases",
});

export default function ClasesPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Clases regulares"
        title="Horarios disponibles"
        description="No dividimos las clases por nivel: cada alumna trae su propio proyecto y avanza a su ritmo, con acompañamiento personalizado. Elegí el horario que más te acomode y escribinos para coordinar tu lugar."
      />

      <div className="mt-10 max-w-xl">
        <WeeklySchedule slots={scheduleSlots} interactive />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h3 className="font-heading text-xl text-foreground">
            Las clases incluyen
          </h3>
          <ul className="mt-4 space-y-3">
            {classIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-foreground-muted">
                <span aria-hidden="true">🪡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl text-foreground">Condiciones</h3>
          <ol className="mt-4 space-y-3">
            {classConditions.map((item, index) => (
              <li key={item} className="flex gap-3 text-foreground-muted">
                <span className="font-medium text-primary">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-background-alt p-6 text-center sm:p-10">
        <p className="text-foreground-muted">
          ¿Tenés dudas sobre qué horario elegir o querés consultar disponibilidad?
        </p>
        <div className="mt-4 flex justify-center">
          <WhatsAppCTA
            phone={siteConfig.social.whatsapp ?? ""}
            message="Hola! Quiero consultar por los horarios de clases de Espacio Puntada."
          >
            Consultar por WhatsApp
          </WhatsAppCTA>
        </div>
      </div>
    </Container>
  );
}
