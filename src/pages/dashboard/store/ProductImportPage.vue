<template>
  <q-page class="q-pa-lg">

    <div class="row items-center q-mb-lg">
      <q-btn flat round dense icon="arrow_back" color="grey-6" class="q-mr-sm"
        @click="router.push('/dashboard/productos')" />
      <div>
        <h1 class="page-title q-mb-xs">Importar desde un documento</h1>
        <p class="page-sub">Sube tu catálogo o lista de precios y lo convertimos en productos</p>
      </div>
    </div>

    <!-- PASO 1: subir -->
    <q-card v-if="fase === 'subir'" flat bordered class="panel">
      <div class="q-pa-lg">
        <div class="panel-intro q-mb-lg">
          <q-icon name="lightbulb" size="17px" color="blue-6" />
          <span>
            Sube el documento que ya tengas — una cotización, un catálogo o una lista de precios.
            Lo leemos, te mostramos los productos que encontramos y <b>tú revisas y corriges antes de crear nada</b>.
            Todo se crea como borrador.
          </span>
        </div>

        <div class="dropzone" :class="{ 'dropzone--over': dragOver }" @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false" @drop.prevent="onDrop" @click="fileInput?.click()">
          <input ref="fileInput" type="file" accept=".docx,.pdf" hidden @change="onPick" />
          <q-icon name="upload_file" size="34px" color="blue-6" />
          <div class="dropzone-title">Arrastra tu documento o <span class="link">selecciona</span></div>
          <div class="dropzone-sub">Word (.docx) o PDF · Máximo 10 MB</div>
        </div>

        <div class="nota q-mt-md">
          <q-icon name="info_outline" size="15px" />
          <span>
            Si tu archivo es <b>.doc</b> (Word viejo), ábrelo y guárdalo como <b>.docx</b>.
            Los PDF escaneados (fotos de un papel) no se pueden leer.
          </span>
        </div>
      </div>
    </q-card>

    <!-- PASO 2: analizando -->
    <q-card v-else-if="fase === 'analizando'" flat bordered class="panel">
      <div class="column items-center q-py-xl">
        <q-spinner color="blue-6" size="40px" />
        <div class="analizando-title q-mt-md">Leyendo "{{ archivoNombre }}"</div>
        <div class="analizando-sub">Esto puede tardar hasta un minuto en documentos largos.</div>
      </div>
    </q-card>

    <!-- PASO 3: revisión -->
    <template v-else-if="fase === 'revision'">
      <q-card flat bordered class="panel q-mb-md">
        <div class="revision-head">
          <div>
            <div class="revision-title">Encontramos {{ productos.length }} producto{{ productos.length > 1 ? 's' : ''
              }}</div>
            <div class="revision-sub">
              Revisa que estén bien. Puedes editar cualquier campo, o desmarcar los que no quieras crear.
            </div>
          </div>
          <q-btn flat no-caps dense icon="refresh" label="Subir otro documento" color="grey-7" @click="reiniciar" />
        </div>

        <div v-if="faltanCategoria" class="alerta-cat">
          <q-icon name="warning" size="18px" color="orange-8" />
          <span>
            <b>{{ faltanCategoria }}</b> producto{{ faltanCategoria > 1 ? 's' : '' }}
            {{ faltanCategoria > 1 ? 'necesitan' : 'necesita' }} que le asignes una categoría antes de continuar.
          </span>
        </div>
      </q-card>

      <q-card flat bordered class="panel q-mb-md">
        <div class="lista-head">
          <q-checkbox v-model="todosSeleccionados" dense color="blue-6" />
          <span class="lista-head-text">
            {{ seleccionados.length }} de {{ productos.length }} seleccionados
          </span>
        </div>

        <div v-for="(p, i) in productos" :key="i" class="fila" :class="{ 'fila--off': !p.incluir }">
          <div class="fila-head">
            <q-checkbox v-model="p.incluir" dense color="blue-6" />
            <div class="fila-main" @click="p.abierto = !p.abierto">
              <div class="fila-nombre">{{ p.nombre }}</div>
              <div class="fila-meta">
                <span v-if="p.categoryId" class="cat-ok">
                  <q-icon name="folder" size="12px" /> {{ nombreCategoria(p) }}
                </span>
                <span v-else class="cat-falta">
                  <q-icon name="warning" size="12px" /> Falta categoría
                </span>
                <span v-if="p.pagableEnLinea && p.precioBase" class="fila-precio">
                  ${{ Number(p.precioBase).toLocaleString('es-CO') }}
                </span>
                <span v-else-if="!p.pagableEnLinea" class="fila-cotiza">Cotización</span>
              </div>
            </div>
            <q-btn flat dense round size="sm" :icon="p.abierto ? 'expand_less' : 'expand_more'" color="grey-6"
              @click="p.abierto = !p.abierto" />
          </div>

          <q-slide-transition>
            <div v-show="p.abierto" class="fila-body">
              <div class="fila-grid">
                <div class="campo-full">
                  <label class="mini-label">Nombre</label>
                  <q-input v-model="p.nombre" outlined dense />
                </div>

                <div class="campo-full">
                  <label class="mini-label">
                    Categoría
                    <span v-if="!p.categoryId && p.categoriaSugerida" class="sugerencia">
                      La IA sugirió crear: "{{ p.categoriaSugerida }}"
                    </span>
                  </label>
                  <CategoryPicker :category-id="p.categoryId" :subcategory-id="p.subcategoryId"
                    @select="(v) => aplicarCategoria(p, v)" @clear="() => aplicarCategoria(p, {})" />
                </div>

                <div>
                  <label class="mini-label">Precio</label>
                  <q-input v-model.number="p.precioBase" outlined dense type="number" prefix="$" placeholder="0.00" />
                </div>
                <div>
                  <label class="mini-label">Modalidad</label>
                  <q-select v-model="p.pagableEnLinea" :options="modalidades" emit-value map-options outlined dense />
                </div>

                <div>
                  <label class="mini-label">SKU</label>
                  <q-input v-model="p.sku" outlined dense placeholder="Opcional" />
                </div>
                <div>
                  <label class="mini-label">Marca</label>
                  <q-input v-model="p.marca" outlined dense placeholder="Opcional" />
                </div>

                <div class="campo-full">
                  <label class="mini-label">Descripción</label>
                  <q-input v-model="p.descripcion" outlined dense type="textarea" autogrow />
                </div>
              </div>
            </div>
          </q-slide-transition>
        </div>
      </q-card>

      <div class="row justify-end items-center gap-md">
        <q-btn flat no-caps label="Cancelar" color="grey-7" class="action-btn" @click="reiniciar" />
        <q-btn unelevated no-caps color="blue-6" class="action-btn" :loading="creando" :disable="!puedeCrear"
          :label="`Crear ${seleccionados.length} producto${seleccionados.length === 1 ? '' : 's'} como borrador`"
          icon="playlist_add_check" @click="confirmar" />
      </div>
    </template>

    <!-- PASO 4: resultado -->
    <q-card v-else-if="fase === 'listo'" flat bordered class="panel">
      <div class="column items-center q-py-xl q-px-lg">
        <div class="ok-icon">
          <q-icon name="check" size="30px" color="green-6" />
        </div>
        <div class="ok-title">Se crearon {{ resultado.totalCreados }} producto{{ resultado.totalCreados === 1 ? '' : 's'
          }}</div>
        <p class="ok-sub">
          Quedaron como <b>borrador</b>. Ábrelos para agregarles fotos y características, y publícalos cuando estén
          listos.
        </p>

        <div v-if="resultado.totalErrores" class="errores">
          <div class="errores-title">
            <q-icon name="error_outline" size="16px" color="negative" />
            {{ resultado.totalErrores }} no se pudieron crear:
          </div>
          <div v-for="(e, i) in resultado.errores" :key="i" class="error-item">
            <b>{{ e.nombre }}</b> — {{ e.motivo }}
          </div>
        </div>

        <div class="row gap-md q-mt-lg">
          <q-btn flat no-caps label="Importar otro documento" color="grey-7" class="action-btn" @click="reiniciar" />
          <q-btn unelevated no-caps label="Ver mis productos" color="blue-6" class="action-btn"
            @click="router.push('/dashboard/productos')" />
        </div>
      </div>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { productImportApi } from '../../../api/productImport'
import { useCatalogStore } from '../../../stores/catalog-store'
import CategoryPicker from '../../../components/products/CategoryPicker.vue'

const router = useRouter()
const $q = useQuasar()
const catalogStore = useCatalogStore()

const fase = ref('subir')
const dragOver = ref(false)
const fileInput = ref(null)
const archivoNombre = ref('')
const productos = ref([])
const creando = ref(false)
const resultado = ref({ totalCreados: 0, totalErrores: 0, errores: [] })

const modalidades = [
  { label: 'Pago en línea', value: true },
  { label: 'Requiere cotización', value: false },
]

const seleccionados = computed(() => productos.value.filter((p) => p.incluir))
const faltanCategoria = computed(() => seleccionados.value.filter((p) => !p.categoryId).length)
const puedeCrear = computed(() => seleccionados.value.length > 0 && faltanCategoria.value === 0)

const todosSeleccionados = computed({
  get: () => productos.value.length > 0 && productos.value.every((p) => p.incluir),
  set: (v) => productos.value.forEach((p) => { p.incluir = v }),
})

function nombreCategoria(p) {
  const cat = catalogStore.tree.find((c) => c.id === p.categoryId)
  if (!cat) return 'Categoría'
  const sub = cat.hijos?.find((h) => h.id === p.subcategoryId)
  return sub ? `${cat.nombre} › ${sub.nombre}` : cat.nombre
}

function aplicarCategoria(p, { categoryId = null, subcategoryId = null }) {
  p.categoryId = categoryId
  p.subcategoryId = subcategoryId
}

function onDrop(e) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) analizar(file)
}

function onPick(e) {
  const file = e.target.files?.[0]
  if (file) analizar(file)
  e.target.value = ''
}

async function analizar(file) {
  const nombre = file.name.toLowerCase()
  if (!nombre.endsWith('.docx') && !nombre.endsWith('.pdf')) {
    $q.notify({ type: 'warning', message: 'Solo se aceptan archivos .docx o .pdf', position: 'top-right' })
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    $q.notify({ type: 'warning', message: 'El archivo supera los 10 MB', position: 'top-right' })
    return
  }

  archivoNombre.value = file.name
  fase.value = 'analizando'

  try {
    const { data } = await productImportApi.analizar(file)
    productos.value = data.productos.map((p) => ({ ...p, incluir: true, abierto: false }))
    fase.value = 'revision'
  } catch (e) {
    const msg = e.response?.data?.message
    $q.notify({
      type: 'negative',
      message: Array.isArray(msg) ? msg[0] : (msg || 'No se pudo leer el documento'),
      position: 'top-right',
      timeout: 6000,
    })
    fase.value = 'subir'
  }
}

async function confirmar() {
  creando.value = true
  try {
    const payload = seleccionados.value.map((p) => ({
      nombre: p.nombre,
      descripcion: p.descripcion || undefined,
      categoryId: p.categoryId,
      subcategoryId: p.subcategoryId || undefined,
      precioBase: p.precioBase || undefined,
      moneda: p.moneda || 'COP',
      sku: p.sku || undefined,
      marca: p.marca || undefined,
      pagableEnLinea: p.pagableEnLinea,
    }))
    const { data } = await productImportApi.confirmar(payload)
    resultado.value = data
    fase.value = 'listo'
  } catch (e) {
    const msg = e.response?.data?.message
    $q.notify({
      type: 'negative',
      message: Array.isArray(msg) ? msg[0] : (msg || 'No se pudieron crear los productos'),
      position: 'top-right',
    })
  } finally {
    creando.value = false
  }
}

function reiniciar() {
  fase.value = 'subir'
  productos.value = []
  archivoNombre.value = ''
}

onMounted(() => {
  if (!catalogStore.tree.length) catalogStore.fetchTree()
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

.panel {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
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
}

.dropzone {
  border: 2px dashed rgba(11, 18, 32, .15);
  border-radius: 14px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 150ms;
  background: #fbfcfe;
}

.dropzone:hover,
.dropzone--over {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .04);
}

.dropzone-title {
  font-size: 14px;
  font-weight: 700;
  color: #0b1220;
  margin-top: 10px;
}

.link {
  color: #0071e3;
}

.dropzone-sub {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  margin-top: 4px;
}

.nota {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .48);
  line-height: 1.5;
}

.analizando-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
}

.analizando-sub {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .45);
  margin-top: 4px;
}

.revision-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 18px;
}

.revision-title {
  font-size: 16px;
  font-weight: 800;
  color: #0b1220;
}

.revision-sub {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
  margin-top: 3px;
}

.alerta-cat {
  display: flex;
  align-items: center;
  gap: 9px;
  background: rgba(234, 158, 25, .08);
  border-top: 1px solid rgba(234, 158, 25, .25);
  padding: 12px 18px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .75);
}

.lista-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1.5px solid rgba(11, 18, 32, .07);
  background: #f7f8fb;
}

.lista-head-text {
  font-size: 12px;
  font-weight: 700;
  color: rgba(11, 18, 32, .5);
}

.fila {
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.fila:last-child {
  border-bottom: none;
}

.fila--off {
  opacity: .45;
}

.fila-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
}

.fila-main {
  flex: 1;
  min-width: 0;
  cursor: pointer;
}

.fila-nombre {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
  line-height: 1.35;
}

.fila-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 3px;
}

.cat-ok,
.cat-falta,
.fila-precio,
.fila-cotiza {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  font-weight: 700;
}

.cat-ok {
  color: rgba(11, 18, 32, .45);
}

.cat-falta {
  color: #b45309;
}

.fila-precio {
  color: #0b1220;
}

.fila-cotiza {
  color: #0071e3;
}

.fila-body {
  padding: 4px 14px 18px 44px;
}

.fila-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.campo-full {
  grid-column: 1 / -1;
}

.mini-label {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .5);
  margin-bottom: 5px;
}

.sugerencia {
  font-weight: 600;
  color: #b45309;
  margin-left: 6px;
}

.ok-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(22, 163, 74, .1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.ok-title {
  font-size: 18px;
  font-weight: 800;
  color: #0b1220;
}

.ok-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .55);
  text-align: center;
  max-width: 420px;
  line-height: 1.6;
  margin: 6px 0 0;
}

.errores {
  margin-top: 18px;
  background: rgba(220, 38, 38, .05);
  border: 1px solid rgba(220, 38, 38, .2);
  border-radius: 12px;
  padding: 12px 14px;
  max-width: 460px;
}

.errores-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
  margin-bottom: 6px;
}

.error-item {
  font-size: 12px;
  color: rgba(11, 18, 32, .6);
  line-height: 1.5;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.gap-md {
  gap: 10px;
}

@media (max-width: 700px) {
  .fila-grid {
    grid-template-columns: 1fr;
  }

  .fila-body {
    padding-left: 14px;
  }
}
</style>
