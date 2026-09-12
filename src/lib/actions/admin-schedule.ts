"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function revalidateSchedulePaths() {
  revalidatePath("/");
  revalidatePath("/clases");
  revalidatePath("/admin/horarios");
}

function parseSlotForm(formData: FormData) {
  return {
    day: String(formData.get("day") ?? "").trim(),
    time: String(formData.get("time") ?? "").trim(),
    note: String(formData.get("note") ?? "").trim() || null,
  };
}

export async function createScheduleSlot(formData: FormData) {
  const data = parseSlotForm(formData);
  if (!data.day || !data.time) {
    redirect(`/admin/horarios?error=${encodeURIComponent("Completá día y horario.")}`);
  }

  await prisma.scheduleSlot.create({ data });
  revalidateSchedulePaths();
  redirect("/admin/horarios");
}

export async function updateScheduleSlot(id: string, formData: FormData) {
  const data = parseSlotForm(formData);
  if (!data.day || !data.time) {
    redirect(`/admin/horarios?error=${encodeURIComponent("Completá día y horario.")}`);
  }

  await prisma.scheduleSlot.update({ where: { id }, data });
  revalidateSchedulePaths();
  redirect("/admin/horarios");
}

export async function deleteScheduleSlot(id: string) {
  await prisma.scheduleSlot.delete({ where: { id } });
  revalidateSchedulePaths();
  redirect("/admin/horarios");
}
