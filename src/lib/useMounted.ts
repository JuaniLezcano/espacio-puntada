import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/**
 * Mismatch intencional entre snapshot de servidor (false) y de cliente
 * (true): React re-renderiza una sola vez tras la hidratación, sin llamar
 * setState dentro de un efecto. Útil para gatear código que solo puede
 * correr en el cliente (ej. `document`/`window`) sin desincronizar SSR.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}
