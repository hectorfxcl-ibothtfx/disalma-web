import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products.ts';

const supabaseUrl = 'https://lsqofkjozfckhsvujwdx.supabase.co';
const supabaseKey = 'sb_publishable_MnhcsbRrVqvhFWE1oUYHVQ_me4j71o2';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Subiendo ${products.length} productos a Supabase...`);
  
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

  const { data, error } = await supabase.from('products').upsert(rows);
  if (error) {
    console.error('Error al insertar:', error);
  } else {
    console.log('Migracion inicial de productos completada con exito!');
  }
}

seed();
