<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div class="row items-center">
        <q-btn flat round dense icon="arrow_back" color="grey-6" class="q-mr-sm" @click="goBack" />
        <div>
          <h1 class="page-title q-mb-xs">{{ isEdit ? 'Editar producto' : 'Nuevo producto' }}</h1>
          <p class="page-sub">{{ isEdit ? (form.nombre || 'Cargando...') : 'Completa la información de tu producto' }}</p>
        </div>
      </div>
      <q-chip v-if="dirty" outline color="orange-7" text-color="orange-8" icon="edit_note" size="md">
        Cambios sin guardar
      </q-chip>
    </div>

    <div v-if="loadingProduct" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else class="form-layout">

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

          <q-tab-panel name="general" class="q-pa-lg">
            <div class="panel-grid">
              <div class="field-full">
                <label class="field-label">Nombre del producto <span class="req">*</span></label>
                <q-input v-model="form.nombre" outlined dense placeholder="Ej: Varilla de acero 3/8"
                  :rules="[required]" />
                <div v-if="similares.length" class="similar-warning q-mt-sm">
                  <q-icon name="info" size="16px" color="orange-8" />
                  <div>
                    <span>Ya tienes {{ similares.length }} producto{{ similares.length > 1 ? 's' : '' }} con un nombre
                      parecido:</span>
                    <div class="similar-list">
                      <router-link v-for="s in similares" :key="s.id" :to="`/dashboard/productos/${s.id}`"
                        class="similar-chip" target="_blank">
                        {{ s.nombre }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field-full">
                <label class="field-label">Categoría <span class="req">*</span></label>
                <CategoryPicker :category-id="form.categoryId" :subcategory-id="form.subcategoryId" required
                  @select="onCategorySelect" @clear="onCategoryClear" />
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

              <div class="field-full">
                <label class="field-label">Sectores donde se debe encontrar tu producto</label>
                <q-select v-model="form.sectorIds" :options="sectorOptions" option-value="id" option-label="nombre"
                  emit-value map-options outlined dense multiple use-chips clearable
                  placeholder="Ej: Manufacturero, Tecnología..." />
              </div>
            </div>

            <div class="tab-actions row justify-end q-mt-lg">
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                :disable="!form.nombre || !form.categoryId" @click="tab = 'atributos'" />
            </div>
          </q-tab-panel>

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

          <q-tab-panel name="imagenes" class="q-pa-lg">
            <ProductImageUploader v-model="form.imagenes" folder="productos" />
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'atributos'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'precio'" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="precio" class="q-pa-lg">
            <div class="panel-grid">
              <div class="field-full">
                <label class="field-label">Modalidad de venta</label>
                <div class="pago-toggle">
                  <button type="button" class="pago-opt" :class="{ 'pago-opt--active': form.pagableEnLinea }"
                    @click="form.pagableEnLinea = true">
                    <q-icon name="credit_card" size="18px" />
                    <div>
                      <div class="pago-opt-title">Pago en línea (PSE)</div>
                      <div class="pago-opt-sub">Precio fijo. El cliente paga desde el carrito.</div>
                    </div>
                  </button>
                  <button type="button" class="pago-opt" :class="{ 'pago-opt--active': !form.pagableEnLinea }"
                    @click="form.pagableEnLinea = false">
                    <q-icon name="chat" size="18px" />
                    <div>
                      <div class="pago-opt-title">Requiere cotización</div>
                      <div class="pago-opt-sub">Servicios/precio variable. Va a WhatsApp.</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label class="field-label">Precio base</label>
                <q-input v-model.number="form.precioBase" outlined dense type="number" prefix="$" placeholder="0.00" />
              </div>
              <div>
                <label class="field-label">Moneda</label>
                <q-select v-model="form.moneda" :options="monedas" outlined dense />
              </div>

              <template v-if="form.pagableEnLinea">
                <div>
                  <label class="field-label">Stock disponible</label>
                  <q-input v-model.number="form.stock" outlined dense type="number" min="0"
                    placeholder="Déjalo vacío si no controlas inventario" />
                </div>
                <div>
                  <label class="field-label">Estado</label>
                  <q-select v-model="form.estado" :options="statusOptions" emit-value map-options outlined dense />
                </div>
              </template>

              <template v-else>
                <div>
                  <label class="field-label">Estado</label>
                  <q-select v-model="form.estado" :options="statusOptions" emit-value map-options outlined dense />
                </div>

                <div class="field-full cotizacion-box">
                  <div class="cotizacion-title">
                    <q-icon name="forum" size="18px" color="blue-6" />
                    ¿Quieres que el comprador pueda escribirte los detalles de lo que necesita desde la página del
                    producto?
                  </div>
                  <q-toggle v-model="form.mostrarFormularioCotizacion" color="blue-6"
                    :label="form.mostrarFormularioCotizacion ? 'Sí, mostrar formulario de cotización' : 'No, solo botón de WhatsApp'" />
                </div>

                <q-expansion-item class="field-full advanced-stock" dense-toggle icon="tune"
                  label="Avanzado: aún puedes definir inventario">
                  <div class="q-pt-md" style="max-width:320px">
                    <label class="field-label">Stock disponible</label>
                    <q-input v-model.number="form.stock" outlined dense type="number" min="0"
                      placeholder="Déjalo vacío si no controlas inventario" />
                  </div>
                </q-expansion-item>
              </template>
            </div>
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'imagenes'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'variantes'" :disable="!atributosVariante.length" />
            </div>
          </q-tab-panel>

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
          <div class="summary-row">
            <span class="summary-label">Sectores</span>
            <span class="summary-value">{{ form.sectorIds.length || '—' }}</span>
          </div>
        </q-card>

        <q-btn unelevated :label="isEdit ? 'Guardar cambios' : 'Guardar producto'" icon="save" color="blue-6"
          class="action-btn full-width" :loading="saving" @click="onSave" />
        <q-btn flat label="Cancelar" class="action-btn full-width q-mt-sm" color="grey-6" @click="goBack" />
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProductStore } from '../../../stores/product-store'
import { useCatalogStore } from '../../../stores/catalog-store'
import { useCompanyStore } from '../../../stores/company-store'
import { productsApi } from '../../../api/products'
import { publicApi } from '../../../api/publicCatalog'
import { statusColor, statusLabel, PRODUCT_STATUS_OPTIONS } from '../../../utils/productStatus'
import { tokenOverlapScore } from '../../../utils/textMatch'
import ProductDynamicAttributes from '../../../components/products/ProductDynamicAttributes.vue'
import ProductImageUploader from '../../../components/products/ProductImageUploader.vue'
import ProductVariantsEditor from '../../../components/products/ProductVariantsEditor.vue'
import CategoryPicker from '../../../components/products/CategoryPicker.vue'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const productStore = useProductStore()
const catalogStore = useCatalogStore()
const companyStore = useCompanyStore()

const isEdit = computed(() => !!route.params.id)

const tab = ref('general')
const saving = ref(false)
const loadingProduct = ref(false)
const loadingAttrs = ref(false)
const atributos = ref([])
const sectorOptions = ref([])
const similares = ref([])

function blankForm() {
  return {
    nombre: '',
    categoryId: null,
    subcategoryId: null,
    sku: '',
    marca: '',
    descripcion: '',
    precioBase: null,
    moneda: 'COP',
    pagableEnLinea: true,
    mostrarFormularioCotizacion: false,
    stock: null,
    estado: 'draft',
    atributosValues: {},
    imagenes: [],
    variantes: [],
    sectorIds: [],
  }
}

const form = ref(blankForm())
const monedas = ['COP', 'USD', 'EUR']
const statusOptions = PRODUCT_STATUS_OPTIONS

const atributosVariante = computed(() => atributos.value.filter((a) => a.usarEnVariante))

const categoriaLabel = computed(() => {
  const cat = catalogStore.tree.find((c) => c.id === form.value.categoryId)
  if (!cat) return '—'
  const sub = cat.hijos?.find((h) => h.id === form.value.subcategoryId)
  return sub ? `${cat.nombre} › ${sub.nombre}` : cat.nombre
})

const required = (v) => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'

// ── Categoría ──────────────────────────────────────────────────────────
async function refreshAtributos() {
  form.value.atributosValues = {}
  atributos.value = []
  const subcatId = form.value.subcategoryId
  const catId = form.value.categoryId
  if (!catId) return
  loadingAttrs.value = true
  try {
    if (subcatId) {
      atributos.value = await catalogStore.fetchAtributos(subcatId)
    } else {
      const cat = catalogStore.tree.find((c) => c.id === catId)
      if (!cat?.hijos?.length) {
        atributos.value = await catalogStore.fetchAtributos(catId)
      }
    }
  } finally {
    loadingAttrs.value = false
  }
}

function onCategorySelect({ categoryId, subcategoryId }) {
  form.value.categoryId = categoryId
  form.value.subcategoryId = subcategoryId
  refreshAtributos()
}

function onCategoryClear() {
  form.value.categoryId = null
  form.value.subcategoryId = null
  form.value.atributosValues = {}
  atributos.value = []
}

// ── Producto parecido (aviso no bloqueante) ───────────────────────────
let similarTimeout = null
watch(() => form.value.nombre, (nombre) => {
  clearTimeout(similarTimeout)
  if (!nombre || nombre.trim().length < 3) {
    similares.value = []
    return
  }
  similarTimeout = setTimeout(async () => {
    try {
      const { data } = await productsApi.getAll({ q: nombre.trim(), limit: 5 })
      similares.value = (data.data || [])
        .filter((p) => p.id !== route.params.id)
        .filter((p) => tokenOverlapScore(p.nombre, nombre) >= 0.5)
    } catch {
      similares.value = []
    }
  }, 500)
})

// ── Guardado ───────────────────────────────────────────────────────────
const FIELD_TAB_MAP = {
  nombre: 'general', categoria: 'general', category: 'general', sku: 'general', marca: 'general', descripcion: 'general',
  precioBase: 'precio', preciobase: 'precio', moneda: 'precio', stock: 'precio', pagableEnLinea: 'precio',
  pagableenlinea: 'precio', mostrarFormularioCotizacion: 'precio', mostrarformulariocotizacion: 'precio',
  sectorIds: 'general', sectorids: 'general',
  atributos: 'atributos',
  imagenes: 'imagenes',
  variantes: 'variantes',
}

function tabForMessage(msg) {
  if (!msg) return null
  const lower = String(msg).toLowerCase()
  for (const [field, tabName] of Object.entries(FIELD_TAB_MAP)) {
    if (lower.includes(field.toLowerCase())) return tabName
  }
  return null
}

function buildDto() {
  return {
    categoryId: form.value.categoryId,
    subcategoryId: form.value.subcategoryId || undefined,
    nombre: form.value.nombre,
    descripcion: form.value.descripcion,
    sku: form.value.sku || undefined,
    marca: form.value.marca || undefined,
    precioBase: form.value.precioBase || undefined,
    moneda: form.value.moneda,
    pagableEnLinea: form.value.pagableEnLinea,
    mostrarFormularioCotizacion: form.value.pagableEnLinea ? false : form.value.mostrarFormularioCotizacion,
    stock: form.value.stock === '' || form.value.stock == null ? null : Number(form.value.stock),
    estado: form.value.estado,
    sectorIds: form.value.sectorIds,
    atributos: Object.entries(form.value.atributosValues).map(([clave, valor]) => {
      const attr = atributos.value.find((a) => a.clave === clave)
      return attr ? { atributoId: attr.id, valor: Array.isArray(valor) ? JSON.stringify(valor) : String(valor) } : null
    }).filter(Boolean),
    imagenes: form.value.imagenes
      .filter((i) => i.url)
      .map((i, idx) => ({ url: i.url, esPrincipal: i.esPrincipal ?? false, orden: idx })),
    variantes: form.value.variantes,
  }
}

async function onSave() {
  if (!form.value.nombre || !form.value.categoryId) {
    $q.notify({ type: 'warning', message: 'Completa nombre y categoría', position: 'top-right' })
    tab.value = 'general'
    return
  }

  let empresaId
  if (!isEdit.value) {
    empresaId = companyStore.perfil?.empresa?.id
    if (!empresaId) {
      $q.notify({ type: 'warning', message: 'No se pudo obtener el ID de tu empresa. Recarga la página.', position: 'top-right' })
      return
    }
  }

  saving.value = true
  try {
    const dto = buildDto()
    if (isEdit.value) {
      await productStore.update(route.params.id, dto)
      $q.notify({ type: 'positive', message: 'Producto actualizado', position: 'top-right' })
    } else {
      await productStore.create({ ...dto, empresaId })
      $q.notify({ type: 'positive', message: 'Producto creado correctamente', position: 'top-right' })
    }
    markClean()
    router.push(isEdit.value ? `/dashboard/productos/${route.params.id}` : '/dashboard/productos')
  } catch (e) {
    const raw = e.response?.data?.message
    const messages = Array.isArray(raw) ? raw : (raw ? [raw] : [])
    const firstMsg = messages[0] || `No se pudo ${isEdit.value ? 'guardar los cambios' : 'crear el producto'}. Intenta de nuevo.`
    const targetTab = tabForMessage(firstMsg)
    if (targetTab) tab.value = targetTab
    $q.notify({ type: 'negative', message: firstMsg, position: 'top-right' })
  } finally {
    saving.value = false
  }
}

// ── Cambios sin guardar ────────────────────────────────────────────────
const initialSnapshot = ref('')
const dirty = computed(() => JSON.stringify(form.value) !== initialSnapshot.value)

function markClean() {
  initialSnapshot.value = JSON.stringify(form.value)
}

function goBack() {
  router.push(isEdit.value ? `/dashboard/productos/${route.params.id}` : '/dashboard/productos')
}

function handleBeforeUnload(e) {
  if (!dirty.value) return
  e.preventDefault()
  e.returnValue = ''
}

onBeforeRouteLeave(() => {
  if (!dirty.value) return true
  return new Promise((resolve) => {
    $q.dialog({
      title: 'Cambios sin guardar',
      message: '¿Seguro que quieres salir? Vas a perder los cambios que no has guardado.',
      persistent: true,
      ok: { label: 'Salir sin guardar', color: 'negative', flat: true },
      cancel: { label: 'Seguir editando', color: 'grey-7', flat: true },
    }).onOk(() => resolve(true)).onCancel(() => resolve(false)).onDismiss(() => resolve(false))
  })
})

// ── Carga inicial ──────────────────────────────────────────────────────
function populateForm(product) {
  form.value = {
    nombre: product.nombre,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId,
    sku: product.sku || '',
    marca: product.marca || '',
    descripcion: product.descripcion || '',
    precioBase: product.precioBase,
    moneda: product.moneda || 'COP',
    pagableEnLinea: product.pagableEnLinea !== false,
    mostrarFormularioCotizacion: !!product.mostrarFormularioCotizacion,
    stock: product.stock ?? null,
    estado: product.estado,
    atributosValues: Object.fromEntries(
      (product.atributos || []).map((a) => [a.atributo?.clave, a.valor]),
    ),
    imagenes: (product.imagenes || []).map((i) => ({ url: i.url, esPrincipal: i.esPrincipal, orden: i.orden })),
    variantes: product.variantes || [],
    sectorIds: (product.sectores || []).map((s) => s.sectorId),
  }
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)

  const tasks = [
    catalogStore.fetchTree(),
    publicApi.getSectores().then(({ data }) => { sectorOptions.value = data }).catch(() => {}),
  ]
  if (isEdit.value) {
    loadingProduct.value = true
    tasks.push(productStore.fetchById(route.params.id))
  } else {
    tasks.push(companyStore.perfil ? Promise.resolve() : companyStore.fetchPerfil())
  }
  await Promise.all(tasks)

  if (isEdit.value && productStore.current) {
    populateForm(productStore.current)
    const subcatId = form.value.subcategoryId
    const catId = form.value.categoryId
    if (subcatId) {
      atributos.value = await catalogStore.fetchAtributos(subcatId)
    } else if (catId) {
      const cat = catalogStore.tree.find((c) => c.id === catId)
      if (!cat?.hijos?.length) {
        atributos.value = await catalogStore.fetchAtributos(catId)
      }
    }
  }
  loadingProduct.value = false
  markClean()
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
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

.similar-warning {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: rgba(234, 158, 25, .08);
  border: 1px solid rgba(234, 158, 25, .25);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .7);
}

.similar-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.similar-chip {
  font-size: 11.5px;
  font-weight: 700;
  color: #0071e3;
  background: rgba(0, 113, 227, .08);
  border-radius: 999px;
  padding: 3px 10px;
  text-decoration: none;
}

.similar-chip:hover {
  background: rgba(0, 113, 227, .15);
}

.pago-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.pago-opt {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid rgba(11, 18, 32, .12);
  background: #fff;
  color: rgba(11, 18, 32, .6);
  cursor: pointer;
  transition: all 150ms;
  font-family: inherit;
}

.pago-opt:hover {
  border-color: rgba(0, 113, 227, .3);
}

.pago-opt--active {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .05);
  color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .1);
}

.pago-opt-title {
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
}

.pago-opt-sub {
  font-size: 11px;
  color: rgba(11, 18, 32, .5);
  margin-top: 2px;
  line-height: 1.35;
}

.cotizacion-box {
  background: rgba(0, 113, 227, .04);
  border: 1.5px solid rgba(0, 113, 227, .15);
  border-radius: 12px;
  padding: 14px 16px;
}

.cotizacion-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  margin-bottom: 8px;
  line-height: 1.4;
}

.advanced-stock {
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
}

@media (max-width: 560px) {
  .pago-toggle {
    grid-template-columns: 1fr;
  }
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
