<template>
  <nav class="top-nav" aria-label="Navegación principal">
    <div class="nav-inner">
      <!-- Brand -->
      <button class="brand" @click="routerStore.goToCatalog()">
        <div class="brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <span class="brand-name">LabServ</span>
        <span class="brand-sub">Servicios de ingeniería</span>
      </button>

      <!-- Budget button -->
      <button class="budget-btn" :class="{ active: budgetStore.items.length > 0 }" @click="$emit('openBudget')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span>Presupuesto</span>
        <transition name="badge-pop">
          <span v-if="budgetStore.items.length > 0" class="badge">{{ budgetStore.items.length }}</span>
        </transition>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouterStore } from '../../stores/router.js'
import { useBudgetStore } from '../../stores/budget.js'

defineEmits(['openBudget'])
const routerStore = useRouterStore()
const budgetStore = useBudgetStore()
</script>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1.5px solid rgba(27, 27, 27, 0.08);
  height: 64px;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: #0071e3;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.brand-name {
  font-size: 17px;
  font-weight: 900;
  color: #1b1b1b;
  letter-spacing: -0.5px;
}

.brand-sub {
  font-size: 12px;
  color: rgba(27, 27, 27, 0.4);
  font-weight: 600;
}

.budget-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 113, 227, 0.07);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  border-radius: 12px;
  padding: 8px 18px;
  cursor: pointer;
  color: #0071e3;
  font-size: 13px;
  font-weight: 800;
  transition: all 220ms ease;
}

.budget-btn.active {
  background: #0071e3;
  color: #fff;
  border-color: #0071e3;
}

.badge {
  background: #fdda24;
  color: #1b1b1b;
  border-radius: 999px;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 900;
}

.badge-pop-enter-active,
.badge-pop-leave-active {
  transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.badge-pop-enter-from,
.badge-pop-leave-to {
  transform: scale(0);
  opacity: 0;
}

@media (max-width: 480px) {
  .brand-sub {
    display: none;
  }

  .nav-inner {
    padding: 0 16px;
  }
}
</style>
