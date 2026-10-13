import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'aseo-ropa',
    name: 'Aseo de Ropa',
    slug: 'aseo-ropa',
    description: 'Detergentes líquidos concentrados en bidón de 5L, cápsulas Ariel Pods, detergentes Tide, suavizantes y quitamanchas de alto rendimiento.',
    shortDescription: 'Detergentes 5L, cápsulas Pods, Tide y suavizantes.',
    icon: 'Shirt',
    image: '/images/categories/aseo-ropa.webp',
    itemCount: 8,
    popularSearch: 'Detergente líquido 5L'
  },
  {
    id: 'aseo-cocina',
    name: 'Aseo de Cocina',
    slug: 'aseo-cocina',
    description: 'Lavalozas concentrados Dawn, Magistral, Aguacol en bidón 5L, desengrasantes potentes, esponjas Scrub Daddy y The Pink Stuff.',
    shortDescription: 'Lavalozas Dawn y Magistral, Scrub Daddy y desengrasantes.',
    icon: 'UtensilsCrossed',
    image: '/images/categories/aseo-cocina.webp',
    itemCount: 8,
    popularSearch: 'Lavalozas Dawn Blue'
  },
  {
    id: 'aseo-bano',
    name: 'Aseo de Baño',
    slug: 'aseo-bano',
    description: 'Cloros Clorinda, cloro gel aromático, desinfectantes Lysol, limpiadores antisarro, The Pink Stuff y pastillas sanitarias para inodoro.',
    shortDescription: 'Cloros, Lysol, The Pink Stuff inodoros y antisarro.',
    icon: 'Sparkles',
    image: '/images/categories/aseo-bano.webp',
    itemCount: 8,
    popularSearch: 'Cloro gel y Lysol'
  },
  {
    id: 'aseo-general',
    name: 'Aseo General y Papelería',
    slug: 'aseo-general',
    description: 'Bolsas de basura industriales, rollos de papel higiénico Swan y Ovella 48 rollos, toallas interfoliadas, ceras, amonios y paños Virutex.',
    shortDescription: 'Papel higiénico por bolsón, toallas, bolsas y mopas.',
    icon: 'Home',
    image: '/images/categories/aseo-general.webp',
    itemCount: 8,
    popularSearch: 'Bolsón papel higiénico'
  },
  {
    id: 'cuidado-personal',
    name: 'Cuidado y Aseo Personal',
    slug: 'cuidado-personal',
    description: 'Shampoo y acondicionador Pantene, Sedal, Head & Shoulders, cremas Colgate, Listerine 1L, desodorantes Rexona, Lady Speed Stick y Nivea.',
    shortDescription: 'Shampoo, cremas dentales Colgate, Listerine y desodorantes.',
    icon: 'UserCheck',
    image: '/images/categories/cuidado-personal.webp',
    itemCount: 10,
    popularSearch: 'Shampoo y Listerine 1L'
  },
  {
    id: 'perfumeria',
    name: 'Perfumería y Fragancias',
    slug: 'perfumeria',
    description: 'Perfumes originales de alta gama (Carolina Herrera, Paco Rabanne, Lattafa) y fragancias alternativas Dupes virales de alta fijación.',
    shortDescription: 'Perfumes originales, árabes Lattafa y Dupes alternativos.',
    icon: 'Heart',
    image: '/images/categories/perfumeria.webp',
    itemCount: 8,
    popularSearch: 'Perfumes Dupes y Lattafa'
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}
