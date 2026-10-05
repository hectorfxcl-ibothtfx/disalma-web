export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName: string;
  format: string; // ej: "5 Litros", "1 Litro", "Bidón 20L", "Caja 12 unidades"
  price: number;
  regularPrice: number; // Precio de referencia mercado para mostrar ahorro
  featured: boolean;
  inStock: boolean;
  image: string;
  gallery: string[];
  sku: string;
  rating: number;
  reviewsCount: number;
  benefits: string[];
  usageInstructions?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  itemCount: number;
  popularSearch: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'retiro' | 'domicilio' | 'whatsapp';
export type PaymentMethod = 'efectivo' | 'transferencia' | 'tarjeta' | 'link';

export interface OrderFormState {
  customerName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  commune: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
  avatar?: string;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  domain: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  city: string;
  region: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  rut: string;
  deliveryNotice: string;
  minOrderAmount: number;
}
