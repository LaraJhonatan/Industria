<template>
  <section class="search-section">
    <div class="bs-wrap">

      <!-- Header -->
      <div class="search-header">
        <div class="search-header-top">
          <div>
            <p class="search-kicker">Resultados de búsqueda</p>
            <h1 class="search-title">
              <span v-if="q">« {{ q }} »</span>
              <span v-else>Todos los productos</span>
            </h1>
          </div>

          <!-- Buscador inline -->
          <div class="search-bar-wrap">
            <div class="search-bar" :class="{ focused }">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input v-model="localQuery" class="search-input" type="text" placeholder="Refina tu búsqueda..."
                @focus="focused = true" @blur="focused = false" @keydown.enter="doSearch" />
              <button class="search-btn" @click="doSearch">Buscar</button>
            </div>
          </div>
        </div>

        <p v-if="!loading" class="search-meta">
          {{ total }} resultado{{ total !== 1 ? 's' : '' }} encontrado{{ total !== 1 ? 's' : '' }}
          <span v-if="q"> para <strong>« {{ q }} »</strong></span>
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-wrap">
        <q-spinner color="blue-6" size="42px" />
        <p class="loading-text">Buscando productos...</p>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="!productos.length" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h2 class="empty-title">Sin resultados</h2>
        <p class="empty-sub">
          No encontramos productos para <strong>« {{ q }} »</strong> en nuestro catálogo actual.<br />
          Intenta con otras palabras clave o escríbenos directamente.
        </p>

        <div class="empty-actions">
          <button class="empty-btn-outline" @click="router.push('/tienda')">
            Ver todos los productos
          </button>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="empty-btn-whatsapp">
            <svg viewBox="0 0 24 24" class="wa-ico" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>

        <!-- Card de ayuda -->
        <div class="help-card">
          <div class="help-card-icon">💬</div>
          <div class="help-card-text">
            <p class="help-card-title">¿No encontraste lo que buscabas?</p>
            <p class="help-card-sub">
              Aunque <strong>«&nbsp;{{ q }}&nbsp;»</strong> no está en nuestro catálogo aún,
              podemos ayudarte a conseguirlo. Cuéntanos qué necesitas y lo gestionamos por ti.
            </p>
          </div>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="help-card-btn">
            Solicitar producto →
          </a>
        </div>
      </div>

      <!-- Grid de resultados -->
      <template v-else>
        <div class="products-grid">
          <article v-for="p in productos" :key="p.id" class="product-card"
            @click="router.push(`/tienda/empresa/${p.empresaId}/producto/${p.id}`)">
            <div class="product-img">
              <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" :alt="p.nombre" />
              <div v-else class="product-img-empty">
                <q-icon name="inventory_2" size="32px" color="grey-4" />
              </div>
            </div>

            <div class="product-info">
              <p v-if="p.category?.nombre" class="product-category">{{ p.category.nombre }}</p>
              <h3 class="product-name">{{ p.nombre }}</h3>
              <p v-if="p.descripcion" class="product-desc">
                {{ p.descripcion.slice(0, 100) }}{{ p.descripcion.length > 100 ? '...' : '' }}
              </p>

              <div v-if="p.empresa?.profile?.nombreComercial || p.empresa?.nit" class="product-empresa">
                <q-icon name="storefront" size="13px" />
                {{ p.empresa?.profile?.nombreComercial || p.empresa?.nit }}
              </div>

              <div class="product-footer">
                <span v-if="p.precioBase" class="product-price">
                  ${{ Number(p.precioBase).toLocaleString('es-CO') }} {{ p.moneda }}
                </span>
                <span v-else class="product-price-na">Consultar precio</span>
                <button class="product-btn"
                  @click.stop="router.push(`/tienda/empresa/${p.empresaId}/producto/${p.id}`)">
                  Ver detalle
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Paginación -->
        <div class="pagination-wrap row justify-center" v-if="pages > 1">
          <q-pagination v-model="page" :max="pages" color="blue-6" @update:model-value="fetchResults" />
        </div>

        <!-- Banner WhatsApp al final de resultados -->
        <div class="results-wa-banner">
          <div class="results-wa-left">
            <p class="results-wa-title">¿No encontraste exactamente lo que buscas?</p>
            <p class="results-wa-sub">Escríbenos y te ayudamos a conseguirlo o a encontrar la mejor opción.</p>
          </div>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="results-wa-btn">
            <svg viewBox="0 0 24 24" class="wa-ico" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </template>

    </div>

    <!-- WhatsApp flotante (igual que en MainLayout) -->
    <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="bs-whatsapp-float">
      <div class="bs-whatsapp-pulse" />
      <svg viewBox="0 0 24 24" class="bs-whatsapp-icon" fill="currentColor">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>

  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'

const route = useRoute()
const router = useRouter()

const ZIFCOR_WHATSAPP = '573114799224'

const q = ref(route.query.q || '')
const localQuery = ref(q.value)
const focused = ref(false)
const productos = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const pages = ref(0)

const whatsappUrl = computed(() => {
  const msg = q.value
    ? `Hola, busqué «${q.value}» en ZIFCOR y no encontré resultados. ¿Me pueden ayudar a conseguirlo?`
    : 'Hola, me gustaría recibir más información sobre los productos de ZIFCOR.'
  return `https://wa.me/${ZIFCOR_WHATSAPP}?text=${encodeURIComponent(msg)}`
})

async function fetchResults() {
  loading.value = true
  try {
    const { data } = await publicApi.searchProductos({
      q: q.value || undefined,
      page: page.value,
      limit: 16,
    })
    productos.value = data?.data || []
    total.value = data?.total || 0
    pages.value = data?.pages || 0
  } catch {
    productos.value = []
    total.value = 0
    pages.value = 0
  } finally {
    loading.value = false
  }
}

function doSearch() {
  const trimmed = localQuery.value.trim()
  router.push({ path: '/tienda/buscar', query: trimmed ? { q: trimmed } : {} })
}

watch(
  () => route.query.q,
  (val) => {
    q.value = val || ''
    localQuery.value = q.value
    page.value = 1
    fetchResults()
  },
  { immediate: true }
)
</script>

<style scoped>
.search-section {
  background: #f6f8fb;
  min-height: 100vh;
  padding-bottom: 100px;
  position: relative;
}

.bs-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 32px 0;
}

/* ── HEADER ── */
.search-header {
  margin-bottom: 32px;
}

.search-header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.search-kicker {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #0071e3;
}

.search-title {
  margin: 0;
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.6px;
}

.search-meta {
  margin: 0;
  font-size: 13.5px;
  color: rgba(11, 18, 32, .48);
  font-weight: 700;
}

/* ── BUSCADOR INLINE ── */
.search-bar-wrap {
  flex-shrink: 0;
  width: 380px;
  max-width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid rgba(11, 18, 32, .10);
  border-radius: 12px;
  padding: 6px 6px 6px 14px;
  gap: 10px;
  transition: border-color 200ms, box-shadow 200ms;
}

.search-bar.focused {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, .14);
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
  color: rgba(11, 18, 32, .36);
}

.search-btn {
  flex-shrink: 0;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: background 160ms;
}

.search-btn:hover {
  background: #005fcd;
}

/* ── LOADING ── */
.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(11, 18, 32, .48);
  font-weight: 600;
}

/* ── EMPTY ── */
.empty-state {
  text-align: center;
  padding: 60px 20px 40px;
}

.empty-icon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: rgba(11, 18, 32, .04);
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  color: rgba(11, 18, 32, .25);
}

.empty-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
}

.empty-sub {
  margin: 0 0 28px;
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  line-height: 1.6;
}

.empty-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.empty-btn-outline {
  height: 44px;
  padding: 0 24px;
  background: transparent;
  color: #0b1220;
  border: 1.5px solid rgba(11, 18, 32, .15);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 160ms;
}

.empty-btn-outline:hover {
  border-color: #0071e3;
  color: #0071e3;
}

.empty-btn-whatsapp {
  height: 44px;
  padding: 0 20px;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(37, 211, 102, .28);
  transition: filter 160ms, transform 160ms;
}

.empty-btn-whatsapp:hover {
  filter: brightness(.92);
  transform: translateY(-1px);
}

/* ── HELP CARD ── */
.help-card {
  max-width: 640px;
  margin: 0 auto;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(11, 18, 32, .06);
  flex-wrap: wrap;
}

.help-card-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.help-card-text {
  flex: 1;
  min-width: 0;
}

.help-card-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.help-card-sub {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 18, 32, .55);
  line-height: 1.5;
}

.help-card-btn {
  flex-shrink: 0;
  height: 40px;
  padding: 0 18px;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: filter 160ms;
}

.help-card-btn:hover {
  filter: brightness(.92);
}

/* ── GRID ── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.product-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 220ms ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: rgba(0, 113, 227, .18);
  box-shadow: 0 12px 28px rgba(0, 113, 227, .10);
  transform: translateY(-3px);
}

.product-img {
  height: 190px;
  overflow: hidden;
  background: #f3f6f9;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 320ms ease;
}

.product-card:hover .product-img img {
  transform: scale(1.04);
}

.product-img-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  margin: 0 0 5px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .8px;
  text-transform: uppercase;
  color: #0071e3;
}

.product-name {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.35;
  color: #0b1220;
}

.product-desc {
  margin: 0 0 10px;
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(11, 18, 32, .52);
  flex: 1;
}

.product-empresa {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(11, 18, 32, .42);
  margin-bottom: 12px;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.product-price {
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.product-price-na {
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, .42);
}

.product-btn {
  height: 34px;
  padding: 0 12px;
  background: #0071e3;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 160ms;
}

.product-btn:hover {
  filter: brightness(.9);
}

.pagination-wrap {
  margin-top: 12px;
}

/* ── BANNER WA AL FINAL DE RESULTADOS ── */
.results-wa-banner {
  margin-top: 32px;
  background: linear-gradient(100deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.results-wa-left {}

.results-wa-title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
}

.results-wa-sub {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, .6);
}

.results-wa-btn {
  flex-shrink: 0;
  height: 46px;
  padding: 0 22px;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  box-shadow: 0 8px 22px rgba(37, 211, 102, .3);
  transition: filter 160ms, transform 160ms;
}

.results-wa-btn:hover {
  filter: brightness(.92);
  transform: translateY(-1px);
}

.wa-ico {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ── WHATSAPP FLOTANTE ── */
.bs-whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, .35);
  text-decoration: none;
  transition: transform 240ms;
  z-index: 999;
}

.bs-whatsapp-float:hover {
  transform: scale(1.08);
}

.bs-whatsapp-icon {
  width: 28px;
  height: 28px;
}

.bs-whatsapp-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  animation: pulse-ring 2.2s infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: .55;
  }

  100% {
    transform: scale(1.65);
    opacity: 0;
  }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .bs-wrap {
    padding: 24px 16px 0;
  }

  .search-bar-wrap {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-wa-banner {
    flex-direction: column;
    align-items: flex-start;
  }

  .help-card {
    flex-direction: column;
    text-align: center;
  }

  .help-card-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .empty-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .empty-btn-outline,
  .empty-btn-whatsapp {
    width: 100%;
    justify-content: center;
  }
}
</style>
