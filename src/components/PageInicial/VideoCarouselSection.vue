<template>
  <section class="hero" aria-label="Hero principal">

    <div class="hero-bg" aria-hidden="true">
      <div class="grid-overlay" />
    </div>

    <div class="hero-wrap" :class="{ ready }">

      <h1 class="hero-title">
        Importamos maquinaria.<br />
        Conectamos empresas.<br />
        Hacemos que vendas más<span class="dot">.</span>
      </h1>

      <p class="hero-desc">
        Integración real con criterio técnico y enfoque estratégico.
        Soluciones industriales a medida para empresas que exigen resultados.
      </p>

      <!-- ③ CTAs -->
      <div class="hero-ctas">
        <router-link to="/tienda" class="cta-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <div class="cta-texts">
            <span class="cta-main">Explorar tienda</span>
            <span class="cta-sub">Encuentra proveedores industriales en minutos.</span>
          </div>
        </router-link>

        <router-link to="/auth?mode=registro-empresa" class="cta-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <div class="cta-texts">
            <span class="cta-main">Vender en ZiFux</span>
            <span class="cta-sub">Regístrate gratis y empieza a vender hoy.</span>
          </div>
        </router-link>
      </div>

      <!-- ④ VIDEO -->
      <div class="video-block">
        <div class="video-wrapper">
          <iframe v-if="useYouTube" class="video-iframe" :src="youtubeEmbedUrl" title="Video de presentación ZiFux"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
          <video v-else class="video" :src="videoSrc" controls playsinline>
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      <!-- ⑤ CARRUSEL DE LOGOS -->
      <div class="carousel-wrap" :class="{ carouselReady }">
        <div class="carousel-label">MARCAS ALIADAS</div>
        <div class="track-outer">
          <div class="carousel-track">
            <div v-for="(logo, idx) in filledLogos" :key="`a-${idx}`" class="logo-pill">
              <img :src="logo.url" :alt="logo.name" class="logo-img" />
            </div>
            <div v-for="(logo, idx) in filledLogos" :key="`b-${idx}`" class="logo-pill">
              <img :src="logo.url" :alt="logo.name" class="logo-img" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const ready = ref(false)
const carouselReady = ref(false)

const useYouTube = ref(true)
const youtubeVideoId = ref('46IkWDtKXC8')
const youtubeEmbedUrl = ref(
  `https://www.youtube.com/embed/${youtubeVideoId.value}` +
  `?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&modestbranding=1`
)
const videoSrc = ref('/videos/industrial-demo.mp4')

const logos = ref([
  { name: 'Acerolab', url: 'https://acerolab.com.co/wp-content/uploads/2022/10/LOGO-PNG-1024x865.png' },
  { name: 'Syse', url: 'https://syse.com.co/gallery_gen/8fb7ec8d3cc335f5a78a71a9e6ae8320_536x302_fit.png?ts=1721230543' },
  { name: 'Empresa 3', url: 'https://lh3.googleusercontent.com/p/AF1QipNeNZs4lyWrhMYvlsn3E9X9mKwMX0D01C2yx0LR=s680-w680-h510-rw' },
  { name: 'Empresa 4', url: 'https://static.wixstatic.com/media/faf501_c9442b642562417793e285b6939e5dd5~mv2_d_2084_1819_s_2.png/v1/fill/w_197,h_172,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/faf501_c9442b642562417793e285b6939e5dd5~mv2_d_2084_1819_s_2.png' },
])

const filledLogos = computed(() => {
  if (!logos.value.length) return []
  const times = Math.ceil(10 / logos.value.length)
  return Array.from({ length: times }, () => logos.value).flat()
})

onMounted(() => {
  requestAnimationFrame(() => (ready.value = true))
  setTimeout(() => (carouselReady.value = true), 200)
})
</script>
<style scoped>
.hero {
  --blue: #0071e3;
  --yellow: #fdda24;
  --bg: #ffffff;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  color: #0b1220;
  min-height: calc(100svh - 72px);
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: -20%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.10) 1px, transparent 1px);
  background-size: 72px 72px;
  transform: perspective(600px) rotateX(38deg) scale(1.6);
  transform-origin: center 30%;
  opacity: 0.55;
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 60%, rgba(0, 0, 0, 1) 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 90% 80% at 50% 60%, rgba(0, 0, 0, 1) 20%, transparent 75%);
}

.hero-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  padding: 12px 24px 96px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 650ms ease, transform 650ms ease;
}

.hero-wrap.ready {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: clamp(28px, 4.4vw, 56px);
  font-weight: 900;
  line-height: 1.10;
  letter-spacing: -1.2px;
  color: #0b1220;
  margin: 0 0 10px;
}

.dot {
  color: var(--yellow);
}

.hero-desc {
  font-size: clamp(13px, 1.4vw, 15px);
  line-height: 1.68;
  color: rgba(11, 18, 32, 0.50);
  max-width: 520px;
  margin: 0 0 20px;
}

.hero-ctas {
  display: flex;
  align-items: stretch;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-primary,
.cta-secondary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 14px;
  text-decoration: none;
  min-width: 220px;
  transition: transform 160ms, box-shadow 160ms, background 160ms, border-color 160ms;
}

.cta-primary {
  background: var(--blue);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.30);
}

.cta-primary:hover {
  background: #005fcd;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.38);
}

.cta-secondary {
  background: #fff;
  color: #0b1220;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.cta-secondary:hover {
  border-color: rgba(0, 113, 227, 0.35);
  background: rgba(0, 113, 227, 0.03);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.09);
}

.cta-texts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cta-main {
  font-size: 14px;
  font-weight: 900;
  line-height: 1.2;
}

.cta-sub {
  font-size: 11.5px;
  opacity: 0.70;
  line-height: 1.3;
  margin-top: 2px;
}

.video-block {
  width: 100%;
  margin-bottom: 20px;
}

.video-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(11, 18, 32, 0.10);
  box-shadow: 0 4px 16px rgba(11, 18, 32, 0.08), 0 20px 48px rgba(11, 18, 32, 0.12);
}

.video-iframe,
.video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 0;
}

.carousel-wrap {
  width: 100%;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 600ms ease, transform 600ms ease;
  transition-delay: 180ms;
  padding-bottom: 24px;
}

.carousel-wrap.carouselReady {
  opacity: 1;
  transform: translateY(0);
}

.carousel-label {
  text-align: center;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(11, 18, 32, 0.30);
  margin-bottom: 10px;
}

.track-outer {
  overflow: hidden;
  position: relative;
  padding: 6px 0;
}

.track-outer::before,
.track-outer::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.track-outer::before {
  left: 0;
  background: linear-gradient(90deg, var(--bg), transparent);
}

.track-outer::after {
  right: 0;
  background: linear-gradient(270deg, var(--bg), transparent);
}

.carousel-track {
  display: flex;
  align-items: center;
  gap: 56px;
  width: max-content;
  animation: scroll 18s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.logo-pill {
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 48px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  mix-blend-mode: multiply;
  opacity: 0.65;
  filter: grayscale(0.15);
  transition: opacity 220ms, filter 220ms, transform 220ms;
}

.logo-pill:hover .logo-img {
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .hero {
    min-height: calc(100svh - 64px);
  }

  .hero-wrap {
    padding: 10px 16px 60px;
  }

  .hero-ctas {
    gap: 8px;
  }

  .cta-primary,
  .cta-secondary {
    min-width: 160px;
    padding: 10px 16px;
  }

  .logo-img {
    height: 36px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }

  .hero-wrap,
  .carousel-wrap {
    transition: none;
  }
}
</style>
