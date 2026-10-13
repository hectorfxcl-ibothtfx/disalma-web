import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { formatCLP, calculateDiscount } from '../../utils/formatters';
import { AddToCartButton } from '../product/AddToCartButton';
import { getProducts } from '../../services/productService';

interface Props {
  initialProduct: Product;
}

export const HeroFeaturedCard: React.FC<Props> = ({ initialProduct }) => {
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    // Sincronizar en vivo con el producto destacado marcado en Supabase
    getProducts().then(freshProducts => {
      if (freshProducts && freshProducts.length > 0) {
        // Busca el primer producto que esté activo con featured: true
        const feat = freshProducts.find(p => p.featured && p.inStock) || freshProducts.find(p => p.featured) || freshProducts[0];
        if (feat) {
          setProduct(feat);
        }
      }
    }).catch(err => console.warn('Error fetching hero featured product:', err));
  }, []);

  const discount = calculateDiscount(product.price, product.regularPrice);

  return (
    <div className="hero__card">
      <div className="hero__card-badge">🔥 OFERTA DE PORTADA</div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span className="badge badge-yellow" style={{ fontSize: '.75rem', fontWeight: 800 }}>
          {product.categoryName} · {product.format}
        </span>
      </div>

      <a href={`/productos/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="hero__card-image" style={{ position: 'relative' }}>
          <img
            src={product.image}
            alt={product.title}
            width="200"
            height="200"
            loading="eager"
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/categories/aseo-ropa.webp';
            }}
          />
        </div>

        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 800,
          color: 'var(--black)',
          margin: '.875rem 0 .375rem',
          textAlign: 'center',
          lineHeight: 1.3
        }}>
          {product.title}
        </h3>
      </a>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.625rem',
        flexWrap: 'wrap',
        marginBottom: '.75rem'
      }}>
        {product.regularPrice > product.price && (
          <span style={{ fontSize: '.85rem', color: 'var(--light)', textDecoration: 'line-through' }}>
            {formatCLP(product.regularPrice)}
          </span>
        )}
        <span style={{ fontSize: '1.75rem', fontWeigth: 900, color: 'var(--red, #DC2626)', lineHeight: 1 }}>
          {formatCLP(product.price)}
        </span>
        {discount > 0 && (
          <span className="badge badge-savings" style={{ fontWeight: 800 }}>
            -{discount}%
          </span>
        )}
      </div>

      {product.shortDescription && (
        <p style={{
          fontSize: '.825rem',
          color: 'var(--mid)',
          textAlign: 'center',
          marginBottom: '1.1rem',
          lineHeight: 1.45
        }}>
          {product.shortDescription}
        </p>
      )}

      <AddToCartButton
        product={product}
        variant="detail"
      />
    </div>
  );
};
