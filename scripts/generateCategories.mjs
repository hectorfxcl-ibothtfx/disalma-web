import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/categories');

function createCategorySvg(title, color, subtitle = 'Precios de Liquidadora LiquiAlma') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <rect width="600" height="400" fill="${color}"/>
    <circle cx="300" cy="200" r="140" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="300" y="210" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="30" font-weight="900" fill="#FFFFFF" text-anchor="middle">${title}</text>
    <text x="300" y="245" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="700" fill="#FDE68A" text-anchor="middle">${subtitle}</text>
  </svg>`;
}

const cats = [
  { name: 'aseo-ropa', title: 'Aseo de Ropa', color: '#0284C7' },
  { name: 'aseo-cocina', title: 'Aseo de Cocina', color: '#059669' },
  { name: 'aseo-bano', title: 'Aseo de Baño', color: '#7C3AED' },
  { name: 'aseo-general', title: 'Aseo General y Papelería', color: '#D97706' },
  { name: 'cuidado-personal', title: 'Cuidado y Aseo Personal', color: '#DB2777' },
  { name: 'perfumeria', title: 'Perfumería y Fragancias', color: '#4F46E5' },
];

for (const c of cats) {
  const svg = createCategorySvg(c.title, c.color);
  fs.writeFileSync(path.join(outDir, `${c.name}.svg`), svg);
  fs.writeFileSync(path.join(outDir, `${c.name}.webp`), svg);
}

console.log('Categorias generadas con exito!');
