<template>
  <q-layout view="lHh Lpr lFf">

    <q-header class="dash-header">
      <q-toolbar class="dash-toolbar">
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" color="grey-6" />

        <div class="header-search-wrap row items-center q-ml-md">
          <q-icon name="search" color="grey-4" size="16px" class="q-mr-xs" />
          <input v-model="searchQuery" placeholder="Buscar productos, pedidos..." class="header-search" />
        </div>

        <q-space />

        <q-btn flat round dense class="q-mr-xs">
          <q-icon name="notifications_none" color="grey-6" size="22px" />
          <q-badge color="blue-6" floating rounded style="font-size:10px">3</q-badge>
        </q-btn>

        <q-btn flat round dense class="q-mr-sm">
          <q-icon name="mail_outline" color="grey-6" size="22px" />
          <q-badge color="blue-6" floating rounded style="font-size:10px">1</q-badge>
        </q-btn>

        <div class="header-empresa row items-center q-pl-sm"
          style="border-left:1px solid rgba(11,18,32,.08); cursor:pointer" @click="router.push('/dashboard/perfil')">
          <q-avatar size="34px" class="empresa-avatar text-weight-bold text-white">
            {{ empresaInicial }}
          </q-avatar>
          <div class="q-ml-sm column" style="line-height:1.2">
            <span class="text-weight-bold" style="font-size:13px;color:#0b1220">{{ empresaNombre }}</span>
            <span style="font-size:11px;color:#9ca3af">Ver perfil</span>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="232" :breakpoint="768" class="dash-sidebar">
      <div class="column full-height">

        <div class="sidebar-brand row items-center q-px-lg q-py-md">
          <router-link to="/">
            <img src="/IconoZ.png" alt="ZiFux" style="height:28px" />
          </router-link>
          <span class="q-ml-sm"
            style="font-size:11px;font-weight:900;color:rgba(11,18,32,.35);text-transform:uppercase;letter-spacing:1px">
            Portal B2B
          </span>
        </div>

        <div class="q-px-sm q-pt-sm" style="flex:1">
          <div class="nav-section-label q-px-sm q-mb-xs">Principal</div>
          <q-list>
            <q-item v-for="item in navItems" :key="item.path" clickable v-ripple :to="item.path" exact
              active-class="nav-active" class="nav-item rounded-borders q-mb-xs">
              <q-item-section avatar style="min-width:36px">
                <q-icon :name="item.icon" size="18px" />
              </q-item-section>
              <q-item-section>
                <q-item-label style="font-size:13.5px;font-weight:600">{{ item.label }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="item.badge" side>
                <q-badge color="blue-6" rounded style="font-size:10px">{{ item.badge }}</q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="sidebar-footer q-pa-md">
          <div class="plan-card q-pa-md q-mb-sm">
            <div class="row items-center justify-between q-mb-xs">
              <span
                style="font-size:11px;font-weight:700;color:rgba(11,18,32,.42);text-transform:uppercase;letter-spacing:.5px">Plan
                actual</span>
              <q-chip dense outline color="blue-6" style="font-size:10px;height:20px">Free</q-chip>
            </div>
            <q-linear-progress :value="0.3" color="blue-6" track-color="grey-3" rounded size="5px" class="q-mb-xs" />
            <span style="font-size:11.5px;color:rgba(11,18,32,.42)">3 de 10 productos publicados</span>
          </div>
          <q-item clickable v-ripple class="nav-item rounded-borders" @click="logout">
            <q-item-section avatar style="min-width:36px">
              <q-icon name="logout" size="18px" color="grey-5" />
            </q-item-section>
            <q-item-section>
              <q-item-label style="font-size:13px;font-weight:600;color:#9ca3af">Cerrar sesión</q-item-label>
            </q-item-section>
          </q-item>
        </div>

      </div>
    </q-drawer>

    <q-page-container class="dash-content">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import { useCompanyStore } from '../stores/company-store'

const router = useRouter()
const authStore = useAuthStore()
const companyStore = useCompanyStore()

const drawer = ref(true)
const searchQuery = ref('')

const empresaNombre = computed(() => {
  return authStore.empresa?.razonSocial || companyStore.perfil?.empresa?.razonSocial || 'Mi Empresa'
})

const empresaInicial = computed(() => empresaNombre.value.charAt(0).toUpperCase())

const navItems = [
  { path: '/dashboard', label: 'Inicio', icon: 'space_dashboard' },
  { path: '/dashboard/tienda', label: 'Mi Tienda', icon: 'storefront' },
  { path: '/dashboard/productos', label: 'Productos', icon: 'inventory_2' },
  { path: '/dashboard/pedidos', label: 'Pedidos', icon: 'receipt_long', badge: 2 },
  { path: '/dashboard/mensajes', label: 'Mensajes', icon: 'chat_bubble_outline', badge: 1 },
  { path: '/dashboard/alianzas', label: 'Alianzas B2B', icon: 'handshake' },
  { path: '/dashboard/oportunidades', label: 'Oportunidades', icon: 'trending_up' },
  { path: '/dashboard/analiticas', label: 'Analíticas', icon: 'bar_chart' },
]

function logout() {
  authStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
.dash-header {
  background: #ffffff;
  border-bottom: 1.5px solid rgba(11, 18, 32, .08);
  box-shadow: 0 1px 4px rgba(11, 18, 32, .05);
}

.dash-toolbar {
  min-height: 60px;
  padding: 0 20px;
}

.header-search-wrap {
  background: #f7f8fb;
  border: 1.5px solid rgba(11, 18, 32, .09);
  border-radius: 10px;
  padding: 7px 12px;
  width: 280px;
}

.header-search {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #0b1220;
  width: 100%;
}

.header-search::placeholder {
  color: #9ca3af;
}

.empresa-avatar {
  background: linear-gradient(135deg, #0071e3, #1a87ff);
  font-size: 15px;
}

.dash-sidebar {
  background: #ffffff;
  border-right: 1.5px solid rgba(11, 18, 32, .08);
}

.sidebar-brand {
  border-bottom: 1.5px solid rgba(11, 18, 32, .07);
  min-height: 60px;
}

.nav-section-label {
  font-size: 10.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, .3);
  text-transform: uppercase;
  letter-spacing: .8px;
  margin-top: 8px;
  margin-bottom: 4px;
}

.nav-item {
  border-radius: 10px;
  min-height: 40px;
  color: rgba(11, 18, 32, .55);
  transition: all 160ms;
}

.nav-item:hover {
  background: rgba(11, 18, 32, .04);
  color: #0b1220;
}

.nav-active {
  background: rgba(0, 113, 227, .08) !important;
  color: #0071e3 !important;
}

.sidebar-footer {
  border-top: 1.5px solid rgba(11, 18, 32, .07);
}

.plan-card {
  background: #f7f8fb;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px;
}

.dash-content {
  background: #f7f8fb;
}
</style>
