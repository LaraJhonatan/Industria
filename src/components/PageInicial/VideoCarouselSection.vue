<template>
  <section class="hero" aria-label="Hero principal">
    <div class="hero-bg" aria-hidden="true">
      <div class="grid-overlay" />
    </div>

    <div class="hero-wrap" :class="{ ready }">

      <h1 class="hero-title">
        Conectamos empresas.<br />
        Hacemos que <span class="accent">vendas más</span><span class="dot">.</span>
      </h1>

      <div class="hero-ctas">
        <router-link to="/tienda" class="cta-primary">
          <div class="cta-icon-wrap cta-icon-wrap--primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div class="cta-texts">
            <span class="cta-main">Explorar tienda</span>
            <span class="cta-sub">Encuentra proveedores industriales en minutos.</span>
          </div>
          <svg class="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>

        <router-link to="/auth?mode=registro-empresa" class="cta-secondary">
          <div class="cta-icon-wrap cta-icon-wrap--secondary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div class="cta-texts">
            <span class="cta-main">Vender en ZIFCOR</span>
            <span class="cta-sub">Regístrate gratis y empieza a vender hoy.</span>
          </div>
          <svg class="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <div class="search-block">
        <div class="search-bar" :class="{ focused: searchFocused }">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchQuery" class="search-input" type="text"
            placeholder="¿Qué estás buscando? Ej: Drones, Baterías, Acero, Café..." @focus="searchFocused = true"
            @blur="searchFocused = false" @keydown.enter="goToSearch" />
          <button class="search-img-btn" title="Buscar por imagen (próximamente)" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span class="img-tooltip">Próximamente</span>
          </button>
          <button class="search-btn" @click="goToSearch">Buscar</button>
        </div>
      </div>

      <div class="video-block">
        <div class="video-wrapper">
          <iframe v-if="useYouTube" class="video-iframe" :src="youtubeEmbedUrl" title="Video de presentación ZIFCOR"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
          <video v-else class="video" :src="videoSrc" controls playsinline>
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

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
import { useRouter } from 'vue-router'

const router = useRouter()

const ready = ref(false)
const carouselReady = ref(false)
const useYouTube = ref(true)
const youtubeVideoId = ref('46IkWDtKXC8')
const youtubeEmbedUrl = ref(
  `https://www.youtube.com/embed/${youtubeVideoId.value}?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&modestbranding=1`
)
const videoSrc = ref('/videos/industrial-demo.mp4')
const searchQuery = ref('')
const searchFocused = ref(false)

function goToSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ path: '/tienda/buscar', query: { q } })
}

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
  --nav-h: 104px;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  color: #0b1220;
  height: calc(100svh - var(--nav-h));
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
    linear-gradient(rgba(0, 0, 0, .10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, .10) 1px, transparent 1px);
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
  max-width: 1280px;
  padding: clamp(28px, 4svh, 56px) 40px clamp(16px, 2.5svh, 32px);
  height: 100%;
  justify-content: flex-start;
  gap: clamp(14px, 2svh, 26px);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 650ms ease, transform 650ms ease;
}

.hero-wrap.ready {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: clamp(28px, 4.4svh, 58px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -1.5px;
  color: #0b1220;
  margin: 0;
}

.accent {
  color: var(--blue);
}

.dot {
  color: var(--yellow);
}

.hero-ctas {
  display: flex;
  align-items: stretch;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.cta-primary,
.cta-secondary {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 20px;
  border-radius: 16px;
  text-decoration: none;
  width: 310px;
  flex: none;
  transition: transform 160ms, box-shadow 160ms, background 160ms, border-color 160ms;
}

.cta-primary {
  background: var(--blue);
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 113, 227, .30);
}

.cta-primary:hover {
  background: #005fcd;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 113, 227, .38);
}

.cta-secondary {
  background: #0b1220;
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, .10);
  box-shadow: 0 2px 10px rgba(0, 0, 0, .20);
}

.cta-secondary:hover {
  border-color: rgba(255, 255, 255, .20);
  background: #1a2540;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, .25);
}

.cta-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  flex-shrink: 0;
}

.cta-icon-wrap--primary {
  background: rgba(255, 255, 255, .18);
  color: #fff;
}

.cta-icon-wrap--secondary {
  background: rgba(255, 255, 255, .10);
  color: #fff;
}

.cta-texts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.cta-main {
  font-size: 14px;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
}

.cta-sub {
  font-size: 11px;
  opacity: .72;
  line-height: 1.3;
  margin-top: 2px;
  text-align: left;
}

.cta-arrow {
  flex-shrink: 0;
  opacity: .6;
}

.cta-primary .cta-arrow {
  opacity: .85;
}

.search-block {
  width: 100%;
  max-width: 760px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid var(--blue);
  border-radius: 14px;
  padding: 6px 6px 6px 16px;
  gap: 10px;
  transition: box-shadow 200ms;
}

.search-bar.focused {
  box-shadow: 0 0 0 5px rgba(0, 113, 227, .18);
}

.search-icon {
  flex-shrink: 0;
  color: rgba(11, 18, 32, .40);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #0b1220;
  background: transparent;
  min-width: 0;
}

.search-input::placeholder {
  color: rgba(11, 18, 32, .40);
}

.search-img-btn {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 999px;
  background: rgba(11, 18, 32, .06);
  color: rgba(11, 18, 32, .35);
  cursor: not-allowed;
}

.search-img-btn:hover .img-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.img-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #0b1220;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms, transform 180ms;
}

.img-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #0b1220;
}

.search-btn {
  flex-shrink: 0;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 160ms, transform 160ms, box-shadow 160ms;
}

.search-btn:hover {
  background: #005fcd;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 113, 227, .32);
}

.video-block {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.video-wrapper {
  width: 100%;
  max-width: 680px;
  height: 100%;
  max-height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(11, 18, 32, .10);
  box-shadow: 0 4px 16px rgba(11, 18, 32, .08), 0 16px 40px rgba(11, 18, 32, .12);
  aspect-ratio: 4/3;
}

.video-iframe,
.video {
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
  border: 0;
}

.video-iframe {
  transform: scale(1.06);
}

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
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(11, 18, 32, .28);
  margin-bottom: 8px;
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
  width: 90px;
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
  animation: scroll 22s linear infinite;
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
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 44px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  mix-blend-mode: multiply;
  opacity: .65;
  filter: grayscale(.15);
  transition: opacity 220ms, filter 220ms, transform 220ms;
}

.logo-pill:hover .logo-img {
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .hero {
    --nav-h: 64px;
  }

  .hero-wrap {
    padding: clamp(12px, 1.5svh, 24px) 40px clamp(12px, 1.5svh, 20px);
    gap: clamp(10px, 1.4svh, 18px);
  }

  .hero-ctas {
    flex-wrap: wrap;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 360px;
    padding: 11px 14px;
  }

  .cta-icon-wrap {
    width: 36px;
    height: 36px;
  }

  .logo-pill {
    height: 44px;
  }

  .logo-img {
    height: 36px;
    max-width: 120px;
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
