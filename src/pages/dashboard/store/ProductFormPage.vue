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
        <div class="stepper">
          <button v-for="(step, i) in steps" :key="step.name" type="button" class="step-item"
            :class="{
              'step-item--active': tab === step.name,
              'step-item--done': step.done && tab !== step.name,
              'step-item--disabled': step.disabled,
            }" :disabled="step.disabled" @click="tab = step.name">
            <span class="step-circle">
              <q-icon v-if="step.done && tab !== step.name" name="check" size="15px" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="step-text">
              <span class="step-name">{{ step.label }}</span>
              <span class="step-hint">{{ step.hint }}</span>
            </span>
            <q-tooltip v-if="step.disabled" anchor="bottom middle" self="top middle" class="field-tooltip">
              {{ step.disabledReason }}
            </q-tooltip>
          </button>
        </div>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="general" class="q-pa-lg">
            <div class="panel-grid">
              <div class="field-full">
                <FieldLabel label="Nombre del producto" required
                  help="Es lo primero que ve el comprador y con lo que te encuentra en el buscador. Sé específico: incluye medida, material o modelo." />
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
                <FieldLabel label="Categoría" required
                  help="Define en qué parte de la tienda aparece tu producto y qué características podrás llenar después. Busca escribiendo; si no existe, podrás crearla." />
                <CategoryPicker :category-id="form.categoryId" :subcategory-id="form.subcategoryId" required
                  @select="onCategorySelect" @clear="onCategoryClear" />
              </div>

              <div>
                <FieldLabel label="SKU" optional
                  help="Es tu código interno de inventario, solo para ti. El comprador no lo usa para buscar. Si no manejas códigos, déjalo vacío." />
                <q-input v-model="form.sku" outlined dense placeholder="Ej: AC-3-8-VAR" />
              </div>

              <div>
                <FieldLabel label="Marca" optional
                  help="El fabricante del producto. Ayuda al comprador a reconocerlo y filtra mejor en la tienda." />
                <q-input v-model="form.marca" outlined dense placeholder="Ej: Acesco, Bosch, Genérico..." />
              </div>

              <div class="field-full">
                <FieldLabel label="Descripción" optional
                  help="Explica de qué está hecho, para qué sirve y qué incluye. Los productos con buena descripción reciben más contactos." />
                <q-input v-model="form.descripcion" outlined type="textarea" autogrow
                  placeholder="Describe el producto: material, usos, qué incluye, garantía..." />
              </div>

              <div class="field-full">
                <FieldLabel label="Sectores donde se debe encontrar tu producto" optional
                  help="Los sectores son las industrias del portal (Manufacturero, Construcción, etc.). Al marcarlos, tu producto aparece cuando alguien explora ese sector." />
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

            <template v-else>
              <div class="panel-intro">
                <q-icon name="lightbulb" size="17px" color="blue-6" />
                <span>
                  Las características son las fichas técnicas de tu producto (voltaje, material, medida...).
                  El comprador las usa para filtrar y comparar, así que entre más completes, más fácil te encuentran.
                </span>
              </div>

              <div v-if="!atributos.length" class="attrs-empty">
                <div class="attrs-empty-icon">
                  <q-icon name="tune" size="26px" color="blue-6" />
                </div>
                <div class="attrs-empty-title">Esta categoría todavía no tiene características</div>
                <p class="attrs-empty-text">
                  Créalas una sola vez y quedarán disponibles para todos los productos de
                  <b>{{ categoriaLabel }}</b>, incluidos los que subas después.
                </p>
                <q-btn unelevated no-caps icon="add" label="Crear la primera característica" color="blue-6"
                  class="action-btn" @click="attrDialog?.show()" />
              </div>

              <template v-else>
                <ProductDynamicAttributes :atributos="atributos" v-model:values="form.atributosValues" />
                <q-btn flat dense no-caps icon="add" label="Falta una característica: agregarla"
                  color="blue-6" class="q-mt-md" @click="attrDialog?.show()" />
              </template>
            </template>
            <div class="tab-actions row justify-between q-mt-lg">
              <q-btn flat label="Anterior" icon="arrow_back" color="grey-6" class="action-btn"
                @click="tab = 'general'" />
              <q-btn unelevated label="Siguiente" icon-right="arrow_forward" color="blue-6" class="action-btn"
                @click="tab = 'imagenes'" />
            </div>
            <AttributeQuickCreateDialog ref="attrDialog" :category-id="form.subcategoryId || form.categoryId"
              @created="onAttributeCreated" />
          </q-tab-panel>

          <q-tab-panel name="imagenes" class="q-pa-lg">
            <div class="panel-intro">
              <q-icon name="lightbulb" size="17px" color="blue-6" />
              <span>
                La primera imagen es la que se ve en los resultados de búsqueda. Usa fotos claras, con buena luz
                y fondo limpio — son lo que más influye en que le den clic a tu producto.
              </span>
            </div>
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
                <FieldLabel label="Modalidad de venta"
                  help="Define cómo te compran: con pago inmediato desde el carrito, o contactándote primero para acordar el precio." />
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
                <FieldLabel label="Precio base" :optional="!form.pagableEnLinea"
                  :help="form.pagableEnLinea
                    ? 'El precio que paga el comprador en el carrito. Si tienes variantes (tallas, colores), cada una puede tener su propio precio.'
                    : 'Como este producto requiere cotización, el precio es solo una referencia. Déjalo vacío si prefieres no mostrarlo.'" />
                <q-input v-model.number="form.precioBase" outlined dense type="number" prefix="$" placeholder="0.00" />
              </div>
              <div>
                <FieldLabel label="Moneda" help="La moneda en la que está expresado el precio base." />
                <q-select v-model="form.moneda" :options="monedas" outlined dense />
              </div>

              <template v-if="form.pagableEnLinea">
                <div>
                  <FieldLabel label="Stock disponible" optional
                    help="Cuántas unidades tienes. Al llegar a 0 el producto se muestra como agotado. Déjalo vacío si no llevas control de inventario." />
                  <q-input v-model.number="form.stock" outlined dense type="number" min="0"
                    placeholder="Vacío = sin control de inventario" />
                </div>
                <div>
                  <FieldLabel label="Estado"
                    help="Borrador: solo tú lo ves. Publicado: visible en la tienda. Pausado: oculto temporalmente sin borrarlo." />
                  <q-select v-model="form.estado" :options="statusOptions" emit-value map-options outlined dense />
                </div>
              </template>

              <template v-else>
                <div>
                  <FieldLabel label="Estado"
                    help="Borrador: solo tú lo ves. Publicado: visible en la tienda. Pausado: oculto temporalmente sin borrarlo." />
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
                  <div class="q-pt-md q-px-md q-pb-md" style="max-width:340px">
                    <FieldLabel label="Stock disponible" optional
                      help="Aunque el producto se venda por cotización, puedes llevar control de cuántas unidades tienes." />
                    <q-input v-model.number="form.stock" outlined dense type="number" min="0"
                      placeholder="Vacío = sin control de inventario" />
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
        <q-card flat bordered class="summary-card q-mb-md">
          <div class="preview-head">
            <span class="preview-eyebrow">Vista previa</span>
            <span class="preview-note">Así se verá en la tienda</span>
          </div>

          <div class="preview-card">
            <div class="preview-image">
              <img v-if="form.imagenes.length" :src="form.imagenes[0].url" alt="" />
              <q-icon v-else name="image" size="26px" color="grey-4" />
            </div>
            <div class="preview-body">
              <div v-if="form.categoryId" class="preview-cat">{{ categoriaLabel }}</div>
              <div class="preview-name" :class="{ 'preview-name--empty': !form.nombre }">
                {{ form.nombre || 'Nombre del producto' }}
              </div>
              <div v-if="form.marca" class="preview-brand">{{ form.marca }}</div>
              <div class="preview-price">
                <template v-if="form.pagableEnLinea && Number(form.precioBase) > 0">
                  ${{ Number(form.precioBase).toLocaleString('es-CO') }}
                  <span class="preview-currency">{{ form.moneda }}</span>
                </template>
                <span v-else-if="form.pagableEnLinea" class="preview-price--empty">Sin precio</span>
                <span v-else class="preview-quote">
                  <q-icon name="chat" size="13px" /> Cotización
                </span>
              </div>
            </div>
          </div>

          <div class="preview-meta">
            <q-chip dense :color="statusColor(form.estado)" text-color="white" class="preview-chip">
              {{ statusLabel(form.estado) }}
            </q-chip>
            <span class="preview-meta-item">
              <q-icon name="image" size="13px" /> {{ form.imagenes.length }}
            </span>
            <span v-if="form.variantes.length" class="preview-meta-item">
              <q-icon name="layers" size="13px" /> {{ form.variantes.length }}
            </span>
            <span v-if="form.sectorIds.length" class="preview-meta-item">
              <q-icon name="category" size="13px" /> {{ form.sectorIds.length }}
            </span>
          </div>

          <div class="progress-block">
            <div class="progress-top">
              <span class="progress-label">Progreso</span>
              <span class="progress-count">{{ pasosListos }} de {{ pasosTotales }}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: `${(pasosListos / pasosTotales) * 100}%` }"></div>
            </div>
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
import AttributeQuickCreateDialog from '../../../components/products/AttributeQuickCreateDialog.vue'
import FieldLabel from '../../../components/products/FieldLabel.vue'

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
const attrDialog = ref(null)

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

// ── Pasos del formulario ───────────────────────────────────────────────
const atributosCompletos = computed(() => {
  if (!form.value.categoryId) return false
  return atributos.value
    .filter((a) => a.requerido)
    .every((a) => {
      const v = form.value.atributosValues[a.clave]
      return v !== undefined && v !== null && String(v).trim() !== ''
    })
})

const steps = computed(() => [
  {
    name: 'general',
    label: 'Lo básico',
    hint: 'Nombre y categoría',
    done: !!form.value.nombre && !!form.value.categoryId,
    disabled: false,
  },
  {
    name: 'atributos',
    label: 'Características',
    hint: 'Ficha técnica',
    done: atributosCompletos.value,
    disabled: !form.value.categoryId,
    disabledReason: 'Primero elige una categoría en "Lo básico"',
  },
  {
    name: 'imagenes',
    label: 'Fotos',
    hint: form.value.imagenes.length ? `${form.value.imagenes.length} cargada${form.value.imagenes.length > 1 ? 's' : ''}` : 'Sin fotos aún',
    done: form.value.imagenes.length > 0,
    disabled: false,
  },
  {
    name: 'precio',
    label: 'Precio',
    hint: form.value.pagableEnLinea ? 'Pago en línea' : 'Por cotización',
    done: form.value.pagableEnLinea ? Number(form.value.precioBase) > 0 : true,
    disabled: false,
  },
  {
    name: 'variantes',
    label: 'Variantes',
    hint: form.value.variantes.length ? `${form.value.variantes.length} definida${form.value.variantes.length > 1 ? 's' : ''}` : 'Opcional',
    done: form.value.variantes.length > 0,
    disabled: !atributosVariante.value.length,
    disabledReason: 'Solo se activa si la categoría tiene características marcadas como variante (talla, color...)',
  },
])

const pasosListos = computed(() => steps.value.filter((s) => s.done && !s.disabled).length)
const pasosTotales = computed(() => steps.value.filter((s) => !s.disabled).length)

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

function onAttributeCreated(atributo) {
  atributos.value = [...atributos.value, atributo]
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

.stepper {
  display: flex;
  background: #f7f8fb;
  padding: 4px;
  gap: 2px;
  overflow-x: auto;
}

.step-item {
  flex: 1;
  min-width: 132px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 12px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background 140ms;
  position: relative;
}

.step-item:not(.step-item--disabled):hover {
  background: rgba(11, 18, 32, .04);
}

.step-item--active {
  background: #fff;
  box-shadow: 0 1px 3px rgba(11, 18, 32, .08);
}

.step-item--disabled {
  cursor: not-allowed;
  opacity: .45;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11.5px;
  font-weight: 800;
  flex-shrink: 0;
  background: rgba(11, 18, 32, .09);
  color: rgba(11, 18, 32, .45);
  transition: all 140ms;
}

.step-item--active .step-circle {
  background: #0071e3;
  color: #fff;
}

.step-item--done .step-circle {
  background: #16a34a;
  color: #fff;
}

.step-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.step-name {
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .55);
  line-height: 1.3;
}

.step-item--active .step-name {
  color: #0b1220;
}

.step-hint {
  font-size: 10.5px;
  color: rgba(11, 18, 32, .4);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.field-optional {
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
  font-size: 11.5px;
  text-transform: none;
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

.panel-intro {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  background: rgba(0, 113, 227, .04);
  border: 1px solid rgba(0, 113, 227, .13);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(11, 18, 32, .68);
  margin-bottom: 20px;
}

.attrs-empty {
  text-align: center;
  padding: 26px 20px 30px;
  border: 1.5px dashed rgba(11, 18, 32, .13);
  border-radius: 14px;
  background: #fbfcfe;
}

.attrs-empty-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(0, 113, 227, .08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.attrs-empty-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
  margin-bottom: 6px;
}

.attrs-empty-text {
  font-size: 13px;
  color: rgba(11, 18, 32, .55);
  line-height: 1.6;
  max-width: 420px;
  margin: 0 auto 18px;
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
  overflow: hidden;
}

.preview-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 13px 14px 10px;
}

.preview-eyebrow {
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: rgba(11, 18, 32, .42);
}

.preview-note {
  font-size: 10.5px;
  color: rgba(11, 18, 32, .35);
}

.preview-card {
  margin: 0 12px;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.preview-image {
  height: 128px;
  background: #f7f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-body {
  padding: 10px 12px 12px;
}

.preview-cat {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .4px;
  color: #0071e3;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preview-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.35;
  margin-bottom: 3px;
}

.preview-name--empty {
  color: rgba(11, 18, 32, .3);
  font-weight: 600;
}

.preview-brand {
  font-size: 11px;
  color: rgba(11, 18, 32, .45);
  margin-bottom: 6px;
}

.preview-price {
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
  margin-top: 6px;
}

.preview-currency {
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .4);
  margin-left: 2px;
}

.preview-price--empty {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(11, 18, 32, .3);
}

.preview-quote {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 800;
  color: #0071e3;
  background: rgba(0, 113, 227, .08);
  border-radius: 999px;
  padding: 3px 10px;
}

.preview-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 14px;
}

.preview-chip {
  font-size: 10px;
  height: 20px;
}

.preview-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .45);
}

.progress-block {
  padding: 0 14px 14px;
}

.progress-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}

.progress-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(11, 18, 32, .45);
}

.progress-count {
  font-size: 11px;
  font-weight: 800;
  color: #0b1220;
}

.progress-track {
  height: 5px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .08);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #0071e3, #16a34a);
  transition: width 300ms ease;
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
