<template>
  <section class="catalog-section">
    <div class="bs-wrap">

      <div class="section-head">
        <h2 class="section-title">Explora por sector</h2>
        <p class="section-sub">
          {{ sectores.length }} sectores disponibles en ZiFux
        </p>
      </div>

      <div v-if="loading" class="column items-center q-py-xl">
        <q-spinner color="blue-6" size="40px" />
      </div>

      <div v-else class="categories-grid">
        <div v-for="sector in sectores" :key="sector.id" class="cat-card"
          @click="router.push(`/tienda/${sector.slug}`)">
          <div class="cat-img-wrap">
            <img :src="sector.imagenUrl || '/placeholder-sector.jpg'" :alt="sector.nombre" class="cat-img" />
            <div class="cat-overlay" />
          </div>
          <div class="cat-body">
            <span class="cat-kicker">Sector</span>
            <h3 class="cat-name">{{ sector.nombre }}</h3>
            <p class="cat-desc">{{ sector.descripcion }}</p>
            <div class="cat-meta">
              <span class="cat-prod-count">{{ sector.totalEmpresas || 0 }} empresas</span>
            </div>
            <button class="cat-btn">
              Ver empresas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="cta-banner">
        <div>
          <p class="cta-title">¿Tu empresa no está aquí?</p>
          <p class="cta-sub">Regístrate y empieza a vender en ZiFux</p>
        </div>
        <button class="cta-btn" @click="router.push('/auth')">
          Registrar empresa →
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'

const router = useRouter()
const sectores = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await publicApi.getSectores()
    sectores.value = data
  } catch {
    sectores.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.catalog-section {
  background: #fafbfc;
  padding: 56px 0 80px;
  min-height: calc(100vh - 96px);
}

.bs-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.section-head {
  margin-bottom: 24px;
}

.section-title {
  margin: 0 0 6px;
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.5px;
}

.section-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.5);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 520px), 1fr));
  gap: 22px;
  margin-bottom: 72px;
}

.cat-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.18);
}

.cat-img-wrap {
  position: absolute;
  inset: 0;
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.72;
  transition: transform 420ms ease;
}

.cat-card:hover .cat-img {
  transform: scale(1.05);
}

.cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0, 30, 80, 0.88) 0%, rgba(0, 60, 120, 0.35) 100%);
}

.cat-body {
  position: relative;
  z-index: 1;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
}

.cat-kicker {
  display: inline-flex;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  width: fit-content;
}

.cat-name {
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.cat-desc {
  margin: 0 0 12px;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.70);
  line-height: 1.55;
  max-width: 40ch;
}

.cat-meta {
  margin-bottom: 14px;
}

.cat-prod-count {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.50);
}

.cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  width: fit-content;
  background: #0071e3;
  transition: filter 180ms, transform 180ms;
  letter-spacing: 0;
}

.cat-btn:hover {
  filter: brightness(0.86);
  transform: translateY(-1px);
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
  color: rgba(255, 255, 255, 0.75);
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
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
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
}

@media (max-width: 480px) {
  .bs-wrap {
    padding: 0 16px;
  }
}
</style>
