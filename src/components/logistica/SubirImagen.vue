<template>
  <div class="si">
    <div class="si-preview" :class="{ vacio: !modelValue }" :style="{ aspectRatio: proporcion }">
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
      <q-btn v-if="modelValue && permitirQuitar" flat no-caps color="grey-7" icon="delete_outline" label="Quitar"
        @click="emit('update:modelValue', '')" />
      <input ref="input" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="alElegir" />
    </div>
    <p class="si-hint">{{ hint }} JPG, PNG o WEBP, máximo 5 MB.</p>

    <q-expansion-item dense dense-toggle label="O pegar un link de imagen" header-class="si-link-header">
      <q-input :model-value="modelValue" outlined dense maxlength="1000" placeholder="https://..."
        @update:model-value="(v) => emit('update:modelValue', v || '')" />
    </q-expansion-item>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { uploadsApi } from '../../api/uploads'
import { imagenCloudinary, TAMANOS } from '../../utils/imagenCloudinary'

defineProps({
  modelValue: { type: String, default: '' },
  hint: { type: String, default: '' },
  proporcion: { type: String, default: '4 / 3' },
  permitirQuitar: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const input = ref(null)
const subiendo = ref(false)

const MAX_BYTES = 5 * 1024 * 1024
const TIPOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

async function alElegir(e) {
  const archivo = e.target.files?.[0]
  e.target.value = ''
  if (!archivo) return
  if (!TIPOS.includes(archivo.type)) {
    $q.notify({ message: 'Solo se aceptan imágenes JPG, PNG, WEBP o GIF.', color: 'orange-8', position: 'top' })
    return
  }
  if (archivo.size > MAX_BYTES) {
    $q.notify({ message: 'La imagen pesa más de 5 MB. Redúcela e intenta de nuevo.', color: 'orange-8', position: 'top' })
    return
  }
  subiendo.value = true
  try {
    const { data } = await uploadsApi.uploadImage(archivo, 'logistica')
    emit('update:modelValue', data.url)
  } catch (err) {
    const m = err?.response?.data?.message
    $q.notify({ message: Array.isArray(m) ? m.join(' ') : m || 'No se pudo subir la imagen.', color: 'red-5', position: 'top' })
  } finally {
    subiendo.value = false
  }
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
</style>
