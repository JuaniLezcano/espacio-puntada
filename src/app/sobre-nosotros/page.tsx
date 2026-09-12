import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre nosotros",
  description: `Conocé la historia y la filosofía de ${siteConfig.name}.`,
  path: "/sobre-nosotros",
});

export default function SobreNosotrosPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="Sobre nosotros"
            title={`La historia de ${siteConfig.name}`}
          />
          <div className="mt-6 space-y-4 text-foreground-muted">
            <p>
              {siteConfig.name} nació con la idea de crear un lugar cálido donde
              cualquier persona pueda animarse a coser, sin importar su punto de
              partida. Creemos que hacer nuestra propia ropa es una forma de
              conectar con lo que usamos todos los días.
            </p>
            <p>
              Hoy dictamos clases regulares y workshops puntuales en un espacio
              pensado para aprender de a poco, con acompañamiento cercano y grupos
              reducidos.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-background-alt p-10">
          <Image
            src="/images/brand/logo.png"
            alt={siteConfig.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </Container>
  );
}
