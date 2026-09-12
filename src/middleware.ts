import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;

  // Sin la variable configurada, no exponemos el panel en absoluto en vez de
  // dejarlo abierto por defecto.
  if (!password) {
    return new NextResponse("Admin no configurado", { status: 503 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice("Basic ".length));
    const suppliedPassword = decoded.split(":")[1];
    if (suppliedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Estudio Puntada Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
