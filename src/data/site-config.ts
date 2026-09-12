import type { SocialLinks, Address } from "./types/common";

export const siteConfig = {
  name: "Estudio Puntada",
  tagline: "Un lugar para aprender a coser, a tu ritmo",
  categoryTagline: "Clases de costura y moldería",
  description:
    "Clases de costura y moldería con encuentros regulares y workshops. Sumate a aprender a coser en un ambiente cálido y cercano.",
  url: "https://estudiopuntada.vercel.app",
  social: {
    instagram: "https://instagram.com/estudiopuntada",
    whatsapp: "5491122334455",
  } satisfies SocialLinks,
  address: {
    street: "Ejemplo 1234",
    city: "Buenos Aires, Argentina",
    mapsUrl: "https://maps.google.com/?q=Ejemplo+1234+Buenos+Aires",
  } satisfies Address,
  // Placeholder — reemplazar por una imagen real (1200x630, jpg/png) antes de publicar,
  // ya que algunos clientes de mensajería no renderizan bien SVG como preview.
  defaultOgImage: "/images/og/default-og.svg",
};
