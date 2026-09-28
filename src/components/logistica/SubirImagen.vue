<template>
  <div class="si">
    <div class="si-preview" :class="{ vacio: !modelValue }" :style="{ aspectRatio: aspectoCss }">
      <img v-if="modelValue" :src="imagenCloudinary(modelValue, TAMANOS.vistaPrevia)" alt="" />
      <div v-else class="si-vacio">
        <q-icon name="image" size="30px" />
        <span>Sin imagen</span>
      </div>
      <div v-if="subiendo" class="si-cargando">
        <q-spinner color="white" size="28px" />
      </div>
    </div>

    <div class="si-acciones">
      <q-btn unelevated no-caps color="blue-6" icon="upload" :label="modelValue ? 'Cambiar foto' : 'Subir foto'"
        :loading="subiendo" class="si-btn" @click="input?.click()" />
      <q-btn v-if="modelValue && config" flat no-caps color="blue-6" icon="crop" label="Ajustar encuadre"
        :disable="subiendo" @click="reencuadrar" />
      <q-btn v-if="modelValue && permitirQuitar" flat no-caps color="grey-7" icon="delete_outline" label="Quitar"
        @click="emit('update:modelValue', '')" />
      <input ref="input" type="file" accept="image/jpeg,image/png,image/webp" hidden @change="alElegir" />
    </div>
    <p class="si-hint">
      {{ hint }}
      <template v-if="config">Al subirla eliges qué parte mostrar.</template>
      JPG, PNG o WEBP.
    </p>

    <q-expansion-item dense dense-toggle label="O pegar un link de imagen" header-class="si-link-header">
      <q-input :model-value="modelValue" outlined dense maxlength="1000" placeholder="https://..."
        @update:model-value="(v) => emit('update:modelValue', v || '')" />
    </q-expansion-item>

    <!-- Editor de recorte -->
    <q-dialog v-model="editor.abierto" :maximized="$q.screen.lt.sm" persistent @show="iniciarCropper"
      @hide="cerrarCropper">
      <q-card class="si-editor">
        <q-card-section class="si-editor-head">
          <div>
            <strong>Ajusta la foto · {{ config?.etiqueta }}</strong>
            <p>Arrastra la foto para moverla y usa la rueda del mouse (o los botones) para acercar. Lo que queda
              dentro del recuadro es exactamente lo que se verá en la página.</p>
          </div>
          <q-btn flat round dense icon="close" aria-label="Cerrar" :disable="subiendo" @click="editor.abierto = false" />
        </q-card-section>

        <div class="si-editor-area">
          <img ref="imgEditor" :src="editor.src" crossorigin="anonymous" alt="Foto a recortar" />
          <div v-if="!editor.listo" class="si-editor-cargando">
            <q-spinner color="white" size="34px" />
          </div>
        </div>

        <q-card-section class="si-editor-tools">
          <q-btn flat round dense icon="zoom_out" aria-label="Alejar" @click="cropper?.zoom(-0.1)">
            <q-tooltip>Alejar</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="zoom_in" aria-label="Acercar" @click="cropper?.zoom(0.1)">
            <q-tooltip>Acercar</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="rotate_left" aria-label="Girar" @click="cropper?.rotate(-90)">
            <q-tooltip>Girar</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="restart_alt" aria-label="Restablecer" @click="cropper?.reset()">
            <q-tooltip>Restablecer</q-tooltip>
          </q-btn>
          <q-space />
          <span v-if="editor.anchoRecorte" class="si-editor-size" :class="{ bajo: calidadBaja }">
            <q-icon :name="calidadBaja ? 'warning_amber' : 'check_circle'" size="16px" />
            {{ calidadBaja ? 'Poca resolución: puede verse borrosa' : 'Buena resolución' }}
            ({{ editor.anchoRecorte }} px)
          </span>
        </q-card-section>

        <q-card-actions align="right" class="si-editor-actions">
          <q-btn flat no-caps color="grey-8" label="Cancelar" :disable="subiendo" @click="editor.abierto = false" />
          <q-btn unelevated no-caps color="blue-6" icon="crop" label="Recortar y subir" :loading="subiendo"
            :disable="!editor.listo" @click="recortarYSubir" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadsApi } from '../../api/uploads'
import { imagenCloudinary, TAMANOS, RECORTES } from '../../utils/imagenCloudinary'

const props = defineProps({
  modelValue: { type: String, default: '' },
  hint: { type: String, default: '' },
  /** Clave de RECORTES (banner | encabezado | vehiculo): activa el editor con esa forma. */
  recorte: { type: String, default: '' },
  permitirQuitar: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const input = ref(null)
const subiendo = ref(false)

const config = computed(() => RECORTES[props.recorte] || null)
const aspectoCss = computed(() => (config.value ? String(config.value.aspecto) : '4 / 3'))

// El original puede ser una foto de celular pesada: se recorta en el navegador y solo se sube el
// recorte (JPG de ~1 MB), que sí cabe en el límite de 5 MB del servidor.
const MAX_ORIGINAL = 25 * 1024 * 1024
const MAX_SUBIDA = 5 * 1024 * 1024
const TIPOS = ['image/jpeg', 'image/png', 'image/webp']

// ── Editor ──

const imgEditor = ref(null)
let cropper = null
const editor = reactive({ abierto: false, src: '', esObjectUrl: false, listo: false, anchoRecorte: 0 })

const calidadBaja = computed(() => config.value && editor.anchoRecorte < config.value.ancho * 0.4)

function abrirEditor(src, esObjectUrl) {
  editor.src = src
  editor.esObjectUrl = esObjectUrl
  editor.listo = false
  editor.anchoRecorte = 0
  editor.abierto = true
}

function iniciarCropper() {
  cropper = new Cropper(imgEditor.value, {
    aspectRatio: config.value.aspecto,
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 1,
    background: false,
    responsive: true,
    toggleDragModeOnDblclick: false,
    checkCrossOrigin: false,
    ready() {
      // En vehículos el marco arranca abajo: el vehículo está en el piso y arriba suele sobrar cielo.
      if (props.recorte === 'vehiculo') {
        const lienzo = cropper.getCanvasData()
        const marco = cropper.getCropBoxData()
        cropper.setCropBoxData({ top: lienzo.top + lienzo.height - marco.height })
      }
      editor.listo = true
      actualizarTamano()
    },
    crop: actualizarTamano,
  })
  imgEditor.value.addEventListener('error', errorAlCargar, { once: true })
}

function errorAlCargar() {
  editor.abierto = false
  $q.notify({
    message: 'No se pudo abrir esa imagen para ajustarla. Súbela de nuevo desde tu equipo.',
    color: 'orange-8',
    position: 'top',
  })
}

function actualizarTamano() {
  const datos = cropper?.getData(true)
  if (datos) editor.anchoRecorte = Math.min(datos.width, config.value.ancho)
}

function cerrarCropper() {
  cropper?.destroy()
  cropper = null
  if (editor.esObjectUrl) URL.revokeObjectURL(editor.src)
  editor.src = ''
}

async function recortarYSubir() {
  if (!cropper || subiendo.value) return
  const { ancho, aspecto } = config.value
  let blob = null
  try {
    // Tamaño final = resolución real de la zona elegida (sin agrandar), con tope en `ancho`.
    // Ojo: no usar maxWidth/maxHeight de cropperjs; esos reducen la foto COMPLETA antes de
    // recortar y el resultado queda con menos resolución de la que tiene el original.
    const zona = cropper.getData(true)
    const w = Math.max(1, Math.min(Math.round(zona.width), ancho))
    const canvas = cropper.getCroppedCanvas({
      width: w,
      height: Math.round(w / aspecto),
      fillColor: '#ffffff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    })
    blob = canvas ? await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9)) : null
  } catch {
    // Imagen de otro sitio que no permite procesarla en el navegador (CORS).
    $q.notify({
      message: 'Esa imagen no se puede recortar aquí. Descárgala y súbela desde tu equipo.',
      color: 'orange-8',
      position: 'top',
    })
    return
  }
  if (!blob) {
    $q.notify({ message: 'No se pudo procesar la imagen.', color: 'red-5', position: 'top' })
    return
  }
  const ok = await subir(new File([blob], 'recorte.jpg', { type: 'image/jpeg' }))
  if (ok) editor.abierto = false
}

// ── Subida ──

async function subir(archivo) {
  if (archivo.size > MAX_SUBIDA) {
    $q.notify({ message: 'La imagen pesa más de 5 MB. Redúcela e intenta de nuevo.', color: 'orange-8', position: 'top' })
    return false
  }
  subiendo.value = true
  try {
    const { data } = await uploadsApi.uploadImage(archivo, 'logistica')
    emit('update:modelValue', data.url)
    return true
  } catch (err) {
    const m = err?.response?.data?.message
    $q.notify({ message: Array.isArray(m) ? m.join(' ') : m || 'No se pudo subir la imagen.', color: 'red-5', position: 'top' })
    return false
  } finally {
    subiendo.value = false
  }
}

function alElegir(e) {
  const archivo = e.target.files?.[0]
  e.target.value = ''
  if (!archivo) return
  if (!TIPOS.includes(archivo.type)) {
    $q.notify({ message: 'Solo se aceptan imágenes JPG, PNG o WEBP.', color: 'orange-8', position: 'top' })
    return
  }
  if (!config.value) {
    subir(archivo)
    return
  }
  if (archivo.size > MAX_ORIGINAL) {
    $q.notify({ message: 'La imagen pesa más de 25 MB. Usa una más liviana.', color: 'orange-8', position: 'top' })
    return
  }
  abrirEditor(URL.createObjectURL(archivo), true)
}

/** Vuelve a encuadrar la foto actual (se abre el original, sin las reducciones de Cloudinary). */
function reencuadrar() {
  abrirEditor(props.modelValue, false)
}
</script>

<style scoped>
.si {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.si-preview {
  position: relative;
  width: 100%;
  max-height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;
  border: 1px solid rgba(11, 18, 32, .08);
}

.si-preview.vacio {
  border-style: dashed;
}

.si-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.si-vacio {
  height: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #94a3b8;
  font-size: 12.5px;
  font-weight: 700;
}

.si-cargando {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(11, 18, 32, .45);
}

.si-acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.si-btn {
  border-radius: 10px;
  font-weight: 700;
}

.si-hint {
  margin: 0;
  font-size: 12px;
  color: rgba(11, 18, 32, .5);
}

:deep(.si-link-header) {
  padding-left: 0;
  font-size: 12.5px;
  color: #0071e3;
}

/* ── Editor ── */
.si-editor {
  width: 900px;
  max-width: 96vw;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

.si-editor-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.si-editor-head strong {
  font-size: 16px;
  color: #0b1220;
}

.si-editor-head p {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .55);
}

.si-editor-area {
  position: relative;
  height: min(60vh, 520px);
  background: #0f172a;
}

.si-editor-area img {
  display: block;
  max-width: 100%;
}

.si-editor-cargando {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.si-editor-tools {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 8px;
  padding-bottom: 0;
}

.si-editor-size {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #15803d;
}

.si-editor-size.bajo {
  color: #b45309;
}

.si-editor-actions {
  padding: 12px 16px 16px;
}

@media (max-width: 599px) {
  .si-editor {
    max-width: 100vw;
    border-radius: 0;
  }

  .si-editor-area {
    flex: 1;
    height: auto;
    min-height: 50vh;
  }
}
</style>
