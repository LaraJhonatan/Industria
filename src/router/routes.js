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
  //  TIENDA  →  usa StoreLayout (navbar propia con carrito)
  //  Todas las rutas de tienda van anidadas aquí
  // ══════════════════════════════════════════════════════════
  {
    path: '/tienda',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      // Catálogo principal (pantalla de inicio de la tienda)
      {
        path: '',
        component: () => import('src/components/views/CatalogView.vue'),
      },
      // Categoría  →  /tienda/drones  o  /tienda/filamentos
      {
        path: ':categoryId',
        component: () => import('src/components/views/ServiceStoreView.vue'),
      },
      // Subcategoría  →  /tienda/drones/sub/baterias
      {
        path: ':categoryId/sub/:subcategoryId',
        component: () => import('src/components/views/Subcategoryview.vue'),
      },
      // Detalle de producto  →  /tienda/drones/dr-bat-01
      {
        path: ':categoryId/:productId',
        component: () => import('src/components/views/ProductDetailView.vue'),
      },
      // Carrito
      {
        path: '../carrito',
        redirect: '/carrito',
      },
    ],
  },

  // Carrito y checkout fuera del nested para que la URL sea limpia
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
