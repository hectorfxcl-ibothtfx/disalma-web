import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products.ts';

const supabaseUrl = 'https://lsqofkjozfckhsvujwdx.supabase.co';
const supabaseKey = 'sb_publishable_MnhcsbRrVqvhFWE1oUYHVQ_me4j71o2';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncCatalog() {
  console.log('1. Eliminando productos anteriores en Supabase...');
  // Borramos todos los productos existentes usando un filtro que abarque todo
  const { error: delError } = await supabase.from('products').delete().neq('id', 'dummy-id-nonexistent');
  if (delError) {
    console.error('Error al limpiar tabla:', delError.message);
  } else {
    console.log('Tabla limpiada correctamente.');
  }

  console.log(`2. Insertando los ${products.length} productos del nuevo catálogo integral...`);
  const rows = products.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    short_description: p.shortDescription || '',
    description: p.description || '',
    category_id: p.categoryId,
    category_name: p.categoryName,
    format: p.format,
    price: p.price,
    regular_price: p.regularPrice,
    featured: p.featured,
    in_stock: p.inStock,
    image: p.image,
    gallery: p.gallery || [p.image],
    sku: p.sku || '',
    rating: p.rating || 5.0,
    reviews_count: p.reviewsCount || 1,
    benefits: p.benefits || [],
    usage_instructions: p.usageInstructions || ''
  }));

  const { error: insertError } = await supabase.from('products').insert(rows);
  if (insertError) {
    console.error('Error al insertar nuevos productos:', insertError.message);
  } else {
    console.log(`¡Exito! ${products.length} productos insertados en Supabase.`);
  }

  // Verificamos total
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log('Total de productos en base de datos:', count);
}

syncCatalog();
