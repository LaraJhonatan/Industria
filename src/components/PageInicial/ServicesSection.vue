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

          <!-- BOTÓN SIEMPRE ABAJO -->
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
.bs-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.services {
  --blue: #0071e3;
  --yellow: #fdda24;

  padding: 90px 0;
  background: #ffffff;
  color: #0b0b0b;
}

.header {
  text-align: center;
  margin-bottom: 64px;
}

.pill {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  border: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 900;
  line-height: 1.15;
}

.title span {
  display: block;
  color: rgba(0, 0, 0, 0.75);
}

.subtitle {
  margin: 20px auto 0;
  max-width: 680px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.66);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* ========================= */
/* SOLUCIÓN PROFESIONAL */
/* ========================= */

.service-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-top {
  flex-grow: 1;
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(0, 113, 227, 0.10);
  display: grid;
  place-items: center;
  color: var(--blue);
  margin-bottom: 18px;
}

.card-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 900;
}

.card-desc {
  margin: 0 0 20px;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.66);
}

.card-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.card-features li {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
}

.check-icon {
  color: var(--yellow);
  flex-shrink: 0;
}

.card-cta {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font-weight: 800;
  background: var(--blue);
  color: #ffffff;
  text-transform: none;

  margin-top: auto;
  /* 👈 CLAVE */
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
