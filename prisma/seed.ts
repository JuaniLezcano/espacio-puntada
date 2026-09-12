import "dotenv/config";
import { workshops } from "../src/data/workshops";
import { scheduleSlots } from "../src/data/schedule";
import { prisma } from "../src/lib/prisma";

async function main() {
  for (const workshop of workshops) {
    await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      update: {},
      create: {
        slug: workshop.slug,
        title: workshop.title,
        shortDescription: workshop.shortDescription,
        description: workshop.description,
        date: new Date(workshop.date),
        dateLabel: workshop.dateLabel,
        durationLabel: workshop.durationLabel,
        locationName: workshop.location.name,
        locationAddress: workshop.location.address,
        capacity: workshop.capacity,
        spotsLeft: workshop.spotsLeft ?? workshop.capacity,
        coverImage: workshop.coverImage,
        gallery: workshop.gallery ?? [],
        // Migramos todos los workshops al flujo de reserva propio (fase 1).
        reservationType: "internal",
        whatsappMessage:
          workshop.reservation.type === "external"
            ? workshop.reservation.whatsappMessage
            : undefined,
        featured: workshop.featured ?? false,
        status: workshop.status,
      },
    });
  }

  console.log(`Seed OK: ${workshops.length} workshops migrados.`);

  // Sin clave natural para hacer upsert — solo cargamos los horarios
  // iniciales si la tabla todavía está vacía.
  const existingSlots = await prisma.scheduleSlot.count();
  if (existingSlots === 0) {
    await prisma.scheduleSlot.createMany({ data: scheduleSlots });
    console.log(`Seed OK: ${scheduleSlots.length} horarios migrados.`);
  } else {
    console.log("Horarios: ya hay datos, no se vuelve a sembrar.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
