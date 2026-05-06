<template>
  <section class="detail-section">
    <div class="bs-wrap">
      <div v-if="loading" class="loading-wrap column items-center justify-center">
        <q-spinner color="blue-6" size="42px" />
        <p class="loading-text">Cargando producto...</p>
      </div>

      <template v-else-if="product">
        <nav class="breadcrumb">
          <span class="bc-link" @click="router.push('/tienda')">Sectores</span>
          <span class="bc-sep">›</span>
          <span class="bc-link" @click="router.push(`/tienda/empresa/${empresaId}`)">
            {{ empresaName }}
          </span>
          <span class="bc-sep">›</span>
          <span class="bc-current">{{ product.nombre }}</span>
        </nav>

        <div class="detail-layout">
          <!-- GALERÍA -->
          <div class="gallery-col">
            <div class="gallery-shell">
              <div class="gallery-main" @click="zoomOpen = true">
                <img v-if="selectedImageUrl" :src="selectedImageUrl" :alt="product.nombre" class="gallery-img" />
                <div v-else class="gallery-empty">
                  <q-icon name="inventory_2" size="52px" color="grey-4" />
                </div>

                <button v-if="productImages.length > 1" class="gallery-nav gallery-nav-left" @click.stop="prevImage">
                  <q-icon name="chevron_left" size="22px" />
                </button>

                <button v-if="productImages.length > 1" class="gallery-nav gallery-nav-right" @click.stop="nextImage">
                  <q-icon name="chevron_right" size="22px" />
                </button>

                <div v-if="selectedImageUrl" class="zoom-badge">
                  <q-icon name="zoom_in" size="16px" />
                  Ampliar
                </div>
              </div>

              <div v-if="productImages.length > 1" class="gallery-thumbs">
                <button v-for="(img, index) in productImages" :key="img.id || index" class="thumb-btn"
                  :class="{ 'thumb-btn-active': selectedImageIndex === index }" @click="selectImage(index)">
                  <img :src="img.url" :alt="`${product.nombre} ${index + 1}`" class="gallery-thumb" />
                </button>
              </div>
            </div>
          </div>

          <!-- INFO -->
          <div class="info-col">
            <div class="empresa-chip" @click="router.push(`/tienda/empresa/${empresaId}`)">
              <div class="empresa-chip-logo">
                <img v-if="empresaLogoUrl" :src="empresaLogoUrl" :alt="empresaName" class="empresa-chip-logo-img" />
                <span v-else class="empresa-chip-letter">{{ empresaName.charAt(0) }}</span>
              </div>

              <div class="empresa-chip-meta">
                <span class="empresa-chip-name">{{ empresaName }}</span>
                <span class="empresa-chip-sub">Ver tienda</span>
              </div>

              <q-icon name="chevron_right" size="16px" color="grey-5" />
            </div>

            <h1 class="product-title">{{ product.nombre }}</h1>

            <p v-if="product.precioBase" class="product-price">
              ${{ Number(product.precioBase).toLocaleString('es-CO') }}
              <span class="product-currency">{{ product.moneda }}</span>
            </p>
            <p v-else class="product-price-na">Precio por cotización</p>

            <p v-if="product.descripcion" class="product-desc">
              {{ product.descripcion }}
            </p>

            <div v-if="product.variantes?.length" class="variants-section">
              <p class="section-label">Selecciona una opción</p>

              <div class="variants-grid">
                <button v-for="v in product.variantes" :key="v.id" class="variant-btn"
                  :class="{ 'variant-btn-active': selectedVariante?.id === v.id }" @click="selectedVariante = v">
                  {{ varianteLabel(v) }}
                </button>
              </div>
            </div>

            <div v-if="product.atributos?.length" class="attrs-section">
              <p class="section-label">Especificaciones</p>

              <div class="attrs-grid">
                <div v-for="av in product.atributos" :key="av.id" class="attr-item">
                  <span class="attr-key">{{ av.atributo?.nombre }}</span>
                  <span class="attr-val">{{ av.valor || '—' }}</span>
                </div>
              </div>
            </div>

            <div class="cta-card">
              <button v-if="hasWhatsApp(product.empresa)" class="btn-whatsapp" @click="onCotizar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Cotizar por WhatsApp
              </button>

              <div v-else class="no-whatsapp">
                <q-icon name="info_outline" size="16px" color="grey-5" />
                <span>Contacta directamente a la empresa para cotizar</span>
              </div>

              <button class="btn-back" @click="router.push(`/tienda/empresa/${empresaId}`)">
                ← Ver más productos
              </button>
            </div>
          </div>
        </div>

        <q-dialog v-model="zoomOpen">
          <div class="zoom-modal">
            <button class="zoom-close" @click="zoomOpen = false">
              <q-icon name="close" size="22px" />
            </button>

            <button v-if="productImages.length > 1" class="zoom-nav zoom-nav-left" @click.stop="prevImage">
              <q-icon name="chevron_left" size="28px" />
            </button>

            <img v-if="selectedImageUrl" :src="selectedImageUrl" :alt="product.nombre" class="zoom-image" />

            <button v-if="productImages.length > 1" class="zoom-nav zoom-nav-right" @click.stop="nextImage">
              <q-icon name="chevron_right" size="28px" />
            </button>
          </div>
        </q-dialog>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { publicApi } from '../../api/publicCatalog'
import { useWhatsAppQuote } from '../../composables/useWhatsAppQuote'

const router = useRouter()
const route = useRoute()
const { openWhatsApp, hasWhatsApp } = useWhatsAppQuote()

const empresaId = computed(() => route.params.empresaId)
const productoId = computed(() => route.params.productoId)

const product = ref(null)
const loading = ref(true)
const selectedImageIndex = ref(0)
const selectedVariante = ref(null)
const zoomOpen = ref(false)

const productImages = computed(() => product.value?.imagenes || [])

const selectedImageUrl = computed(() => {
  if (!productImages.value.length) return ''
  return productImages.value[selectedImageIndex.value]?.url || ''
})

const empresaName = computed(() =>
  product.value?.empresa?.profile?.nombreComercial ||
  product.value?.empresa?.razonSocial ||
  'Empresa'
)

const empresaLogoUrl = computed(() =>
  product.value?.empresa?.profile?.logoUrl ||
  product.value?.empresa?.profile?.logo ||
  ''
)

function selectImage(index) {
  selectedImageIndex.value = index
}

function prevImage() {
  if (!productImages.value.length) return

  selectedImageIndex.value =
    selectedImageIndex.value === 0
      ? productImages.value.length - 1
      : selectedImageIndex.value - 1
}

function nextImage() {
  if (!productImages.value.length) return

  selectedImageIndex.value =
    selectedImageIndex.value === productImages.value.length - 1
      ? 0
      : selectedImageIndex.value + 1
}

function varianteLabel(v) {
  if (v.atributos?.length) {
    return v.atributos.map(a => a.valor).join(' · ')
  }

  return v.sku || 'Variante'
}

function onCotizar() {
  const varianteText = selectedVariante.value ? varianteLabel(selectedVariante.value) : null

  openWhatsApp({
    producto: product.value.nombre,
    empresa: product.value.empresa,
    variante: varianteText,
  })
}

async function loadProduct() {
  loading.value = true

  try {
    const { data } = await publicApi.getProducto(productoId.value)
    product.value = data || null

    if (data?.imagenes?.length) {
      const principalIndex = data.imagenes.findIndex(i => i.esPrincipal)
      selectedImageIndex.value = principalIndex >= 0 ? principalIndex : 0
    } else {
      selectedImageIndex.value = 0
    }

    if (data?.variantes?.length) {
      selectedVariante.value = data.variantes[0]
    } else {
      selectedVariante.value = null
    }
  } catch (error) {
    console.error('Error al cargar datos del producto:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.productoId,
  () => {
    zoomOpen.value = false
    loadProduct()
  },
  { immediate: true }
)
</script>

<style scoped>
.detail-section {
  background: #f6f8fb;
  padding: 42px 0 84px;
  min-height: 100vh;
}

.bs-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

/* loading */
.loading-wrap {
  min-height: 70vh;
  gap: 14px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: rgba(11, 18, 32, 0.48);
  font-weight: 600;
}

/* breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.bc-link {
  color: #0071e3;
  font-weight: 800;
  cursor: pointer;
}

.bc-link:hover {
  text-decoration: underline;
}

.bc-sep {
  color: rgba(27, 27, 27, 0.3);
}

.bc-current {
  color: rgba(27, 27, 27, 0.6);
  font-weight: 700;
}

/* layout */
.detail-layout {
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  gap: 42px;
  align-items: start;
}

/* gallery */
.gallery-shell {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 24px;
  padding: 18px;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.06);
}

.gallery-main {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(11, 18, 32, 0.08);
  background: #f8fafc;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 320ms ease;
}

.gallery-main:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-empty {
  width: 100%;
  height: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-badge {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.76);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  backdrop-filter: blur(8px);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #0b1220;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(11, 18, 32, 0.16);
  transition: transform 160ms ease, background 160ms ease;
}

.gallery-nav:hover {
  transform: translateY(-50%) scale(1.04);
  background: #fff;
}

.gallery-nav-left {
  left: 14px;
}

.gallery-nav-right {
  right: 14px;
}

.gallery-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.thumb-btn {
  width: 76px;
  height: 76px;
  border-radius: 14px;
  padding: 0;
  border: 1.5px solid rgba(11, 18, 32, 0.1);
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: all 180ms ease;
}

.thumb-btn:hover {
  border-color: rgba(0, 113, 227, 0.24);
  transform: translateY(-1px);
}

.thumb-btn-active {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.14);
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* info */
.info-col {
  display: flex;
  flex-direction: column;
}

.empresa-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  background: #fff;
  cursor: pointer;
  margin-bottom: 18px;
  width: fit-content;
  transition: all 160ms ease;
}

.empresa-chip:hover {
  border-color: rgba(0, 113, 227, 0.2);
  box-shadow: 0 8px 18px rgba(0, 113, 227, 0.08);
}

.empresa-chip-logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(11, 18, 32, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.empresa-chip-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
  background: #fff;
}

.empresa-chip-letter {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(135deg, #0071e3, #42a5ff);
}

.empresa-chip-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.empresa-chip-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
}

.empresa-chip-sub {
  font-size: 11px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.42);
}

.product-title {
  font-size: clamp(28px, 3.2vw, 46px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -1px;
  color: #0b1220;
  margin: 0 0 14px;
}

.product-price {
  font-size: 32px;
  font-weight: 900;
  color: #0b1220;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.product-currency {
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.42);
  margin-left: 6px;
}

.product-price-na {
  font-size: 14px;
  font-weight: 800;
  color: rgba(11, 18, 32, 0.45);
  margin: 0 0 16px;
}

.product-desc {
  font-size: 15px;
  color: rgba(11, 18, 32, 0.66);
  line-height: 1.8;
  margin: 0 0 24px;
  max-width: 62ch;
}

.section-label {
  font-size: 13px;
  font-weight: 900;
  color: #0b1220;
  margin: 0 0 12px;
  text-transform: none;
}

.variants-section {
  margin-bottom: 24px;
}

.variants-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.variant-btn {
  min-height: 42px;
  padding: 0 16px;
  border: 1.5px solid rgba(11, 18, 32, 0.12);
  border-radius: 12px;
  background: #fff;
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
  cursor: pointer;
  transition: all 160ms ease;
}

.variant-btn:hover {
  border-color: rgba(0, 113, 227, 0.24);
  color: #0071e3;
}

.variant-btn-active {
  border-color: #0071e3;
  background: rgba(0, 113, 227, 0.06);
  color: #0071e3;
  box-shadow: 0 10px 20px rgba(0, 113, 227, 0.1);
}

.attrs-section {
  margin-bottom: 28px;
}

.attrs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.attr-item {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 14px;
  padding: 14px;
}

.attr-key {
  font-size: 10.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, 0.42);
  text-transform: uppercase;
  letter-spacing: 0.7px;
  display: block;
  margin-bottom: 6px;
}

.attr-val {
  font-size: 14px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.5;
}

.cta-card {
  margin-top: 6px;
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.08);
  border-radius: 20px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  background: #25d366;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  cursor: pointer;
  transition: filter 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 12px 24px rgba(37, 211, 102, 0.2);
}

.btn-whatsapp:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
}

.no-whatsapp {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(11, 18, 32, 0.54);
  padding: 12px 14px;
  background: #f7f8fb;
  border-radius: 12px;
}

.btn-back {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, 0.12);
  border-radius: 12px;
  min-height: 46px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(11, 18, 32, 0.62);
  cursor: pointer;
  transition: all 160ms ease;
}

.btn-back:hover {
  border-color: rgba(0, 113, 227, 0.2);
  color: #0071e3;
}

/* zoom modal */
.zoom-modal {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: min(92vw, 1100px);
  min-height: min(88vh, 760px);
  padding: 32px;
  background: rgba(11, 18, 32, 0.92);
  border-radius: 24px;
  overflow: hidden;
}

.zoom-image {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

.zoom-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.zoom-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.zoom-nav-left {
  left: 16px;
}

.zoom-nav-right {
  right: 16px;
}

/* responsive */
@media (max-width: 980px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .attrs-grid {
    grid-template-columns: 1fr;
  }

  .product-title {
    font-size: 34px;
  }
}

@media (max-width: 640px) {
  .bs-wrap {
    padding: 0 16px;
  }

  .detail-section {
    padding: 28px 0 56px;
  }

  .gallery-shell {
    padding: 12px;
  }

  .thumb-btn {
    width: 64px;
    height: 64px;
  }

  .zoom-modal {
    min-width: 96vw;
    min-height: 82vh;
    padding: 22px;
  }

  .zoom-nav {
    width: 44px;
    height: 44px;
  }
}
</style>
