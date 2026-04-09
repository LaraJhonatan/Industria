<template>
  <section id="servicios" class="services">
    <div class="bs-wrap">
      <div class="header" v-reveal>
        <div class="pill">NUESTROS SERVICIOS</div>
        <h2 class="title">
          Tres pilares para elevar
          <span>tu operación industrial</span>
        </h2>
        <p class="subtitle">
          No vendemos productos genéricos. Resolvemos necesidades reales con
          criterio técnico y enfoque estratégico.
        </p>
      </div>

      <div class="services-grid">
        <article v-for="(service, idx) in services" :key="idx" class="service-card" v-reveal :data-delay="idx * 100">
          <div class="card-top">
            <div class="card-icon">
              <q-icon :name="service.icon" size="32px" />
            </div>

            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-desc">{{ service.desc }}</p>

            <ul class="card-features">
              <li v-for="(feature, i) in service.features" :key="i">
                <q-icon name="check_circle" size="18px" class="check-icon" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <q-btn unelevated class="card-cta" :label="service.cta" icon-right="arrow_forward"
            @click="handleServiceClick(service)" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const services = [
  {
    icon: 'precision_manufacturing',
    title: 'Suministro de maquinaria y equipos industriales',
    desc: 'Importación y gestión de equipos de alto desempeño con criterios técnicos rigurosos.',
    features: [
      'Selección técnica personalizada',
      'Gestión completa de importación',
      'Instalación y puesta en marcha',
      'Garantía y soporte post-venta'
    ],
    cta: 'Explorar maquinaria',
    action: 'goMaquinaria'
  },
  {
    icon: 'build_circle',
    title: 'Servicios industriales',
    desc: 'Soporte especializado para mantener y optimizar tu operación industrial.',
    features: [
      'Mantenimiento preventivo y correctivo',
      'Diagnóstico técnico en campo',
      'Montajes especializados',
      'Asistencia técnica permanente'
    ],
    cta: 'Ver servicios',
    action: 'goServiciosIndustriales'
  },
  {
    icon: 'engineering',
    title: 'Ingeniería y proyectos',
    desc: 'Diseño, análisis y optimización de soluciones técnicas sin fórmulas rígidas.',
    features: [
      'Diseño mecánico y eléctrico',
      'Análisis y optimización de procesos',
      'Gestión integral de proyectos',
      'Entregables claros y medibles'
    ],
    cta: 'Iniciar proyecto',
    action: 'goIngenieria'
  }
]

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleServiceClick(service) {
  if (service.action === 'goServiciosIndustriales') {
    router.push('/servicios-industriales')
    return
  }
  if (service.action === 'goMaquinaria') {
    router.push('/maquinaria')
    return
  }
  if (service.action === 'goIngenieria') {
    router.push('/ingenieria')
    return
  }
  scrollTo('#contacto')
}
</script>

<style scoped>
/* ══ Wrap ════════════════════════════════════════ */
.bs-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ══ Section ═════════════════════════════════════ */
.services {
  --blue: #0071e3;
  --yellow: #fdda24;

  padding: 100px 0;
  background: #ffffff;
  color: #0b0b0b;
}

/* ══ Header ══════════════════════════════════════ */
.header {
  text-align: center;
  margin-bottom: 72px;
}

.pill {
  display: inline-flex;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 1px solid rgba(0, 0, 0, 0.14);
  color: rgba(0, 0, 0, 0.50);
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 900;
  line-height: 1.15;
  color: #0b1220;
}

.title span {
  display: block;
  color: rgba(11, 18, 32, 0.55);
}

.subtitle {
  margin: 20px auto 0;
  max-width: 620px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.55);
}

/* ══ Grid ════════════════════════════════════════ */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

/* ══ Card — blanca, efecto 3D sobre fondo blanco ═ */
.service-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 36px 32px 32px;

  /* Borde sutil */
  border: 1px solid rgba(11, 18, 32, 0.08);
  border-top-color: rgba(11, 18, 32, 0.06);

  /* Sombras en capas — efecto 3D flotante sobre blanco */
  box-shadow:
    0 2px 4px rgba(11, 18, 32, 0.06),
    0 6px 16px rgba(11, 18, 32, 0.10),
    0 18px 40px rgba(11, 18, 32, 0.13),
    0 36px 64px rgba(11, 18, 32, 0.11),
    0 64px 80px -24px rgba(11, 18, 32, 0.08);

  display: flex;
  flex-direction: column;
  height: 100%;

  transition: transform 300ms cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 300ms ease;
  will-change: transform;
}

.service-card:hover {
  transform: translateY(-10px) scale(1.015);
  box-shadow:
    0 4px 8px rgba(11, 18, 32, 0.10),
    0 12px 28px rgba(11, 18, 32, 0.15),
    0 28px 56px rgba(11, 18, 32, 0.18),
    0 52px 80px rgba(11, 18, 32, 0.14),
    0 80px 100px -28px rgba(11, 18, 32, 0.10),
    0 0 32px rgba(0, 113, 227, 0.06);
}

.card-top {
  flex-grow: 1;
}

/* ══ Ícono ═══════════════════════════════════════ */
.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(0, 113, 227, 0.08);
  border: 1px solid rgba(0, 113, 227, 0.18);
  display: grid;
  place-items: center;
  color: var(--blue);
  margin-bottom: 22px;
  box-shadow: 0 0 20px rgba(0, 113, 227, 0.10);
}

/* ══ Textos ══════════════════════════════════════ */
.card-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.3;
}

.card-desc {
  margin: 0 0 22px;
  font-size: 15px;
  line-height: 1.65;
  color: rgba(11, 18, 32, 0.55);
}

/* ══ Lista features ══════════════════════════════ */
.card-features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
}

.card-features li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 13px;
  font-size: 14px;
  color: rgba(11, 18, 32, 0.72);
}

.check-icon {
  color: var(--yellow);
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(253, 218, 36, 0.35));
}

/* ══ Botón CTA ═══════════════════════════════════ */
.card-cta {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0;
  background: var(--blue);
  color: #ffffff;
  text-transform: none;
  margin-top: auto;
  box-shadow:
    0 4px 18px rgba(0, 113, 227, 0.30),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transition: background 180ms, box-shadow 180ms, transform 180ms;
}

.card-cta :deep(.q-btn__content) {
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.card-cta:hover {
  background: #005fcd;
  box-shadow:
    0 8px 28px rgba(0, 113, 227, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

/* ══ Reveal ══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .services {
    padding: 64px 0;
  }

  .service-card {
    padding: 28px 24px 24px;
  }
}
</style>
