<template>
  <div class="category-picker">
    <q-select v-model="selected" :options="filteredOptions" use-input hide-selected fill-input input-debounce="150"
      outlined dense option-label="path" placeholder="Busca una categoría (ej: Drones, Acero, Café...)"
      :rules="required ? [rule] : []" @filter="onFilter" @update:model-value="onSelect" @clear="onClear" clearable>
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar v-if="scope.opt.isCreateNew">
            <q-icon name="add_circle_outline" color="blue-6" size="20px" />
          </q-item-section>
          <q-item-section>
            <template v-if="scope.opt.isCreateNew">
              <q-item-label class="create-new-label">Crear categoría nueva: "{{ scope.opt.nombre }}"</q-item-label>
            </template>
            <template v-else>
              <q-item-label>{{ scope.opt.path }}</q-item-label>
              <q-item-label caption v-if="scope.opt.score >= 0.6">Coincide con lo que buscas</q-item-label>
            </template>
          </q-item-section>
        </q-item>
      </template>
      <template #no-option>
        <q-item>
          <q-item-section class="text-center text-grey-6 q-py-sm">
            <q-icon name="search_off" size="22px" class="q-mb-xs" />
            <div class="text-caption">No encontramos categorías así</div>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <p class="picker-hint">
      ¿Buscas algo más específico? Usa las características o variantes del producto en vez de crear una categoría
      nueva.
    </p>

    <q-dialog v-model="createDialog" persistent>
      <q-card style="width:400px;border-radius:16px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Nueva categoría</div>
          <p class="text-caption text-grey-6 q-mb-none">
            Solo créala si de verdad no existe algo parecido — puedes revisar arriba antes de confirmar.
          </p>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-input v-model="newCategoryName" outlined dense label="Nombre de la categoría" autofocus />
          <q-select v-model="newCategoryParentId" :options="topLevelOptions" option-value="id" option-label="nombre"
            emit-value map-options outlined dense clearable
            label="Categoría padre (déjalo vacío para que sea una categoría principal)" />

          <div class="create-preview">
            <q-icon :name="newCategoryParentId ? 'account_tree' : 'folder'" size="18px" color="blue-6" />
            <div class="create-preview-text">
              <template v-if="newCategoryParentId">
                Se creará como <b>subcategoría</b> de <b>{{ parentPreviewName }}</b>:<br />
                {{ parentPreviewName }} › <b>{{ newCategoryName.trim() || '(nombre de la categoría)' }}</b>
              </template>
              <template v-else>
                Se creará como <b>categoría principal</b> (no dentro de ninguna otra):<br />
                <b>{{ newCategoryName.trim() || '(nombre de la categoría)' }}</b>
              </template>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cancelar" v-close-popup :disable="creating" />
          <q-btn unelevated label="Crear categoría" color="blue-6" class="action-btn" :loading="creating"
            :disable="!newCategoryName.trim()" @click="confirmCreate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useCatalogStore } from '../../stores/catalog-store'
import { categoriesApi } from '../../api/categories'
import { findSimilarCategories, normalizeText } from '../../utils/textMatch'

const props = defineProps({
  categoryId: { type: String, default: null },
  subcategoryId: { type: String, default: null },
  required: { type: Boolean, default: false },
})
const emit = defineEmits(['select', 'clear'])

const $q = useQuasar()
const catalogStore = useCatalogStore()

const filteredOptions = ref([])
const creating = ref(false)
const createDialog = ref(false)
const newCategoryName = ref('')
const newCategoryParentId = ref(null)

const rule = () => (props.categoryId ? true : 'Selecciona una categoría')

const flatList = computed(() => {
  const flat = []
  for (const cat of catalogStore.tree) {
    flat.push({ id: cat.id, nombre: cat.nombre, parentId: null, path: cat.nombre })
    for (const sub of cat.hijos || []) {
      flat.push({ id: sub.id, nombre: sub.nombre, parentId: cat.id, path: `${cat.nombre} › ${sub.nombre}` })
    }
  }
  return flat
})

const topLevelOptions = computed(() => catalogStore.tree.map((c) => ({ id: c.id, nombre: c.nombre })))

const parentPreviewName = computed(() => {
  return topLevelOptions.value.find((o) => o.id === newCategoryParentId.value)?.nombre || ''
})

const selectedOption = computed(() => {
  if (props.subcategoryId) return flatList.value.find((c) => c.id === props.subcategoryId) || null
  if (props.categoryId) return flatList.value.find((c) => c.id === props.categoryId) || null
  return null
})

const selected = ref(selectedOption.value)
watch(selectedOption, (v) => { selected.value = v })

function onFilter(val, update) {
  update(() => {
    if (!val) {
      filteredOptions.value = flatList.value
      return
    }
    const matches = findSimilarCategories(val, catalogStore.tree, { threshold: 0.3 })
    const exact = matches.some((m) => normalizeText(m.nombre) === normalizeText(val))
    filteredOptions.value = exact
      ? matches
      : [...matches, { isCreateNew: true, nombre: val, id: '__create__', path: val }]
  })
}

function guessParentId() {
  const counts = {}
  for (const opt of filteredOptions.value) {
    if (opt.isCreateNew || !opt.parentId) continue
    counts[opt.parentId] = (counts[opt.parentId] || 0) + 1
  }
  const entries = Object.entries(counts)
  if (!entries.length) return null
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}

function onSelect(opt) {
  if (!opt) return
  if (opt.isCreateNew) {
    newCategoryName.value = opt.nombre
    newCategoryParentId.value = guessParentId()
    createDialog.value = true
    selected.value = selectedOption.value
    return
  }
  if (opt.parentId) {
    emit('select', { categoryId: opt.parentId, subcategoryId: opt.id })
  } else {
    emit('select', { categoryId: opt.id, subcategoryId: null })
  }
}

function onClear() {
  emit('clear')
}

async function confirmCreate() {
  const nombre = newCategoryName.value.trim()
  if (!nombre) return
  creating.value = true
  try {
    const { data } = await categoriesApi.create({
      nombre,
      parentId: newCategoryParentId.value || undefined,
    })
    await catalogStore.fetchTree()
    createDialog.value = false
    if (data.parentId) {
      emit('select', { categoryId: data.parentId, subcategoryId: data.id })
    } else {
      emit('select', { categoryId: data.id, subcategoryId: null })
    }
    $q.notify({ type: 'positive', message: `Categoría "${data.nombre}" creada`, position: 'top-right' })
  } catch (e) {
    const msg = e.response?.data?.message
    $q.notify({
      type: 'negative',
      message: Array.isArray(msg) ? msg[0] : (msg || 'No se pudo crear la categoría'),
      position: 'top-right',
    })
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.picker-hint {
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
  margin: 6px 0 0;
  line-height: 1.4;
}

.create-new-label {
  color: #0071e3;
  font-weight: 700;
}

.create-preview {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #f0f6ff;
  border: 1px solid rgba(0, 113, 227, .15);
  border-radius: 10px;
  padding: 10px 12px;
  margin-top: 4px;
}

.create-preview-text {
  font-size: 12.5px;
  line-height: 1.5;
  color: rgba(11, 18, 32, .75);
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}
</style>
