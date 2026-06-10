<template>
  <section class="store-section">
    <div v-if="loading" class="loading-wrap column items-center justify-center">
      <q-spinner color="blue-6" size="42px" />
      <p class="loading-text">Cargando tienda...</p>
    </div>

    <template v-else-if="empresa">

      <!-- ── BANNER ── -->
      <div class="store-banner"
        :style="empresa.profile?.bannerUrl ? { backgroundImage: `url('${empresa.profile.bannerUrl}')` } : {}">
        <div class="banner-overlay" />
      </div>

      <div class="bs-wrap">

        <!-- ── PERFIL ── -->
        <div class="profile-card">
          <div class="profile-logo-wrap">
            <div class="profile-logo">
              <img v-if="empresa.profile?.logoUrl" :src="empresa.profile.logoUrl" :alt="empresaNombre" />
              <i v-else class="ti ti-building-factory-2 profile-logo-icon" aria-hidden="true" />
            </div>
          </div>
          <div class="profile-info">
            <div class="profile-accent" />
            <h1 class="profile-name">{{ empresaNombre }}</h1>
            <p class="profile-desc">{{ companyDescription }}</p>
          </div>
        </div>

        <!-- ── CONTENIDO ── -->
        <div class="content-wrap">
          <nav class="breadcrumb">
            <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">{{ empresaNombre }}</span>
          </nav>

          <!-- Productos -->
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
              <article v-for="p in filteredProducts" :key="p.id" class="product-card"
                @click="router.push(`/tienda/empresa/${empresa.id}/producto/${p.id}`)">
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
                    <button class="product-btn"
                      @click.stop="router.push(`/tienda/empresa/${empresa.id}/producto/${p.id}`)">
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

const empresaNombre = computed(() =>
  empresa.value?.profile?.nombreComercial ||
  empresa.value?.profile?.razonSocial ||
  'Empresa ZIFCOR'
)

const companyDescription = computed(() =>
  empresa.value?.profile?.descripcion ||
  'Empresa registrada en ZIFCOR. Explora su catálogo, conoce sus productos y contáctala directamente desde la plataforma.'
)

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

async function loadEmpresa() {
  loading.value = true
  try {
    const { data } = await publicApi.getEmpresa(empresaId.value)
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
    const { data } = await publicApi.getProductosEmpresa(empresaId.value, {
      page: page.value, limit: 12, q: search.value || undefined, estado: 'published',
    })
    productos.value = data?.data || []
    total.value = data?.total || 0
    pages.value = data?.pages || 0
    if (!availableCategories.value.some(c => c.id === selectedCategory.value)) {
      selectedCategory.value = 'all'
    }
  } catch {
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
  searchTimeout = setTimeout(() => { page.value = 1; loadProductos() }, 400)
}

watch(() => route.params.empresaId, async () => {
  page.value = 1
  selectedCategory.value = 'all'
  await loadEmpresa()
  await loadProductos()
}, { immediate: true })
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

/* ── BANNER ── */
.store-banner {
  height: 300px;
  width: 100%;
  background-color: #0d1f3c;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(11, 18, 32, .18), rgba(11, 18, 32, .55));
}

/* ── WRAP ── */
.bs-wrap {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}

/* ── PERFIL ── */
.profile-card {
  position: relative;
  margin-top: -72px;
  z-index: 3;
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(11, 18, 32, .10);
  padding: 28px 36px;
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
  box-sizing: border-box;
}

.profile-logo-wrap {
  flex-shrink: 0;
}

.profile-logo {
  width: 88px;
  height: 88px;
  border-radius: 16px;
  background: #f4f5f7;
  border: 1.5px solid rgba(11, 18, 32, .08);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
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
}

.profile-accent {
  width: 32px;
  height: 3px;
  background: #1354d3;
  border-radius: 2px;
  margin-bottom: 4px;
}

.profile-name {
  margin: 0;
  font-size: clamp(20px, 2.8vw, 32px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.profile-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(11, 18, 32, .52);
  max-width: 72ch;
}

/* ── CONTENIDO ── */
.content-wrap {
  padding: 24px 0 70px;
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

/* ── PRODUCTOS ── */
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

/* Categorías */
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

/* Grid productos */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
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
  height: 180px;
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
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-cat {
  margin: 0 0 5px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .9px;
  text-transform: uppercase;
  color: #1354d3;
}

.product-name {
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 900;
  line-height: 1.35;
  color: #0b1220;
}

.product-desc {
  margin: 0 0 12px;
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(11, 18, 32, .50);
  flex: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.product-price {
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.product-price-na {
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, .38);
}

.product-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  background: transparent;
  border: 1.5px solid rgba(19, 84, 211, .22);
  border-radius: 8px;
  font-size: 12px;
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

/* Paginación */
.pagination-wrap {
  margin-top: 28px;
}

/* Empty */
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

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .profile-card {
    border-radius: 14px;
  }

  .store-banner {
    height: 200px;
  }

  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    margin-top: -40px;
    padding: 20px;
    gap: 16px;
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
    grid-template-columns: 1fr;
  }

  .profile-logo {
    width: 72px;
    height: 72px;
  }
}
</style>
