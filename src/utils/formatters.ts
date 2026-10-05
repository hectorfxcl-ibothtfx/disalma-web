/**
 * Formats a number to Chilean Pesos currency format (e.g., $6.990)
 */
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculates percentage discount between regular price and current price
 */
export function calculateDiscount(price: number, regularPrice: number): number {
  if (!regularPrice || regularPrice <= price) return 0;
  return Math.round(((regularPrice - price) / regularPrice) * 100);
}

/**
 * Encodes text for WhatsApp link
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
