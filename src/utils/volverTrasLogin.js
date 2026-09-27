// Página a la que se vuelve después de iniciar sesión (p. ej. una cotización privada).
// Se guarda en sessionStorage para sobrevivir al ida y vuelta del login con Google.
// Solo se aceptan rutas internas de la tienda, para no permitir redirecciones a otros sitios.
const CLAVE = 'ZIFCOR_volver'

const esValida = (ruta) => typeof ruta === 'string' && ruta.startsWith('/tienda/') && !ruta.startsWith('//')

/** Guarda la ruta si es válida; si no, borra cualquier valor anterior. */
export function recordarVolver(ruta) {
  try {
    if (esValida(ruta)) sessionStorage.setItem(CLAVE, ruta)
    else sessionStorage.removeItem(CLAVE)
  } catch { void 0 }
}

/** Devuelve la ruta guardada (una sola vez) o null. */
export function tomarVolver() {
  try {
    const ruta = sessionStorage.getItem(CLAVE)
    sessionStorage.removeItem(CLAVE)
    return esValida(ruta) ? ruta : null
  } catch {
    return null
  }
}
