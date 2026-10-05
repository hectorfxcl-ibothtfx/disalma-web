import React from 'react';
import { useCart } from '../../stores/cartStore';

export const HeaderCartButton: React.FC = () => {
  const { totalCount, openCart, isMounted } = useCart();

  return (
    <button
      onClick={openCart}
      className="cart-btn"
      aria-label="Abrir carrito"
    >
      🛒
      <span style={{ display: 'none' }} className="hidden sm:inline">Carrito</span>
      {isMounted && totalCount > 0 && (
        <span className="cart-badge">{totalCount}</span>
      )}
    </button>
  );
};

export default HeaderCartButton;
