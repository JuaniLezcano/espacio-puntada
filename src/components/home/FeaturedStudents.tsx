import { students } from "@/data/students";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StudentCard } from "@/components/students/StudentCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedStudents() {
  const featured = students.filter((s) => s.featured);

  return (
    <section className="py-16">
      <Reveal>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Nuestras alumnas"
              title="Lo que hicieron en el espacio"
              description="Proyectos reales de alumnas que pasaron por nuestras clases y workshops."
            />
            <Button href="/alumnas" variant="ghost">
              Ver toda la galería →
            </Button>
          </div>

          <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {featured.map((student) => (
              <StudentCard key={student.slug} student={student} />
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
