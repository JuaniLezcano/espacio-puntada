import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WeeklySchedule } from "@/components/schedule/WeeklySchedule";
import { Reveal } from "@/components/ui/Reveal";

export async function RegularClasses() {
  const scheduleSlots = await prisma.scheduleSlot.findMany();

  return (
    <section className="py-16">
      <Reveal>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Clases regulares"
              title="Coordiná tu horario y sumate cuando quieras"
              description="No trabajamos por niveles: cada alumna trae su propio proyecto y avanza a su ritmo, con acompañamiento personalizado."
            />
            <Button href="/clases" variant="ghost">
              Ver todos los horarios →
            </Button>
          </div>

          <div className="mt-8 max-w-xl">
            <WeeklySchedule slots={scheduleSlots} />
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
