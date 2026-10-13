-- =======================================================
-- SQL INICIAL: CREACIÓN DE TABLA DE PRODUCTOS Y STORAGE
-- =======================================================

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT DEFAULT '',
    description TEXT DEFAULT '',
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    format TEXT NOT NULL DEFAULT 'Bidón 5 Litros',
    price NUMERIC NOT NULL DEFAULT 0,
    regular_price NUMERIC NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    sku TEXT DEFAULT '',
    rating NUMERIC DEFAULT 5.0,
    reviews_count INT DEFAULT 1,
    benefits JSONB DEFAULT '[]'::jsonb,
    usage_instructions TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso (Cualquiera puede leer el catálogo, y lectura/escritura pública con la anon key para el admin simple)
DROP POLICY IF EXISTS "Permitir lectura publica" ON public.products;
CREATE POLICY "Permitir lectura publica" 
ON public.products FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir insertar productos" ON public.products;
CREATE POLICY "Permitir insertar productos" 
ON public.products FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar productos" ON public.products;
CREATE POLICY "Permitir actualizar productos" 
ON public.products FOR UPDATE 
USING (true);

DROP POLICY IF EXISTS "Permitir borrar productos" ON public.products;
CREATE POLICY "Permitir borrar productos" 
ON public.products FOR DELETE 
USING (true);

-- 4. Crear Storage Bucket para las fotos de productos (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage para fotos públicas
DROP POLICY IF EXISTS "Fotos de productos publicas" ON storage.objects;
CREATE POLICY "Fotos de productos publicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Permitir subir fotos de productos" ON storage.objects;
CREATE POLICY "Permitir subir fotos de productos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Permitir actualizar fotos de productos" ON storage.objects;
CREATE POLICY "Permitir actualizar fotos de productos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Permitir borrar fotos de productos" ON storage.objects;
CREATE POLICY "Permitir borrar fotos de productos"
ON storage.objects FOR DELETE
USING (bucket_id = 'products');
