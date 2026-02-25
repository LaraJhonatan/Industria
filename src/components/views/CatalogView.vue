<template>
  <section class="catalog-section" aria-label="Catálogo de servicios">
    <div class="bs-wrap">
      <!-- Header -->
      <div class="catalog-header" v-reveal>
        <span class="kicker">Servicios Especializados</span>
        <h1 class="catalog-title">
          Elige el servicio que<br />
          <span class="accent">necesitas hoy</span>
        </h1>
        <p class="catalog-sub">
          Manufactura de precisión y ensayos de materiales con los más altos estándares técnicos.
        </p>
      </div>

      <!-- Grid -->
      <div class="services-grid">
        <CatalogCard v-for="(service, i) in SERVICES" :key="service.id" :service="service"
          :style="{ '--delay': `${i * 40}ms` }" v-reveal @select="routerStore.goToService(service.id)" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { SERVICES } from '../../data/services.js'
import CatalogCard from './CatalogCard.vue'




const vReveal = {
  mounted(el) {
    el.classList.add('reveal')

    const delay =
      Number(
        el.dataset?.delay ||
        el.style.getPropertyValue('--delay')?.replace('ms', '') ||
        0
      )

    el.style.transitionDelay =
      typeof delay === 'number' ? `${delay}ms` : delay

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
  unmounted(el) {
    el.__obs?.disconnect?.()
  }
}
</script>


<style scoped>
.catalog-section {
  background: #fafbfc;
  padding: 72px 0 80px;
  min-height: calc(100vh - 64px);
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.catalog-header {
  text-align: center;
  margin-bottom: 56px;
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
}

.catalog-title {
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

.catalog-sub {
  font-size: 16px;
  color: rgba(27, 27, 27, 0.55);
  max-width: 52ch;
  margin: 0 auto;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Reveal animation */
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

@media (max-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .bs-wrap {
    padding: 0 16px;
  }

  .catalog-section {
    padding: 48px 0 56px;
  }
}
</style>
