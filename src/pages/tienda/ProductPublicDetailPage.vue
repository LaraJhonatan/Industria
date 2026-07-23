<template>
  <section class="detail-section">
    <div class="bs-wrap">
      <div v-if="loading" class="loading-wrap column items-center justify-center">
        <q-spinner color="blue-6" size="42px" />
        <p class="loading-text">Cargando producto...</p>
      </div>

      <template v-else-if="product">
        <nav class="breadcrumb">
          <span class="bc-link" @click="goBackToSectores()">
            {{ route.params.sectorSlug ? 'Sectores' : 'Volver' }}
          </span>
          <template v-if="route.params.sectorSlug">
            <span class="bc-sep">›</span>
            <span class="bc-link" @click="goBackToStore()">{{ empresaNombreDisplay }}</span>
          </template>
          <span class="bc-sep">›</span>
          <span class="bc-current">{{ product.nombre }}</span>
        </nav>

        <div class="detail-layout">
          <!-- GALERÍA sticky -->
          <div class="gallery-col">
            <div class="gallery-shell">
              <div class="gallery-main" @click="zoomOpen = true">
                <img v-if="selectedImageUrl" :src="selectedImageUrl" :alt="product.nombre" class="gallery-img" />
                <div v-else class="gallery-empty">
                  <q-icon name="inventory_2" size="52px" color="grey-4" />
                </div>
                <button v-if="productImages.length > 1" class="gallery-nav gallery-nav-left" @click.stop="prevImage">
                  <q-icon name="chevron_left" size="22px" />
                </button>
                <button v-if="productImages.length > 1" class="gallery-nav gallery-nav-right" @click.stop="nextImage">
                  <q-icon name="chevron_right" size="22px" />
                </button>
                <div v-if="selectedImageUrl" class="zoom-badge">
                  <q-icon name="zoom_in" size="16px" />
                  Ampliar
                </div>
              </div>

              <div v-if="productImages.length > 1" class="gallery-thumbs">
                <button v-for="(img, index) in productImages" :key="img.id || index" class="thumb-btn"
                  :class="{ 'thumb-btn-active': selectedImageIndex === index }" @click="selectImage(index)">
                  <img :src="img.url" :alt="`${product.nombre} ${index + 1}`" class="gallery-thumb" />
                </button>
              </div>
            </div>
          </div>

          <!-- INFO -->
          <div class="info-col">
            <h1 class="product-title">{{ product.nombre }}</h1>

            <p v-if="product.precioBase" class="product-price">
              ${{ Number(product.precioBase).toLocaleString('es-CO') }}
              <span class="product-currency">{{ product.moneda }}</span>
            </p>
            <p v-else class="product-price-na">Precio por cotización</p>

            <span v-if="!esPagable" class="quote-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Requiere cotización — el precio depende de tu solicitud
            </span>

            <!-- Stock (solo productos con inventario controlado) -->
            <div v-else-if="stockDisponible != null" class="stock-line">
              <span v-if="agotado" class="stock-badge stock-badge--out">
                <span class="stock-dot" /> Agotado
              </span>
              <span v-else-if="stockDisponible <= 5" class="stock-badge stock-badge--low">
                <span class="stock-dot" /> ¡Últimas {{ stockDisponible }} unidades!
              </span>
              <span v-else class="stock-badge stock-badge--in">
                <span class="stock-dot" /> {{ stockDisponible }} disponibles
              </span>
            </div>

            <p v-if="product.descripcion" class="product-desc">{{ product.descripcion }}</p>

            <div v-if="specsSummary.length" class="specs-summary">
              <div v-for="sp in specsSummary" :key="sp.id" class="spec-pill">
                <span class="spec-pill-key">{{ sp.atributo?.nombre }}</span>
                <span class="spec-pill-val">{{ sp.valor }}</span>
              </div>
            </div>

            <div v-if="product.variantes?.length" class="variants-section">
              <p class="section-label">Selecciona una opción</p>
              <div class="variants-grid">
                <button v-for="v in product.variantes" :key="v.id" class="variant-btn"
                  :class="{ 'variant-btn-active': selectedVariante?.id === v.id }" @click="selectedVariante = v">
                  {{ varianteLabel(v) }}
                </button>
              </div>
            </div>

            <div class="cta-card">
              <button class="btn-cart" :disabled="adding || agotado || !puedeAgregar" @click="onAddToCart">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <template v-if="agotado">Agotado</template>
                <template v-else-if="!puedeAgregar">Máximo disponible en carrito</template>
                <template v-else-if="yaEnCarrito">Agregar otra unidad</template>
                <template v-else>Agregar al carrito</template>
              </button>

              <button class="btn-whatsapp" @click="onCotizar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Cotizar por WhatsApp
              </button>
              <button class="btn-back" @click="goBackToStore()">
                ← Ver más productos
              </button>
            </div>
          </div>
        </div>

        <!-- ESPECIFICACIONES COMPLETAS -->
        <div v-if="atributosUnicos.length" class="specs-full">
          <div class="specs-full-header">
            <h2 class="specs-full-title">Especificaciones técnicas</h2>
            <p class="specs-full-sub">{{ atributosUnicos.length }} características detalladas</p>
          </div>

          <div v-for="grupo in atributosAgrupados" :key="grupo.titulo" class="specs-group">
            <div class="specs-group-label">
              <span class="specs-group-icon">{{ grupo.icono }}</span>
              {{ grupo.titulo }}
            </div>
            <div class="specs-group-grid">
              <div v-for="av in grupo.items" :key="av.id" class="spec-card">
                <span class="spec-card-key">{{ av.atributo?.nombre }}</span>
                <span class="spec-card-val">{{ av.valor || '—' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ZOOM MODAL -->
        <q-dialog v-model="zoomOpen">
          <div class="zoom-modal">
            <button class="zoom-close" @click="zoomOpen = false">
              <q-icon name="close" size="22px" />
            </button>
            <button v-if="productImages.length > 1" class="zoom-nav zoom-nav-left" @click.stop="prevImage">
              <q-icon name="chevron_left" size="28px" />
            </button>
            <img v-if="selectedImageUrl" :src="selectedImageUrl" :alt="product.nombre" class="zoom-image" />
            <button v-if="productImages.length > 1" class="zoom-nav zoom-nav-right" @click.stop="nextImage">
              <q-icon name="chevron_right" size="28px" />
            </button>
          </div>
        </q-dialog>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useQuasar } from 'quasar'
import { publicApi } from '../../api/publicCatalog'
import { slugify } from '../../utils/slugify'
import { useCartStore } from '../../stores/cart'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const cart = useCartStore()
const adding = ref(false)

const ZIFCOR_WHATSAPP = '573114799224'
const SITE_URL = 'https://www.zifcor.com'

const productoSlug = computed(() => route.params.productoSlug)

const product = ref(null)
const loading = ref(true)
const selectedImageIndex = ref(0)
const selectedVariante = ref(null)
const zoomOpen = ref(false)

const productImages = computed(() => product.value?.imagenes || [])

const selectedImageUrl = computed(() => {
  if (!productImages.value.length) return ''
  return productImages.value[selectedImageIndex.value]?.url || ''
})

const empresaNombreDisplay = computed(() =>
  product.value?.empresa?.profile?.nombreComercial ||
  product.value?.empresa?.razonSocial ||
  'Tienda'
)

const empresaSlug = computed(() => slugify(empresaNombreDisplay.value))

/* ============================================================
   SEO DINÁMICO — useHead + JSON-LD (Schema.org)
   ============================================================ */

// URL canónica jerárquica: /tienda/:sectorSlug/:empresaSlug/producto/:productoSlug
const canonicalUrl = computed(() => {
  if (!product.value) return `${SITE_URL}/tienda`
  const sector = route.params.sectorSlug || 'tienda'
  const slug = product.value.slug || slugify(product.value.nombre)
  return `${SITE_URL}/tienda/${sector}/${empresaSlug.value}/producto/${slug}`
})

// <title>: máx ~60 caracteres para que Google no lo corte
const pageTitle = computed(() => {
  if (loading.value) return 'Cargando producto... | ZIFCOR'
  if (!product.value) return 'Producto no encontrado | ZIFCOR'

  const empresa = empresaNombreDisplay.value
  // Si la empresa es ZIFCOR (o variantes), evita "ZIFCOR | ZIFCOR"
  const esZifcor = /^zifcor/i.test(empresa.trim())
  return esZifcor
    ? `${product.value.nombre} | ZIFCOR`
    : `${product.value.nombre} | ${empresa} | ZIFCOR`
})

// <meta description>: máx ~155 caracteres, con fallback si no hay descripción
const metaDescription = computed(() => {
  if (!product.value) return 'Marketplace industrial B2B en Colombia. Encuentra productos y maquinaria de empresas verificadas.'
  const base = product.value.descripcion?.trim() ||
    `Compra ${product.value.nombre} en ZIFCOR, marketplace industrial B2B en Colombia. Cotiza directo con ${empresaNombreDisplay.value}.`
  return base.length > 155 ? `${base.slice(0, 152)}...` : base
})

// Marca: primero el atributo "marca", si no existe usa la empresa
const productBrand = computed(() => {
  const attr = product.value?.atributos?.find(a => a.atributo?.clave === 'marca')
  return attr?.valor || empresaNombreDisplay.value
})

// JSON-LD: Schema.org Product
const productJsonLd = computed(() => {
  if (!product.value) return null
  const p = product.value
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    description: metaDescription.value,
    url: canonicalUrl.value,
    image: (p.imagenes || []).map(i => i.url).filter(Boolean),
    brand: { '@type': 'Brand', name: productBrand.value },
  }
  if (p.sku || p.variantes?.[0]?.sku) ld.sku = p.sku || p.variantes[0].sku
  // Solo incluir offers si hay precio; si es "por cotización" Google penaliza price: 0
  if (p.precioBase && Number(p.precioBase) > 0) {
    const stockTotal = (p.variantes || []).reduce((acc, v) => acc + (Number(v.stock) || 0), 0)
    ld.offers = {
      '@type': 'Offer',
      url: canonicalUrl.value,
      price: Number(p.precioBase),
      priceCurrency: p.moneda || 'COP',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: empresaNombreDisplay.value },
    }
  }
  return ld
})
const sectorNombreDisplay = computed(() => {
  const slug = route.params.sectorSlug || ''
  // Capitaliza la primera letra: "manufacturero" → "Manufacturero"
  return slug.charAt(0).toUpperCase() + slug.slice(1)
})
// JSON-LD: BreadcrumbList (refuerza la jerarquía sector > empresa > producto)
const breadcrumbJsonLd = computed(() => {
  if (!product.value) return null
  const sector = route.params.sectorSlug || 'tienda'
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sectores', item: `${SITE_URL}/tienda` },
      { '@type': 'ListItem', position: 2, name: sectorNombreDisplay.value, item: `${SITE_URL}/tienda/${sector}` },
      { '@type': 'ListItem', position: 3, name: empresaNombreDisplay.value, item: `${SITE_URL}/tienda/${sector}/${empresaSlug.value}` },
      { '@type': 'ListItem', position: 4, name: product.value.nombre, item: canonicalUrl.value },
    ],
  }
})

useHead({
  title: () => pageTitle.value,
  meta: [
    { name: 'description', content: () => metaDescription.value },
    { name: 'robots', content: () => (product.value ? 'index, follow' : 'noindex') },
    // Open Graph (WhatsApp, Facebook, LinkedIn)
    { property: 'og:type', content: 'product' },
    { property: 'og:site_name', content: 'ZIFCOR' },
    { property: 'og:title', content: () => pageTitle.value },
    { property: 'og:description', content: () => metaDescription.value },
    { property: 'og:url', content: () => canonicalUrl.value },
    { property: 'og:image', content: () => productImages.value[0]?.url || `${SITE_URL}/IconoZ.png` },
    { property: 'og:locale', content: 'es_CO' },
    { property: 'product:price:amount', content: () => product.value?.precioBase ? String(product.value.precioBase) : undefined },
    { property: 'product:price:currency', content: () => product.value?.moneda || 'COP' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => pageTitle.value },
    { name: 'twitter:description', content: () => metaDescription.value },
    { name: 'twitter:image', content: () => productImages.value[0]?.url || `${SITE_URL}/IconoZ.png` },
  ],
  link: [
    { rel: 'canonical', href: () => canonicalUrl.value },
  ],
  script: [
    {
      key: 'ld-product',
      type: 'application/ld+json',
      innerHTML: () => safeJsonLd(productJsonLd.value),
    },
    {
      key: 'ld-breadcrumb',
      type: 'application/ld+json',
      innerHTML: () => safeJsonLd(breadcrumbJsonLd.value),
    },
  ],
})

// Serializa JSON-LD escapando el carácter U+003C para impedir que un texto
// con una etiqueta de cierre de script rompa el bloque (XSS almacenado).
function safeJsonLd(value) {
  if (!value) return '{}'
  const LT = String.fromCharCode(60)
  return JSON.stringify(value).split(LT).join('\\u003c')
}

/* ============================================================ */

// Tras cargar el producto normaliza la URL jerárquica
// → /tienda/:sectorSlug/:empresaSlug/producto/:productoSlug
function cleanUrl() {
  if (!product.value) return

  if (!route.params.sectorSlug) return

  const slug = product.value.slug || slugify(product.value.nombre)
  const sector = route.params.sectorSlug
  history.replaceState(
    history.state,
    '',
    `/tienda/${sector}/${empresaSlug.value}/producto/${slug}`
  )
}

// Primer crumb: si el usuario llegó navegando dentro del sitio (búsqueda, destacados, etc.)
// vuelve a esa página; si entró por link directo, cae a la home de la tienda.
function goBackToSectores() {
  if (window.history.state?.back) {
    router.back()
    return
  }
  router.push('/tienda')
}

// Vuelve a la tienda manteniendo la jerarquía sector/empresa
function goBackToStore() {
  if (!route.params.sectorSlug) {
    router.push('/tienda')
    return
  }
  const sector = route.params.sectorSlug
  router.push(`/tienda/${sector}/${empresaSlug.value}`)
}

const atributosUnicos = computed(() => {
  if (!product.value?.atributos?.length) return []
  const seen = new Set()
  return product.value.atributos.filter(av => {
    const key = av.atributo?.id || av.atributoId || av.id
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
})

const specsSummary = computed(() => atributosUnicos.value.slice(0, 4))

const GRUPOS = [
  { titulo: 'Vuelo', icono: '✈', claves: ['tiempo_vuelo', 'velocidad_max', 'resistencia_viento', 'techo_servicio'] },
  { titulo: 'Protección', icono: '🛡', claves: ['proteccion_ip', 'temp_operacion'] },
  { titulo: 'Cámaras', icono: '📷', claves: ['cam_gran_angular', 'zoom_optico', 'zoom_hibrido', 'resolucion_termica', 'rango_termica'] },
  { titulo: 'Transmisión', icono: '📡', claves: ['dist_transmision', 'sistema_com'] },
  { titulo: 'Navegación', icono: '🧭', claves: ['telemetro_laser', 'evasion_obstaculos', 'nav_sin_gps'] },
  { titulo: 'Seguridad', icono: '🔒', claves: ['cifrado_datos'] },
  { titulo: 'General', icono: '📋', claves: ['marca', 'modelo', 'certificacion', 'origen', 'color'] },
]

const atributosAgrupados = computed(() => {
  const attrs = atributosUnicos.value
  const clavesUsadas = new Set()
  const grupos = []
  for (const g of GRUPOS) {
    const items = attrs.filter(av => g.claves.includes(av.atributo?.clave))
    if (items.length) {
      items.forEach(av => clavesUsadas.add(av.atributo?.clave))
      grupos.push({ ...g, items })
    }
  }
  const resto = attrs.filter(av => !clavesUsadas.has(av.atributo?.clave))
  if (resto.length) grupos.push({ titulo: 'Otros', icono: '⚙', items: resto })
  return grupos
})

function selectImage(index) { selectedImageIndex.value = index }

function prevImage() {
  if (!productImages.value.length) return
  selectedImageIndex.value = selectedImageIndex.value === 0
    ? productImages.value.length - 1
    : selectedImageIndex.value - 1
}

function nextImage() {
  if (!productImages.value.length) return
  selectedImageIndex.value = selectedImageIndex.value === productImages.value.length - 1
    ? 0
    : selectedImageIndex.value + 1
}

function varianteLabel(v) {
  if (v.atributos?.length) return v.atributos.map(a => a.valor).join(' · ')
  return v.sku || 'Variante'
}

function onCotizar() {
  const variante = selectedVariante.value ? varianteLabel(selectedVariante.value) : ''
  const msg = encodeURIComponent(
    `Hola, estoy interesado en el producto *${product.value.nombre}*${variante ? ` (${variante})` : ''} que vi en ZIFCOR.`
  )
  window.open(`https://wa.me/${ZIFCOR_WHATSAPP}?text=${msg}`, '_blank')
}

// ¿Este producto se paga en línea (PSE) o requiere cotización?
const esPagable = computed(() =>
  product.value?.pagableEnLinea !== false && product.value?.precioBase != null
)

// Stock efectivo: suma de variantes activas, o el stock propio del producto.
// null = sin control de inventario.
const stockDisponible = computed(() => {
  const p = product.value
  if (!p) return null
  const activas = (p.variantes || []).filter(v => v.activo !== false)
  if (activas.length) return activas.reduce((s, v) => s + (Number(v.stock) || 0), 0)
  return p.stock != null ? Number(p.stock) : null
})

const agotado = computed(() => stockDisponible.value === 0)

const cartQty = computed(() =>
  product.value ? cart.getQty(product.value.id) : 0
)

const yaEnCarrito = computed(() => cartQty.value > 0)

// ¿Se puede agregar una unidad más? (respeta el stock)
const puedeAgregar = computed(() =>
  stockDisponible.value == null || cartQty.value < stockDisponible.value
)

async function onAddToCart() {
  if (!product.value || adding.value || agotado.value || !puedeAgregar.value) return
  adding.value = true
  try {
    await cart.addItem(product.value.id, 1)
    $q.notify({
      message: 'Producto agregado al carrito',
      color: 'green-6',
      icon: 'shopping_cart',
      position: 'top',
      timeout: 1800,
      actions: [{ label: 'Ver carrito', color: 'white', handler: () => router.push('/tienda/carrito') }],
    })
  } catch (e) {
    if (e.message === 'LOGIN_REQUIRED') {
      $q.notify({ message: 'Inicia sesión para agregar al carrito', color: 'blue-6', position: 'top', timeout: 2200 })
      router.push('/auth')
    } else {
      const msg = e.response?.data?.message || 'No se pudo agregar al carrito'
      $q.notify({ message: msg, color: 'red-5', position: 'top' })
    }
  } finally {
    adding.value = false
  }
}

async function loadProduct() {
  loading.value = true
  try {
    const { data } = await publicApi.getProductoPorSlug(productoSlug.value)
    product.value = data || null
    if (data?.imagenes?.length) {
      const pi = data.imagenes.findIndex(i => i.esPrincipal)
      selectedImageIndex.value = pi >= 0 ? pi : 0
    } else {
      selectedImageIndex.value = 0
    }
    selectedVariante.value = data?.variantes?.length ? data.variantes[0] : null
    cleanUrl()
  } catch {
    product.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.productoSlug || route.query.pid,
  () => { zoomOpen.value = false; loadProduct() },
  { immediate: true }
)
</script>

<style scoped>
.detail-section {
  background: #f6f8fb;
  padding: 42px 0 84px;
  min-height: 100vh;
}

.bs-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.loading-wrap {
  min-height: 70vh;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(11, 18, 32, .48);
  font-weight: 600;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.bc-link {
  color: #0071e3;
  font-weight: 800;
  cursor: pointer;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, .3);
}

.bc-current {
  color: rgba(27, 27, 27, .6);
  font-weight: 700;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  gap: 42px;
  align-items: start;
}

.gallery-col {
  position: sticky;
  top: 24px;
}

.gallery-shell {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 24px;
  padding: 18px;
  box-shadow: 0 14px 38px rgba(15, 23, 42, .06);
}

.gallery-main {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(11, 18, 32, .08);
  background: #f8fafc;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 320ms ease;
}

.gallery-main:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-empty {
  width: 100%;
  height: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-badge {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .76);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  backdrop-filter: blur(8px);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, .92);
  color: #0b1220;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(11, 18, 32, .16);
  transition: transform 160ms, background 160ms;
}

.gallery-nav:hover {
  transform: translateY(-50%) scale(1.04);
  background: #fff;
}

.gallery-nav-left {
  left: 14px;
}

.gallery-nav-right {
  right: 14px;
}

.gallery-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.thumb-btn {
  width: 76px;
  height: 76px;
  border-radius: 14px;
  padding: 0;
  border: 1.5px solid rgba(11, 18, 32, .10);
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: all 180ms;
}

.thumb-btn:hover {
  border-color: rgba(0, 113, 227, .24);
  transform: translateY(-1px);
}

.thumb-btn-active {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .14);
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info-col {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: clamp(22px, 2.8vw, 38px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.8px;
  color: #0b1220;
  margin: 0 0 14px;
}

.product-price {
  font-size: 32px;
  font-weight: 900;
  color: #0b1220;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.product-currency {
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, .42);
  margin-left: 6px;
}

.product-price-na {
  font-size: 14px;
  font-weight: 800;
  color: rgba(11, 18, 32, .45);
  margin: 0 0 16px;
}

.quote-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  margin: 0 0 16px;
  border-radius: 999px;
  background: rgba(37, 211, 102, .1);
  color: #12924a;
  font-size: 12px;
  font-weight: 800;
}

.stock-line {
  margin: 0 0 16px;
}

.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 800;
}

.stock-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stock-badge--in {
  color: #12924a;
}

.stock-badge--in .stock-dot {
  background: #16a34a;
}

.stock-badge--low {
  color: #d97706;
}

.stock-badge--low .stock-dot {
  background: #f59e0b;
}

.stock-badge--out {
  color: #dc2626;
}

.stock-badge--out .stock-dot {
  background: #dc2626;
}

.product-desc {
  font-size: 14px;
  color: rgba(11, 18, 32, .62);
  line-height: 1.8;
  margin: 0 0 20px;
}

.specs-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 22px;
}

.spec-pill {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  padding: 10px 12px;
}

.spec-pill-key {
  display: block;
  font-size: 10px;
  font-weight: 800;
  color: rgba(11, 18, 32, .38);
  text-transform: uppercase;
  letter-spacing: .6px;
  margin-bottom: 3px;
}

.spec-pill-val {
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
}

.section-label {
  font-size: 13px;
  font-weight: 900;
  color: #0b1220;
  margin: 0 0 12px;
}

.variants-section {
  margin-bottom: 24px;
}

.variants-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.variant-btn {
  min-height: 42px;
  padding: 0 16px;
  border: 1.5px solid rgba(11, 18, 32, .12);
  border-radius: 12px;
  background: #fff;
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
  cursor: pointer;
  transition: all 160ms;
}

.variant-btn:hover {
  border-color: rgba(0, 113, 227, .24);
  color: #0071e3;
}

.variant-btn-active {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .06);
  color: #0071e3;
  box-shadow: 0 10px 20px rgba(0, 113, 227, .10);
}

.cta-card {
  margin-top: 6px;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 20px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, .06);
}

.btn-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  background: #0071e3;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: filter 160ms, transform 160ms, background 160ms;
  box-shadow: 0 12px 24px rgba(0, 113, 227, .22);
  font-family: inherit;
}

.btn-cart:hover:not(:disabled) {
  background: #005fcd;
  transform: translateY(-1px);
}

.btn-cart:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  background: #25d366;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: filter 160ms, transform 160ms;
  box-shadow: 0 12px 24px rgba(37, 211, 102, .20);
  font-family: inherit;
}

.btn-whatsapp:hover {
  filter: brightness(.92);
  transform: translateY(-1px);
}

.btn-back {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .12);
  border-radius: 12px;
  min-height: 46px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(11, 18, 32, .62);
  cursor: pointer;
  transition: all 160ms;
}

.btn-back:hover {
  border-color: rgba(0, 113, 227, .2);
  color: #0071e3;
}

.specs-full {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1.5px solid rgba(11, 18, 32, .08);
}

.specs-full-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 32px;
}

.specs-full-title {
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
  margin: 0;
  letter-spacing: -0.4px;
}

.specs-full-sub {
  font-size: 13px;
  font-weight: 700;
  color: rgba(11, 18, 32, .38);
  margin: 0;
}

.specs-group {
  margin-bottom: 32px;
}

.specs-group-label {
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(11, 18, 32, .42);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.specs-group-icon {
  font-size: 15px;
}

.specs-group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.spec-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 16px 18px;
  transition: box-shadow 160ms, border-color 160ms;
}

.spec-card:hover {
  border-color: rgba(0, 113, 227, .18);
  box-shadow: 0 8px 20px rgba(0, 113, 227, .06);
}

.spec-card-key {
  display: block;
  font-size: 10.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, .38);
  text-transform: uppercase;
  letter-spacing: .7px;
  margin-bottom: 6px;
}

.spec-card-val {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.4;
}

.zoom-modal {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: min(92vw, 1100px);
  min-height: min(88vh, 760px);
  padding: 32px;
  background: rgba(11, 18, 32, .92);
  border-radius: 24px;
  overflow: hidden;
}

.zoom-image {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

.zoom-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, .14);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.zoom-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, .14);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.zoom-nav-left {
  left: 16px;
}

.zoom-nav-right {
  right: 16px;
}

@media (max-width: 980px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .gallery-col {
    position: static;
  }

  .specs-summary {
    grid-template-columns: 1fr 1fr;
  }

  .product-title {
    font-size: 28px;
  }
}

@media (max-width: 640px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .detail-section {
    padding: 28px 0 56px;
  }

  .gallery-shell {
    padding: 12px;
  }

  .thumb-btn {
    width: 64px;
    height: 64px;
  }

  .specs-summary {
    grid-template-columns: 1fr;
  }

  .specs-group-grid {
    grid-template-columns: 1fr 1fr;
  }

  .zoom-modal {
    min-width: 96vw;
    min-height: 82vh;
    padding: 22px;
  }

  .zoom-nav {
    width: 44px;
    height: 44px;
  }
}
</style>
