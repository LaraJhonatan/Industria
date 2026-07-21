<template>
  <div>
    <section class="store-hero">
      <div class="sh-bg">
        <img src="/winston-chen-ZAk0UY8xYh0-unsplash.jpg" alt="" class="sh-bg-img" />
        <div class="sh-overlay" />
      </div>
      <div class="sh-content">
        <h1 class="sh-title">
          Encuentra proveedores,<br />
          <span class="sh-title-blue">productos y servicios</span><br />
          para tu empresa
        </h1>
        <p class="sh-sub">Busca entre miles de empresas y encuentra exactamente lo que necesitas.</p>

        <div class="search-block">
          <div class="search-bar" :class="{ focused: searchFocused }">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input v-model="searchQuery" class="search-input" type="text"
              placeholder="¿Qué estás buscando? Ej: Drones, Baterías, Acero, Café..." @focus="searchFocused = true"
              @blur="searchFocused = false" @keydown.enter="goToSearch" />
            <button class="search-img-btn" title="Buscar por imagen (próximamente)" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span class="img-tooltip">Próximamente</span>
            </button>
            <button class="search-btn" @click="goToSearch">Buscar</button>
          </div>
        </div>

        <div class="sh-examples">
          <span class="sh-examples-label">Búsquedas populares</span>
          <div class="sh-chips-outer">
            <div class="sh-chips">
              <button v-for="(ex, idx) in loopedExamples" :key="idx" class="sh-chip" @click="quickSearch(ex.label)">
                <span class="sh-chip-icon">{{ ex.icon }}</span>
                {{ ex.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CONFIANZA ═════════════════════════════════════════ -->
    <section class="trust-section">
      <div class="bs-wrap trust-grid">
        <div class="trust-item">
          <div class="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <p class="trust-title">Miles de proveedores verificados</p>
            <p class="trust-sub">Empresas confiables</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3 8-8" />
              <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <p class="trust-title">Cotiza y compra fácilmente</p>
            <p class="trust-sub">Ahorra tiempo y dinero</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="6" width="14" height="11" rx="1.5" />
              <path d="M15 10h4l3 3v4h-7z" />
              <circle cx="6" cy="19" r="1.6" />
              <circle cx="17.5" cy="19" r="1.6" />
            </svg>
          </div>
          <div>
            <p class="trust-title">Envíos a todo el país</p>
            <p class="trust-sub">Logística segura</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div>
            <p class="trust-title">Compra protegida</p>
            <p class="trust-sub">Transacciones seguras</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ PRODUCTOS DESTACADOS ══════════════════════════════ -->
    <section v-if="destacados.length > 0" class="destacados-section">
      <div class="bs-wrap">
        <div class="section-head">
          <div>
            <h2 class="section-title">Productos destacados</h2>
            <p class="section-sub">Selección de productos y servicios empresariales</p>
          </div>
          <router-link to="/tienda/buscar" class="ver-todos-link">
            Ver todos los productos
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </router-link>
        </div>

        <div class="marquee" :class="{ 'marquee--static': !marqueeProductos }">
          <div class="marquee-track" :style="marqueeProductos ? { animationDuration: prodMarqueeDuration } : {}">
            <div v-for="(item, idx) in prodMarqueeItems" :key="`p-${idx}`" class="prod-card"
              @click="goToProducto(item)">
              <div class="prod-img-wrap">
                <img v-if="item.producto.imagenUrl" :src="item.producto.imagenUrl" :alt="item.producto.imagenAlt"
                  class="prod-img" />
                <div v-else class="prod-img-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
              <div class="prod-body">
                <span class="prod-empresa">{{ item.empresa.nombreComercial || 'ZIFCOR' }}</span>
                <p class="prod-nombre">{{ item.producto.nombre }}</p>
                <p v-if="item.producto.precioBase" class="prod-precio">
                  ${{ formatPrecio(item.producto.precioBase) }}
                  <span class="prod-moneda">{{ item.producto.moneda }}</span>
                </p>
                <div class="prod-badge">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Proveedor verificado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SERVICIOS DESTACADOS ══════════════════════════════ -->
    <section v-if="serviciosDestacados.length > 0" class="destacados-section">
      <div class="bs-wrap">
        <div class="section-head">
          <div>
            <h2 class="section-title">Servicios destacados de empresas</h2>
            <p class="section-sub">Encuentra y contrata servicios especializados para tu negocio</p>
          </div>
          <router-link to="/tienda/buscar" class="ver-todos-link">
            Ver todos los servicios
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </router-link>
        </div>

        <div class="marquee" :class="{ 'marquee--static': !marqueeServicios }">
          <div class="marquee-track marquee-track--reverse"
            :style="marqueeServicios ? { animationDuration: svcMarqueeDuration } : {}">
            <div v-for="(item, idx) in svcMarqueeItems" :key="`s-${idx}`" class="prod-card svc-card"
              @click="goToProducto(item)">
              <div class="prod-img-wrap">
                <img v-if="item.producto.imagenUrl" :src="item.producto.imagenUrl" :alt="item.producto.imagenAlt"
                  class="prod-img" />
                <div v-else class="prod-img-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
              <div class="prod-body">
                <span class="prod-empresa">{{ item.empresa.nombreComercial || 'ZIFCOR' }}</span>
                <p class="prod-nombre">{{ item.producto.nombre }}</p>
                <p v-if="item.producto.precioBase" class="prod-precio">
                  Desde ${{ formatPrecio(item.producto.precioBase) }}
                  <span class="prod-moneda">{{ item.producto.moneda }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SECTORES ══════════════════════════════════════════ -->
    <section class="catalog-section">
      <div class="bs-wrap">
        <div class="section-head section-head--sectors">
          <h2 class="section-title">Explora empresas por sector</h2>
          <p class="section-sub">Descubre proveedores agrupados por su industria</p>
        </div>

        <div v-if="loading" class="column items-center q-py-xl">
          <q-spinner color="blue-6" size="40px" />
        </div>

        <div v-else class="sectors-grid">
          <div v-for="sector in sectores" :key="sector.id" class="cat-card"
            @click="router.push(`/tienda/${sector.slug}`)">
            <div class="cat-img-wrap">
              <img :src="sector.imagenUrl || '/placeholder-sector.jpg'" :alt="sector.nombre" class="cat-img" />
              <div class="cat-overlay" />
            </div>
            <div class="cat-body">
              <h3 class="cat-name">{{ sector.nombre }}</h3>
              <p class="cat-desc">{{ sector.descripcion }}</p>
              <span class="cat-prod-count">{{ sector.totalEmpresas || 0 }} empresas</span>
              <button class="cat-btn">
                Ver empresas
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cta-banner">
          <div>
            <p class="cta-title">¿Tu empresa no está aquí?</p>
            <p class="cta-sub">Regístrate y empieza a vender en ZIFCOR</p>
          </div>
          <button class="cta-btn" @click="router.push('/auth')">Registrar empresa →</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'

const router = useRouter()
const sectores = ref([])
const destacados = ref([])
const serviciosDestacados = ref([])
const loading = ref(true)
const searchQuery = ref('')
const searchFocused = ref(false)

const examples = [
  { icon: '🚁', label: 'Drones' },
  { icon: '🔋', label: 'Baterías' },
  { icon: '⚙️', label: 'Acero' },
  { icon: '☕', label: 'Café' },
  { icon: '📱', label: 'Celulares' },
  { icon: '🔧', label: 'Repuestos' },
  { icon: '💻', label: 'Electrónica' },
  { icon: '🚚', label: 'Transporte' },
  { icon: '📦', label: 'Empaques' },
  { icon: '🖥️', label: 'Software' },
]
const loopedExamples = [...examples, ...examples]

function goToSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ path: '/tienda/buscar', query: { q } })
}

function quickSearch(term) {
  searchQuery.value = term
  goToSearch()
}

function goToProducto(item) {
  if (!item || !item.producto || !item.producto.slug) return
  router.push(`/tienda/producto/${item.producto.slug}`)
}

function formatPrecio(valor) {
  if (!valor) return ''
  return Number(valor).toLocaleString('es-CO')
}

// ── Marquee continuo (productos / servicios destacados)
// Sólo se anima si hay suficientes tarjetas para llenar el ancho; si no, quedan estáticas centradas.
const MARQUEE_MIN = 5          // a partir de cuántas tarjetas conviene el desplazamiento
const SECONDS_PER_CARD = 5.5   // ritmo: lento y fluido

const marqueeProductos = computed(() => destacados.value.length >= MARQUEE_MIN)
const marqueeServicios = computed(() => serviciosDestacados.value.length >= MARQUEE_MIN)

// Se duplica la lista para que el bucle sea perfecto (translateX -50%)
const prodMarqueeItems = computed(() =>
  marqueeProductos.value ? [...destacados.value, ...destacados.value] : destacados.value,
)
const svcMarqueeItems = computed(() =>
  marqueeServicios.value ? [...serviciosDestacados.value, ...serviciosDestacados.value] : serviciosDestacados.value,
)

const prodMarqueeDuration = computed(() => `${destacados.value.length * SECONDS_PER_CARD}s`)
const svcMarqueeDuration = computed(() => `${serviciosDestacados.value.length * SECONDS_PER_CARD}s`)

// ── Fetch con reintento — evita que la sección quede vacía por un timeout puntual del backend
async function fetchWithRetry(fn, retries = 2, delayMs = 1500) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === retries) throw err
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  return undefined
}

onMounted(async () => {
  try {
    const [sectoresRes, destacadosRes, serviciosRes] = await Promise.allSettled([
      fetchWithRetry(() => publicApi.getSectores()),
      fetchWithRetry(() => publicApi.getDestacados('destacados')),
      fetchWithRetry(() => publicApi.getDestacados('servicios')),
    ])
    sectores.value = sectoresRes.status === 'fulfilled' ? sectoresRes.value.data : []
    destacados.value = destacadosRes.status === 'fulfilled' ? destacadosRes.value.data : []
    serviciosDestacados.value = serviciosRes.status === 'fulfilled' ? serviciosRes.value.data : []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ══ HERO ════════════════════════════════════════════════════ */
.store-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 40px 32px 38px;
}

.sh-bg {
  position: absolute;
  inset: 0;
}

.sh-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.sh-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0, 20, 60, 0.90) 0%, rgba(0, 50, 110, 0.75) 100%);
}

.sh-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}

.sh-title {
  margin: 0;
  font-size: clamp(24px, 3.2vw, 38px);
  font-weight: 900;
  color: #fff;
  line-height: 1.12;
  letter-spacing: -1px;
}

.sh-title-blue {
  color: #60a5fa;
}

.sh-sub {
  margin: 0;
  font-size: 15px;
  color: rgba(255, 255, 255, .65);
}

.search-block {
  width: 100%;
  max-width: 760px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #0071e3;
  border-radius: 14px;
  padding: 6px 6px 6px 16px;
  gap: 10px;
  transition: box-shadow 200ms;
}

.search-bar.focused {
  box-shadow: 0 0 0 5px rgba(0, 113, 227, .18);
}

.search-icon {
  flex-shrink: 0;
  color: rgba(11, 18, 32, .40);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #0b1220;
  background: transparent;
  min-width: 0;
}

.search-input::placeholder {
  color: rgba(11, 18, 32, .40);
}

.search-img-btn {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 10px;
  background: rgba(11, 18, 32, .06);
  color: rgba(11, 18, 32, .35);
  cursor: not-allowed;
}

.search-img-btn:hover .img-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.img-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #0b1220;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms, transform 180ms;
}

.img-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #0b1220;
}

.search-btn {
  flex-shrink: 0;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 160ms, transform 160ms, box-shadow 160ms;
}

.search-btn:hover {
  background: #005fcd;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 113, 227, .32);
}

.sh-examples {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.sh-examples-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, .45);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sh-chips-outer {
  width: 100%;
  max-width: 900px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.sh-chips {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  width: max-content;
  animation: sh-chips-scroll 26s linear infinite;
}

.sh-chips-outer:hover .sh-chips {
  animation-play-state: paused;
}

@keyframes sh-chips-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.sh-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, .10);
  border: 1px solid rgba(255, 255, 255, .20);
  border-radius: 999px;
  color: rgba(255, 255, 255, .85);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 150ms, border-color 150ms;
}

.sh-chip:hover {
  background: rgba(255, 255, 255, .20);
  border-color: rgba(255, 255, 255, .40);
}

.sh-chip-icon {
  font-size: 14px;
}

/* ══ CONFIANZA ═══════════════════════════════════════════════ */
.trust-section {
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, .07);
  padding: 22px 0;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.trust-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(0, 113, 227, .08);
  color: #0071e3;
  display: grid;
  place-items: center;
}

.trust-title {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.3;
}

.trust-sub {
  margin: 2px 0 0;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

@media (max-width: 900px) {
  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .trust-grid {
    grid-template-columns: 1fr;
  }
}

/* ══ DESTACADOS ══════════════════════════════════════════════ */
.destacados-section {
  background: #fff;
  padding: 24px 0 20px;
  border-bottom: 1px solid rgba(15, 23, 42, .07);
}

.bs-wrap {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.section-head--sectors {
  display: block;
  margin-bottom: 20px;
}

.section-title {
  margin: 0 0 3px;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.4px;
}

.section-sub {
  margin: 0;
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
}

.ver-todos-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 800;
  color: #0071e3;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 150ms;
}

.ver-todos-link:hover {
  opacity: .75;
}

/* Marquee continuo (desplazamiento fluido y lento) */
.marquee {
  position: relative;
  overflow: hidden;
  padding: 6px 0 8px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 3.5%, #000 96.5%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 3.5%, #000 96.5%, transparent);
}

.marquee-track {
  display: flex;
  gap: 14px;
  width: max-content;
  animation-name: marquee-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

.marquee-track--reverse {
  animation-direction: reverse;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* Pocas tarjetas: sin animación, centradas */
.marquee--static {
  -webkit-mask-image: none;
  mask-image: none;
}

.marquee--static .marquee-track {
  animation: none;
  width: 100%;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}

/* Tarjeta producto */
.prod-card {
  flex-shrink: 0;
  width: 160px;
  border-radius: 12px;
  border: 1.5px solid rgba(15, 23, 42, .09);
  background: #fff;
  cursor: pointer;
  scroll-snap-align: start;
  transition: transform 200ms, box-shadow 200ms, border-color 200ms;
  overflow: hidden;
}

.prod-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .10);
  border-color: rgba(0, 113, 227, .25);
}

.prod-img-wrap {
  width: 100%;
  height: 120px;
  background: #f5f7fa;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prod-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms;
}

.prod-card:hover .prod-img {
  transform: scale(1.05);
}

.prod-img-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: rgba(11, 18, 32, .2);
}

.prod-body {
  padding: 10px 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.prod-empresa {
  font-size: 10px;
  font-weight: 800;
  color: #0071e3;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.prod-nombre {
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prod-precio {
  margin: 2px 0 0;
  font-size: 13px;
  font-weight: 900;
  color: #0b1220;
}

.prod-moneda {
  font-size: 9.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .45);
  margin-left: 2px;
}

.prod-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 700;
  color: #16a34a;
}

.svc-card {
  width: 190px;
}

/* ══ SECTORES ════════════════════════════════════════════════ */
.catalog-section {
  background: #fafbfc;
  padding: 28px 0 72px;
}

/* Grid de sectores */
.sectors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-bottom: 44px;
}

.cat-card {
  position: relative;
  height: 240px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 44px rgba(0, 0, 0, .20);
}

.cat-img-wrap {
  position: absolute;
  inset: 0;
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.cat-card:hover .cat-img {
  transform: scale(1.06);
}

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4, 14, 38, .94) 8%, rgba(6, 24, 66, .68) 42%, rgba(8, 34, 90, .30) 100%);
}

.cat-body {
  position: relative;
  z-index: 1;
  padding: 18px 20px 18px;
  display: flex;
  flex-direction: column;
}

.cat-name {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.3px;
  line-height: 1.1;
}

.cat-desc {
  margin: 0 0 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, .72);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cat-prod-count {
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, .55);
  margin-bottom: 12px;
}

.cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 34px;
  padding: 0 15px;
  border: none;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  cursor: pointer;
  width: fit-content;
  background: #0071e3;
  transition: filter 180ms, transform 180ms;
}

.cat-btn:hover {
  filter: brightness(.88);
}

.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 36px;
  background: linear-gradient(135deg, #0056b3 0%, #0071e3 100%);
  border-radius: 18px;
  flex-wrap: wrap;
}

.cta-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 900;
  color: #fff;
}

.cta-sub {
  margin: 0;
  font-size: 13.5px;
  color: rgba(255, 255, 255, .75);
}

.cta-btn {
  flex-shrink: 0;
  padding: 13px 26px;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 900;
  color: #0071e3;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 180ms, box-shadow 180ms;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, .18);
}

@media (max-width: 900px) {
  .prod-card {
    width: 150px;
  }

  .prod-img-wrap {
    height: 110px;
  }
}

@media (max-width: 640px) {
  .store-hero {
    padding: 32px 16px 30px;
  }

  .cat-card {
    height: 210px;
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 24px;
  }

  .cta-btn {
    width: 100%;
    text-align: center;
  }

  .prod-card {
    width: 140px;
  }

  .prod-img-wrap {
    height: 100px;
  }
}

@media (max-width: 480px) {
  .bs-wrap {
    padding: 0 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sh-chips {
    animation: none;
  }
}
</style>
