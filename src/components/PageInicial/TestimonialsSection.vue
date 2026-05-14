<template>
  <section class="testimonials">
    <div class="bs-wrap">
      <div class="header" v-reveal>
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
    quote: 'ZIFCOR nos permitió conectar con proveedores industriales que no hubiéramos encontrado solos. En menos de una semana ya teníamos cotizaciones de calidad.',
    name: 'Jhoan Forero',
    avatar: null
  },
  {
    quote: 'La plataforma es muy intuitiva y el proceso de registro fue rápido. Ahora gestionamos nuestras alianzas B2B desde un solo lugar sin complicaciones.',
    name: 'Jhonatan Lara',
    avatar: null
  },
  {
    quote: 'Lo que más me gustó fue la validación con DIAN y Cámara de Comercio. Da mucha confianza saber que las empresas con las que conectas están verificadas.',
    name: 'Natalia Reina',
    avatar: null
  },
  {
    quote: 'Encontramos un proveedor de acero certificado en cuestión de días. ZIFCOR nos ahorró semanas de búsqueda y llamadas sin respuesta.',
    name: 'Oscar Rodriguez',
    avatar: null
  },
  {
    quote: 'Registrar nuestra empresa fue gratis y sencillo. Ya tenemos visibilidad ante cientos de compradores potenciales sin pagar publicidad.',
    name: 'Camila Ospina',
    avatar: null
  },
  {
    quote: 'Como empresa pequeña, ZIFCOR nos dio acceso a un ecosistema B2B que antes parecía solo para grandes corporaciones. Muy recomendado.',
    name: 'Andrés Castillo',
    avatar: null
  }
]

function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(el.dataset.delay || 0)
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() } },
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.testimonials {
  --blue: #0071e3;
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
  color: rgba(0, 0, 0, .78);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, .08);
  transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 113, 227, .40);
  box-shadow: 0 26px 70px rgba(0, 0, 0, .12);
}

.quote {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(0, 0, 0, .72);
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
  background: rgba(0, 113, 227, .10);
  border: 2px solid rgba(0, 113, 227, .18);
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
