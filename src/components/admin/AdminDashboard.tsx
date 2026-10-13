import React, { useState, useEffect, useRef } from 'react';
import type { Product, Category } from '../../types';
import { 
  getProducts, 
  upsertProduct, 
  deleteProduct, 
  toggleProductStock, 
  uploadProductImage,
  setFeaturedProduct 
} from '../../services/productService';
import { categories as defaultCategories } from '../../data/categories';
import { formatCLP } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  // Autenticación simple estilo PIN / Clave rápida
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Estados de productos
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todas');

  // Modal / Formulario estilo Facebook Marketplace
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  // Campos del formulario
  const [formData, setFormData] = useState({
    title: '',
    categoryId: 'aseo-ropa',
    categoryName: 'Aseo de Ropa',
    format: 'Bidón 5 Litros',
    price: '',
    regularPrice: '',
    shortDescription: '',
    inStock: true,
    featured: false,
    image: ''
  });

  // Imagen cargada local / File
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mensajes de feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('liquialma_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProductsList();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Clave sencilla configurable (por defecto 'alma2026' o '1234')
    if (pinInput === 'alma2026' || pinInput === 'liqui2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('liquialma_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('liquialma_admin_auth');
  };

  const loadProductsList = async () => {
    setLoading(true);
    try {
      const list = await getProducts();
      setProducts(list);
    } catch (err) {
      console.error(err);
      showToast('Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para Crear
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      categoryId: defaultCategories[0]?.id || 'aseo-ropa',
      categoryName: defaultCategories[0]?.name || 'Aseo de Ropa',
      format: 'Bidón 5 Litros',
      price: '',
      regularPrice: '',
      shortDescription: '',
      inStock: true,
      featured: false,
      image: ''
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  // Abrir modal para Editar
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      format: p.format,
      price: p.price.toString(),
      regularPrice: p.regularPrice ? p.regularPrice.toString() : '',
      shortDescription: p.shortDescription || '',
      inStock: p.inStock,
      featured: p.featured,
      image: p.image
    });
    setImageFile(null);
    setImagePreview(p.image);
    setShowModal(true);
  };

  // Manejar selección de foto (desde cámara o galería del teléfono)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar (Crear o Editar)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Ingresa el título del producto');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      alert('Ingresa un precio válido');
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = formData.image || '/images/products/placeholder.webp';

      // Si seleccionó archivo nuevo, subir a Supabase Storage
      if (imageFile) {
        try {
          finalImageUrl = await uploadProductImage(imageFile);
        } catch (upErr: any) {
          console.warn('No se pudo subir a Storage, usando preview:', upErr);
          // Si el bucket de storage no está configurado, usamos la preview base64 o placeholder
          finalImageUrl = imagePreview || finalImageUrl;
        }
      }

      const selectedCat = defaultCategories.find(c => c.id === formData.categoryId);

      const payload: Partial<Product> = {
        id: editingProduct?.id,
        title: formData.title.trim(),
        categoryId: formData.categoryId,
        categoryName: selectedCat ? selectedCat.name : formData.categoryName,
        format: formData.format.trim() || 'Unidad',
        price: Number(formData.price),
        regularPrice: formData.regularPrice ? Number(formData.regularPrice) : Number(formData.price),
        shortDescription: formData.shortDescription.trim(),
        inStock: formData.inStock,
        featured: formData.featured,
        image: finalImageUrl,
        gallery: [finalImageUrl]
      };

      const saved = await upsertProduct(payload);

      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === saved.id ? saved : p));
        showToast('✅ ¡Producto actualizado con éxito!');
      } else {
        setProducts(prev => [saved, ...prev]);
        showToast('🎉 ¡Nuevo producto publicado!');
      }

      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      alert('Error guardando producto: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Toggle rápido de stock
  const handleToggleStock = async (product: Product) => {
    const newStock = !product.inStock;
    // Optimista en UI
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, inStock: newStock } : p));
    try {
      await toggleProductStock(product.id, newStock);
      showToast(newStock ? '🟢 Producto disponible' : '🔴 Marcado como agotado');
    } catch (err) {
      console.error(err);
      // Revertir
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, inStock: !newStock } : p));
      alert('No se pudo cambiar el stock');
    }
  };

  // Marcar como producto estrella de portada
  const handleSetFeatured = async (product: Product) => {
    // Optimista en UI
    setProducts(prev => prev.map(p => ({
      ...p,
      featured: p.id === product.id
    })));

    try {
      await setFeaturedProduct(product.id);
      showToast(`⭐ "${product.title}" ahora es la oferta principal de portada`);
    } catch (err: any) {
      console.error(err);
      alert('Error al asignar producto de portada: ' + err.message);
      loadProductsList();
    }
  };

  // Eliminar producto
  const handleDelete = async (product: Product) => {
    if (!confirm(`¿Eliminar "${product.title}"? Esta acción no se puede deshacer.`)) return;

    setProducts(prev => prev.filter(p => p.id !== product.id));
    try {
      await deleteProduct(product.id);
      showToast('🗑️ Producto eliminado correctamente');
    } catch (err) {
      console.error(err);
      alert('Error eliminando producto');
      loadProductsList();
    }
  };

  // Filtrado
  const filteredProducts = products.filter(p => {
    const matchCat = filterCategory === 'todas' || p.categoryId === filterCategory;
    const matchSearch = !searchTerm.trim() || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.format.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  // Pantalla de Login / PIN
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: '#f8fafc'
      }}>
        <div style={{
          background: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '1.25rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.05)',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--col-yellow, #F59E0B)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.75rem'
          }}>
            🔐
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 .5rem', color: '#0F172A' }}>
            Panel de Administración
          </h2>
          <p style={{ color: '#64748B', fontSize: '.9rem', margin: '0 0 1.5rem' }}>
            LiquiAlma.cl — Gestión rápida de productos y precios
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '.825rem', fontWeight: 700, color: '#334155', marginBottom: '.4rem' }}>
                Clave de acceso:
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '.85rem 1rem',
                  borderRadius: '.75rem',
                  border: pinError ? '2px solid #EF4444' : '1px solid #CBD5E1',
                  fontSize: '1.1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {pinError && (
                <span style={{ color: '#EF4444', fontSize: '.8rem', marginTop: '.35rem', display: 'block' }}>
                  ⚠️ Contraseña incorrecta. Inténtalo de nuevo.
                </span>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '.9rem',
                background: '#0F172A',
                color: 'white',
                border: 'none',
                borderRadius: '.75rem',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background .2s'
              }}
            >
              Ingresar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0F172A',
          color: 'white',
          padding: '.9rem 1.4rem',
          borderRadius: '.75rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
          fontWeight: 600,
          zIndex: 9999,
          animation: 'slideUp .3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header del Panel */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        background: 'white',
        padding: '1.25rem 1.5rem',
        borderRadius: '1rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🧺</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
              Gestión de Productos
            </h1>
            <span style={{
              background: '#FEF3C7',
              color: '#92400E',
              padding: '.2rem .6rem',
              borderRadius: '999px',
              fontSize: '.75rem',
              fontWeight: 700
            }}>
              En vivo
            </span>
          </div>
          <p style={{ margin: '.25rem 0 0', color: '#64748B', fontSize: '.875rem' }}>
            Crea, edita fotos o precios y desactiva productos como en Facebook Marketplace
          </p>
        </div>

        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          <button
            onClick={handleOpenCreate}
            style={{
              background: 'var(--col-red, #DC2626)',
              color: 'white',
              border: 'none',
              padding: '.75rem 1.25rem',
              borderRadius: '.75rem',
              fontWeight: 700,
              fontSize: '.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.25)'
            }}
          >
            <span>➕</span> Publicar Producto
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: '#F1F5F9',
              color: '#64748B',
              border: '1px solid #CBD5E1',
              padding: '.75rem 1rem',
              borderRadius: '.75rem',
              fontWeight: 600,
              fontSize: '.875rem',
              cursor: 'pointer'
            }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o formato (ej. 5L)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '.75rem 1rem',
            borderRadius: '.75rem',
            border: '1px solid #CBD5E1',
            background: 'white',
            fontSize: '.95rem',
            outline: 'none'
          }}
        />

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{
            padding: '.75rem 1rem',
            borderRadius: '.75rem',
            border: '1px solid #CBD5E1',
            background: 'white',
            fontSize: '.95rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="todas">Todas las categorías ({products.length})</option>
          {defaultCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de Productos estilo Tarjetas Facebook / Marketplace */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748B' }}>
          <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>⏳</div>
          <p>Cargando catálogo desde Supabase...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          borderRadius: '1rem',
          border: '1px dashed #CBD5E1'
        }}>
          <p style={{ color: '#64748B', margin: '0 0 1rem' }}>No se encontraron productos con ese filtro.</p>
          <button
            onClick={handleOpenCreate}
            style={{
              background: '#0F172A',
              color: 'white',
              border: 'none',
              padding: '.65rem 1.25rem',
              borderRadius: '.5rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Publicar el primero
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredProducts.map(prod => (
            <div
              key={prod.id}
              style={{
                background: 'white',
                borderRadius: '1rem',
                border: prod.inStock ? '1px solid #E2E8F0' : '1px solid #FECACA',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                opacity: prod.inStock ? 1 : 0.82,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Imagen con badges */}
              <div style={{ position: 'relative', height: '190px', background: '#F8FAFC' }}>
                <img
                  src={prod.image || '/images/products/placeholder.webp'}
                  alt={prod.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '.5rem'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/categories/ropa.webp';
                  }}
                />

                {/* Badge de Stock */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  gap: '.35rem'
                }}>
                  <span style={{
                    background: prod.inStock ? '#10B981' : '#EF4444',
                    color: 'white',
                    padding: '.25rem .6rem',
                    borderRadius: '999px',
                    fontSize: '.7rem',
                    fontWeight: 700
                  }}>
                    {prod.inStock ? 'Disponible' : 'Agotado'}
                  </span>
                  {prod.featured && (
                    <span style={{
                      background: '#F59E0B',
                      color: '#000',
                      padding: '.25rem .6rem',
                      borderRadius: '999px',
                      fontSize: '.7rem',
                      fontWeight: 700
                    }}>
                      ⭐ Destacado
                    </span>
                  )}
                </div>

                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: 'white',
                  padding: '.2rem .55rem',
                  borderRadius: '.5rem',
                  fontSize: '.72rem',
                  fontWeight: 600
                }}>
                  {prod.format}
                </span>
              </div>

              {/* Información del Producto */}
              <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: '.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: '#64748B',
                  letterSpacing: '.05em'
                }}>
                  {prod.categoryName}
                </span>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  margin: '.3rem 0 .5rem',
                  color: '#0F172A',
                  lineHeight: 1.3
                }}>
                  {prod.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', marginBottom: '.75rem' }}>
                  <span style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--col-red, #DC2626)'
                  }}>
                    {formatCLP(prod.price)}
                  </span>
                  {prod.regularPrice > prod.price && (
                    <span style={{
                      fontSize: '.85rem',
                      color: '#94A3B8',
                      textDecoration: 'line-through'
                    }}>
                      {formatCLP(prod.regularPrice)}
                    </span>
                  )}
                </div>

                {/* Botón Destacar en Portada (Estrella) */}
                <button
                  onClick={() => handleSetFeatured(prod)}
                  title={prod.featured ? 'Producto estrella actual de la portada' : 'Poner este producto como oferta principal en la portada'}
                  style={{
                    width: '100%',
                    padding: '.5rem',
                    marginBottom: '.5rem',
                    borderRadius: '.5rem',
                    border: prod.featured ? '2px solid #F59E0B' : '1px dashed #CBD5E1',
                    background: prod.featured ? '#FEF3C7' : '#F8FAFC',
                    color: prod.featured ? '#92400E' : '#475569',
                    fontSize: '.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.35rem',
                    transition: 'all .2s'
                  }}
                >
                  {prod.featured ? '⭐ Oferta Principal de Portada' : '☆ Poner en Portada del Sitio'}
                </button>

                {/* Acciones Rápidas (Estilo Facebook) */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '.75rem',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  gap: '.5rem'
                }}>
                  <button
                    onClick={() => handleToggleStock(prod)}
                    title={prod.inStock ? 'Pausar stock' : 'Activar stock'}
                    style={{
                      flex: 1,
                      padding: '.55rem',
                      borderRadius: '.5rem',
                      border: '1px solid #CBD5E1',
                      background: prod.inStock ? '#F8FAFC' : '#FEF2F2',
                      color: prod.inStock ? '#334155' : '#EF4444',
                      fontSize: '.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {prod.inStock ? '⏸️ Pausar' : '▶️ Activar'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(prod)}
                    style={{
                      flex: 1,
                      padding: '.55rem',
                      borderRadius: '.5rem',
                      border: 'none',
                      background: '#0F172A',
                      color: 'white',
                      fontSize: '.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    onClick={() => handleDelete(prod)}
                    style={{
                      padding: '.55rem .75rem',
                      borderRadius: '.5rem',
                      border: '1px solid #FCA5A5',
                      background: '#FFF5F5',
                      color: '#DC2626',
                      fontSize: '.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL CREAR / EDITAR — ESTILO FACEBOOK MARKETPLACE      */}
      {/* ======================================================== */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 10000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1.25rem',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header del Modal */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                  {editingProduct ? '✏️ Editar Producto' : '📸 Crear Publicación de Producto'}
                </h2>
                <span style={{ fontSize: '.8rem', color: '#64748B' }}>
                  Aparecerá en LiquiAlma.cl al presionar Guardar
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                ✕
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmitProduct} style={{ padding: '1.5rem' }}>
              
              {/* Sección Subir Foto (Estilo Facebook) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#334155', marginBottom: '.5rem' }}>
                  Foto del producto (cámara o galería)
                </label>
                
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#F8FAFC',
                    transition: 'border .2s'
                  }}
                >
                  {imagePreview ? (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        style={{
                          maxHeight: '180px',
                          margin: '0 auto',
                          borderRadius: '.5rem',
                          objectFit: 'contain'
                        }}
                      />
                      <p style={{ color: '#0F172A', fontSize: '.85rem', fontWeight: 600, margin: '.6rem 0 0' }}>
                        🔄 Toca aquí para cambiar la imagen
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📷</div>
                      <p style={{ color: '#0F172A', fontWeight: 700, margin: '0 0 .25rem' }}>
                        Toca para subir foto desde tu teléfono o PC
                      </p>
                      <span style={{ color: '#94A3B8', fontSize: '.8rem' }}>
                        Formatos JPG, PNG, WEBP
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Título */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#334155', marginBottom: '.4rem' }}>
                  Nombre del producto *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Detergente Líquido Azul Concentrado 5L"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem .9rem',
                    borderRadius: '.65rem',
                    border: '1px solid #CBD5E1',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Fila: Categoría y Formato */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#334155', marginBottom: '.4rem' }}>
                    Categoría
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={e => {
                      const cat = defaultCategories.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        categoryName: cat?.name || 'Aseo General'
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '.75rem .9rem',
                      borderRadius: '.65rem',
                      border: '1px solid #CBD5E1',
                      fontSize: '.95rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    {defaultCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#334155', marginBottom: '.4rem' }}>
                    Presentación / Formato
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Bidón 5 Litros, Unidad, Pack"
                    value={formData.format}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '.75rem .9rem',
                      borderRadius: '.65rem',
                      border: '1px solid #CBD5E1',
                      fontSize: '.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Fila: Precios */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#DC2626', marginBottom: '.4rem' }}>
                    Precio Liquidadora ($ CLP) *
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 5990"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '.75rem .9rem',
                      borderRadius: '.65rem',
                      border: '2px solid #FCA5A5',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#DC2626',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#64748B', marginBottom: '.4rem' }}>
                    Precio Normal Mercado ($ CLP)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 9990 (para mostrar el ahorro)"
                    value={formData.regularPrice}
                    onChange={e => setFormData({ ...formData, regularPrice: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '.75rem .9rem',
                      borderRadius: '.65rem',
                      border: '1px solid #CBD5E1',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Descripción */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 700, color: '#334155', marginBottom: '.4rem' }}>
                  Descripción breve
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalle o modo de uso que verá el cliente..."
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '.75rem .9rem',
                    borderRadius: '.65rem',
                    border: '1px solid #CBD5E1',
                    fontSize: '.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Switches de Estado */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1rem',
                background: '#F8FAFC',
                borderRadius: '.75rem',
                marginBottom: '1.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>🟢 Hay Stock Disponible</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>⭐ Destacar en Portada</span>
                </label>
              </div>

              {/* Botones de acción */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  style={{
                    padding: '.8rem 1.4rem',
                    borderRadius: '.75rem',
                    border: '1px solid #CBD5E1',
                    background: 'white',
                    color: '#64748B',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '.8rem 1.75rem',
                    borderRadius: '.75rem',
                    border: 'none',
                    background: 'var(--col-red, #DC2626)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  {saving ? 'Guardando en Supabase...' : (editingProduct ? 'Guardar Cambios' : 'Publicar Ahora')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
