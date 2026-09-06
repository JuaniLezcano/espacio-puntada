import type { Metadata } from "next";
import { playfairDisplay, inter } from "@/fonts";
import { siteConfig } from "@/data/site-config";
import { buildMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
