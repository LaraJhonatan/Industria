<template>
  <section class="store-section">
    <div v-if="loading" class="loading-wrap column items-center justify-center">
      <q-spinner color="blue-6" size="42px" />
      <p class="loading-text">Cargando tienda...</p>
    </div>

    <template v-else-if="empresa">
      <div class="store-hero">
        <div class="banner-wrap">
          <img v-if="bannerUrl" :src="bannerUrl" :alt="`Banner de ${companyName}`" class="banner-img" />
          <div v-else class="banner-empty"></div>
          <div class="banner-overlay"></div>
        </div>
      </div>

      <div class="bs-wrap">
        <div class="store-profile-card">
          <div class="store-profile-main">
            <div class="store-logo">
              <img v-if="logoUrl" :src="logoUrl" :alt="companyName" class="store-logo-img" />
              <span v-else class="logo-letter">{{ companyName.charAt(0) }}</span>
            </div>

            <div class="store-meta">
              <div class="store-title-row">
                <h1 class="store-name">{{ companyName }}</h1>

                <span class="store-badge store-badge-verified">
                  <q-icon name="verified" size="12px" />
                  Empresa verificada
                </span>
              </div>

              <div v-if="locationText" class="store-location">
                <q-icon name="location_on" size="14px" />
                <span>{{ locationText }}</span>
              </div>

              <div class="store-tags">
                <span v-if="empresa.profile?.sitioWeb" class="store-tag">
                  <q-icon name="language" size="12px" />
                  Sitio web
                </span>

                <span v-if="empresa.profile?.whatsapp" class="store-tag store-tag-green">
                  <q-icon name="chat" size="12px" />
                  WhatsApp
                </span>

                <span v-if="empresa.profile?.linkedinUrl || empresa.profile?.linkedin" class="store-tag">
                  <q-icon name="groups" size="12px" />
                  LinkedIn
                </span>
              </div>
            </div>
          </div>

          <div class="store-actions">
            <a v-if="whatsappHref" :href="whatsappHref" target="_blank" rel="noopener" class="btn-whatsapp">
              <q-icon name="chat" size="16px" />
              Contactar por WhatsApp
            </a>

            <a v-if="empresa.profile?.sitioWeb" :href="empresa.profile.sitioWeb" target="_blank" rel="noopener"
              class="btn-secondary">
              <q-icon name="language" size="16px" />
              Ver sitio web
            </a>
          </div>
        </div>

        <div class="content-wrap">
          <nav class="breadcrumb">
            <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">{{ companyName }}</span>
          </nav>

          <div class="store-about-card">
            <div class="about-main">
              <p class="about-kicker">Acerca de la empresa</p>
              <p class="store-desc">
                {{ companyDescription }}
              </p>
            </div>

            <div class="about-side">
              <div class="about-mini-card">
                <p class="mini-label">Productos publicados</p>
                <p class="mini-value">{{ total }}</p>
              </div>

              <div class="about-mini-card">
                <p class="mini-label">Estado</p>
                <p class="mini-value mini-value-green">Activo</p>
              </div>
            </div>
          </div>

          <div class="products-shell">
            <div class="products-head">
              <div class="products-head-left">
                <h2 class="products-title">Productos</h2>
                <p class="products-count">
                  {{ total }} productos en total · {{ displayedCount }} visibles
                </p>
              </div>

              <q-input v-model="search" outlined dense clearable placeholder="Buscar producto..." class="search-input"
                @update:model-value="onSearch">
                <template #prepend>
                  <q-icon name="search" color="grey-5" size="16px" />
                </template>
              </q-input>
            </div>

            <div v-if="availableCategories.length > 1" class="category-filters">
              <button v-for="cat in availableCategories" :key="cat.id" class="category-chip"
                :class="{ 'category-chip-active': selectedCategory === cat.id }" @click="selectedCategory = cat.id">
                {{ cat.label }}
                <span v-if="cat.id !== 'all'" class="chip-count">
                  {{
                    productos.filter(
                      p => String(p.category?.id ?? p.category?.nombre ?? '') === cat.id
                    ).length
                  }}
                </span>
              </button>
            </div>

            <div v-if="loadingProducts" class="loading-products column items-center justify-center">
              <q-spinner color="blue-6" size="34px" />
            </div>

            <div v-else-if="!filteredProducts.length" class="empty-state">
              <div class="empty-icon">
                <q-icon name="filter_alt_off" size="52px" color="grey-4" />
              </div>
              <h3 class="empty-title">No hay productos en esta categoría</h3>
              <p class="empty-sub">
                Prueba con otra categoría o limpia el filtro actual.
              </p>
            </div>

            <div v-else class="products-grid">
              <article v-for="p in filteredProducts" :key="p.id" class="product-card"
                @click="router.push(`/tienda/empresa/${empresa.id}/producto/${p.id}`)">
                <div class="product-img">
                  <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" :alt="p.nombre" />
                  <div v-else class="product-img-empty">
                    <q-icon name="inventory_2" size="32px" color="grey-4" />
                  </div>
                </div>

                <div class="product-info">
                  <p v-if="p.category?.nombre" class="product-category">
                    {{ p.category.nombre }}
                  </p>

                  <h3 class="product-name">{{ p.nombre }}</h3>

                  <p v-if="p.descripcion" class="product-desc">
                    {{ p.descripcion.slice(0, 90) }}{{ p.descripcion.length > 90 ? '...' : '' }}
                  </p>

                  <div class="product-footer">
                    <span v-if="p.precioBase" class="product-price">
                      ${{ Number(p.precioBase).toLocaleString('es-CO') }} {{ p.moneda }}
                    </span>
                    <span v-else class="product-price-na">Consultar precio</span>

                    <button class="product-btn"
                      @click.stop="router.push(`/tienda/empresa/${empresa.id}/producto/${p.id}`)">
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <div class="pagination-wrap row justify-center" v-if="pages > 1">
              <q-pagination v-model="page" :max="pages" color="blue-6" @update:model-value="loadProductos" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'

const router = useRouter()
const route = useRoute()

const empresa = ref(null)
const productos = ref([])
const loading = ref(true)
const loadingProducts = ref(false)
const search = ref('')
const page = ref(1)
const total = ref(0)
const pages = ref(0)
const selectedCategory = ref('all')

let searchTimeout = null

const empresaId = computed(() => route.params.empresaId)

const companyName = computed(() =>
  empresa.value?.profile?.nombreComercial || empresa.value?.razonSocial || 'Empresa'
)

const logoUrl = computed(() =>
  empresa.value?.profile?.logoUrl || empresa.value?.profile?.logo || ''
)

const bannerUrl = computed(() =>
  empresa.value?.profile?.bannerUrl || empresa.value?.profile?.banner || ''
)

const companyDescription = computed(() =>
  empresa.value?.profile?.descripcion ||
  'Empresa registrada en ZiFux. Explora su catálogo, conoce sus productos y contáctala directamente desde la plataforma.'
)

const locationText = computed(() => {
  const ciudad = empresa.value?.profile?.ciudad
  const departamento = empresa.value?.profile?.departamento

  if (ciudad && departamento) return `${ciudad}, ${departamento}`
  if (ciudad) return ciudad
  if (departamento) return departamento
  return ''
})

const whatsappHref = computed(() => {
  const raw = empresa.value?.profile?.whatsapp
  if (!raw) return ''

  const phone = String(raw).replace(/\D/g, '')
  if (!phone) return ''

  const message = encodeURIComponent(
    `Hola, estoy interesado en los productos de ${companyName.value} que vi en ZiFux.`
  )

  return `https://wa.me/${phone}?text=${message}`
})

const availableCategories = computed(() => {
  const map = new Map()

  for (const p of productos.value) {
    const rawId = p.category?.id ?? p.category?.nombre
    const rawName = p.category?.nombre

    if (!rawId || !rawName) continue

    map.set(String(rawId), {
      id: String(rawId),
      label: rawName,
    })
  }

  return [
    { id: 'all', label: 'Todas' },
    ...Array.from(map.values()),
  ]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return productos.value

  return productos.value.filter((p) => {
    const id = String(p.category?.id ?? p.category?.nombre ?? '')
    return id === selectedCategory.value
  })
})

const displayedCount = computed(() => filteredProducts.value.length)

async function loadEmpresa() {
  loading.value = true

  try {
    const { data } = await publicApi.getEmpresa(empresaId.value)
    empresa.value = data
  } catch (error) {
    console.error('Error al cargar datos de la empresa:', error)
    empresa.value = null
  } finally {
    loading.value = false
  }
}

async function loadProductos() {
  loadingProducts.value = true

  try {
    const { data } = await publicApi.getProductosEmpresa(empresaId.value, {
      page: page.value,
      limit: 12,
      q: search.value || undefined,
      estado: 'published',
    })

    productos.value = data?.data || []
    total.value = data?.total || 0
    pages.value = data?.pages || 0

    const categoryExists = availableCategories.value.some(
      (cat) => cat.id === selectedCategory.value
    )

    if (!categoryExists) {
      selectedCategory.value = 'all'
    }
  } catch (error) {
    console.error('Error al cargar productos de la empresa:', error)
    productos.value = []
    total.value = 0
    pages.value = 0
    selectedCategory.value = 'all'
  } finally {
    loadingProducts.value = false
  }
}

function onSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    loadProductos()
  }, 400)
}

watch(
  () => route.params.empresaId,
  async () => {
    page.value = 1
    selectedCategory.value = 'all'
    await loadEmpresa()
    await loadProductos()
  },
  { immediate: true }
)
</script>

<style scoped>
.store-section {
  background: #f6f8fb;
  min-height: 100vh;
}

.bs-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

/* loading */
.loading-wrap {
  min-height: 70vh;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(11, 18, 32, 0.48);
  font-weight: 600;
}

/* hero */
.store-hero {
  position: relative;
}

.banner-wrap {
  height: 290px;
  position: relative;
  overflow: hidden;
  background: #eaf0f7;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.02);
}

.banner-empty {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 28%),
    linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #60a5fa 100%);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(11, 18, 32, 0.08), rgba(11, 18, 32, 0.38));
}

.store-profile-card {
  position: relative;
  margin-top: -68px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 26px;
  box-shadow: 0 20px 54px rgba(15, 23, 42, 0.12);
  padding: 26px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.store-profile-main {
  display: flex;
  align-items: flex-end;
  gap: 18px;
  min-width: 0;
  flex: 1;
}

.store-logo {
  width: 116px;
  height: 116px;
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  border: 4px solid #fff;
  box-shadow: 0 14px 34px rgba(11, 18, 32, 0.16);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
  padding: 10px;
  display: block;
}

.logo-letter {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(135deg, #0071e3, #42a5ff);
}

.store-meta {
  min-width: 0;
  flex: 1;
}

.store-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.store-name {
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 900;
  color: #0b1220;
  margin: 0;
  letter-spacing: -0.8px;
  line-height: 1.05;
}

.store-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  border: 1px solid transparent;
}

.store-badge-verified {
  background: rgba(34, 197, 94, 0.08);
  color: #15803d;
  border-color: rgba(34, 197, 94, 0.18);
}

.store-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: rgba(11, 18, 32, 0.52);
  font-weight: 600;
  margin-bottom: 12px;
}

.store-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.store-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  background: rgba(11, 18, 32, 0.05);
  color: rgba(11, 18, 32, 0.56);
  border: 1px solid rgba(11, 18, 32, 0.08);
}

.store-tag-green {
  background: rgba(34, 197, 94, 0.08);
  color: #15803d;
  border-color: rgba(34, 197, 94, 0.18);
}

.store-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-whatsapp,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 900;
  text-decoration: none;
  transition: all 180ms ease;
}

.btn-whatsapp {
  background: #25d366;
  color: #fff;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.24);
}

.btn-whatsapp:hover {
  filter: brightness(0.92);
  transform: translateY(-2px);
}

.btn-secondary {
  background: #fff;
  color: #0071e3;
  border: 1.5px solid rgba(0, 113, 227, 0.18);
}

.btn-secondary:hover {
  background: rgba(0, 113, 227, 0.04);
  transform: translateY(-2px);
}

/* content */
.content-wrap {
  padding: 24px 0 70px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 18px;
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
  color: rgba(27, 27, 27, 0.28);
}

.bc-current {
  color: rgba(27, 27, 27, 0.58);
  font-weight: 700;
}

.store-about-card {
  display: grid;
  grid-template-columns: 1.6fr 0.8fr;
  gap: 18px;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 22px;
  padding: 24px;
  margin-bottom: 28px;
}

.about-kicker {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #0071e3;
}

.store-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(11, 18, 32, 0.68);
  max-width: 70ch;
}

.about-side {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.about-mini-card {
  background: #f8fafc;
  border: 1px solid rgba(11, 18, 32, 0.06);
  border-radius: 16px;
  padding: 16px 18px;
}

.mini-label {
  margin: 0 0 6px;
  font-size: 12px;
  color: rgba(11, 18, 32, 0.45);
  font-weight: 700;
}

.mini-value {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
}

.mini-value-green {
  color: #15803d;
  font-size: 16px;
}

/* products shell */
.products-shell {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 24px;
  padding: 24px;
}

.products-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.products-head-left {
  display: flex;
  flex-direction: column;
}

.products-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.4px;
}

.products-count {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 18, 32, 0.45);
  font-weight: 700;
}

.search-input {
  width: 250px;
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  background: #fff;
  color: rgba(11, 18, 32, 0.68);
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 180ms ease;
}

.category-chip:hover {
  border-color: rgba(0, 113, 227, 0.2);
  background: rgba(0, 113, 227, 0.04);
  color: #0071e3;
  transform: translateY(-1px);
}

.category-chip-active {
  background: #0071e3;
  color: #fff;
  border-color: #0071e3;
  box-shadow: 0 10px 22px rgba(0, 113, 227, 0.18);
}

.chip-count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 900;
}

.category-chip-active .chip-count {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.loading-products {
  min-height: 220px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}

.product-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 220ms ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: rgba(0, 113, 227, 0.18);
  box-shadow: 0 12px 28px rgba(0, 113, 227, 0.1);
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
  margin: 0 0 6px;
  font-size: 10.5px;
  font-weight: 900;
  letter-spacing: 0.8px;
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
  margin: 0 0 14px;
  font-size: 12.8px;
  line-height: 1.55;
  color: rgba(11, 18, 32, 0.52);
  flex: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.product-price {
  font-size: 16px;
  font-weight: 900;
  color: #0b1220;
}

.product-price-na {
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, 0.42);
}

.product-btn {
  height: 36px;
  padding: 0 12px;
  background: #0071e3;
  border: none;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: filter 160ms ease, transform 160ms ease;
  white-space: nowrap;
}

.product-btn:hover {
  filter: brightness(0.9);
  transform: translateY(-1px);
}

.pagination-wrap {
  margin-top: 28px;
}

/* empty */
.empty-state {
  text-align: center;
  padding: 48px 20px;
}

.empty-icon {
  width: 86px;
  height: 86px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.04);
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
}

.empty-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 900;
  color: #0b1220;
}

.empty-sub {
  margin: 0;
  font-size: 13.5px;
  color: rgba(11, 18, 32, 0.45);
}

/* responsive */
@media (max-width: 1024px) {
  .store-about-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .banner-wrap {
    height: 230px;
  }

  .store-profile-card {
    margin-top: -46px;
    padding: 20px;
  }

  .store-profile-main {
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .store-title-row {
    justify-content: center;
  }

  .store-location,
  .store-tags {
    justify-content: center;
  }

  .store-actions {
    width: 100%;
  }

  .btn-whatsapp,
  .btn-secondary {
    width: 100%;
  }

  .products-head {
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .category-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
    scrollbar-width: thin;
  }

  .category-chip {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .store-logo {
    width: 96px;
    height: 96px;
  }

  .store-name {
    font-size: 28px;
  }
}
</style>
