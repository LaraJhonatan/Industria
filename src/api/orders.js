import http from './http'

export const ordersApi = {
  checkout: (datosEnvio) => http.post('/orders/checkout', datosEnvio),
  getMine: () => http.get('/orders'),
  getById: (id) => http.get(`/orders/${id}`),
  getComprobante: (id) => http.get(`/orders/${id}/comprobante`, { responseType: 'blob' }),

  // Órdenes manuales (dashboard de empresa) — ventas fuera de PSE, ej. pagadas por transferencia.
  getManual: () => http.get('/orders/manual'),
  createManual: (payload) => http.post('/orders/manual', payload),
  updateManual: (id, payload) => http.patch(`/orders/manual/${id}`, payload),
  marcarPagadaManual: (id, medioPago) => http.patch(`/orders/manual/${id}/pagar`, { medioPago }),
}
