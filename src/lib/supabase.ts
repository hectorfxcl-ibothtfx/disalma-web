import { createClient } from '@supabase/supabase-js';
import type { Product } from '../types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://lsqofkjozfckhsvujwdx.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_MnhcsbRrVqvhFWE1oUYHVQ_me4j71o2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseProductRow {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category_id: string;
  category_name: string;
  format: string;
  price: number;
  regular_price: number;
  featured: boolean;
  in_stock: boolean;
  image: string;
  gallery: string[];
  sku: string;
  rating: number;
  reviews_count: number;
  benefits: string[];
  usage_instructions?: string;
  created_at?: string;
}

// Conversor de fila Supabase a modelo TypeScript de la app
export function rowToProduct(row: SupabaseProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description || '',
    description: row.description || '',
    categoryId: row.category_id,
    categoryName: row.category_name,
    format: row.format,
    price: Number(row.price),
    regularPrice: Number(row.regular_price || row.price),
    featured: Boolean(row.featured),
    inStock: Boolean(row.in_stock),
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [row.image],
    sku: row.sku || '',
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 1),
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    usageInstructions: row.usage_instructions || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

// Conversor de Product de la app a fila Supabase
export function productToRow(prod: Partial<Product>): Partial<SupabaseProductRow> {
  const row: Partial<SupabaseProductRow> = {};
  if (prod.id !== undefined) row.id = prod.id;
  if (prod.title !== undefined) row.title = prod.title;
  if (prod.slug !== undefined) row.slug = prod.slug;
  if (prod.shortDescription !== undefined) row.short_description = prod.shortDescription;
  if (prod.description !== undefined) row.description = prod.description;
  if (prod.categoryId !== undefined) row.category_id = prod.categoryId;
  if (prod.categoryName !== undefined) row.category_name = prod.categoryName;
  if (prod.format !== undefined) row.format = prod.format;
  if (prod.price !== undefined) row.price = prod.price;
  if (prod.regularPrice !== undefined) row.regular_price = prod.regularPrice;
  if (prod.featured !== undefined) row.featured = prod.featured;
  if (prod.inStock !== undefined) row.in_stock = prod.inStock;
  if (prod.image !== undefined) row.image = prod.image;
  if (prod.gallery !== undefined) row.gallery = prod.gallery;
  if (prod.sku !== undefined) row.sku = prod.sku;
  if (prod.rating !== undefined) row.rating = prod.rating;
  if (prod.reviewsCount !== undefined) row.reviews_count = prod.reviewsCount;
  if (prod.benefits !== undefined) row.benefits = prod.benefits;
  if (prod.usageInstructions !== undefined) row.usage_instructions = prod.usageInstructions;
  return row;
}
