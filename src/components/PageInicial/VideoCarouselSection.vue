<template>
  <section class="video-carousel-section" aria-label="Video y marcas">
    <div class="section-bg" aria-hidden="true"></div>

    <div class="bs-wrap">
      <header class="hero-copy" :class="{ ready }">
        <div class="overlay-subtitle">SERVICIOS INDUSTRIALES INTEGRALES</div>

        <h2 class="overlay-title">
          Importamos maquinaria.<br />
          Diseñamos soluciones.<br />
          Ejecutamos servicios<span class="dot">.</span>
        </h2>

        <p class="overlay-description">
          Integración real con criterio técnico y enfoque estratégico
        </p>

        <div class="accent-line" aria-hidden="true"></div>
      </header>

      <div class="hero-media" :class="{ ready }">
        <div class="video-wrapper">
          <iframe v-if="useYouTube" class="video-iframe" :src="youtubeEmbedUrl" title="Video de presentación"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>

          <video v-else class="video" :src="videoSrc" controls playsinline>
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      <div class="carousel-container" :class="{ ready: carouselReady }">
        <div class="carousel-title">MARCAS CON LAS QUE TRABAJAMOS</div>

        <div class="carousel-track-wrapper">
          <div class="carousel-track" ref="track">
            <div v-for="(marca, idx) in marcas" :key="`set1-${idx}`" class="marca-item">
              <span class="marca-text">{{ marca }}</span>
            </div>

            <div v-for="(marca, idx) in marcas" :key="`set2-${idx}`" class="marca-item">
              <span class="marca-text">{{ marca }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ready = ref(false)
const carouselReady = ref(false)

const useYouTube = ref(true)
const youtubeVideoId = ref('46IkWDtKXC8')

const youtubeEmbedUrl = ref(
  `https://www.youtube.com/embed/${youtubeVideoId.value}` +
  `?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&modestbranding=1`
)

const videoSrc = ref('/videos/industrial-demo.mp4')

const marcas = ref([
  'Ecopetrol',
  'Argos',
  'Bavaria',
  'Bancolombia',
  'Tecnoglass',
  'Corona',
  'Nutresa',
  'ISA'
])

onMounted(() => {
  requestAnimationFrame(() => (ready.value = true))
  setTimeout(() => (carouselReady.value = true), 250)
})
</script>

<style scoped>
.bs-wrap {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.video-carousel-section {
  --bg: #ffffff;
  --panel: #0b0b0b;
  --blue: #0071e3;
  --yellow: #fdda24;

  position: relative;
  overflow: hidden;
  color: #0b0b0b;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 70px 0 60px;
  background: var(--bg);
}

.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* PARED */
.section-bg::before {
  content: '';
  position: absolute;
  inset: -12%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.10) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.06) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 2px, transparent 2px);
  background-size:
    80px 80px,
    80px 80px,
    400px 400px,
    400px 400px;
  background-position: center top;
  opacity: 0.65;
  transform-origin: center top;
  transform: perspective(1100px) rotateX(10deg) skewX(-10deg);
  mix-blend-mode: multiply;

  -webkit-mask-image: radial-gradient(ellipse at 50% 18%,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.75) 55%,
      transparent 88%);
  mask-image: radial-gradient(ellipse at 50% 18%,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.75) 55%,
      transparent 88%);
}

/* PISO */
.section-bg::after {
  content: '';
  position: absolute;
  left: -55%;
  right: -55%;
  bottom: -58%;
  height: 160%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.14) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.08) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.08) 2px, transparent 2px);
  background-size:
    80px 80px,
    80px 80px,
    400px 400px,
    400px 400px;
  background-position: center bottom;
  opacity: 0.75;
  transform-origin: center bottom;
  transform: perspective(900px) rotateX(72deg);
  mix-blend-mode: multiply;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.08));

  -webkit-mask-image: linear-gradient(to top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.9) 35%,
      rgba(0, 0, 0, 0.55) 60%,
      transparent 88%);
  mask-image: linear-gradient(to top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.9) 35%,
      rgba(0, 0, 0, 0.55) 60%,
      transparent 88%);
}

/* ===== TEXTO ===== */
.hero-copy {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 22px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.hero-copy.ready {
  opacity: 1;
  transform: translateY(0);
}

.overlay-subtitle {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
  margin-bottom: 12px;
}

.overlay-title {
  font-size: clamp(30px, 4.2vw, 50px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -1.4px;
  margin: 0 0 12px;
  color: #0b0b0b;
}

.dot {
  color: var(--yellow);
}

.overlay-description {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.68);
  max-width: 620px;
  margin: 0 auto;
}

.accent-line {
  margin: 18px auto 0;
  height: 2px;
  width: 190px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--blue), var(--yellow));
}

/* ===== VIDEO ===== */
.hero-media {
  position: relative;
  z-index: 2;
  margin: 18px auto 26px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.hero-media.ready {
  opacity: 1;
  transform: translateY(0);
}

.video-wrapper {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  border-radius: 22px;
  overflow: hidden;
  background: var(--panel);
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.20);
}

.video-iframe,
.video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 0;
}

/* ===== CARRUSEL ===== */
.carousel-container {
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 700ms ease, transform 700ms ease;
  transition-delay: 140ms;
}

.carousel-container.ready {
  opacity: 1;
  transform: translateY(0);
}

.carousel-title {
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
  margin-bottom: 18px;
}

.carousel-hint {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.52);
}

.carousel-track-wrapper {
  overflow: hidden;
  position: relative;
  padding: 18px 0;
}

.carousel-track-wrapper::before,
.carousel-track-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.carousel-track-wrapper::before {
  left: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.carousel-track-wrapper::after {
  right: 0;
  background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.carousel-track {
  display: flex;
  gap: 56px;
  width: fit-content;
  will-change: transform;
  animation: scroll 26s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.carousel-track:hover {
  animation-play-state: paused;
}

/* ✅ SLIDES ARREGLADOS: YA NO NEGROS */
.marca-item {
  position: relative;
  flex-shrink: 0;
  min-width: 168px;
  height: 60px;
  display: grid;
  place-items: center;
  padding: 14px 22px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.marca-item::before {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  height: 2px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.10);
  transition: background 0.22s ease;
}

.marca-text {
  font-size: 14px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.75);
  white-space: nowrap;
  transition: color 0.22s ease;
}

.marca-item:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 113, 227, 0.40);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.12);
}

.marca-item:hover::before {
  background: linear-gradient(90deg, var(--blue), var(--yellow));
}

.marca-item:hover .marca-text {
  color: var(--blue);
}

@media (max-width: 768px) {
  .video-carousel-section {
    padding: 54px 0 48px;
  }

  .carousel-track {
    gap: 40px;
  }

  .marca-item {
    min-width: 148px;
    height: 56px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }

  .hero-copy,
  .hero-media,
  .carousel-container {
    transition: none;
  }
}
</style>
