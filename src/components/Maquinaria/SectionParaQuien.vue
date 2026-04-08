<template>
  <section id="suministro-maquinaria" class="sec" aria-label="Suministro de maquinaria y equipos industriales">
    <div class="bs-wrap">

      <!-- ========================= -->
      <!-- STATS SECTION -->
      <!-- ========================= -->
      <div class="stats" v-reveal>
        <div class="stat" v-for="(s, i) in stats" :key="i">
          <div class="stat-icon-wrap">
            <div class="stat-icon" v-html="s.icon" />
          </div>
          <div class="stat-info">
            <div class="stat-num">
              <span class="plus">+</span>{{ s.num }}<span v-if="s.suffix" class="suffix">{{ s.suffix }}</span>
            </div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    num: '120',
    label: 'Equipos industriales suministrados',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>`
  },
  {
    num: '15',
    label: 'Años gestionando importaciones técnicas',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`
  },
  {
    num: '8',
    label: 'Sectores industriales atendidos',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`
  },
  {
    num: '24',
    suffix: 'h',
    label: 'Tiempo de respuesta técnica inicial',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/>
    </svg>`
  },
]

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
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
    )
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) { el.__obs?.disconnect?.() }
}
</script>

<style scoped>
.sec {
  background: #fff;
  padding: 40px 0;
  /* compacto: sin tanto espacio arriba/abajo */
  overflow: hidden;
}

.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ══ Stats — estilo Factory, fondo blanco ════════ */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #fff;
}

.stat {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 24px;
  transition: background 200ms;
  border-radius: 16px;
}

.stat:hover {
  background: rgba(0, 113, 227, 0.03);
}

/* Ícono en círculo */
.stat-icon-wrap {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #0071e3;
  display: grid;
  place-items: center;
  color: #fff;
  box-shadow: 0 4px 14px rgba(0, 113, 227, 0.30);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* Texto */
.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 900;
  color: #0b1220;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 1px;
}

.plus {
  font-size: 0.75em;
  color: #0071e3;
  font-weight: 900;
}

.suffix {
  font-size: 0.7em;
  color: #0071e3;
  font-weight: 900;
  margin-left: 1px;
}

.stat-label {
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.50);
  line-height: 1.35;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  max-width: 130px;
}

/* ══ Reveal ══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .sec {
    padding: 28px 0
  }
}
</style>
