import React from 'react';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { FloatingCartButton } from './FloatingCartButton';

export const GlobalCartContainer: React.FC = () => {
  return (
    <>
      <FloatingCartButton />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
};
export default GlobalCartContainer;
