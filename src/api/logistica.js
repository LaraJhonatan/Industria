import axios from 'axios'
import http from './http'

// Cotizador público: sin sesión (no redirige a /auth ante un 401).
const publicHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 20000,
})

export const logisticaApi = {
  getCatalogo: () => publicHttp.get('/logistica/catalogo'),
  getImagenes: () => publicHttp.get('/logistica/imagenes'),
  cotizar: (payload) => publicHttp.post('/logistica/cotizar', payload),
  confirmar: (payload) => publicHttp.post('/logistica/cotizaciones', payload),
  getCotizacion: (token) => publicHttp.get(`/logistica/cotizaciones/${token}`),
  iniciarPago: (token) => publicHttp.post(`/logistica/cotizaciones/${token}/pago`),
  verificarPago: (token, transactionId) =>
    publicHttp.post(`/logistica/cotizaciones/${token}/verificar-pago`, { transactionId }),
  pdfUrl: (token) => `${import.meta.env.VITE_API_URL}/api/logistica/cotizaciones/${token}/pdf`,

  // Dashboard: solo empresas autorizadas en logistica_editores.
  getPermiso: () => http.get('/logistica/admin/permiso'),
  getDatosAdmin: () => http.get('/logistica/admin/datos'),
  crearVehiculo: (payload) => http.post('/logistica/admin/vehiculos', payload),
  actualizarVehiculo: (id, payload) => http.patch(`/logistica/admin/vehiculos/${id}`, payload),
  crearRuta: (payload) => http.post('/logistica/admin/rutas', payload),
  actualizarRuta: (id, payload) => http.patch(`/logistica/admin/rutas/${id}`, payload),
  guardarTarifas: (items) => http.put('/logistica/admin/tarifas', { items }),
  crearServicio: (payload) => http.post('/logistica/admin/servicios', payload),
  actualizarServicio: (id, payload) => http.patch(`/logistica/admin/servicios/${id}`, payload),
  getCotizacionesAdmin: () => http.get('/logistica/admin/cotizaciones'),
  guardarImagenes: (payload) => http.put('/logistica/admin/imagenes', payload),
}
