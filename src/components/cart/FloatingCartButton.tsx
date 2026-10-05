import React from 'react';
import { useCart } from '../../stores/cartStore';
import { formatCLP } from '../../utils/formatters';

export const FloatingCartButton: React.FC = () => {
  const { totalCount, subtotal, openCart, isMounted } = useCart();

  if (!isMounted || totalCount === 0) return null;

  return (
    <div className="float-cart">
      <button
        onClick={openCart}
        className="float-cart__btn"
        aria-label="Ver carrito de compras"
      >
        <div className="float-cart__icon">
          🛒
          <span className="float-cart__count">{totalCount}</span>
        </div>
        <div className="float-cart__label">
          <small>Tu Pedido</small>
          <strong>{formatCLP(subtotal)}</strong>
        </div>
        <span className="float-cart__arrow">›</span>
      </button>
    </div>
  );
};

export default FloatingCartButton;
