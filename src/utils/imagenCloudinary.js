// Pide a Cloudinary la imagen ya redimensionada al tamaño en que se muestra (≈2x para pantallas
// de alta densidad), en lugar de mandar el original de miles de píxeles. Reducir una foto grande
// 8–10 veces en el navegador la deja serruchada ("pixelada"), sobre todo en Chrome/Windows; además
// así pesa mucho menos. Las URL que no son de Cloudinary (fotos por defecto, links pegados) se
// devuelven tal cual.

/**
 * Tamaños de uso en el módulo de logística. g_auto recorta centrado en lo importante; para las fotos
 * de vehículo se ancla abajo (g_south): el vehículo está en el piso y lo que sobra suele ser cielo o
 * edificios, así no se cortan llantas ni parachoques en fotos verticales.
 */
export const TAMANOS = {
  banner: 'c_fill,g_auto,w_700,h_470',
  encabezado: 'c_fill,g_auto,w_1600,h_440',
  vehiculo: 'c_fill,g_south,w_480,h_360',
  vistaPrevia: 'c_limit,w_900',
}

export function imagenCloudinary(url, transformacion) {
  if (!url || typeof url !== 'string') return url
  const marcador = '/image/upload/'
  if (!url.includes('res.cloudinary.com') || !url.includes(marcador)) return url
  return url.replace(marcador, `${marcador}${transformacion},q_auto,f_auto/`)
}
