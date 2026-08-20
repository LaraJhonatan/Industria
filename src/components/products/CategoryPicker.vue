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
      <q-card class="create-dialog">
        <q-card-section class="dialog-head">
          <div class="dialog-title">
            <q-icon name="create_new_folder" size="22px" color="blue-6" />
            Crear una categoría nueva
          </div>
          <p class="dialog-sub">
            Solo créala si de verdad no existe algo parecido. Si dudas, cancela y busca de nuevo.
          </p>
        </q-card-section>

        <q-card-section class="dialog-body">

          <div class="step">
            <div class="step-label">
              <span class="step-num">1</span>
              ¿Cómo se va a llamar?
            </div>
            <q-input v-model="newCategoryName" outlined dense autofocus placeholder="Ej: Periféricos de Computo" />
          </div>

          <div class="step">
            <div class="step-label">
              <span class="step-num">2</span>
              ¿Dónde va a vivir?
            </div>
            <div class="type-toggle">
              <button type="button" class="type-opt" :class="{ 'type-opt--active': !isSubcategory }"
                @click="isSubcategory = false">
                <q-icon name="folder" size="20px" />
                <div>
                  <div class="type-opt-title">Categoría principal</div>
                  <div class="type-opt-sub">Aparece por sí sola, al mismo nivel que "Electrónica" o "Drones".</div>
                </div>
              </button>
              <button type="button" class="type-opt" :class="{ 'type-opt--active': isSubcategory }"
                @click="isSubcategory = true">
                <q-icon name="account_tree" size="20px" />
                <div>
                  <div class="type-opt-title">Subcategoría</div>
                  <div class="type-opt-sub">Va dentro de otra categoría que ya existe.</div>
                </div>
              </button>
            </div>

            <q-select v-if="isSubcategory" v-model="newCategoryParentId" :options="topLevelOptions" option-value="id"
              option-label="nombre" emit-value map-options outlined dense class="q-mt-sm"
              label="Dentro de cuál categoría" />
          </div>

          <div class="create-preview" :class="{ 'create-preview--warn': isSubcategory && !newCategoryParentId }">
            <q-icon :name="previewIcon" size="18px" :color="isSubcategory && !newCategoryParentId ? 'orange-8' : 'blue-6'" />
            <div class="create-preview-text">
              <template v-if="isSubcategory && !newCategoryParentId">
                Elige arriba dentro de cuál categoría quieres que vaya.
              </template>
              <template v-else-if="isSubcategory">
                <span class="preview-eyebrow">Así va a quedar</span>
                {{ parentPreviewName }} › <b>{{ newCategoryName.trim() || 'Nombre de la categoría' }}</b>
              </template>
              <template v-else>
                <span class="preview-eyebrow">Así va a quedar</span>
                <b>{{ newCategoryName.trim() || 'Nombre de la categoría' }}</b>
                <span class="preview-note">&nbsp;— como categoría principal</span>
              </template>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="dialog-actions">
          <q-btn flat no-caps label="Cancelar" color="grey-7" v-close-popup :disable="creating" />
          <q-btn unelevated no-caps label="Crear categoría" color="blue-6" class="action-btn" :loading="creating"
            :disable="!canCreate" @click="confirmCreate" />
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
const isSubcategory = ref(false)

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

const canCreate = computed(() => {
  if (!newCategoryName.value.trim()) return false
  if (isSubcategory.value && !newCategoryParentId.value) return false
  return true
})

const previewIcon = computed(() => {
  if (isSubcategory.value) return newCategoryParentId.value ? 'account_tree' : 'help_outline'
  return 'folder'
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
    const guessed = guessParentId()
    newCategoryName.value = opt.nombre
    newCategoryParentId.value = guessed
    isSubcategory.value = !!guessed
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
  if (!canCreate.value) return
  creating.value = true
  try {
    const { data } = await categoriesApi.create({
      nombre,
      parentId: isSubcategory.value ? newCategoryParentId.value : undefined,
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

.create-dialog {
  width: 460px;
  max-width: 92vw;
  border-radius: 18px;
}

.dialog-head {
  padding: 20px 22px 8px;
}

.dialog-title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 17px;
  font-weight: 800;
  color: #0b1220;
  letter-spacing: -.2px;
}

.dialog-sub {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
  margin: 6px 0 0;
  line-height: 1.5;
}

.dialog-body {
  padding: 8px 22px 4px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.step-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  margin-bottom: 8px;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #0071e3;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}

.type-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.type-opt {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  text-align: left;
  padding: 12px 13px;
  border-radius: 12px;
  border: 1.5px solid rgba(11, 18, 32, .12);
  background: #fff;
  color: rgba(11, 18, 32, .5);
  cursor: pointer;
  transition: all 150ms;
  font-family: inherit;
}

.type-opt:hover {
  border-color: rgba(0, 113, 227, .3);
}

.type-opt--active {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .05);
  color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .1);
}

.type-opt-title {
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
}

.type-opt-sub {
  font-size: 10.5px;
  color: rgba(11, 18, 32, .5);
  margin-top: 3px;
  line-height: 1.4;
}

.create-preview {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  background: #f0f6ff;
  border: 1px solid rgba(0, 113, 227, .15);
  border-radius: 12px;
  padding: 12px 14px;
}

.create-preview--warn {
  background: rgba(234, 158, 25, .07);
  border-color: rgba(234, 158, 25, .25);
}

.create-preview-text {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(11, 18, 32, .8);
}

.preview-eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: rgba(11, 18, 32, .4);
  margin-bottom: 3px;
}

.preview-note {
  color: rgba(11, 18, 32, .45);
  font-size: 12px;
}

.dialog-actions {
  padding: 8px 18px 18px;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

@media (max-width: 480px) {
  .type-toggle {
    grid-template-columns: 1fr;
  }
}
</style>
