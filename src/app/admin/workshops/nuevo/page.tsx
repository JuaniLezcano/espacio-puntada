import type { Metadata } from "next";
import { WorkshopForm } from "@/components/admin/WorkshopForm";
import { createWorkshop } from "@/lib/actions/admin-workshops";

export const metadata: Metadata = {
  title: "Nuevo workshop — Admin",
  robots: { index: false, follow: false },
};

export default async function NuevoWorkshopPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-heading text-3xl text-foreground">Nuevo workshop</h1>
      {error && <p className="mt-4 text-sm text-[#B5453A]">{error}</p>}
      <WorkshopForm action={createWorkshop} />
    </main>
  );
}
