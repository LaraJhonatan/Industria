<template>
  <section class="detail-section" aria-label="Detalle del servicio">
    <div class="bs-wrap">

      <div v-if="!product || !service" class="not-found">
        <p>Cargando producto…</p>
      </div>

      <template v-else>

        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Ruta de navegación">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Catálogo
          </button>
          <span class="bc-sep">/</span>
          <button class="bc-link" @click="router.push(`/tienda/${service.id}`)">{{ service.title }}</button>
          <span class="bc-sep">/</span>
          <span class="bc-current">{{ product.name }}</span>
        </nav>

        <!-- Main layout -->
        <div class="detail-layout">

          <!-- Gallery -->
          <div class="gallery-section">
            <div class="gallery-grid">
              <div class="thumbnails" role="list" aria-label="Miniaturas">
                <button v-for="(img, i) in product.images" :key="i" class="thumb"
                  :class="{ active: selectedImage === i }"
                  :style="selectedImage === i ? { borderColor: service.color, boxShadow: `0 0 0 3px ${service.color}30` } : {}"
                  @click="selectedImage = i" :aria-label="`Vista ${i + 1}`" :aria-pressed="selectedImage === i">
                  <img :src="img" :alt="`${product.name} - Vista ${i + 1}`" />
                </button>
              </div>
              <div class="main-image">
                <transition name="img-fade" mode="out-in">
                  <img :key="selectedImage" :src="product.images[selectedImage]" :alt="product.name" />
                </transition>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="info-section">

            <div>
              <span class="product-kicker"
                :style="{ background: colorBg, color: service.color, borderColor: colorBorder }">
                {{ service.kicker }}
              </span>
              <h1 class="product-name">{{ product.name }}</h1>
            </div>

            <div class="desc-box">
              <p>{{ product.shortDesc }}</p>
            </div>

            <div class="quick-specs">
              <div v-for="spec in product.specs" :key="spec.l" class="spec-item">
                <span class="spec-label">{{ spec.l }}</span>
                <span class="spec-value">{{ spec.v }}</span>
              </div>
            </div>

            <div>
              <p class="selector-label">Normativa:</p>
              <div class="norm-selector">
                <button v-for="n in product.normativasOptions" :key="n" class="norm-btn"
                  :class="{ active: selectedNorm === n }"
                  :style="selectedNorm === n ? { borderColor: service.color, background: colorBg, color: service.color } : {}"
                  @click="selectedNorm = n">{{ n }}</button>
              </div>
            </div>

            <div class="qty-row">
              <span class="selector-label">Cantidad:</span>
              <div class="qty-selector">
                <button v-for="n in [1, 2, 3, 4, 5]" :key="n" class="qty-btn" :class="{ active: selectedQty === n }"
                  :style="selectedQty === n ? { background: service.color, color: '#fff' } : {}"
                  @click="selectedQty = n">{{ n }}</button>
              </div>
            </div>

            <div class="stock-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Disponible</span>
            </div>

            <div class="actions">
              <button class="add-btn" :class="{ added: addedToBudget }"
                :style="!addedToBudget ? { background: service.color, boxShadow: `0 8px 22px ${service.color}40` } : {}"
                @click="handleAdd" :disabled="addedToBudget">
                <template v-if="addedToBudget">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Añadido al presupuesto
                </template>
                <template v-else>Añadir al presupuesto</template>
              </button>
              <button class="back-service-btn" :style="{ borderColor: service.color, color: service.color }"
                @click="router.push(`/tienda/${service.id}`)">
                Ver más ensayos
              </button>
            </div>

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

        <!-- Tabs -->
        <div class="tabs-section">
          <div class="tab-bar" role="tablist">
            <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }"
              :style="activeTab === tab.id ? { borderBottomColor: service.color, color: service.color } : {}"
              @click="activeTab = tab.id" role="tab" :aria-selected="activeTab === tab.id">{{ tab.label }}</button>
          </div>

          <div v-if="activeTab === 'specs'" class="tab-panel" role="tabpanel">
            <h3 class="panel-title">Especificaciones técnicas completas</h3>
            <div class="specs-table">
              <div v-for="(spec, i) in product.specs" :key="spec.l" class="spec-row" :class="{ even: i % 2 === 0 }">
                <span class="sr-label">{{ spec.l }}</span>
                <span class="sr-value">{{ spec.v }}</span>
              </div>
              <div class="spec-row">
                <span class="sr-label">Normativa</span>
                <span class="sr-value">{{ product.normativasOptions.join(', ') }}</span>
              </div>
            </div>
            <div class="norm-info" :style="{ background: colorBg, borderColor: colorBorder }">
              <p class="norm-info-title" :style="{ color: service.color }">Normativas disponibles</p>
              <div class="norm-info-tags">
                <span v-for="n in product.normativasOptions" :key="n" class="norm-info-tag"
                  :style="{ borderColor: `${service.color}44` }">{{ n }}</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'description'" class="tab-panel" role="tabpanel">
            <h3 class="panel-title">Sobre este servicio</h3>
            <p class="long-desc">{{ product.longDesc }}</p>
            <h4 class="features-title">Lo que incluye</h4>
            <ul class="features-list">
              <li v-for="f in includes" :key="f" class="feature-item">
                <span class="feature-check" :style="{ background: colorBg, color: service.color }">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
              <span class="ai-label">Normativa</span>
              <span class="ai-value">{{ product.normativasOptions.join(', ') }}</span>
            </div>
            <div class="ai-row">
              <span class="ai-label">Categoría</span>
              <span class="ai-value ai-link" :style="{ color: service.color }"
                @click="router.push(`/tienda/${service.id}`)">{{
                service.title }}</span>
            </div>
          </div>
        </div>

        <!-- Productos relacionados -->
        <div class="related-section" v-reveal>
          <h2 class="related-title">Productos relacionados</h2>
          <div class="related-grid">
            <div v-for="related in relatedProducts" :key="related.id" class="related-card"
              @click="router.push(`/tienda/${service.id}/${related.id}`)">
              <img :src="related.images[0]" :alt="related.name" class="related-img" />
              <div class="related-info">
                <p class="related-kicker" :style="{ color: service.color }">{{ service.kicker }}</p>
                <h4 class="related-name">{{ related.name }}</h4>
                <button class="related-btn">Seleccionar opciones</button>
              </div>
            </div>
          </div>
        </div>

      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SERVICES } from 'src/data/services.js'
import { useBudgetStore } from 'src/stores/budget.js'

const router = useRouter()
const route = useRoute()

const budgetStore = useBudgetStore()

// ✅ Lee los parámetros de la URL en lugar del routerStore
const service = computed(() => SERVICES.find(s => s.id === route.params.serviceId) ?? null)
const product = computed(() => service.value?.products.find(p => p.id === route.params.productId) ?? null)
const relatedProducts = computed(() => service.value?.products.filter(p => p.id !== route.params.productId) ?? [])

const selectedImage = ref(0)
const selectedNorm = ref('')
const selectedQty = ref(1)
const activeTab = ref('specs')

const colorBg = computed(() => `color-mix(in srgb, ${service.value?.color} 8%, transparent)`)
const colorBorder = computed(() => `color-mix(in srgb, ${service.value?.color} 22%, transparent)`)

const addedToBudget = computed(() => product.value ? budgetStore.isInBudget(product.value.id) : false)

// Resetea estado cuando cambia el producto
watch(product, (p) => {
  if (!p) return
  selectedImage.value = 0
  selectedNorm.value = p.normativasOptions[0] ?? ''
  selectedQty.value = 1
  activeTab.value = 'specs'
}, { immediate: true })

const tabs = [
  { id: 'specs', label: 'Especificaciones técnicas' },
  { id: 'description', label: 'Descripción detallada' },
]

const certs = [
  { emoji: '🏆', title: 'Laboratorio acreditado', sub: 'Trazabilidad ONAC / ISO 17025' },
  { emoji: '📋', title: 'Informe técnico certificado', sub: 'Entrega en 5-10 días hábiles' },
  { emoji: '🔬', title: 'Equipos calibrados', sub: 'Patrones nacionales e internacionales' },
]

const includes = [
  'Informe técnico de resultados',
  'Trazabilidad metrológica certificada',
  'Asesoría técnica para interpretación de resultados',
  'Entrega digital en PDF con firma del laboratorio',
]

async function handleAdd() {
  if (addedToBudget.value || !product.value) return
  await budgetStore.addItem({
    productId: product.value.id,
    name: product.value.name,
    category: service.value.title,
    normativa: selectedNorm.value,
    qty: selectedQty.value,
    image: product.value.images[0],
  })
}

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

/* Not found */
.not-found {
  padding: 80px 0;
  text-align: center;
  color: rgba(27, 27, 27, 0.45);
  font-size: 15px;
}

/* Breadcrumb */
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
}

.bc-sep {
  color: rgba(27, 27, 27, 0.3);
}

.bc-current {
  color: rgba(27, 27, 27, 0.55);
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Detail layout */
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 40px;
  margin-bottom: 60px;
  align-items: start;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 14px;
  align-items: start;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumb {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border: 2px solid rgba(27, 27, 27, 0.1);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: #f0f2f5;
  transition: border-color 160ms ease;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.main-image {
  border-radius: 18px;
  overflow: hidden;
  border: 2px solid rgba(27, 27, 27, 0.08);
  background: #f0f2f5;
  aspect-ratio: 4 / 3;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Info */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-kicker {
  display: inline-flex;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1.5px solid;
  margin-bottom: 10px;
}

.product-name {
  margin: 0;
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 900;
  color: #1b1b1b;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.desc-box {
  padding: 14px 16px;
  background: rgba(27, 27, 27, 0.02);
  border-radius: 14px;
  border: 1px solid rgba(27, 27, 27, 0.06);
}

.desc-box p {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.65);
  line-height: 1.7;
}

.quick-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spec-item {
  background: #f7f8fb;
  border-radius: 10px;
  padding: 12px 14px;
}

.spec-label {
  display: block;
  font-size: 11px;
  color: rgba(27, 27, 27, 0.45);
  font-weight: 600;
  margin-bottom: 4px;
}

.spec-value {
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
}

.selector-label {
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
  border: 2px solid rgba(27, 27, 27, 0.12);
  background: #fff;
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.65);
  cursor: pointer;
  transition: all 180ms ease;
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.qty-selector {
  display: flex;
  border: 1.5px solid rgba(27, 27, 27, 0.12);
  border-radius: 10px;
  overflow: hidden;
}

.qty-btn {
  width: 38px;
  height: 38px;
  background: transparent;
  border: none;
  border-right: 1.5px solid rgba(27, 27, 27, 0.08);
  font-size: 13px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.6);
  cursor: pointer;
}

.qty-btn:last-child {
  border-right: none;
}

.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(46, 204, 113, 0.08);
  border-radius: 10px;
  width: fit-content;
}

.stock-badge span {
  font-size: 13px;
  font-weight: 800;
  color: #2ecc71;
}

/* Actions */
.actions {
  display: flex;
  gap: 12px;
}

.add-btn {
  flex: 1.5;
  height: 52px;
  border-radius: 14px;
  border: none;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 220ms ease;
}

.add-btn.added {
  background: rgba(46, 204, 113, 0.12) !important;
  color: #2ecc71;
  box-shadow: none !important;
  cursor: default;
}

.back-service-btn {
  flex: 1;
  height: 52px;
  border-radius: 14px;
  background: #fff;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid;
  transition: all 200ms ease;
}

/* Cert box */
.cert-box {
  border-radius: 14px;
  border: 2px solid;
  padding: 16px 18px;
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
  color: rgba(27, 27, 27, 0.55);
  margin: 0;
}

/* Tabs */
.tabs-section {
  margin-bottom: 48px;
}

.tab-bar {
  display: flex;
  border-bottom: 2px solid rgba(27, 27, 27, 0.08);
  margin-bottom: 28px;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  color: rgba(27, 27, 27, 0.5);
  transition: all 180ms ease;
}

.tab-panel {
  max-width: 760px;
}

.panel-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 900;
  color: #1b1b1b;
}

.specs-table {
  border-radius: 14px;
  border: 1.5px solid rgba(27, 27, 27, 0.08);
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
  background: rgba(27, 27, 27, 0.02);
}

.sr-label {
  font-size: 14px;
  color: rgba(27, 27, 27, 0.6);
}

.sr-value {
  font-size: 14px;
  font-weight: 800;
  color: #1b1b1b;
  text-align: right;
}

.norm-info {
  border-radius: 12px;
  border: 1.5px solid;
  padding: 14px 18px;
}

.norm-info-title {
  font-size: 13px;
  font-weight: 800;
  margin: 0 0 10px;
}

.norm-info-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.norm-info-tag {
  background: #fff;
  border: 1.5px solid;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.7);
  padding: 4px 12px;
}

.long-desc {
  font-size: 15px;
  line-height: 1.75;
  color: rgba(27, 27, 27, 0.7);
  margin: 0 0 24px;
}

.features-title {
  font-size: 16px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 14px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.7);
}

.feature-check {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

/* Additional info */
.additional-info {
  margin-bottom: 48px;
}

.ai-title {
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 14px;
  border-top: 2px solid rgba(27, 27, 27, 0.06);
  padding-top: 32px;
}

.ai-table {
  border-radius: 12px;
  border: 1.5px solid rgba(27, 27, 27, 0.08);
  overflow: hidden;
  max-width: 640px;
}

.ai-row {
  display: flex;
  padding: 13px 20px;
  border-bottom: 1px solid rgba(27, 27, 27, 0.05);
}

.ai-row:last-child {
  border-bottom: none;
}

.ai-label {
  width: 160px;
  flex-shrink: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.55);
}

.ai-value {
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
}

.ai-link {
  cursor: pointer;
}

/* Related */
.related-section {
  border-top: 2px solid rgba(27, 27, 27, 0.06);
  padding-top: 48px;
}

.related-title {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 900;
  color: #1b1b1b;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.related-card {
  border-radius: 16px;
  border: 2px solid rgba(27, 27, 27, 0.08);
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: all 220ms ease;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.related-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.related-info {
  padding: 14px 16px;
}

.related-kicker {
  font-size: 11px;
  font-weight: 800;
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.related-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-btn {
  display: inline-block;
  padding: 8px 16px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.related-btn:hover {
  background: #0062c8;
}

/* Reveal */
:global(.reveal) {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

:global(.reveal.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

/* Image transition */
.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 200ms ease;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
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

@media (max-width: 768px) {
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

  .tab-btn {
    padding: 10px 14px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .related-grid {
    grid-template-columns: 1fr;
  }

  .detail-section {
    padding: 24px 0 56px;
  }
}
</style>
