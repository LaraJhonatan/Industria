<template>
  <section class="sectors">
    <div class="bs-wrap">
      <div class="header" v-reveal>
        <h2 class="title">
          Sectores con los que
          <span>trabajamos</span>
        </h2>
        <p class="subtitle">
          Experiencia comprobada en diversos sectores industriales.
          Adaptamos nuestras soluciones a las necesidades específicas de cada industria.
        </p>
      </div>

      <div class="sectors-grid">
        <div 
          v-for="(sector, idx) in sectors" 
          :key="idx"
          class="sector-card"
          v-reveal
          :data-delay="idx * 80"
        >
          <div class="sector-icon">
            <q-icon :name="sector.icon" size="28px" />
          </div>
          <div class="sector-content">
            <h3 class="sector-title">{{ sector.title }}</h3>
            <p class="sector-desc">{{ sector.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sectors = [
  {
    icon: 'factory',
    title: 'Manufactura',
    desc: 'Optimización de líneas de producción y automatización de procesos industriales.'
  },
  {
    icon: 'water_drop',
    title: 'Alimentos y bebidas',
    desc: 'Equipos especializados y soluciones técnicas para procesamiento alimentario.'
  },
  {
    icon: 'science',
    title: 'Farmacéutico',
    desc: 'Sistemas de precisión y control de calidad para la industria farmacéutica.'
  },
  {
    icon: 'local_shipping',
    title: 'Logística',
    desc: 'Automatización y optimización de centros de distribución y almacenamiento.'
  },
  {
    icon: 'construction',
    title: 'Construcción',
    desc: 'Maquinaria y equipos especializados para proyectos de construcción e infraestructura.'
  },
  {
    icon: 'agriculture',
    title: 'Agroindustria',
    desc: 'Soluciones técnicas para procesamiento, empaque y conservación de productos agrícolas.'
  }
]

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

.sectors {
  padding: 100px 0;
  background: #fff;
}

.header {
  text-align: center;
  margin-bottom: 64px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #1b1b1b;
}

.title span {
  display: block;
  color: #0071e3;
}

.subtitle {
  margin: 20px auto 0;
  max-width: 680px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.7);
}

.sectors-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.sector-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: #fff;
  border: 2px solid rgba(27, 27, 27, 0.08);
  border-radius: 16px;
  transition: all 300ms ease;
}

.sector-card:hover {
  border-color: #0071e3;
  box-shadow: 0 12px 40px rgba(0, 113, 227, 0.12);
  transform: translateY(-2px);
}

.sector-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(0, 113, 227, 0.1);
  display: grid;
  place-items: center;
  color: #0071e3;
  flex-shrink: 0;
}

.sector-title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  margin-bottom: 8px;
}

.sector-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.65);
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

@media (max-width: 768px) {
  .sectors-grid {
    grid-template-columns: 1fr;
  }
  
  .sectors {
    padding: 70px 0;
  }
}

@media (max-width: 640px) {
  .sector-card {
    padding: 20px;
    gap: 16px;
  }
  
  .sector-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
