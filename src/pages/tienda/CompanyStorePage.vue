<template>
  <section class="store-section">
    <div v-if="loading" class="loading-wrap column items-center justify-center">
      <q-spinner color="blue-6" size="42px" />
      <p class="loading-text">Cargando tienda...</p>
    </div>

    <template v-else-if="empresa">
      <div class="bs-wrap">
        <div class="content-wrap">
          <nav class="breadcrumb">
            <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">{{ empresaNombre }}</span>
          </nav>

          <div class="profile-card" :class="{ 'profile-card--zifcor': isZifcor }">
            <div class="profile-logo-wrap">
              <div class="profile-logo">
                <img v-if="empresa.profile?.logoUrl" :src="empresa.profile.logoUrl" :alt="empresaNombre" />
                <i v-else class="ti ti-building-factory-2 profile-logo-icon" aria-hidden="true" />
              </div>
            </div>
            <div class="profile-info">
              <div class="profile-name-row">
                <h1 class="profile-name">{{ empresaNombre }}</h1>
                <span v-if="isZifcor" class="profile-official">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Proveedor oficial
                </span>
              </div>
              <p class="profile-desc">{{ companyDescription }}</p>
            </div>
          </div>

          <div class="products-section">
            <div class="products-head">
              <div class="products-head-left">
                <h2 class="products-title">Productos</h2>
                <div class="products-title-accent" />
              </div>
              <q-input v-model="search" outlined dense clearable placeholder="Buscar producto..." class="search-input"
                @update:model-value="onSearch">
                <template #prepend>
                  <q-icon name="search" color="grey-5" size="16px" />
                </template>
              </q-input>
            </div>

            <div v-if="availableCategories.length > 1" class="category-filters">
              <button v-for="cat in availableCategories" :key="cat.id" class="cat-chip"
                :class="{ 'cat-chip-active': selectedCategory === cat.id }" @click="selectedCategory = cat.id">
                {{ cat.label }}
                <span v-if="cat.id !== 'all'" class="chip-count">
                  {{productos.filter(p => String(p.category?.id ?? p.category?.nombre ?? '') === cat.id).length}}
                </span>
              </button>
            </div>

            <div v-if="loadingProducts" class="loading-products column items-center justify-center">
              <q-spinner color="blue-6" size="34px" />
            </div>

            <div v-else-if="!filteredProducts.length" class="empty-state">
              <div class="empty-icon">
                <q-icon name="filter_alt_off" size="48px" color="grey-4" />
              </div>
              <h3 class="empty-title">No hay productos en esta categoría</h3>
              <p class="empty-sub">Prueba con otra categoría o limpia el filtro.</p>
            </div>

            <div v-else class="products-grid">
              <article v-for="p in filteredProducts" :key="p.id" class="product-card" @click="goToProducto(p)">
                <div class="product-img">
                  <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" :alt="p.nombre" />
                  <div v-else class="product-img-empty">
                    <q-icon name="inventory_2" size="32px" color="grey-4" />
                  </div>
                </div>
                <div class="product-info">
                  <p v-if="p.category?.nombre" class="product-cat">{{ p.category.nombre }}</p>
                  <h3 class="product-name">{{ p.nombre }}</h3>
                  <p v-if="p.descripcion" class="product-desc">
                    {{ p.descripcion.length > 90 ? p.descripcion.slice(0, 90) + '...' : p.descripcion }}
                  </p>
                  <div class="product-footer">
                    <span v-if="p.precioBase" class="product-price">
                      ${{ Number(p.precioBase).toLocaleString('es-CO') }} {{ p.moneda }}
                    </span>
                    <span v-else class="product-price-na">Consultar precio</span>
                    <button class="product-btn" @click.stop="goToProducto(p)">
                      Ver detalles
                      <i class="ti ti-arrow-right" aria-hidden="true" />
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
import { slugify } from '../../utils/slugify'

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

// El ID real viene de:
// 1. ?eid=GUID  — navegación interna desde CompanyCategoriesPage o CompaniesBySectorPage
// 2. route.params.empresaId — cuando el param ES un GUID (link directo legacy)
const sectorSlug = computed(() => route.params.sectorSlug)
const empresaSlug = computed(() => route.params.empresaSlug)


const empresaNombre = computed(() =>
  empresa.value?.profile?.nombreComercial ||
  empresa.value?.profile?.razonSocial ||
  'Empresa ZIFCOR'
)


const companyDescription = computed(() =>
  empresa.value?.profile?.descripcion ||
  'Empresa registrada en ZIFCOR. Explora su catálogo, conoce sus productos y contáctala directamente desde la plataforma.'
)

const isZifcor = computed(() => empresaNombre.value.trim().toUpperCase() === 'ZIFCOR')

const availableCategories = computed(() => {
  const map = new Map()
  for (const p of productos.value) {
    const rawId = p.category?.id ?? p.category?.nombre
    const rawName = p.category?.nombre
    if (!rawId || !rawName) continue
    map.set(String(rawId), { id: String(rawId), label: rawName })
  }
  return [{ id: 'all', label: 'Todas' }, ...Array.from(map.values())]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return productos.value
  return productos.value.filter(p =>
    String(p.category?.id ?? p.category?.nombre ?? '') === selectedCategory.value
  )
})

// Tras cargar la empresa limpia el ?eid de la URL → queda /tienda/empresa/zifcor
function cleanUrl() {
  if (!empresa.value) return
  history.replaceState(history.state, '', `/tienda/empresa/${empresaSlug.value}`)
}
async function loadEmpresa() {
  loading.value = true
  try {
    const { data } = await publicApi.getEmpresaPorSlug(empresaSlug.value)
    empresa.value = data
  } catch {
    empresa.value = null
  } finally {
    loading.value = false
  }
}

async function loadProductos() {
  loadingProducts.value = true
  try {
    const { data } = await publicApi.getProductosEmpresaPorSlug(empresaSlug.value, {
      page: page.value,
      limit: 12,
      q: search.value || undefined,
      estado: 'published',
      sectorSlug: sectorSlug.value, // 👈 aquí ya lo tienes directo
    })
    productos.value = data?.data || []
    total.value = data?.total || 0
    pages.value = data?.pages || 0
  } catch {
    productos.value = []
    total.value = 0
    pages.value = 0
  } finally {
    loadingProducts.value = false
  }
}



function onSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { page.value = 1; loadProductos() }, 400)
}

// Navega al producto con URL bonita + IDs en query params ocultos
// URL visible:  /tienda/empresa/zifcor/producto/nombre-del-producto
// IDs internos: ?eid=GUID-empresa&pid=GUID-producto  (se limpian al cargar)
function goToProducto(p) {
  const sector = route.params.sectorSlug
  router.push({
    path: `/tienda/${sector}/${empresaSlug.value}/producto/${p.slug}`,
  })
}



watch(
  () => route.query.eid || route.params.empresaId,
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
  background: #f4f5f7;
  min-height: 100vh;
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

.bs-wrap {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}

.profile-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(11, 18, 32, .06);
  padding: 22px 26px;
  display: flex;
  align-items: center;
  gap: 22px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 22px;
}

/* Acento de marca a la izquierda, en vez de un banner enorme */
.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #1657c9, #4f9cf9);
}

.profile-card--zifcor {
  border: 2px solid rgba(19, 84, 211, .30);
  box-shadow: 0 0 0 4px rgba(19, 84, 211, .06), 0 8px 26px rgba(19, 84, 211, .12);
}

.profile-logo-wrap {
  flex-shrink: 0;
}

.profile-logo {
  width: 74px;
  height: 74px;
  border-radius: 15px;
  background: #f4f5f7;
  border: 1.5px solid rgba(11, 18, 32, .08);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
}

.profile-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.profile-logo-icon {
  font-size: 36px;
  color: rgba(11, 18, 32, .25);
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-name {
  margin: 0;
  font-size: clamp(19px, 2.4vw, 27px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.profile-official {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  border-radius: 999px;
  background: rgba(19, 84, 211, .10);
  color: #1354d3;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .3px;
  text-transform: uppercase;
  white-space: nowrap;
}

.profile-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(11, 18, 32, .52);
  max-width: 72ch;
}

.content-wrap {
  padding: 28px 0 70px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 24px;
}

.bc-link {
  color: #1354d3;
  font-weight: 800;
  cursor: pointer;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, .28);
}

.bc-current {
  color: rgba(27, 27, 27, .55);
  font-weight: 700;
}

.products-section {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 28px 32px;
  width: 100%;
  box-sizing: border-box;
}

.products-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.products-head-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.products-title {
  margin: 0;
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.4px;
}

.products-title-accent {
  width: 32px;
  height: 3px;
  background: #1354d3;
  border-radius: 2px;
}

.search-input {
  width: 240px;
}

.category-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.cat-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px solid rgba(11, 18, 32, .09);
  background: #fff;
  color: rgba(11, 18, 32, .65);
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 160ms ease;
  font-family: inherit;
}

.cat-chip:hover {
  border-color: rgba(19, 84, 211, .22);
  color: #1354d3;
  background: rgba(19, 84, 211, .04);
}

.cat-chip-active {
  background: #1354d3;
  color: #fff;
  border-color: #1354d3;
  box-shadow: 0 6px 18px rgba(19, 84, 211, .22);
}

.chip-count {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
}

.cat-chip-active .chip-count {
  background: rgba(255, 255, 255, .20);
}

.loading-products {
  min-height: 200px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
  gap: 16px;
}

.product-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 220ms ease, transform 220ms ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(11, 18, 32, .10);
  border-color: rgba(19, 84, 211, .16);
}

.product-img {
  height: 148px;
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
  padding: 12px 13px 13px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-cat {
  margin: 0 0 4px;
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: .8px;
  text-transform: uppercase;
  color: #1354d3;
}

.product-name {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 900;
  line-height: 1.3;
  color: #0b1220;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-desc {
  margin: 0 0 10px;
  font-size: 11.5px;
  line-height: 1.5;
  color: rgba(11, 18, 32, .50);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.product-price {
  font-size: 13.5px;
  font-weight: 900;
  color: #0b1220;
}

.product-price-na {
  font-size: 11px;
  font-weight: 800;
  color: rgba(11, 18, 32, .38);
}

.product-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: 1.5px solid rgba(19, 84, 211, .22);
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  color: #1354d3;
  cursor: pointer;
  transition: background 160ms, border-color 160ms;
  white-space: nowrap;
  font-family: inherit;
}

.product-btn:hover {
  background: rgba(19, 84, 211, .06);
  border-color: #1354d3;
}

.product-btn .ti {
  font-size: 13px;
}

.pagination-wrap {
  margin-top: 28px;
}

.empty-state {
  text-align: center;
  padding: 48px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .04);
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
}

.empty-title {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 900;
  color: #0b1220;
}

.empty-sub {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 18, 32, .45);
}

@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 18px 18px 22px;
    gap: 14px;
    border-radius: 14px;
  }

  .search-input {
    width: 100%;
  }

  .products-head {
    align-items: stretch;
  }

  .products-section {
    padding: 20px 16px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }

  .cat-chip {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .profile-logo {
    width: 64px;
    height: 64px;
  }
}
</style>
