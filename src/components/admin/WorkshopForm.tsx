import type { ReactNode } from "react";
import type { Workshop } from "@/generated/prisma/client";

const inputClasses =
  "w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/70 focus:border-primary focus:outline-none";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function WorkshopForm({
  action,
  workshop,
}: {
  action: (formData: FormData) => Promise<void>;
  workshop?: Workshop;
}) {
  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      <Field label="Slug (usado en la URL)">
        <input
          name="slug"
          required
          defaultValue={workshop?.slug}
          placeholder="workshop-mi-taller"
          className={inputClasses}
        />
      </Field>

      <Field label="Título">
        <input name="title" required defaultValue={workshop?.title} className={inputClasses} />
      </Field>

      <Field label="Descripción corta">
        <input
          name="shortDescription"
          required
          defaultValue={workshop?.shortDescription}
          className={inputClasses}
        />
      </Field>

      <Field label="Descripción completa">
        <textarea
          name="description"
          required
          defaultValue={workshop?.description}
          rows={4}
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Fecha">
          <input
            type="date"
            name="date"
            required
            defaultValue={workshop ? toDateInputValue(workshop.date) : undefined}
            className={inputClasses}
          />
        </Field>
        <Field label="Fecha en texto (opcional)">
          <input
            name="dateLabel"
            defaultValue={workshop?.dateLabel ?? ""}
            placeholder="Sábado 18 de octubre"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Duración (texto)">
        <input
          name="durationLabel"
          required
          defaultValue={workshop?.durationLabel}
          placeholder="6 horas (10:00 a 16:00hs)"
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Lugar">
          <input
            name="locationName"
            required
            defaultValue={workshop?.locationName}
            className={inputClasses}
          />
        </Field>
        <Field label="Dirección (opcional)">
          <input
            name="locationAddress"
            defaultValue={workshop?.locationAddress ?? ""}
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cupo total">
          <input
            type="number"
            name="capacity"
            min={0}
            required
            defaultValue={workshop?.capacity}
            className={inputClasses}
          />
        </Field>
        <Field label="Cupo disponible">
          <input
            type="number"
            name="spotsLeft"
            min={0}
            required
            defaultValue={workshop?.spotsLeft}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Imagen de portada (ruta o URL)">
        <input
          name="coverImage"
          required
          defaultValue={workshop?.coverImage}
          placeholder="/images/workshops/.../portada.svg"
          className={inputClasses}
        />
      </Field>

      <Field label="Galería (una ruta/URL por línea, opcional)">
        <textarea
          name="gallery"
          defaultValue={workshop?.gallery.join("\n") ?? ""}
          rows={3}
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo de reserva">
          <select
            name="reservationType"
            defaultValue={workshop?.reservationType ?? "internal"}
            className={inputClasses}
          >
            <option value="internal">Interna (formulario propio)</option>
            <option value="external">Externa (solo WhatsApp)</option>
          </select>
        </Field>
        <Field label="Estado">
          <select
            name="status"
            defaultValue={workshop?.status ?? "proximo"}
            className={inputClasses}
          >
            <option value="proximo">Próximo</option>
            <option value="agotado">Agotado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </Field>
      </div>

      <Field label="Mensaje de WhatsApp (reserva externa, opcional)">
        <input
          name="whatsappMessage"
          defaultValue={workshop?.whatsappMessage ?? ""}
          className={inputClasses}
        />
      </Field>

      <Field label="Instagram handle (opcional)">
        <input
          name="instagramHandle"
          defaultValue={workshop?.instagramHandle ?? ""}
          className={inputClasses}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="featured" defaultChecked={workshop?.featured} />
        Destacado en el home
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
      >
        Guardar
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
