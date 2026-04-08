<template>
  <section class="hero" aria-label="Hero principal">

    <!-- Fondo -->
    <div class="hero-bg" aria-hidden="true">
      <div class="glow glow-left" />
      <div class="glow glow-right" />
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
        Integración real con criterio técnico y enfoque estratégico.<br />
        Soluciones industriales a medida para empresas que exigen resultados.
      </p>

      <!-- ③ CTA + SOCIAL PROOF -->
      <div class="hero-actions">
        <a class="cta-btn" href="#contacto">
          Cotiza tu proyecto
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <div class="social-proof">
          <div class="avatars">
            <div class="av av1">EC</div>
            <div class="av av2">AR</div>
            <div class="av av3">BA</div>
            <div class="av av4">NU</div>
          </div>
          <span class="proof-text">Confiado por <strong>+30 empresas</strong></span>
        </div>
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

      <!-- ⑤ CARRUSEL -->
      <div class="carousel-wrap" :class="{ carouselReady }">
        <div class="carousel-label">MARCAS CON LAS QUE TRABAJAMOS</div>
        <div class="track-outer">
          <div class="carousel-track">
            <div v-for="(marca, idx) in marcas" :key="`a-${idx}`" class="marca-pill">
              <span>{{ marca }}</span>
            </div>
            <div v-for="(marca, idx) in marcas" :key="`b-${idx}`" class="marca-pill">
              <span>{{ marca }}</span>
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
  'Ecopetrol', 'Argos', 'Bavaria', 'Bancolombia',
  'Tecnoglass', 'Corona', 'Nutresa', 'ISA'
])

onMounted(() => {
  requestAnimationFrame(() => (ready.value = true))
  setTimeout(() => (carouselReady.value = true), 200)
})
</script>

<style scoped>
/* ══ Sección — ocupa exactamente la pantalla ═════ */
.hero {
  --blue: #0071e3;
  --yellow: #fdda24;
  --bg: #07090f;

  position: relative;
  overflow: hidden;
  background: var(--bg);
  color: #fff;
  min-height: calc(100svh - 72px);
  /* descuenta el navbar */
  display: flex;
  align-items: center;
}

/* ══ Fondo ═══════════════════════════════════════ */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.24;
}

.glow-left {
  width: 600px;
  height: 600px;
  background: #0055c4;
  top: -120px;
  left: -180px;
}

.glow-right {
  width: 460px;
  height: 460px;
  background: #0044aa;
  top: -60px;
  right: -160px;
  opacity: 0.13;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.033) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.033) 1px, transparent 1px);
  background-size: 60px 60px;
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 28%,
      black 30%, transparent 80%);
  mask-image: radial-gradient(ellipse 90% 80% at 50% 28%,
      black 30%, transparent 80%);
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
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 24px 24px;
  /* muy compacto */

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
  font-size: clamp(26px, 4.2vw, 54px);
  font-weight: 900;
  line-height: 1.10;
  letter-spacing: -1.2px;
  color: #ffffff;
  margin: 0 0 12px;
}

.dot {
  color: var(--yellow)
}

/* ══ Descripción ═════════════════════════════════ */
.hero-desc {
  font-size: clamp(13px, 1.4vw, 15px);
  line-height: 1.68;
  color: rgba(255, 255, 255, 0.44);
  max-width: 520px;
  margin: 0 0 20px;
}

/* ══ Acciones ════════════════════════════════════ */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 46px;
  padding: 0 24px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0;
  box-shadow:
    0 4px 18px rgba(0, 113, 227, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: background 180ms, transform 180ms, box-shadow 180ms;
}

.cta-btn:hover {
  background: #005fcd;
  transform: translateY(-2px);
  box-shadow:
    0 8px 28px rgba(0, 113, 227, 0.58),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.cta-btn svg {
  flex-shrink: 0;
  transition: transform 200ms;
}

.cta-btn:hover svg {
  transform: translateX(3px)
}

.social-proof {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatars {
  display: flex
}

.av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 900;
  border: 2px solid var(--bg);
  margin-left: -9px;
  flex-shrink: 0;
}

.av:first-child {
  margin-left: 0
}

.av1 {
  background: #0071e3;
  color: #fff
}

.av2 {
  background: #fdda24;
  color: #0b1220
}

.av3 {
  background: #22c55e;
  color: #fff
}

.av4 {
  background: #f97316;
  color: #fff
}

.proof-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.42);
  white-space: nowrap;
}

.proof-text strong {
  color: rgba(255, 255, 255, 0.72);
  font-weight: 700;
}

/* ══ Video ═══════════════════════════════════════ */
.video-block {
  width: 100%;
  margin-bottom: 16px;
}

.video-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 20px 55px rgba(0, 0, 0, 0.65),
    0 40px 90px rgba(0, 0, 0, 0.45);
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
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.20);
  margin-bottom: 10px;
}

.track-outer {
  overflow: hidden;
  position: relative;
  padding: 4px 0;
}

.track-outer::before,
.track-outer::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 70px;
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
  gap: 8px;
  width: max-content;
  animation: scroll 24s linear infinite;
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

.marca-pill {
  flex-shrink: 0;
  min-width: 120px;
  height: 36px;
  display: grid;
  place-items: center;
  padding: 0 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 200ms, border-color 200ms, transform 200ms;
}

.marca-pill:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(0, 113, 227, 0.44);
  transform: translateY(-2px);
}

.marca-pill span {
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.46);
  white-space: nowrap;
  transition: color 200ms;
}

.marca-pill:hover span {
  color: #fff
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 768px) {
  .hero {
    min-height: calc(100svh - 64px);
  }

  .hero-wrap {
    padding: 24px 16px 20px;
  }

  .hero-actions {
    flex-direction: column;
    gap: 14px;
  }

  .glow-left {
    width: 300px;
    height: 300px;
    left: -100px
  }

  .glow-right {
    display: none
  }

  .marca-pill {
    min-width: 105px;
    height: 34px
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
