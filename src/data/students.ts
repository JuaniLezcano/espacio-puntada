import type { Student } from "./types/student";

export const students: Student[] = [
  {
    slug: "maria-lopez",
    name: "María López",
    coverImage: "/images/alumnas/maria-lopez/portada.svg",
    photos: [
      {
        src: "/images/alumnas/maria-lopez/foto-1.svg",
        alt: "María con su vestido de lino terminado",
      },
      {
        src: "/images/alumnas/maria-lopez/foto-2.svg",
        alt: "Detalle de la costura del vestido",
      },
    ],
    projectTitle: "Mi primer vestido de lino",
    projectDescription:
      "Después de un par de clases en el espacio me animé a hacer mi primer vestido. El proceso fue mucho más simple de lo que pensaba y el resultado superó mis expectativas.",
    relatedTo: { type: "clases-regulares" },
    testimonial:
      "Nunca pensé que iba a poder hacer una prenda entera yo misma. ¡Ya estoy planeando la segunda!",
    featured: true,
  },
  {
    slug: "carla-gimenez",
    name: "Carla Giménez",
    coverImage: "/images/alumnas/carla-gimenez/portada.svg",
    photos: [
      {
        src: "/images/alumnas/carla-gimenez/foto-1.svg",
        alt: "Carla mostrando su tote bag reciclado",
      },
    ],
    projectTitle: "Tote bag con jean reciclado",
    projectDescription:
      "Usé un jean viejo que ya no me quedaba para hacer este tote bag en el workshop de reciclado. Fue una tarde súper productiva.",
    relatedTo: { type: "workshop", slug: "workshop-tote-bag-reciclado" },
    featured: true,
  },
  {
    slug: "lucia-fernandez",
    name: "Lucía Fernández",
    coverImage: "/images/alumnas/lucia-fernandez/portada.svg",
    photos: [
      {
        src: "/images/alumnas/lucia-fernandez/foto-1.svg",
        alt: "Lucía con su remera oversize terminada",
      },
      {
        src: "/images/alumnas/lucia-fernandez/foto-2.svg",
        alt: "Detalle de las terminaciones de la remera",
      },
    ],
    projectTitle: "Remera oversize con puños",
    projectDescription:
      "En una de las clases regulares aprendí a hacer terminaciones con puños elásticos. Esta remera fue uno de mis primeros proyectos en el espacio.",
    relatedTo: { type: "clases-regulares" },
  },
  {
    slug: "sol-martinez",
    name: "Sol Martínez",
    coverImage: "/images/alumnas/sol-martinez/portada.svg",
    photos: [
      {
        src: "/images/alumnas/sol-martinez/foto-1.svg",
        alt: "Sol con su pantalón wide leg",
      },
    ],
    projectTitle: "Pantalón wide leg a medida",
    projectDescription:
      "Con el molde que hice en una de las clases regulares pude ajustar el pantalón exactamente a mi talle. Fue mi primera experiencia patronando desde cero.",
    relatedTo: { type: "clases-regulares" },
  },
];
