import { next } from '@vercel/edge'

// El sitio es una SPA (Vue/Quasar): los <meta og:*> reales se arman en el
// cliente con JS (ver ProductPublicDetailPage.vue -> useHead). Los bots de
// WhatsApp/Facebook/Twitter/etc. no ejecutan JS, así que solo ven los meta
// tags genéricos de index.html. Este middleware detecta esos bots en las
// URLs de producto y les responde un HTML estático ya armado con los datos
// reales del producto (título, descripción, imagen). Los navegadores
// normales pasan de largo (next()) y reciben la SPA de siempre.
const BOT_UA_REGEX =
  /facebookexternalhit|Facebot|WhatsApp|Twitterbot|TelegramBot|Slackbot|LinkedInBot|Discordbot|SkypeUriPreview|Pinterest|redditbot|Applebot|vkShare|W3C_Validator|Google-InspectionTool|Googlebot|AdsBot-Google|Bingbot|DuckDuckBot|iMessage/i

const SITE_URL = 'https://www.zifcor.com'

export const config = {
  matcher: ['/tienda/producto/:slug', '/tienda/:sector/:empresa/producto/:slug'],
}

function escapeHtml(str = '') {
  return String(str).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  if (!BOT_UA_REGEX.test(ua)) return next()

  const url = new URL(request.url)
  const slug = url.pathname.match(/\/producto\/([^/]+)\/?$/)?.[1]
  const apiUrl = process.env.VITE_API_URL
  if (!slug || !apiUrl) return next()

  try {
    const res = await fetch(`${apiUrl}/api/public/productos/slug/${encodeURIComponent(slug)}`)
    if (!res.ok) return next()
    const product = await res.json()
    if (!product) return next()

    const empresaNombre = escapeHtml(
      product.empresa?.profile?.nombreComercial || product.empresa?.razonSocial || 'ZIFCOR'
    )
    const esZifcor = /^zifcor/i.test(empresaNombre.trim())
    const nombreProducto = escapeHtml(product.nombre || 'Producto')
    const title = esZifcor ? `${nombreProducto} | ZIFCOR` : `${nombreProducto} | ${empresaNombre} | ZIFCOR`

    const rawDesc =
      product.descripcion?.trim() ||
      `Compra ${product.nombre} en ZIFCOR, marketplace industrial B2B en Colombia. Cotiza directo con ${empresaNombre}.`
    const description = escapeHtml(rawDesc.length > 155 ? `${rawDesc.slice(0, 152)}...` : rawDesc)

    const image = escapeHtml(product.imagenes?.[0]?.url || `${SITE_URL}/icons/favicon-128x128.png`)
    const canonical = escapeHtml(`${SITE_URL}${url.pathname}`)

    const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="ZIFCOR" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${image}" />
<meta property="og:locale" content="es_CO" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<meta http-equiv="refresh" content="0; url=${canonical}" />
</head>
<body></body>
</html>`

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=600',
      },
    })
  } catch {
    return next()
  }
}
