import axios from 'axios'

const http = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api',
  timeout: 15000,
})

export const publicApi = {
  getSectores: () => http.get('/public/sectores'),
  getEmpresasBySector: (slug) => http.get(`/public/sectores/${slug}/empresas`),
  getEmpresa: (id) => http.get(`/public/empresas/${id}`),
  getProductosEmpresa: (id, params) => http.get(`/public/empresas/${id}/productos`, { params }),
  getProducto: (productoId) => http.get(`/public/productos/${productoId}`),
}
