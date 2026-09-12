import type { ScheduleSlot } from "./types/schedule";

// La app ya no lee este archivo — el horario vive en la base de datos
// (ver prisma/schema.prisma). Se mantiene solo como fuente de datos inicial
// para prisma/seed.ts.
export const scheduleSlots: ScheduleSlot[] = [
  { day: "Lunes", time: "18:00 a 20:00hs" },
  { day: "Jueves", time: "18:00 a 20:00hs" },
  { day: "Viernes", time: "10:00 a 12:00hs" },
  { day: "Sábado", time: "10:00 a 12:00hs", note: "Grupo reducido" },
];
