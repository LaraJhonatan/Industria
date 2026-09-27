// Cotizaciones de transporte que este navegador generó o abrió, para volver a ellas y pagarlas.
// Solo se guardan los tokens (el enlace privado); el estado real se consulta al API.
const CLAVE = 'ZIFCOR_cotizaciones_logistica'
const MAXIMO = 20

export function tokensGuardados() {
  try {
    const lista = JSON.parse(localStorage.getItem(CLAVE) || '[]')
    return Array.isArray(lista) ? lista.filter((t) => typeof t === 'string').slice(0, MAXIMO) : []
  } catch {
    return []
  }
}

export function guardarCotizacion(token) {
  if (!token) return
  try {
    const lista = [token, ...tokensGuardados().filter((t) => t !== token)].slice(0, MAXIMO)
    localStorage.setItem(CLAVE, JSON.stringify(lista))
  } catch { void 0 }
}

export function olvidarCotizacion(token) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tokensGuardados().filter((t) => t !== token)))
  } catch { void 0 }
}
