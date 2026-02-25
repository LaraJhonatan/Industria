<template>
  <transition name="panel-slide">
    <div v-if="open" class="overlay" @click.self="$emit('close')">
      <aside class="panel" role="dialog" aria-label="Presupuesto">
        <!-- Header -->
        <div class="panel-header">
          <div>
            <p class="panel-kicker">Presupuesto</p>
            <h2 class="panel-title">
              {{ budgetStore.items.length }} servicio{{ budgetStore.items.length !== 1 ? 's' : '' }}
              seleccionado{{ budgetStore.items.length !== 1 ? 's' : '' }}
            </h2>
          </div>
          <button class="close-btn" @click="$emit('close')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="panel-body">
          <div v-if="budgetStore.items.length === 0" class="empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p class="empty-title">Tu presupuesto está vacío</p>
            <p class="empty-sub">Agrega servicios desde el catálogo para solicitar cotización.</p>
          </div>

          <transition-group name="item-slide" tag="div" class="items-list">
            <div v-for="item in budgetStore.items" :key="item.productId" class="budget-item">
              <img :src="item.image" :alt="item.name" class="item-img" />
              <div class="item-info">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-category">{{ item.category }}</p>
                <p class="item-detail">Normativa: {{ item.normativa }}</p>
                <p class="item-detail">Cantidad: {{ item.qty }}</p>
              </div>
              <button class="remove-btn" @click="budgetStore.removeItem(item.productId)" title="Eliminar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </transition-group>
        </div>

        <!-- Footer -->
        <div v-if="budgetStore.items.length > 0" class="panel-footer">
          <button class="submit-btn" @click="submitQuote">
            Solicitar cotización
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button class="clear-btn" @click="budgetStore.clearAll()">Limpiar todo</button>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { useBudgetStore } from '../../stores/budget.js'

defineProps({ open: Boolean })
defineEmits(['close'])
const budgetStore = useBudgetStore()

function submitQuote() {
  alert('¡Presupuesto enviado! Nuestro equipo técnico se pondrá en contacto contigo pronto.')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.panel {
  width: 420px;
  max-width: 100vw;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 24px 16px;
  border-bottom: 1.5px solid #f0f0f0;
  flex-shrink: 0;
}

.panel-kicker {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0071e3;
  margin: 0 0 4px;
}

.panel-title {
  font-size: 20px;
  font-weight: 900;
  color: #1b1b1b;
  margin: 0;
}

.close-btn {
  background: rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  color: #1b1b1b;
  transition: background 200ms ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.12);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: rgba(27, 27, 27, 0.4);
  text-align: center;
  padding: 60px 0;
}

.empty-title {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}

.empty-sub {
  font-size: 13px;
  max-width: 220px;
  margin: 0;
  line-height: 1.5;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.budget-item {
  background: #f7f8fb;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.item-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #1b1b1b;
  line-height: 1.3;
  margin: 0 0 4px;
}

.item-category {
  font-size: 11.5px;
  color: #0071e3;
  font-weight: 700;
  margin: 0 0 2px;
}

.item-detail {
  font-size: 11.5px;
  color: rgba(27, 27, 27, 0.5);
  margin: 0 0 1px;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #c62828;
  padding: 4px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: background 180ms ease;
}

.remove-btn:hover {
  background: rgba(198, 40, 40, 0.08);
}

.panel-footer {
  padding: 16px 24px;
  border-top: 1.5px solid #f0f0f0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.submit-btn {
  width: 100%;
  height: 52px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.3);
  transition: background 220ms ease;
}

.submit-btn:hover {
  background: #0062c8;
}

.clear-btn {
  width: 100%;
  height: 40px;
  background: transparent;
  color: rgba(27, 27, 27, 0.5);
  border: 1.5px solid rgba(27, 27, 27, 0.12);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 200ms ease;
}

.clear-btn:hover {
  border-color: #c62828;
  color: #c62828;
}

/* Transitions */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 260ms ease;
}

.panel-slide-enter-active .panel,
.panel-slide-leave-active .panel {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
}

.panel-slide-enter-from .panel,
.panel-slide-leave-to .panel {
  transform: translateX(100%);
}

.item-slide-enter-active {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.item-slide-leave-active {
  transition: all 200ms ease;
}

.item-slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.item-slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
