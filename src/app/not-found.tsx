import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-primary">
        Error 404
      </p>
      <h1 className="font-heading text-3xl text-foreground">
        No encontramos esta página
      </h1>
      <p className="max-w-md text-foreground-muted">
        Puede que el enlace esté roto o que la página ya no exista. Volvé al
        inicio para seguir explorando.
      </p>
      <Button href="/" className="mt-4">
        Volver al inicio
      </Button>
    </Container>
  );
}
