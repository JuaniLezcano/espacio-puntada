import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/clases", label: "Clases" },
  { href: "/workshops", label: "Workshops" },
  { href: "/alumnas", label: "Alumnas" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-foreground/10 bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl text-foreground">
          <Image
            src="/images/brand/icon.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileMenu links={NAV_LINKS} />
      </Container>
    </header>
  );
}
