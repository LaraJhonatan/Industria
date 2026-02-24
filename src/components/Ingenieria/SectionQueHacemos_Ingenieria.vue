<template>
  <section id="que-hacemos" class="sec" aria-label="Qué hacemos">
    <div class="bs-wrap">
      <div class="layout">
        <!-- LEFT CONTENT -->
        <div class="left">
          <div class="kicker" v-reveal data-delay="0">QUÉ HACEMOS</div>

          <h2 class="title" v-reveal data-delay="80">
            Diseño, análisis y optimización de
            <span class="accent">soluciones técnicas</span>
          </h2>

          <p class="sub" v-reveal data-delay="140">
            Abordamos cada proyecto con rigor técnico y sin fórmulas rígidas. Desde el diseño mecánico y eléctrico
            hasta la gestión integral del proyecto, garantizamos entregables claros, medibles y alineados
            con tus objetivos operativos y de negocio.
          </p>

          <div class="tags" v-reveal data-delay="200">
            <span class="tag">Diseño mecánico y eléctrico</span>
            <span class="tag">Análisis y optimización de procesos</span>
            <span class="tag">Gestión integral de proyectos</span>
            <span class="tag">Entregables claros y medibles</span>
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

        <!-- RIGHT VISUAL -->
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
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                Diseño
              </div>
              <div class="vis-chip chip-tr">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Análisis
              </div>
              <div class="vis-chip chip-bl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Gestión
              </div>
              <div class="vis-chip chip-br">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Entregables
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
  { num: '10', label: 'Años de experiencia en ingeniería' },
  { num: '80', label: 'Proyectos técnicos ejecutados' },
  { num: '4', label: 'Áreas de servicio especializadas' },
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

.layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 72px;
}

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

.accent { color: #0071e3; }

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

.right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-wrap { width: 100%; max-width: 420px; }

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
  to { transform: rotate(360deg); }
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

.vis-chip svg { color: #0071e3; flex-shrink: 0; }
.chip-tl { top: 12%; left: 0; animation: float1 5s ease-in-out infinite; }
.chip-tr { top: 22%; right: 0; animation: float2 5.5s ease-in-out infinite; }
.chip-bl { bottom: 16%; left: 2%; animation: float3 4.8s ease-in-out infinite; }
.chip-br { bottom: 22%; right: 0; animation: float4 5.2s ease-in-out infinite; }

@keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes float4 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }

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

.stat:last-child { border-right: none; }
.stat:hover { background: rgba(0, 113, 227, 0.02); }

.stat-num {
  font-size: clamp(36px, 3.5vw, 48px);
  font-weight: 900;
  color: #0071e3;
  line-height: 1;
  margin-bottom: 10px;
  letter-spacing: -1px;
}

.plus { font-size: 0.65em; font-weight: 900; color: rgba(0, 113, 227, 0.6); }
.suffix { font-size: 0.55em; font-weight: 900; color: rgba(0, 113, 227, 0.7); letter-spacing: 0; }

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

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms ease, transform 700ms ease;
  will-change: opacity, transform;
}

.reveal.is-visible { opacity: 1; transform: translateY(0); }

@media (max-width: 1024px) {
  .layout { grid-template-columns: 1fr; gap: 48px; }
  .right { order: -1; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat:nth-child(2) { border-right: none; }
  .stat:nth-child(1), .stat:nth-child(2) { border-bottom: 1px solid rgba(27, 27, 27, 0.07); }
}

@media (max-width: 640px) {
  .sec { padding: 70px 0 60px; }
  .industrial-visual { width: 280px; height: 280px; }
  .stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
