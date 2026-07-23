<template>
  <q-page class="services-page">
    <div class="services-detailed">
      <WhatWeDoSection />
      <SectionProceso />

    </div>
  </q-page>
</template>

<script setup>
import WhatWeDoSection from 'src/components/ServiciosIndustriales/WhatWeDoSection.vue'
import SectionProceso from 'src/components/ServiciosIndustriales/SectionProceso.vue'

</script>

<style scoped>
.services-page {
  padding: 0;
  min-height: 100vh;
  background: #1b1b1b;

}

.services-detailed {
  scroll-margin-top: 96px;
}
</style>
