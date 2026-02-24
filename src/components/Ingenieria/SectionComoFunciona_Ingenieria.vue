<template>
  <section id="como-funciona" class="sec" aria-label="Cómo funciona el proceso">
    <div class="bs-wrap">

      <!-- HEADER -->
      <div class="header" v-reveal data-delay="0">
        <div class="kicker">ONBOARDING</div>
        <h2 class="title">Todo listo en tan solo <span class="accent">4 semanas</span></h2>
        <p class="sub">Nuestro proceso simplificado garantiza que tu proyecto esté en marcha de manera rápida y
          eficiente</p>
      </div>

      <!-- STEPS -->
      <div class="steps" v-reveal data-delay="80">
        <div v-for="(step, i) in steps" :key="i" class="step">

          <div class="step-top">
            <div class="step-label">{{ step.label }}</div>
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>

          <!-- Círculo completo con icono — igual que la imagen -->
          <div class="step-bottom">
            <div class="circle">
              <div class="circle-icon" v-html="step.icon" />
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const iconDiag = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`
const iconDis = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
const iconExec = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.8"><rect x="2" y="3" width="8" height="8" rx="1.5"/><rect x="14" y="3" width="8" height="8" rx="1.5"/><rect x="14" y="13" width="8" height="8" rx="1.5"/><rect x="2" y="13" width="8" height="8" rx="1.5"/></svg>`
const iconDel = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`

const steps = [
  {
    label: 'Semana 1: Diagnóstico',
    title: 'Diagnóstico',
    desc: 'Nos sumergimos en tu operación para entender tus procesos, identificar oportunidades y definir el alcance exacto del proyecto.',
    icon: iconDiag,
  },
  {
    label: 'Semana 2: Diseño',
    title: 'Diseño',
    desc: 'Desarrollamos las soluciones técnicas adaptadas a tus necesidades, con planos y especificaciones detalladas.',
    icon: iconDis,
  },
  {
    label: 'Semana 3: Ejecución',
    title: 'Ejecución',
    desc: 'Implementamos las soluciones con acompañamiento técnico constante, asegurando integración fluida con tus sistemas.',
    icon: iconExec,
  },
  {
    label: 'Semana 4: Entrega',
    title: 'Entrega',
    desc: 'Validamos resultados, entregamos la documentación técnica completa y te acompañamos en los ajustes finales.',
    icon: iconDel,
  },
]

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
.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.sec {
  background: #ffffff;
  padding: 100px 0 80px;
  color: #1b1b1b;
  position: relative;
}

/* ── Header ─────────────────────── */
.header {
  margin-bottom: 48px;
}

.kicker {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(27, 27, 27, 0.36);
  margin-bottom: 14px;
}

.title {
  margin: 0 0 12px;
  font-size: clamp(28px, 3.6vw, 50px);
  font-weight: 900;
  letter-spacing: -1.2px;
  line-height: 1.08;
  color: #1b1b1b;
}

.accent {
  color: #0071e3;
}

.sub {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(27, 27, 27, 0.52);
  max-width: 60ch;
  margin: 0;
}

/* ══════════════════════════════════
   STEPS — contenedor único bordeado
   ══════════════════════════════════ */
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1.5px solid rgba(27, 27, 27, 0.1);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

/* ── Step card ──────────────────── */
.step {
  display: flex;
  flex-direction: column;
  border-right: 1.5px dashed rgba(27, 27, 27, 0.1);
  transition: background 220ms ease;
  padding-bottom: 28px;
}

.step:last-child {
  border-right: none;
}

.step:hover {
  background: rgba(0, 113, 227, 0.018);
}

/* ── Top text ───────────────────── */
.step-top {
  padding: 24px 20px 20px;
  flex: 1;
}

.step-label {
  font-size: 12px;
  font-weight: 900;
  color: #1b1b1b;
  margin-bottom: 6px;
  letter-spacing: -0.1px;
}

.step-title {
  display: none;
  /* el título está en step-label como en la imagen */
}

.step-desc {
  font-size: 12.5px;
  line-height: 1.65;
  color: rgba(27, 27, 27, 0.52);
  margin-top: 8px;
}

/* ══════════════════════════════════
   CÍRCULO — como en la imagen 2
   Completo, con borde dashed,
   fondo azul muy suave, icono azul
   ══════════════════════════════════ */
.step-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px 0;
}

.circle {
  width: 110px;
  height: 110px;
  border-radius: 999px;
  /* Fondo azul muy suave igual que la imagen */
  background: rgba(0, 113, 227, 0.06);
  /* Borde dashed azul suave */
  border: 1.5px dashed rgba(0, 113, 227, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 250ms ease, transform 280ms ease, border-color 250ms ease;
}

.step:hover .circle {
  background: rgba(0, 113, 227, 0.12);
  border-color: rgba(0, 113, 227, 0.45);
  transform: translateY(-4px);
}

.circle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Reveal ─────────────────────── */
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

/* ── Responsive ─────────────────── */
@media (max-width: 1024px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .step:nth-child(2) {
    border-right: none;
  }

  .step:nth-child(3) {
    border-top: 1.5px dashed rgba(27, 27, 27, 0.1);
  }

  .step:nth-child(4) {
    border-right: none;
    border-top: 1.5px dashed rgba(27, 27, 27, 0.1);
  }
}

@media (max-width: 640px) {
  .sec {
    padding: 72px 0 60px;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .step {
    border-right: none;
    border-top: 1.5px dashed rgba(27, 27, 27, 0.1);
  }

  .step:first-child {
    border-top: none;
  }

  .circle {
    width: 90px;
    height: 90px;
  }
}
</style>
