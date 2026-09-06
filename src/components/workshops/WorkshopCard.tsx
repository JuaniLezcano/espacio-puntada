import Image from "next/image";
import Link from "next/link";
import type { Workshop } from "@/data/types/workshop";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";

const statusBadge: Record<Workshop["status"], { label: string; tone: "success" | "warning" | "danger" | "neutral" }> = {
  proximo: { label: "Próximo", tone: "success" },
  agotado: { label: "Agotado", tone: "danger" },
  finalizado: { label: "Finalizado", tone: "neutral" },
};

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const badge = statusBadge[workshop.status];

  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={workshop.coverImage}
          alt={workshop.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge tone={badge.tone}>{badge.label}</Badge>
        <h3 className="font-heading text-xl text-foreground">{workshop.title}</h3>
        <p className="text-sm text-foreground-muted">{workshop.shortDescription}</p>
        <div className="mt-auto text-sm text-foreground-muted">
          <span>{workshop.dateLabel ?? formatDate(workshop.date)}</span>
        </div>
      </div>
    </Link>
  );
}
