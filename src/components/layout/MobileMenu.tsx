"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-foreground transition-transform ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-foreground transition-transform ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-40 flex flex-col bg-background px-6 pt-24 pb-10">
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <WhatsAppCTA
                phone={siteConfig.social.whatsapp ?? ""}
                message="Hola! Quiero consultar sobre las clases de Espacio Puntada."
                className="w-full"
              >
                Escribinos por WhatsApp
              </WhatsAppCTA>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
