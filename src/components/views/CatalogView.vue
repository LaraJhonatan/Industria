<template>
  <section class="catalog-section" aria-label="Tienda NovaIndustria">
    <div class="bs-wrap">

      <!-- ══════════════════════════════════════════════
           HERO
      ═══════════════════════════════════════════════ -->
      <div class="hero" v-reveal>
        <div class="hero-text">
          <span class="kicker">Tienda B2B · Drones &amp; Filamentos 3D</span>
          <h1 class="hero-title">
            Todo lo que necesitas<br />
            <span class="accent">para construir más.</span>
          </h1>
          <p class="hero-sub">
            Baterías, motores, estructuras, filamentos 3D y más. Envío a toda Colombia.
          </p>
          <div class="hero-btns">
            <button class="hero-btn-primary" @click="router.push('/tienda/drones')">
              Ver Drones
            </button>
            <button class="hero-btn-secondary" @click="router.push('/tienda/filamentos')">
              Ver Filamentos
            </button>
          </div>
        </div>

        <!-- Mapa SVG inline — sin fondo -->
        <div class="hero-map">
          <svg class="latam-map" viewBox="0 0 400 780" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 48,18 L 72,14 L 105,18 L 128,22 L 148,16 L 162,24 L 168,38 L 175,52 L 178,66 L 170,76 L 162,88 L 168,100 L 174,112 L 166,120 L 154,126 L 140,132 L 122,138 L 108,136 L 96,130 L 80,128 L 66,118 L 55,108 L 44,94 L 36,78 L 30,62 L 32,46 Z" />
            <path d="M 30,62 L 36,50 L 40,36 L 34,28 L 24,38 L 18,54 L 20,68 L 28,72 Z" />
            <path
              d="M 154,126 L 166,120 L 178,122 L 188,128 L 196,136 L 198,146 L 192,154 L 182,158 L 170,156 L 160,150 L 152,142 Z" />
            <path d="M 182,158 L 196,154 L 206,158 L 212,168 L 208,178 L 196,184 L 184,180 L 178,170 Z" />
            <path d="M 196,184 L 208,180 L 216,186 L 218,196 L 212,204 L 202,204 L 194,196 Z" />
            <path d="M 210,202 L 218,196 L 228,194 L 240,196 L 248,202 L 244,210 L 232,214 L 218,212 Z" />
            <ellipse cx="205" cy="103" rx="28" ry="9" transform="rotate(-8 205 103)" />
            <ellipse cx="244" cy="107" rx="10" ry="6" transform="rotate(-5 244 107)" />
            <path
              d="M 228,214 L 244,210 L 260,212 L 276,216 L 292,218 L 306,222 L 316,232 L 314,246 L 304,256 L 290,262 L 274,264 L 260,260 L 248,252 L 238,240 L 228,228 Z" />
            <path
              d="M 292,218 L 308,222 L 322,218 L 338,216 L 350,220 L 358,230 L 354,242 L 342,250 L 326,252 L 312,248 L 304,256 L 316,232 Z" />
            <path
              d="M 342,250 L 358,244 L 372,240 L 386,242 L 396,248 L 394,260 L 380,266 L 364,268 L 350,264 L 340,258 Z" />
            <path d="M 228,262 L 242,258 L 252,264 L 254,278 L 248,290 L 236,292 L 224,286 L 220,274 Z" />
            <path
              d="M 236,292 L 252,288 L 262,296 L 268,312 L 272,328 L 270,346 L 262,360 L 250,368 L 236,368 L 222,360 L 214,344 L 212,326 L 216,308 L 224,296 Z" />
            <path
              d="M 262,328 L 278,322 L 294,324 L 306,332 L 308,348 L 302,362 L 288,368 L 272,366 L 264,356 L 262,342 Z" />
            <path
              d="M 294,224 L 310,226 L 326,228 L 342,226 L 356,230 L 370,238 L 382,248 L 392,260 L 398,274 L 398,292 L 394,310 L 388,328 L 382,346 L 374,362 L 364,376 L 352,388 L 338,396 L 322,400 L 306,398 L 292,392 L 280,382 L 270,370 L 272,366 L 288,368 L 302,362 L 308,348 L 306,332 L 294,324 L 278,322 L 268,312 L 268,296 L 278,286 L 290,278 L 302,270 L 312,260 L 314,248 L 316,234 L 306,224 Z" />
            <path d="M 272,368 L 286,370 L 298,374 L 306,384 L 300,394 L 286,396 L 272,390 L 264,380 Z" />
            <path d="M 298,394 L 314,392 L 322,400 L 320,412 L 308,418 L 294,414 L 288,404 Z" />
            <path
              d="M 212,344 L 224,360 L 230,374 L 232,392 L 228,412 L 220,432 L 212,452 L 204,474 L 198,496 L 194,518 L 190,540 L 188,560 L 186,578 L 184,596 L 182,612 L 178,626 L 172,636 L 166,642 L 160,638 L 158,624 L 162,608 L 166,590 L 170,570 L 174,548 L 178,524 L 180,500 L 182,474 L 184,448 L 186,422 L 190,398 L 196,376 L 204,360 Z" />
            <path
              d="M 230,374 L 250,372 L 268,372 L 284,374 L 296,380 L 306,388 L 308,402 L 304,418 L 296,432 L 284,444 L 272,456 L 260,468 L 248,482 L 238,498 L 228,514 L 220,530 L 212,548 L 204,564 L 196,578 L 188,590 L 182,604 L 178,616 L 174,628 L 170,638 L 166,642 L 172,636 L 178,626 L 182,612 L 184,596 L 186,578 L 188,560 L 190,540 L 194,518 L 198,496 L 204,474 L 212,452 L 220,432 L 228,412 L 232,392 Z" />
            <path d="M 196,650 L 210,646 L 222,650 L 226,660 L 220,668 L 206,670 L 194,664 Z" />
          </svg>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           CATEGORÍAS — solo Drones y Filamentos
      ═══════════════════════════════════════════════ -->
      <div class="section-head" v-reveal>
        <h2 class="section-title">Explora nuestros productos</h2>
        <p class="section-sub">Soluciones para tu empresa conectando el b2b</p>
      </div>

      <div class="categories-grid" v-reveal>
        <div v-for="cat in STORE_CATEGORIES.slice(0, 2)" :key="cat.id" class="cat-card"
          @click="router.push(`/tienda/${cat.id}`)">
          <div class="cat-img-wrap">
            <img :src="cat.heroImg" :alt="cat.title" class="cat-img" />
            <div class="cat-overlay" />
          </div>
          <div class="cat-body">
            <span class="cat-kicker">{{ cat.kicker }}</span>
            <h3 class="cat-name">{{ cat.title }}</h3>
            <p class="cat-desc">{{ cat.description }}</p>
            <div class="cat-subs">
              <span v-for="sub in cat.subcategories.slice(0, 4)" :key="sub.id" class="cat-sub-chip">
                {{ sub.name }}
              </span>
              <span v-if="cat.subcategories.length > 4" class="cat-sub-chip cat-sub-more">
                +{{ cat.subcategories.length - 4 }} más
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

      <!-- ══════════════════════════════════════════════
           CTA
      ═══════════════════════════════════════════════ -->
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
import { useRouter } from 'vue-router'
import { STORE_CATEGORIES } from '../../data/store-products.js'

const router = useRouter()

// Reveal directive
const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(
      el.style.getPropertyValue('--delay')?.replace('ms', '') || 0
    )
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() }
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

/* ── Hero ── */
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
  gap: 0;
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
  color: #0071e3;
}

.hero-sub {
  font-size: 16px;
  color: rgba(27, 27, 27, 0.55);
  line-height: 1.6;
  margin: 0 0 28px;
  max-width: 44ch;
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-btn-primary {
  height: 48px;
  padding: 0 26px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 160ms, transform 160ms;
}

.hero-btn-primary:hover {
  background: #005fcd;
  transform: translateY(-1px);
}

.hero-btn-secondary {
  height: 48px;
  padding: 0 26px;
  background: #fff;
  color: #1b1b1b;
  border: 1.5px solid rgba(27, 27, 27, 0.14);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 160ms;
}

.hero-btn-secondary:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.04);
}

/* ── Mapa hero ── */
.hero-map {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}

.latam-map {
  width: 100%;
  height: 100%;
  max-height: 500px;
  /* SVG inline: fill directo, sin fondo, sin blend */
  fill: #1b1b1b;
  transition: fill 200ms;
}



/* ── Section head ── */
.section-head {
  margin-bottom: 24px;
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

/* ── Categorías grid — 2 columnas ── */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-bottom: 72px;
}

.cat-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16);
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
  opacity: 0.75;
  transition: transform 420ms ease;
}

.cat-card:hover .cat-img {
  transform: scale(1.05);
}

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(10, 10, 26, 0.78) 0%, rgba(10, 10, 26, 0.4) 100%);
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
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.6px;
  line-height: 1.1;
}

.cat-desc {
  margin: 0 0 14px;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.55;
  max-width: 38ch;
}

.cat-subs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.cat-sub-chip {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.cat-sub-more {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.5);
}

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
}

.cat-btn:hover {
  filter: brightness(0.88);
  transform: translateY(-1px);
}

/* ── CTA ── */
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

/* ── Reveal ── */
:global(.reveal) {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
  transition-delay: var(--delay, 0ms);
  will-change: opacity, transform;
}

:global(.reveal.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-map {
    height: 340px;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .cat-card {
    min-height: 300px;
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 24px;
  }

  .cta-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .catalog-section {
    padding: 36px 0 56px;
  }

  .hero-map {
    height: 260px;
  }
}
</style>
