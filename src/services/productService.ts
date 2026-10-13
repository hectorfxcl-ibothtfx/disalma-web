import type { Product } from '../types';
import { supabase, rowToProduct, type SupabaseProductRow } from './supabase';
import { products as fallbackProducts } from '../data/products';

// Obtiene todos los productos: primero intenta Supabase, si falla o no hay conexión usa los locales
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Usando catálogo estático de respaldo:', error?.message);
      return fallbackProducts;
    }

    return (data as SupabaseProductRow[]).map(rowToProduct);
  } catch (err) {
    console.warn('Error conectando a Supabase, usando respaldo:', err);
    return fallbackProducts;
  }
}

// Obtiene un producto por su slug
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return fallbackProducts.find(p => p.slug === slug);
    }

    return rowToProduct(data as SupabaseProductRow);
  } catch {
    return fallbackProducts.find(p => p.slug === slug);
  }
}

// Sube una imagen al bucket de Supabase
export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
  const filePath = `items/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw new Error('Error al subir imagen: ' + uploadError.message);
  }

  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Guarda o actualiza un producto en Supabase
export async function upsertProduct(product: Partial<Product>): Promise<Product> {
  const slug = product.slug || product.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `prod-${Date.now()}`;
  const id = product.id || `prod-${Date.now()}`;

  const row: Partial<SupabaseProductRow> = {
    id,
    title: product.title || '',
    slug,
    short_description: product.shortDescription || '',
    description: product.description || product.shortDescription || '',
    category_id: product.categoryId || 'aseo-general',
    category_name: product.categoryName || 'Aseo General',
    format: product.format || 'Bidón 5 Litros',
    price: Number(product.price || 0),
    regular_price: Number(product.regularPrice || product.price || 0),
    featured: Boolean(product.featured),
    in_stock: product.inStock !== false,
    image: product.image || '/images/products/placeholder.webp',
    gallery: product.gallery || (product.image ? [product.image] : []),
    sku: product.sku || `LA-${Date.now().toString().slice(-4)}`,
    rating: product.rating || 5.0,
    reviews_count: product.reviewsCount || 1,
    benefits: product.benefits || [],
    usage_instructions: product.usageInstructions || ''
  };

  const { data, error } = await supabase
    .from('products')
    .upsert(row)
    .select()
    .single();

  if (error) {
    throw new Error('Error al guardar en Supabase: ' + error.message);
  }

  return rowToProduct(data as SupabaseProductRow);
}

// Actualiza stock de forma instantánea
export async function toggleProductStock(id: string, inStock: boolean): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ in_stock: inStock })
    .eq('id', id);

  if (error) throw new Error(error.message);
}

// Actualiza precio rápido
export async function updateProductPrice(id: string, price: number, regularPrice?: number): Promise<void> {
  const updates: Partial<SupabaseProductRow> = { price };
  if (regularPrice !== undefined) updates.regular_price = regularPrice;

  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id);

  if (error) throw new Error(error.message);
}

// Elimina producto
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
