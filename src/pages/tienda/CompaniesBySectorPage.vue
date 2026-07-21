<template>
  <section class="sector-page">

    <div class="sector-hero">
      <div class="hero-deco" aria-hidden="true" />
      <div class="hero-content">
        <nav class="breadcrumb">
          <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
          <span class="bc-sep">›</span>
          <span class="bc-current">{{ sector?.nombre || sectorSlug }}</span>
        </nav>
        <div v-if="loading" class="loading-wrap">
          <q-spinner color="white" size="36px" />
        </div>
        <template v-else>
          <div class="hero-main">
            <div class="hero-icon">
              <q-icon :name="sectorIcon" size="38px" />
            </div>
            <div class="hero-texts">
              <span class="hero-eyebrow">Sector industrial</span>
              <h1 class="hero-title">{{ sector?.nombre || sectorSlug }}</h1>
              <p v-if="sector?.descripcion" class="hero-desc">{{ sector.descripcion }}</p>
            </div>
          </div>
          <div v-if="sectorCategories.length" class="hero-cats">
            <span class="cats-label">Categorías dentro del sector</span>
            <div class="cats-row">
              <span v-for="cat in sectorCategories" :key="cat.slug" class="cat-chip">
                {{ cat.label }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="page-body">
      <div class="body-wrap">
        <template v-if="!loading">
          <div class="section-header">
            <h2 class="section-title">Empresas en este sector</h2>
            <p class="section-sub">{{ empresasSub }}</p>
          </div>

          <div v-if="!empresas.length" class="empty-state">
            <div class="empty-icon"><q-icon name="storefront" size="44px" color="grey-4" /></div>
            <h3 class="empty-title">Aún no hay empresas en este sector</h3>
            <p class="empty-sub">Cuando nuevas empresas se registren, aparecerán aquí.</p>
            <button class="btn-primary" @click="router.push('/auth')">Registrar empresa</button>
          </div>

          <div v-else class="companies-grid">
            <template v-for="empresa in empresas" :key="empresa.slug">
              <!-- Empresa general ZIFCOR: tarjeta de vitrina del gremio, sin nombre ni descripción -->
              <article v-if="isZifcor(empresa) && zifcorCard" class="zifcor-card"
                @click="router.push(`/tienda/${route.params.sectorSlug}/${empresa.profile?.slug || empresa.id}`)">
                <div class="zifcor-card-img-wrap">
                  <img :src="zifcorCard.image" :alt="zifcorCard.title" class="zifcor-card-img" />
                  <span class="zifcor-card-badge">ZIFCOR · Oficial</span>
                </div>
                <div class="zifcor-card-body">
                  <h3 class="zifcor-card-title">{{ zifcorCard.title }}</h3>
                  <span class="zifcor-card-link">
                    {{ zifcorCard.linkLabel }}
                    <i class="ti ti-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </article>

              <article v-else class="company-card"
                @click="router.push(`/tienda/${route.params.sectorSlug}/${empresa.profile?.slug || empresa.id}`)">
                <div class="card-banner" :style="{ backgroundImage: `url('${getCardBg(empresa)}')` }">
                  <div class="card-banner-overlay" />
                  <div v-if="empresa.profile?.logoUrl" class="card-logo">
                    <img :src="empresa.profile.logoUrl" :alt="getEmpresaNombre(empresa)" />
                  </div>
                  <div v-else class="card-logo-placeholder">
                    <i class="ti ti-building-factory-2" aria-hidden="true" />
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-name">{{ getEmpresaNombre(empresa) }}</h3>
                  <p class="card-desc">{{ getDesc(empresa) }}</p>
                  <div class="card-footer">
                    <span v-if="empresa.profile?.ciudad" class="card-location">
                      <i class="ti ti-map-pin" aria-hidden="true" />
                      {{ empresa.profile.ciudad }}<template v-if="empresa.profile?.departamento">, {{
                        empresa.profile.departamento }}</template>
                    </span>
                    <span class="card-cta">Ver empresa <i class="ti ti-arrow-right" aria-hidden="true" /></span>
                  </div>
                </div>
              </article>
            </template>
          </div>
        </template>
      </div>
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
const sectorSlug = computed(() => route.params.sectorSlug)
const empresasSub = computed(() => {
  const n = empresas.value.length
  return n + ' ' + (n === 1 ? 'empresa registrada' : 'empresas registradas')
})

const SECTOR_CATEGORIES = {
  manufacturero: [
    { slug: 'metalmecanica', label: 'Metalmecánica', icon: 'ti-tool' },
    { slug: 'plasticos', label: 'Plásticos', icon: 'ti-box' },
    { slug: 'textiles', label: 'Textiles', icon: 'ti-shirt' },
    { slug: 'electronica', label: 'Electrónica', icon: 'ti-cpu' },
    { slug: 'empaques', label: 'Empaques', icon: 'ti-package' },
    { slug: 'automotriz', label: 'Automotriz', icon: 'ti-car' },
    { slug: 'muebles', label: 'Muebles', icon: 'ti-armchair' },
  ],
  agroindustria: [
    { slug: 'flores', label: 'Flores', icon: 'ti-plant' },
    { slug: 'lacteos', label: 'Lácteos', icon: 'ti-droplet' },
    { slug: 'carnicos', label: 'Cárnicos', icon: 'ti-meat' },
    { slug: 'cereales', label: 'Cereales', icon: 'ti-grain' },
    { slug: 'frutas', label: 'Frutas y verduras', icon: 'ti-salad' },
  ],
  comercio: [
    { slug: 'mayorista', label: 'Mayorista', icon: 'ti-building-store' },
    { slug: 'minorista', label: 'Minorista', icon: 'ti-shopping-cart' },
    { slug: 'importacion', label: 'Importación', icon: 'ti-world-download' },
    { slug: 'exportacion', label: 'Exportación', icon: 'ti-world-upload' },
  ],
  servicios: [
    { slug: 'logistica', label: 'Logística', icon: 'ti-truck' },
    { slug: 'consultoria', label: 'Consultoría', icon: 'ti-briefcase' },
    { slug: 'mantenimiento', label: 'Mantenimiento', icon: 'ti-settings' },
    { slug: 'capacitacion', label: 'Capacitación', icon: 'ti-school' },
  ],
  tecnologia: [
    { slug: 'software', label: 'Software', icon: 'ti-code' },
    { slug: 'hardware', label: 'Hardware', icon: 'ti-cpu' },
    { slug: 'telecomunicaciones', label: 'Telecomunicaciones', icon: 'ti-wifi' },
    { slug: 'ia', label: 'IA & Datos', icon: 'ti-brain' },
  ],
  construccion: [
    { slug: 'civil', label: 'Obra civil', icon: 'ti-building-skyscraper' },
    { slug: 'materiales', label: 'Materiales', icon: 'ti-wall' },
    { slug: 'acabados', label: 'Acabados', icon: 'ti-paint' },
    { slug: 'diseno', label: 'Diseño y arquitectura', icon: 'ti-pencil-ruler' },
  ],
}

const sectorCategories = computed(() => SECTOR_CATEGORIES[sectorSlug.value?.toLowerCase()] || [])

const SECTOR_ICONS = {
  manufacturero: 'precision_manufacturing',
  agroindustria: 'agriculture',
  comercio: 'storefront',
  servicios: 'handyman',
  tecnologia: 'memory',
  construccion: 'apartment',
}

const sectorIcon = computed(() => SECTOR_ICONS[sectorSlug.value?.toLowerCase()] || 'category')

// Tarjeta de vitrina para la empresa general ZIFCOR dentro de cada gremio
const ZIFCOR_CARD_BY_SECTOR = {
  manufacturero: { image: '/manofacturero.png', title: 'Maquinaria industrial', linkLabel: 'Ver todos los productos' },
  agroindustria: { image: '/agroindustria.png', title: 'Productos agroindustriales', linkLabel: 'Ver todos los productos' },
  servicios: { image: '/servicios.png', title: 'Servicios industriales', linkLabel: 'Ver todos los servicios' },
  tecnologia: { image: '/Tecnologia.png', title: 'Productos tecnológicos', linkLabel: 'Ver todos los productos' },
}

const zifcorCard = computed(() => ZIFCOR_CARD_BY_SECTOR[sectorSlug.value?.toLowerCase()] || null)

function isZifcor(empresa) {
  return getEmpresaNombre(empresa).trim().toUpperCase() === 'ZIFCOR'
}

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

function getEmpresaNombre(e) {
  return e.profile?.nombreComercial || e.profile?.razonSocial || 'Empresa en este sector'
}

function getCardBg(e) {
  if (e.profile?.bannerUrl) return e.profile.bannerUrl
  if (sector.value?.imagenUrl) return sector.value.imagenUrl
  return ''
}

function getDesc(e) {
  const d = e.profile?.descripcion
  if (!d) return 'Empresa registrada en ZIFCOR. Ingresa para conocer su tienda y productos.'
  return d.length > 120 ? d.slice(0, 120) + '...' : d
}
</script>

<style scoped>
/* ── HERO ── */
.sector-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(1100px 460px at 82% -30%, rgba(79, 156, 249, 0.42), transparent 60%),
    linear-gradient(120deg, #0b1e46 0%, #123a94 52%, #1657c9 100%);
  display: flex;
}

/* Puntos decorativos suaves, en vez de foto */
.hero-deco {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.14) 1.4px, transparent 1.5px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(900px 420px at 88% 20%, #000 0%, transparent 70%);
  mask-image: radial-gradient(900px 420px at 88% 20%, #000 0%, transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 48px 40px;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  margin-bottom: 26px;
}

.bc-link {
  color: rgba(255, 255, 255, 0.60);
  font-weight: 700;
  cursor: pointer;
  transition: color 150ms;
}

.bc-link:hover {
  color: #fff;
}

.bc-sep {
  color: rgba(255, 255, 255, 0.30);
  font-size: 14px;
}

.bc-current {
  color: rgba(255, 255, 255, 0.90);
  font-weight: 700;
}

.loading-wrap {
  min-height: 120px;
  display: flex;
  align-items: center;
}

.hero-main {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.hero-icon {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.hero-icon :deep(.q-icon) {
  color: #fff;
}

.hero-texts {
  min-width: 0;
}

.hero-eyebrow {
  display: block;
  color: rgba(255, 255, 255, 0.62);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.hero-title {
  margin: 0;
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1.4px;
  line-height: 1.02;
}

.hero-desc {
  margin: 10px 0 0;
  max-width: 60ch;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
}

.hero-cats {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.cats-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.55);
}

.cats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.cat-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12.5px;
  font-weight: 700;
  transition: background 140ms, border-color 140ms;
  font-family: inherit;
}

.cat-chip .ti {
  font-size: 13px;
  opacity: 0.75;
}

/* ── BODY ── */
.page-body {
  background: #f2f3f6;
  padding: 44px 0 80px;
}

.body-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  margin: 0 0 4px;
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.4px;
}

.section-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(11, 18, 32, 0.42);
  font-weight: 600;
}

/* ── CARDS ── */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.company-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(11, 18, 32, 0.07), 0 4px 12px rgba(11, 18, 32, 0.05);
}

.company-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(11, 18, 32, 0.12);
}

/* Banner con imagen real de la empresa */
.card-banner {
  position: relative;
  height: 150px;
  background: #0d1f3c;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.card-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8, 14, 30, 0.75) 0%, rgba(8, 14, 30, 0.15) 60%, transparent 100%);
}

/* Logo flotante esquina inferior izquierda */
.card-logo {
  position: absolute;
  bottom: 12px;
  left: 14px;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #fff;
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.card-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card-logo-placeholder {
  position: absolute;
  bottom: 12px;
  left: 14px;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-logo-placeholder .ti {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);
}

/* Cuerpo */
.card-body {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 7px;
}

.card-name {
  margin: 0;
  font-size: 14.5px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.3;
  letter-spacing: -0.1px;
}

.card-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(11, 18, 32, 0.50);
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(11, 18, 32, 0.06);
  margin-top: 2px;
}

.card-location {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11.5px;
  color: rgba(11, 18, 32, 0.35);
  font-weight: 600;
}

.card-location .ti {
  font-size: 12px;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 800;
  color: #1354d3;
  margin-left: auto;
}

.card-cta .ti {
  font-size: 13px;
  transition: transform 150ms;
}

.company-card:hover .card-cta .ti {
  transform: translateX(3px);
}

/* ── ZIFCOR (vitrina del gremio) ── */
.zifcor-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  max-width: 240px;
  justify-self: start;
  border: 2px solid rgba(19, 84, 211, 0.45);
  box-shadow: 0 0 0 5px rgba(19, 84, 211, 0.12), 0 14px 32px rgba(19, 84, 211, 0.24);
  transition: transform 200ms ease, box-shadow 200ms ease;
  display: flex;
  flex-direction: column;
}

.zifcor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 0 6px rgba(19, 84, 211, 0.18), 0 20px 42px rgba(19, 84, 211, 0.34);
}

.zifcor-card-img-wrap {
  position: relative;
  height: 130px;
  background: #0d1f3c;
  overflow: hidden;
}

.zifcor-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.zifcor-card-badge {
  position: absolute;
  top: 9px;
  left: 9px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #1354d3;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}

.zifcor-card-body {
  padding: 13px 15px 13px;
  display: flex;
  flex-direction: column;
}

.zifcor-card-title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.25;
  letter-spacing: -0.2px;
}

.zifcor-card-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 800;
  color: #1354d3;
  padding-top: 9px;
  border-top: 1px solid rgba(11, 18, 32, 0.08);
}

.zifcor-card-link .ti {
  font-size: 12px;
  transition: transform 150ms;
}

.zifcor-card:hover .zifcor-card-link .ti {
  transform: translateX(3px);
}

/* ── EMPTY ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 24px;
  background: #fff;
  border-radius: 16px;
}

.empty-icon {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: #f2f3f6;
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}

.empty-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 900;
  color: #0b1220;
}

.empty-sub {
  margin: 0 0 20px;
  max-width: 44ch;
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(11, 18, 32, 0.45);
}

.btn-primary {
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  border: none;
  background: #1354d3;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  transition: background 150ms;
}

.btn-primary:hover {
  background: #0f44b0;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hero-content {
    padding: 24px 24px 32px;
  }

  .hero-icon {
    width: 58px;
    height: 58px;
    border-radius: 16px;
  }

  .hero-icon :deep(.q-icon) {
    font-size: 28px !important;
  }
}

@media (max-width: 560px) {
  .hero-main {
    gap: 14px;
  }

  .hero-desc {
    display: none;
  }
}

@media (max-width: 640px) {
  .body-wrap {
    padding: 0 16px;
  }

  .page-body {
    padding: 32px 0 60px;
  }

  .companies-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .hero-content {
    padding: 20px 16px 32px;
  }
}
</style>
