"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type CreateBookingResult = { ok: true } | { ok: false; error: string };

export async function createBooking(
  workshopSlug: string,
  formData: FormData
): Promise<CreateBookingResult> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !phone) {
    return { ok: false, error: "Completá tu nombre y teléfono." };
  }

  const workshop = await prisma.workshop.findUnique({
    where: { slug: workshopSlug },
  });

  if (!workshop) {
    return { ok: false, error: "El workshop no existe." };
  }

  if (workshop.status !== "proximo") {
    return { ok: false, error: "Este workshop ya no acepta reservas." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // UPDATE condicional: solo descuenta cupo si todavía queda alguno.
      // Es la operación atómica que evita que dos reservas simultáneas
      // pasen ambas cuando queda un solo lugar (condición de carrera).
      const affectedRows = await tx.$executeRaw`
        UPDATE "Workshop"
        SET "spotsLeft" = "spotsLeft" - 1
        WHERE id = ${workshop.id} AND "spotsLeft" > 0
      `;

      if (affectedRows === 0) {
        throw new SoldOutError();
      }

      await tx.booking.create({
        data: {
          name,
          phone,
          email: email || null,
          workshopId: workshop.id,
        },
      });

      const updated = await tx.workshop.findUniqueOrThrow({
        where: { id: workshop.id },
      });

      if (updated.spotsLeft <= 0 && updated.status === "proximo") {
        await tx.workshop.update({
          where: { id: workshop.id },
          data: { status: "agotado" },
        });
      }
    });
  } catch (error) {
    if (error instanceof SoldOutError) {
      return { ok: false, error: "Justo se agotaron los lugares. Escribinos por WhatsApp para anotarte en la lista de espera." };
    }
    throw error;
  }

  revalidatePath(`/workshops/${workshopSlug}`);
  revalidatePath("/workshops");

  return { ok: true };
}

class SoldOutError extends Error {}
