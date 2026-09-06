import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workshops } from "@/data/workshops";
import { getWorkshopBySlug } from "@/lib/resolve";
import { Container } from "@/components/layout/Container";
import { WorkshopDetail } from "@/components/workshops/WorkshopDetail";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) return {};

  return buildMetadata({
    title: workshop.title,
    description: workshop.shortDescription,
    image: workshop.coverImage,
    path: `/workshops/${workshop.slug}`,
  });
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) notFound();

  return (
    <Container className="py-16">
      <WorkshopDetail workshop={workshop} />
    </Container>
  );
}
