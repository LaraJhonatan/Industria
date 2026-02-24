<template>
  <section id="que-hacemos" class="sec" aria-label="Qué hacemos">
    <div class="bs-wrap">
      <div class="layout">
        <!-- LEFT CONTENT -->
        <div class="left">
          <div class="kicker" v-reveal data-delay="0">QUÉ HACEMOS</div>

          <h2 class="title" v-reveal data-delay="80">
            Somos el laboratorio técnico que respalda tu
            <span class="accent">producción industrial</span>
          </h2>

          <p class="sub" v-reveal data-delay="140">
            Combinamos manufactura metálica de precisión, diseño de ingeniería y ensayos de materiales con
            los estándares más exigentes. Desde el corte láser hasta la caracterización de probetas,
            ejecutamos cada proceso con rigor técnico y entrega puntual.
          </p>

          <!-- Tags/Pills -->
          <div class="tags" v-reveal data-delay="200">
            <span class="tag">Corte láser y metales</span>
            <span class="tag">Mecanizado CNC</span>
            <span class="tag">Diseño industrial</span>
            <span class="tag">Ensayos ACEROLAB</span>
            <span class="tag">Fibra de carbono</span>
          </div>

          <a href="#formulario-proyectos" class="cta-btn" v-reveal data-delay="260">
            Cotizar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <!-- RIGHT IMAGE / VISUAL -->
        <div class="right" v-reveal data-delay="80" aria-hidden="true">
          <div class="img-wrap">
            <div class="industrial-visual">
              <div class="vis-ring vis-ring1" />
              <div class="vis-ring vis-ring2" />
              <div class="vis-core">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div class="vis-chip chip-tl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
                Precisión
              </div>
              <div class="vis-chip chip-tr">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Ensayos
              </div>
              <div class="vis-chip chip-bl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                CNC
              </div>
              <div class="vis-chip chip-br">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                Manufactura
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STATS ROW -->
      <div class="stats" v-reveal data-delay="0">
        <div class="stat" v-for="(s, i) in stats" :key="i">
          <div class="stat-num">
            <span class="plus">+</span>{{ s.num }}<span v-if="s.suffix" class="suffix">{{ s.suffix }}</span>
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
  { num: '15', label: 'Años de experiencia en manufactura' },
  { num: '200', label: 'Proyectos ejecutados con éxito' },
  { num: '12', label: 'Servicios especializados disponibles' },
  { num: '24', suffix: 'h', label: 'Tiempo de respuesta en cotizaciones' },
]

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(el.dataset.delay || 0)
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() }
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
.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.sec {
  background: #fff;
  padding: 100px 0 80px;
  color: #1b1b1b;
  position: relative;
  overflow: hidden;
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 72px;
}

/* LEFT */
.kicker {
  display: inline-flex;
  align-items: center;
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
  letter-spacing: -0.8px;
  line-height: 1.12;
  color: #1b1b1b;
}

.accent {
  color: #0071e3;
}

.sub {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(27, 27, 27, 0.68);
  max-width: 62ch;
  margin-bottom: 28px;
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
  color: rgba(27, 27, 27, 0.75);
  background: #fff;
  transition: all 200ms ease;
  cursor: default;
}

.tag:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.04);
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
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
  transition: all 250ms ease;
}

.cta-btn:hover {
  background: #0062c8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.4);
}

/* RIGHT VISUAL */
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-wrap {
  width: 100%;
  max-width: 420px;
}

.industrial-visual {
  position: relative;
  width: 380px;
  height: 380px;
  margin: 0 auto;
  display: grid;
  place-items: center;
}

.vis-ring {
  position: absolute;
  border-radius: 999px;
  border: 1.5px solid rgba(0, 113, 227, 0.15);
}

.vis-ring1 {
  inset: 0;
  animation: slowspin 20s linear infinite;
}

.vis-ring2 {
  inset: 15%;
  border-style: dashed;
  border-color: rgba(253, 218, 36, 0.25);
  animation: slowspin 14s linear infinite reverse;
}

@keyframes slowspin {
  to {
    transform: rotate(360deg);
  }
}

.vis-core {
  width: 100px;
  height: 100px;
  border-radius: 24px;
  background: #fff;
  border: 2px solid rgba(0, 113, 227, 0.15);
  display: grid;
  place-items: center;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.vis-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  background: #fff;
  border: 1.5px solid rgba(0, 113, 227, 0.18);
  color: #1b1b1b;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  z-index: 3;
}

.vis-chip svg {
  color: #0071e3;
  flex-shrink: 0;
}

.chip-tl {
  top: 12%;
  left: 0;
  animation: float1 5s ease-in-out infinite;
}

.chip-tr {
  top: 22%;
  right: 0;
  animation: float2 5.5s ease-in-out infinite;
}

.chip-bl {
  bottom: 16%;
  left: 2%;
  animation: float3 4.8s ease-in-out infinite;
}

.chip-br {
  bottom: 22%;
  right: 0;
  animation: float4 5.2s ease-in-out infinite;
}

@keyframes float1 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes float2 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes float3 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float4 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-7px);
  }
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #fff;
  border-radius: 20px;
  border: 2px solid rgba(27, 27, 27, 0.07);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.stat {
  padding: 36px 28px;
  border-right: 1px solid rgba(27, 27, 27, 0.07);
  transition: background 250ms ease;
}

.stat:last-child {
  border-right: none;
}

.stat:hover {
  background: rgba(0, 113, 227, 0.02);
}

.stat-num {
  font-size: clamp(36px, 3.5vw, 48px);
  font-weight: 900;
  color: #0071e3;
  line-height: 1;
  margin-bottom: 10px;
  letter-spacing: -1px;
}

.plus {
  font-size: 0.65em;
  font-weight: 900;
  color: rgba(0, 113, 227, 0.6);
}

.suffix {
  font-size: 0.55em;
  font-weight: 900;
  color: rgba(0, 113, 227, 0.7);
  letter-spacing: 0;
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
  line-height: 1.5;
  color: rgba(27, 27, 27, 0.6);
  font-weight: 600;
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms ease, transform 700ms ease;
  will-change: opacity, transform;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .right {
    order: -1;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat:nth-child(2) {
    border-right: none;
  }

  .stat:nth-child(1),
  .stat:nth-child(2) {
    border-bottom: 1px solid rgba(27, 27, 27, 0.07);
  }
}

@media (max-width: 640px) {
  .sec {
    padding: 70px 0 60px;
  }

  .industrial-visual {
    width: 280px;
    height: 280px;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
