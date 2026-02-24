<template>
  <q-page class="services-page">
    <div class="services-detailed">
      <WhatWeDoSection />
      <SectionQueHacemos />
      <SectionParaQuien />
      <SectionComoFunciona />
      <SectionContancto />
    </div>
  </q-page>
</template>

<script setup>
import WhatWeDoSection from 'src/components/Ingenieria/WhatWeDoSection_Ingenieria.vue'
import SectionQueHacemos from 'src/components/Ingenieria/SectionQueHacemos_Ingenieria.vue'
import SectionParaQuien from 'src/components/Ingenieria/SectionParaQuien_Ingenieria.vue'
import SectionComoFunciona from 'src/components/Ingenieria/SectionComoFunciona_Ingenieria.vue'
import SectionContancto from 'src/components/Ingenieria/SectionContancto.vue'
</script>

<style scoped>
.services-page {
  padding: 0;
  min-height: 100vh;
  background: #fff;
}

.services-detailed {
  scroll-margin-top: 96px;
}
</style>
