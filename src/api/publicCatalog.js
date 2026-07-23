import axios from 'axios'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

export const publicApi = {
  getSectores: () => http.get('/public/sectores'),

  getEmpresasBySector: (slug) => http.get(`/public/sectores/${slug}/empresas`),

  getEmpresa: (id) => http.get(`/public/empresas/${id}`),

  getEmpresaPorSlug: (slug) => http.get(`/public/empresas/slug/${slug}`),

  getProductosEmpresa: (id, params) => http.get(`/public/empresas/${id}/productos`, { params }),

  getProducto: (id) => http.get(`/public/productos/${id}`),

  getProductoPorSlug: (slug) => http.get(`/public/productos/slug/${slug}`),

  searchProductos: (params) => http.get('/public/productos/search', { params }),
  enviarContacto: (data) => http.post('/public/contacto', data),
  enviarSolicitudMaquinaria: (data) => http.post('/public/maquinaria', data),
  getProductosEmpresaPorSlug: (slug, params) =>
    http.get(`/public/empresas/slug/${slug}/productos`, { params }),
  getDestacados: (llave) => http.get(`/destacados/${llave}`),
}
