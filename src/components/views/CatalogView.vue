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

        <!-- 2 cards visuales -->
        <div class="hero-visual">
          <div class="hero-card" @click="router.push('/tienda/drones')">
            <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=800&fit=crop&q=80"
              alt="Drones" class="hero-card-img" />
            <div class="hero-card-label">
              <span class="hcl-kicker">Categoría</span>
              <span class="hcl-title">Drones →</span>
            </div>
          </div>
          <div class="hero-card" @click="router.push('/tienda/filamentos')">
            <img src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=800&fit=crop&q=80"
              alt="Filamentos 3D" class="hero-card-img" />
            <div class="hero-card-label">
              <span class="hcl-kicker">Categoría</span>
              <span class="hcl-title">Filamentos →</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           CATEGORÍAS — 2 cards grandes
      ═══════════════════════════════════════════════ -->
      <div class="section-head" v-reveal>
        <h2 class="section-title">Explora nuestros productos</h2>
        <p class="section-sub">Soluciones para tu empresa conectando el b2b</p>
      </div>

      <div class="categories-grid" v-reveal>
        <div v-for="cat in STORE_CATEGORIES" :key="cat.id" class="cat-card" @click="router.push(`/tienda/${cat.id}`)">
          <div class="cat-img-wrap">
            <img :src="cat.heroImg" :alt="cat.title" class="cat-img" />
            <div class="cat-overlay" />
          </div>
          <div class="cat-body">
            <span class="cat-kicker">{{ cat.kicker }}</span>
            <h3 class="cat-name">{{ cat.title }}</h3>
            <p class="cat-desc">{{ cat.description }}</p>
            <div class="cat-subs">
              <span v-for="sub in cat.subcategories.slice(0, 4)" :key="sub.id" class="cat-sub-chip">{{ sub.name
                }}</span>
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

.hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  height: 420px;
}

.hero-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 260ms ease, box-shadow 260ms ease;
}

.hero-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
}

.hero-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 400ms ease;
}

.hero-card:hover .hero-card-img {
  transform: scale(1.05);
}

.hero-card-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 18px 18px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hcl-kicker {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.hcl-title {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.3px;
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

/* ── Categorías grid ── */
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

  .hero-visual {
    height: 280px;
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

  .hero-visual {
    height: 200px;
  }
}
</style>
