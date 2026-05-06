<template>
  <div class="variants-editor">

    <div v-if="!variants.length" class="empty-variants column items-center q-py-lg">
      <q-icon name="layers" size="36px" color="grey-4" />
      <p class="empty-text q-mt-sm">No hay variantes aún</p>
      <q-btn unelevated label="Agregar variante" icon="add" color="blue-6" class="action-btn q-mt-sm"
        @click="addVariant" />
    </div>

    <div v-else>
      <div v-for="(variant, i) in variants" :key="i" class="variant-card q-mb-md">
        <div class="variant-header row items-center justify-between q-mb-md">
          <span class="variant-title">Variante {{ i + 1 }}</span>
          <q-btn flat round dense icon="close" color="grey-5" size="sm" @click="removeVariant(i)" />
        </div>

        <div class="variant-grid">
          <q-input :model-value="variant.sku" outlined dense label="SKU" placeholder="SKU variante"
            @update:model-value="(val) => { variant.sku = val; emitUpdate() }" />
          <q-input :model-value="variant.precio" outlined dense label="Precio" type="number" prefix="$"
            @update:model-value="(val) => { variant.precio = val; emitUpdate() }" />
          <q-input :model-value="variant.stock" outlined dense label="Stock" type="number"
            @update:model-value="(val) => { variant.stock = val; emitUpdate() }" />
        </div>

        <div v-if="atributosVariante.length" class="q-mt-md">
          <div class="section-label q-mb-sm">Atributos de variante</div>
          <div class="variant-attrs-grid">
            <div v-for="attr in atributosVariante" :key="attr.id" class="attr-field">
              <label class="attr-label">{{ attr.nombre }}</label>

              <q-select v-if="attr.tipo === 'select'" :model-value="variant.atributos[attr.clave]"
                :options="attr.opciones || []" option-value="valor" option-label="label" emit-value map-options outlined
                dense clearable @update:model-value="(val) => onAtributoChange(i, attr.clave, val)" />

              <q-select v-else-if="attr.tipo === 'multiselect'" :model-value="variant.atributos[attr.clave]"
                :options="attr.opciones || []" option-value="valor" option-label="label" emit-value map-options multiple
                use-chips outlined dense @update:model-value="(val) => onAtributoChange(i, attr.clave, val)" />

              <q-input v-else :model-value="variant.atributos[attr.clave]" outlined dense :placeholder="attr.nombre"
                @update:model-value="(val) => onAtributoChange(i, attr.clave, val)" />
            </div>
          </div>
        </div>
      </div>

      <q-btn flat label="Agregar otra variante" icon="add" color="blue-6"
        style="font-weight:700;text-transform:none;letter-spacing:0" @click="addVariant" />
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  atributosVariante: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

function buildVariant(v) {
  const atributos = {}
  props.atributosVariante.forEach(a => { atributos[a.clave] = '' })
  if (v.atributos) {
    v.atributos.forEach(a => {
      const clave = a.atributo?.clave || props.atributosVariante.find(x => x.id === a.atributoId)?.clave
      if (clave) atributos[clave] = a.valor
    })
  }
  return {
    sku: v.sku || '',
    precio: v.precio || null,
    stock: v.stock || 0,
    atributos,
  }
}

const variants = ref(props.modelValue.map(buildVariant))

watch(() => props.atributosVariante, (attrs) => {
  variants.value.forEach(v => {
    attrs.forEach(a => {
      if (v.atributos[a.clave] === undefined) {
        v.atributos[a.clave] = ''
      }
    })
  })
}, { immediate: true })

function onAtributoChange(variantIdx, clave, val) {
  const v = variants.value[variantIdx]
  variants.value[variantIdx] = {
    ...v,
    atributos: {
      ...v.atributos,
      [clave]: val,
    },
  }
  emitUpdate()
}

function addVariant() {
  const atributos = {}
  props.atributosVariante.forEach(a => { atributos[a.clave] = '' })
  variants.value = [...variants.value, { sku: '', precio: null, stock: 0, atributos }]
  emitUpdate()
}

function removeVariant(idx) {
  variants.value = variants.value.filter((_, i) => i !== idx)
  emitUpdate()
}

function emitUpdate() {
  emit('update:modelValue', variants.value.map(v => ({
    sku: v.sku,
    precio: v.precio,
    stock: v.stock,
    atributos: Object.entries(v.atributos)
      .map(([clave, valor]) => {
        const attr = props.atributosVariante.find(a => a.clave === clave)
        return attr ? { atributoId: attr.id, valor: String(valor ?? '') } : null
      })
      .filter(Boolean),
  })))
}
</script>

<style scoped>
.variant-card {
  background: #f7f8fb;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  padding: 16px;
}

.variant-header {
  border-bottom: 1px solid rgba(11, 18, 32, .07);
  padding-bottom: 10px;
}

.variant-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #0b1220;
}

.variant-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.variant-attrs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.section-label {
  font-size: 11.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, .4);
  text-transform: uppercase;
  letter-spacing: .6px;
}

.attr-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.attr-label {
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
}

.empty-variants {
  text-align: center;
}

.empty-text {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .45);
  margin: 0;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 38px;
  padding: 0 16px;
}

@media (max-width: 600px) {
  .variant-grid {
    grid-template-columns: 1fr;
  }

  .variant-attrs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
