import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  createScheduleSlot,
  updateScheduleSlot,
  deleteScheduleSlot,
} from "@/lib/actions/admin-schedule";

export const metadata: Metadata = {
  title: "Horarios — Admin",
  robots: { index: false, follow: false },
};

const inputClasses =
  "w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";

export default async function AdminHorariosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const slots = await prisma.scheduleSlot.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-heading text-3xl text-foreground">
        Horarios de clases regulares
      </h1>

      {error && <p className="mt-4 text-sm text-[#B5453A]">{error}</p>}

      <div className="mt-8 flex flex-col gap-4">
        {slots.map((slot) => (
          <form
            key={slot.id}
            action={updateScheduleSlot.bind(null, slot.id)}
            className="flex flex-wrap items-end gap-3 rounded-2xl border border-foreground/10 p-4"
          >
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-foreground-muted">Día</span>
              <input name="day" required defaultValue={slot.day} className={inputClasses} />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-foreground-muted">Horario</span>
              <input name="time" required defaultValue={slot.time} className={inputClasses} />
            </label>
            <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm">
              <span className="text-foreground-muted">Nota (opcional)</span>
              <input name="note" defaultValue={slot.note ?? ""} className={inputClasses} />
            </label>
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
            >
              Guardar
            </button>
            <button
              type="submit"
              formAction={deleteScheduleSlot.bind(null, slot.id)}
              className="text-sm text-[#B5453A] underline"
            >
              Borrar
            </button>
          </form>
        ))}

        {slots.length === 0 && (
          <p className="text-sm text-foreground-muted">Todavía no hay horarios cargados.</p>
        )}
      </div>

      <div className="mt-10 rounded-2xl bg-background-alt p-6">
        <h2 className="font-heading text-lg text-foreground">Agregar horario</h2>
        <form action={createScheduleSlot} className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground-muted">Día</span>
            <input name="day" required placeholder="Lunes" className={inputClasses} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground-muted">Horario</span>
            <input name="time" required placeholder="18:00 a 20:00hs" className={inputClasses} />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm">
            <span className="text-foreground-muted">Nota (opcional)</span>
            <input name="note" placeholder="Grupo reducido" className={inputClasses} />
          </label>
          <button
            type="submit"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Agregar
          </button>
        </form>
      </div>
    </main>
  );
}
