import React, { useState, useMemo } from 'react';
import type { Product, Category } from '../../types';
import { formatCLP, calculateDiscount } from '../../utils/formatters';
import { AddToCartButton } from '../product/AddToCartButton';

interface Props {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
}

export const CatalogIsland: React.FC<Props> = ({
  initialProducts,
  categories,
  initialCategorySlug
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedCategory !== 'todos' && product.categoryId !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          product.title.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.format.toLowerCase().includes(q) ||
          product.categoryName.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        return calculateDiscount(b.price, b.regularPrice) - calculateDiscount(a.price, a.regularPrice);
      }
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasFilters = selectedCategory !== 'todos' || searchQuery.trim();

  return (
    <div>

      {/* ── Filters box ──────────────────────── */}
      <div className="catalog-filters">

        {/* Search */}
        <div className="search-box" style={{ flex: 1, minWidth: 220 }}>
          <span className="search-box__icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Buscar: detergente, lavaloza, desengrasante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar producto"
          />
        </div>

        {/* Sort + pills row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', flex: 1 }}>
          <div className="filter-pills" style={{ flex: 1 }}>
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`pill${selectedCategory === 'todos' ? ' active' : ''}`}
            >
              Todos
              <span className="count">{initialProducts.length}</span>
            </button>
            {categories.map((cat) => {
              const count = initialProducts.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`pill${selectedCategory === cat.id ? ' active' : ''}`}
                >
                  {cat.name}
                  <span className="count">{count}</span>
                </button>
              );
            })}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
            aria-label="Ordenar por"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="discount">Mayor ahorro</option>
          </select>
        </div>

      </div>

      {/* ── Results header ────────────────────── */}
      <div className="filter-row" style={{ marginBottom: '1rem' }}>
        <p className="results-info">
          Mostrando <strong>{filteredProducts.length}</strong> de {initialProducts.length} productos
          {selectedCategory !== 'todos' && ` · ${categories.find(c => c.id === selectedCategory)?.name}`}
        </p>
        {hasFilters && (
          <button onClick={clearAllFilters} className="clear-filters">
            ✕ Limpiar filtros
          </button>
        )}
      </div>

      {/* ── Empty state ───────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          maxWidth: 400,
          margin: '2rem auto'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontWeight: 800, color: 'var(--black)', marginBottom: '.5rem' }}>
            No encontramos resultados
          </h3>
          <p style={{ fontSize: '.875rem', color: 'var(--mid)', marginBottom: '1.25rem' }}>
            Prueba con "detergente", "5L" o "desengrasante".
          </p>
          <button onClick={clearAllFilters} className="btn btn-yellow">
            Mostrar todos
          </button>
        </div>
      ) : (
        /* ── Product Grid ─────────────────────── */
        <div className="grid-products">
          {filteredProducts.map((product) => {
            const discount = calculateDiscount(product.price, product.regularPrice);
            return (
              <div key={product.id} className="card product-card">

                <a href={`/productos/${product.slug}`} className="product-card__image">
                  <div className="product-card__badges">
                    {discount > 0 && (
                      <span
                        style={{
                          background: 'var(--red)',
                          color: 'white',
                          fontSize: '.625rem',
                          fontWeight: 900,
                          padding: '.2rem .5rem',
                          borderRadius: 'var(--radius-full)',
                          letterSpacing: '.02em'
                        }}
                      >
                        -{discount}%
                      </span>
                    )}
                    <span
                      style={{
                        background: 'rgba(15,23,42,.85)',
                        color: 'white',
                        fontSize: '.625rem',
                        fontWeight: 700,
                        padding: '.2rem .5rem',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {product.format}
                    </span>
                  </div>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    width="240"
                    height="240"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                  />
                </a>

                <div className="product-card__body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="product-card__category">{product.categoryName}</span>
                    <span style={{ fontSize: '.75rem', color: 'var(--yellow-dark)', fontWeight: 800 }}>
                      ★ {product.rating}
                    </span>
                  </div>
                  <a href={`/productos/${product.slug}`} className="product-card__title">
                    {product.title}
                  </a>
                  <p className="product-card__desc">{product.shortDescription}</p>
                </div>

                <div className="product-card__footer">
                  <div className="product-card__price">
                    <span className="price-current">{formatCLP(product.price)}</span>
                    {product.regularPrice > product.price && (
                      <span className="price-original">{formatCLP(product.regularPrice)}</span>
                    )}
                  </div>
                  <AddToCartButton product={product} variant="quick" />
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default CatalogIsland;
