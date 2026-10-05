import React, { useState } from 'react';
import { useCart } from '../../stores/cartStore';
import { formatCLP } from '../../utils/formatters';
import { openWhatsAppCheckout, generateWhatsAppOrderMessage } from '../../utils/whatsappOrder';
import type { OrderFormState, DeliveryMethod, PaymentMethod } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isMounted,
    subtotal,
    totalSavings,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart
  } = useCart();

  const [form, setForm] = useState<OrderFormState>({
    customerName: '',
    phone: '',
    deliveryMethod: 'domicilio',
    deliveryAddress: '',
    commune: '',
    paymentMethod: 'transferencia',
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  if (!isMounted || !isCheckoutOpen) return null;

  const validate = (): boolean => {
    const e: { [k: string]: string } = {};
    if (!form.customerName.trim()) e.customerName = 'Ingresa tu nombre completo';
    const phone = form.phone.replace(/[^0-9]/g, '');
    if (!phone || phone.length < 8) e.phone = 'Ingresa un teléfono válido (ej: +56 9 1234 5678)';
    if (form.deliveryMethod === 'domicilio') {
      if (!form.deliveryAddress.trim()) e.deliveryAddress = 'Ingresa calle y número';
      if (!form.commune.trim()) e.commune = 'Ingresa tu comuna';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    openWhatsAppCheckout(items, form, subtotal, totalSavings);
    setOrderSent(true);
  };

  const handleFinish = (shouldClear: boolean) => {
    if (shouldClear) clearCart();
    setOrderSent(false);
    setIsCheckoutOpen(false);
  };

  const previewMessage = generateWhatsAppOrderMessage(items, form, subtotal, totalSavings);

  const field = (id: keyof OrderFormState) => ({
    className: `form-group input${errors[id] ? ' error' : ''}`,
  });

  const deliveryOptions: { value: DeliveryMethod; icon: string; label: string; sub: string }[] = [
    { value: 'domicilio', icon: '🚚', label: 'Envío a Domicilio', sub: 'Todo Santiago' },
    { value: 'retiro',    icon: '🏪', label: 'Retiro en Local',   sub: 'Gratis · San Miguel' },
    { value: 'whatsapp',  icon: '💬', label: 'Coordinar x WA',   sub: 'Regiones / Encomienda' },
  ];

  const paymentOptions: { value: PaymentMethod; label: string; sub: string }[] = [
    { value: 'transferencia', label: 'Transferencia', sub: 'Cuenta corriente' },
    { value: 'efectivo',      label: 'Efectivo',      sub: 'Al recibir' },
    { value: 'tarjeta',       label: 'Tarjeta POS',   sub: 'Débito / Crédito' },
    { value: 'link',          label: 'Link de Pago',  sub: 'Webpay Transbank' },
  ];

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Head */}
        <div className="modal__head">
          <div>
            <h2 id="checkout-title">
              💬 Completar Pedido por WhatsApp
            </h2>
            <p>Liquidadora Alma Janette · Sin pasarelas lentas</p>
          </div>
          <button
            className="drawer__close"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Cerrar"
          >✕</button>
        </div>

        {/* Success screen */}
        {orderSent ? (
          <div className="modal__success">
            <div className="icon">✅</div>
            <h3>¡WhatsApp abierto con tu pedido!</h3>
            <p>
              Se transfirió el detalle a la conversación de WhatsApp con Disalma.
              Solo presiona <strong>Enviar</strong> en WhatsApp para confirmar.
            </p>
            <div className="info-box">
              <p><strong>Total:</strong> {formatCLP(subtotal)}</p>
              <p>
                <strong>Destino:</strong>{' '}
                {form.deliveryMethod === 'retiro'
                  ? 'Retiro en Local San Miguel'
                  : `${form.deliveryAddress}, ${form.commune}`
                }
              </p>
              <p><strong>Contacto Disalma:</strong> +56 9 5633 3906</p>
            </div>
            <div className="actions">
              <button
                type="button"
                onClick={() => handleFinish(true)}
                className="btn btn-yellow btn-full"
                style={{ justifyContent: 'center' }}
              >
                Vaciar carrito y finalizar
              </button>
              <button
                type="button"
                onClick={() => handleFinish(false)}
                className="btn btn-outline btn-full"
                style={{ justifyContent: 'center' }}
              >
                Mantener productos en carrito
              </button>
            </div>
          </div>
        ) : (
          /* Checkout form */
          <form onSubmit={handleSendOrder} noValidate>
            <div className="modal__body">

              {/* Order summary bar */}
              <div className="modal__summary-bar">
                <div>
                  <span style={{ fontSize: '.8125rem', color: 'var(--mid)' }}>Total a pagar:</span>
                  <span className="total" style={{ marginLeft: '.5rem' }}>{formatCLP(subtotal)}</span>
                  <span style={{ fontSize: '.75rem', color: 'var(--light)', marginLeft: '.5rem' }}>
                    ({items.length} producto{items.length !== 1 ? 's' : ''})
                  </span>
                </div>
                {totalSavings > 0 && (
                  <span className="savings">Ahorras {formatCLP(totalSavings)}</span>
                )}
              </div>

              {/* ── Sección 1: Datos personales ── */}
              <div className="form-section">
                <div className="form-section__label">
                  👤 Tus datos de contacto
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-name">Nombre y Apellido *</label>
                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="Ej: Carolina Rojas"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className={errors.customerName ? 'error' : ''}
                      autoComplete="name"
                    />
                    {errors.customerName && (
                      <p className="form-error">⚠ {errors.customerName}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-phone">Teléfono WhatsApp *</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={errors.phone ? 'error' : ''}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="form-error">⚠ {errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Sección 2: Método de entrega ── */}
              <div className="form-section">
                <div className="form-section__label">
                  📍 Método de entrega
                </div>

                <div className="delivery-options">
                  {deliveryOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`delivery-option${form.deliveryMethod === opt.value ? ' selected' : ''}`}
                      onClick={() => setForm({ ...form, deliveryMethod: opt.value })}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={opt.value}
                        checked={form.deliveryMethod === opt.value}
                        onChange={() => setForm({ ...form, deliveryMethod: opt.value })}
                      />
                      <div className="icon">{opt.icon}</div>
                      <strong>{opt.label}</strong>
                      <small>{opt.sub}</small>
                    </label>
                  ))}
                </div>

                {form.deliveryMethod === 'domicilio' && (
                  <div style={{ marginTop: '.875rem', background: 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border)' }}>
                    <div className="form-row">
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label htmlFor="checkout-address">Calle, número, depto / villa *</label>
                        <input
                          id="checkout-address"
                          type="text"
                          placeholder="Ej: Av. Vicuña Mackenna 1234, Depto 502"
                          value={form.deliveryAddress}
                          onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
                          className={errors.deliveryAddress ? 'error' : ''}
                          autoComplete="street-address"
                        />
                        {errors.deliveryAddress && <p className="form-error">⚠ {errors.deliveryAddress}</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="checkout-commune">Comuna *</label>
                        <input
                          id="checkout-commune"
                          type="text"
                          placeholder="Ej: San Miguel"
                          value={form.commune}
                          onChange={(e) => setForm({ ...form, commune: e.target.value })}
                          className={errors.commune ? 'error' : ''}
                          autoComplete="address-level2"
                        />
                        {errors.commune && <p className="form-error">⚠ {errors.commune}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Sección 3: Método de pago ── */}
              <div className="form-section">
                <div className="form-section__label">
                  💳 Método de pago preferido
                </div>

                <div className="payment-options">
                  {paymentOptions.map((p) => (
                    <label
                      key={p.value}
                      className={`payment-option${form.paymentMethod === p.value ? ' selected' : ''}`}
                      onClick={() => setForm({ ...form, paymentMethod: p.value })}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={p.value}
                        checked={form.paymentMethod === p.value}
                        onChange={() => setForm({ ...form, paymentMethod: p.value })}
                      />
                      <strong>{p.label}</strong>
                      <small>{p.sub}</small>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Notas ── */}
              <div className="form-section" style={{ marginBottom: '.75rem' }}>
                <div className="form-group">
                  <label htmlFor="checkout-notes">
                    Notas / instrucciones de entrega
                    <span style={{ fontWeight: 500, color: 'var(--light)', marginLeft: '.4rem' }}>(opcional)</span>
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows={2}
                    placeholder="Ej: Dejar en conserjería, llamar antes de llegar..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              </div>

              {/* ── Vista previa mensaje ── */}
              <div style={{ marginBottom: '1rem' }}>
                <button
                  type="button"
                  className="msg-preview-toggle"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  👁 {showPreview ? 'Ocultar vista previa' : 'Ver mensaje que se enviará por WhatsApp'}
                </button>
                {showPreview && (
                  <pre className="msg-preview">{previewMessage}</pre>
                )}
              </div>

              {/* ── Submit ── */}
              <button
                type="submit"
                className="btn btn-whatsapp btn-full btn-lg"
                style={{ justifyContent: 'center' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Enviar Pedido a WhatsApp
              </button>

              <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--light)', marginTop: '.625rem' }}>
                Se abrirá WhatsApp con el mensaje estructurado. El equipo de Disalma confirma en minutos.
              </p>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
