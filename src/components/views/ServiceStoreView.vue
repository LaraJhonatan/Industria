<template>
  <section class="store-section">
    <div class="bs-wrap">

      <!-- ✅ Mientras service sea undefined muestra loading -->
      <div v-if="!service" class="not-found">
        <p>Cargando servicio…</p>
      </div>

      <template v-else>

        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Catálogo
          </button>
          <span class="bc-sep">/</span>
          <span class="bc-current" :style="{ color: service?.color }">{{ service?.title }}</span>
        </nav>

        <!-- Header -->
        <div class="store-header">
          <span class="store-kicker" :style="{
            background: `color-mix(in srgb, ${service?.color} 10%, transparent)`,
            color: service?.color,
            borderColor: `color-mix(in srgb, ${service?.color} 25%, transparent)`
          }">{{ service?.kicker }}</span>
          <h1 class="store-title">{{ service?.title }}</h1>
          <p class="store-sub">Selecciona el ensayo o servicio que requieres y añádelo a tu presupuesto.</p>
        </div>

        <!-- Filter chips -->
        <div class="filter-row">
          <div class="chip chip-active" :style="{ background: service?.color, borderColor: service?.color }">
            {{ service?.title }}
          </div>
          <button v-for="s in otherServices" :key="s.id" class="chip chip-inactive"
            @click="router.push(`/tienda/${s.id}`)">{{ s.title }}</button>
        </div>

        <!-- Products grid -->
        <div class="products-grid">
          <StoreProductCard v-for="product in service?.products" :key="product.id" :product="product" :service="service"
            :in-budget="budgetStore.isInBudget(product.id)"
            @view="router.push(`/tienda/${service?.id}/${product.id}`)" />
        </div>

        <!-- Carrusel de otros servicios -->
        <!-- <div class="related-section">
          <div class="related-header">
            <h2 class="related-title">Otros servicios disponibles</h2>
            <div class="carousel-controls">
              <button class="carousel-btn" @click="scroll(-1)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button class="carousel-btn" @click="scroll(1)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div class="carousel" ref="carouselEl">
            <div v-for="s in otherServices" :key="s.id" class="carousel-card" :style="{ '--c': s.color }"
              @click="router.push(`/tienda/${s.id}`)">
              <div class="cc-icon" v-html="s.icon" />
              <div class="cc-kicker">{{ s.kicker }}</div>
              <div class="cc-name">{{ s.title }}</div>
              <div class="cc-count">{{ s.products.length }} servicios</div>
            </div>
          </div>
        </div> -->

      </template>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SERVICES } from '../../data/services.js'
import { useBudgetStore } from '../../stores/budget.js'
import StoreProductCard from '../tienda/StoreProductCard.vue'

const router = useRouter()
const route = useRoute()

const budgetStore = useBudgetStore()

const service = computed(() => SERVICES.find(s => s.id === route.params.serviceId) ?? null)
const otherServices = computed(() => SERVICES.filter(s => s.id !== route.params.serviceId))

// const carouselEl = ref(null)
// function scroll(dir) {
//   carouselEl.value?.scrollBy({ left: dir * 280, behavior: 'smooth' })
// }
</script>

<style scoped>
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

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
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
}

.bc-sep {
  color: rgba(27, 27, 27, 0.3);
}

.bc-current {
  font-weight: 700;
}

/* Header */
.store-header {
  margin-bottom: 28px;
}

.store-kicker {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  border: 1.5px solid;
  margin-bottom: 12px;
}

.store-title {
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.8px;
}

.store-sub {
  margin: 0;
  font-size: 15px;
  color: rgba(27, 27, 27, 0.5);
  max-width: 60ch;
}

/* Filter chips */
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.chip {
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  white-space: nowrap;
}

.chip-active {
  color: #fff;
  border: 1.5px solid;
}

.chip-inactive {
  background: transparent;
  border: 1.5px solid rgba(27, 27, 27, 0.12);
  color: rgba(27, 27, 27, 0.6);
  cursor: pointer;
  transition: all 180ms ease;
}

.chip-inactive:hover {
  border-color: #0071e3;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.05);
}

/* Products grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 22px;
  margin-bottom: 64px;
}

/* Related section */
.related-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.related-title {
  font-size: 22px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0;
}

.carousel-controls {
  display: flex;
  gap: 8px;
}

.carousel-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #f0f2f5;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #1b1b1b;
  transition: background 180ms ease;
}

.carousel-btn:hover {
  background: #e2e5ea;
}

.carousel {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-card {
  min-width: 220px;
  border-radius: 16px;
  border: 1.5px solid rgba(27, 27, 27, 0.09);
  padding: 20px 18px;
  cursor: pointer;
  background: #fff;
  transition: all 220ms ease;
  flex-shrink: 0;
}

.carousel-card:hover {
  border-color: var(--c);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px color-mix(in srgb, var(--c) 16%, transparent);
}

.cc-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--c) 10%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--c) 22%, transparent);
  display: grid;
  place-items: center;
  color: var(--c);
  margin-bottom: 12px;
}

.cc-kicker {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--c);
  margin-bottom: 4px;
}

.cc-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
  line-height: 1.3;
  margin-bottom: 6px;
}

.cc-count {
  font-size: 11.5px;
  color: rgba(27, 27, 27, 0.45);
}

/* Not found / loading */
.not-found {
  padding: 80px 0;
  text-align: center;
  color: rgba(27, 27, 27, 0.45);
  font-size: 15px;
}

@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .store-section {
    padding: 28px 0 56px;
  }
}
</style>
