<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Solicitudes de cotización</h1>
        <p class="page-sub">Clientes que pidieron cotizar un servicio, con los archivos que adjuntaron</p>
      </div>
      <q-chip v-if="pendientesCount" dense color="orange-6" text-color="white" style="font-weight:800">
        {{ pendientesCount }} pendiente{{ pendientesCount === 1 ? '' : 's' }}
      </q-chip>
    </div>

    <div v-if="loading" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else-if="!quotes.length" class="empty-state column items-center q-py-xl">
      <div class="empty-icon q-mb-md">
        <q-icon name="request_quote" size="48px" color="grey-4" />
      </div>
      <p class="empty-title">Aún no tienes solicitudes de cotización</p>
      <p class="empty-sub">Cuando un cliente pida cotizar uno de tus servicios, aparecerá aquí.</p>
    </div>

    <div v-else class="quotes-list">
      <div v-for="q in quotes" :key="q.id" class="quote-card">
        <div class="quote-card-header">
          <div>
            <div class="quote-solicitante">{{ q.solicitante.nombre }}</div>
            <div class="quote-email" v-if="q.solicitante.email">{{ q.solicitante.email }}</div>
          </div>
          <div class="quote-header-right">
            <button class="quote-ref" :title="'Copiar referencia'" @click="copyRef(q.id)">
              # {{ referenceOf(q.id) }}
              <q-icon name="content_copy" size="11px" />
            </button>
            <q-chip dense :color="q.estado === 'atendida' ? 'green-6' : 'orange-6'" text-color="white"
              style="font-size:11px;height:22px;font-weight:800">
              {{ q.estado === 'atendida' ? 'Atendida' : 'Pendiente' }}
            </q-chip>
          </div>
        </div>

        <div class="quote-producto">
          <q-icon name="design_services" size="15px" color="grey-6" />
          quiere cotizar <strong>{{ q.productoNombre }}</strong>
          <a v-if="q.productoSlug" :href="`/tienda/producto/${q.productoSlug}`" target="_blank" rel="noopener"
            class="quote-producto-link">
            Ver producto
            <q-icon name="open_in_new" size="12px" />
          </a>
        </div>

        <p v-if="q.mensaje" class="quote-mensaje">{{ q.mensaje }}</p>

        <div v-if="q.archivos?.length" class="quote-archivos">
          <a v-for="f in q.archivos" :key="f.id" :href="f.url" target="_blank" rel="noopener" class="quote-file-link">
            <q-icon name="attach_file" size="14px" />
            {{ f.nombreOriginal }}
          </a>
        </div>

        <div class="quote-card-footer">
          <span class="quote-fecha">{{ formatDate(q.createdAt) }}</span>
          <q-btn v-if="q.estado !== 'atendida'" flat dense no-caps label="Marcar como atendida"
            color="blue-6" style="font-weight:700;font-size:12.5px" :loading="marcando === q.id"
            @click="onMarcarAtendida(q)" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { quoteRequestsApi } from '../../../api/quoteRequests'

const $q = useQuasar()
const quotes = ref([])
const loading = ref(true)
const marcando = ref(null)

const pendientesCount = computed(() => quotes.value.filter((q) => q.estado !== 'atendida').length)

function referenceOf(id) {
  return id.slice(0, 8).toUpperCase()
}

function copyRef(id) {
  navigator.clipboard?.writeText(`#${referenceOf(id)}`)
  $q.notify({ message: 'Referencia copiada', color: 'blue-6', position: 'top', timeout: 1200 })
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

async function onMarcarAtendida(q) {
  marcando.value = q.id
  try {
    await quoteRequestsApi.marcarAtendida(q.id)
    q.estado = 'atendida'
  } catch {
    $q.notify({ message: 'No se pudo actualizar la solicitud', color: 'red-5', position: 'top' })
  } finally {
    marcando.value = null
  }
}

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await quoteRequestsApi.getForEmpresa()
    quotes.value = data || []
  } catch {
    quotes.value = []
  } finally {
    loading.value = false
  }
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

.empty-state {
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(11, 18, 32, .04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.empty-title {
  font-size: 16px;
  font-weight: 800;
  color: #0b1220;
  margin: 0 0 6px;
}

.empty-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .45);
  margin: 0;
}

.quotes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote-card {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 1px 4px rgba(11, 18, 32, .04);
}

.quote-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.quote-solicitante {
  font-size: 14.5px;
  font-weight: 800;
  color: #0b1220;
}

.quote-email {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
}

.quote-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.quote-ref {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 8px;
  border: 1px dashed rgba(11, 18, 32, .18);
  background: #f7f8fb;
  font-family: "SF Mono", "Cascadia Code", Consolas, monospace;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .3px;
  color: rgba(11, 18, 32, .6);
  cursor: pointer;
}

.quote-ref:hover {
  border-color: #0071e3;
  color: #0071e3;
}

.quote-producto {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(11, 18, 32, .65);
  margin-bottom: 8px;
}

.quote-producto strong {
  color: #0b1220;
}

.quote-producto-link {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 4px;
  font-size: 11.5px;
  font-weight: 800;
  color: #0071e3;
  text-decoration: none;
}

.quote-producto-link:hover {
  text-decoration: underline;
}

.quote-mensaje {
  font-size: 13px;
  color: rgba(11, 18, 32, .68);
  line-height: 1.6;
  background: #f7f8fb;
  border-radius: 10px;
  padding: 10px 12px;
  margin: 0 0 10px;
  white-space: pre-line;
}

.quote-archivos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.quote-file-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #eef4ff;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #0071e3;
  text-decoration: none;
  max-width: 220px;
}

.quote-file-link:hover {
  background: #dbeafe;
}

.quote-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid rgba(11, 18, 32, .06);
}

.quote-fecha {
  font-size: 11.5px;
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
}
</style>
