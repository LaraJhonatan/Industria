<template>
  <section class="lb-section">
    <div class="lb-wrap">
      <router-link to="/tienda/logistica" class="lb-card" aria-label="Cotizar transporte de carga">
        <div class="lb-brand">
          <div class="lb-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="6" width="14" height="11" rx="1.5" />
              <path d="M15 10h4l3 3v4h-7z" />
              <circle cx="6" cy="19" r="1.8" />
              <circle cx="17.5" cy="19" r="1.8" />
            </svg>
          </div>
          <div>
            <h2 class="lb-title">Logística <span class="lb-title-blue">Empresarial</span></h2>
            <p class="lb-sub">Conectamos tu negocio con soluciones de transporte y distribución en todo el país.</p>
            <p class="lb-sub2">Cotiza en línea en minutos y paga por PSE.</p>
          </div>
        </div>

        <ul class="lb-features">
          <li v-for="f in features" :key="f.title" class="lb-feature">
            <span class="lb-feature-icon" v-html="f.icon" />
            <span class="lb-feature-title">{{ f.title }}</span>
            <span class="lb-feature-sub">{{ f.sub }}</span>
          </li>
        </ul>

        <span class="lb-cta">
          Cotizar transporte
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>

        <div class="lb-photo" aria-hidden="true">
          <img v-if="foto" :src="foto" alt="" @error="foto = FOTO_POR_DEFECTO" />
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { logisticaApi } from '../../api/logistica'
import { imagenCloudinary, TAMANOS } from '../../utils/imagenCloudinary'

// La foto se administra desde el dashboard (Logística → Imágenes); esta es la de respaldo.
const FOTO_POR_DEFECTO = '/logistica/banner-inicio.jpg'
const foto = ref(null)

onMounted(async () => {
  try {
    const { data } = await logisticaApi.getImagenes()
    foto.value = imagenCloudinary(data.banner, TAMANOS.banner) || FOTO_POR_DEFECTO
  } catch {
    foto.value = FOTO_POR_DEFECTO
  }
})

const features = [
  {
    title: 'Transporte terrestre',
    sub: 'Carry, turbos, sencillos y mulas.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="14" height="11" rx="1.5"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/></svg>',
  },
  {
    title: 'Cobertura nacional',
    sub: 'Desde Bogotá a las principales ciudades.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  },
  {
    title: 'Vehículo ideal automático',
    sub: 'Según el peso y las medidas de tu carga.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6z"/><polyline points="9 12 11 14 15 10"/></svg>',
  },
  {
    title: 'Precio al instante',
    sub: 'Sin esperar respuesta de nadie.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
  },
]
</script>

<style scoped>
.lb-section {
  background: #fff;
  padding: 18px 0 6px;
}

.lb-wrap {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

.lb-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(380px, 1.3fr) 2fr auto 230px;
  align-items: center;
  gap: 28px;
  min-height: 116px;
  padding: 18px 0 18px 24px;
  background: linear-gradient(100deg, #eef5ff 0%, #f5f9ff 60%, #e8f1ff 100%);
  border: 1px solid rgba(0, 113, 227, .14);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 200ms, transform 200ms;
}

.lb-card:hover {
  box-shadow: 0 10px 28px rgba(0, 113, 227, .14);
  transform: translateY(-1px);
}

.lb-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lb-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0071e3, #1a87ff);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 6px 16px rgba(0, 113, 227, .28);
}

.lb-title {
  margin: 0;
  font-size: clamp(20px, 1.9vw, 26px);
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  line-height: 1.1;
  white-space: nowrap;
}

.lb-title-blue {
  color: #0071e3;
}

.lb-sub {
  margin: 6px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(11, 18, 32, .72);
  line-height: 1.4;
}

.lb-sub2 {
  margin: 4px 0 0;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .5);
}

.lb-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.lb-feature {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lb-feature-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(0, 113, 227, .1);
  color: #0071e3;
  display: grid;
  place-items: center;
  margin-bottom: 4px;
}

.lb-feature-title {
  font-size: 12.5px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.25;
}

.lb-feature-sub {
  font-size: 11px;
  color: rgba(11, 18, 32, .5);
  line-height: 1.35;
}

.lb-cta {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: 1.5px solid #0071e3;
  border-radius: 10px;
  background: #fff;
  color: #0071e3;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  transition: background 160ms, color 160ms;
}

.lb-card:hover .lb-cta {
  background: #0071e3;
  color: #fff;
}

.lb-photo {
  align-self: stretch;
  position: relative;
  margin: -18px 0;
  clip-path: polygon(18% 0, 100% 0, 100% 100%, 0 100%);
}

.lb-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, #0071e3 0 7%, transparent 7% 88%, rgba(0, 113, 227, .85) 88%);
}

.lb-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 55% center;
  display: block;
}

@media (max-width: 1280px) {
  .lb-card {
    grid-template-columns: minmax(340px, 1fr) 1.6fr auto;
  }

  .lb-photo {
    display: none;
  }

  .lb-card {
    padding-right: 24px;
  }
}

@media (max-width: 1000px) {
  .lb-card {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .lb-features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lb-cta {
    justify-self: start;
  }
}

@media (max-width: 600px) {
  .lb-wrap {
    padding: 0 16px;
  }

  .lb-card {
    padding: 18px;
  }

  .lb-icon {
    width: 48px;
    height: 48px;
  }

  .lb-title {
    white-space: normal;
  }

  .lb-features {
    grid-template-columns: 1fr;
  }
}
</style>
