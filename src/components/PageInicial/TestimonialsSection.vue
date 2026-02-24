<template>
  <section class="testimonials">
    <div class="bs-wrap">
      <div class="header" v-reveal>
        <div class="pill">CASOS DE ÉXITO</div>
        <h2 class="title">
          Lo que dicen nuestros
          <span>clientes</span>
        </h2>
      </div>

      <div class="testimonials-grid">
        <article v-for="(item, idx) in testimonials" :key="idx" class="testimonial-card" v-reveal
          :data-delay="idx * 100">
          <p class="quote">{{ item.quote }}</p>

          <div class="author">
            <div class="avatar">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.name" />
              <span v-else class="avatar-placeholder">{{ getInitials(item.name) }}</span>
            </div>

            <div class="author-info">
              <div class="author-name">{{ item.name }}</div>
              <div class="author-role">{{ item.role }}</div>
              <div class="author-company">{{ item.company }}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    quote:
      'La implementación del sistema de automatización redujo nuestros tiempos de producción en un 40%. El equipo de Nova Industria nos acompañó desde el diagnóstico hasta la puesta en marcha, con un nivel de profesionalismo excepcional.',
    name: 'Carlos Mendoza',
    role: 'Gerente de Operaciones',
    company: 'Alimentos del Valle S.A.S.',
    avatar: null
  },
  {
    quote:
      'Necesitábamos importar equipos especializados de Europa con tiempos ajustados. Nova Industria gestionó todo el proceso de forma impecable: desde la selección técnica hasta la instalación. El proyecto quedó operando en 6 semanas.',
    name: 'María Rodríguez',
    role: 'Directora de Proyectos',
    company: 'Farmacéutica Colombia',
    avatar: null
  },
  {
    quote:
      'Trabajamos con Nova Industria en la optimización de nuestra línea de empaque. Su enfoque técnico y capacidad de adaptarse a nuestras necesidades fue clave. Logramos aumentar la eficiencia del proceso en 35%.',
    name: 'Jorge Suárez',
    role: 'Jefe de Planta',
    company: 'Industrias Lácteas del Norte',
    avatar: null
  },
  {
    quote:
      'El soporte técnico que recibimos fue excepcional. Tuvimos un problema crítico en un equipo importado y el equipo de Nova respondió en menos de 24 horas. Solucionaron el inconveniente y nos dejaron el sistema estabilizado.',
    name: 'Ana Torres',
    role: 'Gerente de Mantenimiento',
    company: 'Bebidas Tropicales S.A.',
    avatar: null
  },
  {
    quote:
      'Confiamos en Nova Industria para el diseño e implementación de nuestro nuevo centro de distribución automatizado. El nivel de ingeniería y la ejecución del proyecto superaron nuestras expectativas.',
    name: 'Roberto Gómez',
    role: 'Director de Logística',
    company: 'Distribuidora Nacional',
    avatar: null
  },
  {
    quote:
      'Desde hace 3 años trabajamos con Nova en el mantenimiento de nuestra planta. Su conocimiento técnico y respuesta rápida ante emergencias nos ha permitido mantener nuestra operación sin interrupciones.',
    name: 'Patricia Vargas',
    role: 'Gerente General',
    company: 'Textiles Andinos',
    avatar: null
  }
]

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

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
.bs-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.testimonials {
  --blue: #0071e3;
  --yellow: #fdda24;

  min-height: 100svh;
  display: flex;
  align-items: center;
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
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #0b0b0b;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #0b0b0b;
}

.title span {
  display: block;
  color: rgba(0, 0, 0, 0.78);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);
  transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 113, 227, 0.40);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.12);
}

.quote {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.72);
  flex-grow: 1;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(0, 113, 227, 0.10);
  border: 2px solid rgba(0, 113, 227, 0.18);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 800;
  color: var(--blue);
}

.author-name {
  font-size: 15px;
  font-weight: 800;
  color: #0b0b0b;
  margin-bottom: 2px;
}

.author-role {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.62);
  margin-bottom: 2px;
}

.author-company {
  font-size: 13px;
  color: var(--blue);
  font-weight: 800;
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
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 70px 0;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .testimonial-card {
    padding: 24px;
  }
}
</style>
