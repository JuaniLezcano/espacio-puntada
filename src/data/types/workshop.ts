/**
 * Hoy solo existe "external" (deriva a WhatsApp/Instagram). "internal" queda
 * reservado para un futuro sistema de reserva propio, sin romper este tipo.
 */
export type ReservationInfo =
  | {
      type: "external";
      whatsappMessage?: string;
      instagramHandle?: string;
    }
  | {
      type: "internal";
    };

export interface Workshop {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  dateLabel?: string;
  durationLabel: string;
  location: {
    name: string;
    address?: string;
  };
  capacity: number;
  spotsLeft?: number;
  coverImage: string;
  gallery?: string[];
  reservation: ReservationInfo;
  featured?: boolean;
  status: "proximo" | "agotado" | "finalizado";
}
