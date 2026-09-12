import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WorkshopCard } from "@/components/workshops/WorkshopCard";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedWorkshops() {
  const workshops = await prisma.workshop.findMany();
  const featured = workshops.filter((w) => w.featured || w.status === "proximo");

  if (featured.length === 0) return null;

  return (
    <section className="bg-background-alt py-16">
      <Reveal>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Workshops"
              title="Próximos encuentros"
              description="Experiencias intensivas de un día para llevarte una prenda o proyecto terminado."
            />
            <Button href="/workshops" variant="ghost">
              Ver todos los workshops →
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((workshop) => (
              <WorkshopCard key={workshop.slug} workshop={workshop} />
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
