<template>
  <q-page class="q-pa-lg">

    <div class="row items-center q-mb-lg">
      <q-btn flat round dense icon="arrow_back" color="grey-6" class="q-mr-sm"
        @click="router.push('/dashboard/productos')" />
      <div>
        <h1 class="page-title q-mb-xs">Nuevo producto</h1>
        <p class="page-sub">Completa la información de tu producto</p>
      </div>
    </div>

    <div class="form-layout">

      <q-card flat bordered class="form-card">
        <q-tabs v-model="tab" align="left" active-color="blue-6" indicator-color="blue-6" class="form-tabs q-px-md">
          <q-tab name="general" label="General" icon="info_outline" />
          <q-tab name="atributos" label="Atributos" icon="tune" :disable="!form.categoryId" />
          <q-tab name="imagenes" label="Imágenes" icon="image" />
          <q-tab name="precio" label="Precio e inventario" icon="payments" />
          <q-tab name="variantes" label="Variantes" icon="layers" :disable="!atributosVariante.length" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <!-- GENERAL -->
          <q-tab-panel name="general" class="q-pa-lg">
            <div class="panel-grid">
              <div class="field-full">
                <label class="field-label">Nombre del producto <span class="req">*</span></label>
                <q-input v-model="form.nombre" outlined dense placeholder="Ej: Varilla de acero 3/8"
                  :rules="[required]" />
              </div>

              <div>
                <label class="field-label">Categoría <span class="req">*</span></label>
                <q-select v-model="form.categoryId" :options="catalogStore.tree.filter(c => !c.parentId)"
                  option-value="id" option-label="nombre" emit-value map-options outlined dense
                  placeholder="Selecciona categoría" :rules="[required]" @update:model-value="onCategoryChange" />
              </div>

              <div>
                <label class="field-label">Subcategoría</label>
                <q-select v-model="form.subcategoryId" :options="subcategories" option-value="id" option-label="nombre"
                  emit-value map-options outlined dense clearable placeholder="Selecciona subcategoría"
                  :disable="!subcategories.length" @update:model-value="onSubcategoryChange" />
              </div>

              <div>
                <label class="field-label">SKU</label>
                <q-input v-model="form.sku" outlined dense placeholder="Código interno" />
              </div>

              <div>
                <label class="field-label">Marca</label>
                <q-input v-model="form.marca" outlined dense placeholder="Marca o fabricante" />
              </div>

              <div class="field-full">
                <label class="field-label">Descripción</label>
                <q-input v-model="form.descripcion" outlined type="textarea" autogrow
                  placeholder="Describe tu producto en detalle..." />
              </div>
            </div>

            <div class="tab-actions row justify-end q-mt-lg">
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                :disable="!form.nombre || !form.categoryId" @click="tab = 'atributos'" />
            </div>
          </q-tab-panel>

          <!-- ATRIBUTOS -->
          <q-tab-panel name="atributos" class="q-pa-lg">
            <div v-if="loadingAttrs" class="column items-center q-py-lg">
              <q-spinner color="blue-6" size="28px" />
            </div>
            <ProductDynamicAttributes v-else :atributos="atributos" v-model:values="form.atributosValues" />
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'general'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'imagenes'" />
            </div>
          </q-tab-panel>

          <!-- IMÁGENES -->
          <q-tab-panel name="imagenes" class="q-pa-lg">
            <ProductImageUploader v-model="form.imagenes" folder="productos" />
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'atributos'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'precio'" />
            </div>
          </q-tab-panel>

          <!-- PRECIO E INVENTARIO -->
          <q-tab-panel name="precio" class="q-pa-lg">
            <div class="panel-grid">
              <div>
                <label class="field-label">Precio base</label>
                <q-input v-model.number="form.precioBase" outlined dense type="number" prefix="$" placeholder="0.00" />
              </div>
              <div>
                <label class="field-label">Moneda</label>
                <q-select v-model="form.moneda" :options="monedas" outlined dense />
              </div>
              <div>
                <label class="field-label">Estado inicial</label>
                <q-select v-model="form.estado" :options="statusOptions" emit-value map-options outlined dense />
              </div>
            </div>
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'imagenes'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'variantes'" :disable="!atributosVariante.length" />
            </div>
          </q-tab-panel>

          <!-- VARIANTES -->
          <q-tab-panel name="variantes" class="q-pa-lg">
            <ProductVariantsEditor v-model="form.variantes" :atributos-variante="atributosVariante" />
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'precio'" />
            </div>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

      <div class="form-sidebar">
        <q-card flat bordered class="summary-card q-pa-md q-mb-md">
          <div class="summary-title q-mb-md">Resumen</div>
          <div class="summary-row">
            <span class="summary-label">Nombre</span>
            <span class="summary-value">{{ form.nombre || '—' }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Categoría</span>
            <span class="summary-value">{{ categoriaLabel }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Estado</span>
            <q-chip dense :color="statusColor(form.estado)" text-color="white" style="font-size:10px;height:20px">
              {{ statusLabel(form.estado) }}
            </q-chip>
          </div>
          <div class="summary-row">
            <span class="summary-label">Imágenes</span>
            <span class="summary-value">{{ form.imagenes.length }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Variantes</span>
            <span class="summary-value">{{ form.variantes.length }}</span>
          </div>
        </q-card>

        <q-btn unelevated label="Guardar producto" icon="save" color="blue-6" class="action-btn full-width"
          :loading="saving" @click="onSave" />
        <q-btn flat label="Cancelar" class="action-btn full-width q-mt-sm" color="grey-6"
          @click="router.push('/dashboard/productos')" />
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProductStore } from '../../../stores/product-store'
import { useCatalogStore } from '../../../stores/catalog-store'
import { useCompanyStore } from '../../../stores/company-store'
import ProductDynamicAttributes from '../../../components/products/ProductDynamicAttributes.vue'
import ProductImageUploader from '../../../components/products/ProductImageUploader.vue'
import ProductVariantsEditor from '../../../components/products/ProductVariantsEditor.vue'

const router = useRouter()
const $q = useQuasar()
const productStore = useProductStore()
const catalogStore = useCatalogStore()
const companyStore = useCompanyStore()

const tab = ref('general')
const saving = ref(false)
const loadingAttrs = ref(false)
const atributos = ref([])

const form = ref({
  nombre: '',
  categoryId: null,
  subcategoryId: null,
  sku: '',
  marca: '',
  descripcion: '',
  precioBase: null,
  moneda: 'COP',
  estado: 'draft',
  atributosValues: {},
  imagenes: [],
  variantes: [],
})

const monedas = ['COP', 'USD', 'EUR']

const statusOptions = [
  { label: 'Borrador', value: 'draft' },
  { label: 'Publicado', value: 'published' },
  { label: 'Pausado', value: 'paused' },
]

const subcategories = computed(() => {
  if (!form.value.categoryId) return []
  const cat = catalogStore.tree.find(c => c.id === form.value.categoryId)
  return cat?.hijos || []
})

const atributosVariante = computed(() => atributos.value.filter(a => a.usarEnVariante))

const categoriaLabel = computed(() => {
  const cat = catalogStore.tree.find(c => c.id === form.value.categoryId)
  return cat?.nombre || '—'
})

const required = v => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'

function statusColor(estado) {
  return { draft: 'grey-5', published: 'green-6', paused: 'orange-5', archived: 'red-4' }[estado] || 'grey-5'
}

function statusLabel(estado) {
  return { draft: 'Borrador', published: 'Publicado', paused: 'Pausado', archived: 'Archivado' }[estado] || estado
}

async function onCategoryChange(categoryId) {
  form.value.subcategoryId = null
  form.value.atributosValues = {}
  atributos.value = []
  if (!categoryId) return
  const cat = catalogStore.tree.find(c => c.id === categoryId)
  if (!cat?.hijos?.length) {
    loadingAttrs.value = true
    try {
      atributos.value = await catalogStore.fetchAtributos(categoryId)
    } finally {
      loadingAttrs.value = false
    }
  }
}

async function onSubcategoryChange(subcategoryId) {
  form.value.atributosValues = {}
  atributos.value = []
  if (!subcategoryId) return
  loadingAttrs.value = true
  try {
    atributos.value = await catalogStore.fetchAtributos(subcategoryId)
  } finally {
    loadingAttrs.value = false
  }
}

async function onSave() {
  if (!form.value.nombre || !form.value.categoryId) {
    $q.notify({ type: 'warning', message: 'Completa nombre y categoría', position: 'top-right' })
    tab.value = 'general'
    return
  }

  const empresaId = companyStore.perfil?.empresa?.id
  if (!empresaId) {
    $q.notify({ type: 'warning', message: 'No se pudo obtener el ID de tu empresa. Recarga la página.', position: 'top-right' })
    return
  }

  saving.value = true
  try {
    const dto = {
      empresaId,
      categoryId: form.value.categoryId,
      subcategoryId: form.value.subcategoryId || undefined,
      nombre: form.value.nombre,
      descripcion: form.value.descripcion,
      sku: form.value.sku || undefined,
      marca: form.value.marca || undefined,
      precioBase: form.value.precioBase || undefined,
      moneda: form.value.moneda,
      estado: form.value.estado,
      atributos: Object.entries(form.value.atributosValues).map(([clave, valor]) => {
        const attr = atributos.value.find(a => a.clave === clave)
        return attr ? { atributoId: attr.id, valor: Array.isArray(valor) ? JSON.stringify(valor) : String(valor) } : null
      }).filter(Boolean),
      imagenes: form.value.imagenes.map(i => ({
        url: i.url,
        esPrincipal: i.esPrincipal,
        orden: i.orden,
      })),
      variantes: form.value.variantes,
    }

    await productStore.create(dto)
    $q.notify({ type: 'positive', message: 'Producto creado correctamente', position: 'top-right' })
    router.push('/dashboard/productos')
  } catch (e) {
    const msg = e.response?.data?.message || 'Error al crear el producto'
    $q.notify({ type: 'negative', message: Array.isArray(msg) ? msg[0] : msg, position: 'top-right' })
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    catalogStore.fetchTree(),
    companyStore.perfil ? Promise.resolve() : companyStore.fetchPerfil(),
  ])
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

.form-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}

.form-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
  overflow: hidden;
}

.form-tabs {
  background: #f7f8fb;
  border-bottom: 1.5px solid rgba(11, 18, 32, .08);
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.field-full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  display: block;
  margin-bottom: 6px;
}

.req {
  color: #dc2626;
}

.tab-actions {
  border-top: 1.5px solid rgba(11, 18, 32, .07);
  padding-top: 16px;
  margin-top: 16px;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.summary-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
}

.summary-title {
  font-size: 14px;
  font-weight: 800;
  color: #0b1220;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-label {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

.summary-value {
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
  text-align: right;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .form-layout {
    grid-template-columns: 1fr;
  }

  .panel-grid {
    grid-template-columns: 1fr;
  }

  .field-full {
    grid-column: 1;
  }
}
</style>
