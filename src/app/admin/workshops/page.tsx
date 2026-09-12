import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { deleteWorkshop } from "@/lib/actions/admin-workshops";

export const metadata: Metadata = {
  title: "Workshops — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminWorkshopsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const workshops = await prisma.workshop.findMany({ orderBy: { date: "asc" } });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-foreground">Workshops</h1>
        <Link
          href="/admin/workshops/nuevo"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Nuevo workshop
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-[#B5453A]">{error}</p>}

      <div className="mt-8 flex flex-col gap-4">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-foreground/10 p-4"
          >
            <div>
              <p className="font-medium text-foreground">{workshop.title}</p>
              <p className="text-sm text-foreground-muted">
                {formatDate(workshop.date)} · {workshop.spotsLeft}/{workshop.capacity}{" "}
                lugares · {workshop.status}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/workshops/${workshop.id}`}
                className="text-sm font-medium text-primary underline"
              >
                Editar
              </Link>
              <form action={deleteWorkshop.bind(null, workshop.id)}>
                <button type="submit" className="text-sm text-[#B5453A] underline">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
