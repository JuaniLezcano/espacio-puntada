import type { Metadata } from "next";
import { playfairDisplay, inter } from "@/fonts";
import { siteConfig } from "@/data/site-config";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
  }),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

// Header/Footer/WhatsAppFAB del sitio público viven en (site)/layout.tsx,
// no acá — así /admin no los hereda (es una herramienta interna, no una
// página más del sitio).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
