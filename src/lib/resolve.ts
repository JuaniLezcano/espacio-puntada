import { workshops } from "@/data/workshops";
import { students } from "@/data/students";
import type { StudentRelation } from "@/data/types/student";

export function getWorkshopBySlug(slug: string) {
  return workshops.find((w) => w.slug === slug);
}

export function getStudentBySlug(slug: string) {
  return students.find((s) => s.slug === slug);
}

export function getRelatedLabel(relatedTo: StudentRelation) {
  if (relatedTo.type === "clases-regulares") {
    return { label: "Clases regulares", href: "/clases" };
  }
  const found = getWorkshopBySlug(relatedTo.slug);
  return found ? { label: found.title, href: `/workshops/${found.slug}` } : null;
}
