<template>
  <q-layout view="hHh lpR fff" class="bs-layout">

    <!-- ══════════════════════════════════════════════
         HEADER
    ═══════════════════════════════════════════════ -->
    <q-header :class="['bs-header', { 'bs-header--scrolled': scrolled }]" height-hint="72">
      <q-toolbar class="bs-toolbar">

        <!-- Logo -->
        <router-link to="/" class="bs-brand">
          <img src="/IconoZ.png" alt="ZiFux" class="bs-logo-img" />
        </router-link>

        <!-- Nav desktop — links de tienda -->
        <nav class="bs-nav gt-sm" aria-label="Navegación tienda">
          <router-link to="/tienda" class="bs-link" exact-active-class="bs-link--active">
            Catálogo
          </router-link>

          <!-- Dropdown categorías dinámico -->
          <div v-for="cat in STORE_CATEGORIES" :key="cat.id" class="bs-dropdown-wrap" @mouseenter="openMenu(cat.id)"
            @mouseleave="closeMenu()">
            <button class="bs-link bs-link-arrow" :class="{ 'bs-link--active': activeMenu === cat.id }"
              @click="router.push(`/tienda/${cat.id}`)">
              {{ cat.title }}
              <svg class="arrow-ico" :class="{ 'arrow-open': activeMenu === cat.id }" width="12" height="12"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <Transition name="drop">
              <div v-if="activeMenu === cat.id" class="bs-dropdown" @mouseenter="cancelClose" @mouseleave="closeMenu()">
                <div class="drop-header">
                  <span class="drop-label">{{ cat.kicker }}</span>
                  <router-link :to="`/tienda/${cat.id}`" class="drop-ver-todos" @click="activeMenu = null">
                    Ver todos →
                  </router-link>
                </div>
                <router-link v-for="sub in cat.subcategories" :key="sub.id" :to="`/tienda/${cat.id}?sub=${sub.id}`"
                  class="drop-item" @click="activeMenu = null">
                  <div class="drop-item-icon"
                    :style="{ background: hexAlpha(cat.accentColor, 0.10), borderColor: hexAlpha(cat.accentColor, 0.22), color: cat.accentColor }">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4" />
                    </svg>
                  </div>
                  <div>
                    <div class="drop-item-title">{{ sub.name }}</div>
                    <div v-if="sub.count" class="drop-item-sub">{{ sub.count }} productos</div>
                  </div>
                </router-link>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Buscador desktop -->
        <div class="bs-search gt-sm">
          <svg class="search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="search-inp" type="text" placeholder="Buscar productos..."
            @keydown.enter="handleSearch" />
        </div>

        <q-space />

        <!-- Acciones desktop -->
        <div class="row items-center no-wrap q-gutter-sm gt-sm">
          <!-- Carrito -->
          <button class="bs-cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
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
          <button class="bs-signup-btn" @click="router.push('/auth')">
            Regístrate / Inicia Sesión
          </button>
        </div>

        <!-- Móvil: carrito + burger -->
        <div class="nav-mobile lt-md">
          <button class="bs-cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
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
          <q-btn flat round dense icon="menu" class="bs-menu-btn" @click="drawer = !drawer" />
        </div>

      </q-toolbar>
    </q-header>

    <!-- ══════════════════════════════════════════════
         DRAWER MOBILE
    ═══════════════════════════════════════════════ -->
    <q-drawer v-model="drawer" side="right" overlay class="bs-drawer lt-md">
      <div class="drawer-inner">
        <div class="drawer-head">
          <img src="/IconoZ.png" alt="ZiFux" class="drawer-logo" />
          <button class="drawer-close" @click="drawer = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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

        <nav class="drawer-nav">
          <router-link to="/tienda" class="drawer-link drawer-link--tienda" @click="drawer = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Catálogo general
          </router-link>

          <!-- Categorías dinámicas en móvil -->
          <div v-for="cat in STORE_CATEGORIES" :key="cat.id" class="drawer-section">
            <button class="drawer-section-btn" @click="mobileOpen[cat.id] = !mobileOpen[cat.id]">
              {{ cat.title }}
              <svg :class="{ 'rotate-180': mobileOpen[cat.id] }" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div v-if="mobileOpen[cat.id]" class="drawer-sub">
              <router-link v-for="sub in cat.subcategories" :key="sub.id" :to="`/tienda/${cat.id}?sub=${sub.id}`"
                class="drawer-sub-link" @click="drawer = false">
                {{ sub.name }}
              </router-link>
            </div>
          </div>

          <div class="drawer-divider" />

          <router-link to="/carrito" class="drawer-link" @click="drawer = false">
            Carrito
            <span v-if="cartStore.totalItems > 0" class="mob-cart-badge">
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <router-link to="/" class="drawer-link drawer-link--back" @click="drawer = false">
            ← Volver al sitio principal
          </router-link>
        </nav>

        <div class="drawer-actions">
          <button class="drawer-btn-fill" @click="router.push('/auth'); drawer = false">
            Regístrate / Inicia Sesión
          </button>
        </div>
      </div>
    </q-drawer>

    <!-- CONTENIDO -->
    <q-page-container class="bs-page">
      <router-view />
    </q-page-container>

    <!-- ══════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════ -->
    <q-footer class="bs-footer">
      <div class="bs-footer-wrap">
        <div class="bs-footer-top">
          <div class="bs-foot-brand">
            <img src="/IconoZ.png" alt="ZiFux" class="foot-logo-img" />
            <div class="bs-foot-brand-text">
              <div class="bs-foot-name">ZiFux</div>
              <div class="bs-foot-tag">
                Importación de maquinaria, ingeniería a medida y soporte técnico confiable.
              </div>
            </div>
          </div>

          <div class="bs-foot-right">
            <div class="bs-foot-contact">
              <a class="bs-foot-contact-link" href="tel:+576001234567">+57 (600) 123-4567</a>
              <a class="bs-foot-contact-link" href="mailto:hola@zifux.com">hola@zifux.com</a>
            </div>
            <span class="bs-vline" />
            <div class="bs-foot-social">
              <a class="bs-social" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="3.3" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a class="bs-social" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M6.5 9.5V19" />
                  <path d="M6.5 6.2h.01" />
                  <path d="M10 19v-5.2c0-2 1.2-3.3 3-3.3s3 1.3 3 3.3V19" />
                  <path d="M10 10.2V19" />
                </svg>
              </a>
              <a class="bs-social" href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M14 6c1.2 2.2 3.2 3.6 6 3.8v2.6c-2.6-.1-4.6-1.1-6-2.6v6.1a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8 0 1.2.1v2.7a2.7 2.7 0 1 0 2.8 2.7V4h1.2z" />
                </svg>
              </a>
              <a class="bs-social" href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M21 12s0-3.3-.4-4.7a2.3 2.3 0 0 0-1.6-1.6C17.6 5 12 5 12 5s-5.6 0-7 .7A2.3 2.3 0 0 0 3.4 7.3C3 8.7 3 12 3 12s0 3.3.4 4.7A2.3 2.3 0 0 0 5 18.3c1.4.7 7 .7 7 .7s5.6 0 7-.7a2.3 2.3 0 0 0 1.6-1.6C21 15.3 21 12 21 12z" />
                  <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="bs-foot-hr" />

        <div class="bs-footer-bottom">
          <div class="bs-foot-links">
            <a class="bs-foot-link" href="#">Términos de uso</a>
            <a class="bs-foot-link" href="#">Política de privacidad</a>
            <a class="bs-foot-link bs-status" href="#">
              <span class="bs-dot" />Sistema operativo
            </a>
          </div>
          <div class="bs-foot-copy">© {{ year }} ZiFux S.A.S.</div>
        </div>
      </div>
    </q-footer>

    <!-- WhatsApp -->
    <q-page-sticky position="bottom-right" :offset="[24, 24]" class="z-fab">
      <a href="https://wa.me/573001234567" target="_blank" class="bs-whatsapp-float">
        <div class="bs-whatsapp-pulse" />
        <svg viewBox="0 0 24 24" class="bs-whatsapp-icon" fill="currentColor">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </q-page-sticky>

  </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from 'src/stores/cart.js'
import { STORE_CATEGORIES } from 'src/data/store-products.js'

const router = useRouter()
const cartStore = useCartStore()

const drawer = ref(false)
const scrolled = ref(false)
const searchQuery = ref('')
const activeMenu = ref(null)
const year = new Date().getFullYear()

// Estado de acordeones móvil — uno por cada categoría
const mobileOpen = reactive(
  Object.fromEntries(STORE_CATEGORIES.map(c => [c.id, false]))
)

let closeTimer = null
function openMenu(name) { clearTimeout(closeTimer); activeMenu.value = name }
function closeMenu() { closeTimer = setTimeout(() => { activeMenu.value = null }, 120) }
function cancelClose() { clearTimeout(closeTimer) }

function onScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push(`/tienda?q=${encodeURIComponent(q)}`)
}

// Helper color con opacidad
function hexAlpha(hex = '#000000', alpha = 1) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
</script>

<style scoped>
/* ══ Layout ══════════════════════════════════════ */
.bs-layout {
  background: #fff;
  color: #0b1220
}

.bs-page {
  background: transparent
}

/* ══ Header ══════════════════════════════════════ */
.bs-header {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.09);
  transition: background 260ms, box-shadow 260ms;
}

.bs-header--scrolled {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  border-bottom-color: rgba(15, 23, 42, 0.13);
}

.bs-toolbar {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  min-height: 72px;
  gap: 4px;
}

/* Logo */
.bs-brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0
}

.bs-logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  display: block
}

/* Nav */
.bs-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 20px;
}

.bs-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 12px;
  height: 38px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.72);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 160ms, background 160ms;
  white-space: nowrap;
}

.bs-link:hover,
.bs-link--active {
  color: #0b1220;
  background: rgba(0, 113, 227, 0.06);
}

.bs-link--active {
  color: #0071e3 !important
}

.arrow-ico {
  transition: transform 200ms;
  opacity: .55;
  flex-shrink: 0;
}

.arrow-open {
  transform: rotate(180deg);
  opacity: .9
}

/* Buscador */
.bs-search {
  flex: 1;
  max-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.search-ico {
  position: absolute;
  left: 10px;
  opacity: .38;
  pointer-events: none;
}

.search-inp {
  width: 100%;
  height: 36px;
  padding: 0 14px 0 32px;
  border: 1px solid rgba(15, 23, 42, 0.13);
  border-radius: 8px;
  font-size: 13.5px;
  color: #0b1220;
  background: rgba(0, 0, 0, 0.025);
  outline: none;
  font-family: inherit;
  transition: border-color 150ms, box-shadow 150ms;
}

.search-inp:focus {
  border-color: #0071e3;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.10);
}

.search-inp::placeholder {
  color: rgba(11, 18, 32, 0.35)
}

/* Carrito */
.bs-cart-btn {
  position: relative;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(15, 23, 42, 0.13);
  border-radius: 8px;
  background: none;
  display: grid;
  place-items: center;
  color: rgba(11, 18, 32, 0.65);
  cursor: pointer;
  transition: all 140ms;
}

.bs-cart-btn:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.06);
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
  transition: all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)
}

.badge-pop-enter-from,
.badge-pop-leave-to {
  opacity: 0;
  transform: scale(0.3)
}

/* Botón signup */
.bs-signup-btn {
  height: 38px;
  padding: 0 24px;
  background: #0b1220;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 160ms;
  white-space: nowrap;
}

.bs-signup-btn:hover {
  background: #0071e3
}

/* Burger mobile */
.nav-mobile {
  display: flex;
  align-items: center;
  gap: 8px
}

.bs-menu-btn {
  color: rgba(11, 18, 32, 0.72) !important
}

/* ══ DROPDOWN ════════════════════════════════════ */
.bs-dropdown-wrap {
  position: relative
}

.bs-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
  max-height: 420px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 8px;
  z-index: 9999;
}

.drop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 10px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.07);
  margin-bottom: 6px;
}

.drop-label {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(11, 18, 32, 0.40);
}

.drop-ver-todos {
  font-size: 12px;
  font-weight: 800;
  color: #0071e3;
  text-decoration: none;
}

.drop-ver-todos:hover {
  text-decoration: underline
}

.drop-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #0b1220;
  transition: background 140ms;
}

.drop-item:hover {
  background: rgba(0, 113, 227, 0.05)
}

.drop-item-icon {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid;
  display: grid;
  place-items: center;
}

.drop-item-title {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2
}

.drop-item-sub {
  font-size: 11px;
  color: rgba(11, 18, 32, 0.42);
  margin-top: 1px
}

/* Transitions dropdown */
.drop-enter-active {
  transition: opacity 160ms ease, transform 160ms ease
}

.drop-leave-active {
  transition: opacity 120ms ease, transform 120ms ease
}

.drop-enter-from {
  opacity: 0;
  transform: translateY(-6px) translateX(-50%)
}

.drop-leave-to {
  opacity: 0;
  transform: translateY(-4px) translateX(-50%)
}

/* ══ DRAWER MOBILE ════════════════════════════════ */
.bs-drawer {
  background: #fff !important
}

.drawer-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.drawer-logo {
  height: 30px;
  object-fit: contain
}

.drawer-close {
  width: 34px;
  height: 34px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

/* Buscador móvil */
.mob-search {
  position: relative;
  margin: 12px 14px 4px;
}

.mob-search-inp {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 33px;
  border: 1px solid rgba(15, 23, 42, 0.13);
  border-radius: 8px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.025);
  outline: none;
  font-family: inherit;
}

.mob-search-inp::placeholder {
  color: rgba(11, 18, 32, 0.35)
}

.drawer-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #0b1220;
  text-decoration: none;
  transition: background 140ms;
}

.drawer-link:hover {
  background: rgba(0, 0, 0, 0.04)
}

.drawer-link--tienda {
  background: #0071e3;
  color: #fff;
  font-weight: 900;
  margin-bottom: 4px;
}

.drawer-link--tienda:hover {
  background: #005fcd
}

.drawer-link--back {
  color: rgba(11, 18, 32, 0.45);
  font-size: 13.5px;
}

.drawer-section {
  display: flex;
  flex-direction: column
}

.drawer-section-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #0b1220;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 140ms;
}

.drawer-section-btn svg {
  transition: transform 200ms
}

.rotate-180 {
  transform: rotate(180deg)
}

.drawer-section-btn:hover {
  background: rgba(0, 0, 0, 0.04)
}

.drawer-sub {
  padding: 4px 0 4px 16px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.drawer-sub-link {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.65);
  text-decoration: none;
  transition: background 140ms, color 140ms;
}

.drawer-sub-link:hover {
  background: rgba(0, 113, 227, 0.06);
  color: #0071e3;
}

.drawer-divider {
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
  margin: 6px 0;
}

.mob-cart-badge {
  background: #ef4444;
  color: #fff;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  padding: 2px 7px;
}

.drawer-actions {
  padding: 16px 12px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.drawer-btn-fill {
  width: 100%;
  height: 44px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 160ms;
}

.drawer-btn-fill:hover {
  background: #005fcd
}

/* ══ FOOTER ══════════════════════════════════════ */
.bs-footer {
  background: #fff;
  border-top: 1px solid rgba(15, 23, 42, 0.09);
}

.bs-footer-wrap {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 34px 40px;
}

.bs-footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.bs-foot-brand {
  display: flex;
  align-items: flex-start;
  gap: 14px
}

.foot-logo-img {
  height: 32px;
  object-fit: contain
}

.bs-foot-name {
  font-weight: 900;
  font-size: 16px;
  color: #0b1220;
  line-height: 1.1
}

.bs-foot-tag {
  margin-top: 4px;
  font-size: 13px;
  color: rgba(11, 18, 32, 0.55);
  max-width: 380px;
  line-height: 1.4;
}

.bs-foot-right {
  display: flex;
  align-items: center;
  gap: 18px
}

.bs-foot-contact {
  display: flex;
  align-items: center;
  gap: 18px
}

.bs-foot-contact-link {
  color: rgba(11, 18, 32, 0.65);
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
}

.bs-foot-contact-link:hover {
  color: rgba(11, 18, 32, 0.95)
}

.bs-vline {
  width: 1px;
  height: 18px;
  background: rgba(15, 23, 42, 0.12);
  flex: 0 0 auto;
}

.bs-foot-social {
  display: flex;
  align-items: center;
  gap: 10px
}

.bs-social {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(2, 6, 23, 0.03);
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: rgba(11, 18, 32, 0.70);
  text-decoration: none;
  transition: all 200ms;
}

.bs-social:hover {
  color: #0071e3;
  border-color: rgba(0, 113, 227, 0.35);
  background: rgba(0, 113, 227, 0.10);
  transform: translateY(-1px);
}

.bs-ico {
  width: 16px;
  height: 16px
}

.bs-foot-hr {
  height: 1px;
  background: rgba(15, 23, 42, 0.09);
  margin: 22px 0 16px;
}

.bs-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.bs-foot-links {
  display: flex;
  align-items: center;
  gap: 20px
}

.bs-foot-link {
  color: rgba(11, 18, 32, 0.5);
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
}

.bs-foot-link:hover {
  color: #0b1220
}

.bs-status {
  display: inline-flex;
  align-items: center;
  gap: 8px
}

.bs-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.bs-foot-copy {
  font-size: 12px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.45);
}

/* ══ WhatsApp ═════════════════════════════════════ */
.bs-whatsapp-float {
  position: relative;
  width: 56px;
  height: 56px;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
  text-decoration: none;
  transition: transform 240ms;
}

.bs-whatsapp-float:hover {
  transform: scale(1.08)
}

.bs-whatsapp-icon {
  width: 28px;
  height: 28px
}

.bs-whatsapp-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  animation: pulse-ring 2.2s infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: .55
  }

  100% {
    transform: scale(1.65);
    opacity: 0
  }
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 900px) {
  .bs-footer-top {
    flex-direction: column;
    align-items: flex-start
  }

  .bs-foot-right {
    flex-wrap: wrap
  }

  .bs-vline {
    display: none
  }
}

@media (max-width: 600px) {
  .bs-toolbar {
    padding: 0 16px;
    min-height: 64px
  }

  .bs-footer-wrap {
    padding: 20px 16px
  }

  .bs-footer-bottom {
    flex-direction: column;
    align-items: flex-start
  }
}
</style>
