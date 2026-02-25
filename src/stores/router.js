import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouterStore = defineStore('router', () => {
  // view: 'catalog' | 'service' | 'product'
  const view = ref('catalog')
  const serviceId = ref(null)
  const productId = ref(null)

  function goToCatalog() {
    view.value = 'catalog'
    serviceId.value = null
    productId.value = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToService(sid) {
    view.value = 'service'
    serviceId.value = sid
    productId.value = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToProduct(sid, pid) {
    view.value = 'product'
    serviceId.value = sid
    productId.value = pid
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { view, serviceId, productId, goToCatalog, goToService, goToProduct }
})
