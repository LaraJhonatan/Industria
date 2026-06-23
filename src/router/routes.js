const dashboardGuard = () => {
  try {
    const raw = localStorage.getItem('ZIFCOR_sesion')
    const sesion = JSON.parse(raw || 'null')
    if (!sesion?.accessToken) return '/auth'
  } catch (e) {
    console.log('GUARD ERROR:', e)
    return '/auth'
  }
}

const routes = [
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

  { path: '/auth', component: () => import('pages/AuthView.vue') },
  { path: '/auth/callback', component: () => import('pages/AuthCallbackPage.vue') },

  {
    path: '/tienda',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tienda/CompanyCategoriesPage.vue') },

      // Acceso directo por slug de producto (desde destacados, emails, redes sociales, etc.)
      {
        path: 'producto/:productoSlug',
        component: () => import('pages/tienda/ProductPublicDetailPage.vue'),
      },

      // Empresa por slug (URL amigable)
      {
        path: '/tienda/:sectorSlug/:empresaSlug',
        component: () => import('pages/tienda/CompanyStorePage.vue'),
      },

      // Producto por slug completo (URL jerárquica SEO)
      {
        path: '/tienda/:sectorSlug/:empresaSlug/producto/:productoSlug',
        component: () => import('pages/tienda/ProductPublicDetailPage.vue'),
      },

      // Buscador global de productos
      { path: 'buscar', component: () => import('src/components/tienda/TiendaSearchPage.vue') },

      // Empresas por sector
      { path: ':sectorSlug', component: () => import('pages/tienda/CompaniesBySectorPage.vue') },
    ],
  },

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

  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },
]

export default routes
