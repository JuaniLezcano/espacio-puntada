const TEETH = 28;

function buildZigzagPoints(): string {
  const step = 100 / TEETH;
  const points: string[] = [];
  for (let i = 0; i <= TEETH; i++) {
    const x = i * step;
    const y = i % 2 === 0 ? 0 : 10;
    points.push(`${x},${y}`);
  }
  points.push("100,10", "0,10");
  return points.join(" ");
}

const ZIGZAG_POINTS = buildZigzagPoints();

type SectionBg = "background" | "background-alt";

const BG_CLASS: Record<SectionBg, string> = {
  background: "bg-background",
  "background-alt": "bg-background-alt",
};

const FILL_CLASS: Record<SectionBg, string> = {
  background: "fill-background",
  "background-alt": "fill-background-alt",
};

interface PinkedDividerProps {
  from: SectionBg;
  to: SectionBg;
}

/**
 * Divisor entre secciones con forma de corte de tijera festón (pinking
 * shears), como el borde de una tela cortada para que no se deshilache.
 * El fondo del contenedor es el color de la sección de arriba; el zigzag
 * "corta" hacia el color de la sección de abajo.
 */
export function PinkedDivider({ from, to }: PinkedDividerProps) {
  return (
    <div aria-hidden="true" className={`relative h-4 w-full overflow-hidden sm:h-5 ${BG_CLASS[from]}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <polygon points={ZIGZAG_POINTS} className={FILL_CLASS[to]} />
      </svg>
    </div>
  );
}
