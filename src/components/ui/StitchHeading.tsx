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

interface StitchHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

const LETTER_DELAY = 0.035;
const SPRING = { type: "spring" as const, stiffness: 420, damping: 26, mass: 0.6 };

/**
 * Título que se "borda" letra por letra cuando entra en pantalla: cada letra
 * hace un spring-in con blur, y una línea de puntada se dibuja debajo en
 * sincro con una aguja que la recorre. Respeta prefers-reduced-motion
 * mostrando el texto completo sin animar.
 */
export function StitchHeading({ text, as = "h2", className }: StitchHeadingProps) {
  const Tag = as;
  const clipId = useId();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const sweep = useTransform(progress, [0, 1], ["0%", "100%"]);
  const needleOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);

  const words = text.split(" ");
  const totalLetters = text.replace(/\s/g, "").length;
  let letterIndex = 0;

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const duration = Math.min(0.5 + totalLetters * 0.045, 2.4);
    const controls = animate(progress, 1, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, progress, totalLetters]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
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
      <span aria-hidden="true" className="relative inline-block pb-2.5">
        {wordNodes}

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
