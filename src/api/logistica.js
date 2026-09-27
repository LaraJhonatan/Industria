import axios from 'axios'
import http from './http'

// Cotizador público: no exige sesión y nunca redirige a /auth ante un 401. Si hay sesión, envía el
// token para que la cotización quede asociada a la cuenta.
const publicHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 20000,
})

publicHttp.interceptors.request.use((config) => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem('ZIFCOR_sesion') || 'null') || {}
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  } catch { void 0 }
  return config
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
  /**
   * Abre el PDF en una pestaña nueva. Se descarga con la sesión (las cotizaciones con dueño la exigen),
   * por eso no sirve un enlace directo. Llamar desde el clic: la pestaña se abre antes del primer await
   * para que el navegador no la bloquee.
   */
  abrirPdf: async (token) => {
    const ventana = window.open('', '_blank')
    try {
      const { data } = await publicHttp.get(`/logistica/cotizaciones/${token}/pdf`, { responseType: 'blob' })
      const url = URL.createObjectURL(data)
      if (ventana) ventana.location.href = url
      else window.location.href = url
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (e) {
      ventana?.close()
      // Con responseType 'blob' el mensaje de error del API llega como Blob: se convierte a JSON.
      if (e?.response?.data instanceof Blob) {
        try { e.response.data = JSON.parse(await e.response.data.text()) } catch { void 0 }
      }
      throw e
    }
  },
  resumenCotizaciones: (tokens) => publicHttp.post('/logistica/cotizaciones/resumen', { tokens }),
  buscarCotizacion: (numero, email) => publicHttp.post('/logistica/cotizaciones/buscar', { numero, email }),
  misCotizaciones: () => publicHttp.get('/logistica/mis-cotizaciones'),

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
