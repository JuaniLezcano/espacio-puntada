import Image from "next/image";
import Link from "next/link";
import type { Student } from "@/data/types/student";

export function StudentCard({ student }: { student: Student }) {
  return (
    <Link
      href={`/alumnas/${student.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={student.coverImage}
          alt={student.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="font-heading text-lg text-foreground">{student.name}</h3>
        <p className="text-sm text-foreground-muted">{student.projectTitle}</p>
      </div>
    </Link>
  );
}
