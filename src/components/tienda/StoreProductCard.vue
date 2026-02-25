<template>
  <article class="product-card" :style="{ '--color': service.color }" @click="$emit('view')"
    @mouseenter="hovered = true" @mouseleave="hovered = false">
    <!-- Image -->
    <div class="card-image-wrap">
      <img :src="product.images[0]" :alt="product.name" class="card-image" :class="{ zoomed: hovered }"
        loading="lazy" />
      <span class="category-badge">{{ service.kicker }}</span>
      <transition name="check-pop">
        <span v-if="inBudget" class="check-badge" aria-label="Ya en presupuesto">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </transition>
    </div>

    <!-- Body -->
    <div class="card-body">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.shortDesc }}</p>

      <div class="norm-tags">
        <span v-for="n in product.normativasOptions.slice(0, 2)" :key="n" class="norm-tag">{{ n }}</span>
      </div>

      <button class="add-btn" :class="{ added: inBudget }" @click.stop="handleAdd" :disabled="inBudget">
        <template v-if="inBudget">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Añadido al presupuesto
        </template>
        <template v-else>
          Añadir al presupuesto
        </template>
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useBudgetStore } from '../../stores/budget.js'

const props = defineProps({
  product: Object,
  service: Object,
  inBudget: Boolean,
})
defineEmits(['view'])

const hovered = ref(false)
const budgetStore = useBudgetStore()

async function handleAdd() {
  if (props.inBudget) return
  await budgetStore.addItem({
    productId: props.product.id,
    name: props.product.name,
    category: props.service.title,
    normativa: props.product.normativasOptions[0],
    qty: 1,
    image: props.product.images[0],
  })
}
</script>

<style scoped>
.product-card {
  border-radius: 18px;
  border: 1.5px solid rgba(27, 27, 27, 0.09);
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: all 240ms ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: color-mix(in srgb, var(--color) 55%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 14px 36px color-mix(in srgb, var(--color) 14%, transparent);
}

/* Image */
.card-image-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f0f2f5;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 400ms ease;
}

.card-image.zoomed {
  transform: scale(1.06);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--color);
  color: #fff;
  font-size: 10.5px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
}

.check-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #2ecc71;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
}

/* Body */
.card-body {
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 14px;
  font-weight: 800;
  color: #1b1b1b;
  line-height: 1.3;
  margin: 0 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-desc {
  font-size: 12.5px;
  color: rgba(27, 27, 27, 0.5);
  line-height: 1.5;
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.norm-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.norm-tag {
  background: rgba(27, 27, 27, 0.05);
  border: 1.5px solid rgba(27, 27, 27, 0.1);
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(27, 27, 27, 0.6);
  padding: 3px 8px;
}

.add-btn {
  width: 100%;
  height: 44px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  font-weight: 800;
  font-size: 13px;
  background: var(--color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 200ms ease;
  box-shadow: 0 4px 14px color-mix(in srgb, var(--color) 35%, transparent);
  margin-top: auto;
}

.add-btn.added {
  background: rgba(46, 204, 113, 0.12);
  color: #2ecc71;
  box-shadow: none;
  cursor: default;
}

.add-btn:not(.added):hover {
  filter: brightness(1.1);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--color) 45%, transparent);
}

/* Transitions */
.check-pop-enter-active {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.check-pop-leave-active {
  transition: all 160ms ease;
}

.check-pop-enter-from,
.check-pop-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
