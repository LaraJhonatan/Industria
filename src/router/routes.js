// routes.js - ACTUALIZADO CORRECTAMENTE

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'servicios-industriales',
        component: () => import('pages/ServiciosIndustrialesPage.vue'),
      },
      {
        path: 'maquinaria',
        component: () => import('src/pages/MaquinariaIndexpage.vue'),
      },
      {
        path: '/ingenieria',
        component: () => import('src/pages/IndexIngenieria.vue'),
      },
      {
        path: 'maquinaria/:id',
        component: () => import('pages/MaquinariaDetailPage.vue'),
      },

      // ── Tienda de servicios ──────────────────────────────
      {
        path: 'tienda',
        component: () => import('src/components/views/CatalogView.vue'),
      },
      {
        path: 'tienda/:serviceId',
        component: () => import('src/components/views/ServiceStoreView.vue'),
      },
      {
        path: 'tienda/:serviceId/:productId',
        component: () => import('src/components/views/ProductDetailView.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
