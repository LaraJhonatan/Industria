<template>
  <div class="lc-page">
    <div v-if="cargando" class="lc-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="bloqueo" class="lc-center">
      <div class="lc-error">
        <q-icon name="lock" size="34px" color="primary" />
        <h2>Esta cotización es privada</h2>
        <p>{{ bloqueo.message }}</p>
        <div class="lc-error-actions">
          <q-btn unelevated no-caps color="primary" icon="login"
            :label="bloqueo.code === 'OTRA_CUENTA' ? 'Entrar con otra cuenta' : 'Iniciar sesión'"
            @click="irALogin" />
          <q-btn outline no-caps color="primary" label="Hacer una nueva cotización" to="/tienda/logistica" />
        </div>
      </div>
    </div>

    <div v-else-if="error" class="lc-center">
      <div class="lc-error">
        <q-icon name="search_off" size="34px" />
        <h2>No encontramos esta cotización</h2>
        <p>{{ error }}</p>
        <q-btn unelevated no-caps color="primary" label="Hacer una nueva cotización" to="/tienda/logistica" />
      </div>
    </div>

    <div v-else-if="cot" class="lc-wrap">
      <!-- Estado -->
      <div class="lc-status" :class="`lc-status--${estadoUi.clase}`">
        <q-icon :name="estadoUi.icono" size="30px" />
        <div class="lc-status-text">
          <strong>{{ estadoUi.titulo }}</strong>
          <span>{{ estadoUi.texto }}</span>
        </div>
        <div class="lc-status-actions">
          <q-btn v-if="puedePagar" unelevated no-caps color="primary" icon="account_balance" label="Pagar con PSE"
            :loading="pagando" class="lc-btn-pay" @click="pagar" />
          <q-btn v-if="verificando" flat no-caps color="primary" label="Verificando pago..." loading disable />
        </div>
      </div>
      <p v-if="cot.esDueno === false" class="lc-admin-note">
        <q-icon name="admin_panel_settings" size="16px" />
        Estás viendo esta cotización como empresa administradora de logística. Solo la cuenta del cliente puede
        pagarla.
      </p>

      <div class="lc-grid">
        <!-- Documento -->
        <article class="lc-doc">
          <header class="lc-doc-head">
            <img src="/IconoZ.png" alt="ZIFCOR" class="lc-logo" />
            <div class="lc-doc-num">
              <span>{{ cot.pago.estado === 'approved' ? 'Comprobante de compra' : 'Cotización' }}</span>
              <strong>{{ cot.numero }}</strong>
              <small>{{ formatFecha(cot.createdAt) }}</small>
            </div>
          </header>

          <div class="lc-parties">
            <div>
              <h3>Vendedor</h3>
              <p><strong>ZIFCOR S.A.S</strong></p>
              <p>NIT 902067173</p>
            </div>
            <div>
              <h3>Cliente</h3>
              <p><strong>{{ cot.comprador.nombre }}</strong></p>
              <p>{{ cot.comprador.tipoDocumento }} {{ cot.comprador.documento }}</p>
              <p>{{ cot.comprador.direccion }}, {{ cot.comprador.ciudad }}</p>
              <p>{{ cot.comprador.email }} · {{ cot.comprador.telefono }}</p>
            </div>
          </div>

          <section class="lc-section">
            <h3>Detalle del transporte</h3>
            <div class="lc-route">
              <div class="lc-route-point">
                <q-icon name="trip_origin" color="primary" />
                <div>
                  <span>Origen</span>
                  <strong>{{ cot.origen }}</strong>
                  <small v-if="cot.puntoRecogida">{{ cot.puntoRecogida }}</small>
                </div>
              </div>
              <div class="lc-route-line" />
              <div class="lc-route-point">
                <q-icon name="place" color="primary" />
                <div>
                  <span>Destino</span>
                  <strong>{{ cot.destino }}</strong>
                  <small v-if="cot.puntoEntrega">{{ cot.puntoEntrega }}</small>
                </div>
              </div>
            </div>

            <dl class="lc-dl">
              <div><dt>Vehículo</dt><dd>{{ cot.vehiculo.nombre }} ({{ cot.vehiculo.codigo }})</dd></div>
              <div><dt>Mercancía</dt><dd>{{ cot.producto }}<template v-if="cot.tipoMercancia"> · {{ cot.tipoMercancia }}</template></dd></div>
              <div><dt>Peso total</dt><dd>{{ formatPeso(cot.pesoKg) }}</dd></div>
              <div><dt>Medidas por unidad</dt><dd>{{ formatNum(cot.largoM) }} × {{ formatNum(cot.anchoM) }} × {{ formatNum(cot.altoM) }} m</dd></div>
              <div><dt>Cantidad</dt><dd>{{ cot.cantidad }} unidad(es)</dd></div>
              <div><dt>Volumen total</dt><dd>{{ formatNum(cot.volumenM3) }} m³</dd></div>
              <div v-if="cot.fechaServicio"><dt>Fecha del servicio</dt><dd>{{ fechaLarga(cot.fechaServicio) }}</dd></div>
              <div v-if="cot.valorMercancia != null"><dt>Valor de la mercancía</dt><dd>{{ formatMoney(cot.valorMercancia) }}</dd></div>
            </dl>
            <p v-if="cot.descripcion" class="lc-text"><strong>Descripción:</strong> {{ cot.descripcion }}</p>
            <p v-if="cot.comentarios" class="lc-text"><strong>Comentarios:</strong> {{ cot.comentarios }}</p>
          </section>

          <table class="lc-table">
            <thead>
              <tr>
                <th>Concepto</th>
                <th class="num">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transporte {{ cot.origen }} → {{ cot.destino }} · {{ cot.vehiculo.nombre }}</td>
                <td class="num">{{ formatMoney(cot.valorTransporte) }}</td>
              </tr>
              <tr v-for="s in cot.servicios" :key="s.id">
                <td>{{ s.nombre }}</td>
                <td class="num">{{ formatMoney(s.precio) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total {{ cot.pago.estado === 'approved' ? 'pagado' : 'a pagar' }}</td>
                <td class="num">{{ formatMoney(cot.total) }} {{ cot.moneda }}</td>
              </tr>
            </tfoot>
          </table>

          <ul class="lc-avisos">
            <li><q-icon name="info_outline" size="16px" /> {{ AVISO_CAMBIOS }}</li>
            <li><q-icon name="shield" size="16px" /> {{ AVISO_SEGURO }}</li>
          </ul>

          <p class="lc-legal">
            <template v-if="cot.pago.estado !== 'approved'">
              Cotización válida hasta el {{ formatFecha(cot.vigenteHasta, false) }}.
            </template>
            Este documento no es una factura electrónica de venta ante la DIAN.
          </p>
        </article>

        <!-- Acciones -->
        <aside class="lc-side">
          <div class="lc-card">
            <span class="lc-card-label">{{ cot.pago.estado === 'approved' ? 'Total pagado' : 'Total a pagar' }}</span>
            <strong class="lc-card-total">{{ formatMoney(cot.total) }}</strong>
            <q-btn v-if="puedePagar" unelevated no-caps color="primary" icon="account_balance"
              label="Pagar con PSE" class="full-width lc-btn-big" :loading="pagando" @click="pagar" />
            <q-btn outline no-caps color="primary" icon="picture_as_pdf" label="Descargar PDF"
              class="full-width q-mt-sm" :loading="descargandoPdf" @click="descargarPdf" />
            <q-btn flat no-caps color="grey-8" icon="add" label="Nueva cotización" class="full-width q-mt-xs"
              to="/tienda/logistica" />
            <q-btn flat no-caps color="grey-8" icon="receipt_long" label="Mis cotizaciones" class="full-width"
              to="/tienda/logistica/mis-cotizaciones" />
          </div>
          <div class="lc-card lc-help">
            <q-icon name="support_agent" size="22px" color="primary" />
            <div>
              <strong>¿Tienes dudas?</strong>
              <p>Escríbenos con tu número de cotización y te ayudamos.</p>
              <a :href="whatsappUrl" target="_blank" rel="noopener">Hablar por WhatsApp</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { logisticaApi } from '../../api/logistica'
import { abrirWompi } from '../../utils/wompi'
import { guardarCotizacion } from '../../utils/cotizacionesGuardadas'
import { AVISO_CAMBIOS, AVISO_SEGURO } from '../../utils/logisticaAvisos'

const WHATSAPP = '573114799224'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

const token = route.params.token
const cot = ref(null)
const cargando = ref(true)
const error = ref('')
const pagando = ref(false)
const verificando = ref(false)
let reintentos = null

/** 403 del API: la cotización pertenece a una cuenta y la sesión actual no es esa (o no hay sesión). */
const bloqueo = ref(null)
const descargandoPdf = ref(false)

// Solo el dueño paga; una empresa editora puede verla desde su panel, pero no pagarla.
const puedePagar = computed(
  () =>
    cot.value &&
    cot.value.esDueno !== false &&
    ['pending', 'declined', 'voided', 'error'].includes(cot.value.pago.estado) &&
    !cot.value.vencida,
)

function irALogin() {
  router.push({ path: '/auth', query: { volver: route.fullPath } })
}

async function descargarPdf() {
  if (descargandoPdf.value) return
  descargandoPdf.value = true
  try {
    await logisticaApi.abrirPdf(token)
  } catch (e) {
    $q.notify({ message: e?.response?.data?.message || 'No se pudo abrir el PDF.', color: 'red-5', position: 'top' })
  } finally {
    descargandoPdf.value = false
  }
}

const estadoUi = computed(() => {
  const c = cot.value
  if (!c) return {}
  switch (c.pago.estado) {
    case 'approved':
      return {
        clase: 'ok', icono: 'check_circle', titulo: '¡Pago recibido!',
        texto: `Tu transporte quedó confirmado${c.pago.metodo ? ` (pagado con ${c.pago.metodo})` : ''}. Te contactaremos para coordinar la recogida.`,
      }
    case 'declined':
    case 'voided':
    case 'error':
      return {
        clase: 'bad', icono: 'error', titulo: 'El pago no se completó',
        texto: c.vencida ? 'La cotización ya venció. Genera una nueva para ver el precio actualizado.' : 'Puedes intentarlo de nuevo con PSE u otro medio.',
      }
    default:
      return c.vencida
        ? { clase: 'bad', icono: 'event_busy', titulo: 'Cotización vencida', texto: 'Genera una nueva para ver el precio actualizado.' }
        : {
            clase: 'pending', icono: 'schedule', titulo: 'Cotización generada — pendiente de pago',
            texto: `Paga en línea por PSE para confirmar tu transporte. Válida hasta el ${formatFecha(c.vigenteHasta, false)}.`,
          }
  }
})

const whatsappUrl = computed(() => {
  const texto = `Hola ZIFCOR, tengo una consulta sobre la cotización de transporte ${cot.value?.numero || ''}.`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`
})

async function cargar() {
  try {
    const { data } = await logisticaApi.getCotizacion(token)
    cot.value = data
    // Si se abrió desde el correo u otro enlace, este navegador también la recuerda (solo si es del cliente).
    if (data.esDueno !== false) guardarCotizacion(token)
  } catch (e) {
    if (e?.response?.status === 403) {
      bloqueo.value = {
        code: e.response.data?.code,
        message: e.response.data?.message || 'Inicia sesión con la cuenta que generó esta cotización.',
      }
      return
    }
    error.value = e?.response?.status === 404 || e?.response?.status === 400
      ? 'Revisa que el enlace esté completo.'
      : 'No pudimos cargar la cotización. Intenta de nuevo.'
  }
}

/** Consulta el estado real en Wompi; si sigue pendiente (común en PSE) reintenta unas veces. */
async function verificar(transactionId, intento = 0) {
  verificando.value = true
  try {
    const { data } = await logisticaApi.verificarPago(token, transactionId)
    cot.value = data
    if (data.pago.estado === 'pending' && intento < 6) {
      reintentos = setTimeout(() => verificar(transactionId, intento + 1), 5000)
      return
    }
  } catch (e) {
    const m = e?.response?.data?.message
    $q.notify({ message: m || 'No pudimos confirmar el estado del pago.', color: 'orange-8', position: 'top' })
  }
  verificando.value = false
}

async function pagar() {
  if (pagando.value) return
  pagando.value = true
  try {
    const { data } = await logisticaApi.iniciarPago(token)
    if (!data.publicKey) {
      $q.notify({ message: 'La pasarela de pago aún no está configurada.', color: 'orange-8', position: 'top' })
      return
    }
    const tx = await abrirWompi(data)
    if (tx?.id) await verificar(tx.id)
  } catch (e) {
    const m = e?.response?.data?.message || e?.message
    $q.notify({ message: m || 'No se pudo iniciar el pago. Intenta de nuevo.', color: 'red-5', position: 'top' })
    await cargar()
  } finally {
    pagando.value = false
  }
}

function formatNum(n) {
  return Number(n).toLocaleString('es-CO', { maximumFractionDigits: 2 })
}

function formatPeso(kg) {
  return kg >= 1000 ? `${formatNum(kg / 1000)} t` : `${formatNum(kg)} kg`
}

function formatMoney(n) {
  return `$ ${Number(n || 0).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
}

/** '2026-10-15' → 'jueves, 15 de octubre de 2026' sin corrimiento de zona horaria. */
function fechaLarga(fecha) {
  const [y, m, d] = fecha.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatFecha(v, conHora = true) {
  return new Date(v).toLocaleString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric',
    ...(conHora ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}

onMounted(async () => {
  await cargar()
  cargando.value = false
  if (!cot.value) return

  // Wompi redirige con ?id=<transacción> al terminar (p. ej. al volver del banco en PSE).
  // El pago nunca se abre solo: el cliente revisa la cotización y decide cuándo pagar.
  const txId = route.query.id
  if (txId) {
    router.replace({ query: {} })
    await verificar(String(txId))
  }
})

onBeforeUnmount(() => clearTimeout(reintentos))
</script>

<style scoped>
.lc-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 28px 0 56px;
}

.lc-center {
  display: grid;
  place-items: center;
  padding: 80px 16px;
}

.lc-error {
  max-width: 420px;
  text-align: center;
  color: rgba(11, 18, 32, .55);
}

.lc-error-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}

.lc-admin-note {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: -8px 0 16px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #475569;
  font-size: 12.5px;
}

.lc-error h2 {
  margin: 10px 0 6px;
  font-size: 20px;
  color: #0b1220;
}

.lc-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
}

.lc-status {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 14px;
  margin-bottom: 20px;
  border: 1px solid;
}

.lc-status--pending {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.lc-status--ok {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #15803d;
}

.lc-status--bad {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #c2410c;
}

.lc-status-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lc-status-text strong {
  font-size: 16px;
}

.lc-status-text span {
  font-size: 13px;
  color: rgba(11, 18, 32, .65);
}

.lc-btn-pay {
  border-radius: 10px;
  font-weight: 800;
}

.lc-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 20px;
  align-items: start;
}

.lc-doc {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 28px 32px;
  box-shadow: 0 2px 10px rgba(11, 18, 32, .04);
}

.lc-doc-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 2px solid #0071e3;
}

.lc-logo {
  height: 40px;
}

.lc-doc-num {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.lc-doc-num span {
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, .45);
  text-transform: uppercase;
  letter-spacing: .6px;
}

.lc-doc-num strong {
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
}

.lc-doc-num small {
  font-size: 12px;
  color: rgba(11, 18, 32, .5);
}

.lc-parties {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.lc-parties h3,
.lc-section h3 {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 800;
  color: #0071e3;
  text-transform: uppercase;
  letter-spacing: .6px;
}

.lc-parties p {
  margin: 1px 0;
  font-size: 13px;
  color: #334155;
  overflow-wrap: anywhere;
}

.lc-section {
  padding: 18px 0;
}

.lc-route {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #f5f9ff;
  margin-bottom: 12px;
}

.lc-route-point {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  min-width: 0;
}

.lc-route-point span {
  display: block;
  font-size: 11px;
  color: rgba(11, 18, 32, .5);
}

.lc-route-point strong {
  display: block;
  font-size: 15px;
  color: #0b1220;
}

.lc-route-point small {
  display: block;
  font-size: 12px;
  color: rgba(11, 18, 32, .55);
}

.lc-route-line {
  flex: 1;
  min-width: 30px;
  border-top: 2px dashed rgba(0, 113, 227, .4);
}

.lc-dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 20px;
  margin: 0;
}

.lc-dl>div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px dashed rgba(11, 18, 32, .08);
  font-size: 13px;
}

.lc-dl dt {
  color: rgba(11, 18, 32, .55);
}

.lc-dl dd {
  margin: 0;
  font-weight: 700;
  color: #0b1220;
  text-align: right;
}

.lc-text {
  margin: 10px 0 0;
  font-size: 13px;
  color: #334155;
}

.lc-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 4px;
  font-size: 13.5px;
}

.lc-table th {
  text-align: left;
  padding: 10px 12px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.lc-table td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
  color: #1f2937;
}

.lc-table .num {
  text-align: right;
  white-space: nowrap;
}

.lc-table tfoot td {
  border-bottom: none;
  font-size: 16px;
  font-weight: 900;
  color: #0b1220;
  padding-top: 14px;
}

.lc-avisos {
  list-style: none;
  margin: 16px 0 0;
  padding: 12px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 24px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid rgba(11, 18, 32, .06);
}

.lc-avisos li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
}

.lc-avisos .q-icon {
  color: #0071e3;
}

.lc-legal {
  margin: 18px 0 0;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
  text-align: center;
}

.lc-side {
  position: sticky;
  top: 84px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lc-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 18px;
}

.lc-card-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: rgba(11, 18, 32, .5);
}

.lc-card-total {
  display: block;
  margin: 2px 0 14px;
  font-size: 28px;
  font-weight: 900;
  color: #0071e3;
}

.lc-btn-big {
  height: 46px;
  border-radius: 12px;
  font-weight: 800;
}

.lc-help {
  display: flex;
  gap: 10px;
}

.lc-help p {
  margin: 2px 0 6px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .55);
}

.lc-help a {
  font-size: 13px;
  font-weight: 700;
  color: #16a34a;
  text-decoration: none;
}

@media (max-width: 960px) {
  .lc-grid {
    grid-template-columns: 1fr;
  }

  .lc-side {
    position: static;
  }
}

@media (max-width: 640px) {
  .lc-wrap {
    padding: 0 16px;
  }

  .lc-doc {
    padding: 20px 16px;
  }

  .lc-status {
    flex-wrap: wrap;
  }

  .lc-status-actions {
    width: 100%;
  }

  .lc-status-actions .q-btn {
    width: 100%;
  }

  .lc-parties,
  .lc-dl {
    grid-template-columns: 1fr;
  }

  .lc-route {
    flex-direction: column;
    align-items: flex-start;
  }

  .lc-route-line {
    display: none;
  }
}
</style>
