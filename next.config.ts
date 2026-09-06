import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los assets de contenido son locales, pero por ahora usamos SVG como
    // placeholder hasta tener fotos reales. Reemplazar por next/image estándar
    // (jpg/png/webp) cuando se suban las fotos definitivas.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
