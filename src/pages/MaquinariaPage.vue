<template>
  <q-page class="page">
    <section class="hero">
      <div class="bs-wrap">
        <div class="hero-content" v-reveal>
          <div class="pill">MAQUINARIA INDUSTRIAL</div>
          <h1 class="hero-title">
            Suministro de <span>maquinaria y equipos</span> industriales
          </h1>
          <p class="hero-subtitle">
            Importación y gestión de equipos de alto desempeño con criterios técnicos rigurosos.
            Selección personalizada, instalación completa y soporte garantizado.
          </p>
        </div>
      </div>
    </section>

    <section class="catalog">
      <div class="bs-wrap">
        <div class="catalog-header" v-reveal>
          <h2 class="section-title">Catálogo de maquinaria</h2>
          <div class="filters">
            <q-select v-model="selectedCategory" :options="categories" outlined dense label="Categoría" class="filter-select" />
            <q-select v-model="selectedSort" :options="sortOptions" outlined dense label="Ordenar por" class="filter-select" />
          </div>
        </div>

        <div class="machines-grid">
          <article v-for="machine in filteredMachines" :key="machine.id" class="machine-card" v-reveal :data-delay="machine.id * 60">
            <div class="card-image">
              <img :src="machine.image" :alt="machine.name" />
              <div v-if="machine.badge" class="badge">{{ machine.badge }}</div>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ machine.name }}</h3>
              <p class="card-desc">{{ machine.description }}</p>

              <ul class="card-specs">
                <li v-for="spec in machine.specs.slice(0, 3)" :key="spec">
                  <q-icon name="check_circle" size="16px" class="spec-icon" />
                  <span>{{ spec }}</span>
                </li>
              </ul>

              <div class="card-footer">
                <div class="price-section">
                  <div v-if="machine.oldPrice" class="old-price">${{ formatPrice(machine.oldPrice) }}</div>
                  <div class="price">${{ formatPrice(machine.price) }}</div>
                  <div class="price-label">Precio desde</div>
                </div>

                <q-btn unelevated class="view-btn" label="Ver más" icon-right="arrow_forward" @click="goToDetail(machine.id)" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="bs-wrap">
        <div class="cta-card" v-reveal>
          <div class="cta-content">
            <h3 class="cta-title">¿No encuentras lo que buscas?</h3>
            <p class="cta-text">
              Contáctanos y te ayudamos a encontrar la maquinaria exacta que necesitas.
              Importamos cualquier equipo industrial bajo especificaciones técnicas.
            </p>
          </div>
          <q-btn unelevated class="cta-btn" label="Solicitar cotización" icon-right="chat_bubble_outline" @click="goToContact" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedCategory = ref('Todas')
const selectedSort = ref('Destacados')

const categories = ['Todas', 'Maquinaria pesada', 'Equipos eléctricos', 'Herramientas industriales', 'Automatización']
const sortOptions = ['Destacados', 'Precio: Menor a Mayor', 'Precio: Mayor a Menor', 'Más recientes']

const machines = ref([
  {
    id: 1,
    name: 'Torno CNC Industrial T-500',
    description: 'Torno de control numérico de alta precisión para producción industrial de piezas mecánicas complejas.',
    category: 'Maquinaria pesada',
    price: 45000000,
    oldPrice: 52000000,
    badge: 'Más vendido',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    specs: [
      'Capacidad: 500mm de diámetro',
      'Control Fanuc 0i-TF',
      'Motor principal 15 kW',
      'Garantía 2 años'
    ]
  },
  {
    id: 2,
    name: 'Fresadora CNC VMC-850',
    description: 'Centro de mecanizado vertical de 3 ejes para trabajo de precisión en aluminio, acero y plásticos.',
    category: 'Maquinaria pesada',
    price: 68000000,
    oldPrice: null,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
    specs: [
      'Área de trabajo: 850x500x500mm',
      'Control Siemens 828D',
      'Cambiador automático 20 herramientas',
      'Instalación incluida'
    ]
  },
  {
    id: 3,
    name: 'Compresor Industrial Atlas Copco',
    description: 'Compresor de tornillo rotativo de alta eficiencia energética con secador integrado.',
    category: 'Equipos eléctricos',
    price: 28000000,
    oldPrice: 32000000,
    badge: 'Oferta',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
    specs: [
      'Capacidad: 250 CFM',
      'Presión: 175 PSI',
      'Motor 75 HP',
      'Secador incluido'
    ]
  },
  {
    id: 4,
    name: 'Generador Diésel Caterpillar 500kVA',
    description: 'Planta eléctrica de respaldo para operación continua industrial con transferencia automática.',
    category: 'Equipos eléctricos',
    price: 95000000,
    oldPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop',
    specs: [
      'Potencia: 500 kVA',
      'Motor CAT C15',
      'Transferencia automática',
      'Garantía 3 años'
    ]
  },
  {
    id: 5,
    name: 'Robot Industrial ABB IRB 6700',
    description: 'Robot articulado de 6 ejes para soldadura, paletizado y manipulación de cargas pesadas.',
    category: 'Automatización',
    price: 125000000,
    oldPrice: 135000000,
    badge: 'Destacado',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&h=400&fit=crop',
    specs: [
      'Alcance: 2.6 metros',
      'Carga útil: 200 kg',
      'Control IRC5',
      'Programación offline'
    ]
  },
  {
    id: 6,
    name: 'Prensa Hidráulica 200 Ton',
    description: 'Prensa hidráulica de columnas para conformado, estampado y ensamble de piezas metálicas.',
    category: 'Maquinaria pesada',
    price: 38000000,
    oldPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop',
    specs: [
      'Fuerza: 200 toneladas',
      'Carrera: 600mm',
      'Apertura: 800mm',
      'Control PLC'
    ]
  }
])

const filteredMachines = computed(() => {
  let result = machines.value

  if (selectedCategory.value !== 'Todas') {
    result = result.filter(m => m.category === selectedCategory.value)
  }

  if (selectedSort.value === 'Precio: Menor a Mayor') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (selectedSort.value === 'Precio: Mayor a Menor') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
})

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO').format(price)
}

function goToDetail(id) {
  router.push(`/maquinaria/${id}`)
}

function goToContact() {
  router.push('/contacto')
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

.page {
  background: #fff;
}

/* Hero */
.hero {
  padding: 100px 0 60px;
  background: #fff;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.pill {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #1b1b1b;
  background: rgba(0, 113, 227, 0.08);
  border: 2px solid rgba(0, 113, 227, 0.2);
  margin-bottom: 20px;
}

.hero-title {
  margin: 0;
  font-size: clamp(36px, 4.5vw, 58px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1px;
  color: #1b1b1b;
}

.hero-title span {
  color: #0071e3;
}

.hero-subtitle {
  margin: 20px auto 0;
  max-width: 680px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.7);
}

/* Catalog */
.catalog {
  padding: 60px 0 100px;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-title {
  margin: 0;
  font-size: 32px;
  font-weight: 900;
  color: #1b1b1b;
}

.filters {
  display: flex;
  gap: 12px;
}

.filter-select {
  min-width: 200px;
}

/* Grid */
.machines-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.machine-card {
  background: #fff;
  border: 2px solid rgba(27, 27, 27, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 300ms ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.machine-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 113, 227, 0.12);
  border-color: #0071e3;
}

.card-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: rgba(27, 27, 27, 0.02);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.machine-card:hover .card-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  background: #fdda24;
  color: #1b1b1b;
  box-shadow: 0 4px 12px rgba(253, 218, 36, 0.3);
}

.card-content {
  padding: 24px;
}

.card-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  line-height: 1.3;
}

.card-desc {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.65);
}

.card-specs {
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}

.card-specs li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgba(27, 27, 27, 0.7);
  line-height: 1.4;
}

.spec-icon {
  color: #0071e3;
  flex-shrink: 0;
  margin-top: 1px;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  border-top: 2px solid rgba(27, 27, 27, 0.06);
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.old-price {
  font-size: 14px;
  color: rgba(27, 27, 27, 0.4);
  text-decoration: line-through;
}

.price {
  font-size: 24px;
  font-weight: 900;
  color: #1b1b1b;
  line-height: 1;
}

.price-label {
  font-size: 12px;
  color: rgba(27, 27, 27, 0.5);
}

.view-btn {
  height: 44px;
  border-radius: 12px;
  padding: 0 20px;
  font-weight: 900;
  background: #0071e3;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.view-btn:hover {
  background: #0066cc;
}

/* CTA */
.cta-section {
  padding: 60px 0 100px;
  background: rgba(0, 113, 227, 0.02);
}

.cta-card {
  border-radius: 16px;
  padding: 40px;
  border: 2px solid rgba(0, 113, 227, 0.2);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.cta-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 900;
  color: #1b1b1b;
}

.cta-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.7);
  max-width: 60ch;
}

.cta-btn {
  height: 52px;
  border-radius: 12px;
  padding: 0 32px;
  font-weight: 900;
  background: #0071e3;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.cta-btn:hover {
  background: #0066cc;
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
  .machines-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 70px 0 40px;
  }

  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    width: 100%;
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .machines-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }

  .cta-btn {
    width: 100%;
  }
}
</style>
