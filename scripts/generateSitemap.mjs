import fs from 'fs';
import path from 'path';
import { products } from '../src/data/products.ts';
import { categories } from '../src/data/categories.ts';

const baseUrl = 'https://liquialma.cl';
const now = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/catalogo', priority: '0.9', changefreq: 'daily' },
  { url: '/contacto', priority: '0.9', changefreq: 'weekly' },
  { url: '/nosotros', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' }
];

const blogPosts = [
  'donde-comprar-productos-aseo-por-mayor-curico',
  'liquidaciones-de-perfumes-en-curico-como-ahorrar',
  'guia-aseo-personal-economico-curico',
  'mejores-productos-de-aseo-hogar-curico',
  'liquidadoras-en-curico-que-son-y-como-aprovecharlas'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Páginas Principales -->
`;

for (const page of staticPages) {
  xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

xml += `\n  <!-- Categorías -->\n`;
for (const cat of categories) {
  xml += `  <url>
    <loc>${baseUrl}/categorias/${cat.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

xml += `\n  <!-- Artículos de Blog SEO Local Curicó -->\n`;
for (const post of blogPosts) {
  xml += `  <url>
    <loc>${baseUrl}/blog/${post}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
`;
}

xml += `\n  <!-- Productos del Catálogo (${products.length}) -->\n`;
for (const prod of products) {
  xml += `  <url>
    <loc>${baseUrl}/productos/${prod.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${prod.featured ? '0.8' : '0.7'}</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const outPath = path.resolve('public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Sitemap generado con exito en ${outPath}`);
