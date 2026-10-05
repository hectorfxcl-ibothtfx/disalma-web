import React from 'react';
import { useCart } from '../../stores/cartStore';
import { formatCLP } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isMounted,
    totalCount,
    subtotal,
    totalSavings,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    openCheckout
  } = useCart();

  if (!isMounted || !isDrawerOpen) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop */}
      <div
        className="drawer-backdrop"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer panel */}
      <div className="drawer">

        {/* Head */}
        <div className="drawer__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🛒
            </div>
            <div>
              <h2 id="cart-title" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--black)' }}>
                Tu Carrito de Pedido
              </h2>
              <p style={{ fontSize: '.75rem', color: 'var(--mid)', marginTop: '.1rem' }}>
                {totalCount === 0 ? 'Vacío' : `${totalCount} producto${totalCount > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <button
            className="drawer__close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Savings bar */}
        {totalSavings > 0 && (
          <div className="drawer__savings-bar">
            ✨ Estás ahorrando <strong style={{ marginLeft: '.3rem' }}>{formatCLP(totalSavings)}</strong>&nbsp;vs supermercado
          </div>
        )}

        {/* Body */}
        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Explora nuestro catálogo y agrega los productos de aseo que necesitas.</p>
              <a
                href="/catalogo"
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-yellow"
                style={{ marginTop: '.5rem' }}
              >
                Ver Catálogo →
              </a>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                {/* Thumb */}
                <div className="cart-item__thumb">
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <div className="cart-item__name">{product.title}</div>
                  <div className="cart-item__format">{product.format}</div>

                  <div className="cart-item__controls">
                    {/* Qty */}
                    <div className="qty-ctrl">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Disminuir"
                      >−</button>
                      <span className="qty-ctrl__val">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Aumentar"
                      >+</button>
                    </div>

                    {/* Price + delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <div className="cart-item__price">
                        <div className="price-now">{formatCLP(product.price * quantity)}</div>
                        {quantity > 1 && (
                          <div className="price-unit">{formatCLP(product.price)} c/u</div>
                        )}
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => removeItem(product.id)}
                        aria-label="Eliminar"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__totals">
              <div className="row">
                <span>Subtotal</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="row savings">
                  <span>Ahorro Distribuidora</span>
                  <span>−{formatCLP(totalSavings)}</span>
                </div>
              )}
              <div className="row total">
                <span>Total Estimado</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="btn btn-whatsapp btn-full"
              style={{ justifyContent: 'center', fontSize: '.9375rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Confirmar Pedido por WhatsApp
            </button>

            <div className="drawer__security">
              🔒 Sin pagos online anticipados · Coordinas directo con el equipo
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
