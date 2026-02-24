<template>
  <section class="faq">
    <div class="bs-wrap">
      <div class="header" v-reveal>
        <h2 class="title">Preguntas frecuentes</h2>
        <p class="subtitle">
          Respuestas rápidas a las preguntas más comunes sobre nuestros servicios.
          Si no encuentras lo que buscas,
          <a href="#contacto" class="link" @click.prevent="scrollTo('#contacto')">contáctanos directamente</a>.
        </p>
      </div>

      <div class="faq-list">
        <div v-for="(item, idx) in faqs" :key="idx" class="faq-item" :class="{ open: openIndex === idx }" v-reveal
          :data-delay="idx * 60">
          <button class="faq-question" type="button" @click="toggle(idx)">
            <span class="question-text">{{ item.question }}</span>
            <q-icon :name="openIndex === idx ? 'expand_less' : 'expand_more'" size="24px" class="expand-icon" />
          </button>

          <div class="faq-answer" :class="{ open: openIndex === idx }">
            <div class="answer-content">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const faqs = [
  {
    question: '¿Qué tipo de maquinaria industrial pueden importar?',
    answer:
      'Gestionamos la importación de equipos industriales de diversas categorías: líneas de producción, sistemas de automatización, maquinaria de procesamiento, equipos de empaque, sistemas de transporte industrial, entre otros. Trabajamos con proveedores certificados en Europa, Asia y América, seleccionando la opción técnica y comercialmente más conveniente para cada proyecto.'
  },
  {
    question: '¿Cuánto tiempo toma implementar una solución completa?',
    answer:
      'El tiempo de implementación varía según el alcance del proyecto. Para servicios técnicos locales, el arranque puede ser en 1-2 semanas. Para proyectos con importación de maquinaria, el ciclo completo (desde selección técnica hasta puesta en marcha) toma entre 8-16 semanas, dependiendo de origen, disponibilidad y complejidad de instalación. Desde la semana 1 te entregamos un cronograma detallado con fechas realistas.'
  },
  {
    question: '¿Trabajan con empresas de todos los tamaños?',
    answer:
      'Sí. Atendemos desde startups técnicas y empresas medianas hasta grandes corporaciones industriales. Nuestro enfoque es resolver necesidades reales con criterio técnico, independientemente del tamaño de la compañía. Lo importante es que el proyecto tenga alcance definido y objetivos claros.'
  },
  {
    question: '¿Cómo funciona el proceso de cotización?',
    answer:
      'El proceso es directo: (1) Nos cuentas tu necesidad por correo o formulario, (2) En 24-72h te contactamos para afinar detalles técnicos y operativos, (3) Te enviamos una propuesta con alcance claro, entregables, cronograma y costos. Si decides avanzar, arrancamos con un diagnóstico técnico en campo (si aplica) y formalizamos el proyecto.'
  },
  {
    question: '¿Ofrecen soporte técnico después de la implementación?',
    answer:
      'Sí. Todos nuestros proyectos incluyen acompañamiento post-implementación (el tiempo varía según el alcance). Además, ofrecemos contratos de mantenimiento preventivo y correctivo, así como asistencia técnica bajo demanda. El objetivo es que tu operación quede estable y tu equipo capacitado para operar el sistema sin dependencias.'
  },
  {
    question: '¿En qué ciudades o regiones operan?',
    answer:
      'Nuestra base de operaciones está en Colombia, pero atendemos proyectos en todo el territorio nacional. Para importaciones y servicios técnicos especializados, también gestionamos proyectos en países vecinos (Ecuador, Perú, Panamá). La logística y alcance geográfico se define caso por caso según viabilidad técnica y comercial.'
  }
]

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
  padding: 100px 24px;
  position: relative;
  z-index: 2;
}

.faq {
  --blue: #0071e3;
  --yellow: #fdda24;

  min-height: 100svh;
  background: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  color: #0b0b0b;
}

.header {
  text-align: center;
  margin-bottom: 56px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #0b0b0b;
}

.subtitle {
  margin: 20px auto 0;
  max-width: 780px;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.66);
}

.link {
  color: var(--blue);
  text-decoration: none;
  font-weight: 700;
}

.link:hover {
  text-decoration: underline;
}

/* LISTA */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* CARD BLANCA, BORDE SUAVE */
.faq-item {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.06);
  transition: border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease;
}

.faq-item.open {
  border-color: rgba(0, 113, 227, 0.35);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.09);
}

.faq-question {
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 200ms ease;
}

.faq-question:hover {
  background: rgba(0, 0, 0, 0.03);
}

.question-text {
  font-size: 16px;
  font-weight: 800;
  color: #0b0b0b;
  line-height: 1.4;
}

.expand-icon {
  color: var(--blue);
  flex-shrink: 0;
  transition: transform 300ms ease;
}

.faq-item.open .expand-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 400ms ease;
}

.faq-answer.open {
  max-height: 900px;
}

.answer-content {
  padding: 0 24px 24px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.66);
}

/* reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .bs-wrap {
    padding: 70px 24px;
  }

  .faq-question {
    padding: 16px 20px;
  }

  .question-text {
    font-size: 15px;
  }

  .answer-content {
    padding: 0 20px 20px;
    font-size: 14px;
  }
}
</style>
