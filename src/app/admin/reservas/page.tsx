import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { cancelBooking } from "@/lib/actions/admin";

export const metadata: Metadata = {
  title: "Reservas — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReservasPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
    include: {
      bookings: { orderBy: { createdAt: "desc" } },
    },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl text-foreground">Reservas</h1>

      <div className="mt-8 flex flex-col gap-8">
        {workshops.map((workshop) => {
          const activeBookings = workshop.bookings.filter(
            (b) => b.status === "confirmed"
          ).length;

          return (
            <section
              key={workshop.id}
              className="rounded-2xl border border-foreground/10 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-heading text-xl text-foreground">
                  {workshop.title}
                </h2>
                <span className="text-sm text-foreground-muted">
                  {formatDate(workshop.date)} · {workshop.spotsLeft}/
                  {workshop.capacity} lugares · {workshop.status} ·{" "}
                  {activeBookings} reserva{activeBookings === 1 ? "" : "s"}
                </span>
              </div>

              {workshop.bookings.length === 0 ? (
                <p className="mt-4 text-sm text-foreground-muted">
                  Todavía no hay reservas.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-foreground-muted">
                        <th className="pb-2 pr-4 font-medium">Nombre</th>
                        <th className="pb-2 pr-4 font-medium">Teléfono</th>
                        <th className="pb-2 pr-4 font-medium">Email</th>
                        <th className="pb-2 pr-4 font-medium">Reservó</th>
                        <th className="pb-2 pr-4 font-medium">Estado</th>
                        <th className="pb-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {workshop.bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-t border-foreground/10"
                        >
                          <td className="py-2 pr-4 text-foreground">
                            {booking.name}
                          </td>
                          <td className="py-2 pr-4 text-foreground-muted">
                            {booking.phone}
                          </td>
                          <td className="py-2 pr-4 text-foreground-muted">
                            {booking.email ?? "—"}
                          </td>
                          <td className="py-2 pr-4 text-foreground-muted">
                            {formatDate(booking.createdAt)}
                          </td>
                          <td className="py-2 pr-4">
                            {booking.status === "cancelled"
                              ? "Cancelada"
                              : "Confirmada"}
                          </td>
                          <td className="py-2">
                            {booking.status === "confirmed" && (
                              <form action={cancelBooking.bind(null, booking.id)}>
                                <button
                                  type="submit"
                                  className="text-sm text-[#B5453A] underline"
                                >
                                  Cancelar
                                </button>
                              </form>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
