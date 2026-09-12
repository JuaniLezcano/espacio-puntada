"use client";

import { useEffect, useId, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useMounted } from "@/lib/useMounted";

interface StitchHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

const LETTER_DELAY = 0.028;
const SPRING = { type: "spring" as const, stiffness: 480, damping: 28, mass: 0.55 };

// Tiempo aproximado que tarda una letra en asentarse tras arrancar su
// spring (con los parámetros de SPRING de arriba). Motion no expone una
// duración exacta para un spring, así que este valor se ajusta a ojo en el
// navegador si SPRING cambia. A partir de acá, la duración del sweep se
// deriva de LETTER_DELAY y la cantidad real de letras — no de una fórmula
// aparte que pueda desincronizarse en silencio.
const SPRING_SETTLE_TIME = 0.35;
const SWEEP_START_DELAY = 0.12;
const MAX_SWEEP_DURATION = 2.4;

/**
 * Título que se "borda" letra por letra cuando entra en pantalla: cada letra
 * hace un spring-in con blur, y una línea de puntada se dibuja debajo en
 * sincro con una aguja que la recorre. Respeta prefers-reduced-motion
 * mostrando el texto completo sin animar.
 */
export function StitchHeading({ text, as = "h2", className }: StitchHeadingProps) {
  const Tag = as;
  // La línea de puntada + aguja es la pieza de mayor impacto: se reserva
  // para el h1 (una vez por página) para que siga siendo una sorpresa y no
  // se repita como "ruido de fondo" en cada título de sección.
  const showStitch = as === "h1";
  const clipId = useId();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  const progress = useMotionValue(0);
  const sweep = useTransform(progress, [0, 1], ["0%", "100%"]);
  const needleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);

  const words = text.split(" ");
  const totalLetters = text.replace(/\s/g, "").length;
  let letterIndex = 0;

  const sweepDuration = Math.min(
    Math.max(totalLetters - 1, 0) * LETTER_DELAY + SPRING_SETTLE_TIME,
    MAX_SWEEP_DURATION
  );

  useEffect(() => {
    if (!showStitch || !inView || !mounted || prefersReducedMotion) return;
    const controls = animate(progress, 1, {
      duration: sweepDuration,
      ease: [0.22, 1, 0.36, 1],
      delay: SWEEP_START_DELAY,
    });
    return () => controls.stop();
  }, [showStitch, inView, mounted, prefersReducedMotion, progress, sweepDuration]);

  // `useReducedMotion()` devuelve `null` hasta que Motion puede leer
  // `matchMedia` del lado del cliente. Tratamos "todavía no lo sabemos"
  // (SSR / primer render) igual que "preferí menos movimiento": así el
  // usuario con reduced-motion activado nunca ve la versión animada montar
  // y desmontar (el flash que causaba tratar `null` como `false`).
  if (!mounted || prefersReducedMotion) {
    // `ref` va acá también: `useInView` arma su IntersectionObserver en un
    // efecto que corre una sola vez y depende de que `ref.current` ya esté
    // seteado en ese momento. Si el ref solo se adjuntara en la rama animada
    // de abajo, para cuando `mounted` pasa a `true` el efecto de useInView
    // ya corrió con `ref.current` en null y nunca vuelve a intentarlo — las
    // letras quedarían en opacity:0 para siempre.
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    );
  }

  // Cada palabra queda en su propio inline-block (para no partirla en un
  // salto de línea a mitad de palabra); el espacio entre palabras se agrega
  // como hermano FUERA de ese inline-block, porque si quedara como último
  // hijo adentro, el navegador lo trata como espacio final de esa "línea"
  // aislada y lo colapsa, pegando las palabras entre sí.
  const wordNodes = words.flatMap((word, wordIndex) => {
    const wordSpan = (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char) => {
          const i = letterIndex++;
          return (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 12, rotate: -7, filter: "blur(3px)" }}
              animate={
                inView ? { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" } : undefined
              }
              transition={{ ...SPRING, delay: i * LETTER_DELAY }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    );

    if (wordIndex === words.length - 1) return [wordSpan];
    return [wordSpan, " "];
  });

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      <span
        aria-hidden="true"
        className={`relative inline-block ${showStitch ? "pb-2.5" : ""}`}
      >
        {wordNodes}

        {showStitch && (
          <>
            <svg
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2 w-full overflow-visible"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <clipPath id={clipId}>
                <motion.rect x="0" y="0" height="8" style={{ width: sweep }} />
              </clipPath>
              <line
                x1="0"
                y1="4"
                x2="100"
                y2="4"
                className="stroke-primary"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeDasharray="4 3.2"
                clipPath={`url(#${clipId})`}
              />
            </svg>

            <motion.span
              className="pointer-events-none absolute bottom-0 text-primary drop-shadow-sm"
              style={{
                left: sweep,
                opacity: needleOpacity,
                translateX: "-50%",
                translateY: "30%",
              }}
            >
              <NeedleGlyph />
            </motion.span>
          </>
        )}
      </span>
    </Tag>
  );
}

function NeedleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="rotate-45">
      <circle cx="4.5" cy="4.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line
        x1="4.5"
        y1="6.3"
        x2="14"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
