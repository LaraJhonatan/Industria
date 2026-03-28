<template>
  <q-layout view="hHh lpR fff" class="bs-layout">

    <!-- ══════════════════════════════════════════════
         HEADER
    ═══════════════════════════════════════════════ -->
    <q-header :class="['bs-header', { 'bs-header--scrolled': scrolled }]" height-hint="72">
      <q-toolbar class="bs-toolbar">

        <!-- Logo -->
        <router-link to="/" class="bs-brand">
          <img src="/logo.jpeg" alt="ZiFux" class="bs-logo-img" />
        </router-link>

        <!-- Nav desktop -->
        <nav class="bs-nav gt-sm" aria-label="Navegación principal">

          <router-link to="/" class="bs-link" exact-active-class="bs-link--active">Inicio</router-link>

          <router-link to="/tienda" class="bs-tienda-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Tienda
          </router-link>

          <!-- Importación dropdown -->
          <div class="bs-dropdown-wrap" @mouseenter="openMenu('importacion')" @mouseleave="closeMenu()">
            <button class="bs-link bs-link-arrow" :class="{ 'bs-link--active': activeMenu === 'importacion' }">
              Importación
              <svg class="arrow-ico" :class="{ 'arrow-open': activeMenu === 'importacion' }" width="12" height="12"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <Transition name="drop">
              <div v-if="activeMenu === 'importacion'" class="bs-dropdown" @mouseenter="cancelClose"
                @mouseleave="closeMenu()">
                <div class="drop-header">
                  <span class="drop-label">Maquinaria disponible</span>
                </div>
                <router-link v-for="maq in maquinas" :key="maq.id" :to="`/maquinaria/${maq.id}`" class="drop-item"
                  @click="activeMenu = null">
                  <div class="drop-item-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <div class="drop-item-title">{{ maq.name }}</div>
                    <div class="drop-item-sub">{{ maq.sub }}</div>
                  </div>
                </router-link>
              </div>
            </Transition>
          </div>

          <!-- Servicios Industriales dropdown -->
          <div class="bs-dropdown-wrap bs-dropdown-wide" @mouseenter="openMenu('servicios')" @mouseleave="closeMenu()">
            <button class="bs-link bs-link-arrow" :class="{ 'bs-link--active': activeMenu === 'servicios' }">
              Servicios industriales
              <svg class="arrow-ico" :class="{ 'arrow-open': activeMenu === 'servicios' }" width="12" height="12"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <Transition name="drop-wide">
              <div v-if="activeMenu === 'servicios'" class="bs-dropdown bs-dropdown--grid" @mouseenter="cancelClose"
                @mouseleave="closeMenu()">
                <div class="drop-header drop-header--full">
                  <span class="drop-label">Servicios especializados</span>
                  <router-link to="/servicios-industriales" class="drop-ver-todos" @click="activeMenu = null">
                    Ver todos →
                  </router-link>
                </div>
                <div class="drop-services-grid">
                  <router-link v-for="srv in serviciosMenu" :key="srv.id" :to="`/servicios-industriales/${srv.id}`"
                    class="drop-srv-item" @click="activeMenu = null">
                    <div class="drop-srv-icon" v-html="srv.icon" />
                    <div class="drop-srv-title">{{ srv.name }}</div>
                  </router-link>
                </div>
              </div>
            </Transition>
          </div>

          <router-link to="/ingenieria" class="bs-link" active-class="bs-link--active">Ingeniería</router-link>

        </nav>

        <q-space />

        <!-- Acciones desktop -->
        <div class="row items-center no-wrap q-gutter-sm gt-sm">
          <button class="bs-link-btn">Ingresar</button>
          <button class="bs-signup-btn">Cotizar</button>
        </div>

        <!-- Menú móvil -->
        <q-btn flat round dense icon="menu" class="lt-md bs-menu-btn" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>

    <!-- ══════════════════════════════════════════════
         DRAWER MOBILE
    ═══════════════════════════════════════════════ -->
    <q-drawer v-model="drawer" side="right" overlay class="bs-drawer lt-md">
      <div class="drawer-inner">
        <div class="drawer-head">
          <img src="/logo.jpeg" alt="ZiFux" class="drawer-logo" />
          <button class="drawer-close" @click="drawer = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav class="drawer-nav">
          <router-link to="/" class="drawer-link" @click="drawer = false">Inicio</router-link>
          <router-link to="/tienda" class="drawer-link drawer-link--tienda" @click="drawer = false">
            Tienda
          </router-link>

          <div class="drawer-section">
            <button class="drawer-section-btn" @click="mobileOpen.importacion = !mobileOpen.importacion">
              Importación
              <svg :class="{ 'rotate-180': mobileOpen.importacion }" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div v-if="mobileOpen.importacion" class="drawer-sub">
              <router-link v-for="maq in maquinas" :key="maq.id" :to="`/maquinaria/${maq.id}`" class="drawer-sub-link"
                @click="drawer = false">
                {{ maq.name }}
              </router-link>
            </div>
          </div>

          <div class="drawer-section">
            <button class="drawer-section-btn" @click="mobileOpen.servicios = !mobileOpen.servicios">
              Servicios industriales
              <svg :class="{ 'rotate-180': mobileOpen.servicios }" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div v-if="mobileOpen.servicios" class="drawer-sub">
              <router-link v-for="srv in serviciosMenu" :key="srv.id" :to="`/servicios-industriales/${srv.id}`"
                class="drawer-sub-link" @click="drawer = false">
                {{ srv.name }}
              </router-link>
            </div>
          </div>

          <router-link to="/ingenieria" class="drawer-link" @click="drawer = false">Ingeniería</router-link>
        </nav>

        <div class="drawer-actions">
          <button class="drawer-btn-outline">Ingresar</button>
          <button class="drawer-btn-fill">Cotizar</button>
        </div>
      </div>
    </q-drawer>

    <!-- ══════════════════════════════════════════════
         CONTENIDO
    ═══════════════════════════════════════════════ -->
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
            <img src="/logo.jpeg" alt="ZiFux" class="foot-logo-img" />
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const drawer = ref(false)
const scrolled = ref(false)
const year = new Date().getFullYear()
const activeMenu = ref(null)
const mobileOpen = ref({ importacion: false, servicios: false })
let closeTimer = null

function openMenu(name) { clearTimeout(closeTimer); activeMenu.value = name }
function closeMenu() { closeTimer = setTimeout(() => { activeMenu.value = null }, 120) }
function cancelClose() { clearTimeout(closeTimer) }

function onScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

const maquinas = [
  { id: 'torno-cnc', name: 'Torno CNC', sub: 'Mecanizado de precisión' },
  { id: 'fresadora', name: 'Fresadora CNC', sub: 'Fresado multieje' },
  { id: 'laser-corte', name: 'Corte láser', sub: 'Lámina y tubería' },
  { id: 'dobladora', name: 'Dobladora', sub: 'Plegado de lámina' },
  { id: 'soldadura', name: 'Equipos de soldadura', sub: 'MIG · TIG · SMAW' },
  { id: 'medicion', name: 'Instrumentos de medición', sub: 'CMM y calibres' },
]

const serviciosMenu = [
  { id: 'corte-laser', name: 'Corte láser', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>` },
  { id: 'diseno-piezas', name: 'Diseño de piezas', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>` },
  { id: 'diseno-industrial', name: 'Diseño industrial', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>` },
  { id: 'cnc', name: 'CNC mecanizado', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>` },
  { id: 'probetas', name: 'Probetas', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/></svg>` },
  { id: 'fibra-carbono', name: 'Fibra de carbono', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
  { id: 'masa-lineal', name: 'Masa lineal', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>` },
  { id: 'doblado', name: 'Doblado', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 6 12 6"/><polyline points="12 6 18 18"/><polyline points="18 18 21 18"/></svg>` },
  { id: 'traccion', name: 'Tracción', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="2" x2="12" y2="22"/><path d="M8 6l4-4 4 4"/><path d="M8 18l4 4 4-4"/></svg>` },
  { id: 'dimensional', name: 'Dimensional', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="2" y1="12" x2="22" y2="12"/><path d="M2 8l4 4-4 4"/><path d="M22 8l-4 4 4 4"/></svg>` },
  { id: 'dureza', name: 'Dureza', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
  { id: 'ensayo-especializado', name: 'Ensayo especializado', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>` },
]
</script>

<style scoped>
/* ══ Layout ══════════════════════════════════════ */
.bs-layout {
  background: #fff;
  color: #0b1220;
}

.bs-page {
  background: transparent;
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
  flex-shrink: 0;
}

.bs-logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  display: block;
}

/* Nav */
.bs-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 24px;
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
  color: #0071e3 !important;
}

.bs-link-arrow {
  font-family: inherit;
}

.arrow-ico {
  transition: transform 200ms;
  opacity: .55;
  flex-shrink: 0;
}

.arrow-open {
  transform: rotate(180deg);
  opacity: .9;
}

/* Tienda pill */
.bs-tienda-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: #0071e3;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 900;
  transition: background 160ms, transform 160ms;
  white-space: nowrap;
}

.bs-tienda-link:hover {
  background: #005fcd;
  transform: translateY(-1px);
}

.bs-tienda-link.router-link-active {
  background: #004ea8;
}

/* Acciones */
.bs-link-btn {
  height: 36px;
  padding: 0 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.72);
  cursor: pointer;
  border-radius: 8px;
  transition: color 160ms, background 160ms;
}

.bs-link-btn:hover {
  color: #0b1220;
  background: rgba(0, 0, 0, 0.04);
}

.bs-signup-btn {
  height: 38px;
  padding: 0 20px;
  background: #0b1220;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 160ms;
}

.bs-signup-btn:hover {
  background: #0071e3;
}

.bs-menu-btn {
  color: rgba(11, 18, 32, 0.72) !important;
}

/* ══ DROPDOWN ════════════════════════════════════ */
.bs-dropdown-wrap {
  position: relative;
}

.bs-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 260px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 8px;
  z-index: 9999;
}

.bs-dropdown--grid {
  left: auto;
  right: 0;
  transform: none;
  min-width: 480px;
}

.drop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 10px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.07);
  margin-bottom: 6px;
}

.drop-header--full {
  width: 100%;
}

.drop-label {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(11, 18, 32, 0.4);
}

.drop-ver-todos {
  font-size: 12px;
  font-weight: 800;
  color: #0071e3;
  text-decoration: none;
}

.drop-ver-todos:hover {
  text-decoration: underline;
}

.drop-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #0b1220;
  transition: background 140ms;
}

.drop-item:hover {
  background: rgba(0, 113, 227, 0.06);
}

.drop-item-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(0, 113, 227, 0.07);
  border: 1px solid rgba(0, 113, 227, 0.14);
  display: grid;
  place-items: center;
  color: #0071e3;
}

.drop-item-title {
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1.2;
}

.drop-item-sub {
  font-size: 11.5px;
  color: rgba(11, 18, 32, 0.45);
  margin-top: 1px;
}

.drop-services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.drop-srv-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #0b1220;
  transition: background 140ms;
}

.drop-srv-item:hover {
  background: rgba(0, 113, 227, 0.06);
}

.drop-srv-icon {
  color: #0071e3;
  display: flex;
  align-items: center;
}

.drop-srv-title {
  font-size: 12px;
  font-weight: 800;
  line-height: 1.3;
}

/* Transitions */
.drop-enter-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.drop-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}

.drop-enter-from {
  opacity: 0;
  transform: translateY(-6px) translateX(-50%);
}

.drop-leave-to {
  opacity: 0;
  transform: translateY(-4px) translateX(-50%);
}

.drop-wide-enter-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.drop-wide-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}

.drop-wide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.drop-wide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ══ DRAWER MOBILE ════════════════════════════════ */
.bs-drawer {
  background: #fff !important;
}

.drawer-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
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
  margin: 4px 0;
}

.drawer-link--tienda:hover {
  background: #005fcd;
}

.drawer-section {
  display: flex;
  flex-direction: column;
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
  transition: transform 200ms;
}

.rotate-180 {
  transform: rotate(180deg);
}

.drawer-section-btn:hover {
  background: rgba(0, 0, 0, 0.04);
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

.drawer-actions {
  padding: 16px 12px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-btn-outline {
  width: 100%;
  height: 44px;
  border: 1.5px solid rgba(15, 23, 42, 0.15);
  border-radius: 12px;
  background: none;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
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

/* ══ Responsive ══════════════════════════════════ */
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
