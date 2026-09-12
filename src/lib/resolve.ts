import { prisma } from "@/lib/prisma";
import { students } from "@/data/students";
import type { StudentRelation } from "@/data/types/student";

export function getWorkshopBySlug(slug: string) {
  return prisma.workshop.findUnique({ where: { slug } });
}

export function getStudentBySlug(slug: string) {
  return students.find((s) => s.slug === slug);
}

export async function getRelatedLabel(relatedTo: StudentRelation) {
  if (relatedTo.type === "clases-regulares") {
    return { label: "Clases regulares", href: "/clases" };
  }
  const found = await getWorkshopBySlug(relatedTo.slug);
  return found ? { label: found.title, href: `/workshops/${found.slug}` } : null;
}
