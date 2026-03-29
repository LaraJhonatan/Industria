const routes = [
  // ══════════════════════════════════════════════════════════
  //  SITIO PRINCIPAL  →  usa MainLayout (navbar original)
  // ══════════════════════════════════════════════════════════
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
        component: () => import('pages/MaquinariaIndexpage.vue'),
      },
      {
        path: 'ingenieria',
        component: () => import('pages/IndexIngenieria.vue'),
      },
      {
        path: 'maquinaria/:id',
        component: () => import('pages/MaquinariaDetailPage.vue'),
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  AUTENTICACIÓN  →  sin layout (AuthView tiene el suyo)
  // ══════════════════════════════════════════════════════════
  {
    path: '/auth',
    component: () => import('pages/AuthView.vue'),
  },

  // ══════════════════════════════════════════════════════════
  //  TIENDA  →  usa StoreLayout (navbar propia con carrito)
  // ══════════════════════════════════════════════════════════
  {
    path: '/tienda',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/components/views/CatalogView.vue'),
      },
      {
        path: ':categoryId',
        component: () => import('src/components/views/ServiceStoreView.vue'),
      },
      {
        path: ':categoryId/sub/:subcategoryId',
        component: () => import('src/components/views/SubcategoryView.vue'),
      },
      {
        path: ':categoryId/:productId',
        component: () => import('src/components/views/ProductDetailView.vue'),
      },
      {
        path: '../carrito',
        redirect: '/carrito',
      },
    ],
  },

  // Carrito y checkout
  {
    path: '/carrito',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/components/views/CartView.vue'),
      },
    ],
  },
  {
    path: '/checkout',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/components/views/CheckoutView.vue'),
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
