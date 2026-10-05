import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'aseo-ropa',
    name: 'Aseo de Ropa',
    slug: 'aseo-ropa',
    description: 'Detergentes líquidos concentrados en bidón de 5L, suavizantes aromáticos, quitamanchas de oxígeno activo y blanqueadores seguros para toda tu ropa.',
    shortDescription: 'Detergentes 5L, suavizantes y quitamanchas de alto rendimiento.',
    icon: 'Shirt',
    image: '/images/categories/aseo-ropa.webp',
    itemCount: 6,
    popularSearch: 'Detergente líquido 5L'
  },
  {
    id: 'aseo-cocina',
    name: 'Aseo de Cocina',
    slug: 'aseo-cocina',
    description: 'Lavaloza concentrado quita grasa, desengrasantes industriales para campanas y hornos, cloro gel y desinfectantes para superficies de manipulación de alimentos.',
    shortDescription: 'Lavavajillas concentrados, desengrasantes potentes y limpiadores.',
    icon: 'UtensilsCrossed',
    image: '/images/categories/aseo-cocina.webp',
    itemCount: 6,
    popularSearch: 'Desengrasante industrial hornos'
  },
  {
    id: 'aseo-bano',
    name: 'Aseo de Baño',
    slug: 'aseo-bano',
    description: 'Limpiadores antisarro desincrustantes, cloro tradicional y aromatizado, pastillas desodorantes para estanque y limpiadores bactericidas para sanitarios.',
    shortDescription: 'Antisarro potente, cloro desinfectante y aromatizantes de baño.',
    icon: 'Sparkles',
    image: '/images/categories/aseo-bano.webp',
    itemCount: 5,
    popularSearch: 'Limpiador antisarro profesional'
  },
  {
    id: 'aseo-general',
    name: 'Aseo General',
    slug: 'aseo-general',
    description: 'Limpiapisos perfumados en bidones de 5L con fragancias duraderas (Lavanda, Manzana, Pino, Cherry), amonio cuaternario, bolsas de basura reforzadas y paños microfibra.',
    shortDescription: 'Limpiapisos perfumados 5L, bolsas resistentes y desinfectantes.',
    icon: 'Home',
    image: '/images/categories/aseo-general.webp',
    itemCount: 7,
    popularSearch: 'Limpiapisos lavanda 5L'
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}
