import Link from "next/link";

const NAV_LINKS = [
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/workshops", label: "Workshops" },
  { href: "/admin/horarios", label: "Horarios" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <nav className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-4">
          <Link
            href="/admin"
            className="font-heading text-sm font-semibold text-foreground"
          >
            Admin
          </Link>
          <span className="h-4 w-px bg-foreground/10" aria-hidden="true" />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
