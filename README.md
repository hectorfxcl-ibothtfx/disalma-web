# Disalma.cl — Liquidadora Alma Janette

Sitio web profesional, rápido y responsive para la empresa de distribución de útiles de aseo y limpieza **Liquidadora Alma Janette (Disalma.cl)**, construido con **Astro** y sistema de **Carrito de Compras con Pedidos por WhatsApp** (inspirado en la experiencia ágil de *Pedix.app*).

---

## 🚀 Características Principales

### 🧺 Carrito de Compras & Checkout por WhatsApp (Tipo Pedix.app)
- **Persistencia Local (`localStorage`):** El carrito no se pierde al recargar o cambiar de página.
- **Isla Interactiva Sincronizada:** Botón de carrito flotante en móvil y escritorio, contador dinámico en la cabecera y panel lateral desplegable (*slide-over drawer*).
- **Gestión de Cantidades:** Aumentar, disminuir y eliminar productos en tiempo real, con cálculo automático del subtotal y ahorro respecto al precio de mercado.
- **Formulario de Pedido:**
  - Nombre y apellido
  - Teléfono celular WhatsApp
  - Método de entrega: *Envío a domicilio*, *Retiro en local* (San Miguel) o *Coordinar por WhatsApp*
  - Dirección y comuna (para despacho)
  - Método de pago preferido: *Transferencia*, *Efectivo*, *Tarjeta POS* o *Link Webpay*
  - Notas o indicaciones especiales
- **Generación del Mensaje:** Genera automáticamente un texto formateado con emojis, viñetas, cantidades, valores unitarios, subtotales, totales y datos del cliente.
- **Redirección Directa:** Abre automáticamente WhatsApp a la línea oficial (`+56 9 5633 3906` / `56956333906`) con el texto codificado listo para enviar.

---

## 🎨 Identidad Visual y Diseño
- **Colores de Marca:**
  - **Amarillo vibrante:** Identidad, energía, frescura y confianza.
  - **Negro profundo:** Tipografía nítida y contraste profesional.
  - **Rojo:** Destacado de precios de liquidación, etiquetas de ahorro (-40%) y botones de acción.
- **Emblema Gráfico:** Balanza que equilibra productos de limpieza (bidones 5L, atomizadores y detergentes), simbolizando peso exacto, fórmulas concentradas y ahorro para el bolsillo.
- **Mobile-First:** Interfaz táctil, botones grandes y lectura fluida en smartphones.

---

## 📁 Estructura del Proyecto

```text
web/
├── public/
│   ├── images/
│   │   ├── categories/       # Identificadores visuales de categorías
│   │   └── products/         # Bidones de 5L y productos de aseo
│   ├── robots.txt            # Reglas para motores de búsqueda
│   └── sitemap.xml           # Mapa de rutas SEO
├── src/
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx           # Panel lateral del carrito
│   │   │   ├── CheckoutModal.tsx        # Modal de checkout y WhatsApp
│   │   │   ├── FloatingCartButton.tsx   # Botón flotante con subtotal
│   │   │   ├── GlobalCartContainer.tsx  # Contenedor global de islas
│   │   │   └── HeaderCartButton.tsx     # Botón y badge en el navbar
│   │   ├── catalog/
│   │   │   └── CatalogIsland.tsx        # Buscador y filtros de categoría
│   │   ├── common/
│   │   │   ├── Header.astro             # Barra de navegación superior
│   │   │   ├── Footer.astro             # Pie de página y datos legales
│   │   │   └── Logo.astro               # Logotipo con balanza
│   │   └── product/
│   │       └── AddToCartButton.tsx      # Botón interactivo de compra (+/-)
│   ├── data/
│   │   ├── business.ts       # Datos de contacto, RUT, dirección y WhatsApp
│   │   ├── categories.ts     # Categorías (Ropa, Cocina, Baño, General)
│   │   ├── products.ts       # Catálogo de 16 productos con precios y ahorro
│   │   └── testimonials.ts   # Testimonios reales de clientes en Chile
│   ├── layouts/
│   │   └── Layout.astro      # Master layout con OpenGraph y JSON-LD Schema
│   ├── pages/
│   │   ├── index.astro       # Portada (Hero, categorías, destacados, pasos)
│   │   ├── catalogo/
│   │   │   └── index.astro   # Catálogo interactivo con buscador
│   │   ├── categorias/
│   │   │   └── [slug].astro  # Páginas dinámicas de categoría
│   │   ├── productos/
│   │   │   └── [slug].astro  # Páginas dinámicas de detalle de producto
│   │   ├── nosotros.astro    # Historia de Alma Janette, misión y valores
│   │   └── contacto.astro    # Formulario, horarios, mapa y preguntas frecuentes
│   ├── stores/
│   │   └── cartStore.ts      # Estado reactivo del carrito en localStorage
│   ├── styles/
│   │   └── global.css        # Estilos, variables CSS y tipografía
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript compartidos
│   └── utils/
│       ├── formatters.ts     # Formato de moneda chilena ($ CLP)
│       └── whatsappOrder.ts  # Generador del mensaje estructurado para WhatsApp
├── astro.config.mjs
└── package.json
```

---

## 🔌 Arquitectura Lista para Supabase

Toda la información del negocio, categorías y catálogo de productos está desacoplada en la carpeta `src/data/`. Cuando desees integrar **Supabase**, solo bastará con:
1. Instalar `@supabase/supabase-js`.
2. Crear un cliente en `src/lib/supabase.ts`.
3. Reemplazar las funciones de lectura en `src/data/products.ts` y `src/data/categories.ts` por llamadas a la API de Supabase, manteniendo los mismos componentes visuales y el flujo de carrito sin tener que rehacer la web.

---

## 🛠️ Comandos de Ejecución

- **Iniciar servidor de desarrollo:**
  ```bash
  npm run dev
  ```
  Accede a `http://localhost:4321`.

- **Compilar para producción:**
  ```bash
  npm run build
  ```
  Genera las 24 páginas en formato HTML estático ultra rápido en la carpeta `dist/`.

- **Previsualizar compilación:**
  ```bash
  npm run preview
  ```
