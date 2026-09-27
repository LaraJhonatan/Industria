<template>
  <section v-if="cargando || cotizaciones.length || !compacto" class="mc" :class="{ 'mc--compacto': compacto }">
    <header class="mc-head">
      <div>
        <h2>{{ compacto ? 'Tus cotizaciones' : 'Mis cotizaciones de transporte' }}</h2>
        <p>Vuelve a ver tus cotizaciones y paga por PSE las que tengas pendientes.</p>
      </div>
      <div class="mc-head-actions">
        <q-btn flat no-caps dense color="primary" icon="search" label="Buscar por número" @click="abrirBuscar" />
        <q-btn v-if="compacto && cotizaciones.length > limite" flat no-caps dense color="primary"
          :label="`Ver todas (${cotizaciones.length})`" icon-right="chevron_right"
          to="/tienda/logistica/mis-cotizaciones" />
      </div>
    </header>

    <div v-if="cargando" class="mc-cargando">
      <q-spinner-dots color="primary" size="30px" />
    </div>

    <div v-else-if="!cotizaciones.length" class="mc-vacio">
      <q-icon name="receipt_long" size="36px" />
      <p><strong>Aún no hay cotizaciones en este dispositivo.</strong></p>
      <p>Si cotizaste desde otro equipo, búscala con el número (ej. COT-000012) y el correo que usaste, o abre el
        enlace que te llegó al correo.</p>
      <div class="mc-vacio-acciones">
        <q-btn unelevated no-caps color="primary" icon="search" label="Buscar mi cotización" @click="abrirBuscar" />
        <q-btn outline no-caps color="primary" label="Hacer una cotización" to="/tienda/logistica" />
      </div>
    </div>

    <ul v-else class="mc-lista">
      <li v-for="c in visibles" :key="c.token" class="mc-item">
        <div class="mc-item-main">
          <div class="mc-item-top">
            <strong>{{ c.numero }}</strong>
            <span class="mc-chip" :class="`mc-chip--${estado(c).clase}`">{{ estado(c).label }}</span>
          </div>
          <div class="mc-ruta">{{ c.origen }} → {{ c.destino }} · {{ c.vehiculo }}</div>
          <div class="mc-meta">{{ c.producto }} · {{ formatFecha(c.createdAt) }}</div>
        </div>
        <div class="mc-item-side">
          <strong class="mc-total">{{ formatMoney(c.total) }}</strong>
          <q-btn unelevated no-caps :color="estado(c).pagar ? 'primary' : 'grey-3'"
            :text-color="estado(c).pagar ? 'white' : 'grey-9'" :icon="estado(c).pagar ? 'account_balance' : 'visibility'"
            :label="estado(c).pagar ? 'Ver y pagar' : 'Ver'" class="mc-btn"
            :to="`/tienda/logistica/cotizacion/${c.token}`" />
        </div>
      </li>
    </ul>

    <q-dialog v-model="dlgBuscar.abierto">
      <q-card class="mc-dialog">
        <q-card-section class="mc-dialog-head">
          <strong>Buscar mi cotización</strong>
          <q-btn flat round dense icon="close" v-close-popup aria-label="Cerrar" />
        </q-card-section>
        <q-card-section class="mc-dialog-body">
          <p>Escribe el número de la cotización y el correo con el que la generaste.</p>
          <q-input v-model="dlgBuscar.numero" outlined dense label="Número (ej. COT-000012)" maxlength="20"
            autofocus />
          <q-input v-model="dlgBuscar.email" outlined dense type="email" label="Correo" maxlength="200"
            @keyup.enter="buscar" />
          <div v-if="dlgBuscar.error" class="mc-error">
            <q-icon :name="dlgBuscar.requiereSesion ? 'lock' : 'error_outline'" size="18px" /> {{ dlgBuscar.error }}
          </div>
          <q-btn v-if="dlgBuscar.requiereSesion" unelevated no-caps color="primary" icon="login"
            label="Iniciar sesión" @click="irALogin" />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps color="grey-8" label="Cancelar" v-close-popup />
          <q-btn unelevated no-caps color="primary" label="Buscar" :loading="dlgBuscar.buscando" @click="buscar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logisticaApi } from '../../api/logistica'
import { tokensGuardados, guardarCotizacion, olvidarCotizacion } from '../../utils/cotizacionesGuardadas'

const props = defineProps({
  /** Modo resumido para el cotizador: muestra pocas y se oculta si no hay ninguna. */
  compacto: { type: Boolean, default: false },
  limite: { type: Number, default: 3 },
})

const router = useRouter()
const cargando = ref(true)
const cotizaciones = ref([])

const visibles = computed(() => (props.compacto ? cotizaciones.value.slice(0, props.limite) : cotizaciones.value))

function haySesion() {
  try {
    return !!JSON.parse(localStorage.getItem('ZIFCOR_sesion') || 'null')?.accessToken
  } catch {
    return false
  }
}

async function cargar() {
  cargando.value = true
  const tokens = tokensGuardados()
  const [locales, deCuenta] = await Promise.all([
    tokens.length ? logisticaApi.resumenCotizaciones(tokens).then((r) => r.data).catch(() => null) : [],
    haySesion() ? logisticaApi.misCotizaciones().then((r) => r.data).catch(() => []) : [],
  ])

  // Tokens que el API ya no reconoce (cotización eliminada) se olvidan.
  if (Array.isArray(locales)) {
    const vivos = new Set(locales.map((c) => c.token))
    tokens.filter((t) => !vivos.has(t)).forEach(olvidarCotizacion)
  }

  const porToken = new Map()
  for (const c of [...(deCuenta || []), ...(locales || [])]) porToken.set(c.token, c)
  cotizaciones.value = [...porToken.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  cargando.value = false
}

function estado(c) {
  if (c.estadoPago === 'approved') return { label: 'Pagada', clase: 'ok', pagar: false }
  if (c.vencida) return { label: 'Vencida', clase: 'off', pagar: false }
  if (['declined', 'voided', 'error'].includes(c.estadoPago)) return { label: 'Pago no completado', clase: 'bad', pagar: true }
  return { label: 'Pendiente de pago', clase: 'pend', pagar: true }
}

// ── Buscar por número y correo ──

const dlgBuscar = reactive({ abierto: false, numero: '', email: '', error: '', requiereSesion: false, buscando: false })

function abrirBuscar() {
  dlgBuscar.error = ''
  dlgBuscar.requiereSesion = false
  dlgBuscar.abierto = true
}

function irALogin() {
  dlgBuscar.abierto = false
  router.push({ path: '/auth', query: { volver: router.currentRoute.value.fullPath } })
}

async function buscar() {
  if (!dlgBuscar.numero.trim() || !dlgBuscar.email.trim()) {
    dlgBuscar.error = 'Escribe el número y el correo.'
    return
  }
  dlgBuscar.buscando = true
  dlgBuscar.error = ''
  dlgBuscar.requiereSesion = false
  try {
    const { data } = await logisticaApi.buscarCotizacion(dlgBuscar.numero.trim(), dlgBuscar.email.trim())
    guardarCotizacion(data.token)
    dlgBuscar.abierto = false
    router.push(`/tienda/logistica/cotizacion/${data.token}`)
  } catch (e) {
    const m = e?.response?.data?.message
    dlgBuscar.error = Array.isArray(m) ? m.join(' ') : m || 'No se pudo buscar. Intenta de nuevo.'
    // La cotización es de una cuenta: solo esa cuenta puede abrirla.
    dlgBuscar.requiereSesion = e?.response?.status === 403
  } finally {
    dlgBuscar.buscando = false
  }
}

function formatMoney(n) {
  return `$ ${Number(n || 0).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
}

function formatFecha(v) {
  return new Date(v).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(cargar)
</script>

<style scoped>
.mc {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 1px 3px rgba(11, 18, 32, .04);
}

.mc-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.mc-head h2 {
  margin: 0;
  font-size: 16.5px;
  font-weight: 800;
  color: #0b1220;
}

.mc-head p {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
}

.mc-head-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-end;
}

.mc-cargando {
  display: grid;
  place-items: center;
  padding: 16px 0;
}

.mc-vacio {
  text-align: center;
  padding: 18px 12px;
  color: rgba(11, 18, 32, .55);
  font-size: 13px;
}

.mc-vacio p {
  margin: 4px auto;
  max-width: 460px;
}

.mc-vacio-acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.mc-lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  background: #fbfcfe;
}

.mc-item-main {
  min-width: 0;
}

.mc-item-top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mc-item-top strong {
  font-size: 14px;
  color: #0b1220;
}

.mc-ruta {
  margin-top: 2px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.mc-meta {
  font-size: 12px;
  color: rgba(11, 18, 32, .5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mc-item-side {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.mc-total {
  font-size: 16px;
  font-weight: 900;
  color: #0071e3;
  white-space: nowrap;
}

.mc-btn {
  border-radius: 10px;
  font-weight: 700;
}

.mc-chip {
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}

.mc-chip--pend {
  background: #fff7ed;
  color: #c2410c;
}

.mc-chip--ok {
  background: #dcfce7;
  color: #15803d;
}

.mc-chip--bad {
  background: #fef2f2;
  color: #b91c1c;
}

.mc-chip--off {
  background: #f1f5f9;
  color: #64748b;
}

.mc-dialog {
  width: 440px;
  max-width: 94vw;
  border-radius: 16px;
}

.mc-dialog-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.mc-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mc-dialog-body p {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 18, 32, .6);
}

.mc-error {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
}

@media (max-width: 640px) {
  .mc {
    padding: 16px;
  }

  .mc-head {
    flex-direction: column;
  }

  .mc-item {
    flex-direction: column;
    align-items: stretch;
  }

  .mc-item-side {
    justify-content: space-between;
  }
}
</style>
