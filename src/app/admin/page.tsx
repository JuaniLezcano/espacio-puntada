import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Estudio Puntada",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const [activeBookings, workshopCount, slotCount] = await Promise.all([
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.workshop.count(),
    prisma.scheduleSlot.count(),
  ]);

  const sections = [
    {
      href: "/admin/reservas",
      title: "Reservas",
      description: "Ver quién reservó cada workshop y cancelar reservas.",
      stat: `${activeBookings} activa${activeBookings === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/workshops",
      title: "Workshops",
      description: "Crear, editar y borrar workshops.",
      stat: `${workshopCount} cargado${workshopCount === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/horarios",
      title: "Horarios",
      description: "Gestionar el horario semanal de clases regulares.",
      stat: `${slotCount} horario${slotCount === 1 ? "" : "s"}`,
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl text-foreground">Admin</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Panel de Estudio Puntada — elegí qué querés gestionar.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex flex-col gap-2 rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-primary/40 hover:bg-background-alt"
          >
            <h2 className="font-heading text-xl text-foreground">{section.title}</h2>
            <p className="text-sm text-foreground-muted">{section.description}</p>
            <span className="mt-auto pt-2 text-sm font-medium text-primary">
              {section.stat}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
