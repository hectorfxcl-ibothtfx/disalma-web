import fs from 'fs';
import path from 'path';

const outDirProducts = path.resolve('public/images/products');
const outDirCategories = path.resolve('public/images/categories');

fs.mkdirSync(outDirProducts, { recursive: true });
fs.mkdirSync(outDirCategories, { recursive: true });

function createBottleSvg(title, color1, color2, format, iconType = 'detergent') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="50%" stop-color="${color2}"/>
      <stop offset="100%" stop-color="${color1}"/>
    </linearGradient>
    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background base -->
  <rect width="400" height="400" rx="24" fill="url(#bg)"/>

  <!-- Bottle Container -->
  <g filter="url(#shadow)">
    <!-- Cap -->
    <rect x="175" y="45" width="50" height="24" rx="4" fill="url(#capGrad)"/>
    <rect x="180" y="69" width="40" height="15" rx="2" fill="#E2E8F0"/>

    <!-- Handle -->
    <path d="M140 100 C110 100 100 130 100 160 C100 190 115 210 135 215" fill="none" stroke="${color1}" stroke-width="22" stroke-linecap="round"/>

    <!-- Jug Body -->
    <path d="M145 84 L255 84 C275 84 290 100 290 120 L290 310 C290 330 275 345 255 345 L145 345 C125 345 110 330 110 310 L110 120 C110 100 125 84 145 84 Z" fill="url(#bottleGrad)"/>

    <!-- Handle Hole -->
    <rect x="135" y="125" width="22" height="70" rx="11" fill="url(#bg)"/>

    <!-- Label -->
    <rect x="135" y="150" width="135" height="145" rx="10" fill="#FFFFFF"/>
    <rect x="142" y="156" width="121" height="6" rx="3" fill="#F59E0B"/>
    
    <!-- Label Brand -->
    <text x="202" y="178" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" fill="#0F172A" text-anchor="middle" letter-spacing="1">DISALMA</text>
    <text x="202" y="190" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="7" font-weight="700" fill="#DC2626" text-anchor="middle">LIQUIDADORA</text>
    <line x1="150" y1="196" x2="255" y2="196" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Product name on label -->
    <foreignObject x="142" y="202" width="121" height="60">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif; font-size: 10px; font-weight: 800; color: #1E293B; text-align: center; line-height: 1.2;">
        ${title}
      </div>
    </foreignObject>

    <!-- Format Badge -->
    <rect x="160" y="266" width="85" height="18" rx="9" fill="#0F172A"/>
    <text x="202" y="278" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" font-weight="800" fill="#FBBF24" text-anchor="middle">${format}</text>
  </g>

  <!-- Sparkle -->
  <path d="M310 90 L314 100 L324 104 L314 108 L310 118 L306 108 L296 104 L306 100 Z" fill="#F59E0B"/>
  <path d="M90 280 L92 286 L98 288 L92 290 L90 296 L88 290 L82 288 L88 286 Z" fill="#DC2626"/>
</svg>`;
}

const productsToGenerate = [
  { name: 'detergente-hipoalergenico-5l', title: 'Hipoalergénico', c1: '#38BDF8', c2: '#0284C7', format: '5 LITROS' },
  { name: 'detergente-azul-matic-5l', title: 'Azul Matic Enzimático', c1: '#2563EB', c2: '#1D4ED8', format: '5 LITROS' },
  { name: 'suavizante-lavanda-5l', title: 'Suavizante Lavanda', c1: '#C084FC', c2: '#9333EA', format: '5 LITROS' },
  { name: 'quitamanchas-oxi-1l', title: 'Oxi-Power Quitamanchas', c1: '#F43F5E', c2: '#E11D48', format: '1 LITRO' },
  { name: 'lavaloza-limon-5l', title: 'Lavavajillas Limón', c1: '#84CC16', c2: '#65A30D', format: '5 LITROS' },
  { name: 'desengrasante-industrial-5l', title: 'Desengrasante Industrial', c1: '#EA580C', c2: '#C2410C', format: '5 LITROS' },
  { name: 'cloro-gel-5l', title: 'Cloro Gel Adherente', c1: '#14B8A6', c2: '#0D9488', format: '5 LITROS' },
  { name: 'atomizador-cocina-750ml', title: 'Desengrasante Express', c1: '#F97316', c2: '#EA580C', format: '750 ML' },
  { name: 'antisarro-profesional-5l', title: 'Antisarro Desincrustante', c1: '#06B6D4', c2: '#0891B2', format: '5 LITROS' },
  { name: 'cloro-tradicional-5l', title: 'Cloro 5% Concentrado', c1: '#E2E8F0', c2: '#94A3B8', format: '5 LITROS' },
  { name: 'pastillas-estanque-pack4', title: 'Pastillas Estanque WC', c1: '#3B82F6', c2: '#1D4ED8', format: 'PACK 4 UN' },
  { name: 'limpiapisos-lavanda-5l', title: 'Limpiapisos Lavanda', c1: '#A855F7', c2: '#7E22CE', format: '5 LITROS' },
  { name: 'limpiapisos-cherry-5l', title: 'Limpiapisos Cherry', c1: '#F43F5E', c2: '#BE123C', format: '5 LITROS' },
  { name: 'amonio-cuaternario-5l', title: 'Amonio Cuaternario 5G', c1: '#10B981', c2: '#047857', format: '5 LITROS' },
  { name: 'bolsas-basura-80x110', title: 'Bolsas Basura 80x110', c1: '#334155', c2: '#0F172A', format: '10 UNIDADES' },
  { name: 'panos-microfibra-pack5', title: 'Paños Microfibra 40x40', c1: '#F59E0B', c2: '#D97706', format: 'PACK 5 UN' },
  { name: 'detergente-detail-1', title: 'Fórmula Concentrada', c1: '#38BDF8', c2: '#0284C7', format: '5 LITROS' }
];

for (const p of productsToGenerate) {
  const svg = createBottleSvg(p.title, p.c1, p.c2, p.format);
  fs.writeFileSync(path.join(outDirProducts, `${p.name}.svg`), svg);
  // Also create a webp named file with the SVG content so both extensions resolve cleanly in all browsers!
  fs.writeFileSync(path.join(outDirProducts, `${p.name}.webp`), svg);
}

// Categories
const categoriesToGenerate = [
  { name: 'aseo-ropa', title: 'Aseo de Ropa', color: '#0284C7' },
  { name: 'aseo-cocina', title: 'Aseo de Cocina', color: '#EA580C' },
  { name: 'aseo-bano', title: 'Aseo de Baño', color: '#0891B2' },
  { name: 'aseo-general', title: 'Aseo General', color: '#7E22CE' }
];

for (const c of categoriesToGenerate) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <rect width="600" height="400" fill="${c.color}"/>
    <circle cx="300" cy="200" r="140" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="300" y="210" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" text-anchor="middle">${c.title}</text>
    <text x="300" y="245" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="700" fill="#FDE68A" text-anchor="middle">Precios de Liquidadora Disalma</text>
  </svg>`;
  fs.writeFileSync(path.join(outDirCategories, `${c.name}.svg`), svg);
  fs.writeFileSync(path.join(outDirCategories, `${c.name}.webp`), svg);
}

console.log('Product and category vector visuals created successfully!');
