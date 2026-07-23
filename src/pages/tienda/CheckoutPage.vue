<template>
  <section class="checkout-section">
    <div class="bs-wrap">
      <nav class="breadcrumb">
        <span class="bc-link" @click="router.push('/tienda/carrito')">Mi carrito</span>
        <span class="bc-sep">›</span>
        <span class="bc-current">Datos de envío</span>
      </nav>

      <h1 class="checkout-title">Finalizar compra</h1>

      <!-- No logueado -->
      <div v-if="!cart.esUsuario" class="state-card">
        <h2 class="state-title">Inicia sesión para continuar</h2>
        <button class="btn-primary" @click="router.push('/auth')">Iniciar sesión</button>
      </div>

      <!-- Cargando carrito -->
      <div v-else-if="cart.loading && !cart.loaded" class="loading-wrap">
        <q-spinner color="blue-6" size="40px" />
      </div>

      <!-- Sin nada que pagar -->
      <div v-else-if="!cart.pagables.length" class="state-card">
        <h2 class="state-title">No tienes productos por pagar</h2>
        <p class="state-sub">Agrega productos al carrito antes de continuar.</p>
        <button class="btn-primary" @click="router.push('/tienda')">Ir al catálogo</button>
      </div>

      <div v-else class="checkout-grid">
        <!-- Formulario de envío -->
        <div class="checkout-form">
          <h2 class="form-title">Datos de envío y contacto</h2>

          <div class="field-full">
            <label class="field-label">Nombre completo <span class="req">*</span></label>
            <input v-model="form.nombreCompleto" class="fi" type="text" placeholder="Nombre y apellidos"
              maxlength="200" />
          </div>

          <div class="field-half">
            <label class="field-label">Teléfono <span class="req">*</span></label>
            <input v-model="form.telefono" class="fi" type="tel" placeholder="300 123 4567" maxlength="30" />
          </div>
          <div class="field-half">
            <label class="field-label">Código postal</label>
            <input v-model="form.codigoPostal" class="fi" type="text" placeholder="Opcional" maxlength="20" />
          </div>

          <div class="field-full">
            <label class="field-label">Dirección <span class="req">*</span></label>
            <input v-model="form.direccion" class="fi" type="text" placeholder="Calle, número, barrio"
              maxlength="300" />
          </div>

          <div class="field-half">
            <label class="field-label">Ciudad <span class="req">*</span></label>
            <input v-model="form.ciudad" class="fi" type="text" placeholder="Ciudad" maxlength="100" />
          </div>
          <div class="field-half">
            <label class="field-label">Departamento <span class="req">*</span></label>
            <input v-model="form.departamento" class="fi" type="text" placeholder="Departamento" maxlength="100" />
          </div>

          <div class="field-full">
            <label class="field-label">Notas para la entrega</label>
            <textarea v-model="form.notas" class="fi fi-textarea" rows="2"
              placeholder="Ej: dejar con portería, llamar antes de llegar..." maxlength="1000" />
          </div>

          <p v-if="formError" class="form-error">{{ formError }}</p>
        </div>

        <!-- Resumen -->
        <aside class="checkout-summary">
          <h3 class="summary-title">Resumen del pedido</h3>

          <div class="summary-items">
            <div v-for="item in cart.pagables" :key="item.id" class="summary-item">
              <div class="si-img">
                <img v-if="item.imagenUrl" :src="item.imagenUrl" :alt="item.nombre" />
                <div v-else class="si-img-empty"><q-icon name="inventory_2" size="18px" color="grey-4" /></div>
              </div>
              <div class="si-info">
                <p class="si-name">{{ item.nombre }}</p>
                <p class="si-qty">Cantidad: {{ item.cantidad }}</p>
              </div>
              <div class="si-price">${{ formatPrecio(item.subtotal) }}</div>
            </div>
          </div>

          <div class="summary-hr" />

          <div class="summary-row summary-row--total">
            <span>Total a pagar</span>
            <span class="summary-total">${{ formatPrecio(cart.subtotalPagable) }} COP</span>
          </div>

          <button class="btn-pse" :disabled="paying" @click="onPagar">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            {{ paying ? 'Abriendo pasarela...' : 'Pagar con PSE' }}
          </button>

          <p class="summary-note">El monto a cobrar lo calcula y verifica nuestro servidor —
            no depende de lo que se muestre aquí en el navegador.</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCartStore } from '../../stores/cart'
import { ordersApi } from '../../api/orders'

const router = useRouter()
const $q = useQuasar()
const cart = useCartStore()

const paying = ref(false)
const formError = ref('')

const form = reactive({
  nombreCompleto: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  departamento: '',
  codigoPostal: '',
  notas: '',
})

function formatPrecio(valor) {
  if (valor == null) return '0'
  return Number(valor).toLocaleString('es-CO')
}

function validar() {
  if (!form.nombreCompleto.trim()) return 'Ingresa tu nombre completo.'
  if (!form.telefono.trim()) return 'Ingresa un teléfono de contacto.'
  if (!form.direccion.trim()) return 'Ingresa la dirección de envío.'
  if (!form.ciudad.trim()) return 'Ingresa la ciudad.'
  if (!form.departamento.trim()) return 'Ingresa el departamento.'
  return ''
}

// Carga el script del widget de Wompi una sola vez (solo se necesita en esta página).
let wompiScriptPromise = null
function loadWompiScript() {
  if (window.WidgetCheckout) return Promise.resolve()
  if (wompiScriptPromise) return wompiScriptPromise
  wompiScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.wompi.co/widget.js'
    script.onload = resolve
    script.onerror = () => reject(new Error('No se pudo cargar la pasarela de pago.'))
    document.head.appendChild(script)
  })
  return wompiScriptPromise
}

async function onPagar() {
  const error = validar()
  if (error) {
    formError.value = error
    return
  }
  formError.value = ''

  if (paying.value) return
  paying.value = true
  try {
    await loadWompiScript()

    // El backend recalcula el monto desde el carrito guardado en el servidor;
    // el front solo manda los datos de envío, nunca precios ni cantidades.
    const { data } = await ordersApi.checkout({
      nombreCompleto: form.nombreCompleto.trim(),
      telefono: form.telefono.trim(),
      direccion: form.direccion.trim(),
      ciudad: form.ciudad.trim(),
      departamento: form.departamento.trim(),
      codigoPostal: form.codigoPostal.trim() || undefined,
      notas: form.notas.trim() || undefined,
    })

    if (!data.publicKey) {
      $q.notify({
        message: 'La pasarela de pago aún no está configurada (falta la llave de Wompi).',
        color: 'orange-8',
        position: 'top',
        timeout: 3200,
      })
      return
    }

    const checkout = new window.WidgetCheckout({
      currency: data.currency,
      amountInCents: data.amountInCents,
      reference: data.reference,
      publicKey: data.publicKey,
      signature: { integrity: data.signature },
      redirectUrl: data.redirectUrl,
    })

    checkout.open(async (result) => {
      const status = result?.transaction?.status
      if (status === 'APPROVED') {
        $q.notify({ message: '¡Pago aprobado! Gracias por tu compra.', color: 'green-6', position: 'top', timeout: 3000 })
        router.push('/tienda')
      } else if (status === 'DECLINED') {
        $q.notify({ message: 'El pago fue rechazado. Intenta con otro medio de pago.', color: 'red-5', position: 'top', timeout: 3200 })
      } else if (status) {
        $q.notify({ message: 'El pago quedó pendiente de confirmación.', color: 'blue-6', position: 'top', timeout: 3200 })
      }
      await cart.fetch()
    })
  } catch (e) {
    const msg = e.response?.data?.message || e.message || 'No se pudo iniciar el pago.'
    $q.notify({ message: msg, color: 'red-5', position: 'top' })
  } finally {
    paying.value = false
  }
}

onMounted(() => {
  if (!cart.loaded) cart.fetch()
})
</script>

<style scoped>
.checkout-section {
  background: #f4f5f7;
  min-height: 100vh;
  padding-bottom: 80px;
}

.bs-wrap {
  max-width: 1100px;
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

.checkout-title {
  margin: 0 0 24px;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.6px;
}

.state-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 56px 24px;
  text-align: center;
}

.state-title {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 900;
  color: #0b1220;
}

.state-sub {
  margin: 0 0 18px;
  font-size: 14px;
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

.loading-wrap {
  display: grid;
  place-items: center;
  min-height: 40vh;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

/* ── Formulario ── */
.checkout-form {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 24px 26px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-title {
  grid-column: 1 / -1;
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 900;
  color: #0b1220;
}

.field-full {
  grid-column: 1 / -1;
}

.field-half {
  grid-column: span 1;
}

.field-label {
  display: block;
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
  margin-bottom: 6px;
}

.req {
  color: #dc2626;
}

.fi {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1.5px solid rgba(11, 18, 32, .12);
  border-radius: 10px;
  font-size: 13.5px;
  font-family: inherit;
  color: #0b1220;
  outline: none;
  transition: border-color 150ms;
  box-sizing: border-box;
}

.fi:focus {
  border-color: #0071e3;
}

.fi-textarea {
  height: auto;
  padding: 10px 12px;
  resize: vertical;
  font-family: inherit;
}

.form-error {
  grid-column: 1 / -1;
  margin: 0;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(220, 38, 38, .08);
  color: #dc2626;
  font-size: 13px;
  font-weight: 700;
}

/* ── Resumen ── */
.checkout-summary {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 18px;
  padding: 22px;
  position: sticky;
  top: 20px;
}

.summary-title {
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 14px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.si-img {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f6f9;
  flex-shrink: 0;
}

.si-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.si-img-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.si-info {
  flex: 1;
  min-width: 0;
}

.si-name {
  margin: 0;
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.si-qty {
  margin: 2px 0 0;
  font-size: 11px;
  color: rgba(11, 18, 32, .5);
}

.si-price {
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
  white-space: nowrap;
}

.summary-hr {
  height: 1px;
  background: rgba(11, 18, 32, .08);
  margin: 14px 0;
}

.summary-row--total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 900;
  color: #0b1220;
}

.summary-total {
  font-size: 18px;
  font-weight: 900;
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

.summary-note {
  margin: 12px 0 0;
  text-align: center;
  font-size: 11px;
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .checkout-summary {
    position: static;
  }
}

@media (max-width: 600px) {
  .bs-wrap {
    padding: 20px 16px 0;
  }

  .checkout-form {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .field-half {
    grid-column: 1 / -1;
  }
}
</style>
