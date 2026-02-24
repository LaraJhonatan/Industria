<template>
  <q-page class="complete-page">
    <div class="main-sections">
      <VideoCarouselSection />
      <ServicesSection />
      <SectorsSection />
      <TestimonialsSection />
      <ContactFormSection />
      <FAQSection />
    </div>

    <!-- (Opcional) CTA para ir a Servicios industriales -->
    <!--
    <div class="divider-section">
      <div class="bs-wrap">
        <div class="divider-content">
          <h2 class="divider-title">
            ¿Quieres conocer más detalles
            <span>sobre nuestros servicios?</span>
          </h2>
          <p class="divider-text">
            Descubre cómo trabajamos, para quién son nuestras soluciones
            y nuestro proceso de implementación paso a paso.
          </p>

          <q-btn
            unelevated
            class="divider-btn"
            label="Ver servicios industriales"
            icon-right="arrow_forward"
            :to="{ path: '/servicios-industriales' }"
          />
        </div>
      </div>
    </div>
    -->
  </q-page>
</template>

<script setup>
import VideoCarouselSection from 'src/components/PageInicial/VideoCarouselSection.vue'
import ServicesSection from 'src/components/PageInicial/ServicesSection.vue'
import SectorsSection from 'src/components/PageInicial/SectorsSection.vue'
import TestimonialsSection from 'src/components/PageInicial/TestimonialsSection.vue'
import ContactFormSection from 'src/components/PageInicial/ContactFormSection.vue'
import FAQSection from 'src/components/PageInicial/FAQSection.vue'
</script>

<style scoped>
.bs-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.complete-page {
  padding: 0;
  min-height: 100vh;
  background: #1b1b1b;
}

/* Smooth scroll global */
:global(html) {
  scroll-behavior: smooth;
}

/* (Opcional) CTA */
.divider-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #0071e3 0%, #0066cc 100%);
  position: relative;
  overflow: hidden;
}

.divider-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}

.divider-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.divider-title {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #fff;
}

.divider-title span {
  display: block;
  color: #fff;
  opacity: 0.95;
}

.divider-text {
  margin: 24px auto 0;
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  max-width: 680px;
}

.divider-btn {
  margin-top: 32px;
  height: 56px;
  padding: 0 40px;
  border-radius: 14px;
  font-weight: 900;
  font-size: 17px;
  background: #ffffff;
  color: #0b1220;
  box-shadow: 0 20px 60px rgba(2, 6, 23, 0.20);
}

.divider-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .divider-section {
    padding: 80px 0;
  }
}
</style>
