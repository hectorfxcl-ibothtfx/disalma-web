import fs from 'fs';
import path from 'path';
import { products } from '../src/data/products.ts';
import { createModernProductSvg } from './productSvgBuilder.mjs';

const outDir = path.resolve('public/images/products');

const categoryStyles = {
  'aseo-ropa': { color1: '#2563EB', color2: '#1D4ED8', symbol: '👕', tag: 'ROPA & LAVADO' },
  'aseo-cocina': { color1: '#059669', color2: '#047857', symbol: '🍽️', tag: 'COCINA & VAJILLA' },
  'aseo-bano': { color1: '#7C3AED', color2: '#6D28D9', symbol: '✨', tag: 'BAÑO & DESINFECCIÓN' },
  'aseo-general': { color1: '#D97706', color2: '#B45309', symbol: '🧻', tag: 'PAPELERÍA & ASEO' },
  'cuidado-personal': { color1: '#DB2777', color2: '#BE185D', symbol: '🧴', tag: 'CUIDADO PERSONAL' },
  'perfumeria': { color1: '#4F46E5', color2: '#3730A3', symbol: '💐', tag: 'PERFUMERÍA' }
};

for (const p of products) {
  const baseName = path.basename(p.image, path.extname(p.image));
  const style = categoryStyles[p.categoryId] || { color1: '#2563EB', color2: '#1D4ED8', symbol: '🧺', tag: 'LIQUIDADORA' };

  const svgContent = createModernProductSvg({
    title: p.title,
    brand: 'LIQUIALMA',
    badge: 'LIQUIDADORA',
    format: p.format,
    color1: style.color1,
    color2: style.color2,
    iconSymbol: style.symbol,
    categoryTag: style.tag
  });

  const svgPath = path.join(outDir, `${baseName}.svg`);
  const webpPath = path.join(outDir, `${baseName}.webp`);

  fs.writeFileSync(svgPath, svgContent);
  fs.writeFileSync(webpPath, svgContent);
}

console.log(`¡Generadas ${products.length} imágenes SVG/WebP de productos con éxito!`);
