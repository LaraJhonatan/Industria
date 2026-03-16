<template>
  <section class="checkout-section" aria-label="Proceso de pago">
    <div class="checkout-wrap">

      <!-- ══ Success state ══ -->
      <div v-if="orderPlaced" class="success-screen">
        <div class="success-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 class="success-title">¡Pedido confirmado!</h1>
        <p class="success-sub">
          Tu pedido <strong>#{{ orderId }}</strong> ha sido recibido. Te contactaremos en las próximas 24 horas para
          coordinar el envío y confirmar los detalles.
        </p>
        <div class="success-detail">
          <div class="sd-row">
            <span>Pedido</span><strong>#{{ orderId }}</strong>
          </div>
          <div class="sd-row">
            <span>Total</span><strong>{{ formatCOP(cartStore.total) }}</strong>
          </div>
          <div class="sd-row">
            <span>Correo</span><strong>{{ form.email }}</strong>
          </div>
        </div>
        <div class="success-btns">
          <button class="s-btn-primary" @click="goHome">Ir al inicio</button>
          <button class="s-btn-secondary" @click="goShop">Seguir comprando</button>
        </div>
      </div>

      <!-- ══ Checkout form ══ -->
      <template v-else>

        <!-- Header -->
        <div class="checkout-header">
          <button class="back-link" @click="router.push('/carrito')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver al carrito
          </button>
          <h1 class="checkout-title">Finalizar compra</h1>
        </div>

        <!-- Steps indicator -->
        <div class="steps">
          <div class="step done">
            <div class="step-dot"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.8">
                <polyline points="20 6 9 17 4 12" />
              </svg></div>
            <span>Carrito</span>
          </div>
          <div class="step-line"></div>
          <div class="step active">
            <div class="step-dot">2</div>
            <span>Datos</span>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-dot">3</div>
            <span>Confirmación</span>
          </div>
        </div>

        <div class="checkout-layout">

          <!-- ── Form ── -->
          <div class="form-col">

            <!-- Contact info -->
            <div class="form-section">
              <h2 class="section-title">Información de contacto</h2>
              <div class="form-grid">
                <div class="field">
                  <label class="field-lbl">Nombre *</label>
                  <input v-model="form.firstName" type="text" placeholder="Juan" class="field-inp"
                    :class="{ error: errors.firstName }" />
                  <span v-if="errors.firstName" class="field-err">{{ errors.firstName }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Apellido *</label>
                  <input v-model="form.lastName" type="text" placeholder="García" class="field-inp"
                    :class="{ error: errors.lastName }" />
                  <span v-if="errors.lastName" class="field-err">{{ errors.lastName }}</span>
                </div>
                <div class="field field-full">
                  <label class="field-lbl">Correo electrónico *</label>
                  <input v-model="form.email" type="email" placeholder="juan@empresa.com" class="field-inp"
                    :class="{ error: errors.email }" />
                  <span v-if="errors.email" class="field-err">{{ errors.email }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Teléfono / WhatsApp *</label>
                  <input v-model="form.phone" type="tel" placeholder="+57 300 000 0000" class="field-inp"
                    :class="{ error: errors.phone }" />
                  <span v-if="errors.phone" class="field-err">{{ errors.phone }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Empresa (opcional)</label>
                  <input v-model="form.company" type="text" placeholder="Mi Empresa S.A.S." class="field-inp" />
                </div>
              </div>
            </div>

            <!-- Shipping info -->
            <div class="form-section">
              <h2 class="section-title">Dirección de entrega</h2>
              <div class="form-grid">
                <div class="field field-full">
                  <label class="field-lbl">Dirección *</label>
                  <input v-model="form.address" type="text" placeholder="Cra 15 #93-47, Apto 201" class="field-inp"
                    :class="{ error: errors.address }" />
                  <span v-if="errors.address" class="field-err">{{ errors.address }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Ciudad *</label>
                  <input v-model="form.city" type="text" placeholder="Bogotá" class="field-inp"
                    :class="{ error: errors.city }" />
                  <span v-if="errors.city" class="field-err">{{ errors.city }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Departamento *</label>
                  <select v-model="form.department" class="field-inp" :class="{ error: errors.department }">
                    <option value="">Selecciona...</option>
                    <option v-for="dep in departments" :key="dep" :value="dep">{{ dep }}</option>
                  </select>
                  <span v-if="errors.department" class="field-err">{{ errors.department }}</span>
                </div>
                <div class="field">
                  <label class="field-lbl">Código postal</label>
                  <input v-model="form.zip" type="text" placeholder="110111" class="field-inp" />
                </div>
              </div>
            </div>

            <!-- Payment method -->
            <div class="form-section">
              <h2 class="section-title">Método de pago</h2>
              <div class="payment-options">
                <label v-for="opt in paymentOptions" :key="opt.id" class="pay-opt"
                  :class="{ 'pay-active': form.paymentMethod === opt.id }">
                  <input type="radio" v-model="form.paymentMethod" :value="opt.id" class="pay-radio" />
                  <span class="pay-icon">{{ opt.icon }}</span>
                  <div class="pay-info">
                    <p class="pay-name">{{ opt.name }}</p>
                    <p class="pay-desc">{{ opt.desc }}</p>
                  </div>
                </label>
              </div>
              <span v-if="errors.paymentMethod" class="field-err">{{ errors.paymentMethod }}</span>
            </div>

            <!-- Notes -->
            <div class="form-section">
              <h2 class="section-title">Notas del pedido <span class="opt-tag">Opcional</span></h2>
              <div class="field">
                <textarea v-model="form.notes" class="field-inp field-textarea"
                  placeholder="Instrucciones especiales de entrega, referencias de acceso..." rows="3" />
              </div>
            </div>

            <!-- Submit -->
            <button class="submit-btn" :class="{ 'submitting': isSubmitting }" @click="handleSubmit"
              :disabled="isSubmitting">
              <span v-if="isSubmitting" class="submit-spinner"></span>
              <template v-else>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Confirmar pedido — {{ formatCOP(cartStore.total) }}
              </template>
            </button>

            <p class="terms-note">
              Al confirmar aceptas nuestros <a href="#">Términos y Condiciones</a> y la <a href="#">Política de
                Privacidad</a>.
            </p>

          </div>

          <!-- ── Order Summary (sidebar) ── -->
          <div class="summary-col">
            <div class="summary-box">
              <h2 class="summary-title">Tu pedido</h2>

              <!-- Items -->
              <div class="order-items">
                <div v-for="item in cartStore.items" :key="item.productId" class="order-item">
                  <div class="oi-img-wrap">
                    <img :src="item.image" :alt="item.name" class="oi-img" />
                    <span class="oi-qty-badge">{{ item.qty }}</span>
                  </div>
                  <div class="oi-info">
                    <p class="oi-name">{{ item.name }}</p>
                    <p v-if="item.variant" class="oi-variant">{{ item.variant }}</p>
                  </div>
                  <span class="oi-price">{{ formatCOP(item.price * item.qty) }}</span>
                </div>
              </div>

              <div class="summary-divider"></div>

              <!-- Totals -->
              <div class="totals">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>{{ formatCOP(cartStore.subtotal) }}</span>
                </div>
                <div class="total-row">
                  <span>Envío</span>
                  <span :class="{ 'green': cartStore.shipping === 0 }">
                    {{ cartStore.shipping === 0 ? 'Gratis' : formatCOP(cartStore.shipping) }}
                  </span>
                </div>
              </div>

              <div class="summary-divider"></div>

              <div class="grand-total">
                <span>Total</span>
                <span class="gt-val">{{ formatCOP(cartStore.total) }}</span>
              </div>
            </div>
          </div>

        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart.js'
import { formatCOP } from '../../data/store-products.js'

const router = useRouter()
const cartStore = useCartStore()

// ── Order placed ─────────────────────────────────────────────────────────────
const orderPlaced = ref(false)
const isSubmitting = ref(false)
const orderId = ref('')

// ── Form ─────────────────────────────────────────────────────────────────────
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  city: '',
  department: '',
  zip: '',
  paymentMethod: '',
  notes: '',
})

const errors = reactive({})

// ── Validation ───────────────────────────────────────────────────────────────
function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  let ok = true

  const req = (field, label) => {
    if (!form[field]?.trim()) { errors[field] = `${label} es requerido`; ok = false }
  }
  req('firstName', 'Nombre')
  req('lastName', 'Apellido')
  req('address', 'Dirección')
  req('city', 'Ciudad')
  req('department', 'Departamento')

  if (!form.email?.trim()) {
    errors.email = 'Correo es requerido'; ok = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Correo no válido'; ok = false
  }

  if (!form.phone?.trim()) { errors.phone = 'Teléfono es requerido'; ok = false }
  if (!form.paymentMethod) { errors.paymentMethod = 'Selecciona un método de pago'; ok = false }

  return ok
}

// ── Submit ───────────────────────────────────────────────────────────────────
async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true

  // Simulación de envío (1.5 s)
  await new Promise(r => setTimeout(r, 1500))

  orderId.value = 'NI-' + Date.now().toString(36).toUpperCase()
  orderPlaced.value = true
  cartStore.clear()
  isSubmitting.value = false
}

function goHome() { router.push('/') }
function goShop() { router.push('/tienda') }

// ── Static data ───────────────────────────────────────────────────────────────
const paymentOptions = [
  { id: 'transferencia', icon: '🏦', name: 'Transferencia bancaria', desc: 'PSE / Consignación / Daviplata' },
  { id: 'efectivo', icon: '💵', name: 'Pago contra entrega', desc: 'Efectivo al recibir el pedido' },
  { id: 'credito', icon: '💳', name: 'Tarjeta de crédito', desc: 'Visa, Mastercard, Amex' },
  { id: 'cotizacion', icon: '📋', name: 'Solicitar cotización', desc: 'Te enviamos una cotización formal' },
]

const departments = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
  'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare',
  'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo',
  'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
  'Valle del Cauca', 'Vaupés', 'Vichada',
]
</script>

<style scoped>
.checkout-section {
  background: #fafbfc;
  min-height: calc(100vh - 64px);
  padding: 40px 0 80px;
}

.checkout-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px;
}

/* header */
.checkout-header {
  margin-bottom: 28px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-size: 13px;
  font-weight: 700;
  padding: 0;
  margin-bottom: 14px;
}

.back-link:hover {
  text-decoration: underline;
}

.checkout-title {
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 900;
  color: #1b1b1b;
  margin: 0;
  letter-spacing: -.6px;
}

/* steps */
.steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 40px;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(27, 27, 27, .4);
}

.step.active {
  color: #1b1b1b;
}

.step.done {
  color: #1aab5c;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(27, 27, 27, .15);
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
  color: rgba(27, 27, 27, .4);
  flex-shrink: 0;
}

.step.active .step-dot {
  background: #1b1b1b;
  border-color: #1b1b1b;
  color: #fff;
}

.step.done .step-dot {
  background: #1aab5c;
  border-color: #1aab5c;
  color: #fff;
}

.step-line {
  flex: 1;
  height: 2px;
  background: rgba(27, 27, 27, .1);
  max-width: 60px;
  min-width: 20px;
}

/* layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

/* form */
.form-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  background: #fff;
  border-radius: 16px;
  border: 1.5px solid rgba(27, 27, 27, .08);
  padding: 24px 22px;
}

.section-title {
  font-size: 16px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 20px;
}

.opt-tag {
  font-size: 11px;
  font-weight: 700;
  color: rgba(27, 27, 27, .4);
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: 8px;
  vertical-align: middle;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-full {
  grid-column: 1 / -1;
}

.field-lbl {
  font-size: 12.5px;
  font-weight: 800;
  color: #1b1b1b;
}

.field-inp {
  height: 44px;
  border: 1.5px solid rgba(27, 27, 27, .14);
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: #1b1b1b;
  background: #fafbfc;
  transition: border-color 150ms, box-shadow 150ms;
  outline: none;
  font-family: inherit;
}

.field-inp:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .1);
  background: #fff;
}

.field-inp.error {
  border-color: #ff3b30;
}

.field-textarea {
  height: auto;
  padding: 12px 14px;
  resize: vertical;
}

select.field-inp {
  appearance: none;
  cursor: pointer;
}

.field-err {
  font-size: 12px;
  color: #ff3b30;
  font-weight: 600;
}

/* payment */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pay-opt {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 2px solid rgba(27, 27, 27, .12);
  border-radius: 12px;
  cursor: pointer;
  transition: all 160ms;
}

.pay-opt:hover {
  border-color: rgba(27, 27, 27, .25);
}

.pay-active {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .04);
}

.pay-radio {
  display: none;
}

.pay-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.pay-info {
  flex: 1;
}

.pay-name {
  font-size: 14px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 2px;
}

.pay-desc {
  font-size: 12px;
  color: rgba(27, 27, 27, .5);
  margin: 0;
}

.submit-btn {
  width: 100%;
  height: 56px;
  background: #1b1b1b;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 200ms, transform 200ms;
}

.submit-btn:hover:not(:disabled) {
  background: #000;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: .65;
  cursor: default;
}

.submitting {
  background: #333;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.submit-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, .3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

.terms-note {
  font-size: 12px;
  color: rgba(27, 27, 27, .45);
  text-align: center;
  margin: 12px 0 0;
  line-height: 1.6;
}

.terms-note a {
  color: #0071e3;
}

/* summary */
.summary-col {}

.summary-box {
  background: #fff;
  border-radius: 16px;
  border: 1.5px solid rgba(27, 27, 27, .09);
  padding: 22px 20px;
  position: sticky;
  top: 88px;
}

.summary-title {
  font-size: 16px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 18px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 0;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.oi-img-wrap {
  position: relative;
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f2f5;
}

.oi-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.oi-qty-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  background: #1b1b1b;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.oi-info {
  flex: 1;
  min-width: 0;
}

.oi-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0 0 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.oi-variant {
  font-size: 11px;
  color: rgba(27, 27, 27, .45);
  margin: 0;
}

.oi-price {
  font-size: 13px;
  font-weight: 900;
  color: #1b1b1b;
  flex-shrink: 0;
}

.summary-divider {
  height: 1px;
  background: rgba(27, 27, 27, .07);
  margin: 16px 0;
}

.totals {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  color: rgba(27, 27, 27, .7);
}

.green {
  color: #1aab5c;
  font-weight: 800;
}

.grand-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grand-total span {
  font-size: 15px;
  font-weight: 800;
  color: #1b1b1b;
}

.gt-val {
  font-size: 20px;
  font-weight: 900;
}

/* success */
.success-screen {
  max-width: 520px;
  margin: 60px auto;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #1aab5c;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: grid;
  place-items: center;
}

.success-title {
  font-size: 30px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 12px;
}

.success-sub {
  font-size: 15px;
  color: rgba(27, 27, 27, .6);
  margin: 0 0 28px;
  line-height: 1.7;
}

.success-detail {
  background: #fff;
  border-radius: 14px;
  border: 1.5px solid rgba(27, 27, 27, .09);
  padding: 16px 20px;
  margin-bottom: 28px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sd-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(27, 27, 27, .65);
}

.sd-row strong {
  color: #1b1b1b;
}

.success-btns {
  display: flex;
  gap: 12px;
}

.s-btn-primary {
  flex: 1;
  height: 48px;
  background: #1b1b1b;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
}

.s-btn-secondary {
  flex: 1;
  height: 48px;
  background: transparent;
  color: #0071e3;
  border: 2px solid #0071e3;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
}

/* responsive */
@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .summary-box {
    position: static;
  }
}

@media (max-width: 640px) {
  .checkout-wrap {
    padding: 0 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field-full {
    grid-column: 1;
  }

  .steps span {
    display: none;
  }
}
</style>
