"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function cancelBooking(bookingId: string) {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { workshop: true },
  });

  await prisma.$transaction(async (tx) => {
    // UPDATE condicional: solo cancela (y solo cuenta) si todavía estaba
    // "confirmed". Sin esto, un doble clic en "Cancelar" podría sumar el
    // cupo dos veces para una sola reserva (la misma clase de condición de
    // carrera que createBooking evita del lado de la reserva).
    const affectedRows = await tx.$executeRaw`
      UPDATE "Booking" SET status = 'cancelled'
      WHERE id = ${bookingId} AND status = 'confirmed'
    `;

    if (affectedRows === 0) return;

    const workshop = await tx.workshop.update({
      where: { id: booking.workshopId },
      data: { spotsLeft: { increment: 1 } },
    });

    if (workshop.status === "agotado" && workshop.spotsLeft > 0) {
      await tx.workshop.update({
        where: { id: workshop.id },
        data: { status: "proximo" },
      });
    }
  });

  revalidatePath("/admin/reservas");
  revalidatePath("/workshops");
  revalidatePath(`/workshops/${booking.workshop.slug}`);
}
