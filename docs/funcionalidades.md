# Funcionalidades del sitio — Estudio Puntada

## Para qué sirve

Este sitio es la vidriera online de **Estudio Puntada** (nombre comercial mostrado en el sitio; el `package.json` conserva el nombre interno "espacio-puntada"), un espacio de costura físico en Buenos Aires. No es una tienda online; es un sitio de **presentación e información** con, desde la fase 1 del sistema de reservas (ver `docs/reservas.md`), un formulario propio para anotarse a un workshop con control de cupo en tiempo real. El pago y la confirmación final todavía se coordinan por WhatsApp — eso es la fase 2 pendiente (Mercado Pago).

En otras palabras: el sitio informa (qué se dicta, cuándo, a quién le fue bien), reserva el lugar en un workshop de forma directa, y deriva el resto de la conversión (clases regulares, pagos, consultas) a una conversación humana por WhatsApp/Instagram.

## A quién está dirigido

- Personas que quieren empezar a coser sin experiencia previa y buscan un lugar cercano, no una academia formal.
- Personas que ya cosen y buscan un workshop puntual para aprender una técnica específica o terminar un proyecto en una jornada.
- Alguien evaluando "¿este lugar es para mí?" — por eso la sección de alumnas (galería de proyectos reales) cumple un rol de prueba social.

## Estructura de páginas

| Ruta | Qué muestra | Objetivo |
|---|---|---|
| `/` | Hero + adelanto de clases regulares, workshops destacados y alumnas destacadas | Punto de entrada, resume todo el sitio y empuja a las secciones de detalle |
| `/clases` | Horario semanal interactivo, qué incluyen las clases, condiciones | Que la persona entienda el formato de clase regular y elija un horario |
| `/workshops` | Listado de workshops (ordenados por estado: próximos primero) | Descubrir encuentros puntuales con fecha, cupo y precio |
| `/workshops/[slug]` | Detalle de un workshop: descripción, fecha, duración, ubicación, cupos, galería, formulario de reserva | Reservar el lugar directamente (control de cupo en tiempo real) |
| `/alumnas` | Grilla de alumnas con su proyecto | Prueba social — mostrar resultados reales |
| `/alumnas/[slug]` | Detalle de una alumna: galería de fotos, descripción del proyecto, testimonio, a qué clase/workshop asistió | Profundizar la prueba social y linkear de vuelta a la oferta (clases o workshop puntual) |
| `/sobre-nosotros` | Historia y filosofía del espacio | Generar confianza / cercanía antes de contactar |
| `/contacto` | Dirección, mapa, WhatsApp e Instagram | Punto de conversión final |
| `/sitemap.xml`, `/robots.txt` | Generados dinámicamente a partir del contenido | SEO — se listan todas las rutas estáticas más cada workshop y alumna |

Además hay un botón flotante de WhatsApp (`WhatsAppFAB`) visible en todo el sitio, y un divisor visual festoneado (`PinkedDivider`, imitando una costura) entre secciones del home.

## Cómo funciona la conversión (el "para qué" del sitio)

1. La persona navega `/clases` o `/workshops/[slug]` para entender la oferta.
2. Para clases regulares y como canal general de consulta, cada punto de contacto (`WhatsAppCTA`, `InstagramCTA`, el FAB) arma un **link de WhatsApp pre-completado** (`wa.me/<número>?text=<mensaje>`) con un mensaje distinto según el contexto.
3. Para workshops, desde la fase 1 del sistema de reservas hay un formulario propio en `/workshops/[slug]` (nombre, teléfono, email opcional) que descuenta el cupo al instante — ver `docs/reservas.md` para el detalle técnico. El pago y la confirmación final todavía se coordinan por WhatsApp después de reservar.

## Contenido y cómo se administra

Mixto: **workshops** y **horario semanal de clases** viven en una base de datos Postgres (vía Prisma — ver `docs/reservas.md`) y se gestionan desde `/admin` (panel con autenticación básica); todo lo demás sigue siendo **código estático** editado a mano en `src/data/`:

- `site-config.ts` — nombre, tagline, dirección, WhatsApp e Instagram del negocio.
- `class-info.ts` — qué incluyen las clases y condiciones (textos de `/clases`).
- `students.ts` — cada alumna: fotos, proyecto, testimonio, y a qué clase o workshop está relacionada (para el link "Tomó: ...").

`workshops.ts` y `schedule.ts` ya no los lee la app — se mantienen solo como fuente de datos inicial para el seed de la base (`prisma/seed.ts`).

Sumar una alumna a la galería o cambiar los textos de `/clases` todavía implica editar código y volver a desplegar. Agregar/editar/borrar un workshop u horario, en cambio, se hace directo desde `/admin` (`/admin/workshops`, `/admin/horarios`), sin deploy.

### Imágenes

Las imágenes reales de alumnas y workshops todavía no existen: `public/images/` contiene placeholders SVG generados por `scripts/generate-placeholders.mjs` (rectángulos de color con el nombre del proyecto/alumna como texto). El branding (logo e ícono) sí es real (`public/images/brand/`). Antes de publicar el sitio en producción hace falta:

- Reemplazar los SVG placeholder por fotos reales (jpg/png/webp).
- Reemplazar `defaultOgImage` (usado como preview al compartir el link) por una imagen real de 1200x630 — varios clientes de mensajería no renderizan bien SVG como preview.
- Completar la dirección y el número de WhatsApp reales en `site-config.ts` (hoy son datos de ejemplo).

## Stack técnico (resumen funcional)

- **Next.js 16 (App Router)** — cada carpeta bajo `src/app` es una ruta; `generateStaticParams` pre-genera las páginas de detalle de cada workshop y alumna en build time.
- **Metadata dinámica** (`src/lib/metadata.ts`) — cada página arma su propio `<title>`, descripción e imagen de preview según el contenido (ej. el detalle de un workshop usa su propia portada como OG image).
- **Tailwind CSS v4** para estilos, con paleta cálida (`background`, `background-alt`, `primary`) pensada para transmitir cercanía/artesanía.
- **`motion`** para animaciones (reemplaza al viejo componente `Reveal` de scroll-reveal).
- **Postgres + Prisma** para el modelo de reservas (fase 1 — ver `docs/reservas.md`). Sin autenticación ni panel de administración todavía.
