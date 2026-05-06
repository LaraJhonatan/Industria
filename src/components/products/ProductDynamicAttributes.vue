<template>
  <div class="dynamic-attrs">
    <div v-if="!atributos.length" class="text-caption text-grey-5 q-py-md text-center">
      No hay atributos definidos para esta categoría
    </div>

    <div class="attrs-grid">
      <div v-for="attr in atributos" :key="attr.id" class="attr-field">
        <label class="attr-label">
          {{ attr.nombre }}
          <span v-if="attr.requerido" class="req">*</span>
          <span v-if="attr.unidad" class="unit">({{ attr.unidad }})</span>
        </label>

        <!-- text -->
        <q-input v-if="attr.tipo === 'text'" v-model="localValues[attr.clave]" outlined dense :placeholder="attr.nombre"
          :rules="attr.requerido ? [required] : []" @update:model-value="emit('update:values', localValues)" />

        <!-- textarea -->
        <q-input v-else-if="attr.tipo === 'textarea'" v-model="localValues[attr.clave]" outlined dense type="textarea"
          autogrow :placeholder="attr.nombre" :rules="attr.requerido ? [required] : []"
          @update:model-value="emit('update:values', localValues)" />

        <!-- number / unit -->
        <q-input v-else-if="attr.tipo === 'number' || attr.tipo === 'unit'" v-model.number="localValues[attr.clave]"
          outlined dense type="number" :placeholder="attr.nombre" :suffix="attr.unidad || ''"
          :rules="attr.requerido ? [required] : []" @update:model-value="emit('update:values', localValues)" />

        <!-- boolean -->
        <q-toggle v-else-if="attr.tipo === 'boolean'" v-model="localValues[attr.clave]" color="blue-6"
          @update:model-value="emit('update:values', localValues)" />

        <!-- select -->
        <q-select v-else-if="attr.tipo === 'select'" v-model="localValues[attr.clave]" :options="attr.opciones || []"
          option-value="valor" option-label="label" emit-value map-options outlined dense :placeholder="attr.nombre"
          :rules="attr.requerido ? [required] : []" @update:model-value="emit('update:values', localValues)" />

        <!-- multiselect -->
        <q-select v-else-if="attr.tipo === 'multiselect'" v-model="localValues[attr.clave]"
          :options="attr.opciones || []" option-value="valor" option-label="label" emit-value map-options multiple
          use-chips outlined dense :placeholder="attr.nombre"
          @update:model-value="emit('update:values', localValues)" />

        <!-- date -->
        <q-input v-else-if="attr.tipo === 'date'" v-model="localValues[attr.clave]" outlined dense type="date"
          :rules="attr.requerido ? [required] : []" @update:model-value="emit('update:values', localValues)" />

        <!-- json -->
        <q-input v-else-if="attr.tipo === 'json'" v-model="localValues[attr.clave]" outlined dense type="textarea"
          autogrow placeholder='{"clave": "valor"}' :rules="attr.requerido ? [required, validJson] : [validJson]"
          @update:model-value="emit('update:values', localValues)" />

        <!-- fallback -->
        <q-input v-else v-model="localValues[attr.clave]" outlined dense :placeholder="attr.nombre"
          @update:model-value="emit('update:values', localValues)" />

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  atributos: { type: Array, default: () => [] },
  values: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:values'])

const localValues = ref({ ...props.values })

watch(() => props.values, (v) => {
  localValues.value = { ...v }
}, { deep: true })

watch(() => props.atributos, (attrs) => {
  attrs.forEach(a => {
    if (localValues.value[a.clave] === undefined) {
      localValues.value[a.clave] = a.tipo === 'boolean' ? false : a.tipo === 'multiselect' ? [] : ''
    }
  })
}, { immediate: true })

const required = v => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'
const validJson = v => {
  if (!v) return true
  try { JSON.parse(v); return true } catch { return 'JSON inválido' }
}
</script>

<style scoped>
.attrs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.attr-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.attr-label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
}

.req {
  color: #dc2626;
  margin-left: 2px;
}

.unit {
  font-size: 11px;
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
  margin-left: 4px;
}

@media (max-width: 600px) {
  .attrs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
