<template>
  <section class="catalog-section" aria-label="Tienda ZiFux">
    <div class="bs-wrap">

      <!-- ══ HERO ═══════════════════════════════════════ -->
      <div class="hero" v-reveal>
        <div class="hero-text">
          <span class="kicker">Tienda B2B · ZiFux</span>
          <h1 class="hero-title">
            Todo lo que necesitas<br />
            <span class="accent">para construir más.</span>
          </h1>
          <p class="hero-sub">
            {{STORE_CATEGORIES.map(c => c.title).join(', ')}}.
            Envío a toda Colombia.
          </p>
          <div class="hero-btns">
            <button v-for="cat in STORE_CATEGORIES" :key="cat.id" class="hero-btn"
              :style="{ background: cat.accentColor }" @click="router.push(`/tienda/${cat.id}`)">
              {{ cat.title }}
            </button>
          </div>
        </div>

        <div class="hero-map">
          <img src="/mapa.png" alt="Latinoamérica" class="latam-map" />
        </div>
      </div>

      <!-- ══ SECCIÓN HEAD ═══════════════════════════════ -->
      <div class="section-head" v-reveal>
        <h2 class="section-title">Explora nuestros productos</h2>
        <p class="section-sub">
          {{ STORE_CATEGORIES.length }} categorías ·
          {{ totalProducts }} productos disponibles
        </p>
      </div>

      <!-- ══ GRID DINÁMICO ══════════════════════════════ -->
      <!--
        auto-fit + minmax: con 2 cats → 2 col, con 3 → 3 col, con 4 → 2×2, etc.
        Ajusta min(100%, 540px) si quieres cards más anchas/angostas.
      -->
      <div class="categories-grid" v-reveal>
        <div v-for="cat in STORE_CATEGORIES" :key="cat.id" class="cat-card" @click="router.push(`/tienda/${cat.id}`)">
          <!-- Imagen de fondo -->
          <div class="cat-img-wrap">
            <img :src="cat.heroImg" :alt="cat.title" class="cat-img" />
            <div class="cat-overlay" :style="{ background: buildOverlay(cat.color) }" />
          </div>

          <!-- Contenido -->
          <div class="cat-body">
            <span class="cat-kicker">{{ cat.kicker }}</span>

            <h3 class="cat-name">{{ cat.title }}</h3>
            <p class="cat-desc">{{ cat.description }}</p>

            <!-- Subcategorías — máx 4 + contador de resto -->
            <div class="cat-subs">
              <span v-for="sub in cat.subcategories.slice(0, 4)" :key="sub.id" class="cat-sub-chip">
                {{ sub.name }}
              </span>
              <span v-if="cat.subcategories.length > 4" class="cat-sub-chip cat-sub-more">
                +{{ cat.subcategories.length - 4 }} más
              </span>
            </div>

            <!-- Info productos -->
            <div class="cat-meta">
              <span class="cat-prod-count">
                {{ cat.products.length }} productos
              </span>
            </div>

            <button class="cat-btn" :style="{ background: cat.accentColor }">
              Ver {{ cat.title }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ══ CTA BANNER ══════════════════════════════════ -->
      <div class="cta-banner" v-reveal>
        <div>
          <p class="cta-title">¿No encuentras lo que necesitas?</p>
          <p class="cta-sub">Solicítalo y te cotizamos en 24 horas</p>
        </div>
        <button class="cta-btn" @click="router.push('/contacto')">
          Solicitar Producto →
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { STORE_CATEGORIES } from '../../data/store-products.js'

const router = useRouter()

// Total de productos sumando todos los arrays
const totalProducts = computed(() =>
  STORE_CATEGORIES.reduce((acc, cat) => acc + (cat.products?.length ?? 0), 0)
)

// Overlay degradado que usa el color base de la categoría
function buildOverlay(color) {
  return `linear-gradient(160deg, ${hexAlpha(color, 0.88)} 0%, ${hexAlpha(color, 0.35)} 100%)`
}

// Convierte hex a rgba con opacidad
function hexAlpha(hex = '#000000', alpha = 1) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// Reveal directive
const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(el.dataset.delay || 0)
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
    )
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) { el.__obs?.disconnect?.() },
}
</script>

<style scoped>
/* ══ Section ═════════════════════════════════════ */
.catalog-section {
  background: #fafbfc;
  padding: 56px 0 80px;
  min-height: calc(100vh - 96px);
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ══ Hero ════════════════════════════════════════ */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 80px;
}

.hero-text {
  display: flex;
  flex-direction: column;
}

.kicker {
  display: inline-flex;
  padding: 8px 18px;
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0071e3;
  margin-bottom: 18px;
  width: fit-content;
}

.hero-title {
  margin: 0 0 14px;
  font-size: clamp(28px, 3.5vw, 48px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -1px;
  line-height: 1.1;
}

.accent {
  color: #0071e3
}

.hero-sub {
  font-size: 16px;
  color: rgba(27, 27, 27, 0.55);
  line-height: 1.6;
  margin: 0 0 28px;
  max-width: 44ch;
}

/* Botones hero — uno por categoría */
.hero-btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-btn {
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  color: #fff;
  transition: filter 160ms, transform 160ms;
  letter-spacing: 0;
}

.hero-btn:hover {
  filter: brightness(0.88);
  transform: translateY(-2px);
}

/* Mapa */
.hero-map {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 460px;
}

.latam-map {
  width: 100%;
  height: 100%;
  max-height: 460px;
  object-fit: contain;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 18%, black 85%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent 0%, black 18%, black 85%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  mask-composite: intersect;
}

/* ══ Section head ════════════════════════════════ */
.section-head {
  margin-bottom: 24px
}

.section-title {
  margin: 0 0 6px;
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.5px;
}

.section-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.5);
}

/* ══ Grid dinámico ═══════════════════════════════ */
/*
  auto-fit hace el trabajo:
  · 1 cat  → 1 col
  · 2 cats → 2 col
  · 3 cats → 3 col
  · 4 cats → 2×2
  · 5 cats → 3+2
  Sin tocar CSS al agregar categorías.
*/
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 520px), 1fr));
  gap: 22px;
  margin-bottom: 72px;
}

/* ══ Card ════════════════════════════════════════ */
.cat-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.18);
}

.cat-img-wrap {
  position: absolute;
  inset: 0;
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.72;
  transition: transform 420ms ease;
}

.cat-card:hover .cat-img {
  transform: scale(1.05);
}

.cat-overlay {
  position: absolute;
  inset: 0;
}

.cat-body {
  position: relative;
  z-index: 1;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
}

.cat-kicker {
  display: inline-flex;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  width: fit-content;
}

.cat-name {
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.cat-desc {
  margin: 0 0 12px;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.70);
  line-height: 1.55;
  max-width: 40ch;
}

/* Chips de subcategorías */
.cat-subs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.cat-sub-chip {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.cat-sub-more {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.5);
}

/* Contador de productos */
.cat-meta {
  margin-bottom: 14px;
}

.cat-prod-count {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.50);
}

/* Botón */
.cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  width: fit-content;
  transition: filter 180ms, transform 180ms;
  letter-spacing: 0;
}

.cat-btn:hover {
  filter: brightness(0.86);
  transform: translateY(-1px);
}

/* ══ CTA ═════════════════════════════════════════ */
.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 36px;
  background: linear-gradient(135deg, #0056b3 0%, #0071e3 100%);
  border-radius: 18px;
  flex-wrap: wrap;
}

.cta-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 900;
  color: #fff;
}

.cta-sub {
  margin: 0;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.75);
}

.cta-btn {
  flex-shrink: 0;
  padding: 13px 26px;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 900;
  color: #0071e3;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 180ms, box-shadow 180ms;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

/* ══ Reveal ══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-map {
    height: 320px
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .cat-card {
    min-height: 300px
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 24px;
  }

  .cta-btn {
    width: 100%;
    text-align: center
  }
}

@media (max-width: 480px) {
  .bs-wrap {
    padding: 0 16px
  }

  .catalog-section {
    padding: 36px 0 56px
  }

  .hero-map {
    height: 240px
  }
}
</style>
