<template>
  <div class="lmc-page">
    <div class="lmc-wrap">
      <MisCotizacionesLogistica />
      <p class="lmc-nota">
        <q-icon name="info" size="16px" />
        Aquí ves las cotizaciones hechas en este dispositivo y, si iniciaste sesión, las de tu cuenta. Cada cotización
        también te llega al correo con su enlace.
      </p>
    </div>
  </div>
</template>

<script setup>
import MisCotizacionesLogistica from '../../components/logistica/MisCotizacionesLogistica.vue'
</script>

<style scoped>
.lmc-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 28px 0 56px;
}

.lmc-wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.lmc-nota {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  margin: 14px 4px 0;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
}

@media (max-width: 640px) {
  .lmc-wrap {
    padding: 0 16px;
  }
}
</style>
