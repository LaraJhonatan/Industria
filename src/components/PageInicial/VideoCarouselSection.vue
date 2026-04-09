<template>
  <section class="hero" aria-label="Hero principal">

    <!-- Fondo con cuadrícula sutil -->
    <div class="hero-bg" aria-hidden="true">
      <div class="grid-overlay" />
    </div>

    <div class="hero-wrap" :class="{ ready }">

      <!-- ① TÍTULO -->
      <h1 class="hero-title">
        Importamos maquinaria.<br />
        Diseñamos soluciones.<br />
        Ejecutamos servicios<span class="dot">.</span>
      </h1>

      <!-- ② DESCRIPCIÓN -->
      <p class="hero-desc">
        Integración real con criterio técnico y enfoque estratégico.
        Soluciones industriales a medida para empresas que exigen resultados.
      </p>

      <!-- ③ VIDEO -->
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

      <!-- ④ CARRUSEL DE LOGOS -->
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
])

// Repite logos hasta tener al menos 10 ítems — carrusel siempre lleno
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
/* ══ Sección ═════════════════════════════════════ */
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

/* ══ Fondo — cuadrícula sutil igual a la anterior ═ */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: -12%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.04) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 2px, transparent 2px);
  background-size:
    80px 80px,
    80px 80px,
    400px 400px,
    400px 400px;
  opacity: 0.65;
  -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%,
      rgba(0, 0, 0, 1) 30%, transparent 80%);
  mask-image: radial-gradient(ellipse 85% 85% at 50% 50%,
      rgba(0, 0, 0, 1) 30%, transparent 80%);
}

/* ══ Contenido ═══════════════════════════════════ */
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
  padding: 12px 24px 16px;
  /* mínimo espacio arriba */

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 650ms ease, transform 650ms ease;
}

.hero-wrap.ready {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Título ══════════════════════════════════════ */
.hero-title {
  font-size: clamp(28px, 4.4vw, 56px);
  font-weight: 900;
  line-height: 1.10;
  letter-spacing: -1.2px;
  color: #0b1220;
  margin: 0 0 10px;
}

.dot {
  color: var(--yellow)
}

/* ══ Descripción ═════════════════════════════════ */
.hero-desc {
  font-size: clamp(13px, 1.4vw, 15px);
  line-height: 1.68;
  color: rgba(11, 18, 32, 0.50);
  max-width: 520px;
  margin: 0 0 14px;
}

/* ══ Video — más grande ══════════════════════════ */
.video-block {
  width: 100%;
  margin-bottom: 12px;
}

.video-wrapper {
  width: 100%;
  max-width: 880px;
  /* más ancho que antes */
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(11, 18, 32, 0.10);
  box-shadow:
    0 4px 16px rgba(11, 18, 32, 0.08),
    0 20px 48px rgba(11, 18, 32, 0.12);
}

.video-iframe,
.video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 0;
}

/* ══ Carrusel ════════════════════════════════════ */
.carousel-wrap {
  width: 100%;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 600ms ease, transform 600ms ease;
  transition-delay: 180ms;
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
  justify-content: center;
  gap: 56px;
  width: max-content;
  animation: scroll 18s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused
}

@keyframes scroll {
  0% {
    transform: translateX(0)
  }

  100% {
    transform: translateX(-50%)
  }
}

/* ── Logo ─────────────────────────────────────── */
.logo-pill {
  flex-shrink: 0;
  height: 56px;
  /* más alto que antes */
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 48px;
  /* logos más grandes */
  width: auto;
  max-width: 160px;
  object-fit: contain;

  /* Elimina fondo blanco de PNGs sobre fondo blanco */
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

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 768px) {
  .hero {
    min-height: calc(100svh - 64px);
  }

  .hero-wrap {
    padding: 10px 16px 14px;
  }

  .logo-img {
    height: 36px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none
  }

  .hero-wrap,
  .carousel-wrap {
    transition: none
  }
}
</style>
