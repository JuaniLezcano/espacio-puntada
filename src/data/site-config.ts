import type { SocialLinks, Address } from "./types/common";

export const siteConfig = {
  name: "Espacio Puntada",
  tagline: "Un lugar para aprender a coser, a tu ritmo",
  description:
    "Espacio de costura con clases regulares y workshops. Sumate a aprender a coser en un ambiente cálido y cercano.",
  url: "https://espaciopuntada.vercel.app",
  social: {
    instagram: "https://instagram.com/espaciopuntada",
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
