<template>
  <section id="para-quien" class="sec" aria-label="Para quién es este servicio">
    <div class="bs-wrap">

      <!-- Globo absolutamente posicionado DENTRO del bs-wrap,
           detrás del contenido, centrado sobre las cards -->
      <div class="globe-wrap" aria-hidden="true">
        <img :src="mundoImg" alt="" class="world-img" draggable="false" />
      </div>

      <div class="layout">

        <!-- COL 1: Texto + controles -->
        <div class="left" v-reveal data-delay="0">
          <div class="kicker">PARA QUIÉN</div>
          <h2 class="title">
            Para quién es<br />
            <span class="accent">este servicio</span>
          </h2>
          <p class="sub">
            Trabajamos con empresas y equipos técnicos que necesitan resultados concretos,
            no solo consultorías. Si tienes un reto de ingeniería real, estamos listos.
          </p>

          <div class="nav">
            <button class="nav-btn" @click="prev" :disabled="current === 0" aria-label="Anterior">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button class="nav-btn" @click="next" :disabled="current >= cards.length - visibleCount"
              aria-label="Siguiente">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div class="dots">
            <button v-for="(_, i) in cards" :key="i" class="dot" :class="{ active: i === current }" @click="current = i"
              :aria-label="`Tarjeta ${i + 1}`" />
          </div>
        </div>

        <!-- COL 2: Carrusel cards -->
        <div class="center" v-reveal data-delay="100">
          <div class="carousel-wrap">
            <div class="track" :style="{ transform: `translateX(calc(-${current} * (var(--card-w) + var(--gap))))` }">
              <div v-for="(card, i) in cards" :key="i" class="card">
                <div class="card-icon">
                  <div v-html="card.icon" />
                </div>
                <div class="card-title">{{ card.title }}</div>
                <div class="card-desc">{{ card.desc }}</div>
                <ul class="card-list">
                  <li v-for="item in card.items" :key="item">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import mundoImg from 'src/assets/Img/Mundo.avif'
const current = ref(0)
const visibleCount = ref(2)

const iconBuild = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
const iconPlant = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
const iconIndustry = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
const iconStartup = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`

const cards = [
  {
    icon: iconBuild,
    title: 'Constructoras y desarrolladores',
    desc: 'Proyectos de construcción que requieren diseño técnico, cálculos estructurales y gestión integral.',
    items: ['Diseño mecánico y estructural', 'Supervisión de obra técnica', 'Documentación de entregables'],
  },
  {
    icon: iconPlant,
    title: 'Dueños de plantas / Gerentes de operaciones',
    desc: 'Optimización de líneas productivas, análisis de cuellos de botella y rediseño de procesos.',
    items: ['Análisis de procesos productivos', 'Optimización de planta', 'KPIs medibles y reportes técnicos'],
  },
  {
    icon: iconIndustry,
    title: 'Empresas industriales',
    desc: 'Soluciones de ingeniería para empresas manufactureras que necesitan mejorar su capacidad técnica.',
    items: ['Ingeniería de mantenimiento', 'Rediseño de equipos y sistemas', 'Gestión de proyectos EPC'],
  },
  {
    icon: iconStartup,
    title: 'Startups técnicas',
    desc: 'Equipos con ideas innovadoras que necesitan respaldo técnico para convertir prototipos en productos viables.',
    items: ['Diseño de producto y prototipado', 'Validación técnica y análisis', 'Apoyo en escalamiento industrial'],
  },
]

function updateVisible() {
  visibleCount.value = window.innerWidth < 680 ? 1 : 2
}

function prev() { if (current.value > 0) current.value-- }
function next() { if (current.value < cards.length - visibleCount.value) current.value++ }

onMounted(() => { updateVisible(); window.addEventListener('resize', updateVisible) })
onUnmounted(() => { window.removeEventListener('resize', updateVisible) })

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    el.style.transitionDelay = `${Number(el.dataset.delay || 0)}ms`
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) { el.__obs?.disconnect?.() }
}
</script>

<style scoped>
/* ══════════════════════════
   SECTION — 100% ancho
   ══════════════════════════ */
.sec {
  width: 100%;
  background: #ffffff;
  padding: 100px 0 90px;
  color: #1b1b1b;
  overflow: hidden;
  position: relative;
}

/* ══════════════════════════
   WRAP — idéntico a las demás
   ══════════════════════════ */
.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  /* ancla el globo absoluto */
}

/* ══════════════════════════
   GLOBO — absoluto dentro del
   bs-wrap, detrás del contenido.
   Centrado sobre la zona de cards
   ══════════════════════════ */
.globe-wrap {
  position: absolute;
  /* Empieza en el 38% desde la izquierda (inicio de la zona de cards)
     y va hasta el borde derecho + un poco más */
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  /* DETRÁS de todo */
  pointer-events: none;
  width: 620px;
  /* grande */
  height: 620px;
}

.world-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  opacity: 0.80;
  filter: drop-shadow(0 12px 48px rgba(0, 113, 227, 0.06));
}

/* ══════════════════════════
   GRID 2 COLUMNAS
   texto | cards
   ══════════════════════════ */
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 52px;
  align-items: center;
  position: relative;
  z-index: 1;
  /* encima del globo */
}

/* ── LEFT ───────────────── */
.kicker {
  display: inline-flex;
  padding: 7px 13px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  margin-bottom: 14px;
}

.title {
  margin: 0 0 12px;
  font-size: clamp(24px, 2.6vw, 38px);
  font-weight: 900;
  letter-spacing: -0.7px;
  line-height: 1.12;
  color: #1b1b1b;
}

.accent {
  color: #0071e3;
}

.sub {
  font-size: 13.5px;
  line-height: 1.68;
  color: rgba(27, 27, 27, 0.6);
  margin-bottom: 26px;
}

.nav {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.nav-btn {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1.5px solid rgba(27, 27, 27, 0.13);
  background: #fff;
  color: #1b1b1b;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 180ms ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.nav-btn:hover:not(:disabled) {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.04);
}

.nav-btn:disabled {
  opacity: 0.28;
  cursor: default;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(27, 27, 27, 0.14);
  border: none;
  cursor: pointer;
  transition: all 220ms ease;
  padding: 0;
}

.dot.active {
  width: 18px;
  background: #0071e3;
}

/* ── CENTER: Carousel ─────── */
.center {
  overflow: hidden;
}

.carousel-wrap {
  overflow: hidden;
  padding: 6px 2px 18px;
}

.track {
  display: flex;
  gap: var(--gap, 14px);
  transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --card-w: calc((100% - var(--gap, 14px)) / 2);
  --gap: 14px;
}

/* Cards con fondo sólido para tapar el globo detrás */
.card {
  flex: 0 0 var(--card-w);
  min-width: var(--card-w);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 16px;
  border: 1.5px solid rgba(27, 27, 27, 0.08);
  padding: 18px 16px 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  transition: all 240ms ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  border-color: rgba(0, 113, 227, 0.24);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 113, 227, 0.1);
  background: #fff;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 113, 227, 0.07);
  border: 1.5px solid rgba(0, 113, 227, 0.13);
  color: #0071e3;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.card-title {
  font-size: 13px;
  font-weight: 900;
  color: #1b1b1b;
  margin-bottom: 7px;
  line-height: 1.3;
}

.card-desc {
  font-size: 12px;
  line-height: 1.58;
  color: rgba(27, 27, 27, 0.55);
  margin-bottom: 12px;
  flex: 1;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid rgba(27, 27, 27, 0.07);
  padding-top: 10px;
}

.card-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.6);
}

.card-list svg {
  color: #0071e3;
  flex-shrink: 0;
}

/* ── Reveal ─────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 650ms ease, transform 650ms ease;
  will-change: opacity, transform;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ─────────────── */
@media (max-width: 900px) {
  .globe-wrap {
    width: 460px;
    height: 460px;
    right: -40px;
  }

  .layout {
    grid-template-columns: 240px 1fr;
    gap: 36px;
  }
}

@media (max-width: 680px) {
  .globe-wrap {
    display: none;
  }

  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .track {
    --card-w: 100%;
  }

  .sec {
    padding: 70px 0 56px;
  }
}
</style>
