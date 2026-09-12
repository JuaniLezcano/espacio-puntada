import type { ScheduleSlot } from "@/generated/prisma/client";
import { siteConfig } from "@/data/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const DAY_ORDER = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

interface WeeklyScheduleProps {
  slots: ScheduleSlot[];
  interactive?: boolean;
}

export function WeeklySchedule({ slots, interactive = false }: WeeklyScheduleProps) {
  const sorted = [...slots].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );

  return (
    <div className="divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
      {sorted.map((slot, index) => (
        <div key={`${slot.day}-${slot.time}-${index}`} className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <span className="font-heading text-lg text-foreground">{slot.day}</span>
            <div className="text-right">
              <span className="text-foreground-muted">{slot.time}</span>
              {slot.note && (
                <p className="text-xs text-foreground-muted/80">{slot.note}</p>
              )}
            </div>
          </div>

          {interactive && siteConfig.social.whatsapp && (
            <a
              href={buildWhatsAppLink(
                siteConfig.social.whatsapp,
                `Hola! Quiero consultar por el horario del ${slot.day} de ${slot.time} en Estudio Puntada.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-primary hover:text-primary-hover"
            >
              Consultar este horario →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
