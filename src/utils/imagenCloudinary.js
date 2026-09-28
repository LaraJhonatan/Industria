// Pide a Cloudinary la imagen ya redimensionada al tamaño en que se muestra (≈2x para pantallas
// de alta densidad), en lugar de mandar el original de miles de píxeles. Reducir una foto grande
// 8–10 veces en el navegador la deja serruchada ("pixelada"), sobre todo en Chrome/Windows; además
// así pesa mucho menos. Las URL que no son de Cloudinary (fotos por defecto, links pegados) se
// devuelven tal cual.

/**
 * Forma de cada espacio de imagen del módulo de logística. `aspecto` es ancho/alto y se usa igual
 * en el recorte al subir (el usuario elige el encuadre) y al mostrar, para que lo que se recorta sea
 * exactamente lo que se ve. `ancho` es el máximo en píxeles con que se guarda el recorte.
 */
export const RECORTES = {
  banner: { aspecto: 3 / 2, ancho: 1500, etiqueta: 'Banner de inicio' },
  encabezado: { aspecto: 40 / 11, ancho: 2400, etiqueta: 'Encabezado del cotizador' },
  vehiculo: { aspecto: 4 / 3, ancho: 1200, etiqueta: 'Foto del vehículo' },
}

/**
 * Transformaciones de Cloudinary para mostrar cada espacio. Con fotos recortadas al subir, la forma
 * ya coincide y c_fill solo reduce; para fotos antiguas sin recortar, g_auto centra en lo importante
 * y en vehículos se ancla abajo (g_south) para no cortar llantas ni parachoques.
 */
export const TAMANOS = {
  banner: 'c_fill,g_auto,w_720,h_480',
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
