import http from './http'

// Órdenes de compra — requieren estar logueado como usuario (Gmail).
export const ordersApi = {
  checkout: (datosEnvio) => http.post('/orders/checkout', datosEnvio),
  getMine: () => http.get('/orders'),
  getById: (id) => http.get(`/orders/${id}`),
}
