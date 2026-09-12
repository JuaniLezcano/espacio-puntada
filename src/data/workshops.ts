import type { Workshop } from "./types/workshop";

// La app ya no lee este archivo — los workshops viven en la base de datos
// (ver prisma/schema.prisma). Se mantiene solo como fuente de datos inicial
// para prisma/seed.ts.
export const workshops: Workshop[] = [
  {
    slug: "workshop-vestido-de-lino",
    title: "Workshop: vestido de lino en un día",
    shortDescription:
      "Un día entero para salir con tu propio vestido de lino terminado.",
    description:
      "Workshop intensivo de un día donde vas a coser un vestido de lino de principio a fin: corte, armado y terminaciones. Incluye materiales y asesoramiento personalizado de talle. No hace falta experiencia previa.",
    date: "2026-10-18",
    dateLabel: "Sábado 18 de octubre",
    durationLabel: "6 horas (10:00 a 16:00hs, con pausa para almorzar)",
    location: {
      name: "Estudio Puntada",
      address: "Ejemplo 1234, Buenos Aires",
    },
    capacity: 8,
    spotsLeft: 3,
    coverImage: "/images/workshops/workshop-vestido-de-lino/portada.svg",
    gallery: [
      "/images/workshops/workshop-vestido-de-lino/galeria-1.svg",
      "/images/workshops/workshop-vestido-de-lino/galeria-2.svg",
    ],
    reservation: {
      type: "external",
      whatsappMessage:
        "Hola! Quiero reservar mi lugar en el workshop de vestido de lino del 18 de octubre.",
    },
    featured: true,
    status: "proximo",
  },
  {
    slug: "workshop-tote-bag-reciclado",
    title: "Workshop: tote bag con telas recicladas",
    shortDescription: "Workshop corto para dar una segunda vida a telas en desuso.",
    description:
      "Convertimos retazos y prendas en desuso en un tote bag propio. Un workshop pensado para introducirse a la costura de forma rápida y sustentable.",
    date: "2026-06-14",
    dateLabel: "Sábado 14 de junio",
    durationLabel: "3 horas",
    location: {
      name: "Estudio Puntada",
      address: "Ejemplo 1234, Buenos Aires",
    },
    capacity: 10,
    spotsLeft: 0,
    coverImage: "/images/workshops/workshop-tote-bag-reciclado/portada.svg",
    gallery: ["/images/workshops/workshop-tote-bag-reciclado/galeria-1.svg"],
    reservation: {
      type: "external",
      whatsappMessage:
        "Hola! Quiero consultar sobre la próxima fecha del workshop de tote bag reciclado.",
    },
    status: "finalizado",
  },
];
