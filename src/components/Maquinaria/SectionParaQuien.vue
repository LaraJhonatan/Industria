<template>
  <section id="suministro-maquinaria" class="sec" aria-label="Suministro de maquinaria y equipos industriales">
    <div class="bs-wrap">

      <!-- ========================= -->
      <!-- HERO SECTION -->
      <!-- ========================= -->
      <div class="layout">
        <!-- LEFT CONTENT -->
        <div class="left">
          <div class="kicker" v-reveal data-delay="0">
            SUMINISTRO INDUSTRIAL
          </div>

          <h2 class="title" v-reveal data-delay="80">
            Suministro de
            <span class="accent">maquinaria y equipos industriales</span>
          </h2>

          <p class="sub" v-reveal data-delay="140">
            Importación y gestión de equipos de alto desempeño con criterios técnicos rigurosos.
            Desde el diagnóstico hasta la puesta en marcha, acompañamos cada proyecto con soporte
            integral y respaldo especializado en cada etapa.
          </p>

          <!-- Tags -->
          <div class="tags" v-reveal data-delay="200">
            <span class="tag">Selección técnica personalizada</span>
            <span class="tag">Gestión completa de importación</span>
            <span class="tag">Instalación y puesta en marcha</span>
            <span class="tag">Garantía y soporte post-venta</span>
          </div>

          <!-- Buttons -->
          <div class="cta-group" v-reveal data-delay="260">
            <a href="#formulario-proyectos" class="cta-btn">
              Solicitar cotización
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a href="#mas-informacion" class="cta-btn outline-btn">
              Conocer más
            </a>
          </div>
        </div>

        <!-- RIGHT VISUAL -->
        <div class="right" v-reveal data-delay="80">
          <div class="img-wrap">
            <div class="industrial-visual">

              <div class="vis-ring vis-ring1" />
              <div class="vis-ring vis-ring2" />

              <div class="vis-core">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.5">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>

              <div class="vis-chip chip-tl">Diagnóstico</div>
              <div class="vis-chip chip-tr">Importación</div>
              <div class="vis-chip chip-bl">Instalación</div>
              <div class="vis-chip chip-br">Soporte</div>

            </div>
          </div>
        </div>
      </div>

      <!-- ========================= -->
      <!-- STATS SECTION -->
      <!-- ========================= -->
      <div class="stats" v-reveal>
        <div class="stat" v-for="(s, i) in stats" :key="i">
          <div class="stat-num">
            <span class="plus">+</span>{{ s.num }}
            <span v-if="s.suffix" class="suffix">{{ s.suffix }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const stats = [
  { num: '120', label: 'Equipos industriales suministrados' },
  { num: '15', label: 'Años gestionando importaciones técnicas' },
  { num: '8', label: 'Sectores industriales atendidos' },
  { num: '24', suffix: 'h', label: 'Tiempo de respuesta técnica inicial' },
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
  unmounted(el) {
    el.__obs?.disconnect?.()
  }
}
</script>

<style scoped>
/* ========================= */
/* BASE */
/* ========================= */

.sec {
  background: #fff;
  padding: 100px 0 80px;
  overflow: hidden;
}

.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 72px;
}

/* ========================= */
/* LEFT */
/* ========================= */

.kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  margin-bottom: 20px;
}

.title {
  margin: 0 0 18px;
  font-size: clamp(30px, 3.5vw, 46px);
  font-weight: 900;
  line-height: 1.12;
}

.accent {
  color: #0071e3;
}

.sub {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(27, 27, 27, 0.7);
  margin-bottom: 28px;
  max-width: 62ch;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.tag {
  padding: 7px 15px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  border: 1.5px solid rgba(27, 27, 27, 0.14);
  transition: 200ms ease;
}

.tag:hover {
  border-color: #0071e3;
  color: #0071e3;
}

.cta-group {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  padding: 0 26px;
  border-radius: 14px;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
  background: #0071e3;
  text-decoration: none;
  transition: 250ms ease;
}

.cta-btn:hover {
  background: #0062c8;
  transform: translateY(-2px);
}

.outline-btn {
  background: transparent;
  color: #0071e3;
  border: 2px solid #0071e3;
}

.outline-btn:hover {
  background: rgba(0, 113, 227, 0.08);
}

/* ========================= */
/* RIGHT VISUAL */
/* ========================= */

.right {
  display: flex;
  justify-content: center;
}

.industrial-visual {
  position: relative;
  width: 360px;
  height: 360px;
  display: grid;
  place-items: center;
}

.vis-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1.5px solid rgba(0, 113, 227, 0.15);
  animation: spin 20s linear infinite;
}

.vis-ring2 {
  inset: 15%;
  border-style: dashed;
  animation-direction: reverse;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.vis-core {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: #fff;
  border: 2px solid rgba(0, 113, 227, 0.15);
  display: grid;
  place-items: center;
  z-index: 2;
}

.vis-chip {
  position: absolute;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: #fff;
  border: 1px solid rgba(0, 113, 227, 0.2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.chip-tl {
  top: 12%;
  left: 0;
}

.chip-tr {
  top: 22%;
  right: 0;
}

.chip-bl {
  bottom: 16%;
  left: 2%;
}

.chip-br {
  bottom: 22%;
  right: 0;
}

/* ========================= */
/* STATS */
/* ========================= */

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 20px;
  border: 2px solid rgba(27, 27, 27, 0.07);
  overflow: hidden;
}

.stat {
  padding: 36px 28px;
  border-right: 1px solid rgba(27, 27, 27, 0.07);
}

.stat:last-child {
  border-right: none;
}

.stat-num {
  font-size: clamp(36px, 3.5vw, 48px);
  font-weight: 900;
  color: #0071e3;
  margin-bottom: 10px;
}

.stat-divider {
  width: 32px;
  height: 3px;
  background: #fdda24;
  border-radius: 999px;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 13px;
  color: rgba(27, 27, 27, 0.6);
}

/* ========================= */
/* ANIMATION */
/* ========================= */

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ========================= */
/* RESPONSIVE */
/* ========================= */

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .sec {
    padding: 70px 0 60px;
  }

  .industrial-visual {
    width: 260px;
    height: 260px;
  }
}
</style>
