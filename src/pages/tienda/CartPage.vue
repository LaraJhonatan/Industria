<template>
  <section class="cart-section">
    <div class="bs-wrap">
      <nav class="breadcrumb">
        <span class="bc-link" @click="router.push('/tienda')">Tienda</span>
        <span class="bc-sep">›</span>
        <span class="bc-current">Mi carrito</span>
      </nav>

      <h1 class="cart-title">Mi carrito</h1>

      <!-- No logueado como usuario -->
      <div v-if="!cart.esUsuario" class="state-card">
        <div class="state-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h2 class="state-title">Inicia sesión para ver tu carrito</h2>
        <p class="state-sub">Tu carrito se guarda en tu cuenta para que lo tengas en cualquier dispositivo.</p>
        <button class="btn-primary" @click="router.push('/auth')">Iniciar sesión</button>
      </div>

      <!-- Cargando -->
      <div v-else-if="cart.loading && !cart.loaded" class="loading-wrap">
        <q-spinner color="blue-6" size="40px" />
      </div>

      <!-- Vacío -->
      <div v-else-if="cart.isEmpty" class="state-card">
        <div class="state-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h2 class="state-title">Tu carrito está vacío</h2>
        <p class="state-sub">Explora el catálogo y agrega productos o servicios.</p>
        <button class="btn-primary" @click="router.push('/tienda')">Ir al catálogo</button>
      </div>

      <!-- Con ítems -->
      <div v-else class="cart-grid">
        <div class="cart-lists">
          <!-- Pagables en línea -->
          <div v-if="cart.pagables.length" class="cart-block">
            <div class="block-head">
              <div class="block-head-icon block-head-icon--pse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div>
                <h3 class="block-title">Productos — pago en línea</h3>
                <p class="block-sub">Puedes pagarlos por PSE al finalizar la compra.</p>
              </div>
            </div>

            <div v-for="item in cart.pagables" :key="item.id" class="cart-item">
              <div class="ci-img">
                <img v-if="item.imagenUrl" :src="item.imagenUrl" :alt="item.nombre" />
                <div v-else class="ci-img-empty"><q-icon name="inventory_2" size="22px" color="grey-4" /></div>
              </div>
              <div class="ci-info">
                <p class="ci-name">{{ item.nombre }}</p>
                <p class="ci-price">${{ formatPrecio(item.precioBase) }} <span class="ci-moneda">{{ item.moneda
                }}</span></p>
              </div>
              <div class="ci-qty">
                <button class="qty-btn" @click="onDec(item)" :disabled="cart.loading">−</button>
                <span class="qty-val">{{ item.cantidad }}</span>
                <button class="qty-btn" @click="onInc(item)"
                  :disabled="cart.loading || atMax(item)">+</button>
              </div>
              <div class="ci-subtotal">${{ formatPrecio(item.subtotal) }}</div>
              <button class="ci-remove" @click="cart.removeItem(item.productId)" :disabled="cart.loading"
                aria-label="Quitar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Cotización -->
          <div v-if="cart.cotizacion.length" class="cart-block">
            <div class="block-head">
              <div class="block-head-icon block-head-icon--quote">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="block-title">Servicios — requieren cotización</h3>
                <p class="block-sub">El precio depende de varios factores. Los gestionamos por WhatsApp.</p>
              </div>
            </div>

            <div v-for="item in cart.cotizacion" :key="item.id" class="cart-item">
              <div class="ci-img">
                <img v-if="item.imagenUrl" :src="item.imagenUrl" :alt="item.nombre" />
                <div v-else class="ci-img-empty"><q-icon name="build" size="22px" color="grey-4" /></div>
              </div>
              <div class="ci-info">
                <p class="ci-name">{{ item.nombre }}</p>
                <p class="ci-quote-tag">Precio a cotizar</p>
              </div>
              <div class="ci-qty">
                <button class="qty-btn" @click="cart.decrement(item.productId)" :disabled="cart.loading">−</button>
                <span class="qty-val">{{ item.cantidad }}</span>
                <button class="qty-btn" @click="cart.increment(item.productId)" :disabled="cart.loading">+</button>
              </div>
              <div class="ci-subtotal ci-subtotal--quote">—</div>
              <button class="ci-remove" @click="cart.removeItem(item.productId)" :disabled="cart.loading"
                aria-label="Quitar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          <button class="clear-btn" @click="cart.clear()" :disabled="cart.loading">Vaciar carrito</button>
        </div>

        <!-- Resumen -->
        <aside class="cart-summary">
          <h3 class="summary-title">Resumen</h3>

          <div class="summary-row">
            <span>Productos ({{ cart.pagables.length }})</span>
            <span class="summary-val">${{ formatPrecio(cart.subtotalPagable) }}</span>
          </div>
          <div v-if="cart.cotizacion.length" class="summary-row">
            <span>Servicios a cotizar ({{ cart.cotizacion.length }})</span>
            <span class="summary-val summary-val--quote">Por cotizar</span>
          </div>

          <div class="summary-hr" />

          <div class="summary-row summary-row--total">
            <span>Total a pagar en línea</span>
            <span class="summary-total">${{ formatPrecio(cart.subtotalPagable) }} COP</span>
          </div>

          <button v-if="cart.pagables.length" class="btn-pse" @click="router.push('/tienda/checkout')"
            :disabled="cart.loading">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Continuar a pagar
          </button>

          <a v-if="cart.cotizacion.length" :href="whatsappCotizacionUrl" target="_blank" rel="noopener noreferrer"
            class="btn-quote">
            <svg viewBox="0 0 24 24" class="wa-ico" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar cotización
          </a>

          <p class="summary-note">Compra protegida · Transacciones seguras</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCartStore } from '../../stores/cart'

const router = useRouter()
const $q = useQuasar()
const cart = useCartStore()

const ZIFCOR_WHATSAPP = '573114799224'

function formatPrecio(valor) {
  if (valor == null) return '0'
  return Number(valor).toLocaleString('es-CO')
}

/** ¿La línea ya alcanzó el stock máximo? */
function atMax(item) {
  return item.stock != null && item.cantidad >= item.stock
}

async function onInc(item) {
  try {
    await cart.increment(item.productId)
  } catch (e) {
    const msg = e.response?.data?.message || 'No se pudo actualizar la cantidad'
    $q.notify({ message: msg, color: 'red-5', position: 'top' })
  }
}

async function onDec(item) {
  try {
    await cart.decrement(item.productId)
  } catch {
    $q.notify({ message: 'No se pudo actualizar la cantidad', color: 'red-5', position: 'top' })
  }
}

const whatsappCotizacionUrl = computed(() => {
  const lineas = cart.cotizacion
    .map((i) => `• ${i.nombre} (x${i.cantidad})`)
    .join('\n')
  const msg =
    'Hola, quiero cotizar los siguientes servicios de ZIFCOR:\n' +
    lineas +
    '\n\n¿Me pueden ayudar con el precio?'
  return `https://wa.me/${ZIFCOR_WHATSAPP}?text=${encodeURIComponent(msg)}`
})

onMounted(() => {
  cart.fetch()
})
</script>

<style scoped>
.cart-section {
  background: #f4f5f7;
  min-height: 100vh;
  padding-bottom: 80px;
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 32px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}

.bc-link {
  color: #1354d3;
  font-weight: 800;
  cursor: pointer;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, .28);
}

.bc-current {
  color: rgba(27, 27, 27, .55);
  font-weight: 700;
}

.cart-title {
  margin: 0 0 24px;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.6px;
}

/* ── Estados ── */
.state-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 56px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.state-icon {
  width: 84px;
  height: 84px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .04);
  color: rgba(11, 18, 32, .3);
  display: grid;
  place-items: center;
  margin-bottom: 18px;
}

.state-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 900;
  color: #0b1220;
}

.state-sub {
  margin: 0 0 22px;
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  max-width: 44ch;
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
  transition: background 150ms;
}

.btn-primary:hover {
  background: #005fcd;
}

.loading-wrap {
  display: grid;
  place-items: center;
  min-height: 40vh;
}

/* ── Layout con ítems ── */
.cart-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

.cart-block {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 20px 22px;
  margin-bottom: 18px;
}

.block-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.block-head-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}

.block-head-icon--pse {
  background: rgba(0, 113, 227, .1);
  color: #0071e3;
}

.block-head-icon--quote {
  background: rgba(37, 211, 102, .12);
  color: #12924a;
}

.block-title {
  margin: 0 0 2px;
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.block-sub {
  margin: 0;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
}

/* ── Ítem ── */
.cart-item {
  display: grid;
  grid-template-columns: 64px 1fr auto auto auto;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-top: 1px solid rgba(11, 18, 32, .07);
}

.ci-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f6f9;
}

.ci-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ci-img-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.ci-info {
  min-width: 0;
}

.ci-name {
  margin: 0 0 4px;
  font-size: 13.5px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.3;
}

.ci-price {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: rgba(11, 18, 32, .62);
}

.ci-moneda {
  font-size: 10px;
  font-weight: 700;
  color: rgba(11, 18, 32, .4);
}

.ci-quote-tag {
  margin: 0;
  font-size: 11.5px;
  font-weight: 800;
  color: #12924a;
}

.ci-qty {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1.5px solid rgba(11, 18, 32, .1);
  border-radius: 9px;
  padding: 2px;
}

.qty-btn {
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  color: #0b1220;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  border-radius: 6px;
  transition: background 140ms;
}

.qty-btn:hover:not(:disabled) {
  background: rgba(0, 113, 227, .08);
  color: #0071e3;
}

.qty-btn:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.qty-val {
  min-width: 22px;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: #0b1220;
}

.ci-subtotal {
  font-size: 14px;
  font-weight: 900;
  color: #0b1220;
  min-width: 84px;
  text-align: right;
}

.ci-subtotal--quote {
  color: rgba(11, 18, 32, .3);
}

.ci-remove {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: rgba(11, 18, 32, .4);
  cursor: pointer;
  border-radius: 8px;
  display: grid;
  place-items: center;
  transition: all 140ms;
}

.ci-remove:hover:not(:disabled) {
  background: rgba(220, 38, 38, .08);
  color: #dc2626;
}

.clear-btn {
  background: none;
  border: none;
  color: rgba(11, 18, 32, .45);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 4px 0;
  font-family: inherit;
}

.clear-btn:hover {
  color: #dc2626;
}

/* ── Resumen ── */
.cart-summary {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 22px;
  position: sticky;
  top: 20px;
}

.summary-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 900;
  color: #0b1220;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
  color: rgba(11, 18, 32, .62);
  margin-bottom: 10px;
}

.summary-val {
  font-weight: 800;
  color: #0b1220;
}

.summary-val--quote {
  color: #12924a;
  font-size: 12px;
}

.summary-hr {
  height: 1px;
  background: rgba(11, 18, 32, .08);
  margin: 14px 0;
}

.summary-row--total {
  font-size: 14px;
  font-weight: 900;
  color: #0b1220;
}

.summary-total {
  font-size: 18px;
  font-weight: 900;
  color: #0b1220;
}

.btn-pse {
  width: 100%;
  height: 46px;
  margin-top: 18px;
  border: none;
  border-radius: 12px;
  background: #0071e3;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  transition: background 150ms;
}

.btn-pse:hover:not(:disabled) {
  background: #005fcd;
}

.btn-pse:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.btn-quote {
  width: 100%;
  height: 46px;
  margin-top: 10px;
  border-radius: 12px;
  background: #25d366;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter 150ms;
}

.btn-quote:hover {
  filter: brightness(.95);
}

.wa-ico {
  width: 18px;
  height: 18px;
}

.summary-note {
  margin: 14px 0 0;
  text-align: center;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
}

@media (max-width: 900px) {
  .cart-grid {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 600px) {
  .bs-wrap {
    padding: 20px 16px 0;
  }

  .cart-item {
    grid-template-columns: 52px 1fr auto;
    grid-template-areas:
      "img info remove"
      "img qty subtotal";
    row-gap: 8px;
  }

  .ci-img {
    grid-area: img;
    width: 52px;
    height: 52px;
  }

  .ci-info {
    grid-area: info;
  }

  .ci-qty {
    grid-area: qty;
  }

  .ci-subtotal {
    grid-area: subtotal;
    min-width: 0;
  }

  .ci-remove {
    grid-area: remove;
    justify-self: end;
  }
}
</style>
