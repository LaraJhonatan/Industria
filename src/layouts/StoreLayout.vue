<template>
  <q-layout view="hHh lpR fff" class="bs-layout">

    <!-- ══════════════════════════════════════════════════════
         HEADER DE LA TIENDA
    ═══════════════════════════════════════════════════════ -->
    <q-header :class="['bs-header', { 'bs-header--scrolled': scrolled }]" height-hint="96">
      <q-toolbar class="bs-toolbar">

        <!-- Logo -->
        <router-link to="/" class="bs-brand">NovaIndustria</router-link>

        <!-- Nav links tienda -->
        <nav class="bs-nav gt-sm" aria-label="Navegación tienda">
          <q-btn flat dense label="Catálogo" class="bs-link" :class="{ 'bs-link--active': route.path === '/tienda' }"
            @click="router.push('/tienda')" />
          <q-btn flat dense label="Drones" class="bs-link"
            :class="{ 'bs-link--active': route.path.includes('/tienda/drones') }"
            @click="router.push('/tienda/drones')" />
          <q-btn flat dense label="Filamentos" class="bs-link"
            :class="{ 'bs-link--active': route.path.includes('/tienda/filamentos') }"
            @click="router.push('/tienda/filamentos')" />
        </nav>

        <!-- Buscador -->
        <div class="bs-search gt-sm">
          <svg class="bs-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="bs-search-inp" type="text" placeholder="Buscar productos..."
            @keydown.enter="handleSearch" />
        </div>

        <q-space />

        <!-- Acciones derecha desktop -->
        <div class="row items-center no-wrap q-gutter-sm gt-sm">
          <!-- Carrito -->
          <q-btn flat round dense class="bs-link bs-cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <transition name="badge-pop">
              <span v-if="cartStore.totalItems > 0" class="bs-badge">
                {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
              </span>
            </transition>
          </q-btn>

          <q-btn flat dense label="Ingresar" class="bs-link" />
          <q-btn unelevated label="Cotizar" class="bs-signup" @click="router.push('/contacto')" />
        </div>

        <!-- Mobile: carrito + hamburger -->
        <div class="row items-center no-wrap q-gutter-xs lt-md">
          <q-btn flat round dense class="bs-link bs-cart-btn" @click="router.push('/carrito')" aria-label="Ver carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <transition name="badge-pop">
              <span v-if="cartStore.totalItems > 0" class="bs-badge">
                {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
              </span>
            </transition>
          </q-btn>
          <q-btn flat round dense icon="menu" class="bs-link bs-menu" aria-label="Abrir menú"
            @click="drawer = !drawer" />
        </div>

      </q-toolbar>
    </q-header>

    <!-- ══════════════════════════════════════════════════════
         DRAWER MOBILE
    ═══════════════════════════════════════════════════════ -->
    <q-drawer v-model="drawer" side="right" overlay class="bs-drawer lt-md">
      <div class="q-pa-md">
        <div class="text-weight-bold q-mb-sm">Tienda</div>
        <q-list padding>
          <q-item clickable v-ripple @click="nav('/tienda')">
            <q-item-section>🏪 Catálogo completo</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="nav('/tienda/drones')">
            <q-item-section>🚁 Drones</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="nav('/tienda/filamentos')">
            <q-item-section>🎨 Filamentos</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="nav('/carrito')">
            <q-item-section>
              🛒 Carrito
              <q-badge v-if="cartStore.totalItems > 0" color="negative" floating>
                {{ cartStore.totalItems }}
              </q-badge>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="bs-mob-divider q-my-sm" />

        <q-list padding>
          <q-item clickable v-ripple @click="nav('/')">
            <q-item-section class="text-grey-6">← Volver al sitio principal</q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-md row q-gutter-sm">
          <q-btn outline class="full-width bs-outline" label="Ingresar" />
          <q-btn unelevated class="full-width bs-signup" label="Cotizar" @click="nav('/contacto')" />
        </div>
      </div>
    </q-drawer>

    <!-- ══════════════════════════════════════════════════════
         CONTENIDO
    ═══════════════════════════════════════════════════════ -->
    <q-page-container class="bs-page">
      <router-view />
    </q-page-container>

    <!-- ══════════════════════════════════════════════════════
         FOOTER — idéntico al MainLayout
    ═══════════════════════════════════════════════════════ -->
    <q-footer class="bs-footer">
      <div class="bs-footer-wrap">
        <div class="bs-footer-top">
          <div class="bs-foot-brand">
            <div class="bs-foot-logo" aria-hidden="true">
              <span class="bar b1" />
              <span class="bar b2" />
              <span class="bar b3" />
            </div>
            <div class="bs-foot-brand-text">
              <div class="bs-foot-name">NovaIndustria</div>
              <div class="bs-foot-tag">
                Importación de maquinaria, ingeniería a medida y soporte técnico confiable.
              </div>
            </div>
          </div>

          <div class="bs-foot-right">
            <div class="bs-foot-contact">
              <a class="bs-foot-contact-link" href="tel:+576001234567">+57 (600) 123-4567</a>
              <a class="bs-foot-contact-link" href="mailto:hola@novaindustria.com">hola@novaindustria.com</a>
            </div>
            <span class="bs-vline" aria-hidden="true" />
            <div class="bs-foot-social" aria-label="Redes sociales">
              <a class="bs-social" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="3.3" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a class="bs-social" href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M14 6c1.2 2.2 3.2 3.6 6 3.8v2.6c-2.6-.1-4.6-1.1-6-2.6v6.1a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8 0 1.2.1v2.7a2.7 2.7 0 1 0 2.8 2.7V4h1.2z" />
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
              <a class="bs-social" href="#" aria-label="X">
                <svg viewBox="0 0 24 24" class="bs-ico" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M6 18L18 6" />
                  <path d="M8 6h5l3 4v8" />
                  <path d="M16 18h-5l-3-4V6" />
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
            <a class="bs-foot-link" href="#">Terms of Use</a>
            <a class="bs-foot-link" href="#">Privacy Policy</a>
            <a class="bs-foot-link" href="#">GDPR</a>
            <a class="bs-foot-link bs-status" href="#">
              <span class="bs-dot" aria-hidden="true" />
              System status
            </a>
          </div>
          <div class="bs-foot-copy">
            © {{ year }} NovaIndustria, S.A.S. v.1.0.3
            <a class="bs-ext" href="#" aria-label="Abrir enlace">
              <svg viewBox="0 0 24 24" class="bs-ico-sm" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M14 3h7v7" />
                <path d="M10 14L21 3" />
                <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </q-footer>

    <!-- WhatsApp float — idéntico al MainLayout -->
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from 'src/stores/cart.js'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const drawer = ref(false)
const scrolled = ref(false)
const searchQuery = ref('')
const year = new Date().getFullYear()

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function nav(path) {
  drawer.value = false
  router.push(path)
}

function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push(`/tienda?q=${encodeURIComponent(q)}`)
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   MISMO ESTILO QUE MAINLAYOUT
   + añadidos específicos de la tienda
════════════════════════════════════════════ */
.bs-layout {
  background: #ffffff;
  color: #0b1220;
}

.bs-page {
  background: transparent;
}

/* HEADER */
.bs-header {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.10);
}

.bs-header--scrolled {
  background: rgba(255, 255, 255, 0.94);
  border-bottom-color: rgba(15, 23, 42, 0.14);
}

.bs-toolbar {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  min-height: 96px;
  gap: 12px;
}

.bs-brand {
  color: #0b1220;
  text-decoration: none;
  font-weight: 900;
  letter-spacing: 0.2px;
  font-size: 22px;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.bs-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 18px;
}

.bs-link {
  color: rgba(11, 18, 32, 0.78) !important;
  text-transform: none;
  font-weight: 800;
  letter-spacing: 0.15px;
  border-radius: 999px;
  padding: 0 14px;
  min-height: 44px;
}

.bs-link:hover {
  color: rgba(11, 18, 32, 0.95) !important;
  background: rgba(0, 113, 227, 0.08);
}

.bs-link :deep(.q-btn__content) {
  font-size: 15px;
  line-height: 1;
}

.bs-link--active {
  color: #0071e3 !important;
  background: rgba(0, 113, 227, 0.08);
}

.bs-signup {
  background: #0071e3;
  color: #fff;
  border-radius: 999px;
  height: 46px;
  padding: 0 22px;
  text-transform: none;
  font-weight: 900;
  font-size: 15px;
  box-shadow: 0 14px 34px rgba(2, 6, 23, 0.14);
}

.bs-signup:hover {
  background: #0066cc;
}

.bs-outline {
  border-radius: 999px;
  text-transform: none;
  font-weight: 900;
  min-height: 46px;
}

.bs-menu :deep(.q-icon) {
  font-size: 28px;
}

/* DRAWER */
.bs-drawer {
  background: rgba(255, 255, 255, 0.98);
  color: #0b1220;
  border-left: 1px solid rgba(15, 23, 42, 0.10);
}

.bs-mob-divider {
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
}

/* Buscador */
.bs-search {
  flex: 1;
  max-width: 340px;
  position: relative;
  display: flex;
  align-items: center;
}

.bs-search-ico {
  position: absolute;
  left: 11px;
  color: rgba(27, 27, 27, 0.38);
  pointer-events: none;
}

.bs-search-inp {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 34px;
  border: 1.5px solid rgba(27, 27, 27, 0.12);
  border-radius: 10px;
  font-size: 13.5px;
  color: #1b1b1b;
  background: #f7f8fb;
  outline: none;
  transition: border-color 160ms, background 160ms, box-shadow 160ms;
  font-family: inherit;
}

.bs-search-inp:focus {
  border-color: #0071e3;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
}

.bs-search-inp::placeholder {
  color: rgba(27, 27, 27, 0.38);
}

/* Carrito */
.bs-cart-btn {
  position: relative;
  width: 42px !important;
  height: 42px !important;
  border-radius: 10px !important;
  border: 1.5px solid rgba(27, 27, 27, 0.12) !important;
}

.bs-cart-btn:hover {
  background: rgba(0, 113, 227, 0.06) !important;
  border-color: rgba(0, 113, 227, 0.2) !important;
}

.bs-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 19px;
  height: 19px;
  padding: 0 4px;
  background: #ff3b30;
  color: #fff;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
  line-height: 1;
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

/* FOOTER */
.bs-footer {
  background: #ffffff;
  border-top: 1px solid rgba(15, 23, 42, 0.10);
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
  gap: 14px;
  min-width: 320px;
}

.bs-foot-logo {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(0, 113, 227, 0.08);
  border: 1px solid rgba(0, 113, 227, 0.18);
  gap: 3px;
  padding: 6px;
}

.bs-foot-logo .bar {
  display: block;
  width: 100%;
  border-radius: 999px;
  background: rgba(0, 113, 227, 0.92);
}

.bs-foot-logo .b1 {
  height: 3px;
  opacity: 0.9;
}

.bs-foot-logo .b2 {
  height: 6px;
  opacity: 0.7;
}

.bs-foot-logo .b3 {
  height: 10px;
  opacity: 0.55;
}

.bs-foot-name {
  color: #0b1220;
  font-weight: 900;
  font-size: 16px;
  line-height: 1.1;
}

.bs-foot-tag {
  margin-top: 6px;
  color: rgba(11, 18, 32, 0.60);
  font-size: 13px;
  line-height: 1.35;
  max-width: 460px;
}

.bs-foot-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  min-width: 520px;
}

.bs-foot-contact {
  display: flex;
  align-items: center;
  gap: 18px;
}

.bs-foot-contact-link {
  color: rgba(11, 18, 32, 0.65);
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
}

.bs-foot-contact-link:hover {
  color: rgba(11, 18, 32, 0.95);
}

.bs-vline {
  width: 1px;
  height: 18px;
  background: rgba(15, 23, 42, 0.14);
  flex: 0 0 auto;
}

.bs-foot-social {
  display: flex;
  align-items: center;
  gap: 10px;
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
  transition: border-color 200ms, background 200ms, color 200ms, transform 200ms;
}

.bs-social:hover {
  color: #0071e3;
  border-color: rgba(0, 113, 227, 0.35);
  background: rgba(0, 113, 227, 0.10);
  transform: translateY(-1px);
}

.bs-ico {
  width: 16px;
  height: 16px;
}

.bs-ico-sm {
  width: 14px;
  height: 14px;
}

.bs-foot-hr {
  height: 1px;
  background: rgba(15, 23, 42, 0.10);
  margin: 24px 0 18px;
}

.bs-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.bs-foot-links {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
}

.bs-foot-link {
  color: rgba(11, 18, 32, 0.55);
  text-decoration: none;
  font-weight: 800;
  font-size: 12px;
}

.bs-foot-link:hover {
  color: rgba(11, 18, 32, 0.92);
}

.bs-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.bs-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.14);
}

.bs-foot-copy {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(11, 18, 32, 0.55);
  font-weight: 800;
  font-size: 12px;
  white-space: nowrap;
}

.bs-ext {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: rgba(11, 18, 32, 0.60);
  text-decoration: none;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(2, 6, 23, 0.03);
}

.bs-ext:hover {
  color: #0071e3;
  border-color: rgba(0, 113, 227, 0.35);
  background: rgba(0, 113, 227, 0.10);
}

/* WhatsApp */
.bs-whatsapp-float {
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
  transition: transform 0.3s ease;
  z-index: 999;
  text-decoration: none;
}

.bs-whatsapp-float:hover {
  transform: scale(1.1);
}

.bs-whatsapp-icon {
  width: 32px;
  height: 32px;
}

.bs-whatsapp-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #25d366;
  border-radius: 50%;
  z-index: -1;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .bs-foot-right {
    min-width: 0;
  }

  .bs-foot-tag {
    max-width: 360px;
  }

  .bs-search {
    max-width: 220px;
  }
}

@media (max-width: 900px) {
  .bs-footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .bs-foot-right {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .bs-vline {
    display: none;
  }
}

@media (max-width: 600px) {
  .bs-toolbar {
    padding: 0 16px;
    min-height: 84px;
  }

  .bs-footer-wrap {
    padding: 20px 16px;
  }

  .bs-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .bs-foot-copy {
    white-space: normal;
  }

  .bs-whatsapp-float {
    width: 52px;
    height: 52px;
  }
}
</style>
