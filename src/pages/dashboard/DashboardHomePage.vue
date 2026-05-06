<template>
  <q-page class="q-pa-lg">

    <!-- Saludo -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Bienvenido, {{ empresaNombre }}</h1>
        <p class="page-sub">Aquí tienes un resumen de tu actividad hoy</p>
      </div>
      <q-btn unelevated label="Nuevo producto" icon="add" color="blue-6" class="action-btn"
        @click="router.push('/dashboard/productos/nuevo')" />
    </div>

    <!-- Métricas -->
    <div class="metrics-grid q-mb-lg">
      <div v-for="m in metrics" :key="m.label" class="metric-card">
        <div class="metric-icon-wrap" :style="{ background: m.bg }">
          <q-icon :name="m.icon" size="22px" :color="m.color" />
        </div>
        <div class="metric-info">
          <div class="metric-value">{{ m.value }}</div>
          <div class="metric-label">{{ m.label }}</div>
        </div>
        <div class="metric-trend" :class="m.up ? 'trend-up' : 'trend-down'">
          <q-icon :name="m.up ? 'arrow_upward' : 'arrow_downward'" size="12px" />
          {{ m.trend }}
        </div>
      </div>
    </div>

    <!-- Accesos rápidos + estado productos -->
    <div class="dash-grid">

      <!-- Accesos rápidos -->
      <div class="dash-card">
        <div class="card-header q-mb-md">
          <span class="card-title">Accesos rápidos</span>
        </div>
        <div class="quick-grid">
          <div v-for="q in quickActions" :key="q.label" class="quick-item" @click="router.push(q.path)">
            <div class="quick-icon" :style="{ background: q.bg }">
              <q-icon :name="q.icon" size="20px" :color="q.color" />
            </div>
            <span class="quick-label">{{ q.label }}</span>
          </div>
        </div>
      </div>

      <!-- Productos recientes -->
      <div class="dash-card">
        <div class="card-header q-mb-md row items-center justify-between">
          <span class="card-title">Productos recientes</span>
          <q-btn flat dense label="Ver todos" color="blue-6" size="sm" @click="router.push('/dashboard/productos')" />
        </div>

        <div v-if="productStore.loading" class="column items-center q-py-lg">
          <q-spinner color="blue-6" size="28px" />
        </div>

        <div v-else-if="!productStore.products.length" class="empty-state column items-center q-py-lg">
          <q-icon name="inventory_2" size="40px" color="grey-4" />
          <p class="empty-text q-mt-sm">Aún no tienes productos</p>
          <q-btn unelevated label="Crear producto" color="blue-6" size="sm" class="action-btn q-mt-sm"
            @click="router.push('/dashboard/productos/nuevo')" />
        </div>

        <q-list v-else separator>
          <q-item v-for="p in productStore.products.slice(0, 5)" :key="p.id" class="product-item" clickable
            @click="router.push(`/dashboard/productos/${p.id}`)">
            <q-item-section avatar>
              <q-avatar rounded size="40px" color="grey-2">
                <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" />
                <q-icon v-else name="inventory_2" color="grey-5" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="product-name">{{ p.nombre }}</q-item-label>
              <q-item-label caption>{{ p.category?.nombre }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip dense :color="statusColor(p.estado)" text-color="white" style="font-size:10px;height:20px">
                {{ statusLabel(p.estado) }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

    </div>

  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth-store'
import { useProductStore } from '../../stores/product-store'
import { useCompanyStore } from '../../stores/company-store'

const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()
const companyStore = useCompanyStore()

const empresaNombre = computed(() => {
  return authStore.empresa?.razonSocial || companyStore.perfil?.empresa?.razonSocial || 'tu empresa'
})

const metrics = [
  { label: 'Productos activos', value: '—', icon: 'inventory_2', color: 'blue-6', bg: 'rgba(0,113,227,.08)', trend: '+2 este mes', up: true },
  { label: 'Visitas al perfil', value: '—', icon: 'visibility', color: 'green-6', bg: 'rgba(34,197,94,.08)', trend: '+12%', up: true },
  { label: 'Pedidos recibidos', value: '—', icon: 'receipt_long', color: 'orange-6', bg: 'rgba(251,146,60,.08)', trend: 'Este mes', up: true },
  { label: 'Cotizaciones', value: '—', icon: 'request_quote', color: 'purple-6', bg: 'rgba(147,51,234,.08)', trend: 'Pendientes', up: false },
]

const quickActions = [
  { label: 'Nuevo producto', icon: 'add_circle', color: 'blue-6', bg: 'rgba(0,113,227,.08)', path: '/dashboard/productos/nuevo' },
  { label: 'Mi tienda', icon: 'storefront', color: 'green-6', bg: 'rgba(34,197,94,.08)', path: '/dashboard/tienda' },
  { label: 'Pedidos', icon: 'receipt_long', color: 'orange-6', bg: 'rgba(251,146,60,.08)', path: '/dashboard/pedidos' },
  { label: 'Perfil empresa', icon: 'business', color: 'purple-6', bg: 'rgba(147,51,234,.08)', path: '/dashboard/perfil' },
]

function statusColor(estado) {
  return { draft: 'grey-5', published: 'green-6', paused: 'orange-5', archived: 'red-4' }[estado] || 'grey-5'
}

function statusLabel(estado) {
  return { draft: 'Borrador', published: 'Publicado', paused: 'Pausado', archived: 'Archivado' }[estado] || estado
}

onMounted(async () => {
  if (!companyStore.perfil) await companyStore.fetchPerfil()
  await productStore.fetchAll({ limit: 5 })
})
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  margin: 0;
}

.page-sub {
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  margin: 0;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.metric-card {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 4px rgba(11, 18, 32, .04);
}

.metric-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-value {
  font-size: 26px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
}

.metric-label {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
  font-weight: 600;
}

.metric-trend {
  font-size: 11.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
}

.trend-up {
  color: #16a34a;
}

.trend-down {
  color: #dc2626;
}

.dash-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 16px;
}

.dash-card {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(11, 18, 32, .04);
}

.card-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
}

.quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border-radius: 12px;
  border: 1.5px solid rgba(11, 18, 32, .08);
  cursor: pointer;
  transition: all 160ms;
  text-align: center;
}

.quick-item:hover {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .03);
}

.quick-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-label {
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .65);
}

.product-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
}

.empty-text {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .45);
  margin: 0;
}

@media (max-width: 900px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dash-grid {
    grid-template-columns: 1fr;
  }
}
</style>
