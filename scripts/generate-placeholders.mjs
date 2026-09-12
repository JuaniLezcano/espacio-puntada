import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = join(import.meta.dirname, "..", "public", "images");

// Deliberadamente distintos de --background (#e8e1d8) y --background-alt
// (#ded3c4): si un placeholder usa un tono muy cercano al fondo de su propia
// sección, la imagen queda "camuflada" e invisible aunque cargue bien.
const colors = ["#c1603f", "#a64f32", "#e8c4a0", "#8a7b5c", "#6b5f55"];

function svg(label, colorIndex) {
  const bg = colors[colorIndex % colors.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${bg}" />
  <text x="600" y="450" font-family="sans-serif" font-size="42" fill="#faf6f1" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>
`;
}

const files = [
  ["workshops/workshop-vestido-de-lino/portada.svg", "Workshop: vestido de lino"],
  ["workshops/workshop-vestido-de-lino/galeria-1.svg", "Vestido de lino - galería 1"],
  ["workshops/workshop-vestido-de-lino/galeria-2.svg", "Vestido de lino - galería 2"],
  ["workshops/workshop-tote-bag-reciclado/portada.svg", "Workshop: tote bag reciclado"],
  ["workshops/workshop-tote-bag-reciclado/galeria-1.svg", "Tote bag - galería 1"],

  ["alumnas/maria-lopez/portada.svg", "María López"],
  ["alumnas/maria-lopez/foto-1.svg", "María - foto 1"],
  ["alumnas/maria-lopez/foto-2.svg", "María - foto 2"],
  ["alumnas/carla-gimenez/portada.svg", "Carla Giménez"],
  ["alumnas/carla-gimenez/foto-1.svg", "Carla - foto 1"],
  ["alumnas/lucia-fernandez/portada.svg", "Lucía Fernández"],
  ["alumnas/lucia-fernandez/foto-1.svg", "Lucía - foto 1"],
  ["alumnas/lucia-fernandez/foto-2.svg", "Lucía - foto 2"],
  ["alumnas/sol-martinez/portada.svg", "Sol Martínez"],
  ["alumnas/sol-martinez/foto-1.svg", "Sol - foto 1"],

  ["hero/hero-home.svg", "Estudio Puntada"],
  ["og/default-og.svg", "Estudio Puntada"],
];

files.forEach(([relPath, label], i) => {
  const fullPath = join(root, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, svg(label, i));
});

console.log(`Generated ${files.length} placeholder images.`);
