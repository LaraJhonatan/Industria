<template>
  <q-layout view="hHh lpR fff" class="bs-layout">

    <q-header :class="['bs-header', { 'bs-header--scrolled': scrolled }]" height-hint="72">
      <q-toolbar class="bs-toolbar">

        <router-link to="/" class="bs-brand">
          <img src="/IconoZ.png" alt="ZiFux" class="bs-logo-img" />
        </router-link>

        <router-link to="/tienda" class="bs-catalogo-link gt-sm" exact-active-class="bs-catalogo-link--active">
          Catálogo
        </router-link>

        <div class="bs-search gt-sm">
          <svg class="search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="search-inp" type="text" placeholder="Buscar empresas o productos..."
            @keydown.enter="handleSearch" />
        </div>

        <q-space />

        <div class="row items-center no-wrap q-gutter-sm gt-sm">
          <button class="bs-cart-btn" @click="router.push('/tienda/carrito')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
          <button class="bs-signup-btn" @click="router.push('/auth')">Regístrate / Inicia Sesión</button>
        </div>

        <q-btn flat round dense icon="menu" class="lt-md bs-menu-btn" @click="drawer = !drawer" />

      </q-toolbar>
    </q-header>

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

        <div class="mob-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            style="position:absolute;left:11px;top:50%;transform:translateY(-50%);opacity:.4;pointer-events:none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="mob-search-inp" placeholder="Buscar..."
            @keydown.enter="handleSearch(); drawer = false" />
        </div>

        <nav class="drawer-nav">
          <router-link to="/tienda" class="drawer-link drawer-link--tienda"
            @click="drawer = false">Catálogo</router-link>
          <div class="drawer-divider" />
          <router-link to="/" class="drawer-link drawer-link--back" @click="drawer = false">← Volver al sitio
            principal</router-link>
        </nav>

        <div class="drawer-actions">
          <button class="drawer-btn-fill" @click="router.push('/auth'); drawer = false">Regístrate / Inicia
            Sesión</button>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="bs-page">
      <router-view />
    </q-page-container>

    <q-footer class="bs-footer">
      <div class="bs-footer-wrap">
        <div class="bs-footer-top">
          <div class="bs-foot-brand">
            <img src="/IconoZ.png" alt="ZiFux" class="foot-logo-img" />
            <div class="bs-foot-brand-text">
              <div class="bs-foot-name">ZiFux</div>
              <div class="bs-foot-tag">Marketplace B2B — conecta empresas, servicios y productos industriales.</div>
            </div>
          </div>
          <div class="bs-foot-right">
            <div class="bs-foot-contact">
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
            </div>
          </div>
        </div>
        <div class="bs-foot-hr" />
        <div class="bs-footer-bottom">
          <div class="bs-foot-links">
            <a class="bs-foot-link" href="#">Términos de uso</a>
            <a class="bs-foot-link" href="#">Política de privacidad</a>
            <a class="bs-foot-link bs-status" href="#"><span class="bs-dot" />Sistema operativo</a>
          </div>
          <div class="bs-foot-copy">© {{ year }} ZiFux S.A.S.</div>
        </div>
      </div>
    </q-footer>

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
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)
const scrolled = ref(false)
const searchQuery = ref('')
const year = new Date().getFullYear()

function onScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push(`/tienda?q=${encodeURIComponent(q)}`)
}
</script>

<style scoped>
.bs-layout {
  background: #fff;
  color: #0b1220;
}

.bs-page {
  background: transparent;
}

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
  gap: 8px;
}

.bs-brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.bs-logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  display: block;
}

.bs-catalogo-link {
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  height: 38px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.72);
  text-decoration: none;
  white-space: nowrap;
  transition: color 160ms, background 160ms;
  flex-shrink: 0;
}

.bs-catalogo-link:hover {
  color: #0b1220;
  background: rgba(0, 113, 227, 0.06);
}

.bs-catalogo-link--active {
  color: #0071e3 !important;
  background: rgba(0, 113, 227, 0.06);
}

.bs-search {
  flex: 1;
  max-width: 420px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 4px;
}

.search-ico {
  position: absolute;
  left: 11px;
  opacity: .38;
  pointer-events: none;
}

.search-inp {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 34px;
  border: 1px solid rgba(15, 23, 42, 0.13);
  border-radius: 10px;
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
  color: rgba(11, 18, 32, 0.35);
}

.bs-cart-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.13);
  background: rgba(0, 0, 0, 0.025);
  color: rgba(11, 18, 32, 0.65);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 150ms, background 150ms, color 150ms;
  flex-shrink: 0;
}

.bs-cart-btn:hover {
  border-color: #0071e3;
  background: rgba(0, 113, 227, 0.06);
  color: #0071e3;
}

.bs-signup-btn {
  height: 38px;
  padding: 0 24px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 160ms;
  white-space: nowrap;
  flex-shrink: 0;
}

.bs-signup-btn:hover {
  background: #005fcd;
}

.bs-menu-btn {
  color: rgba(11, 18, 32, 0.72) !important;
}

.bs-drawer {
  background: #fff !important;
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
  object-fit: contain;
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
  color: rgba(11, 18, 32, 0.35);
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
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #0b1220;
  text-decoration: none;
  transition: background 140ms;
}

.drawer-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.drawer-link--tienda {
  background: #0071e3;
  color: #fff;
  font-weight: 900;
  margin-bottom: 4px;
}

.drawer-link--tienda:hover {
  background: #005fcd;
}

.drawer-link--back {
  color: rgba(11, 18, 32, 0.45);
  font-size: 13.5px;
}

.drawer-divider {
  height: 1px;
  background: rgba(15, 23, 42, 0.08);
  margin: 6px 0;
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
  background: #005fcd;
}

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
  gap: 14px;
}

.foot-logo-img {
  height: 32px;
  object-fit: contain;
}

.bs-foot-name {
  font-weight: 900;
  font-size: 16px;
  color: #0b1220;
  line-height: 1.1;
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
  gap: 18px;
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
  background: rgba(15, 23, 42, 0.12);
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
  height: 16px;
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
  gap: 20px;
}

.bs-foot-link {
  color: rgba(11, 18, 32, 0.5);
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
}

.bs-foot-link:hover {
  color: #0b1220;
}

.bs-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  transform: scale(1.08);
}

.bs-whatsapp-icon {
  width: 28px;
  height: 28px;
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
    opacity: .55;
  }

  100% {
    transform: scale(1.65);
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .bs-footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .bs-foot-right {
    flex-wrap: wrap;
  }

  .bs-vline {
    display: none;
  }
}

@media (max-width: 600px) {
  .bs-toolbar {
    padding: 0 16px;
    min-height: 64px;
  }

  .bs-footer-wrap {
    padding: 20px 16px;
  }

  .bs-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
