"use client";

import { useActionState } from "react";
import { createBooking, type CreateBookingResult } from "@/lib/actions/booking";

const inputClasses =
  "w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/70 focus:border-primary focus:outline-none";

export function BookingForm({ workshopSlug }: { workshopSlug: string }) {
  const [state, formAction, isPending] = useActionState<
    CreateBookingResult | null,
    FormData
  >(async (_prevState, formData) => createBooking(workshopSlug, formData), null);

  if (state?.ok) {
    return (
      <div className="mt-6 rounded-xl bg-primary/10 p-4 text-sm text-foreground">
        ¡Listo! Reservamos tu lugar. Te vamos a contactar por WhatsApp para
        coordinar el pago y los detalles.
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <input
        name="name"
        required
        placeholder="Nombre y apellido"
        className={inputClasses}
      />
      <input
        name="phone"
        required
        type="tel"
        placeholder="Teléfono (WhatsApp)"
        className={inputClasses}
      />
      <input
        name="email"
        type="email"
        placeholder="Email (opcional)"
        className={inputClasses}
      />

      {state && !state.ok && (
        <p className="text-sm text-[#B5453A]">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {isPending ? "Reservando..." : "Reservar mi lugar"}
      </button>
    </form>
  );
}
