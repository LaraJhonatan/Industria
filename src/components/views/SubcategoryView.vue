<template>
  <section class="store-section">
    <div class="bs-wrap">

      <!-- SKELETON -->
      <template v-if="isLoading">
        <div class="sk-breadcrumb">
          <div class="sk sk-bc-a" />
          <div class="sk-sep" />
          <div class="sk sk-bc-b" />
          <div class="sk-sep" />
          <div class="sk sk-bc-c" />
        </div>
        <div class="sk sk-hero" />
        <div class="sk-header-row">
          <div class="sk-hl">
            <div class="sk sk-h-title" />
            <div class="sk sk-h-sub" />
          </div>
          <div class="sk sk-h-count" />
        </div>
        <div class="sk-products-grid">
          <div v-for="n in 6" :key="n" class="sk-card">
            <div class="sk sk-card-img" />
            <div class="sk-card-body">
              <div class="sk sk-cl" />
              <div class="sk sk-cm" />
              <div class="sk sk-cp" />
              <div class="sk sk-cb" />
            </div>
          </div>
        </div>
      </template>

      <!-- CONTENIDO -->
      <template v-else-if="category && subcategory">

        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Catálogo
          </button>
          <span class="bc-sep">/</span>
          <button class="bc-link" @click="router.push(`/tienda/${category.id}`)">
            {{ category.title }}
          </button>
          <span class="bc-sep">/</span>
          <span class="bc-current" :style="{ color: category.accentColor }">{{ subcategory.name }}</span>
        </nav>

        <!-- Mini hero con imagen de la subcategoría -->
        <div class="hero-banner" :style="{ backgroundImage: `url(${subcategory.img})` }">
          <div class="hero-overlay" />
          <div class="hero-content">
            <button class="hero-back" @click="router.push(`/tienda/${category.id}`)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {{ category.title }}
            </button>
            <h1 class="hero-title">{{ subcategory.name }}</h1>
            <p class="hero-sub">{{ filteredProducts.length }} productos disponibles</p>
          </div>
        </div>

        <!-- Header -->
        <div class="store-header-row">
          <div>
            <h2 class="store-title">{{ subcategory.name }}</h2>
            <p class="store-sub">
              <button class="breadcrumb-inline" @click="router.push(`/tienda/${category.id}`)">{{ category.title
                }}</button>
              &nbsp;›&nbsp;{{ subcategory.name }}
            </p>
          </div>
          <span class="count-badge">{{ filteredProducts.length }} productos</span>
        </div>

        <!-- Products grid -->
        <div class="products-grid" v-if="filteredProducts.length">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card"
            @click="router.push(`/tienda/${category.id}/${product.id}`)">
            <div class="card-badges">
              <span v-if="product.stock" class="badge-stock">En stock</span>
              <span v-if="product.discount > 0" class="badge-disc">-{{ product.discount }}%</span>
            </div>
            <div class="card-img-wrap">
              <img :src="product.images[0]" :alt="product.name" class="card-img" loading="lazy" />
              <button class="quick-add-btn" :style="{ background: category.accentColor }"
                @click.stop="quickAdd(product)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {{ cartStore.isInCart(product.id) ? '✓ En carrito' : 'Añadir' }}
              </button>
            </div>
            <div class="card-body">
              <p class="card-kicker" :style="{ color: category.accentColor }">{{ subcategory.name }}</p>
              <h3 class="card-name">{{ product.name }}</h3>
              <p class="card-desc">{{ product.shortDesc }}</p>
              <div class="card-price-row">
                <span v-if="product.discount > 0" class="price-old">{{ formatCOP(product.originalPrice) }}</span>
                <span class="price-main">{{ formatCOP(product.price) }}</span>
              </div>
              <button class="card-btn" :class="{ 'card-btn-added': cartStore.isInCart(product.id) }"
                :style="!cartStore.isInCart(product.id) ? { background: category.accentColor } : {}"
                @click.stop="router.push(`/tienda/${category.id}/${product.id}`)">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        <!-- Sin productos -->
        <div v-else class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            opacity=".3">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p>No hay productos en esta categoría por el momento.</p>
          <button class="empty-btn" @click="router.push(`/tienda/${category.id}`)">
            Ver todos los productos de {{ category.title }}
          </button>
        </div>

        <!-- CTA -->
        <div class="cta-banner">
          <div>
            <p class="cta-title">¿No encuentras lo que necesitas?</p>
            <p class="cta-sub">Solicítalo y te cotizamos en 24 horas</p>
          </div>
          <button class="cta-btn" @click="router.push('/contacto')">Solicitar Producto →</button>
        </div>

      </template>

      <div v-else class="not-found">
        <p>Subcategoría no encontrada.</p>
        <button class="empty-btn" @click="router.push('/tienda')">Volver al catálogo</button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { STORE_CATEGORIES, formatCOP } from '../../data/store-products.js'
import { useCartStore } from '../../stores/cart.js'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const isLoading = ref(true)
onMounted(() => setTimeout(() => { isLoading.value = false }, 1500))

const category = computed(() =>
  STORE_CATEGORIES.find(c => c.id === route.params.categoryId) ?? null
)

const subcategory = computed(() =>
  category.value?.subcategories.find(s => s.id === route.params.subcategoryId) ?? null
)

const filteredProducts = computed(() => {
  if (!category.value || !subcategory.value) return []
  return category.value.products.filter(p => p.subcategory === subcategory.value.id)
})

function quickAdd(product) {
  if (cartStore.isInCart(product.id)) {
    router.push('/carrito')
    return
  }
  cartStore.addItem({
    productId: product.id,
    name: product.name,
    categoryId: category.value.id,
    categoryTitle: category.value.title,
    image: product.images[0],
    price: product.price,
    qty: 1,
    variant: product.normativasOptions?.[0] ?? null,
  })
}
</script>

<style scoped>
/* ── Shimmer ── */
@keyframes shimmer {
  0% {
    background-position: -700px 0
  }

  100% {
    background-position: 700px 0
  }
}

.sk {
  background: linear-gradient(90deg, #eef0f2 25%, #e4e7ea 50%, #eef0f2 75%);
  background-size: 700px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 10px;
}

.sk-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding-top: 40px;
}

.sk-bc-a {
  width: 80px;
  height: 14px;
}

.sk-bc-b {
  width: 100px;
  height: 14px;
}

.sk-bc-c {
  width: 140px;
  height: 14px;
}

.sk-sep {
  width: 8px;
  height: 14px;
  background: #dde1e5;
  border-radius: 3px;
}

.sk-hero {
  width: 100%;
  height: 280px;
  border-radius: 20px;
  margin-bottom: 32px;
}

.sk-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
}

.sk-hl {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sk-h-title {
  width: 240px;
  height: 26px;
}

.sk-h-sub {
  width: 320px;
  height: 15px;
}

.sk-h-count {
  width: 90px;
  height: 30px;
  border-radius: 999px;
}

.sk-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.sk-card {
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid #eef0f2;
}

.sk-card-img {
  width: 100%;
  height: 240px;
  border-radius: 0;
}

.sk-card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sk-cl {
  height: 15px;
  width: 80%;
}

.sk-cm {
  height: 13px;
  width: 60%;
}

.sk-cp {
  height: 22px;
  width: 110px;
}

.sk-cb {
  height: 42px;
  border-radius: 12px;
}

/* ── Page ── */
.store-section {
  background: #fafbfc;
  padding: 40px 0 80px;
  min-height: calc(100vh - 64px);
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 13px;
}

.bc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-weight: 700;
  font-size: 13px;
  padding: 0;
  transition: opacity 150ms;
}

.bc-link:hover {
  opacity: .7;
}

.bc-sep {
  color: rgba(27, 27, 27, .3);
}

.bc-current {
  font-weight: 700;
}

/* hero banner (más bajo) */
.hero-banner {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  margin-bottom: 36px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(0, 0, 0, .72) 0%, rgba(0, 0, 0, .28) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px 40px;
}

.hero-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, .15);
  border: 1.5px solid rgba(255, 255, 255, .3);
  border-radius: 999px;
  padding: 5px 14px;
  color: rgba(255, 255, 255, .85);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  width: fit-content;
  transition: background 150ms;
}

.hero-back:hover {
  background: rgba(255, 255, 255, .25);
}

.hero-title {
  margin: 0 0 8px;
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1.1;
}

.hero-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, .72);
}

/* header row */
.store-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.store-title {
  margin: 0 0 5px;
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -.5px;
}

.store-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, .5);
  display: flex;
  align-items: center;
}

.breadcrumb-inline {
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-weight: 700;
  font-size: 14px;
  padding: 0;
  transition: opacity 150ms;
}

.breadcrumb-inline:hover {
  opacity: .7;
}

.count-badge {
  flex-shrink: 0;
  padding: 6px 16px;
  background: rgba(27, 27, 27, .06);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(27, 27, 27, .55);
  white-space: nowrap;
}

/* products grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 26px;
  margin-bottom: 56px;
}

.product-card {
  position: relative;
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid rgba(27, 27, 27, .08);
  overflow: hidden;
  cursor: pointer;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, .11);
}

.card-badges {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge-stock {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(46, 204, 113, .14);
  border: 1px solid rgba(46, 204, 113, .3);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  color: #1aab5c;
  width: fit-content;
}

.badge-stock::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #1aab5c;
  border-radius: 50%;
  display: block;
}

.badge-disc {
  padding: 4px 10px;
  background: #ff3b30;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  color: #fff;
  width: fit-content;
}

.card-img-wrap {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #f0f2f5;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 380ms ease;
}

.product-card:hover .card-img {
  transform: scale(1.05);
}

.quick-add-btn {
  position: absolute;
  bottom: -46px;
  left: 0;
  right: 0;
  height: 46px;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: bottom 220ms ease;
}

.product-card:hover .quick-add-btn {
  bottom: 0;
}

.card-body {
  padding: 16px 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.card-kicker {
  margin: 0 0 5px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .8px;
  text-transform: uppercase;
}

.card-name {
  margin: 0 0 7px;
  font-size: 15px;
  font-weight: 800;
  color: #1b1b1b;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  margin: 0 0 12px;
  font-size: 12.5px;
  color: rgba(27, 27, 27, .5);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-price-row {
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-bottom: 14px;
}

.price-old {
  font-size: 12px;
  color: rgba(27, 27, 27, .4);
  text-decoration: line-through;
  font-weight: 600;
}

.price-main {
  font-size: 18px;
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -.4px;
}

.card-btn {
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: filter 180ms;
}

.card-btn:hover {
  filter: brightness(.9);
}

.card-btn-added {
  background: rgba(46, 204, 113, .12) !important;
  color: #1aab5c;
}

/* empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 0;
  text-align: center;
  color: rgba(27, 27, 27, .45);
  font-size: 15px;
  margin-bottom: 56px;
}

.empty-btn {
  padding: 11px 24px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: background 160ms;
}

.empty-btn:hover {
  background: #005fcd;
}

/* cta */
.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 36px;
  background: linear-gradient(135deg, #0056b3 0%, #0071e3 100%);
  border-radius: 18px;
  flex-wrap: wrap;
}

.cta-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 900;
  color: #fff;
}

.cta-sub {
  margin: 0;
  font-size: 13.5px;
  color: rgba(255, 255, 255, .75);
}

.cta-btn {
  flex-shrink: 0;
  padding: 13px 26px;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 900;
  color: #0071e3;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 180ms, box-shadow 180ms;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, .18);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 0;
  text-align: center;
  color: rgba(27, 27, 27, .4);
  font-size: 15px;
}

/* responsive */
@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .store-section {
    padding: 24px 0 56px;
  }

  .hero-banner {
    height: 220px;
    border-radius: 14px;
  }

  .hero-content {
    padding: 24px 22px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 24px;
  }

  .cta-btn {
    width: 100%;
    text-align: center;
  }

  .store-header-row {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .card-img-wrap {
    height: 200px;
  }
}
</style>
