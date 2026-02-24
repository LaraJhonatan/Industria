<template>
  <section class="hero" aria-label="Hero">
    <div class="hero-bg" aria-hidden="true" />
    <div class="hero-fade-top" aria-hidden="true" />
    <div class="hero-fade-bottom" aria-hidden="true" />

    <div class="bs-wrap">
      <div class="grid" :class="{ ready }">
        <!-- IZQUIERDA -->
        <div class="left">
          <div class="pill">
            Servicios industriales integrales • Importación • Ingeniería a medida
          </div>

          <h1 class="h1">
            Soluciones industriales
            <span>que se integran a tu operación</span>
            y entregan resultados.
          </h1>

          <p class="p">
            Somos una empresa de servicios industriales integrales: importamos maquinaria de alto desempeño,
            desarrollamos soluciones de ingeniería a medida y ejecutamos servicios técnicos avanzados.
            No ofrecemos "genéricos": resolvemos problemas reales con criterio técnico y enfoque estratégico.
          </p>

          <div class="form">
            <input v-model="email" class="email" type="email" autocomplete="email" inputmode="email"
              placeholder="Tu correo corporativo (para enviarte propuesta)" aria-label="Correo corporativo" />

            <q-btn unelevated class="cta" label="COTIZAR SOLUCIÓN" @click="onQuote" />
          </div>

          <div class="hint">
            <span class="hintText">¿Tienes un reto técnico específico?</span>
            <button class="hintLink" type="button" @click="scrollTo('#que-hacemos')">
              Cuéntanos el caso →
            </button>
          </div>

          <div class="miniTitle">LO QUE HACEMOS (SIN HUMO)</div>
          <ul class="bullets">
            <li>Importación y gestión de maquinaria industrial</li>
            <li>Integración inteligente a procesos productivos</li>
            <li>Ingeniería a medida (diseño, análisis, optimización)</li>
            <li>Servicios técnicos avanzados y puesta en marcha</li>
            <li>Enfoque práctico: reducir costos y elevar productividad</li>
          </ul>
        </div>

        <!-- DERECHA -->
        <div class="right" aria-hidden="true">
          <div class="mock">
            <div class="mockTop">
              <div class="dots">
                <span class="dot" />
                <span class="dot" />
                <span class="dot" />
              </div>

              <div class="tabs">
                <span class="tab">Diagnóstico</span>
                <span class="tab">Diseño</span>
                <span class="tab tabActive">Implementación</span>
              </div>
            </div>

            <div class="mockBody">
              <div class="mockPill">Proyecto en marcha • Alcance definido</div>

              <div class="stats">
                <div class="stat">
                  <div class="statVal">24–72h</div>
                  <div class="statLab">respuesta inicial</div>
                </div>
                <div class="stat">
                  <div class="statVal">A medida</div>
                  <div class="statLab">sin fórmulas rígidas</div>
                </div>
                <div class="stat">
                  <div class="statVal">Operación</div>
                  <div class="statLab">enfoque productivo</div>
                </div>
              </div>

              <div class="bars">
                <div class="bar" style="width: 86%" />
                <div class="bar" style="width: 72%" />
                <div class="bar" style="width: 64%" />
                <div class="bar" style="width: 78%" />
              </div>

              <div class="check">
                <div class="checkHead">
                  <div class="checkTitle">Para cotizar sin vueltas</div>
                  <div class="checkSub">Info mínima para aterrizar el alcance</div>
                </div>

                <div class="checkItems">
                  <div class="checkItem">Industria y proceso</div>
                  <div class="checkItem">Objetivo del proyecto</div>
                  <div class="checkItem">Capacidad / producción</div>
                  <div class="checkItem">Restricciones de planta</div>
                  <div class="checkItem">Plazo esperado</div>
                </div>
              </div>
            </div>
          </div>

          <div class="glow" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')
const ready = ref(false)

function onQuote() {
  const to = 'comercial@novaindustria.co'
  const subject = 'Cotización de solución industrial'
  const body = email.value ? `Correo: ${email.value}%0D%0A%0D%0AContexto: ` : 'Contexto: '
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
}

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
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
  background: #1b1b1b;
  min-height: calc(100vh - 64px);
  padding: 44px 0 56px;
  color: #fff;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(980px 620px at 10% 18%, rgba(0, 113, 227, 0.15), transparent 60%),
    radial-gradient(980px 620px at 82% 44%, rgba(253, 218, 36, 0.08), transparent 60%),
    radial-gradient(780px 520px at 60% 90%, rgba(0, 113, 227, 0.10), transparent 58%);
  pointer-events: none;
  z-index: 0;
}

.hero-fade-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 110px;
  background: linear-gradient(180deg, rgba(27, 27, 27, 1), rgba(27, 27, 27, 0));
  pointer-events: none;
  z-index: 1;
}

.hero-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, rgba(27, 27, 27, 0), rgba(27, 27, 27, 1));
  pointer-events: none;
  z-index: 1;
}

.grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  align-items: center;

  opacity: 0;
  transform: translateY(10px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.grid.ready {
  opacity: 1;
  transform: translateY(0);
}

.left {
  padding-right: 10px;
}

.pill {
  display: inline-flex;
  width: fit-content;
  padding: 9px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(253, 218, 36, 0.3);
  background: rgba(44, 42, 41, 0.8);
  backdrop-filter: blur(12px);
}

.h1 {
  margin: 14px 0 0;
  font-weight: 900;
  letter-spacing: -0.8px;
  line-height: 1.03;
  font-size: clamp(40px, 4.7vw, 60px);
}

.h1 span {
  color: #fdda24;
}

.p {
  margin: 14px 0 0;
  max-width: 78ch;
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
  line-height: 1.7;
}

.form {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
}

.email {
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.96);
  color: #1b1b1b;
  font-size: 14.5px;
  outline: none;
}

.email::placeholder {
  color: rgba(27, 27, 27, 0.55);
}

.email:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.18);
}

.cta {
  height: 48px;
  border-radius: 12px;
  padding: 0 16px;
  font-weight: 900;
  color: #1b1b1b;
  background: #0071e3;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
}

.cta:hover {
  background: #0066cc;
}

.hint {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.hintText {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.70);
}

.hintLink {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12.5px;
  font-weight: 900;
  color: #fdda24;
}

.hintLink:hover {
  text-decoration: underline;
}

.miniTitle {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.bullets {
  margin: 10px 0 0;
  padding-left: 16px;
  color: rgba(255, 255, 255, 0.74);
  font-size: 13px;
  line-height: 1.8;
}

.bullets li {
  margin: 2px 0;
}

/* Mock derecha */
.right {
  position: relative;
  display: grid;
  place-items: center;
  padding-left: 6px;
}

.mock {
  width: min(520px, 100%);
  border-radius: 18px;
  border: 1px solid rgba(253, 218, 36, 0.2);
  background: #2c2a29;
  backdrop-filter: blur(16px);
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.38);
  overflow: hidden;
  transform: translateZ(0);
}

.mockTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.tabs {
  display: flex;
  gap: 8px;
}

.tab {
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.18);
}

.tabActive {
  color: #1b1b1b;
  border-color: #0071e3;
  background: #0071e3;
}

.mockBody {
  padding: 14px;
}

.mockPill {
  display: inline-flex;
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(253, 218, 36, 0.3);
  background: rgba(0, 0, 0, 0.18);
}

.stats {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat {
  border-radius: 14px;
  padding: 10px 10px 9px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.16);
}

.statVal {
  font-weight: 900;
  font-size: 12.5px;
  color: #fdda24;
}

.statLab {
  margin-top: 2px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.58);
}

.bars {
  margin-top: 12px;
  display: grid;
  gap: 7px;
}

.bar {
  height: 6px;
  border-radius: 999px;
  background: #0071e3;
  opacity: 0.75;
}

.check {
  margin-top: 14px;
  border-radius: 16px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.18);
}

.checkTitle {
  font-weight: 900;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.92);
}

.checkSub {
  margin-top: 2px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}

.checkItems {
  margin-top: 10px;
  display: grid;
  gap: 8px;
}

.checkItem {
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.70);
  font-size: 11.5px;
}

.glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(420px 280px at 55% 50%, rgba(0, 113, 227, 0.16), transparent 60%);
  filter: blur(16px);
  z-index: -1;
}

@media (max-width: 1024px) {
  .hero {
    padding: 32px 0 48px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .right {
    margin-top: 14px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .form {
    grid-template-columns: 1fr;
  }

  .cta {
    width: 100%;
  }
}
</style>
