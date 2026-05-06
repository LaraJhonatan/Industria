import http from './http'

export const categoriesApi = {
  getTree: () => http.get('/categories/tree'),
  getById: (id) => http.get(`/categories/${id}`),
  getAtributos: (id) => http.get(`/categories/${id}/atributos`),
  create: (dto) => http.post('/categories', dto),
  update: (id, dto) => http.patch(`/categories/${id}`, dto),
  createAtributo: (dto) => http.post('/categories/atributos', dto),
  updateAtributo: (id, dto) => http.patch(`/categories/atributos/${id}`, dto),
  createOpcion: (dto) => http.post('/categories/atributos/opciones', dto),
  deleteOpcion: (id) => http.delete(`/categories/atributos/opciones/${id}`),
}
