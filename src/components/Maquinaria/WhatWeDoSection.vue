<template>
  <section id="inicio" class="hero" aria-label="Suministro de maquinaria y equipos industriales">

    <div class="bs-wrap">
      <div class="layout">

        <!-- ── LEFT ── -->
        <div class="left" :class="{ ready }">

          <div class="kicker">
            <span class="kicker-dot" />
            Maquinaria & Equipos
          </div>

          <h1 class="headline">
            Suministro de<br />
            <span class="accent">maquinaria y equipos</span><br />
            industriales.
          </h1>

          <p class="sub">
            Importación y gestión de equipos de alto desempeño con criterios técnicos rigurosos.
            Del diagnóstico al arranque, con soporte completo en cada etapa.
          </p>

          <div class="actions">
            <button class="btn-primary" @click="scrollToForm">
              Solicitar cotización
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href="#que-hacemos" class="btn-ghost">Conocer más</a>
          </div>

          <!-- Feature list -->
          <div class="features">
            <div class="feat" v-for="f in features" :key="f">
              <div class="feat-check">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>{{ f }}</span>
            </div>
          </div>
        </div>

        <!-- ── RIGHT panel ── -->
        <div class="right" :class="{ ready }" aria-hidden="true">
          <div class="panel">
            <div class="panel-header">
              <span class="panel-dot red" />
              <span class="panel-dot yellow" />
              <span class="panel-dot green" />
              <span class="panel-title">Estado de suministros</span>
              <span class="panel-live">
                <span class="panel-live-dot" />
                En vivo
              </span>
            </div>

            <div class="panel-body">
              <div class="panel-row" v-for="row in panelRows" :key="row.name">
                <div class="panel-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div class="panel-info">
                  <div class="panel-name">{{ row.name }}</div>
                  <div class="panel-bar">
                    <span class="bar-fill" :style="{ width: row.pct + '%' }" />
                  </div>
                </div>
                <span class="panel-status">Disponible</span>
              </div>

              <div class="panel-divider" />

              <div class="panel-summary">
                <div class="summary-check">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div class="summary-title">Equipos listos para cotizar</div>
                  <div class="summary-sub">Respuesta técnica en menos de 24 h</div>
                </div>
              </div>
            </div>

            <div class="badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Alto desempeño
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ready = ref(false)

const features = [
  'Selección técnica personalizada',
  'Gestión completa de importación',
  'Instalación y puesta en marcha',
  'Garantía y soporte post-venta',
]

const panelRows = [
  { name: 'Equipos de proceso', pct: 94 },
  { name: 'Maquinaria de precisión', pct: 88 },
  { name: 'Sistemas de automatización', pct: 91 },
  { name: 'Equipos de laboratorio', pct: 85 },
]

function scrollToForm() {
  document.getElementById('formulario-proyectos')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  requestAnimationFrame(() => setTimeout(() => { ready.value = true }, 60))
})
</script>

<style scoped>
.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 100px 0 90px;
  color: #1b1b1b;
}

.layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* ─── Entrance ────────────────────────── */
.left {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.right {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 700ms ease 180ms, transform 700ms ease 180ms;
}

.left.ready,
.right.ready {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Kicker ──────────────────────────── */
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1b1b1b;
  border: 2px solid rgba(0, 113, 227, 0.2);
  background: rgba(0, 113, 227, 0.06);
  margin-bottom: 28px;
}

.kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #fdda24;
  box-shadow: 0 0 8px rgba(253, 218, 36, 0.7);
  animation: blink 2.2s ease-in-out infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
}

/* ─── Headline ────────────────────────── */
.headline {
  margin: 0 0 20px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.08;
  font-size: clamp(38px, 4.2vw, 60px);
  color: #1b1b1b;
}

.accent {
  color: #0071e3;
}

.sub {
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.72;
  color: rgba(27, 27, 27, 0.65);
  max-width: 54ch;
}

/* ─── Actions ─────────────────────────── */
.actions {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  padding: 0 26px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
  background: #0071e3;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 113, 227, 0.28);
  transition: all 250ms ease;
}

.btn-primary:hover {
  background: #0062c8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.38);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 50px;
  padding: 0 22px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.75);
  background: transparent;
  border: 2px solid rgba(27, 27, 27, 0.12);
  text-decoration: none;
  transition: all 250ms ease;
}

.btn-ghost:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.04);
}

/* ─── Features ────────────────────────── */
.features {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.75);
}

.feat-check {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  color: #0071e3;
  flex-shrink: 0;
}

/* ─── Panel ───────────────────────────── */
.panel {
  position: relative;
  border-radius: 18px;
  border: 2px solid rgba(27, 27, 27, 0.08);
  background: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: visible;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(27, 27, 27, 0.07);
  background: rgba(27, 27, 27, 0.02);
  border-radius: 16px 16px 0 0;
}

.panel-dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
  flex-shrink: 0;
}

.panel-dot.red {
  background: #ff5f57;
}

.panel-dot.yellow {
  background: #febc2e;
}

.panel-dot.green {
  background: #28c840;
}

.panel-title {
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.4);
  letter-spacing: 0.5px;
  flex: 1;
}

.panel-live {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 800;
  color: #1a9430;
  background: rgba(40, 200, 64, 0.1);
  border: 1px solid rgba(40, 200, 64, 0.2);
  padding: 3px 10px;
  border-radius: 999px;
}

.panel-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #28c840;
  animation: blink 2s ease-in-out infinite;
}

.panel-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.panel-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: rgba(0, 113, 227, 0.08);
  color: #0071e3;
  flex-shrink: 0;
  border: 1.5px solid rgba(0, 113, 227, 0.15);
}

.panel-info {
  flex: 1;
  min-width: 0;
}

.panel-name {
  font-size: 13px;
  font-weight: 800;
  color: #1b1b1b;
  margin-bottom: 6px;
}

.panel-bar {
  height: 5px;
  background: rgba(27, 27, 27, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #0071e3, #4da3ff);
  border-radius: 999px;
}

.panel-status {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(40, 200, 64, 0.1);
  border: 1px solid rgba(40, 200, 64, 0.2);
  color: #1a9430;
  flex-shrink: 0;
  white-space: nowrap;
}

.panel-divider {
  height: 1px;
  background: rgba(27, 27, 27, 0.07);
  margin: 2px 0;
}

.panel-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-check {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(40, 200, 64, 0.1);
  color: #1a9430;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 1.5px solid rgba(40, 200, 64, 0.2);
}

.summary-title {
  font-size: 14px;
  font-weight: 900;
  color: #1b1b1b;
}

.summary-sub {
  font-size: 12px;
  color: rgba(27, 27, 27, 0.5);
  margin-top: 2px;
}

/* ─── Badge ───────────────────────────── */
.badge {
  position: absolute;
  top: -16px;
  right: 24px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  background: #fdda24;
  color: #1b1b1b;
  font-size: 12px;
  font-weight: 900;
  box-shadow: 0 4px 20px rgba(253, 218, 36, 0.35);
  animation: float 4s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* ─── Responsive ──────────────────────── */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero {
    padding: 80px 0;
  }
}

@media (max-width: 640px) {
  .headline {
    font-size: clamp(34px, 9vw, 48px);
  }
}
</style>
