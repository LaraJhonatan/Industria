<template>
  <section id="servicios-especializados" class="sec" aria-label="Servicios especializados">
    <div class="bs-wrap">

      <!-- HEADER -->
      <div class="header">
        <div class="kicker" v-reveal data-delay="0">SERVICIOS ESPECIALIZADOS</div>

        <h2 class="title" v-reveal data-delay="80">
          Elige el servicio que<br /><span class="accent">necesitas hoy</span>
        </h2>

        <p class="sub" v-reveal data-delay="140">
          Manufactura de precisión y ensayos de materiales con los más altos estándares técnicos.
        </p>
      </div>

      <!-- CARDS GRID — 12 tarjetas, 4 por fila -->
      <div class="grid" v-reveal data-delay="0">
        <article v-for="(srv, i) in services" :key="srv.title" class="card" :class="{ featured: srv.featured }"
          :style="{ '--delay': `${i * 40}ms` }">
          <div v-if="srv.featured" class="ribbon">Más importante</div>

          <div class="card-icon">
            <div v-html="srv.icon" class="icon-svg" />
          </div>

          <div class="card-title">{{ srv.title }}</div>
          <div class="card-desc">{{ srv.desc }}</div>

          <ul class="card-list">
            <li v-for="feat in srv.features" :key="feat">
              <svg class="check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ feat }}
            </li>
          </ul>

          <button class="card-btn" @click="scrollToForm">
            Cotizar servicio
          </button>
        </article>
      </div>

      <!-- CTA bottom -->
      <div class="bottom-cta" v-reveal data-delay="0">
        <span>¿Necesitas varios servicios combinados?</span>
        <button class="btn-full" @click="scrollToForm">
          Cotización integral
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
/* ── scroll helper ───────────────────────────────────────── */
function scrollToForm() {
  document.getElementById('formulario-proyectos')?.scrollIntoView({ behavior: 'smooth' })
}

/* ── iconos ───────────────────────────────────────────────── */
const iconCorte = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
const iconDis = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
const iconInd = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
const iconCnc = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`
const iconProbeta = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>`
const iconFibra = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
const iconMasa = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><polyline points="4.93 4.93 7.76 7.76"/><polyline points="16.24 16.24 19.07 19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><polyline points="4.93 19.07 7.76 16.24"/><polyline points="16.24 7.76 19.07 4.93"/></svg>`
const iconDob = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 12 6"/><polyline points="12 6 18 18"/><polyline points="18 18 21 18"/></svg>`
const iconTrac = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="2" x2="12" y2="22"/><path d="M8 6l4-4 4 4"/><path d="M8 18l4 4 4-4"/></svg>`
const iconDim = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="12" x2="22" y2="12"/><path d="M2 8l4 4-4 4"/><path d="M22 8l-4 4 4 4"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`
const iconDur = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
const iconEns = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>`

/* ── 12 servicios: fila 1 (1–4) · fila 2 (5–8) · fila 3 (9–12) ── */
const services = [
  /* FILA 1 */
  {
    icon: iconCorte,
    title: 'Corte láser y manufactura metálica',
    desc: 'Corte de alta precisión en acero, aluminio y metales especiales con tolerancias ajustadas.',
    features: ['Corte en lámina y tubería', 'Alta velocidad y exactitud', 'Acabados de calidad'],
    featured: false,
  },
  {
    icon: iconDis,
    title: 'Diseño de piezas',
    desc: 'Modelado 3D, planos técnicos y validación de piezas para manufactura o prototipado.',
    features: ['CAD/CAM profesional', 'Planos norma ISO/ANSI', 'Iteración rápida'],
    featured: false,
  },
  {
    icon: iconInd,
    title: 'Diseño industrial',
    desc: 'Ingeniería de producto y sistemas: desde el concepto hasta el prototipo funcional.',
    features: ['Análisis FEA/CFD', 'Prototipado funcional', 'Optimización de peso'],
    featured: false,
  },
  {
    icon: iconCnc,
    title: 'CNC mecanizado',
    desc: 'Mecanizado de precisión en torno, fresadora y centros de maquinado multieje.',
    features: ['Tolerancias ±0.01 mm', 'Metales y plásticos técnicos', 'Series cortas y largas'],
    featured: false,
  },
  /* FILA 2 */
  {
    icon: iconProbeta,
    title: 'Probetas',
    desc: 'Fabricación de probetas normalizadas para ensayos mecánicos y metalúrgicos con el más alto rigor técnico.',
    features: ['Normas ASTM / ISO', 'Mecanizado de alta precisión', 'Entrega certificada'],
    featured: false,
  },
  {
    icon: iconFibra,
    title: 'Manejo de fibra de carbono',
    desc: 'Manufactura y laminado de piezas en fibra de carbono para industria aeroespacial y automotriz.',
    features: ['Layup y infusión de vacío', 'Post-curado controlado', 'Inspección por ultrasonido'],
    featured: false,
  },
  {
    icon: iconMasa,
    title: 'Determinación de masa lineal',
    desc: 'Medición de masa lineal en cables, varillas y perfiles metálicos según norma.',
    features: ['Alta resolución de medición', 'Informe técnico detallado', 'Trazabilidad NIST/ONAC'],
    featured: false,
  },
  {
    icon: iconDob,
    title: 'Doblado',
    desc: 'Ensayo de doblado guiado para evaluar ductilidad y resistencia a la fractura del material.',
    features: ['Normas ASTM E290', 'Ángulos configurables', 'Criterio pasa/no pasa'],
    featured: false,
  },
  /* FILA 3 */
  {
    icon: iconTrac,
    title: 'Tracción',
    desc: 'Ensayo de tracción uniaxial para determinar Rm, Re, Rp0.2, A% y Z%.',
    features: ['Rango hasta 600 kN', 'Extensómetro de alta precisión', 'Curva esfuerzo-deformación'],
    featured: false,
  },
  {
    icon: iconDim,
    title: 'Dimensional',
    desc: 'Verificación dimensional de piezas y perfiles con trazabilidad metrológica certificada.',
    features: ['CMM y calibres digitales', 'Informe GD&T', 'Trazabilidad ISO 17025'],
    featured: false,
  },
  {
    icon: iconDur,
    title: 'Dureza',
    desc: 'Ensayos Brinell, Rockwell y Vickers para caracterización de tratamientos térmicos.',
    features: ['HB / HRC / HV', 'Microindentación disponible', 'Mapa de dureza superficial'],
    featured: false,
  },
  {
    icon: iconEns,
    title: 'Ensayo especializado',
    desc: 'Pruebas a medida para requerimientos técnicos específicos o normas particulares.',
    features: ['Diseño del ensayo a medida', 'Normas nacionales e internacionales', 'Asesoría técnica incluida'],
    featured: false,
  },
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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
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

/* ── Section ─────────────────────────────── */
.sec {
  background: #fff;
  padding: 100px 0 80px;
  color: #1b1b1b;
  position: relative;
  overflow: hidden;
}

/* ── Header ──────────────────────────────── */
.header {
  text-align: center;
  margin-bottom: 56px;
}

.kicker {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  margin-bottom: 18px;
}

.title {
  margin: 0 0 14px;
  font-size: clamp(30px, 3.8vw, 50px);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.1;
  color: #1b1b1b;
}

.accent {
  color: #0071e3;
}

.sub {
  font-size: 16px;
  color: rgba(27, 27, 27, 0.6);
  max-width: 56ch;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── Grid — 4 columnas × 3 filas ─────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

/* ── Card ────────────────────────────────── */
.card {
  position: relative;
  border-radius: 18px;
  padding: 28px 22px;
  background: #fff;
  border: 1.5px solid rgba(27, 27, 27, 0.09);
  transition: all 280ms ease;
  transition-delay: var(--delay, 0ms);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.card:hover {
  border-color: rgba(0, 113, 227, 0.35);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 113, 227, 0.1);
}

.card.featured {
  border-color: #0071e3;
  border-width: 2px;
  background: linear-gradient(160deg, rgba(0, 113, 227, 0.04) 0%, #fff 100%);
  box-shadow: 0 8px 32px rgba(0, 113, 227, 0.14);
}

.card.featured:hover {
  box-shadow: 0 20px 50px rgba(0, 113, 227, 0.22);
}

/* ── Ribbon ──────────────────────────────── */
.ribbon {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  background: #0071e3;
  color: #fff;
  font-size: 10.5px;
  font-weight: 900;
  padding: 4px 14px;
  border-radius: 0 0 10px 10px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* ── Icon ────────────────────────────────── */
.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(0, 113, 227, 0.07);
  border: 1.5px solid rgba(0, 113, 227, 0.18);
  color: #0071e3;
  margin-bottom: 16px;
  margin-top: 8px;
  flex-shrink: 0;
}

.card.featured .card-icon {
  background: rgba(0, 113, 227, 0.12);
  border-color: rgba(0, 113, 227, 0.3);
}

.icon-svg :deep(svg) {
  display: block;
}

/* ── Content ─────────────────────────────── */
.card-title {
  font-size: 15px;
  font-weight: 900;
  color: #1b1b1b;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card.featured .card-title {
  color: #0071e3;
}

.card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.55);
  margin-bottom: 18px;
  flex: 1;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: rgba(27, 27, 27, 0.65);
  line-height: 1.4;
}

.check {
  color: #0071e3;
  flex-shrink: 0;
  margin-top: 1px;
}

.card.featured .check {
  color: #fdda24;
  filter: drop-shadow(0 0 3px rgba(253, 218, 36, 0.5));
}

/* ── Buttons ─────────────────────────────── */
.card-btn {
  display: block;
  width: 100%;
  padding: 11px 0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  background: rgba(0, 113, 227, 0.06);
  border: 1.5px solid rgba(0, 113, 227, 0.15);
  color: #0071e3;
  transition: all 220ms ease;
  margin-top: auto;
}

.card-btn:hover {
  background: #0071e3;
  color: #fff;
  border-color: #0071e3;
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
}

.card.featured .card-btn {
  background: #0071e3;
  border-color: #0071e3;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.25);
}

.card.featured .card-btn:hover {
  background: #0062c8;
  box-shadow: 0 6px 20px rgba(0, 113, 227, 0.4);
}

/* ── Bottom CTA ──────────────────────────── */
.bottom-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  background: rgba(27, 27, 27, 0.02);
  border: 1.5px solid rgba(27, 27, 27, 0.08);
  border-radius: 16px;
  padding: 20px 28px;
}

.bottom-cta span {
  font-size: 15px;
  color: rgba(27, 27, 27, 0.65);
  font-weight: 600;
}

.btn-full {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 24px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 14px;
  color: #1b1b1b;
  background: #fdda24;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(253, 218, 36, 0.3);
  transition: all 250ms ease;
  white-space: nowrap;
}

.btn-full:hover {
  background: #f0cc10;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(253, 218, 36, 0.4);
}

/* ── Reveal ──────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
  will-change: opacity, transform;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ──────────────────────────── */
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .sec {
    padding: 70px 0 60px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
