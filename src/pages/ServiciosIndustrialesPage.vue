<template>
  <q-page class="services-page">
    <div class="services-detailed">
      <WhatWeDoSection />
      <SectionParaQuien />
      <SectionProceso />
      <SectionContancto />
    </div>
  </q-page>
</template>

<script setup>
import WhatWeDoSection from 'src/components/ServiciosIndustriales/WhatWeDoSection.vue'
import SectionParaQuien from 'src/components/ServiciosIndustriales/SectionParaQuien.vue'
import SectionProceso from 'src/components/ServiciosIndustriales/SectionProceso.vue'
import SectionContancto from 'src/components/ServiciosIndustriales/SectionContancto.vue'
</script>

<style scoped>
.services-page {
  padding: 0;
  min-height: 100vh;
  background: #1b1b1b;
  /* o blanco si querés esta página clara */
}

/* Si tenés header fijo, esto ayuda cuando uses anchors */
.services-detailed {
  scroll-margin-top: 96px;
}
</style>
