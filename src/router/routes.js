import { useAuthStore } from '../stores/auth-store'

const dashboardGuard = () => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) return '/auth'
}

const routes = [
  // ══════════════════════════════════════════════════════════
  //  SITIO PRINCIPAL
  // ══════════════════════════════════════════════════════════
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'servicios-industriales',
        component: () => import('pages/ServiciosIndustrialesPage.vue'),
      },
      { path: 'maquinaria', component: () => import('pages/MaquinariaIndexpage.vue') },
      { path: 'ingenieria', component: () => import('pages/IndexIngenieria.vue') },
      { path: 'maquinaria/:id', component: () => import('pages/MaquinariaDetailPage.vue') },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  AUTENTICACIÓN
  // ══════════════════════════════════════════════════════════
  {
    path: '/auth',
    component: () => import('pages/AuthView.vue'),
  },

  // ══════════════════════════════════════════════════════════
  //  TIENDA PÚBLICA
  // ══════════════════════════════════════════════════════════
  {
    path: '/tienda',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/tienda/CompanyCategoriesPage.vue'),
      },
      {
        path: 'empresa/:empresaId',
        component: () => import('pages/tienda/CompanyStorePage.vue'),
      },
      {
        path: 'empresa/:empresaId/producto/:productoId',
        component: () => import('pages/tienda/ProductPublicDetailPage.vue'),
      },
      {
        path: ':sectorSlug',
        component: () => import('pages/tienda/CompaniesBySectorPage.vue'),
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  DASHBOARD PRIVADO
  // ══════════════════════════════════════════════════════════
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    beforeEnter: dashboardGuard,
    children: [
      { path: '', component: () => import('pages/dashboard/DashboardHomePage.vue') },
      { path: 'tienda', component: () => import('pages/dashboard/store/MyStorePage.vue') },
      { path: 'productos', component: () => import('pages/dashboard/store/ProductListPage.vue') },
      {
        path: 'productos/nuevo',
        component: () => import('pages/dashboard/store/ProductCreatePage.vue'),
      },
      {
        path: 'productos/:id',
        component: () => import('pages/dashboard/store/ProductDetailPage.vue'),
      },
      {
        path: 'productos/:id/editar',
        component: () => import('pages/dashboard/store/ProductEditPage.vue'),
      },
      { path: 'perfil', component: () => import('pages/dashboard/company/CompanyProfilePage.vue') },
      { path: 'pedidos', component: () => import('pages/dashboard/orders/OrdersPage.vue') },
      { path: 'mensajes', component: () => import('pages/dashboard/messages/MessagesPage.vue') },
      { path: 'alianzas', component: () => import('pages/dashboard/alliances/AlliancesPage.vue') },
      {
        path: 'oportunidades',
        component: () => import('pages/dashboard/opportunities/OpportunitiesPage.vue'),
      },
      {
        path: 'analiticas',
        component: () => import('pages/dashboard/analytics/AnalyticsPage.vue'),
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  404
  // ══════════════════════════════════════════════════════════
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
