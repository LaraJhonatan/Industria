import http from './http'

export const ordersApi = {
  checkout: (datosEnvio) => http.post('/orders/checkout', datosEnvio),
  getMine: () => http.get('/orders'),
  getById: (id) => http.get(`/orders/${id}`),
}
