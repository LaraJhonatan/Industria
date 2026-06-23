import axios from 'axios'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

export const publicApi = {
  getSectores: () => http.get('/public/sectores'),

  getEmpresasBySector: (slug) => http.get(`/public/sectores/${slug}/empresas`),

  // Por ID (legacy / uso interno)
  getEmpresa: (id) => http.get(`/public/empresas/${id}`),
  // Por slug (URL amigable compartible)
  getEmpresaPorSlug: (slug) => http.get(`/public/empresas/slug/${slug}`),

  getProductosEmpresa: (id, params) => http.get(`/public/empresas/${id}/productos`, { params }),

  // Por ID (legacy / uso interno)
  getProducto: (id) => http.get(`/public/productos/${id}`),
  // Por slug (URL amigable compartible)
  getProductoPorSlug: (slug) => http.get(`/public/productos/slug/${slug}`),

  searchProductos: (params) => http.get('/public/productos/search', { params }),
  enviarContacto: (data) => http.post('/public/contacto', data),
  enviarSolicitudMaquinaria: (data) => http.post('/public/maquinaria', data),
  getProductosEmpresaPorSlug: (slug, params) =>
    http.get(`/public/empresas/slug/${slug}/productos`, { params }),
  getDestacados: (llave) => http.get(`/destacados/${llave}`),
}
