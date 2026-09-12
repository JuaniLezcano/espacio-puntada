import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-foreground/10 bg-background-alt">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-heading text-lg text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-primary">
            {siteConfig.categoryTagline}
          </p>
          <p className="mt-1 text-sm text-foreground-muted">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm text-foreground-muted">
            {siteConfig.address.street}, {siteConfig.address.city}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/clases" className="text-foreground-muted hover:text-foreground">
            Clases
          </Link>
          <Link href="/workshops" className="text-foreground-muted hover:text-foreground">
            Workshops
          </Link>
          <Link href="/alumnas" className="text-foreground-muted hover:text-foreground">
            Alumnas
          </Link>
          <Link href="/contacto" className="text-foreground-muted hover:text-foreground">
            Contacto
          </Link>
        </nav>

        <div className="flex gap-4 text-sm">
          {siteConfig.social.instagram && (
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground"
            >
              Instagram
            </a>
          )}
          {siteConfig.social.whatsapp && (
            <a
              href={`https://wa.me/${siteConfig.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground"
            >
              WhatsApp
            </a>
          )}
        </div>
      </Container>

      <p className="border-t border-foreground/10 py-4 text-center text-xs text-foreground-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
