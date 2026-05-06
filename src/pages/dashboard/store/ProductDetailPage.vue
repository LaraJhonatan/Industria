<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div class="row items-center">
        <q-btn flat round dense icon="arrow_back" color="grey-6" class="q-mr-sm"
          @click="router.push('/dashboard/productos')" />
        <div>
          <h1 class="page-title q-mb-xs">{{ product?.nombre || 'Cargando...' }}</h1>
          <p class="page-sub">Detalle del producto</p>
        </div>
      </div>
      <div class="row gap-sm" v-if="product">
        <q-btn flat label="Editar" icon="edit" color="blue-6" class="action-btn"
          @click="router.push(`/dashboard/productos/${product.id}/editar`)" />
        <q-btn unelevated :label="product.estado === 'published' ? 'Pausar' : 'Publicar'"
          :color="product.estado === 'published' ? 'orange-6' : 'green-6'" class="action-btn" @click="toggleStatus" />
      </div>
    </div>

    <div v-if="productStore.loading" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else-if="product" class="detail-layout">

      <!-- Columna izquierda -->
      <div class="detail-main">

        <!-- Galería -->
        <q-card flat bordered class="detail-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-md">Imágenes</div>
            <div v-if="!product.imagenes?.length" class="empty-images column items-center q-py-lg">
              <q-icon name="image" size="36px" color="grey-4" />
              <p class="empty-text q-mt-sm">Sin imágenes</p>
            </div>
            <div v-else class="gallery-wrap">
              <div class="gallery-main">
                <img :src="selectedImage" class="gallery-img-main" />
              </div>
              <div class="gallery-thumbs">
                <img v-for="img in product.imagenes" :key="img.id" :src="img.url" class="gallery-thumb"
                  :class="{ 'thumb-active': selectedImage === img.url }" @click="selectedImage = img.url" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Descripción -->
        <q-card flat bordered class="detail-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-sm">Descripción</div>
            <p class="description-text">{{ product.descripcion || 'Sin descripción' }}</p>
          </q-card-section>
        </q-card>

        <!-- Atributos -->
        <q-card flat bordered class="detail-card q-mb-md" v-if="product.atributos?.length">
          <q-card-section>
            <div class="section-title q-mb-md">Atributos</div>
            <div class="attrs-grid">
              <div v-for="av in product.atributos" :key="av.id" class="attr-item">
                <span class="attr-key">{{ av.atributo?.nombre }}</span>
                <span class="attr-val">{{ av.valor || '—' }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Variantes -->
        <q-card flat bordered class="detail-card" v-if="product.variantes?.length">
          <q-card-section>
            <div class="section-title q-mb-md">Variantes ({{ product.variantes.length }})</div>
            <table class="variants-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Atributos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in product.variantes" :key="v.id">
                  <td class="text-weight-bold">{{ v.sku || '—' }}</td>
                  <td>{{ v.precio ? `$${Number(v.precio).toLocaleString('es-CO')}` : '—' }}</td>
                  <td>{{ v.stock }}</td>
                  <td>
                    <span v-for="av in v.atributos" :key="av.id" class="variant-attr-chip">
                      {{ av.atributo?.nombre }}: {{ av.valor }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </q-card-section>
        </q-card>

      </div>

      <!-- Columna derecha -->
      <div class="detail-sidebar">

        <q-card flat bordered class="detail-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-md">Información</div>
            <div class="info-row">
              <span class="info-label">Estado</span>
              <q-chip dense :color="statusColor(product.estado)" text-color="white" style="font-size:10px;height:20px">
                {{ statusLabel(product.estado) }}
              </q-chip>
            </div>
            <div class="info-row">
              <span class="info-label">Categoría</span>
              <span class="info-value">{{ product.category?.nombre || '—' }}</span>
            </div>
            <div class="info-row" v-if="product.subcategory">
              <span class="info-label">Subcategoría</span>
              <span class="info-value">{{ product.subcategory?.nombre }}</span>
            </div>
            <div class="info-row" v-if="product.sku">
              <span class="info-label">SKU</span>
              <span class="info-value">{{ product.sku }}</span>
            </div>
            <div class="info-row" v-if="product.marca">
              <span class="info-label">Marca</span>
              <span class="info-value">{{ product.marca }}</span>
            </div>
            <div class="info-row" v-if="product.precioBase">
              <span class="info-label">Precio base</span>
              <span class="info-value text-weight-bold">
                ${{ Number(product.precioBase).toLocaleString('es-CO') }} {{ product.moneda }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Creado</span>
              <span class="info-value">{{ formatDate(product.createdAt) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Actualizado</span>
              <span class="info-value">{{ formatDate(product.updatedAt) }}</span>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="detail-card">
          <q-card-section>
            <div class="section-title q-mb-md">Cambiar estado</div>
            <q-select v-model="newStatus" :options="statusOptions" emit-value map-options outlined dense
              class="q-mb-sm" />
            <q-input v-model="statusMotivo" outlined dense placeholder="Motivo (opcional)" class="q-mb-sm" />
            <q-btn unelevated label="Aplicar" color="blue-6" class="action-btn full-width" :loading="changingStatus"
              @click="applyStatus" />
          </q-card-section>
        </q-card>

      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProductStore } from '../../../stores/product-store'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const productStore = useProductStore()

const product = computed(() => productStore.current)
const selectedImage = ref('')
const newStatus = ref('')
const statusMotivo = ref('')
const changingStatus = ref(false)

const statusOptions = [
  { label: 'Borrador', value: 'draft' },
  { label: 'Publicado', value: 'published' },
  { label: 'Pausado', value: 'paused' },
  { label: 'Archivado', value: 'archived' },
]

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

async function toggleStatus() {
  const next = product.value.estado === 'published' ? 'paused' : 'published'
  await productStore.changeStatus(product.value.id, next)
  $q.notify({ type: 'positive', message: 'Estado actualizado', position: 'top-right' })
}

async function applyStatus() {
  if (!newStatus.value) return
  changingStatus.value = true
  try {
    await productStore.changeStatus(product.value.id, newStatus.value, statusMotivo.value)
    $q.notify({ type: 'positive', message: 'Estado actualizado', position: 'top-right' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error al cambiar estado', position: 'top-right' })
  } finally {
    changingStatus.value = false
  }
}

onMounted(async () => {
  const data = await productStore.fetchById(route.params.id)
  newStatus.value = data.estado
  if (data.imagenes?.length) {
    const principal = data.imagenes.find(i => i.esPrincipal) || data.imagenes[0]
    selectedImage.value = principal.url
  }
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

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  align-items: start;
}

.detail-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
}

.section-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
}

.gallery-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gallery-main {
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid rgba(11, 18, 32, .08);
}

.gallery-img-main {
  width: 100%;
  max-height: 360px;
  object-fit: contain;
}

.gallery-thumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.gallery-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid rgba(11, 18, 32, .1);
  transition: border-color 140ms;
}

.thumb-active {
  border-color: #0071e3;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, .2);
}

.description-text {
  font-size: 14px;
  color: rgba(11, 18, 32, .65);
  line-height: 1.7;
  margin: 0;
}

.attrs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.attr-item {
  background: #f7f8fb;
  border-radius: 8px;
  padding: 10px 12px;
}

.attr-key {
  font-size: 11px;
  font-weight: 700;
  color: rgba(11, 18, 32, .42);
  text-transform: uppercase;
  letter-spacing: .4px;
  display: block;
  margin-bottom: 3px;
}

.attr-val {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
}

.variants-table {
  width: 100%;
  border-collapse: collapse;
}

.variants-table th {
  padding: 8px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 800;
  color: rgba(11, 18, 32, .4);
  text-transform: uppercase;
  letter-spacing: .4px;
  border-bottom: 1.5px solid rgba(11, 18, 32, .08);
}

.variants-table td {
  padding: 10px 12px;
  font-size: 13px;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.variants-table tr:last-child td {
  border-bottom: none;
}

.variant-attr-chip {
  display: inline-block;
  background: rgba(0, 113, 227, .08);
  color: #0071e3;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  padding: 2px 8px;
  margin: 2px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

.info-value {
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
}

.empty-images {
  text-align: center;
}

.empty-text {
  font-size: 13px;
  color: rgba(11, 18, 32, .4);
  margin: 0;
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .attrs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
