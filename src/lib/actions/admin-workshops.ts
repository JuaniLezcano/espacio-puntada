"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function parseWorkshopForm(formData: FormData) {
  const gallery = String(formData.get("gallery") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: new Date(String(formData.get("date"))),
    dateLabel: String(formData.get("dateLabel") ?? "").trim() || null,
    durationLabel: String(formData.get("durationLabel") ?? "").trim(),
    locationName: String(formData.get("locationName") ?? "").trim(),
    locationAddress: String(formData.get("locationAddress") ?? "").trim() || null,
    capacity: Number(formData.get("capacity")),
    spotsLeft: Number(formData.get("spotsLeft")),
    coverImage: String(formData.get("coverImage") ?? "").trim(),
    gallery,
    reservationType:
      formData.get("reservationType") === "external" ? "external" : "internal",
    whatsappMessage: String(formData.get("whatsappMessage") ?? "").trim() || null,
    instagramHandle: String(formData.get("instagramHandle") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    status: ["proximo", "agotado", "finalizado"].includes(
      String(formData.get("status"))
    )
      ? (String(formData.get("status")) as "proximo" | "agotado" | "finalizado")
      : "proximo",
  } satisfies Prisma.WorkshopUncheckedCreateInput;
}

function validate(data: ReturnType<typeof parseWorkshopForm>): string | null {
  if (!data.slug || !data.title || !data.shortDescription || !data.description) {
    return "Completá slug, título y descripciones.";
  }
  if (!data.durationLabel || !data.locationName || !data.coverImage) {
    return "Completá duración, lugar e imagen de portada.";
  }
  if (Number.isNaN(data.date.getTime())) {
    return "La fecha no es válida.";
  }
  if (
    Number.isNaN(data.capacity) ||
    Number.isNaN(data.spotsLeft) ||
    data.capacity < 0 ||
    data.spotsLeft < 0
  ) {
    return "Cupo total y cupo disponible deben ser números válidos.";
  }
  return null;
}

function revalidateWorkshopPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/admin/workshops");
  revalidatePath("/admin/reservas");
  revalidatePath("/workshops");
  revalidatePath(`/workshops/${slug}`);
}

export async function createWorkshop(formData: FormData) {
  const data = parseWorkshopForm(formData);
  const error = validate(data);
  if (error) {
    redirect(`/admin/workshops/nuevo?error=${encodeURIComponent(error)}`);
  }

  try {
    await prisma.workshop.create({ data });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      redirect(
        `/admin/workshops/nuevo?error=${encodeURIComponent("Ya existe un workshop con ese slug.")}`
      );
    }
    throw err;
  }

  revalidateWorkshopPaths(data.slug);
  redirect("/admin/workshops");
}

export async function updateWorkshop(id: string, formData: FormData) {
  const data = parseWorkshopForm(formData);
  const error = validate(data);
  if (error) {
    redirect(`/admin/workshops/${id}?error=${encodeURIComponent(error)}`);
  }

  try {
    await prisma.workshop.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      redirect(
        `/admin/workshops/${id}?error=${encodeURIComponent("Ya existe un workshop con ese slug.")}`
      );
    }
    throw err;
  }

  revalidateWorkshopPaths(data.slug);
  redirect("/admin/workshops");
}

export async function deleteWorkshop(id: string) {
  const workshop = await prisma.workshop.findUniqueOrThrow({ where: { id } });

  const activeBookings = await prisma.booking.count({
    where: { workshopId: id, status: "confirmed" },
  });

  if (activeBookings > 0) {
    redirect(
      `/admin/workshops?error=${encodeURIComponent(
        "No se puede borrar: tiene reservas confirmadas. Cancelalas primero desde /admin/reservas."
      )}`
    );
  }

  // Solo quedan reservas canceladas (si las hay) — se borran junto con el
  // workshop, ya no tienen valor como registro una vez que este no existe.
  await prisma.booking.deleteMany({ where: { workshopId: id } });
  await prisma.workshop.delete({ where: { id } });

  revalidateWorkshopPaths(workshop.slug);
  redirect("/admin/workshops");
}
