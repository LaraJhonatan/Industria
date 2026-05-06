import http from './http'

export const productsApi = {
  create: (dto) => http.post('/products', dto),
  getAll: (params) => http.get('/products', { params }),
  getById: (id) => http.get(`/products/${id}`),
  update: (id, dto) => http.patch(`/products/${id}`, dto),
  changeStatus: (id, dto) => http.patch(`/products/${id}/estado`, dto),
  delete: (id) => http.delete(`/products/${id}`),
}
