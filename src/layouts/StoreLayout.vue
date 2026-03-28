<template>
  <q-layout view="hHh lpR fff" class="layout">

    <q-header :class="['nav', { 'nav--scrolled': scrolled }]" height-hint="64">
      <div class="nav-inner">

        <!-- Logo -->
        <router-link to="/" class="nav-logo">
          <img src="/logo.jpeg" alt="ZiFux" class="nav-logo-img" />
        </router-link>

        <!-- Links tienda desktop -->
        <nav class="nav-links gt-sm">
          <router-link to="/tienda" class="nav-item" exact-active-class="nav-item--active">
            Catálogo
          </router-link>
          <router-link to="/tienda/drones" class="nav-item" active-class="nav-item--active">
            Drones
          </router-link>
          <router-link to="/tienda/filamentos" class="nav-item" active-class="nav-item--active">
            Filamentos
          </router-link>
        </nav>

        <!-- Buscador desktop -->
        <div class="nav-search gt-sm">
          <svg class="search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="search-inp" type="text" placeholder="Buscar productos..."
            @keydown.enter="handleSearch" />
        </div>

        <div style="flex:1" />

        <!-- Acciones desktop -->
        <div class="nav-actions gt-sm">
          <button class="cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <transition name="badge-pop">
              <span v-if="cartStore.totalItems > 0" class="cart-badge">
                {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
              </span>
            </transition>
          </button>
          <button class="btn-ghost">Ingresar</button>
          <button class="btn-solid" @click="router.push('/contacto')">Cotizar</button>
        </div>

        <!-- Mobile: carrito + burger -->
        <div class="nav-mobile lt-md">
          <button class="cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <transition name="badge-pop">
              <span v-if="cartStore.totalItems > 0" class="cart-badge">
                {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
              </span>
            </transition>
          </button>
          <button class="nav-burger" @click="drawer = !drawer">
            <span /><span /><span />
          </button>
        </div>

      </div>
    </q-header>

    <!-- DRAWER MOBILE -->
    <q-drawer v-model="drawer" side="right" overlay class="mobile-drawer lt-md">
      <div class="mob-inner">
        <div class="mob-head">
          <img src="/logo.jpeg" alt="ZiFux" class="mob-logo" />
          <button class="mob-close" @click="drawer = false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Buscador mobile -->
        <div class="mob-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            style="position:absolute;left:11px;top:50%;transform:translateY(-50%);opacity:.4;pointer-events:none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="mob-search-inp" placeholder="Buscar productos..."
            @keydown.enter="handleSearch(); drawer = false" />
        </div>

        <nav class="mob-nav">
          <router-link to="/tienda" class="mob-link" exact-active-class="mob-link--active" @click="drawer = false">
            Catálogo
          </router-link>
          <router-link to="/tienda/drones" class="mob-link" active-class="mob-link--active" @click="drawer = false">
            Drones
          </router-link>
          <router-link to="/tienda/filamentos" class="mob-link" active-class="mob-link--active" @click="drawer = false">
            Filamentos
          </router-link>
          <router-link to="/carrito" class="mob-link mob-link--cart" @click="drawer = false">
            Carrito
            <span v-if="cartStore.totalItems > 0" class="mob-cart-count">{{ cartStore.totalItems }}</span>
          </router-link>
          <div class="mob-divider" />
          <router-link to="/" class="mob-link mob-link--back" @click="drawer = false">
            ← Volver al sitio principal
          </router-link>
        </nav>

        <div class="mob-foot">
          <button class="mob-btn-outline">Ingresar</button>
          <button class="mob-btn-fill" @click="router.push('/contacto'); drawer = false">Cotizar</button>
        </div>
      </div>
    </q-drawer>

    <!-- CONTENIDO -->
    <q-page-container style="background:transparent">
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer class="footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <img src="/logo.jpeg" alt="ZiFux" class="footer-logo" />
            <p class="footer-tagline">Importación de maquinaria, ingeniería a medida y soporte técnico confiable.</p>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <p class="footer-col-title">Tienda</p>
              <router-link to="/tienda" class="footer-link">Catálogo</router-link>
              <router-link to="/tienda/drones" class="footer-link">Drones</router-link>
              <router-link to="/tienda/filamentos" class="footer-link">Filamentos</router-link>
              <router-link to="/carrito" class="footer-link">Carrito</router-link>
            </div>
            <div class="footer-col">
              <p class="footer-col-title">Empresa</p>
              <router-link to="/" class="footer-link">Inicio</router-link>
              <router-link to="/ingenieria" class="footer-link">Ingeniería</router-link>
              <router-link to="/servicios-industriales" class="footer-link">Servicios</router-link>
            </div>
            <div class="footer-col">
              <p class="footer-col-title">Contacto</p>
              <a href="tel:+576001234567" class="footer-link">+57 (600) 123-4567</a>
              <a href="mailto:hola@zifux.com" class="footer-link">hola@zifux.com</a>
            </div>
          </div>
        </div>

        <div class="footer-hr" />

        <div class="footer-bottom">
          <p class="footer-copy">© {{ year }} ZiFux S.A.S.</p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.3" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" class="footer-social" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6.5 9.5V19" />
                <path d="M6.5 6.2h.01" />
                <path d="M10 19v-5.2c0-2 1.2-3.3 3-3.3s3 1.3 3 3.3V19" />
                <path d="M10 10.2V19" />
              </svg>
            </a>
            <a href="#" class="footer-social" aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path
                  d="M14 6c1.2 2.2 3.2 3.6 6 3.8v2.6c-2.6-.1-4.6-1.1-6-2.6v6.1a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8 0 1.2.1v2.7a2.7 2.7 0 1 0 2.8 2.7V4h1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </q-footer>

    <!-- WhatsApp -->
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <a href="https://wa.me/573001234567" target="_blank" class="wa-btn">
        <div class="wa-pulse" />
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </q-page-sticky>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cart.js'

const router = useRouter()
const cartStore = useCartStore()
const drawer = ref(false)
const scrolled = ref(false)
const searchQuery = ref('')
const year = new Date().getFullYear()

function onScroll() { scrolled.value = window.scrollY > 8 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push(`/tienda?q=${encodeURIComponent(q)}`)
}
</script>

<style scoped>
/* ── BASE ──────────────────────────────────────── */
.layout {
  background: #fff;
  color: #111;
}

/* ── NAVBAR ────────────────────────────────────── */
.nav {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: background 280ms, box-shadow 280ms;
}

.nav--scrolled {
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  display: flex;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  height: 64px;
  gap: 6px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1px;
  margin-left: 20px;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.58);
  text-decoration: none;
  transition: color 140ms, background 140ms;
  white-space: nowrap;
}

.nav-item:hover {
  color: #111;
  background: rgba(0, 0, 0, 0.05);
}

.nav-item--active {
  color: #1a6fe8 !important;
  background: rgba(26, 111, 232, 0.07);
}

/* Buscador */
.nav-search {
  flex: 1;
  max-width: 320px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.search-ico {
  position: absolute;
  left: 11px;
  opacity: .38;
  pointer-events: none;
}

.search-inp {
  width: 100%;
  height: 36px;
  padding: 0 14px 0 33px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 13.5px;
  color: #111;
  background: rgba(0, 0, 0, 0.03);
  outline: none;
  font-family: inherit;
  transition: border-color 150ms, background 150ms, box-shadow 150ms;
}

.search-inp:focus {
  border-color: #1a6fe8;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(26, 111, 232, 0.1);
}

.search-inp::placeholder {
  color: rgba(17, 17, 17, 0.35);
}

/* Acciones */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 7px;
}

.btn-ghost {
  height: 36px;
  padding: 0 15px;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(17, 17, 17, 0.65);
  cursor: pointer;
  transition: all 140ms;
  letter-spacing: -0.01em;
}

.btn-ghost:hover {
  border-color: rgba(0, 0, 0, 0.22);
  color: #111;
}

.btn-solid {
  height: 36px;
  padding: 0 17px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 140ms;
}

.btn-solid:hover {
  background: #1a6fe8;
}

/* Carrito */
.cart-btn {
  position: relative;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: none;
  display: grid;
  place-items: center;
  color: rgba(17, 17, 17, 0.65);
  cursor: pointer;
  transition: all 140ms;
}

.cart-btn:hover {
  border-color: #1a6fe8;
  color: #1a6fe8;
  background: rgba(26, 111, 232, 0.06);
}

.cart-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: #ef4444;
  color: #fff;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
  pointer-events: none;
}

.badge-pop-enter-active,
.badge-pop-leave-active {
  transition: all 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.badge-pop-enter-from,
.badge-pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

/* Burger */
.nav-mobile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-burger span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: rgba(17, 17, 17, 0.6);
  border-radius: 2px;
}

/* ── DRAWER MOBILE ──────────────────────────────── */
.mobile-drawer {
  background: #fff !important;
}

.mob-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mob-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.mob-logo {
  height: 28px;
  object-fit: contain;
}

.mob-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: none;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.mob-search {
  position: relative;
  margin: 12px 14px 4px;
}

.mob-search-inp {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 33px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.03);
  outline: none;
  font-family: inherit;
}

.mob-search-inp::placeholder {
  color: rgba(17, 17, 17, 0.38);
}

.mob-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mob-link {
  padding: 10px 12px;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 600;
  color: #111;
  text-decoration: none;
  transition: background 130ms;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mob-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.mob-link--active {
  color: #1a6fe8;
  background: rgba(26, 111, 232, 0.07);
}

.mob-link--cart {
  font-weight: 700;
}

.mob-cart-count {
  background: #ef4444;
  color: #fff;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  padding: 2px 7px;
}

.mob-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.07);
  margin: 6px 0;
}

.mob-link--back {
  color: rgba(17, 17, 17, 0.45);
  font-size: 13.5px;
}

.mob-foot {
  padding: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.mob-btn-outline {
  width: 100%;
  height: 44px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  background: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.mob-btn-fill {
  width: 100%;
  height: 44px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 140ms;
}

.mob-btn-fill:hover {
  background: #1a6fe8;
}

/* ── FOOTER ─────────────────────────────────────── */
.footer {
  background: #f9f9f9;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 40px 28px;
}

.footer-top {
  display: flex;
  gap: 56px;
  align-items: flex-start;
}

.footer-brand {
  flex: 0 0 220px;
}

.footer-logo {
  height: 28px;
  object-fit: contain;
  margin-bottom: 12px;
  display: block;
}

.footer-tagline {
  font-size: 13px;
  color: rgba(17, 17, 17, 0.45);
  line-height: 1.6;
  margin: 0;
}

.footer-cols {
  flex: 1;
  display: flex;
  gap: 40px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer-col-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.36);
  margin: 0 0 2px;
}

.footer-link {
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(17, 17, 17, 0.58);
  text-decoration: none;
  transition: color 130ms;
}

.footer-link:hover {
  color: #111;
}

.footer-hr {
  height: 1px;
  background: rgba(0, 0, 0, 0.07);
  margin: 32px 0 20px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-size: 13px;
  color: rgba(17, 17, 17, 0.35);
  margin: 0;
}

.footer-socials {
  display: flex;
  gap: 6px;
}

.footer-social {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(17, 17, 17, 0.5);
  text-decoration: none;
  transition: all 140ms;
}

.footer-social:hover {
  border-color: #1a6fe8;
  color: #1a6fe8;
  background: rgba(26, 111, 232, 0.06);
}

/* ── WHATSAPP ───────────────────────────────────── */
.wa-btn {
  position: relative;
  width: 52px;
  height: 52px;
  background: #22c55e;
  color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-decoration: none;
  box-shadow: 0 3px 12px rgba(34, 197, 94, 0.38);
  transition: transform 200ms;
}

.wa-btn:hover {
  transform: scale(1.06);
}

.wa-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #22c55e;
  animation: wa-ring 2.4s infinite;
  z-index: -1;
}

@keyframes wa-ring {
  0% {
    transform: scale(1);
    opacity: .45;
  }

  100% {
    transform: scale(1.65);
    opacity: 0;
  }
}

/* ── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 960px) {
  .footer-top {
    flex-direction: column;
    gap: 28px;
  }

  .footer-brand {
    flex: none;
  }
}

@media (max-width: 600px) {
  .nav-inner {
    padding: 0 18px;
  }

  .footer-inner {
    padding: 32px 18px 20px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
