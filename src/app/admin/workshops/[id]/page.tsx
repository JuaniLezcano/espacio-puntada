import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WorkshopForm } from "@/components/admin/WorkshopForm";
import { updateWorkshop } from "@/lib/actions/admin-workshops";

export const metadata: Metadata = {
  title: "Editar workshop — Admin",
  robots: { index: false, follow: false },
};

export default async function EditarWorkshopPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const workshop = await prisma.workshop.findUnique({ where: { id } });

  if (!workshop) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-heading text-3xl text-foreground">Editar workshop</h1>
      {error && <p className="mt-4 text-sm text-[#B5453A]">{error}</p>}
      <WorkshopForm action={updateWorkshop.bind(null, id)} workshop={workshop} />
    </main>
  );
}
