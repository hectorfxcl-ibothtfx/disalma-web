import { useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';

const STORAGE_KEY = 'disalma_cart_v1';
const CART_UPDATE_EVENT = 'disalma:cart-updated';
const CART_OPEN_EVENT = 'disalma:open-cart';
const CHECKOUT_OPEN_EVENT = 'disalma:open-checkout';

export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { detail: items }));
  } catch (err) {
    console.error('Error saving cart to localStorage', err);
  }
}

export function addToCart(product: Product, quantity = 1): void {
  const current = getStoredCart();
  const existingIndex = current.findIndex(item => item.product.id === product.id);

  let updated: CartItem[];
  if (existingIndex > -1) {
    updated = current.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    updated = [...current, { product, quantity }];
  }

  saveCart(updated);
  openCartDrawer();
}

export function updateItemQuantity(productId: string, quantity: number): void {
  const current = getStoredCart();
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const updated = current.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  );
  saveCart(updated);
}

export function removeFromCart(productId: string): void {
  const current = getStoredCart();
  const updated = current.filter(item => item.product.id !== productId);
  saveCart(updated);
}

export function clearCart(): void {
  saveCart([]);
}

export function openCartDrawer(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT));
  }
}

export function openCheckoutModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CHECKOUT_OPEN_EVENT));
  }
}

/**
 * React hook to access and synchronize cart state across all islands
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setItems(getStoredCart());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CartItem[]>;
      if (customEvent.detail) {
        setItems(customEvent.detail);
      } else {
        setItems(getStoredCart());
      }
    };

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleOpenCheckout = () => {
      setIsDrawerOpen(false);
      setIsCheckoutOpen(true);
    };

    window.addEventListener(CART_UPDATE_EVENT, handleUpdate);
    window.addEventListener(CART_OPEN_EVENT, handleOpenDrawer);
    window.addEventListener(CHECKOUT_OPEN_EVENT, handleOpenCheckout);

    // Also listen to storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setItems(getStoredCart());
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleUpdate);
      window.removeEventListener(CART_OPEN_EVENT, handleOpenDrawer);
      window.removeEventListener(CHECKOUT_OPEN_EVENT, handleOpenCheckout);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalRegular = items.reduce(
    (acc, item) => acc + (item.product.regularPrice || item.product.price) * item.quantity,
    0
  );
  const totalSavings = Math.max(0, totalRegular - subtotal);

  return {
    items,
    isMounted,
    totalCount,
    subtotal,
    totalRegular,
    totalSavings,
    isDrawerOpen,
    setIsDrawerOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addItem: addToCart,
    updateQuantity: updateItemQuantity,
    removeItem: removeFromCart,
    clearCart,
    openCart: openCartDrawer,
    openCheckout: openCheckoutModal
  };
}
