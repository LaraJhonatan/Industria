<template>
  <section class="cart-section" aria-label="Carrito de compras">
    <div class="cart-wrap">

      <!-- ══ Empty Cart ══ -->
      <div v-if="cartStore.isEmpty" class="empty-cart">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c8cdd5" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 class="empty-title">Tu carrito está vacío</h2>
        <p class="empty-sub">Explora nuestro catálogo y añade los productos que necesitas.</p>
        <button class="empty-btn" @click="router.push('/tienda')">Ir a la tienda →</button>
      </div>

      <!-- ══ Cart with items ══ -->
      <template v-else>

        <!-- Page header -->
        <div class="cart-header">
          <h1 class="cart-title">Carrito de compras</h1>
          <span class="cart-count">{{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'producto' : 'productos'
            }}</span>
        </div>

        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Seguir comprando
          </button>
          <span class="bc-sep">/</span>
          <span class="bc-cur">Carrito</span>
          <span class="bc-sep">/</span>
          <span class="bc-dim">Pago</span>
        </nav>

        <!-- Main grid -->
        <div class="cart-layout">

          <!-- ── Items list ── -->
          <div class="items-col">

            <!-- Column headers -->
            <div class="items-header">
              <span class="ih-product">Producto</span>
              <span class="ih-price">Precio</span>
              <span class="ih-qty">Cantidad</span>
              <span class="ih-total">Total</span>
              <span class="ih-del"></span>
            </div>

            <!-- Item rows -->
            <transition-group name="item-list" tag="div" class="items-list">
              <div v-for="item in cartStore.items" :key="item.productId" class="cart-item">

                <!-- Image -->
                <div class="item-img-wrap">
                  <img :src="item.image" :alt="item.name" class="item-img" />
                </div>

                <!-- Info -->
                <div class="item-info">
                  <p class="item-category">{{ item.categoryTitle }}</p>
                  <h3 class="item-name">{{ item.name }}</h3>
                  <p v-if="item.variant" class="item-variant">{{ item.variant }}</p>
                  <!-- mobile price -->
                  <p class="item-price-mobile">{{ formatCOP(item.price) }}</p>
                </div>

                <!-- Price (desktop) -->
                <span class="item-price desktop-only">{{ formatCOP(item.price) }}</span>

                <!-- Qty controls -->
                <div class="item-qty">
                  <button class="qty-ctrl" @click="cartStore.decrement(item.productId)">−</button>
                  <span class="qty-num">{{ item.qty }}</span>
                  <button class="qty-ctrl" @click="cartStore.increment(item.productId)">+</button>
                </div>

                <!-- Line total -->
                <span class="item-line-total">{{ formatCOP(item.price * item.qty) }}</span>

                <!-- Remove -->
                <button class="item-remove" @click="confirmRemove(item.productId)" title="Eliminar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>

              </div>
            </transition-group>

            <!-- Clear cart -->
            <div class="cart-actions-bar">
              <button class="clear-btn" @click="showClearModal = true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Vaciar carrito
              </button>
              <button class="continue-btn" @click="router.push('/tienda')">
                ← Seguir comprando
              </button>
            </div>

          </div>

          <!-- ── Order Summary ── -->
          <div class="summary-col">
            <div class="summary-box">
              <h2 class="summary-title">Resumen del pedido</h2>

              <div class="summary-lines">
                <div class="summary-line">
                  <span>Subtotal ({{ cartStore.totalItems }} ítem{{ cartStore.totalItems !== 1 ? 's' : '' }})</span>
                  <span>{{ formatCOP(cartStore.subtotal) }}</span>
                </div>
                <div class="summary-line">
                  <span>Envío</span>
                  <span v-if="cartStore.shipping === 0" class="free-tag">Gratis</span>
                  <span v-else>{{ formatCOP(cartStore.shipping) }}</span>
                </div>
                <div v-if="cartStore.shipping > 0" class="free-info">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Envío gratis en pedidos superiores a {{ formatCOP(500000) }}
                </div>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-total">
                <span>Total</span>
                <span class="total-val">{{ formatCOP(cartStore.total) }}</span>
              </div>

              <button class="checkout-btn" @click="router.push('/checkout')">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Proceder al pago
              </button>

              <button class="quote-full-btn" @click="router.push('/contacto')">
                Solicitar cotización completa
              </button>

              <!-- Security badges -->
              <div class="security-badges">
                <div class="sec-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1aab5c" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Compra segura</span>
                </div>
                <div class="sec-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1aab5c" stroke-width="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Garantía incluida</span>
                </div>
                <div class="sec-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1aab5c" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path
                      d="M16 8h4l3 5v3h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                  <span>Envío a todo Colombia</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </template>
    </div>

    <!-- ══ Confirm remove modal ══ -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="removeId" class="modal-overlay" @click.self="removeId = null">
          <div class="modal-box">
            <h3 class="modal-title">¿Eliminar producto?</h3>
            <p class="modal-sub">¿Seguro que quieres quitar este artículo del carrito?</p>
            <div class="modal-actions">
              <button class="modal-cancel" @click="removeId = null">Cancelar</button>
              <button class="modal-confirm" @click="doRemove">Eliminar</button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="modal">
        <div v-if="showClearModal" class="modal-overlay" @click.self="showClearModal = false">
          <div class="modal-box">
            <h3 class="modal-title">¿Vaciar carrito?</h3>
            <p class="modal-sub">Se eliminarán todos los productos. Esta acción no se puede deshacer.</p>
            <div class="modal-actions">
              <button class="modal-cancel" @click="showClearModal = false">Cancelar</button>
              <button class="modal-confirm" @click="doClear">Vaciar</button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart.js'
import { formatCOP } from '../../data/store-products.js'

const router = useRouter()
const cartStore = useCartStore()

const removeId = ref(null)
const showClearModal = ref(false)

function confirmRemove(productId) { removeId.value = productId }
function doRemove() { cartStore.removeItem(removeId.value); removeId.value = null }
function doClear() { cartStore.clear(); showClearModal.value = false }
</script>

<style scoped>
.cart-section {
  background: #fafbfc;
  min-height: calc(100vh - 64px);
  padding: 40px 0 80px;
}

.cart-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* header */
.cart-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 20px;
}

.cart-title {
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 900;
  color: #1b1b1b;
  margin: 0;
  letter-spacing: -.6px;
}

.cart-count {
  font-size: 13px;
  font-weight: 700;
  color: rgba(27, 27, 27, .45);
}

/* breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 36px;
}

.bc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-weight: 700;
  font-size: 13px;
  padding: 0;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, .3);
}

.bc-cur {
  font-weight: 700;
  color: #1b1b1b;
}

.bc-dim {
  color: rgba(27, 27, 27, .35);
}

/* layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

/* items col */
.items-col {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.items-header {
  display: grid;
  grid-template-columns: 80px 1fr 90px 100px 90px 44px;
  gap: 12px;
  padding: 10px 16px;
  background: #f0f2f5;
  border-radius: 12px 12px 0 0;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 800;
  color: rgba(27, 27, 27, .5);
  text-transform: uppercase;
  letter-spacing: .6px;
  align-items: center;
}

.ih-price,
.ih-qty,
.ih-total {
  text-align: center;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr 90px 100px 90px 44px;
  gap: 12px;
  padding: 18px 16px;
  background: #fff;
  border: 1.5px solid rgba(27, 27, 27, .07);
  border-top: none;
  align-items: center;
  transition: background 150ms;
}

.cart-item:hover {
  background: #fdfeff;
}

.cart-item:last-child {
  border-radius: 0 0 12px 12px;
}

.item-img-wrap {
  width: 80px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  background: #f0f2f5;
  flex-shrink: 0;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-category {
  font-size: 10.5px;
  font-weight: 800;
  color: #0071e3;
  text-transform: uppercase;
  letter-spacing: .7px;
  margin: 0;
}

.item-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-variant {
  font-size: 11.5px;
  color: rgba(27, 27, 27, .45);
  margin: 0;
}

.item-price-mobile {
  display: none;
  font-size: 14px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 4px 0 0;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: rgba(27, 27, 27, .7);
  text-align: center;
}

.item-qty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  border: 1.5px solid rgba(27, 27, 27, .15);
  border-radius: 8px;
  overflow: hidden;
  width: 90px;
}

.qty-ctrl {
  width: 28px;
  height: 32px;
  background: transparent;
  border: none;
  font-size: 17px;
  font-weight: 600;
  color: #1b1b1b;
  cursor: pointer;
  transition: background 150ms;
}

.qty-ctrl:hover {
  background: #f0f2f5;
}

.qty-num {
  min-width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: #1b1b1b;
}

.item-line-total {
  font-size: 15px;
  font-weight: 900;
  color: #1b1b1b;
  text-align: center;
}

.item-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(27, 27, 27, .35);
  padding: 6px;
  border-radius: 8px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-remove:hover {
  background: rgba(255, 59, 48, .08);
  color: #ff3b30;
}

/* actions bar */
.cart-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  gap: 12px;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1.5px solid rgba(27, 27, 27, .12);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(27, 27, 27, .5);
  cursor: pointer;
  transition: all 180ms;
}

.clear-btn:hover {
  border-color: #ff3b30;
  color: #ff3b30;
  background: rgba(255, 59, 48, .05);
}

.continue-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  color: #0071e3;
  padding: 0;
}

.continue-btn:hover {
  text-decoration: underline;
}

/* summary */
.summary-col {}

.summary-box {
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid rgba(27, 27, 27, .09);
  padding: 24px 22px;
  position: sticky;
  top: 88px;
}

.summary-title {
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 20px;
}

.summary-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(27, 27, 27, .7);
}

.free-tag {
  font-size: 13px;
  font-weight: 800;
  color: #1aab5c;
}

.free-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #0071e3;
  background: rgba(0, 113, 227, .05);
  padding: 8px 10px;
  border-radius: 8px;
}

.summary-divider {
  height: 1px;
  background: rgba(27, 27, 27, .08);
  margin: 16px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.summary-total span {
  font-size: 16px;
  font-weight: 800;
  color: #1b1b1b;
}

.total-val {
  font-size: 22px;
  font-weight: 900;
  color: #1b1b1b;
}

.checkout-btn {
  width: 100%;
  height: 52px;
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
  margin-bottom: 12px;
  transition: background 200ms, transform 200ms;
}

.checkout-btn:hover {
  background: #000;
  transform: translateY(-1px);
}

.quote-full-btn {
  width: 100%;
  height: 46px;
  background: transparent;
  border: 2px solid rgba(27, 27, 27, .14);
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 900;
  color: rgba(27, 27, 27, .65);
  cursor: pointer;
  transition: all 200ms;
}

.quote-full-btn:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, .04);
}

.security-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(27, 27, 27, .06);
}

.sec-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(27, 27, 27, .55);
  font-weight: 600;
}

/* empty */
.empty-cart {
  max-width: 440px;
  margin: 80px auto;
  text-align: center;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: #f0f2f5;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: grid;
  place-items: center;
}

.empty-title {
  font-size: 24px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 10px;
}

.empty-sub {
  font-size: 14.5px;
  color: rgba(27, 27, 27, .5);
  margin: 0 0 28px;
  line-height: 1.6;
}

.empty-btn {
  padding: 14px 28px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: background 180ms;
}

.empty-btn:hover {
  background: #005fcd;
}

/* modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .45);
  z-index: 1000;
  display: grid;
  place-items: center;
}

.modal-box {
  background: #fff;
  border-radius: 20px;
  padding: 28px 30px;
  max-width: 380px;
  width: calc(100% - 40px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, .2);
}

.modal-title {
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0 0 10px;
}

.modal-sub {
  font-size: 14px;
  color: rgba(27, 27, 27, .6);
  margin: 0 0 24px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-cancel {
  flex: 1;
  height: 46px;
  border: 2px solid rgba(27, 27, 27, .14);
  background: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  color: rgba(27, 27, 27, .65);
  cursor: pointer;
}

.modal-confirm {
  flex: 1;
  height: 46px;
  background: #ff3b30;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: background 150ms;
}

.modal-confirm:hover {
  background: #d93025;
}

/* transitions */
.item-list-enter-active {
  transition: all 300ms ease;
}

.item-list-leave-active {
  transition: all 200ms ease;
}

.item-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.item-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
  height: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.desktop-only {}

/* responsive */
@media (max-width: 960px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary-box {
    position: static;
  }
}

@media (max-width: 640px) {
  .cart-wrap {
    padding: 0 16px;
  }

  .items-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 72px 1fr 44px;
    grid-template-rows: auto auto;
    gap: 10px;
  }

  .item-price.desktop-only {
    display: none;
  }

  .item-price-mobile {
    display: block;
  }

  .item-qty {
    grid-column: 1;
    grid-row: 2;
    justify-self: start;
  }

  .item-line-total {
    font-size: 14px;
    text-align: right;
  }

  .item-remove {
    grid-column: 3;
    grid-row: 1;
    align-self: start;
  }
}
</style>
