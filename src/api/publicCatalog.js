import axios from 'axios'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

export const publicApi = {
  getSectores: () => http.get('/public/sectores'),

  getEmpresasBySector: (slug) => http.get(`/public/sectores/${slug}/empresas`),

  getEmpresa: (id) => http.get(`/public/empresas/${id}`),

  getProductosEmpresa: (id, params) => http.get(`/public/empresas/${id}/productos`, { params }),

  getProducto: (productoId) => http.get(`/public/productos/${productoId}`),

  searchProductos: (params) => http.get('/public/productos/search', { params }),
}
