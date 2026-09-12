# Sistema de reservas propio — Fase 1

## Qué resuelve

Antes de esto, el cupo de cada workshop (`spotsLeft`) era un número editado a mano en `src/data/workshops.ts`, y la reserva en sí pasaba 100% por WhatsApp (sin registro, sin control real de sobreventa). Esta fase reemplaza eso por:

- Los workshops viven en una base de datos Postgres, no en código.
- Un formulario de reserva propio en `/workshops/[slug]` que descuenta el cupo en el momento, con una operación atómica que evita que dos personas reserven el mismo último lugar (condición de carrera).
- El estado del workshop pasa a `agotado` automáticamente cuando el cupo llega a 0 — ya no hay que actualizarlo a mano.

**Fuera de alcance de esta fase (a propósito):** pagos, señas, holds temporales de cupo, notificaciones por mail. El contacto post-reserva sigue siendo manual por WhatsApp ("te vamos a contactar para coordinar el pago"). Eso es la fase 2 (Mercado Pago, ver más abajo).

## Stack

- **Postgres** como base de datos.
- **Prisma 7** como ORM — usa el nuevo generador `prisma-client` (ESM) y requiere un **driver adapter** explícito (`@prisma/adapter-pg` + `pg`), a diferencia de versiones anteriores de Prisma que traían el motor de conexión embebido.
- El cliente generado vive en `src/generated/prisma/` (gitignored, se regenera con `prisma generate`, que corre automático en `postinstall`).

> Nota sobre versiones: al instalar, el tag `latest` de npm apuntaba a `8.0.0-rc.13` (release candidate). Se pinneó todo a `7.10.0` (`prisma`, `@prisma/client`) por estabilidad — no usar `npm install prisma@latest` a ciegas en este proyecto hasta que Prisma 8 salga estable.

## Modelo de datos (`prisma/schema.prisma`)

- **`Workshop`** — el mismo contenido que antes vivía en `workshops.ts` (título, fechas, ubicación, galería, etc.) más `capacity` y `spotsLeft` como columnas reales. Se agregó `reservationType` (`internal` | `external`) para no perder la distinción que ya existía en el código: hoy todos los workshops usan `internal` (este flujo nuevo), pero queda la puerta abierta a un workshop puntual que se maneje solo por WhatsApp sin pasar por el formulario.
- **`Booking`** — una fila por reserva: `name`, `phone` (obligatorios — todo el negocio se maneja por WhatsApp), `email` (opcional), `status` (`confirmed` | `cancelled`), y la relación al `Workshop`.

`src/data/workshops.ts` y su tipo (`src/data/types/workshop.ts`) ya no los lee la app — se dejaron solo como fuente de datos inicial para el seed (`prisma/seed.ts`).

## Cómo funciona el control de cupo (la parte importante)

`src/lib/actions/booking.ts` — `createBooking()` es un Server Action que corre, dentro de una transacción:

1. Un `UPDATE` condicional: `UPDATE "Workshop" SET "spotsLeft" = "spotsLeft" - 1 WHERE id = ? AND "spotsLeft" > 0`. Postgres solo va a afectar una fila si todavía queda cupo — si dos reservas llegan al mismo tiempo por el último lugar, la base de datos serializa las dos operaciones y solo una gana la resta; la otra ve `spotsLeft` ya en 0 y el `UPDATE` no afecta ninguna fila.
2. Si el `UPDATE` no afectó filas (cupo agotado), se aborta la transacción y se devuelve un error.
3. Si afectó una fila, se crea el `Booking` y, si `spotsLeft` llegó a 0, el `status` del workshop pasa a `agotado` — todo en la misma transacción.

Esto se probó en este entorno de desarrollo simulando dos reservas simultáneas contra el mismo cupo de 1 lugar: una se confirmó, la otra fue rechazada con el mensaje de "se agotaron los lugares", y `spotsLeft` nunca quedó en negativo.

La revalidación (`revalidatePath`) invalida el cache de `/workshops` y `/workshops/[slug]` apenas se confirma una reserva, así que el cupo se ve actualizado sin esperar ningún rebuild ni tiempo de expiración.

## Correr esto en desarrollo local

```bash
docker compose up -d          # levanta Postgres en localhost:5432
npm install                   # incluye `postinstall: prisma generate`
npm run db:migrate            # aplica las migraciones (crea las tablas)
npm run db:seed               # carga los 2 workshops de ejemplo
npm run dev
```

Variables de entorno: copiar `.env.example` a `.env` (ya apunta al Postgres de `docker-compose.yml`). `.env` está gitignoreado — no se commitea.

Scripts nuevos en `package.json`:

| Script | Qué hace |
|---|---|
| `npm run db:migrate` | Corre `prisma migrate dev` — crea/aplica migraciones en desarrollo |
| `npm run db:deploy` | Corre `prisma migrate deploy` — aplica migraciones ya creadas, sin generar nuevas (esto es lo que corre en producción/Railway) |
| `npm run db:seed` | Carga los workshops de `data/workshops.ts` a la base (usa `upsert`, no duplica si ya existen) |
| `npm run db:studio` | Abre Prisma Studio, una UI simple para ver/editar filas a mano |

## Deploy en Railway

1. Crear el servicio Postgres desde el marketplace de Railway (plan de $5 alcanza — SQLite no aplica acá, es Postgres gestionado).
2. Railway expone la connection string como variable de entorno del addon (típicamente `DATABASE_URL` si se referencia directo, o hay que mapearla). Configurar `DATABASE_URL` en el servicio de la app apuntando a esa variable — no hardcodear la connection string.
3. Build command: el `postinstall` ya corre `prisma generate` automáticamente durante `npm install`.
4. Antes de que la app arranque (o como parte del deploy), correr `npm run db:deploy` para aplicar las migraciones contra la base de Railway. **No usar `db:migrate` en producción** — ese comando puede pedir confirmación interactiva y está pensado solo para desarrollo.
5. Una vez con la base migrada, correr el seed manualmente una sola vez (`npm run db:seed`) para cargar los workshops reales — reemplazando antes el contenido de ejemplo en `data/workshops.ts` por los datos reales, o cargándolos directo con Prisma Studio.

## Roadmap — Fase 2: Mercado Pago

No implementado todavía. Cuando se aborde:

- El campo `Booking.status` ya tiene lugar para crecer a un estado `pending` (reserva creada, esperando pago) antes de `confirmed` — hoy se salta directo a `confirmed` porque no hay pago de por medio.
- Flujo esperado: crear el `Booking` en `pending` (reteniendo el cupo) → crear una **preference** de Mercado Pago (Checkout Pro) del lado del servidor → redirigir a la persona a pagar → un **webhook** propio confirma el pago y recién ahí el `Booking` pasa a `confirmed`.
- Los `pending` sin pago confirmado necesitan expirar y liberar el cupo (para que alguien que abandona el pago no bloquee el lugar para siempre).
- El webhook es la única fuente de verdad del pago — nunca confiar en la redirección de "éxito" del navegador.
