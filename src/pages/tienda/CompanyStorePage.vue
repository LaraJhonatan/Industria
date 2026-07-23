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
            <span class="bc-current">{{ displayName }}</span>
          </nav>

          <div class="profile-card" :class="{ 'profile-card--zifcor': isZifcor }">
            <div class="profile-logo-wrap">
              <div class="profile-logo" :class="{ 'profile-logo--zifcor': isZifcor }">
                <q-icon v-if="isZifcor" :name="sectorIcon" size="36px" class="profile-sector-icon" />
                <img v-else-if="empresa.profile?.logoUrl" :src="empresa.profile.logoUrl" :alt="displayName" />
                <i v-else class="ti ti-building-factory-2 profile-logo-icon" aria-hidden="true" />
              </div>
            </div>
            <div class="profile-info">
              <div class="profile-name-row">
                <h1 class="profile-name">{{ displayName }}</h1>
                <span v-if="isZifcor" class="profile-official">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Proveedor oficial
                </span>
              </div>
              <p v-if="!isZifcor" class="profile-desc">{{ companyDescription }}</p>
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

            <button v-if="categoryTree.length" class="mobile-filter-toggle" @click="mobileFilterOpen = !mobileFilterOpen">
              <q-icon name="tune" size="16px" />
              Categorías
              <span v-if="activeFilterLabel" class="mobile-filter-active">{{ activeFilterLabel }}</span>
            </button>

            <div class="products-layout">

              <aside v-if="categoryTree.length" class="category-sidebar" :class="{ 'category-sidebar--open': mobileFilterOpen }">
                <div class="sidebar-head">
                  <h3 class="sidebar-title">Categorías</h3>
                  <button class="sidebar-close" @click="mobileFilterOpen = false">
                    <q-icon name="close" size="16px" />
                  </button>
                </div>

                <button class="sidebar-all" :class="{ 'sidebar-all--active': !selectedCategoryId }"
                  @click="selectAll()">
                  Todas las categorías
                  <span class="sidebar-count">{{ totalCatalogo }}</span>
                </button>

                <ul class="sidebar-tree">
                  <li v-for="cat in categoryTree" :key="cat.id" class="sidebar-node">
                    <div class="sidebar-row" :class="{ 'sidebar-row--active': selectedCategoryId === cat.id && !selectedSubcategoryId }">
                      <button class="sidebar-row-main" @click="selectCategory(cat)">
                        <span class="sidebar-label">{{ cat.nombre }}</span>
                        <span class="sidebar-count">{{ cat.count }}</span>
                      </button>
                      <button v-if="cat.subs.length" class="sidebar-chevron"
                        :class="{ 'sidebar-chevron--open': expanded[cat.id] }"
                        @click="toggleExpand(cat.id)" :aria-label="expanded[cat.id] ? 'Contraer' : 'Expandir'">
                        <q-icon name="expand_more" size="18px" />
                      </button>
                    </div>

                    <ul v-if="cat.subs.length" class="sidebar-subtree" :class="{ 'sidebar-subtree--open': expanded[cat.id] }">
                      <li v-for="sub in cat.subs" :key="sub.id">
                        <button class="sidebar-sub-row" :class="{ 'sidebar-sub-row--active': selectedSubcategoryId === sub.id }"
                          @click="selectSubcategory(cat, sub)">
                          <span class="sidebar-label">{{ sub.nombre }}</span>
                          <span class="sidebar-count">{{ sub.count }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </aside>

              <div v-if="mobileFilterOpen" class="sidebar-overlay" @click="mobileFilterOpen = false" />

              <div class="products-main">
                <div v-if="loadingProducts" class="loading-products column items-center justify-center">
                  <q-spinner color="blue-6" size="34px" />
                </div>

                <div v-else-if="!filteredProducts.length" class="empty-state">
                  <div class="empty-icon">
                    <q-icon name="filter_alt_off" size="48px" color="grey-4" />
                  </div>
                  <h3 class="empty-title">No hay productos en esta categoría</h3>
                  <p class="empty-sub">Prueba con otra categoría o limpia el filtro.</p>
                  <button v-if="selectedCategoryId" class="empty-clear-btn" @click="selectAll()">Ver todas las
                    categorías</button>
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

const selectedCategoryId = ref(null)
const selectedSubcategoryId = ref(null)
const expanded = ref({})
const mobileFilterOpen = ref(false)

let searchTimeout = null

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

const ZIFCOR_TITLE_BY_SECTOR = {
  manufacturero: 'Maquinaria industrial',
  agroindustria: 'Productos agroindustriales',
  servicios: 'Servicios industriales',
  tecnologia: 'Productos tecnológicos',
}

const displayName = computed(() => {
  if (isZifcor.value) {
    return ZIFCOR_TITLE_BY_SECTOR[sectorSlug.value?.toLowerCase()] || empresaNombre.value
  }
  return empresaNombre.value
})

const SECTOR_ICONS = {
  manufacturero: 'precision_manufacturing',
  agroindustria: 'agriculture',
  comercio: 'storefront',
  servicios: 'handyman',
  tecnologia: 'memory',
  construccion: 'apartment',
}

const sectorIcon = computed(() => SECTOR_ICONS[sectorSlug.value?.toLowerCase()] || 'category')

const categoryTree = ref([])
const totalCatalogo = ref(0)

const activeFilterLabel = computed(() => {
  if (selectedSubcategoryId.value) {
    for (const cat of categoryTree.value) {
      const sub = cat.subs.find((s) => s.id === selectedSubcategoryId.value)
      if (sub) return sub.nombre
    }
  }
  if (selectedCategoryId.value) {
    return categoryTree.value.find((c) => c.id === selectedCategoryId.value)?.nombre || ''
  }
  return ''
})

const filteredProducts = computed(() => productos.value)

function selectAll() {
  selectedCategoryId.value = null
  selectedSubcategoryId.value = null
  mobileFilterOpen.value = false
  page.value = 1
  loadProductos()
}

function selectCategory(cat) {
  selectedCategoryId.value = cat.id
  selectedSubcategoryId.value = null
  if (cat.subs.length) expanded.value[cat.id] = true
  mobileFilterOpen.value = false
  page.value = 1
  loadProductos()
}

function selectSubcategory(cat, sub) {
  selectedCategoryId.value = cat.id
  selectedSubcategoryId.value = sub.id
  mobileFilterOpen.value = false
  page.value = 1
  loadProductos()
}

function toggleExpand(catId) {
  expanded.value[catId] = !expanded.value[catId]
}

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
      sectorSlug: sectorSlug.value,
      categoryId: selectedCategoryId.value || undefined,
      subcategoryId: selectedSubcategoryId.value || undefined,
    })
    productos.value = data?.data || []
    total.value = data?.total || 0
    pages.value = data?.pages || 0
    categoryTree.value = data?.categorias || []
    totalCatalogo.value = data?.categorias?.reduce((s, c) => s + c.count, 0) || 0
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
    selectAll()
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

.profile-logo--zifcor {
  background: linear-gradient(150deg, #1657c9, #4f9cf9);
  border-color: transparent;
}

.profile-logo--zifcor :deep(.profile-sector-icon) {
  color: #fff;
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

.mobile-filter-toggle {
  display: none;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 42px;
  padding: 0 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1.5px solid rgba(11, 18, 32, .1);
  background: #fff;
  color: #0b1220;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}

.mobile-filter-active {
  margin-left: auto;
  color: #1354d3;
  font-weight: 900;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.products-layout {
  display: grid;
  grid-template-columns: 196px 1fr;
  gap: 20px;
  align-items: start;
}

.category-sidebar {
  position: sticky;
  top: 20px;
  padding: 4px 12px 4px 0;
  border-right: 1px solid rgba(11, 18, 32, .08);
}

.sidebar-head {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sidebar-close {
  width: 30px;
  height: 30px;
  border: none;
  background: rgba(11, 18, 32, .05);
  border-radius: 8px;
  color: #0b1220;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.sidebar-title {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: rgba(11, 18, 32, .45);
}

.sidebar-all {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 10px;
  border: none;
  border-radius: 9px;
  background: none;
  color: #0b1220;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background 140ms;
  margin-bottom: 6px;
}

.sidebar-all:hover {
  background: rgba(11, 18, 32, .045);
}

.sidebar-all--active {
  background: rgba(19, 84, 211, .09);
  color: #1354d3;
}

.sidebar-tree {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(11, 18, 32, .07);
  padding-top: 6px;
}

.sidebar-node {
  margin-bottom: 2px;
}

.sidebar-row {
  display: flex;
  align-items: center;
  border-radius: 9px;
  transition: background 140ms;
}

.sidebar-row:hover {
  background: rgba(11, 18, 32, .04);
}

.sidebar-row--active {
  background: rgba(19, 84, 211, .09);
}

.sidebar-row-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 6px 9px 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  min-width: 0;
}

.sidebar-row--active .sidebar-label {
  color: #1354d3;
  font-weight: 900;
}

.sidebar-label {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-count {
  flex-shrink: 0;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .07);
  color: rgba(11, 18, 32, .55);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 900;
}

.sidebar-chevron {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  margin-right: 4px;
  border: none;
  background: none;
  color: rgba(11, 18, 32, .4);
  cursor: pointer;
  border-radius: 7px;
  display: grid;
  place-items: center;
  transition: transform 200ms ease, background 140ms;
}

.sidebar-chevron:hover {
  background: rgba(11, 18, 32, .06);
  color: #0b1220;
}

.sidebar-chevron--open {
  transform: rotate(180deg);
}

.sidebar-subtree {
  list-style: none;
  margin: 0;
  padding: 0 0 0 16px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 260ms ease;
}

.sidebar-subtree--open {
  max-height: 600px;
}

.sidebar-sub-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 7px 10px 7px 12px;
  margin: 1px 0;
  border: none;
  border-left: 2px solid rgba(11, 18, 32, .09);
  background: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  border-radius: 0 7px 7px 0;
  transition: background 140ms, border-color 140ms;
}

.sidebar-sub-row:hover {
  background: rgba(11, 18, 32, .04);
}

.sidebar-sub-row .sidebar-label {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(11, 18, 32, .70);
  white-space: normal;
  line-height: 1.3;
}

.sidebar-sub-row--active {
  border-left-color: #1354d3;
  background: rgba(19, 84, 211, .07);
}

.sidebar-sub-row--active .sidebar-label {
  color: #1354d3;
  font-weight: 800;
}

.sidebar-overlay {
  display: none;
}

.products-main {
  min-width: 0;
}

.empty-clear-btn {
  margin-top: 16px;
  height: 38px;
  padding: 0 18px;
  border-radius: 10px;
  border: 1.5px solid rgba(19, 84, 211, .25);
  background: rgba(19, 84, 211, .06);
  color: #1354d3;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
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

  .mobile-filter-toggle {
    display: flex;
  }

  .products-layout {
    grid-template-columns: 1fr;
  }

  .category-sidebar {
    display: none;
  }

  .category-sidebar--open {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 6000;
    width: min(84vw, 320px);
    background: #fff;
    border-right: none;
    padding: 16px;
    overflow-y: auto;
    box-shadow: 8px 0 32px rgba(0, 0, 0, .18);
  }

  .category-sidebar--open .sidebar-head {
    display: flex;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 5999;
    background: rgba(11, 18, 32, .45);
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
