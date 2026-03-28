<template>
  <section class="detail-section" aria-label="Detalle del producto">
    <div class="bs-wrap">

      <!-- SKELETON (3 s) -->
      <template v-if="isLoading">
        <div class="sk-breadcrumb">
          <div class="sk sk-bc-a" />
          <div class="sk-sep" />
          <div class="sk sk-bc-b" />
          <div class="sk-sep" />
          <div class="sk sk-bc-c" />
        </div>
        <div class="sk-main-layout">
          <div class="sk-gallery">
            <div class="sk-thumbs">
              <div v-for="n in 3" :key="n" class="sk sk-thumb" />
            </div>
            <div class="sk sk-main-img" />
          </div>
          <div class="sk-info">
            <div class="sk sk-kicker" />
            <div class="sk sk-pt1" />
            <div class="sk sk-pt2" />
            <div class="sk sk-stars" />
            <div class="sk sk-price" />
            <div class="sk sk-desc" />
            <div class="sk-specs-row">
              <div v-for="n in 4" :key="n" class="sk sk-spec" />
            </div>
            <div class="sk sk-qty" />
            <div class="sk sk-actions" />
            <div class="sk sk-cert" />
          </div>
        </div>
        <div class="sk sk-tabs-bar" />
        <div class="sk sk-tab-content" />
      </template>

      <!-- CONTENIDO REAL -->
      <template v-else-if="product && category">

        <!-- Breadcrumb — ahora con subcategoría -->
        <nav class="breadcrumb" aria-label="Ruta de navegación">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Catálogo
          </button>
          <span class="bc-sep">/</span>
          <button class="bc-link" @click="router.push(`/tienda/${category.id}`)">
            {{ category.title }}
          </button>
          <!-- Subcategoría como paso intermedio -->
          <template v-if="subcategory">
            <span class="bc-sep">/</span>
            <button class="bc-link" @click="router.push(`/tienda/${category.id}/sub/${subcategory.id}`)">
              {{ subcategory.name }}
            </button>
          </template>
          <span class="bc-sep">/</span>
          <span class="bc-current">{{ product.name }}</span>
        </nav>

        <!-- MAIN LAYOUT -->
        <div class="detail-layout">

          <!-- Gallery -->
          <div class="gallery-section">
            <div class="gallery-grid">
              <div class="thumbnails" role="list">
                <button v-for="(img, i) in product.images" :key="i" class="thumb" :class="{ active: selectedImg === i }"
                  :style="selectedImg === i ? { borderColor: category.accentColor, boxShadow: `0 0 0 3px ${category.accentColor}28` } : {}"
                  @click="selectedImg = i" :aria-label="`Vista ${i + 1}`">
                  <img :src="img" :alt="`${product.name} vista ${i + 1}`" />
                </button>
              </div>
              <div class="main-image">
                <transition name="img-fade" mode="out-in">
                  <img :key="selectedImg" :src="product.images[selectedImg]" :alt="product.name" />
                </transition>
                <div v-if="isBestSeller" class="img-top-badge" :style="{ background: category.accentColor }">
                  MÁS VENDIDO
                </div>
              </div>
            </div>

            <div class="secondary-image-card"
              :style="{ borderColor: `color-mix(in srgb, ${category.accentColor} 22%, transparent)` }">
              <div class="sec-img-wrap">
                <img :src="product.images[1] ?? product.images[0]" :alt="`${product.name} detalle`" class="sec-img" />
                <div class="sec-img-overlay"
                  :style="{ background: `linear-gradient(135deg, ${category.accentColor}cc 0%, ${category.accentColor}44 100%)` }" />
                <div class="sec-img-content">
                  <span class="sec-badge">{{ category.kicker }}</span>
                  <p class="sec-title">{{ product.name }}</p>
                  <p class="sec-sub">Envío a toda Colombia · Garantía 2 años</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="info-section">
            <div>
              <span class="product-kicker"
                :style="{ background: colorBg, color: category.accentColor, borderColor: colorBorder }">
                {{ category.kicker }}
              </span>
              <h1 class="product-name">{{ product.name }}</h1>
            </div>

            <div class="rating-row">
              <span class="stars-wrap">
                <svg v-for="n in 5" :key="n" width="15" height="15" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <span class="rating-val">5.0 de 5</span>
              <span class="rating-count">(127 valoraciones)</span>
            </div>

            <div class="price-block">
              <div v-if="product.discount > 0" class="price-old-row">
                <span class="price-old">{{ formatCOP(product.originalPrice) }}</span>
                <span class="savings-tag">Ahorra {{ formatCOP(product.originalPrice - product.price) }} ({{
                  product.discount
                  }}%)</span>
              </div>
              <span class="price-main">{{ formatCOP(product.price) }}</span>
            </div>

            <div class="stock-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1aab5c" stroke-width="2.8">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Disponible</span>
            </div>

            <div class="desc-box">
              <p>{{ product.shortDesc }}</p>
            </div>

            <div class="quick-specs">
              <div v-for="spec in product.specs" :key="spec.l" class="spec-item">
                <span class="spec-lbl">{{ spec.l }}</span>
                <span class="spec-val">{{ spec.v }}</span>
              </div>
            </div>

            <div v-if="product.normativasOptions?.length">
              <p class="sel-label">Especificación:</p>
              <div class="norm-selector">
                <button v-for="opt in product.normativasOptions" :key="opt" class="norm-btn"
                  :class="{ 'norm-active': selectedVariant === opt }"
                  :style="selectedVariant === opt ? { borderColor: category.accentColor, background: colorBg, color: category.accentColor } : {}"
                  @click="selectedVariant = opt">{{ opt }}</button>
              </div>
            </div>

            <div class="qty-row">
              <span class="sel-label">Cantidad:</span>
              <div class="qty-ctrl">
                <button class="qty-btn-ctrl" @click="qty = Math.max(1, qty - 1)">−</button>
                <span class="qty-val">{{ qty }}</span>
                <button class="qty-btn-ctrl" @click="qty++">+</button>
              </div>
            </div>

            <div class="actions">
              <button class="add-btn" :class="{ 'add-btn-done': addedToCart }"
                :style="!addedToCart ? { background: category.accentColor, boxShadow: `0 10px 28px ${category.accentColor}40` } : {}"
                @click="handleAddToCart" :disabled="addedToCart">
                <template v-if="addedToCart">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Añadido al carrito
                </template>
                <template v-else>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  AGREGAR AL CARRITO
                </template>
              </button>

              <button class="quote-btn" :style="{ borderColor: category.accentColor, color: category.accentColor }"
                @click="router.push('/contacto')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                SOLICITAR COTIZACIÓN
              </button>
            </div>

            <button v-if="addedToCart" class="go-cart-link" @click="router.push('/carrito')">
              Ver carrito →
            </button>

            <div class="cert-box" :style="{ background: colorBg, borderColor: colorBorder }">
              <div v-for="cert in certs" :key="cert.title" class="cert-item">
                <span class="cert-emoji">{{ cert.emoji }}</span>
                <div>
                  <p class="cert-title">{{ cert.title }}</p>
                  <p class="cert-sub">{{ cert.sub }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TABS -->
        <div class="tabs-section">
          <div class="tab-bar" role="tablist">
            <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ 'tab-active': activeTab === tab.id }"
              :style="activeTab === tab.id ? { borderBottomColor: category.accentColor, color: category.accentColor } : {}"
              @click="activeTab = tab.id" role="tab">{{ tab.label }}</button>
          </div>

          <div v-show="activeTab === 'specs'" class="tab-panel" role="tabpanel">
            <h3 class="panel-title">Especificaciones técnicas completas</h3>
            <div class="specs-table">
              <div v-for="(spec, i) in product.specs" :key="spec.l" class="spec-row" :class="{ even: i % 2 === 0 }">
                <span class="sr-label">{{ spec.l }}</span>
                <span class="sr-value">{{ spec.v }}</span>
              </div>
              <div v-if="product.normativasOptions?.length" class="spec-row">
                <span class="sr-label">Opciones</span>
                <span class="sr-value">{{ product.normativasOptions.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'description'" class="tab-panel" role="tabpanel">
            <h3 class="panel-title">Sobre este producto</h3>
            <p class="long-desc">{{ product.longDesc }}</p>
            <h4 class="feat-title">Lo que incluye</h4>
            <ul class="feat-list">
              <li v-for="f in includes" :key="f" class="feat-item">
                <span class="feat-check" :style="{ background: colorBg, color: category.accentColor }">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="additional-info" v-reveal>
          <h3 class="ai-title">Información adicional</h3>
          <div class="ai-table">
            <div class="ai-row">
              <span class="ai-lbl">Categoría</span>
              <span class="ai-val ai-link" :style="{ color: category.accentColor }"
                @click="router.push(`/tienda/${category.id}`)">
                {{ category.title }}
              </span>
            </div>
            <div class="ai-row">
              <span class="ai-lbl">Subcategoría</span>
              <!-- Si se resolvió la subcategoría, es un link clickeable; si no, texto plano -->
              <span v-if="subcategory" class="ai-val ai-link" :style="{ color: category.accentColor }"
                @click="router.push(`/tienda/${category.id}/sub/${subcategory.id}`)">{{ subcategory.name }}</span>
              <span v-else class="ai-val">{{ product.subcategory }}</span>
            </div>
            <div v-if="product.normativasOptions?.length" class="ai-row">
              <span class="ai-lbl">Variantes</span>
              <span class="ai-val">{{ product.normativasOptions.join(', ') }}</span>
            </div>
          </div>
        </div>

        <!-- Productos relacionados -->
        <div class="related-section" v-reveal>
          <h2 class="related-title">Productos relacionados</h2>
          <div class="related-grid">
            <div v-for="rel in relatedProducts" :key="rel.id" class="related-card"
              @click="router.push(`/tienda/${category.id}/${rel.id}`)">
              <div class="related-img-wrap">
                <img :src="rel.images[0]" :alt="rel.name" class="related-img" />
              </div>
              <div class="related-info">
                <p class="rel-kicker" :style="{ color: category.accentColor }">{{ category.kicker }}</p>
                <h4 class="rel-name">{{ rel.name }}</h4>
                <p class="rel-price">{{ formatCOP(rel.price) }}</p>
                <button class="rel-btn">Seleccionar opciones</button>
              </div>
            </div>
          </div>
        </div>

      </template>

      <div v-else class="not-found">
        <p>Cargando producto…</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { STORE_CATEGORIES, formatCOP } from '../../data/store-products.js'
import { useCartStore } from '../../stores/cart.js'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const isLoading = ref(true)
onMounted(() => setTimeout(() => { isLoading.value = false }, 3000))

const category = computed(() => STORE_CATEGORIES.find(c => c.id === route.params.categoryId) ?? null)
const product = computed(() => category.value?.products.find(p => p.id === route.params.productId) ?? null)

const relatedProducts = computed(() =>
  category.value?.products.filter(p => p.id !== route.params.productId).slice(0, 4) ?? []
)

// Resuelve la subcategoría a partir del campo product.subcategory
const subcategory = computed(() =>
  category.value?.subcategories.find(s => s.id === product.value?.subcategory) ?? null
)

const selectedImg = ref(0)
const selectedVariant = ref('')
const qty = ref(1)
const activeTab = ref('specs')

watch(product, p => {
  if (!p) return
  selectedImg.value = 0
  selectedVariant.value = p.normativasOptions?.[0] ?? ''
  qty.value = 1
  activeTab.value = 'specs'
}, { immediate: true })

const colorBg = computed(() => `color-mix(in srgb, ${category.value?.accentColor} 8%, transparent)`)
const colorBorder = computed(() => `color-mix(in srgb, ${category.value?.accentColor} 22%, transparent)`)

const isBestSeller = computed(() => {
  const idx = category.value?.products.findIndex(p => p.id === product.value?.id) ?? -1
  return idx >= 0 && idx < 2
})

const addedToCart = computed(() => product.value ? cartStore.isInCart(product.value.id) : false)

function handleAddToCart() {
  if (addedToCart.value || !product.value) return
  cartStore.addItem({
    productId: product.value.id,
    name: product.value.name,
    categoryId: category.value.id,
    categoryTitle: category.value.title,
    image: product.value.images[0],
    price: product.value.price,
    qty: qty.value,
    variant: selectedVariant.value || null,
  })
}

const tabs = [
  { id: 'specs', label: 'Especificaciones técnicas' },
  { id: 'description', label: 'Descripción detallada' },
]

const certs = [
  { emoji: '🚚', title: 'Envío a toda Colombia', sub: 'Gestión completa de importación y entrega' },
  { emoji: '🔧', title: 'Instalación incluida', sub: 'Montaje y puesta en marcha por nuestro equipo' },
  { emoji: '✅', title: 'Garantía de 2 años', sub: 'Soporte técnico y repuestos incluidos' },
]

const includes = [
  'Producto original con garantía de fábrica',
  'Manual de usuario en español',
  'Soporte técnico post-venta',
  'Factura electrónica y certificado de importación',
]

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() }
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) { el.__obs?.disconnect?.() },
}
</script>

<style scoped>
/* SKELETON */
@keyframes shimmer {
  0% {
    background-position: -700px 0
  }

  100% {
    background-position: 700px 0
  }
}

.sk {
  background: linear-gradient(90deg, #eef0f2 25%, #e4e7ea 50%, #eef0f2 75%);
  background-size: 700px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 10px;
}

.sk-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 36px;
  padding-top: 40px;
}

.sk-bc-a {
  width: 70px;
  height: 14px;
}

.sk-bc-b {
  width: 110px;
  height: 14px;
}

.sk-bc-c {
  width: 180px;
  height: 14px;
}

.sk-sep {
  width: 8px;
  height: 14px;
  background: #dde1e5;
  border-radius: 3px;
}

.sk-main-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.sk-gallery {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sk-thumbs {
  display: flex;
  gap: 10px;
}

.sk-thumb {
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  border-radius: 10px;
}

.sk-main-img {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 18px;
}

.sk-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sk-kicker {
  height: 24px;
  width: 100px;
  border-radius: 999px;
}

.sk-pt1 {
  height: 28px;
  width: 90%;
}

.sk-pt2 {
  height: 24px;
  width: 70%;
}

.sk-stars {
  height: 16px;
  width: 160px;
}

.sk-price {
  height: 38px;
  width: 160px;
}

.sk-desc {
  height: 68px;
}

.sk-specs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.sk-spec {
  height: 60px;
  border-radius: 10px;
}

.sk-qty {
  height: 44px;
  width: 180px;
  border-radius: 12px;
}

.sk-actions {
  height: 54px;
  border-radius: 14px;
}

.sk-cert {
  height: 110px;
  border-radius: 14px;
}

.sk-tabs-bar {
  height: 50px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.sk-tab-content {
  height: 260px;
  border-radius: 14px;
}

/* PAGE */
.detail-section {
  background: #fafbfc;
  padding: 40px 0 80px;
  min-height: calc(100vh - 64px);
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 36px;
  font-size: 13px;
  flex-wrap: wrap;
}

.bc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-weight: 700;
  font-size: 13px;
  padding: 0;
  transition: opacity 150ms;
}

.bc-link:hover {
  opacity: .7;
}

.bc-sep {
  color: rgba(27, 27, 27, .3);
}

.bc-current {
  color: rgba(27, 27, 27, .5);
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* layout */
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 44px;
  margin-bottom: 64px;
  align-items: start;
}

/* gallery */
.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 14px;
  align-items: start;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumb {
  width: 82px;
  height: 82px;
  border-radius: 12px;
  border: 2px solid rgba(27, 27, 27, .1);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: #f0f2f5;
  transition: border-color 160ms, box-shadow 160ms;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.main-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid rgba(27, 27, 27, .08);
  background: #f0f2f5;
  aspect-ratio: 4/3;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.img-top-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
}

.secondary-image-card {
  border-radius: 18px;
  overflow: hidden;
  border: 2px solid;
}

.sec-img-wrap {
  position: relative;
  width: 100%;
  height: 200px;
}

.sec-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sec-img-overlay {
  position: absolute;
  inset: 0;
}

.sec-img-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 22px;
}

.sec-badge {
  display: inline-flex;
  padding: 3px 10px;
  background: rgba(255, 255, 255, .2);
  border: 1px solid rgba(255, 255, 255, .4);
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  width: fit-content;
  margin-bottom: 8px;
}

.sec-title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  line-height: 1.2;
}

.sec-sub {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, .8);
  font-weight: 600;
}

/* info */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.product-kicker {
  display: inline-flex;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1.5px solid;
  margin-bottom: 8px;
}

.product-name {
  margin: 0;
  font-size: clamp(18px, 2.5vw, 30px);
  font-weight: 900;
  color: #1b1b1b;
  line-height: 1.2;
  letter-spacing: -.5px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars-wrap {
  display: flex;
  gap: 2px;
}

.rating-val {
  font-size: 13px;
  font-weight: 800;
  color: #1b1b1b;
}

.rating-count {
  font-size: 12.5px;
  color: rgba(27, 27, 27, .45);
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-old-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-old {
  font-size: 14px;
  color: rgba(27, 27, 27, .4);
  text-decoration: line-through;
  font-weight: 600;
}

.savings-tag {
  padding: 3px 10px;
  background: rgba(46, 204, 113, .10);
  border: 1px solid rgba(46, 204, 113, .25);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  color: #1aab5c;
}

.price-main {
  font-size: 32px;
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -.8px;
  line-height: 1;
}

.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  background: rgba(46, 204, 113, .08);
  border: 1px solid rgba(46, 204, 113, .2);
  border-radius: 10px;
  width: fit-content;
}

.stock-badge span {
  font-size: 13px;
  font-weight: 800;
  color: #1aab5c;
}

.desc-box {
  padding: 13px 15px;
  background: rgba(27, 27, 27, .02);
  border-radius: 12px;
  border: 1px solid rgba(27, 27, 27, .06);
}

.desc-box p {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, .65);
  line-height: 1.7;
}

.quick-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.spec-item {
  background: #f7f8fb;
  border-radius: 10px;
  padding: 12px 14px;
}

.spec-lbl {
  display: block;
  font-size: 11px;
  color: rgba(27, 27, 27, .45);
  font-weight: 600;
  margin-bottom: 3px;
}

.spec-val {
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
}

.sel-label {
  font-size: 13px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 10px;
}

.norm-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.norm-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 2px solid rgba(27, 27, 27, .12);
  background: #fff;
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(27, 27, 27, .65);
  cursor: pointer;
  transition: all 180ms;
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.qty-ctrl {
  display: flex;
  align-items: center;
  border: 1.5px solid rgba(27, 27, 27, .15);
  border-radius: 10px;
  overflow: hidden;
}

.qty-btn-ctrl {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-right: 1.5px solid rgba(27, 27, 27, .1);
  font-size: 18px;
  font-weight: 600;
  color: #1b1b1b;
  cursor: pointer;
  transition: background 150ms;
}

.qty-btn-ctrl:last-child {
  border-right: none;
  border-left: 1.5px solid rgba(27, 27, 27, .1);
}

.qty-btn-ctrl:hover {
  background: #f0f2f5;
}

.qty-val {
  min-width: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  color: #1b1b1b;
}

.actions {
  display: flex;
  gap: 12px;
}

.add-btn {
  flex: 1.6;
  height: 54px;
  border-radius: 14px;
  border: none;
  font-weight: 900;
  font-size: 13.5px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: filter 200ms, transform 200ms;
  letter-spacing: .3px;
}

.add-btn:hover:not(:disabled) {
  filter: brightness(.88);
  transform: translateY(-1px);
}

.add-btn-done {
  background: rgba(46, 204, 113, .10) !important;
  color: #1aab5c;
  box-shadow: none !important;
  cursor: default;
}

.quote-btn {
  flex: 1;
  height: 54px;
  border-radius: 14px;
  background: #fff;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 200ms;
}

.quote-btn:hover {
  background: rgba(0, 0, 0, .03);
  transform: translateY(-1px);
}

.go-cart-link {
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-size: 13px;
  font-weight: 800;
  padding: 0;
  text-decoration: underline;
  width: fit-content;
}

.cert-box {
  border-radius: 16px;
  border: 2px solid;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cert-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.cert-emoji {
  font-size: 20px;
}

.cert-title {
  font-size: 13px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 2px;
}

.cert-sub {
  font-size: 12px;
  color: rgba(27, 27, 27, .5);
  margin: 0;
}

/* tabs */
.tabs-section {
  margin-bottom: 52px;
}

.tab-bar {
  display: flex;
  border-bottom: 2px solid rgba(27, 27, 27, .08);
  margin-bottom: 28px;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2.5px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  color: rgba(27, 27, 27, .45);
  transition: all 180ms;
}

.tab-panel {
  max-width: 780px;
}

.panel-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 900;
  color: #1b1b1b;
}

.specs-table {
  border-radius: 14px;
  border: 1.5px solid rgba(27, 27, 27, .08);
  overflow: hidden;
  margin-bottom: 20px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 13px 20px;
}

.spec-row.even {
  background: #fff;
}

.spec-row:not(.even) {
  background: rgba(27, 27, 27, .02);
}

.sr-label {
  font-size: 14px;
  color: rgba(27, 27, 27, .6);
}

.sr-value {
  font-size: 14px;
  font-weight: 800;
  color: #1b1b1b;
  text-align: right;
}

.long-desc {
  font-size: 15px;
  line-height: 1.75;
  color: rgba(27, 27, 27, .7);
  margin: 0 0 22px;
}

.feat-title {
  font-size: 16px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 13px;
}

.feat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feat-item {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: rgba(27, 27, 27, .7);
}

.feat-check {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

/* additional info */
.additional-info {
  margin-bottom: 52px;
}

.ai-title {
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 14px;
  border-top: 2px solid rgba(27, 27, 27, .06);
  padding-top: 32px;
}

.ai-table {
  border-radius: 12px;
  border: 1.5px solid rgba(27, 27, 27, .08);
  overflow: hidden;
  max-width: 600px;
}

.ai-row {
  display: flex;
  padding: 13px 20px;
  border-bottom: 1px solid rgba(27, 27, 27, .05);
}

.ai-row:last-child {
  border-bottom: none;
}

.ai-lbl {
  width: 150px;
  flex-shrink: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, .55);
}

.ai-val {
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
}

.ai-link {
  cursor: pointer;
}

/* related */
.related-section {
  border-top: 2px solid rgba(27, 27, 27, .06);
  padding-top: 48px;
}

.related-title {
  margin: 0 0 22px;
  font-size: 24px;
  font-weight: 900;
  color: #1b1b1b;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}

.related-card {
  border-radius: 16px;
  border: 2px solid rgba(27, 27, 27, .08);
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: all 220ms;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .1);
}

.related-img-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.related-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info {
  padding: 12px 14px;
}

.rel-kicker {
  font-size: 10.5px;
  font-weight: 900;
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: .7px;
}

.rel-name {
  font-size: 13px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rel-price {
  font-size: 14px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 10px;
}

.rel-btn {
  padding: 7px 14px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
}

.rel-btn:hover {
  background: #0062c8;
}

/* reveal */
:global(.reveal) {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

:global(.reveal.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

/* img fade */
.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 200ms;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}

.not-found {
  padding: 100px 0;
  text-align: center;
  color: rgba(27, 27, 27, .4);
  font-size: 15px;
}

/* responsive */
@media (max-width:1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .thumbnails {
    flex-direction: row;
    overflow-x: auto;
  }

  .thumb {
    width: 76px;
    height: 76px;
    flex: 0 0 auto;
  }
}

@media (max-width:768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .actions {
    flex-direction: column;
  }

  .quick-specs {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:480px) {
  .related-grid {
    grid-template-columns: 1fr;
  }

  .detail-section {
    padding: 24px 0 56px;
  }

  .price-main {
    font-size: 26px;
  }
}
</style>
