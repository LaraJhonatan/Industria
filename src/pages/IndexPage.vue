<template>
  <q-page class="complete-page">
    <div class="main-sections">
      <VideoCarouselSection />
      <ServicesSection />
      <SectorsSection />
      <TestimonialsSection />
      <div id="contacto" class="scroll-anchor">
        <ContactFormSection />
      </div>
      <div id="preguntas-frecuentes">
        <FAQSection />
      </div>
    </div>
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

.scroll-anchor {
  scroll-margin-top: 110px;
}

.complete-page {
  padding: 0;
  min-height: 100vh;
  background: #1b1b1b;
}

:global(html) {
  scroll-behavior: smooth;
}
</style>
