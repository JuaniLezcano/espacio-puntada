import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { StitchHeading } from "@/components/ui/StitchHeading";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background-alt">
      <Container className="grid gap-10 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {siteConfig.tagline}
          </p>
          <StitchHeading
            as="h1"
            text={siteConfig.name}
            className="mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl"
          />
          <p className="mt-4 max-w-md text-foreground-muted">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/clases">Ver clases</Button>
            <Button href="/workshops" variant="outline">
              Ver workshops
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/hero/hero-home.svg"
            alt={siteConfig.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
