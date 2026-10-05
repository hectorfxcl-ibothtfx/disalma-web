import React, { useState } from 'react';
import { addToCart } from '../../stores/cartStore';
import type { Product } from '../../types';

interface Props {
  product: Product;
  variant?: 'quick' | 'detail';
}

export const AddToCartButton: React.FC<Props> = ({ product, variant = 'quick' }) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  if (variant === 'detail') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {/* Quantity selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span style={{ fontSize: '.8125rem', fontWeight: 700, color: 'var(--mid)' }}>Cantidad:</span>
          <div className="qty-ctrl" style={{ border: '1.5px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Menos"
            >−</button>
            <span className="qty-ctrl__val" style={{ minWidth: 40, fontSize: '1rem' }}>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Más"
            >+</button>
          </div>
        </div>

        {/* Add button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`btn btn-lg btn-full ${justAdded ? '' : 'btn-yellow'}`}
          style={justAdded ? {
            background: 'var(--whatsapp)',
            color: 'white',
            justifyContent: 'center',
          } : { justifyContent: 'center' }}
          aria-label={`Agregar ${product.title} al carrito`}
        >
          {justAdded ? (
            <>✓ &nbsp;¡Agregado al Carrito!</>
          ) : (
            <>🛒 &nbsp;Agregar al Pedido ({quantity})</>
          )}
        </button>
      </div>
    );
  }

  // Quick card button
  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`btn btn-full btn-sm ${justAdded ? '' : 'btn-primary'}`}
      style={justAdded ? {
        background: 'var(--whatsapp)',
        color: 'white',
        justifyContent: 'center',
        width: '100%',
      } : { justifyContent: 'center' }}
      aria-label={`Agregar ${product.title} al carrito`}
    >
      {justAdded ? '✓ ¡Agregado!' : '🛒 Agregar al Carrito'}
    </button>
  );
};

export default AddToCartButton;
