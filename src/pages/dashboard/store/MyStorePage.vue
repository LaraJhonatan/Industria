<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Mi Tienda</h1>
        <p class="page-sub">Resumen y configuración de tu tienda en el marketplace</p>
      </div>
      <q-btn unelevated label="Nuevo producto" icon="add" color="blue-6" class="action-btn"
        @click="router.push('/dashboard/productos/nuevo')" />
    </div>

    <!-- Banner + logo -->
    <q-card flat bordered class="store-header-card q-mb-md">
      <div class="banner-wrap">
        <img v-if="profile?.bannerUrl" :src="profile.bannerUrl" class="banner-img" />
        <div v-else class="banner-empty row items-center justify-center">
          <div class="column items-center">
            <q-icon name="panorama" size="32px" color="grey-4" />
            <p class="text-caption text-grey-5 q-mt-xs">Sin banner — actualiza tu perfil</p>
          </div>
        </div>
      </div>
      <div class="store-info row items-end q-px-lg q-pb-lg">
        <div class="logo-wrap">
          <img v-if="profile?.logoUrl" :src="profile.logoUrl" class="store-logo" />
          <q-avatar v-else size="72px" color="blue-6" text-color="white"
            class="text-h4 text-weight-bold store-logo-avatar">
            {{ empresa?.razonSocial?.charAt(0) }}
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <h2 class="store-name">{{ profile?.nombreComercial || empresa?.razonSocial }}</h2>
          <p class="store-nit">NIT {{ empresa?.nit }}-{{ empresa?.dv }}</p>
          <div class="row gap-xs q-mt-xs">
            <q-chip v-if="profile?.ciudad" dense outline color="grey-6" size="sm">
              <q-icon name="location_on" size="12px" class="q-mr-xs" />{{ profile.ciudad }}
            </q-chip>
            <q-chip dense :color="empresa?.estado === 'ACTIVA' ? 'green-6' : 'orange-5'" text-color="white" size="sm">
              {{ empresa?.estado }}
            </q-chip>
          </div>
        </div>
        <q-space />
        <q-btn flat label="Editar perfil" icon="edit" color="blue-6" class="action-btn"
          @click="router.push('/dashboard/perfil')" />
      </div>
    </q-card>

    <!-- Métricas -->
    <div class="metrics-grid q-mb-md">
      <div class="metric-card">
        <div class="metric-icon-wrap" style="background:rgba(0,113,227,.08)">
          <q-icon name="inventory_2" size="20px" color="blue-6" />
        </div>
        <div>
          <div class="metric-value">{{ productStore.total }}</div>
          <div class="metric-label">Productos totales</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-wrap" style="background:rgba(34,197,94,.08)">
          <q-icon name="check_circle" size="20px" color="green-6" />
        </div>
        <div>
          <div class="metric-value">{{ publishedCount }}</div>
          <div class="metric-label">Publicados</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-wrap" style="background:rgba(251,146,60,.08)">
          <q-icon name="edit_note" size="20px" color="orange-6" />
        </div>
        <div>
          <div class="metric-value">{{ draftCount }}</div>
          <div class="metric-label">Borradores</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-wrap" style="background:rgba(147,51,234,.08)">
          <q-icon name="pause_circle" size="20px" color="purple-6" />
        </div>
        <div>
          <div class="metric-value">{{ pausedCount }}</div>
          <div class="metric-label">Pausados</div>
        </div>
      </div>
    </div>

    <!-- Descripción -->
    <q-card flat bordered class="profile-card q-mb-md" v-if="profile?.descripcion">
      <q-card-section>
        <div class="section-title q-mb-sm">Sobre la empresa</div>
        <p class="description-text">{{ profile.descripcion }}</p>
      </q-card-section>
    </q-card>

    <!-- Productos recientes -->
    <q-card flat bordered class="profile-card">
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <span class="section-title">Productos recientes</span>
          <q-btn flat dense label="Ver todos" color="blue-6" size="sm" @click="router.push('/dashboard/productos')" />
        </div>

        <div v-if="productStore.loading" class="column items-center q-py-lg">
          <q-spinner color="blue-6" size="28px" />
        </div>

        <div v-else-if="!productStore.products.length" class="empty-state column items-center q-py-lg">
          <q-icon name="inventory_2" size="40px" color="grey-4" />
          <p class="empty-text q-mt-sm">Aún no tienes productos publicados</p>
          <q-btn unelevated label="Crear producto" icon="add" color="blue-6" class="action-btn q-mt-sm"
            @click="router.push('/dashboard/productos/nuevo')" />
        </div>

        <div v-else class="products-mini-grid">
          <div v-for="p in productStore.products.slice(0, 6)" :key="p.id" class="product-mini-card"
            @click="router.push(`/dashboard/productos/${p.id}`)">
            <div class="product-mini-img">
              <img v-if="p.imagenes?.[0]?.url" :src="p.imagenes[0].url" />
              <q-icon v-else name="inventory_2" size="24px" color="grey-4" />
            </div>
            <div class="product-mini-info">
              <p class="product-mini-name">{{ p.nombre }}</p>
              <q-chip dense :color="statusColor(p.estado)" text-color="white" style="font-size:9px;height:18px">
                {{ statusLabel(p.estado) }}
              </q-chip>
            </div>
          </div>
        </div>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from '../../../stores/company-store'
import { useProductStore } from '../../../stores/product-store'
import { useAuthStore } from '../../../stores/auth-store'

const router = useRouter()
const companyStore = useCompanyStore()
const productStore = useProductStore()
const authStore = useAuthStore()

const empresa = computed(() => companyStore.perfil?.empresa || authStore.empresa)
const profile = computed(() => companyStore.perfil?.profile)

const publishedCount = computed(() => productStore.products.filter(p => p.estado === 'published').length)
const draftCount = computed(() => productStore.products.filter(p => p.estado === 'draft').length)
const pausedCount = computed(() => productStore.products.filter(p => p.estado === 'paused').length)

function statusColor(estado) {
  return { draft: 'grey-5', published: 'green-6', paused: 'orange-5', archived: 'red-4' }[estado] || 'grey-5'
}

function statusLabel(estado) {
  return { draft: 'Borrador', published: 'Publicado', paused: 'Pausado', archived: 'Archivado' }[estado] || estado
}

onMounted(async () => {
  await Promise.all([
    companyStore.fetchPerfil(),
    productStore.fetchAll({ limit: 6 }),
  ])
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

.store-header-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
  overflow: hidden;
}

.banner-wrap {
  position: relative;
  height: 160px;
  background: #f7f8fb;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-empty {
  height: 100%;
}

.store-info {
  margin-top: -36px;
}

.logo-wrap {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(11, 18, 32, .1);
}

.store-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.store-logo-avatar {
  border: 3px solid #fff;
}

.store-name {
  font-size: 20px;
  font-weight: 900;
  color: #0b1220;
  margin: 0 0 2px;
  letter-spacing: -.3px;
}

.store-nit {
  font-size: 12px;
  color: rgba(11, 18, 32, .42);
  margin: 0;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.metric-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(11, 18, 32, .04);
}

.metric-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-value {
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.3px;
}

.metric-label {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

.profile-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
}

.section-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
}

.description-text {
  font-size: 14px;
  color: rgba(11, 18, 32, .65);
  line-height: 1.7;
  margin: 0;
}

.products-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.product-mini-card {
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 160ms;
}

.product-mini-card:hover {
  border-color: #0071e3;
  box-shadow: 0 2px 8px rgba(0, 113, 227, .12);
}

.product-mini-img {
  height: 90px;
  background: #f7f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-mini-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-mini-info {
  padding: 8px 10px;
}

.product-mini-name {
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  text-align: center;
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

  .products-mini-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }

  .products-mini-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
