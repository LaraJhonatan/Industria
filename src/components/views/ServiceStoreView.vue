<template>
  <section class="store-section">
    <div class="bs-wrap">

      <template v-if="isLoading">
        <div class="sk-breadcrumb">
          <div class="sk sk-bc-a" />
          <div class="sk-sep" />
          <div class="sk sk-bc-b" />
        </div>
        <div class="sk sk-hero" />
        <div class="sk-subcat-grid">
          <div v-for="n in 6" :key="n" class="sk sk-subcat-card" />
        </div>
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
        <div class="sk sk-cta" />
      </template>

      <template v-else-if="category">

        <nav class="breadcrumb">
          <button class="bc-link" @click="router.push('/tienda')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Catálogo
          </button>
          <span class="bc-sep">/</span>
          <span class="bc-current" :style="{ color: category.accentColor }">{{ category.title }}</span>
        </nav>

        <div class="hero-banner" :style="{ backgroundImage: `url(${category.heroImg})` }">
          <div class="hero-overlay" />
          <div class="hero-content">
            <span class="hero-kicker">{{ category.kicker }}</span>
            <h1 class="hero-title">{{ category.title }}</h1>
            <p class="hero-sub">{{ category.products.length }} productos disponibles</p>
          </div>
        </div>

        <div class="subcat-section">
          <div class="subcat-grid">
            <div v-for="sub in category.subcategories" :key="sub.id" class="subcat-card"
              @click="router.push(`/tienda/${category.id}/sub/${sub.id}`)">
              <div class="subcat-img-wrap">
                <img :src="sub.img" :alt="sub.name" class="subcat-img" loading="lazy" />
                <div class="subcat-hover-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
              <div class="subcat-info">
                <p class="subcat-name">{{ sub.name }}</p>
                <span class="subcat-count">
                  {{ sub.count }} productos
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

      </template>

      <div v-else class="not-found">
        <p>Categoría no encontrada.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { STORE_CATEGORIES } from '../../data/store-products.js'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
onMounted(() => setTimeout(() => { isLoading.value = false }, 3000))

const category = computed(() => STORE_CATEGORIES.find(c => c.id === route.params.categoryId) ?? null)
</script>

<style scoped>

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
  height: 340px;
  border-radius: 20px;
  margin-bottom: 32px;
}

.sk-subcat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 40px;
}

.sk-subcat-card {
  height: 170px;
  border-radius: 14px;
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
  width: 360px;
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

.sk-cta {
  height: 96px;
  border-radius: 18px;
  margin-bottom: 32px;
}

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

.hero-banner {
  position: relative;
  width: 100%;
  height: 340px;
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
  padding: 36px 40px;
}

.hero-kicker {
  display: inline-flex;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, .15);
  border: 1.5px solid rgba(255, 255, 255, .35);
  color: #fff;
  width: fit-content;
  margin-bottom: 12px;
}

.hero-title {
  margin: 0 0 8px;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1.1;
}

.hero-sub {
  margin: 0;
  font-size: 15px;
  color: rgba(255, 255, 255, .72);
}

.subcat-section {
  margin-bottom: 44px;
}

.subcat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.subcat-card {
  border-radius: 18px;
  border: 1.5px solid rgba(27, 27, 27, .09);
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: all 220ms ease;
}

.subcat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, .1);
  border-color: rgba(0, 113, 227, .3);
}

.subcat-img-wrap {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f0f2f5;
}

.subcat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 380ms;
}

.subcat-card:hover .subcat-img {
  transform: scale(1.06);
}

.subcat-hover-arrow {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, .9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 220ms ease;
  color: #0071e3;
}

.subcat-card:hover .subcat-hover-arrow {
  opacity: 1;
  transform: scale(1);
}

.subcat-info {
  padding: 16px 16px 18px;
}

.subcat-name {
  margin: 0 0 5px;
  font-size: 15px;
  font-weight: 800;
  color: #1b1b1b;
}

.subcat-count {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12.5px;
  color: rgba(27, 27, 27, .45);
  font-weight: 600;
}

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
  padding: 100px 0;
  text-align: center;
  color: rgba(27, 27, 27, .4);
  font-size: 15px;
}

@media (max-width: 768px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .store-section {
    padding: 24px 0 56px;
  }

  .hero-banner {
    height: 240px;
    border-radius: 14px;
  }

  .hero-content {
    padding: 24px 22px;
  }

  .subcat-grid {
    grid-template-columns: repeat(3, 1fr);
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

  .subcat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
