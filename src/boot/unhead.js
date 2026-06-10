// src/boot/unhead.js
// Registra @unhead/vue para que useHead() funcione en toda la app.
//
// Instalación:
//   npm install @unhead/vue
//
// Y en quasar.config.js agregar 'unhead' al array de boot:
//   boot: ['axios', 'unhead', ...]

import { boot } from 'quasar/wrappers'
import { createHead } from '@unhead/vue/client'

export default boot(({ app }) => {
  const head = createHead()
  app.use(head)
})

// NOTA: si tu versión instalada de @unhead/vue es 1.x, el import cambia a:
//   import { createHead } from '@unhead/vue'
// (sin el sufijo /client). En 2.x es '@unhead/vue/client' para SPA.
