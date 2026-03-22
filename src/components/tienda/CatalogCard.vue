<!-- ════════════════════════════════════════
     CatalogCard.vue
════════════════════════════════════════ -->
<template>
  <article class="catalog-card" :style="{ '--color': service.color }" @click="$emit('select')"
    @mouseenter="hovered = true" @mouseleave="hovered = false" tabindex="0" role="button"
    :aria-label="`Ver servicios de ${service.title}`" @keydown.enter="$emit('select')">
    <div class="card-icon" v-html="service.icon" />
    <div class="card-meta">
      <span class="card-kicker">{{ service.kicker }}</span>
      <h3 class="card-title">{{ service.title }}</h3>
    </div>
    <p class="card-count">{{ service.products.length }} ensayos / servicios disponibles</p>
    <div class="card-cta">
      Ver servicios
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ service: Object })
defineEmits(['select'])
const hovered = ref(false)
</script>

<style scoped>
.catalog-card {
  position: relative;
  border-radius: 18px;
  padding: 24px 20px;
  background: #fff;
  border: 1.5px solid rgba(27, 27, 27, 0.09);
  cursor: pointer;
  transition: all 250ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  outline: none;
}

.catalog-card:hover,
.catalog-card:focus-visible {
  border-color: var(--color);
  transform: translateY(-4px);
  box-shadow: 0 14px 40px color-mix(in srgb, var(--color) 15%, transparent);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--color) 10%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--color) 25%, transparent);
  display: grid;
  place-items: center;
  color: var(--color);
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-kicker {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--color);
}

.card-title {
  font-size: 15px;
  font-weight: 800;
  color: #1b1b1b;
  line-height: 1.3;
  margin: 0;
}

.card-count {
  font-size: 12.5px;
  color: rgba(27, 27, 27, 0.45);
  line-height: 1.4;
  margin: 0;
}

.card-cta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 800;
  color: var(--color);
  margin-top: auto;
}
</style>
