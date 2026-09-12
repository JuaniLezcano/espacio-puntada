"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface SewingMachineAssemblyProps {
  className?: string;
}

const STROKE = 0.09;
const SPRING = { type: "spring" as const, stiffness: 170, damping: 16, mass: 0.9 };

// Puntos generados por proyección isométrica de 3 volúmenes (base, columna,
// brazo) — ver script de generación en el historial de la tarea. No son
// mágicos: son las 4 esquinas de cada cara visible (top/right/front) de un
// prisma rectangular, proyectadas con x'=(x-y)*cos30, y'=(x+y)*sin30-z.
const BASE = {
  top: "0,-1 5.196,2 2.598,3.5 -2.598,0.5",
  right: "5.196,3 2.598,4.5 2.598,3.5 5.196,2",
  front: "-2.598,1.5 2.598,4.5 2.598,3.5 -2.598,0.5",
};
const PILLAR = {
  top: "0.433,-3.75 1.732,-3 -0.866,-1.5 -2.165,-2.25",
  right: "1.732,0 -0.866,1.5 -0.866,-1.5 1.732,-3",
  front: "-2.165,0.75 -0.866,1.5 -0.866,-1.5 -2.165,-2.25",
};
const ARM = {
  top: "-0.217,-4.375 3.681,-2.125 2.382,-1.375 -1.516,-3.625",
  right: "3.681,-1.125 2.382,-0.375 2.382,-1.375 3.681,-2.125",
  front: "-1.516,-2.625 2.382,-0.375 2.382,-1.375 -1.516,-3.625",
};
// Aguja: fija en x=3.031; "y1" es el punto donde cuelga del brazo,
// "y2" es la punta, que sube y baja entre 0.25 (retraída) y 2.25 (clavada).
const NEEDLE_X = 3.031;
const NEEDLE_HOUSING_Y = -0.75;
const NEEDLE_UP_Y = 0.25;
const NEEDLE_DOWN_Y = 2.25;

function IsoBox({
  faces,
  opacityScale = 1,
}: {
  faces: { top: string; right: string; front: string };
  opacityScale?: number;
}) {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round">
      <polygon points={faces.front} fill="currentColor" fillOpacity={0.22 * opacityScale} />
      <polygon points={faces.right} fill="currentColor" fillOpacity={0.14 * opacityScale} />
      <polygon points={faces.top} fill="currentColor" fillOpacity={0.06 * opacityScale} />
    </g>
  );
}

function ScrewHole({ cx, cy }: { cx: number; cy: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={0.34}
      ry={0.19}
      transform={`rotate(-30 ${cx} ${cy})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE * 0.8}
    />
  );
}

export function SewingMachineAssembly({ className }: SewingMachineAssemblyProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [assembled, setAssembled] = useState(false);

  // `null` (SSR / todavía no se pudo leer matchMedia) se trata igual que
  // `true`: sin evidencia de que el usuario acepta movimiento, no animamos.
  const reduceMotion = prefersReducedMotion !== false;

  const settle = reduceMotion ? { duration: 0 } : undefined;
  const show = reduceMotion || inView;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="-3.4 -5.4 9.2 10.4"
      className={className}
      style={{ color: "var(--color-foreground)" }}
    >
      {/* Base */}
      <motion.g
        initial={{ opacity: 0, y: 1.5 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={settle ?? { ...SPRING, delay: 0 }}
      >
        <IsoBox faces={BASE} />
        <ScrewHole cx={0} cy={0} />
        <ScrewHole cx={2.598} cy={2.5} />
      </motion.g>

      {/* Columna */}
      <motion.g
        initial={{ opacity: 0, y: -2.5 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={settle ?? { ...SPRING, delay: 0.25 }}
      >
        <IsoBox faces={PILLAR} opacityScale={1.1} />
      </motion.g>

      {/* Brazo — al terminar de asentarse, arranca el loop de la aguja */}
      <motion.g
        initial={{ opacity: 0, x: -1.8, y: -1.2 }}
        animate={show ? { opacity: 1, x: 0, y: 0 } : undefined}
        transition={settle ?? { ...SPRING, delay: 0.55 }}
        onAnimationComplete={() => setAssembled(true)}
      >
        <IsoBox faces={ARM} opacityScale={1.15} />
        <ScrewHole cx={0.866} cy={-3} />
      </motion.g>

      {/* Aguja */}
      <motion.line
        x1={NEEDLE_X}
        x2={NEEDLE_X}
        y1={NEEDLE_HOUSING_Y}
        stroke="currentColor"
        strokeWidth={STROKE * 1.3}
        strokeLinecap="round"
        initial={{ y2: NEEDLE_HOUSING_Y, opacity: 0 }}
        animate={
          reduceMotion
            ? { y2: NEEDLE_UP_Y, opacity: show ? 1 : 0 }
            : assembled
              ? {
                  y2: [NEEDLE_UP_Y, NEEDLE_DOWN_Y, NEEDLE_UP_Y],
                  opacity: 1,
                }
              : { y2: NEEDLE_HOUSING_Y, opacity: 0 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : assembled
              ? {
                  // Transición por propiedad: si `opacity` comparte la
                  // transición de `y2`, hereda su `repeat: Infinity` y
                  // termina parpadeando en loop en vez de quedar fija en 1.
                  y2: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                }
              : { duration: 0.2 }
        }
      />
    </svg>
  );
}
