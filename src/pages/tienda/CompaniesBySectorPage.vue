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
            <span class="kicker">Sector empresarial · ZiFux</span>

            <h1 class="hero-title">
              Empresas de
              <span class="accent">{{ sector?.nombre || sectorSlug }}</span>
            </h1>

            <p class="hero-sub">{{ sectorDescription }}</p>

            <div class="hero-pills">
              <span class="hero-pill">
                {{ empresas.length }} {{ empresas.length === 1 ? 'empresa registrada' : 'empresas registradas' }}
              </span>
              <!-- <span class="hero-pill hero-pill-soft">Marketplace B2B</span> -->
            </div>

            <div class="hero-btns">
              <!-- <button v-if="empresas.length" class="hero-btn hero-btn-primary" @click="scrollToCompanies">
                Ver empresas
              </button> -->

              <button class="hero-btn hero-btn-secondary" @click="router.push('/auth')">
                Registrar mi empresa
              </button>
            </div>
          </div>

          <div class="hero-map">
            <img src="/mapa.png" alt="Mapa de cobertura ZiFux" class="latam-map" />

            <div class="map-floating-card">
              <p class="mfc-kicker">Cobertura ZiFux</p>
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
            <div class="company-banner" :class="{ 'company-banner-fallback': !getBannerUrl(empresa) }">
              <img v-if="getBannerUrl(empresa)" :src="getBannerUrl(empresa)"
                :alt="`Banner de ${getCompanyName(empresa)}`" class="company-banner-img" />
              <div class="company-banner-overlay"></div>
            </div>

            <div class="company-content">
              <div class="company-head">
                <div class="company-logo">
                  <img v-if="getLogoUrl(empresa)" :src="getLogoUrl(empresa)" :alt="getCompanyName(empresa)"
                    class="company-logo-img" />
                  <span v-else class="company-logo-letter">
                    {{ getCompanyName(empresa).charAt(0) }}
                  </span>
                </div>

                <div class="company-main">
                  <h3 class="company-name">{{ getCompanyName(empresa) }}</h3>

                  <div v-if="empresa.profile?.ciudad || empresa.profile?.departamento" class="company-location">
                    <q-icon name="location_on" size="14px" color="grey-5" />
                    <span>
                      {{ empresa.profile?.ciudad || 'Ciudad' }}
                      <template v-if="empresa.profile?.departamento">
                        , {{ empresa.profile.departamento }}
                      </template>
                    </span>
                  </div>
                </div>
              </div>

              <p class="company-desc">
                {{
                  empresa.profile?.descripcion
                    ? `${empresa.profile.descripcion.slice(0, 150)}${empresa.profile.descripcion.length > 150 ? '...' : ''}`
                    : 'Empresa registrada en ZiFux. Ingresa para conocer su tienda, productos y datos de contacto.'
                }}
              </p>

              <div class="company-tags">
                <span v-if="empresa.profile?.sitioWeb" class="company-tag">
                  <q-icon name="language" size="12px" />
                  Sitio web
                </span>

                <span v-if="empresa.profile?.whatsapp" class="company-tag company-tag-green">
                  <q-icon name="chat" size="12px" />
                  WhatsApp
                </span>

                <span v-if="empresa.profile?.linkedinUrl || empresa.profile?.linkedin" class="company-tag">
                  <q-icon name="groups" size="12px" />
                  LinkedIn
                </span>
              </div>

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
  'Explora empresas registradas en este sector y conoce sus productos, servicios y datos comerciales dentro de ZiFux.'
)

async function loadSectorData() {
  loading.value = true

  try {
    const { data } = await publicApi.getEmpresasBySector(sectorSlug.value)
    sector.value = data?.sector || null
    empresas.value = data?.empresas || []
  } catch (error) {
    console.error('Error al cargar datos del sector:', error)
    sector.value = null
    empresas.value = []
  } finally {
    loading.value = false
  }
}

// function scrollToCompanies() {
//   companiesSection.value?.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   })
// }

function getCompanyName(empresa) {
  return empresa?.profile?.nombreComercial || empresa?.razonSocial || 'Empresa'
}

function getLogoUrl(empresa) {
  return empresa?.profile?.logoUrl || empresa?.profile?.logo || ''
}

function getBannerUrl(empresa) {
  return empresa?.profile?.bannerUrl || empresa?.profile?.banner || ''
}

watch(
  () => route.params.sectorSlug,
  () => {
    loadSectorData()
  },
  { immediate: true }
)

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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) {
    el.__obs?.disconnect?.()
  },
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

/* breadcrumb */
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
  transition: opacity 160ms ease;
}

.bc-link:hover {
  opacity: 0.82;
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, 0.25);
}

.bc-current {
  color: rgba(27, 27, 27, 0.58);
  font-weight: 700;
}

/* loading */
.loading-wrap {
  min-height: 320px;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(27, 27, 27, 0.48);
  font-weight: 600;
}

/* hero */
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
  background: rgba(0, 113, 227, 0.08);
  border: 1.5px solid rgba(0, 113, 227, 0.18);
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
  color: rgba(27, 27, 27, 0.55);
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
  background: rgba(0, 113, 227, 0.08);
  border: 1px solid rgba(0, 113, 227, 0.16);
  color: #0071e3;
  font-size: 12px;
  font-weight: 800;
}

.hero-pill-soft {
  background: rgba(27, 27, 27, 0.04);
  border-color: rgba(27, 27, 27, 0.08);
  color: rgba(27, 27, 27, 0.52);
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-btn {
  height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
  letter-spacing: 0;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn-primary {
  background: #0071e3;
  color: #fff;
  box-shadow: 0 12px 28px rgba(0, 113, 227, 0.2);
}

.hero-btn-primary:hover {
  filter: brightness(0.9);
}

.hero-btn-secondary {
  background: #fff;
  color: #0071e3;
  border: 1.5px solid rgba(0, 113, 227, 0.18);
}

.hero-btn-secondary:hover {
  background: rgba(0, 113, 227, 0.04);
}

/* map */
.hero-map {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
}

.latam-map {
  width: 100%;
  height: 100%;
  max-height: 430px;
  object-fit: contain;
  filter: saturate(1.02);
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
  background: rgba(255, 255, 255, 0.92);
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  box-shadow: 0 18px 44px rgba(11, 18, 32, 0.1);
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
  color: rgba(11, 18, 32, 0.5);
}

/* section head */
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
  color: rgba(27, 27, 27, 0.5);
}

/* companies */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 22px;
}

.company-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  transition: all 220ms ease;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.company-card:hover {
  border-color: rgba(0, 113, 227, 0.2);
  box-shadow: 0 16px 40px rgba(0, 113, 227, 0.12);
  transform: translateY(-4px);
}

.company-banner {
  position: relative;
  height: 118px;
  background: #eef3f8;
  overflow: hidden;
}

.company-banner-fallback {
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.22), transparent 30%),
    linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #60a5fa 100%);
}

.company-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.company-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.28));
}

.company-content {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.company-head {
  display: flex;
  gap: 14px;
  align-items: flex-end;
  margin-top: -28px;
  margin-bottom: 14px;
  position: relative;
  z-index: 2;
}

.company-logo {
  width: 78px;
  height: 78px;
  border-radius: 18px;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  box-shadow: 0 10px 24px rgba(11, 18, 32, 0.12);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.company-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  background: #fff;
  display: block;
}

.company-logo-letter {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 28px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(135deg, #0071e3, #42a5ff);
}

.company-main {
  min-width: 0;
  padding-bottom: 8px;
}

.company-name {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.company-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, 0.45);
  font-weight: 600;
}

.company-desc {
  margin: 0 0 14px;
  font-size: 13.5px;
  line-height: 1.65;
  color: rgba(11, 18, 32, 0.56);
  flex: 1;
}

.company-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.company-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  background: rgba(11, 18, 32, 0.05);
  color: rgba(11, 18, 32, 0.55);
  border: 1px solid rgba(11, 18, 32, 0.08);
}

.company-tag-green {
  background: rgba(34, 197, 94, 0.08);
  color: #15803d;
  border-color: rgba(34, 197, 94, 0.18);
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

/* empty */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 20px;
  background: #fff;
  border: 1.5px dashed rgba(11, 18, 32, 0.12);
  border-radius: 22px;
}

.empty-icon {
  width: 86px;
  height: 86px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.04);
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
  color: rgba(11, 18, 32, 0.48);
}

.action-btn {
  border-radius: 12px;
  font-weight: 800;
  text-transform: none;
  letter-spacing: 0;
  padding-inline: 20px;
}

/* reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* responsive */
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
    align-items: stretch;
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .company-head {
    align-items: center;
  }

  .company-logo {
    width: 72px;
    height: 72px;
  }
}
</style>
