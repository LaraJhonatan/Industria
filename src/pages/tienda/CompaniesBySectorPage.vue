<template>
  <section class="sector-section">
    <div class="bs-wrap">
      <nav class="breadcrumb" aria-label="breadcrumb">
        <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
        <span class="bc-sep">›</span>
        <span class="bc-current">{{ sector?.nombre || sectorSlug }}</span>
      </nav>

      <div v-if="loading" class="loading-wrap column items-center justify-center">
        <q-spinner color="blue-6" size="42px" />
        <p class="loading-text">Cargando empresas del sector...</p>
      </div>

      <template v-else>
        <div class="hero" v-reveal>
          <div class="hero-text">
            <span class="kicker">Sector empresarial · ZIFCOR</span>
            <h1 class="hero-title">
              Empresas de
              <span class="accent">{{ sector?.nombre || sectorSlug }}</span>
            </h1>
            <p class="hero-sub">{{ sectorDescription }}</p>
            <div class="hero-pills">
              <span class="hero-pill">
                {{ empresas.length }} {{ empresas.length === 1 ? 'empresa registrada' : 'empresas registradas' }}
              </span>
            </div>
            <div class="hero-btns">
              <button class="hero-btn hero-btn-secondary" @click="router.push('/auth')">
                Registrar mi empresa
              </button>
            </div>
          </div>

          <div class="hero-map">
            <img src="/mapa.png" alt="Mapa de cobertura ZIFCOR" class="latam-map" />
            <div class="map-floating-card">
              <p class="mfc-kicker">Cobertura ZIFCOR</p>
              <p class="mfc-title">{{ empresas.length }} empresas</p>
              <p class="mfc-sub">con presencia en este sector</p>
            </div>
          </div>
        </div>

        <div ref="companiesSection" class="section-head" v-reveal>
          <h2 class="section-title">Empresas en este sector</h2>
          <p class="section-sub">
            {{ empresas.length }} {{ empresas.length === 1 ? 'empresa disponible' : 'empresas disponibles' }}
          </p>
        </div>

        <div v-if="!empresas.length" class="empty-state" v-reveal>
          <div class="empty-icon">
            <q-icon name="storefront" size="56px" color="grey-4" />
          </div>
          <h3 class="empty-title">Aún no hay empresas en este sector</h3>
          <p class="empty-sub">
            Cuando nuevas empresas se registren en esta categoría, aparecerán aquí con su tienda pública y sus
            productos.
          </p>
          <q-btn unelevated label="Registrar empresa" color="blue-6" class="action-btn" @click="router.push('/auth')" />
        </div>

        <div v-else class="companies-grid" v-reveal>
          <article v-for="empresa in empresas" :key="empresa.id" class="company-card"
            @click="router.push(`/tienda/empresa/${empresa.id}`)">

            <div class="company-banner">
              <div class="company-banner-overlay" />
            </div>

            <div class="company-content">
              <div class="company-head">
                <div class="company-logo">
                  <img src="/IconoZ.png" alt="ZIFCOR" class="company-logo-img" />
                </div>
                <div class="company-main">
                  <h3 class="company-name">ZIFCOR</h3>
                  <div v-if="empresa.profile?.ciudad || empresa.profile?.departamento" class="company-location">
                    <q-icon name="location_on" size="14px" color="grey-5" />
                    <span>
                      {{ empresa.profile?.ciudad || 'Ciudad' }}
                      <template v-if="empresa.profile?.departamento">, {{ empresa.profile.departamento }}</template>
                    </span>
                  </div>
                </div>
              </div>

              <p class="company-desc">
                {{
                  empresa.profile?.descripcion
                    ? `${empresa.profile.descripcion.slice(0, 150)}${empresa.profile.descripcion.length > 150 ? '...' : ''}`
                    : 'Empresa registrada en ZIFCOR. Ingresa para conocer su tienda, productos y datos de contacto.'
                }}
              </p>

              <div class="company-footer">
                <span class="company-link">
                  Ver tienda
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'

const router = useRouter()
const route = useRoute()

const sector = ref(null)
const empresas = ref([])
const loading = ref(true)
const companiesSection = ref(null)

const sectorSlug = computed(() => route.params.sectorSlug)

const sectorDescription = computed(() =>
  sector.value?.descripcion ||
  'Explora empresas registradas en este sector y conoce sus productos, servicios y datos comerciales dentro de ZIFCOR.'
)

async function loadSectorData() {
  loading.value = true
  try {
    const { data } = await publicApi.getEmpresasBySector(sectorSlug.value)
    sector.value = data?.sector || null
    empresas.value = data?.empresas || []
  } catch {
    sector.value = null
    empresas.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.params.sectorSlug, () => { loadSectorData() }, { immediate: true })

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(el.dataset.delay || 0)
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() } },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) { el.__obs?.disconnect?.() }
}
</script>

<style scoped>
.sector-section {
  background: #fafbfc;
  padding: 40px 0 84px;
  min-height: calc(100vh - 96px);
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
  font-size: 13px;
  margin-bottom: 28px;
}

.bc-link {
  color: #0071e3;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 160ms;
}

.bc-link:hover {
  opacity: .82;
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, .25);
}

.bc-current {
  color: rgba(27, 27, 27, .58);
  font-weight: 700;
}

.loading-wrap {
  min-height: 320px;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, .48);
  font-weight: 600;
}

/* ── HERO ── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 72px;
}

.hero-text {
  display: flex;
  flex-direction: column;
}

.kicker {
  display: inline-flex;
  padding: 8px 18px;
  background: rgba(0, 113, 227, .08);
  border: 1.5px solid rgba(0, 113, 227, .18);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #0071e3;
  margin-bottom: 18px;
  width: fit-content;
}

.hero-title {
  margin: 0 0 14px;
  font-size: clamp(30px, 4vw, 50px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -1px;
  line-height: 1.06;
}

.accent {
  color: #0071e3;
}

.hero-sub {
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(27, 27, 27, .55);
  max-width: 46ch;
}

.hero-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(0, 113, 227, .08);
  border: 1px solid rgba(0, 113, 227, .16);
  color: #0071e3;
  font-size: 12px;
  font-weight: 800;
}

.hero-btns {
  display: flex;
  gap: 12px;
}

.hero-btn {
  height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 180ms ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn-secondary {
  background: #fff;
  color: #0071e3;
  border: 1.5px solid rgba(0, 113, 227, .18);
}

.hero-btn-secondary:hover {
  background: rgba(0, 113, 227, .04);
}

.hero-map {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
}

.latam-map {
  width: 100%;
  max-height: 430px;
  object-fit: contain;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 18%, black 86%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 10%, black 92%, transparent 100%);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent 0%, black 18%, black 86%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 10%, black 92%, transparent 100%);
  mask-composite: intersect;
}

.map-floating-card {
  position: absolute;
  right: 24px;
  bottom: 26px;
  min-width: 210px;
  padding: 18px 18px 16px;
  background: rgba(255, 255, 255, .92);
  border: 1.5px solid rgba(11, 18, 32, .08);
  box-shadow: 0 18px 44px rgba(11, 18, 32, .10);
  backdrop-filter: blur(12px);
  border-radius: 18px;
}

.mfc-kicker {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #0071e3;
}

.mfc-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.5px;
}

.mfc-sub {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(11, 18, 32, .5);
}

/* ── SECTION HEAD ── */
.section-head {
  margin-bottom: 22px;
}

.section-title {
  margin: 0 0 6px;
  font-size: clamp(20px, 2.3vw, 28px);
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.5px;
}

.section-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, .5);
}

/* ── CARDS ── */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.company-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 220ms ease;
  display: flex;
  flex-direction: column;
}

.company-card:hover {
  border-color: rgba(0, 113, 227, .2);
  box-shadow: 0 16px 40px rgba(0, 113, 227, .12);
  transform: translateY(-4px);
}

.company-banner {
  position: relative;
  height: 100px;
  overflow: hidden;
  background:
    linear-gradient(to bottom, rgba(11, 18, 32, .35), rgba(11, 18, 32, .65)),
    url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=400&fit=crop&q=80') center/cover no-repeat;
}

.company-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 23, 42, .08), rgba(15, 23, 42, .28));
}

.company-content {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.company-head {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-top: -24px;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}

.company-logo {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  box-shadow: 0 8px 20px rgba(11, 18, 32, .12);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 6px;
}

.company-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.company-main {
  min-width: 0;
  padding-bottom: 6px;
}

.company-name {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.2;
}

.company-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

.company-desc {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(11, 18, 32, .56);
  flex: 1;
}

.company-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.company-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 900;
  color: #0071e3;
}

/* ── EMPTY ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 20px;
  background: #fff;
  border: 1.5px dashed rgba(11, 18, 32, .12);
  border-radius: 22px;
}

.empty-icon {
  width: 86px;
  height: 86px;
  border-radius: 999px;
  background: rgba(11, 18, 32, .04);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}

.empty-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 900;
  color: #0b1220;
}

.empty-sub {
  margin: 0 0 18px;
  max-width: 50ch;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(11, 18, 32, .48);
}

.action-btn {
  border-radius: 12px;
  font-weight: 800;
  text-transform: none;
  letter-spacing: 0;
  padding-inline: 20px;
}

/* ── REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .hero-map {
    min-height: 300px;
  }

  .latam-map {
    max-height: 320px;
  }
}

@media (max-width: 640px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .sector-section {
    padding: 28px 0 60px;
  }

  .companies-grid {
    grid-template-columns: 1fr;
  }

  .hero-btns {
    flex-direction: column;
  }

  .hero-btn {
    width: 100%;
  }

  .map-floating-card {
    position: static;
    margin-top: 14px;
    width: 100%;
  }

  .hero-map {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
