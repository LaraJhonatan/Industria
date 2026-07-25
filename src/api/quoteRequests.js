import http from './http'

export const quoteRequestsApi = {
  create: (payload) => http.post('/quote-requests', payload),
  getMine: () => http.get('/quote-requests/mine'),
  getForEmpresa: () => http.get('/quote-requests/empresa'),
  marcarAtendida: (id) => http.patch(`/quote-requests/${id}/atendida`),
}
