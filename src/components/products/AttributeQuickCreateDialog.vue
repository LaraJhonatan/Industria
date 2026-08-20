<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width:400px;border-radius:16px">
      <q-card-section>
        <div class="text-h6 text-weight-bold">Nuevo atributo</div>
        <p class="text-caption text-grey-6 q-mb-none">
          Se agrega a esta categoría y queda disponible de inmediato para este producto.
        </p>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-input v-model="nombre" outlined dense label="Nombre del atributo" autofocus
          placeholder="Ej: Voltaje nominal" />
        <q-select v-model="tipo" :options="tipoOptions" option-value="value" option-label="label" emit-value
          map-options outlined dense label="Tipo" />
        <q-input v-if="tipo === 'number' || tipo === 'unit'" v-model="unidad" outlined dense
          label="Unidad (opcional)" placeholder="Ej: V, kg, mm" />
        <q-input v-if="tipo === 'select'" v-model="opcionesTexto" outlined dense label="Opciones (separadas por coma)"
          placeholder="Ej: Rojo, Verde, Azul" />
        <q-toggle v-model="requerido" color="blue-6" label="Obligatorio" />
      </q-card-section>
      <q-card-actions align="right" class="q-px-md q-pb-md">
        <q-btn flat label="Cancelar" v-close-popup :disable="creating" @click="reset" />
        <q-btn unelevated label="Agregar atributo" color="blue-6" class="action-btn" :loading="creating"
          :disable="!nombre.trim()" @click="confirmCreate" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { categoriesApi } from '../../api/categories'
import { normalizeText } from '../../utils/textMatch'

const props = defineProps({
  categoryId: { type: String, required: true },
})
const emit = defineEmits(['created'])

const $q = useQuasar()

const open = ref(false)
const creating = ref(false)
const nombre = ref('')
const tipo = ref('text')
const unidad = ref('')
const opcionesTexto = ref('')
const requerido = ref(false)

const tipoOptions = [
  { value: 'text', label: 'Texto' },
  { value: 'textarea', label: 'Texto largo' },
  { value: 'number', label: 'Número' },
  { value: 'boolean', label: 'Sí / No' },
  { value: 'date', label: 'Fecha' },
  { value: 'select', label: 'Lista de opciones' },
]

function reset() {
  nombre.value = ''
  tipo.value = 'text'
  unidad.value = ''
  opcionesTexto.value = ''
  requerido.value = false
}

function show() {
  reset()
  open.value = true
}

defineExpose({ show })

async function confirmCreate() {
  const nombreVal = nombre.value.trim()
  if (!nombreVal) return
  creating.value = true
  try {
    const clave = normalizeText(nombreVal).replace(/\s+/g, '_')
    const { data: atributo } = await categoriesApi.createAtributo({
      categoryId: props.categoryId,
      nombre: nombreVal,
      clave,
      tipo: tipo.value,
      unidad: unidad.value.trim() || undefined,
      requerido: requerido.value,
    })

    if (tipo.value === 'select' && opcionesTexto.value.trim()) {
      const opciones = opcionesTexto.value.split(',').map((s) => s.trim()).filter(Boolean)
      for (const label of opciones) {
        await categoriesApi.createOpcion({ atributoId: atributo.id, label, valor: label })
      }
    }

    open.value = false
    $q.notify({ type: 'positive', message: `Atributo "${atributo.nombre}" agregado`, position: 'top-right' })
    emit('created', atributo)
  } catch (e) {
    const msg = e.response?.data?.message
    $q.notify({
      type: 'negative',
      message: Array.isArray(msg) ? msg[0] : (msg || 'No se pudo agregar el atributo'),
      position: 'top-right',
    })
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}
</style>
