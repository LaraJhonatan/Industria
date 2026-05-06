<template>
  <div class="uploader">

    <div class="dropzone" :class="{ 'dz-drag': dragging }" @click="fileInput.click()"
      @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false" @drop.prevent="onDrop">
      <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="onFileChange" />
      <q-icon name="cloud_upload" size="36px" color="blue-6" />
      <p class="dz-text">Arrastra imágenes o <span class="dz-link">selecciona</span></p>
      <p class="dz-hint">JPG, PNG, WEBP · Máx. 5 MB por imagen</p>
    </div>

    <div v-if="images.length" class="images-grid q-mt-md">
      <div v-for="(img, i) in images" :key="i" class="image-item" :class="{ 'img-principal': img.esPrincipal }">
        <img :src="img.preview || img.url" class="image-thumb" />

        <div class="image-overlay">
          <q-btn round dense flat icon="star" size="sm" :color="img.esPrincipal ? 'yellow-6' : 'white'"
            @click.stop="setPrincipal(i)">
            <q-tooltip>{{ img.esPrincipal ? 'Principal' : 'Marcar como principal' }}</q-tooltip>
          </q-btn>
          <q-btn round dense flat icon="close" color="white" size="sm" @click.stop="removeImage(i)" />
        </div>

        <div v-if="img.uploading" class="upload-progress">
          <q-spinner color="white" size="20px" />
        </div>

        <q-chip v-if="img.esPrincipal" dense color="blue-6" text-color="white"
          style="position:absolute;bottom:6px;left:6px;font-size:10px;height:18px">
          Principal
        </q-chip>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uploadsApi } from '../../api/uploads'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  folder: { type: String, default: 'productos' },
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const dragging = ref(false)
const images = ref(props.modelValue.map(img => ({ ...img, preview: img.url })))

async function onFileChange(e) {
  await processFiles(Array.from(e.target.files))
  e.target.value = ''
}

function onDrop(e) {
  dragging.value = false
  processFiles(Array.from(e.dataTransfer.files))
}

async function processFiles(files) {
  const validos = files.filter(f => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024)

  for (const file of validos) {
    const preview = URL.createObjectURL(file)
    const item = { preview, url: '', esPrincipal: images.value.length === 0, uploading: true }
    images.value.push(item)
    const idx = images.value.length - 1

    try {
      const { data } = await uploadsApi.uploadImage(file, props.folder)
      images.value[idx].url = data.url
      images.value[idx].uploading = false
      emitUpdate() // ← solo emite cuando ya tiene URL
    } catch {
      images.value.splice(idx, 1)
      emitUpdate()
    }
  }
}

function setPrincipal(idx) {
  images.value.forEach((img, i) => img.esPrincipal = i === idx)
  emitUpdate()
}

function removeImage(idx) {
  images.value.splice(idx, 1)
  if (images.value.length && !images.value.some(i => i.esPrincipal)) {
    images.value[0].esPrincipal = true
  }
  emitUpdate()
}

function emitUpdate() {
  emit('update:modelValue', images.value.filter(i => i.url).map(i => ({
    url: i.url,
    esPrincipal: i.esPrincipal,
    orden: images.value.indexOf(i),
  })))
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed rgba(11, 18, 32, .15);
  border-radius: 12px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 160ms;
  text-align: center;
  background: #fff;
}

.dropzone:hover,
.dz-drag {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .03);
}

.dz-text {
  font-size: 14px;
  font-weight: 600;
  color: rgba(11, 18, 32, .6);
  margin: 0;
}

.dz-link {
  color: #0071e3;
  font-weight: 800;
}

.dz-hint {
  font-size: 12px;
  color: rgba(11, 18, 32, .38);
  margin: 0;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.image-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid rgba(11, 18, 32, .1);
  aspect-ratio: 1;
}

.img-principal {
  border-color: #0071e3;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, .2);
}

.image-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 4px;
  opacity: 0;
  transition: opacity 160ms;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.upload-progress {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
