import type { Metadata } from "next";
import { students } from "@/data/students";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudentCard } from "@/components/students/StudentCard";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Alumnas",
  description: "Descubrí los proyectos que hicieron nuestras alumnas en Espacio Puntada.",
  path: "/alumnas",
});

export default function AlumnasPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Galería"
        title="Nuestras alumnas"
        description="Cada proyecto cuenta una historia distinta. Conocé el trabajo de quienes ya pasaron por el espacio."
      />

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {students.map((student) => (
          <StudentCard key={student.slug} student={student} />
        ))}
      </div>
    </Container>
  );
}
