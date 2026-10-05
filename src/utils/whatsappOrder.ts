import type { CartItem, OrderFormState } from '../types';
import { businessInfo } from '../data/business';
import { formatCLP } from './formatters';

export function generateWhatsAppOrderMessage(
  items: CartItem[],
  form: OrderFormState,
  subtotal: number,
  totalSavings: number
): string {
  const deliveryLabels: Record<string, string> = {
    retiro: '🏪 Retiro en Local (San Miguel)',
    domicilio: '🚚 Envío a Domicilio',
    whatsapp: '💬 Coordinar Despacho por WhatsApp'
  };

  const paymentLabels: Record<string, string> = {
    efectivo: '💵 Efectivo al recibir',
    transferencia: '🏦 Transferencia Bancaria',
    tarjeta: '💳 Tarjeta Débito / Crédito al recibir (POS)',
    link: '🔗 Link de Pago Webpay / Transbank'
  };

  const lines: string[] = [];

  lines.push('🧺 *NUEVO PEDIDO - DISALMA.CL*');
  lines.push('----------------------------------------');
  lines.push(`👤 *Cliente:* ${form.customerName.trim()}`);
  lines.push(`📱 *Teléfono:* ${form.phone.trim()}`);
  lines.push(`📍 *Entrega:* ${deliveryLabels[form.deliveryMethod] || form.deliveryMethod}`);

  if (form.deliveryMethod === 'domicilio') {
    lines.push(`🏠 *Dirección:* ${form.deliveryAddress.trim()}${form.commune ? ` (${form.commune.trim()})` : ''}`);
  }

  lines.push(`💳 *Forma de pago:* ${paymentLabels[form.paymentMethod] || form.paymentMethod}`);
  lines.push('----------------------------------------');
  lines.push('📦 *DETALLE DE PRODUCTOS:*');

  items.forEach((item, index) => {
    const itemSubtotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. *${item.product.title}* (${item.product.format})\n   👉 ${item.quantity} un. x ${formatCLP(item.product.price)} = *${formatCLP(itemSubtotal)}*`
    );
  });

  lines.push('----------------------------------------');
  lines.push(`💰 *TOTAL A PAGAR: ${formatCLP(subtotal)} CLP*`);

  if (totalSavings > 0) {
    lines.push(`🎉 *Ahorro estimado en Liquidadora:* ${formatCLP(totalSavings)} CLP`);
  }

  lines.push('----------------------------------------');

  if (form.notes && form.notes.trim().length > 0) {
    lines.push(`📝 *Notas / Indicaciones:* ${form.notes.trim()}`);
    lines.push('----------------------------------------');
  }

  lines.push('Por favor confírmenme la recepción del pedido para coordinar entrega y pago. ¡Muchas gracias!');
  lines.push('_Pedido generado desde Disalma.cl - Liquidadora Alma Janette_');

  return lines.join('\n');
}

export function openWhatsAppCheckout(
  items: CartItem[],
  form: OrderFormState,
  subtotal: number,
  totalSavings: number
): void {
  const message = generateWhatsAppOrderMessage(items, form, subtotal, totalSavings);
  const targetNumber = businessInfo.whatsappNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
  
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
}
