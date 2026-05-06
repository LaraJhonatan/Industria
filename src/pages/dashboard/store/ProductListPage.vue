<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Productos</h1>
        <p class="page-sub">Gestiona el catálogo de tu empresa</p>
      </div>
      <q-btn unelevated label="Nuevo producto" icon="add" color="blue-6" class="action-btn"
        @click="router.push('/dashboard/productos/nuevo')" />
    </div>

    <!-- Filtros -->
    <div class="filters-bar q-mb-md row items-center gap-sm">
      <q-input v-model="filters.q" outlined dense clearable placeholder="Buscar por nombre..." style="width:240px"
        @update:model-value="onFilter">
        <template #prepend><q-icon name="search" color="grey-5" size="16px" /></template>
      </q-input>

      <q-select v-model="filters.categoryId" :options="categoryOptions" option-value="id" option-label="nombre"
        emit-value map-options outlined dense clearable placeholder="Categoría" style="width:180px"
        @update:model-value="onFilter" />

      <q-select v-model="filters.estado" :options="statusOptions" emit-value map-options outlined dense clearable
        placeholder="Estado" style="width:150px" @update:model-value="onFilter" />

      <q-space />
      <span class="text-caption text-grey-6">{{ productStore.total }} productos</span>
    </div>

    <!-- Loading -->
    <div v-if="productStore.loading" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <!-- Empty -->
    <div v-else-if="!productStore.products.length" class="empty-state column items-center q-py-xl">
      <div class="empty-icon q-mb-md">
        <q-icon name="inventory_2" size="48px" color="grey-4" />
      </div>
      <p class="empty-title">No hay productos aún</p>
      <p class="empty-sub">Crea tu primer producto para empezar a vender</p>
      <q-btn unelevated label="Crear producto" icon="add" color="blue-6" class="action-btn q-mt-md"
        @click="router.push('/dashboard/productos/nuevo')" />
    </div>

    <!-- Tabla -->
    <div v-else class="products-table-wrap">
      <table class="products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Creado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productStore.products" :key="p.id" class="product-row"
            @click="router.push(`/dashboard/productos/${p.id}`)">
            <td>
              <div class="row items-center gap-sm">
                <q-avatar rounded size="38px" color="grey-2">
                  <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" />
                  <q-icon v-else name="image" color="grey-4" />
                </q-avatar>
                <div>
                  <div class="product-name">{{ p.nombre }}</div>
                  <div class="product-sku" v-if="p.sku">SKU: {{ p.sku }}</div>
                </div>
              </div>
            </td>
            <td class="text-caption text-grey-7">{{ p.category?.nombre || '—' }}</td>
            <td class="text-body2 text-weight-bold">
              {{ p.precioBase ? `$${Number(p.precioBase).toLocaleString('es-CO')}` : '—' }}
            </td>
            <td>
              <q-chip dense :color="statusColor(p.estado)" text-color="white" style="font-size:11px;height:22px">
                {{ statusLabel(p.estado) }}
              </q-chip>
            </td>
            <td class="text-caption text-grey-6">{{ formatDate(p.createdAt) }}</td>
            <td @click.stop>
              <q-btn flat round dense icon="more_vert" color="grey-6" size="sm">
                <q-menu anchor="bottom right" self="top right">
                  <q-list style="min-width:160px">
                    <q-item clickable v-close-popup @click="router.push(`/dashboard/productos/${p.id}`)">
                      <q-item-section avatar><q-icon name="visibility" size="16px" /></q-item-section>
                      <q-item-section>Ver detalle</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="router.push(`/dashboard/productos/${p.id}/editar`)">
                      <q-item-section avatar><q-icon name="edit" size="16px" /></q-item-section>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="onChangeStatus(p)">
                      <q-item-section avatar><q-icon name="swap_horiz" size="16px" /></q-item-section>
                      <q-item-section>Cambiar estado</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup class="text-red" @click="onDelete(p)">
                      <q-item-section avatar><q-icon name="delete_outline" size="16px" color="red" /></q-item-section>
                      <q-item-section>Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row justify-center q-mt-lg" v-if="productStore.pages > 1">
        <q-pagination v-model="currentPage" :max="productStore.pages" color="blue-6"
          @update:model-value="onPageChange" />
      </div>
    </div>

    <!-- Dialog cambiar estado -->
    <q-dialog v-model="statusDialog">
      <q-card style="width:360px;border-radius:16px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Cambiar estado</div>
          <p class="text-caption text-grey-6 q-mb-none">{{ selectedProduct?.nombre }}</p>
        </q-card-section>
        <q-card-section>
          <q-select v-model="newStatus" :options="statusOptions" emit-value map-options outlined dense
            label="Nuevo estado" />
          <q-input v-model="statusMotivo" outlined dense label="Motivo (opcional)" class="q-mt-sm" />
        </q-card-section>
        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn unelevated label="Confirmar" color="blue-6" class="action-btn" :loading="changingStatus"
            @click="confirmChangeStatus" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../../../stores/product-store'
import { useCatalogStore } from '../../../stores/catalog-store'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const productStore = useProductStore()
const catalogStore = useCatalogStore()

const filters = ref({ q: '', categoryId: null, estado: null })
const currentPage = ref(1)
const statusDialog = ref(false)
const selectedProduct = ref(null)
const newStatus = ref(null)
const statusMotivo = ref('')
const changingStatus = ref(false)

const statusOptions = [
  { label: 'Borrador', value: 'draft' },
  { label: 'Publicado', value: 'published' },
  { label: 'Pausado', value: 'paused' },
  { label: 'Archivado', value: 'archived' },
]

const categoryOptions = computed(() => catalogStore.tree)

function statusColor(estado) {
  return { draft: 'grey-5', published: 'green-6', paused: 'orange-5', archived: 'red-4' }[estado] || 'grey-5'
}

function statusLabel(estado) {
  return { draft: 'Borrador', published: 'Publicado', paused: 'Pausado', archived: 'Archivado' }[estado] || estado
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function onFilter() {
  currentPage.value = 1
  await load()
}

async function onPageChange(page) {
  currentPage.value = page
  await load()
}

async function load() {
  const params = { page: currentPage.value, limit: 20 }
  if (filters.value.q) params.q = filters.value.q
  if (filters.value.categoryId) params.categoryId = filters.value.categoryId
  if (filters.value.estado) params.estado = filters.value.estado
  await productStore.fetchAll(params)
}

function onChangeStatus(product) {
  selectedProduct.value = product
  newStatus.value = product.estado
  statusMotivo.value = ''
  statusDialog.value = true
}

async function confirmChangeStatus() {
  if (!newStatus.value) return
  changingStatus.value = true
  try {
    await productStore.changeStatus(selectedProduct.value.id, newStatus.value, statusMotivo.value)
    statusDialog.value = false
    await load()
    $q.notify({ type: 'positive', message: 'Estado actualizado', position: 'top-right' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error al cambiar estado', position: 'top-right' })
  } finally {
    changingStatus.value = false
  }
}

async function onDelete(product) {
  $q.dialog({
    title: 'Eliminar producto',
    message: `¿Seguro que deseas eliminar "${product.nombre}"?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await productStore.remove(product.id)
    $q.notify({ type: 'positive', message: 'Producto eliminado', position: 'top-right' })
  })
}

onMounted(async () => {
  await Promise.all([load(), catalogStore.fetchTree()])
})
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  margin: 0;
}

.page-sub {
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  margin: 0;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.filters-bar {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  padding: 12px 16px;
}

.products-table-wrap {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(11, 18, 32, .04);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead tr {
  border-bottom: 1.5px solid rgba(11, 18, 32, .08);
}

.products-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, .45);
  text-transform: uppercase;
  letter-spacing: .5px;
}

.product-row {
  border-bottom: 1px solid rgba(11, 18, 32, .06);
  cursor: pointer;
  transition: background 140ms;
}

.product-row:hover {
  background: #f7f8fb;
}

.product-row:last-child {
  border-bottom: none;
}

.products-table td {
  padding: 12px 16px;
}

.product-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
}

.product-sku {
  font-size: 11px;
  color: rgba(11, 18, 32, .4);
}

.empty-state {
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(11, 18, 32, .04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.empty-title {
  font-size: 16px;
  font-weight: 800;
  color: #0b1220;
  margin: 0 0 6px;
}

.empty-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .45);
  margin: 0;
}
</style>
