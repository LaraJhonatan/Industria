<template>
  <q-page class="page">
    <div class="bs-wrap">
      <!-- Breadcrumb -->
      <div class="breadcrumb" v-reveal>
        <q-btn flat dense icon="arrow_back" label="Volver al catálogo" @click="goBack" class="back-btn" />
      </div>

      <div class="product-layout">
        <!-- Galería -->
        <div class="gallery-section" v-reveal data-delay="0">
          <div class="gallery-grid">
            <div class="thumbnails" aria-label="Miniaturas">
              <button v-for="(img, idx) in product.images" :key="idx" class="thumbnail"
                :class="{ active: selectedImage === idx }" type="button" @click="selectedImage = idx">
                <img :src="img" :alt="`${product.name} - Vista ${idx + 1}`" />
              </button>
            </div>

            <div class="main-image" aria-label="Imagen principal">
              <img :src="product.images[selectedImage]" :alt="product.name" />
              <div v-if="product.badge" class="badge">{{ product.badge }}</div>
            </div>
          </div>
        </div>

        <!-- Información -->
        <div class="info-section" v-reveal data-delay="100">
          <h1 class="product-name">{{ product.name }}</h1>

          <div class="rating-section">
            <div class="stars" aria-label="Calificación">
              <q-icon v-for="i in 5" :key="i" name="star" size="18px"
                :class="i <= product.rating ? 'filled' : 'empty'" />
            </div>
            <span class="rating-text">{{ product.rating }}.0 de 5</span>
            <span class="reviews-count">({{ product.reviewsCount }} valoraciones)</span>
          </div>

          <div class="price-section">
            <div v-if="product.oldPrice" class="old-price">
              ${{ formatPrice(product.oldPrice) }}
            </div>
            <div class="current-price">
              ${{ formatPrice(product.price) }}
            </div>
            <div v-if="product.oldPrice" class="discount">
              Ahorra ${{ formatPrice(product.oldPrice - product.price) }}
              ({{ Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) }}%)
            </div>
          </div>

          <div class="stock-section">
            <q-icon name="check_circle" size="20px" color="positive" />
            <span class="stock-text">Disponible</span>
          </div>

          <div class="description">
            <p>{{ product.longDescription }}</p>
          </div>

          <div class="specs-quick">
            <div class="spec-item" v-for="spec in product.quickSpecs" :key="spec.label">
              <span class="spec-label">{{ spec.label }}:</span>
              <span class="spec-value">{{ spec.value }}</span>
            </div>
          </div>

          <div class="quantity-section">
            <label class="quantity-label">Cantidad:</label>
            <q-select v-model="quantity" :options="[1, 2, 3, 4, 5]" outlined dense class="quantity-select" />
          </div>

          <div class="actions">
            <q-btn unelevated class="add-cart-btn" label="Agregar al carrito" icon-right="shopping_cart"
              @click="addToCart" />
            <q-btn unelevated class="quote-btn" label="Solicitar cotización" icon-right="description"
              @click="requestQuote" />
          </div>

          <div class="delivery-info">
            <div class="delivery-item">
              <q-icon name="local_shipping" size="24px" color="primary" />
              <div>
                <div class="delivery-title">Envío a toda Colombia</div>
                <div class="delivery-text">Gestión completa de importación y entrega</div>
              </div>
            </div>

            <div class="delivery-item">
              <q-icon name="build" size="24px" color="primary" />
              <div>
                <div class="delivery-title">Instalación incluida</div>
                <div class="delivery-text">Montaje y puesta en marcha por nuestro equipo</div>
              </div>
            </div>

            <div class="delivery-item">
              <q-icon name="verified" size="24px" color="primary" />
              <div>
                <div class="delivery-title">Garantía de {{ product.warranty }}</div>
                <div class="delivery-text">Soporte técnico y repuestos garantizados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-section" v-reveal data-delay="200">
        <q-tabs v-model="activeTab" class="product-tabs" align="left" dense>
          <q-tab name="specs" label="Especificaciones técnicas" />
          <q-tab name="description" label="Descripción detallada" />
          <q-tab name="delivery" label="Entrega e instalación" />
        </q-tabs>

        <q-tab-panels v-model="activeTab" class="tab-panels">
          <q-tab-panel name="specs">
            <h3 class="panel-title">Especificaciones técnicas completas</h3>
            <div class="specs-grid">
              <div v-for="spec in product.fullSpecs" :key="spec.category" class="spec-category">
                <h4 class="spec-category-title">{{ spec.category }}</h4>
                <div class="spec-row" v-for="item in spec.items" :key="item.label">
                  <span class="spec-row-label">{{ item.label }}</span>
                  <span class="spec-row-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="description">
            <h3 class="panel-title">Sobre este artículo</h3>
            <div class="full-description">
              <p v-for="(para, idx) in product.fullDescription" :key="idx">
                {{ para }}
              </p>
            </div>

            <h4 class="features-title">Características destacadas</h4>
            <ul class="features-list">
              <li v-for="feature in product.features" :key="feature">
                <q-icon name="check_circle" size="20px" color="primary" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </q-tab-panel>

          <q-tab-panel name="delivery">
            <h3 class="panel-title">Información de entrega e instalación</h3>
            <div class="delivery-details">
              <div class="delivery-section">
                <h4>Proceso de importación</h4>
                <p>{{ product.deliveryInfo.import }}</p>
              </div>

              <div class="delivery-section">
                <h4>Instalación y puesta en marcha</h4>
                <p>{{ product.deliveryInfo.installation }}</p>
              </div>

              <div class="delivery-section">
                <h4>Capacitación</h4>
                <p>{{ product.deliveryInfo.training }}</p>
              </div>

              <div class="delivery-section">
                <h4>Soporte post-venta</h4>
                <p>{{ product.deliveryInfo.support }}</p>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- Relacionados -->
      <div class="related-section" v-reveal data-delay="300">
        <h2 class="related-title">Productos relacionados</h2>
        <div class="related-grid">
          <div v-for="related in relatedProducts" :key="related.id" class="related-card"
            @click="goToProduct(related.id)">
            <img :src="related.image" :alt="related.name" />
            <div class="related-info">
              <h4 class="related-name">{{ related.name }}</h4>
              <div class="related-price">${{ formatPrice(related.price) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
useRoute()

const selectedImage = ref(0)
const quantity = ref(1)
const activeTab = ref('specs')

const product = ref({
  id: 1,
  name: 'Torno CNC Industrial T-500 con Control Fanuc',
  badge: 'Más vendido',
  price: 45000000,
  oldPrice: 52000000,
  rating: 5,
  reviewsCount: 127,
  warranty: '2 años',
  longDescription:
    'Torno de control numérico de alta precisión diseñado para producción industrial de piezas mecánicas complejas. Cuenta con control Fanuc 0i-TF de última generación, motor principal de 15kW y capacidad para trabajar piezas de hasta 500mm de diámetro. Ideal para talleres de mecanizado, manufactura automotriz y producción en serie.',
  quickSpecs: [
    { label: 'Diámetro máximo', value: '500mm' },
    { label: 'Control', value: 'Fanuc 0i-TF' },
    { label: 'Motor principal', value: '15 kW' },
    { label: 'Garantía', value: '2 años' }
  ],
  images: [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
  ],
  fullSpecs: [
    {
      category: 'Dimensiones principales',
      items: [
        { label: 'Diámetro máximo sobre bancada', value: '500 mm' },
        { label: 'Diámetro máximo sobre carro', value: '300 mm' },
        { label: 'Distancia entre puntos', value: '1000 mm' },
        { label: 'Diámetro de agujero de husillo', value: '70 mm' }
      ]
    },
    {
      category: 'Especificaciones técnicas',
      items: [
        { label: 'Control numérico', value: 'Fanuc 0i-TF' },
        { label: 'Motor principal', value: '15 kW' },
        { label: 'Velocidad del husillo', value: '50-3000 RPM' },
        { label: 'Avance rápido (X/Z)', value: '15/20 m/min' }
      ]
    },
    {
      category: 'Características adicionales',
      items: [
        { label: 'Torreta', value: '12 posiciones' },
        { label: 'Contrapunto', value: 'Neumático' },
        { label: 'Refrigeración', value: 'Sistema de alto flujo' },
        { label: 'Peso aproximado', value: '3500 kg' }
      ]
    }
  ],
  fullDescription: [
    'El Torno CNC Industrial T-500 representa la excelencia en mecanizado de precisión. Diseñado para entornos industriales exigentes, este equipo combina robustez estructural con tecnología de control de vanguardia.',
    'Su sistema de control Fanuc 0i-TF ofrece una interfaz intuitiva y capacidades avanzadas de programación, permitiendo ejecutar operaciones complejas con alta repetibilidad y precisión dimensional.',
    'La construcción robusta con bancada en hierro fundido mecanizado garantiza estabilidad y precisión a largo plazo, minimizando vibraciones y asegurando acabados superficiales superiores.'
  ],
  features: [
    'Control Fanuc 0i-TF de última generación con pantalla táctil LCD a color',
    'Husillo principal de alta potencia (15 kW) con sistema de refrigeración integrado',
    'Torreta de herramientas de 12 posiciones con indexación rápida',
    'Contrapunto neumático de alta precisión',
    'Sistema de lubricación centralizado automático',
    'Protecciones y resguardos de seguridad según normativa CE',
    'Software de programación conversacional incluido',
    'Capacitación técnica para 2 operadores'
  ],
  deliveryInfo: {
    import:
      'Gestionamos la importación completa desde el fabricante, incluyendo trámites aduaneros, permisos y certificaciones requeridas. Tiempo estimado: 12-16 semanas desde confirmación de pedido.',
    installation:
      'Nuestro equipo técnico realiza la instalación completa: cimentación, nivelación, conexiones eléctricas, neumáticas y puesta en marcha. Incluye verificación geométrica y pruebas de precisión.',
    training:
      'Capacitación presencial de 3 días para operadores y programadores. Incluye: operación básica, programación conversacional, mantenimiento preventivo y resolución de problemas comunes.',
    support:
      'Garantía de 2 años con soporte técnico telefónico 24/7. Disponibilidad de repuestos originales y visitas técnicas programadas para mantenimiento preventivo.'
  }
})

const relatedProducts = ref([
  {
    id: 2,
    name: 'Fresadora CNC VMC-850',
    price: 68000000,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Compresor Industrial Atlas Copco',
    price: 28000000,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Prensa Hidráulica 200 Ton',
    price: 38000000,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop'
  }
])

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO').format(price)
}

function goBack() {
  router.push('/maquinaria')
}

function goToProduct(id) {
  router.push(`/maquinaria/${id}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function addToCart() {
  alert(`Agregado ${quantity.value} unidad(es) al carrito`)
}

function requestQuote() {
  router.push('/contacto?producto=' + product.value.id)
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page {
  background: #fff;
  padding: 96px 0 72px;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 28px;
}

.back-btn {
  color: #0071e3;
  font-weight: 900;
}

/* Layout */
.product-layout {
  display: grid;
  grid-template-columns: minmax(420px, 560px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
  margin-bottom: 56px;
}

.gallery-section,
.info-section {
  min-width: 0;
}

/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 560px;
  overflow: auto;
  padding-right: 2px;
}

.thumbnail {
  width: 88px;
  height: 88px;
  border-radius: 10px;
  border: 2px solid rgba(27, 27, 27, 0.10);
  overflow: hidden;
  cursor: pointer;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
  background: #fff;
  padding: 0;
}

.thumbnail.active {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.18);
}

.thumbnail:hover {
  transform: translateY(-1px);
  border-color: rgba(0, 113, 227, 0.65);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Main image: clave para que "llene" bien */
.main-image {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 2px solid rgba(27, 27, 27, 0.08);
  background: #f6f7f9;
  height: clamp(360px, 42vw, 560px);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  background: #0071e3;
  color: #fff;
  box-shadow: 0 10px 24px rgba(0, 113, 227, 0.25);
}

/* Info */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.product-name {
  margin: 0;
  font-size: 32px;
  font-weight: 950;
  color: #1b1b1b;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.stars {
  display: flex;
  gap: 4px;
}

.stars .filled {
  color: #0071e3;
}

.stars .empty {
  color: rgba(27, 27, 27, 0.18);
}

.rating-text {
  font-weight: 800;
  color: #1b1b1b;
}

.reviews-count {
  color: rgba(27, 27, 27, 0.58);
  font-size: 14px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.old-price {
  font-size: 15px;
  color: rgba(27, 27, 27, 0.45);
  text-decoration: line-through;
}

.current-price {
  font-size: 38px;
  font-weight: 950;
  color: #1b1b1b;
  line-height: 1;
}

.discount {
  font-size: 14px;
  color: #0071e3;
  font-weight: 800;
}

.stock-section {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(46, 204, 113, 0.08);
  border-radius: 10px;
  width: fit-content;
}

.stock-text {
  font-weight: 800;
  color: #2ecc71;
}

.description {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.72);
}

.specs-quick {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 18px;
  padding: 18px;
  background: rgba(27, 27, 27, 0.02);
  border-radius: 14px;
  border: 1px solid rgba(27, 27, 27, 0.06);
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-label {
  font-size: 13px;
  color: rgba(27, 27, 27, 0.58);
}

.spec-value {
  font-size: 15px;
  font-weight: 850;
  color: #1b1b1b;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-label {
  font-weight: 850;
  color: #1b1b1b;
}

.quantity-select {
  width: 96px;
}

.actions {
  display: flex;
  gap: 12px;
}

.add-cart-btn,
.quote-btn {
  flex: 1;
  height: 52px;
  border-radius: 14px;
  font-weight: 950;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.add-cart-btn {
  background: #0071e3;
  color: #fff;
}

.quote-btn {
  background: #fff;
  color: #0071e3;
  border: 2px solid #0071e3;
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  background: rgba(0, 113, 227, 0.02);
  border-radius: 14px;
  border: 2px solid rgba(0, 113, 227, 0.10);
}

.delivery-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.delivery-title {
  font-weight: 850;
  color: #1b1b1b;
  margin-bottom: 4px;
}

.delivery-text {
  font-size: 14px;
  color: rgba(27, 27, 27, 0.70);
}

/* Tabs */
.tabs-section {
  margin-bottom: 56px;
}

.product-tabs {
  border-bottom: 2px solid rgba(27, 27, 27, 0.08);
}

.tab-panels {
  background: #fff;
}

.panel-title {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 950;
  color: #1b1b1b;
}

.specs-grid {
  display: grid;
  gap: 28px;
}

.spec-category-title {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 950;
  color: #1b1b1b;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(27, 27, 27, 0.06);
}

.spec-row-label {
  color: rgba(27, 27, 27, 0.70);
}

.spec-row-value {
  font-weight: 850;
  color: #1b1b1b;
  text-align: right;
}

.full-description p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.72);
}

.features-title {
  margin: 28px 0 14px;
  font-size: 20px;
  font-weight: 950;
  color: #1b1b1b;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: flex-start;
}

.features-list span {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.72);
}

.delivery-details {
  display: grid;
  gap: 20px;
}

.delivery-section h4 {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 950;
  color: #1b1b1b;
}

.delivery-section p {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.72);
}

/* Related */
.related-section {
  padding-top: 56px;
  border-top: 2px solid rgba(27, 27, 27, 0.06);
}

.related-title {
  margin: 0 0 28px;
  font-size: 28px;
  font-weight: 950;
  color: #1b1b1b;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.related-card {
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid rgba(27, 27, 27, 0.08);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  background: #fff;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(0, 113, 227, 0.14);
  border-color: rgba(0, 113, 227, 0.65);
}

.related-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.related-info {
  padding: 16px;
}

.related-name {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 800;
  color: #1b1b1b;
}

.related-price {
  font-size: 18px;
  font-weight: 950;
  color: #0071e3;
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .thumbnails {
    flex-direction: row;
    max-height: none;
    overflow: auto;
    padding-right: 0;
    padding-bottom: 2px;
  }

  .thumbnail {
    width: 84px;
    height: 84px;
    flex: 0 0 auto;
  }

  .main-image {
    height: clamp(320px, 52vw, 520px);
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .page {
    padding: 84px 0 56px;
  }

  .bs-wrap {
    padding: 0 16px;
  }

  .product-name {
    font-size: 26px;
  }

  .current-price {
    font-size: 34px;
  }

  .actions {
    flex-direction: column;
  }

  .specs-quick {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 320px;
  }
}
</style>
