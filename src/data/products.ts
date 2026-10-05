import type { Product } from '../types';

export const products: Product[] = [
  // --- ASEO DE ROPA ---
  {
    id: 'prod-001',
    title: 'Detergente Líquido Hipoalergénico 5L',
    slug: 'detergente-liquido-hipoalergenico-5l',
    shortDescription: 'Fórmula suave con la piel y potente contra las manchas difíciles. Rinde hasta 100 lavados.',
    description: 'Detergente líquido concentrado hipoalergénico especialmente formulado para ropa de personas con piel sensible, bebés y toda la familia. Protege las fibras textiles y los colores, dejando un suave aroma a limpieza duradero. Biodegradable y apto para lavadoras automáticas y carga superior.',
    categoryId: 'aseo-ropa',
    categoryName: 'Aseo de Ropa',
    format: 'Bidón 5 Litros',
    price: 6990,
    regularPrice: 11490,
    featured: true,
    inStock: true,
    image: '/images/products/detergente-hipoalergenico-5l.webp',
    gallery: [
      '/images/products/detergente-hipoalergenico-5l.webp',
      '/images/products/detergente-detail-1.webp'
    ],
    sku: 'DIS-ROP-001',
    rating: 4.9,
    reviewsCount: 38,
    benefits: [
      'Rinde más de 100 lavados en máquina automática',
      'Certificación hipoalergénica sin químicos agresivos',
      'Protege los colores y la textura de tus prendas',
      'Fórmula con baja espuma para ahorro de agua'
    ],
    usageInstructions: 'Dosificar 50ml para carga normal (6 a 8 kg) y 80ml para cargas muy sucias.',
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-002',
    title: 'Detergente Líquido Azul Concentrado Tipo Matic 5L',
    slug: 'detergente-liquido-azul-matic-5l',
    shortDescription: 'Máximo poder desmanchador activo con enzimas de alto rendimiento para ropa blanca y color.',
    description: 'El clásico detergente de alta concentración preferido por lavanderías y hogares exigentes. Su fórmula enzimática penetra las capas de suciedad eliminando grasa, barro, sudor y salsas sin desgastar los tejidos. Diseñado con agentes abrillantadores ópticos que renuevan el brillo de tus prendas.',
    categoryId: 'aseo-ropa',
    categoryName: 'Aseo de Ropa',
    format: 'Bidón 5 Litros',
    price: 6490,
    regularPrice: 10990,
    featured: true,
    inStock: true,
    image: '/images/products/detergente-azul-matic-5l.webp',
    gallery: [
      '/images/products/detergente-azul-matic-5l.webp'
    ],
    sku: 'DIS-ROP-002',
    rating: 4.8,
    reviewsCount: 52,
    benefits: [
      'Acción enzimática activa que remueve suciedad profunda',
      'Para ropa blanca radiante y colores vivos',
      'Aroma fresco a brisa marina de larga duración',
      'Excelente solubilidad en agua fría'
    ],
    usageInstructions: 'Usar 60ml para carga completa de 8kg.',
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-003',
    title: 'Suavizante Textil Aroma Lavanda Francesa 5L',
    slug: 'suavizante-textil-lavanda-5l',
    shortDescription: 'Microcápsulas de perfume y suavidad aterciopelada que facilitan el planchado de tu ropa.',
    description: 'Suavizante concentrado de calidad industrial para ropa de cama, toallas y vestimenta diaria. Formulado con siliconas acondicionadoras que reducen la estática y arrugas, aportando esponjosidad y un perfume a campos de lavanda que dura semanas guardado en el closet.',
    categoryId: 'aseo-ropa',
    categoryName: 'Aseo de Ropa',
    format: 'Bidón 5 Litros',
    price: 5490,
    regularPrice: 8990,
    featured: false,
    inStock: true,
    image: '/images/products/suavizante-lavanda-5l.webp',
    gallery: [
      '/images/products/suavizante-lavanda-5l.webp'
    ],
    sku: 'DIS-ROP-003',
    rating: 4.7,
    reviewsCount: 29,
    benefits: [
      'Facilita el planchado reduciendo arrugas',
      'Aroma encapsulado que se activa con el movimiento',
      'Toallas esponjosas con máxima absorción',
      'Rendimiento para más de 90 cargas'
    ],
    usageInstructions: 'Añadir 50ml al compartimiento de suavizante del último enjuague.',
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-004',
    title: 'Quitamanchas Oxi-Power Ropa Blanca y Color 1L',
    slug: 'quitamanchas-oxi-power-1l',
    shortDescription: 'Potenciador de lavado a base de oxígeno activo sin cloro. Seguro para prendas de color.',
    description: 'Quitamanchas líquido concentrado con tecnología de microburbujas de oxígeno activo. Disuelve manchas orgánicas, sangre, vino tinto, café y grasa sin debilitar las costuras ni decolorar. Ideal como pre-tratamiento directo o como aditivo al ciclo de lavado.',
    categoryId: 'aseo-ropa',
    categoryName: 'Aseo de Ropa',
    format: 'Botella 1 Litro con dispensador',
    price: 3290,
    regularPrice: 5490,
    featured: false,
    inStock: true,
    image: '/images/products/quitamanchas-oxi-1l.webp',
    gallery: [
      '/images/products/quitamanchas-oxi-1l.webp'
    ],
    sku: 'DIS-ROP-004',
    rating: 4.8,
    reviewsCount: 19,
    benefits: [
      'Sin cloro: 100% seguro para telas delicadas',
      'Efectivo incluso en cuellos y puños percudidos',
      'Elimina olores persistentes de transpiración',
      'Fórmula de acción rápida en 5 minutos'
    ],
    usageInstructions: 'Aplicar directamente sobre la mancha, reposar 5 minutos y luego lavar normalmente.',
    createdAt: '2026-02-10'
  },

  // --- ASEO DE COCINA ---
  {
    id: 'prod-005',
    title: 'Lavavajillas Líquido Concentrado Aroma Limón 5L',
    slug: 'lavavajillas-concentrado-limon-5l',
    shortDescription: 'Arranca la grasa más pegada al instante y cuida tus manos con glicerina vegetal.',
    description: 'Lavaloza líquido de alta viscosidad y ultra espuma diseñado para restaurantes, casinos y hogares que buscan máxima economía. Corta la grasa pesada en ollas, sartenes y platos con apenas unas gotas, enjuagándose sin dejar residuos de olor en tu vajilla.',
    categoryId: 'aseo-cocina',
    categoryName: 'Aseo de Cocina',
    format: 'Bidón 5 Litros',
    price: 5290,
    regularPrice: 8990,
    featured: true,
    inStock: true,
    image: '/images/products/lavaloza-limon-5l.webp',
    gallery: [
      '/images/products/lavaloza-limon-5l.webp'
    ],
    sku: 'DIS-COC-005',
    rating: 4.9,
    reviewsCount: 64,
    benefits: [
      'Espuma densa y persistente de gran poder desengrasante',
      'Fórmula con pH neutro que no reseca las manos',
      'Aroma cítrico natural refrescante',
      'Ahorro del 45% respecto a botellas de 500ml de retail'
    ],
    usageInstructions: 'Aplicar directamente en esponja húmeda o diluir 30ml en 5 litros de agua tibia.',
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-006',
    title: 'Desengrasante Industrial Potente Hornos y Campanas 5L',
    slug: 'desengrasante-industrial-hornos-campanas-5l',
    shortDescription: 'Solución alcalina pesada para carbonizaciones, grasa vegetal y aceites quemados.',
    description: 'El producto estrella para cocinas profesionales, asaderas, freidoras y campanas extractoras. Disuelve grasas carbonizadas acumuladas sin necesidad de raspar en exceso ni dañar el acero inoxidable. Acción rápida que ahorra tiempo y esfuerzo en limpiezas profundas.',
    categoryId: 'aseo-cocina',
    categoryName: 'Aseo de Cocina',
    format: 'Bidón 5 Litros',
    price: 6990,
    regularPrice: 11990,
    featured: true,
    inStock: true,
    image: '/images/products/desengrasante-industrial-5l.webp',
    gallery: [
      '/images/products/desengrasante-industrial-5l.webp'
    ],
    sku: 'DIS-COC-006',
    rating: 5.0,
    reviewsCount: 71,
    benefits: [
      'Corta grasa quemada y cochambre en minutos',
      'Ideal para parrillas, hornos, campanas y pisos de cocina',
      'Puede usarse puro para suciedad extrema o diluido 1:10',
      'No inflamable y de fácil enjuague'
    ],
    usageInstructions: 'Aplicar con atomizador sobre la superficie templada o fría, dejar actuar 5 a 10 min y retirar con paño húmedo.',
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-007',
    title: 'Cloro Gel Multiuso Desinfectante Espeso 5L',
    slug: 'cloro-gel-multiuso-5l',
    shortDescription: 'Adherencia prolongada en paredes y desagües para una desinfección total que no salpica.',
    description: 'Cloro en presentación gel concentrado que se adhiere a superficies verticales y cantos de lavaplatos donde el cloro líquido común escurre. Blanquea tablas de picar, desinfecta mesones y elimina el 99.9% de hongos y bacterias de cocina con control antiderrames.',
    categoryId: 'aseo-cocina',
    categoryName: 'Aseo de Cocina',
    format: 'Bidón 5 Litros',
    price: 4990,
    regularPrice: 7990,
    featured: false,
    inStock: true,
    image: '/images/products/cloro-gel-5l.webp',
    gallery: [
      '/images/products/cloro-gel-5l.webp'
    ],
    sku: 'DIS-COC-007',
    rating: 4.8,
    reviewsCount: 43,
    benefits: [
      'Consistencia gel que evita salpicaduras accidentales',
      'Poder bactericida certificado 99.9%',
      'Mayor tiempo de contacto activo en superficies',
      'Deja superficies brillantes y libres de malos olores'
    ],
    usageInstructions: 'Aplicar directamente o diluir en agua para trapear mesones y pisos.',
    createdAt: '2026-02-05'
  },
  {
    id: 'prod-008',
    title: 'Atomizador Desengrasante de Cocina Express 750ml',
    slug: 'atomizador-desengrasante-express-750ml',
    shortDescription: 'Listo para usar con gatillo espumador para la limpieza diaria de estufas y microondas.',
    description: 'Práctico pulverizador para el mantenimiento diario de cubiertas de granito, encimeras vitrocerámicas, estufas a gas y electrodomésticos. Su gatillo ergonómico genera una espuma densa que no gotea y limpia al pasar el paño.',
    categoryId: 'aseo-cocina',
    categoryName: 'Aseo de Cocina',
    format: 'Botella 750ml con gatillo',
    price: 2490,
    regularPrice: 4290,
    featured: false,
    inStock: true,
    image: '/images/products/atomizador-cocina-750ml.webp',
    gallery: [
      '/images/products/atomizador-cocina-750ml.webp'
    ],
    sku: 'DIS-COC-008',
    rating: 4.6,
    reviewsCount: 22,
    benefits: [
      'Gatillo de 2 posiciones: spray difuso o espuma compacta',
      'Listo para usar sin requerir dilución',
      'Compatible con acero inoxidable, vidrio y cerámicas'
    ],
    usageInstructions: 'Rociar a 20 cm, esperar 30 segundos y limpiar con esponja o toalla de papel.',
    createdAt: '2026-02-12'
  },

  // --- ASEO DE BAÑO ---
  {
    id: 'prod-009',
    title: 'Limpiador Antisarro Profesional Desincrustante 5L',
    slug: 'limpiador-antisarro-profesional-5l',
    shortDescription: 'Elimina costras calcáreas de aguas duras, sarro de inodoros y residuos de jabón en mamparas.',
    description: 'El agua de Santiago y la zona central de Chile es conocida por su alto contenido de cal y sarro. Este desincrustante ácido balanceado disuelve de inmediato las marcas blancas de griferías, puertas de ducha de vidrio templado, azulejos y tazas de baño devolviendo el brillo original sin rayar.',
    categoryId: 'aseo-bano',
    categoryName: 'Aseo de Baño',
    format: 'Bidón 5 Litros',
    price: 6490,
    regularPrice: 10490,
    featured: true,
    inStock: true,
    image: '/images/products/antisarro-profesional-5l.webp',
    gallery: [
      '/images/products/antisarro-profesional-5l.webp'
    ],
    sku: 'DIS-BAN-009',
    rating: 4.9,
    reviewsCount: 58,
    benefits: [
      'Disuelve sarro acumulado sin necesidad de frotar con lija',
      'Devuelve la transparencia cristalina a mamparas de ducha',
      'Brillo reluciente en griferías cromadas',
      'Fórmula de gran concentración para diluir o usar directo'
    ],
    usageInstructions: 'Para sarro pesado usar puro, dejar actuar 3 minutos y enjuagar con abundante agua.',
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-010',
    title: 'Cloro Tradicional Puro 5% Concentrado 5L',
    slug: 'cloro-tradicional-5-porciento-5l',
    shortDescription: 'Hipoclorito de sodio al 5% para desinfección profunda de sanitarios y prevención de moho.',
    description: 'Cloro puro con concentración real garantizada. Indispensable para la higienización profunda de baños, pisos de alto tráfico y zonas húmedas propensas a hongos negros en fragües. Potente poder bactericida, viricida y fungicida certificado.',
    categoryId: 'aseo-bano',
    categoryName: 'Aseo de Baño',
    format: 'Bidón 5 Litros',
    price: 3890,
    regularPrice: 5990,
    featured: false,
    inStock: true,
    image: '/images/products/cloro-tradicional-5l.webp',
    gallery: [
      '/images/products/cloro-tradicional-5l.webp'
    ],
    sku: 'DIS-BAN-010',
    rating: 4.8,
    reviewsCount: 45,
    benefits: [
      'Concentración activa del 5% no rebajada',
      'Elimina manchas negras de hongos en junturas',
      'El desinfectante más confiable y económico'
    ],
    usageInstructions: 'Diluir 100ml de cloro en 10 litros de agua para pisos y azulejos.',
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-011',
    title: 'Pastillas Desodorantes para Estanque WC (Pack 4 un)',
    slug: 'pastillas-estanque-wc-pack-4',
    shortDescription: 'Agua azul higienizante con fragancia marina en cada descarga del inodoro. Dura semanas.',
    description: 'Bloques de disolución lenta que se colocan directamente en el estanque del inodoro. Con cada descarga liberan agentes espumantes, desodorizantes y color azul marino que evitan la adherencia de suciedad y mantienen el baño fresco continuamente.',
    categoryId: 'aseo-bano',
    categoryName: 'Aseo de Baño',
    format: 'Pack 4 Unidades',
    price: 2690,
    regularPrice: 4490,
    featured: false,
    inStock: true,
    image: '/images/products/pastillas-estanque-pack4.webp',
    gallery: [
      '/images/products/pastillas-estanque-pack4.webp'
    ],
    sku: 'DIS-BAN-011',
    rating: 4.7,
    reviewsCount: 33,
    benefits: [
      'Hasta 1.200 descargas de protección continua por pack',
      'Mantiene la taza limpia sin manchas de agua dura',
      'Aroma fresco marino persistente'
    ],
    usageInstructions: 'Introducir una pastilla con su envoltura biodegradable en la esquina opuesta a la entrada de agua del estanque.',
    createdAt: '2026-02-14'
  },

  // --- ASEO GENERAL Y DESINFECCIÓN ---
  {
    id: 'prod-012',
    title: 'Limpiapisos Perfumado Aroma Lavanda Silvestre 5L',
    slug: 'limpiapisos-lavanda-silvestre-5l',
    shortDescription: 'Secado ultrarrápido sin dejar vetas opacas. Aroma intenso que perdura por más de 12 horas.',
    description: 'El favorito de los hogares chilenos. Formulado con bio-alcoholes que aseguran una evaporación pareja sin empañar pisos flotantes, porcelanatos, cerámicas ni maderas vitrificadas. Su delicado perfume a lavanda brinda sensación de orden y paz inmediata.',
    categoryId: 'aseo-general',
    categoryName: 'Aseo General',
    format: 'Bidón 5 Litros',
    price: 4690,
    regularPrice: 7990,
    featured: true,
    inStock: true,
    image: '/images/products/limpiapisos-lavanda-5l.webp',
    gallery: [
      '/images/products/limpiapisos-lavanda-5l.webp'
    ],
    sku: 'DIS-GEN-012',
    rating: 4.9,
    reviewsCount: 84,
    benefits: [
      'Secado rápido sin marcas ni residuos resbalosos',
      'Apto para porcelanato, piso flotante y cerámica',
      'Fragancia de alta fijación 12+ horas',
      'No necesita enjuague posterior'
    ],
    usageInstructions: 'Verter medio vaso (100ml) en un balde con 5 litros de agua tibia y trapear normalmente.',
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-013',
    title: 'Limpiapisos Perfumado Aroma Cherry Dulce 5L',
    slug: 'limpiapisos-cherry-dulce-5l',
    shortDescription: 'Inconfundible fragancia a cereza dulce que revitaliza espacios cerrados y salas comunes.',
    description: 'Variante frutal de gran popularidad para recepciones, oficinas y departamentos. Además de limpiar eficazmente polvo y grasa ligera del suelo, aporta una estela aromática dulce muy agradable que neutraliza olores de mascotas y tabaco.',
    categoryId: 'aseo-general',
    categoryName: 'Aseo General',
    format: 'Bidón 5 Litros',
    price: 4690,
    regularPrice: 7990,
    featured: false,
    inStock: true,
    image: '/images/products/limpiapisos-cherry-5l.webp',
    gallery: [
      '/images/products/limpiapisos-cherry-5l.webp'
    ],
    sku: 'DIS-GEN-013',
    rating: 4.8,
    reviewsCount: 39,
    benefits: [
      'Aroma cereza dulce de alta difusión',
      'Fórmula abrillantadora que resalta la textura del piso',
      'Neutro y seguro para hogares con mascotas'
    ],
    usageInstructions: 'Mezclar 100ml en balde de agua.',
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-014',
    title: 'Desinfectante Amonio Cuaternario 5ta Generación 5L',
    slug: 'amonio-cuaternario-5ta-generacion-5l',
    shortDescription: 'Sanitizante hospitalario de amplio espectro contra virus, bacterias y esporas de hongos.',
    description: 'Compuesto sanitizante de nivel institucional utilizado en clínicas, colegios, gimnasios y transporte público. No corrosivo para metales y telas, no mancha y brinda un efecto residual activo que continúa protegiendo las superficies horas después de la aplicación.',
    categoryId: 'aseo-general',
    categoryName: 'Aseo General',
    format: 'Bidón 5 Litros',
    price: 7990,
    regularPrice: 12990,
    featured: false,
    inStock: true,
    image: '/images/products/amonio-cuaternario-5l.webp',
    gallery: [
      '/images/products/amonio-cuaternario-5l.webp'
    ],
    sku: 'DIS-GEN-014',
    rating: 4.9,
    reviewsCount: 26,
    benefits: [
      'Amonio cuaternario de quinta generación certificado',
      'Efecto residual desinfectante prolongado',
      'Rendimiento masivo: dilución 1:50 para pisos y muebles',
      'Sin olor sofocante a cloro'
    ],
    usageInstructions: 'Para desinfección preventiva diluir 20ml por cada litro de agua.',
    createdAt: '2026-02-02'
  },
  {
    id: 'prod-015',
    title: 'Bolsas de Basura Extra Resistentes 80x110cm (Rollo 10 un)',
    slug: 'bolsas-basura-reforzadas-80x110-rollo-10',
    shortDescription: 'Polietileno virgen calibre grueso 50 micras antiderrame para contenedores de 120L y condominios.',
    description: 'Bolsas industriales de alta densidad fabricadas para resistir peso, esquinas punzantes y líquidos sin rasgarse ni filtrarse en el fondo. El estándar preferido por administradores de edificios, restaurantes y talleres.',
    categoryId: 'aseo-general',
    categoryName: 'Aseo General',
    format: 'Rollo de 10 unidades gruesas',
    price: 2990,
    regularPrice: 4990,
    featured: false,
    inStock: true,
    image: '/images/products/bolsas-basura-80x110.webp',
    gallery: [
      '/images/products/bolsas-basura-80x110.webp'
    ],
    sku: 'DIS-GEN-015',
    rating: 4.7,
    reviewsCount: 48,
    benefits: [
      'Espesor reforzado de 50 micras que no cede',
      'Fondo estrella sellado hermético antigoteo',
      'Para basureros de 80 a 120 litros'
    ],
    usageInstructions: 'Desenrollar y colocar en el tambor doblando el borde superior.',
    createdAt: '2026-02-08'
  },
  {
    id: 'prod-016',
    title: 'Pack 5 Paños de Microfibra Ultra Absorbentes 40x40cm',
    slug: 'pack-5-panos-microfibra-40x40',
    shortDescription: 'Colores surtidos para sectorización de áreas sin dejar pelusas ni rayas en vidrios.',
    description: 'Set de 5 paños profesionales de microfibra de alta densidad (300 gsm). Permiten aplicar el código de colores preventivo recomendado por la OMS (azul baño, amarillo cocina, verde vidrios, rojo sanitario, naranja general) para evitar contaminación cruzada.',
    categoryId: 'aseo-general',
    categoryName: 'Aseo General',
    format: 'Pack 5 Unidades',
    price: 3490,
    regularPrice: 5990,
    featured: true,
    inStock: true,
    image: '/images/products/panos-microfibra-pack5.webp',
    gallery: [
      '/images/products/panos-microfibra-pack5.webp'
    ],
    sku: 'DIS-GEN-016',
    rating: 4.9,
    reviewsCount: 55,
    benefits: [
      'Atrapan el polvo y la grasa sin necesidad de químicos',
      'Lavables a máquina más de 200 veces',
      '5 colores diferentes para no mezclar zonas de aseo'
    ],
    usageInstructions: 'Usar húmedo para remover suciedad o seco para pulir y abrillantar.',
    createdAt: '2026-02-15'
  }
];

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(productId: string, categoryId: string, limit = 4): Product[] {
  return products
    .filter(p => p.id !== productId && p.categoryId === categoryId)
    .slice(0, limit);
}
