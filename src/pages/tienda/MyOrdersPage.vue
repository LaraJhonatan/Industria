<template>
  <section class="orders-section">
    <div class="bs-wrap">
      <nav class="breadcrumb">
        <span class="bc-link" @click="router.push('/tienda')">Tienda</span>
        <span class="bc-sep">›</span>
        <span class="bc-current">Mis compras</span>
      </nav>

      <h1 class="orders-title">Mis compras</h1>

      <div v-if="!cart.esUsuario" class="state-card">
        <h2 class="state-title">Inicia sesión para ver tu historial</h2>
        <button class="btn-primary" @click="router.push('/auth')">Iniciar sesión</button>
      </div>

      <div v-else-if="loading" class="loading-wrap">
        <q-spinner color="blue-6" size="40px" />
      </div>

      <div v-else-if="!orders.length" class="state-card">
        <h2 class="state-title">Todavía no tienes compras</h2>
        <p class="state-sub">Cuando pagues un pedido, aparecerá aquí con su comprobante.</p>
        <button class="btn-primary" @click="router.push('/tienda')">Ir al catálogo</button>
      </div>

      <div v-else class="orders-list">
        <div v-for="o in orders" :key="o.id" class="order-card">
          <div class="order-card-header">
            <div>
              <div class="order-ref">Referencia #{{ o.id.slice(0, 8).toUpperCase() }}</div>
              <div class="order-date">{{ formatDate(o.createdAt) }}</div>
            </div>
            <span class="order-badge" :class="`order-badge--${o.estado}`">{{ estadoLabel(o.estado) }}</span>
          </div>

          <div class="order-items">
            <div v-for="item in o.items" :key="item.id" class="order-item-row">
              <span class="oi-name">{{ item.nombre }}</span>
              <span class="oi-qty">x{{ item.cantidad }}</span>
              <span class="oi-subtotal">${{ formatMoney(item.subtotal) }}</span>
            </div>
          </div>

          <div class="order-card-footer">
            <div class="order-total">
              <span>Total</span>
              <strong>${{ formatMoney(o.subtotal) }} {{ o.moneda }}</strong>
            </div>
            <button v-if="o.estado === 'approved'" class="btn-comprobante" :disabled="descargando === o.id"
              @click="onDescargar(o)">
              <q-spinner v-if="descargando === o.id" color="white" size="15px" />
              <template v-else>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar comprobante
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { ordersApi } from '../../api/orders'
import { useCartStore } from '../../stores/cart'
import { downloadBlob } from '../../utils/downloadBlob'

const router = useRouter()
const $q = useQuasar()
const cart = useCartStore()

const orders = ref([])
const loading = ref(true)
const descargando = ref(null)

function formatMoney(value) {
  if (value == null) return '0'
  return Number(value).toLocaleString('es-CO')
}

function formatDate(value) {
  return new Date(value).toLocaleString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function estadoLabel(estado) {
  const labels = { pending: 'Pendiente', approved: 'Pagado', declined: 'Rechazado', voided: 'Anulado', error: 'Error' }
  return labels[estado] || estado
}

async function onDescargar(order) {
  descargando.value = order.id
  try {
    const { data } = await ordersApi.getComprobante(order.id)
    downloadBlob(data, `comprobante-${order.id.slice(0, 8)}.pdf`)
  } catch {
    $q.notify({ message: 'No se pudo descargar el comprobante', color: 'red-5', position: 'top' })
  } finally {
    descargando.value = null
  }
}

onMounted(async () => {
  if (!cart.esUsuario) return
  loading.value = true
  try {
    const { data } = await ordersApi.getMine()
    orders.value = data || []
  } catch {
    orders.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.orders-section {
  background: #f6f8fb;
  min-height: 100vh;
  padding: 32px 0 80px;
}

.bs-wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 20px;
}

.bc-link {
  color: #0071e3;
  font-weight: 800;
  cursor: pointer;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(11, 18, 32, .3);
}

.bc-current {
  color: rgba(11, 18, 32, .6);
  font-weight: 700;
}

.orders-title {
  margin: 0 0 24px;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.6px;
}

.loading-wrap {
  display: grid;
  place-items: center;
  min-height: 40vh;
}

.state-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 56px 24px;
  text-align: center;
}

.state-title {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 900;
  color: #0b1220;
}

.state-sub {
  margin: 0 0 18px;
  font-size: 13.5px;
  color: rgba(11, 18, 32, .5);
}

.btn-primary {
  height: 44px;
  padding: 0 26px;
  border: none;
  border-radius: 12px;
  background: #0071e3;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.order-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 18px 20px;
}

.order-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
}

.order-ref {
  font-size: 13px;
  font-weight: 900;
  color: #0b1220;
  font-family: "SF Mono", Consolas, monospace;
}

.order-date {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  margin-top: 2px;
}

.order-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.order-badge--pending {
  background: rgba(217, 119, 6, .12);
  color: #d97706;
}

.order-badge--approved {
  background: rgba(18, 146, 74, .12);
  color: #12924a;
}

.order-badge--declined,
.order-badge--error {
  background: rgba(220, 38, 38, .1);
  color: #dc2626;
}

.order-badge--voided {
  background: rgba(11, 18, 32, .08);
  color: rgba(11, 18, 32, .5);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.order-item-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.oi-name {
  flex: 1;
  min-width: 0;
  color: #0b1220;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oi-qty {
  color: rgba(11, 18, 32, .45);
  font-weight: 700;
}

.oi-subtotal {
  color: #0b1220;
  font-weight: 800;
  white-space: nowrap;
}

.order-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(11, 18, 32, .06);
}

.order-total {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  font-weight: 700;
}

.order-total strong {
  font-size: 16px;
  color: #0b1220;
}

.btn-comprobante {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  background: #0b1220;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  transition: background 150ms;
}

.btn-comprobante:hover:not(:disabled) {
  background: #1c2536;
}

.btn-comprobante:disabled {
  opacity: .6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .order-card-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-comprobante {
    justify-content: center;
  }
}
</style>
