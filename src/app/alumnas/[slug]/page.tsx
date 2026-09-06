import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/data/students";
import { getStudentBySlug, getRelatedLabel } from "@/lib/resolve";
import { Container } from "@/components/layout/Container";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return students.map((student) => ({ slug: student.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const student = getStudentBySlug(slug);
  if (!student) return {};

  return buildMetadata({
    title: `${student.name} — ${student.projectTitle}`,
    description: student.projectDescription,
    image: student.coverImage,
    path: `/alumnas/${student.slug}`,
  });
}

export default async function StudentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) notFound();

  const related = getRelatedLabel(student.relatedTo);

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <LightboxGallery
            layout="hero"
            images={[
              { src: student.coverImage, alt: student.name },
              ...student.photos,
            ]}
          />
        </div>

        <aside className="h-fit rounded-2xl border border-foreground/10 p-6">
          <h1 className="font-heading text-3xl text-foreground">{student.name}</h1>
          <p className="mt-1 text-primary">{student.projectTitle}</p>

          <p className="mt-6 text-foreground-muted">{student.projectDescription}</p>

          {student.testimonial && (
            <blockquote className="mt-6 border-l-2 border-primary pl-4 italic text-foreground-muted">
              “{student.testimonial}”
            </blockquote>
          )}

          {related && (
            <p className="mt-6 text-sm text-foreground-muted">
              Tomó:{" "}
              <Link href={related.href} className="font-medium text-foreground underline">
                {related.label}
              </Link>
            </p>
          )}
        </aside>
      </div>
    </Container>
  );
}
