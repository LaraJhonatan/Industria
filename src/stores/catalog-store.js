import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoriesApi } from '../api/categories'

export const useCatalogStore = defineStore('catalog', () => {
  const tree = ref([])
  const atributosPorCategoria = ref({})
  const loading = ref(false)

  async function fetchTree() {
    loading.value = true
    try {
      const { data } = await categoriesApi.getTree()
      tree.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchAtributos(categoryId) {
    if (atributosPorCategoria.value[categoryId]) {
      return atributosPorCategoria.value[categoryId]
    }
    const { data } = await categoriesApi.getAtributos(categoryId)
    atributosPorCategoria.value[categoryId] = data
    return data
  }

  function getAtributos(categoryId) {
    return atributosPorCategoria.value[categoryId] || []
  }

  return { tree, atributosPorCategoria, loading, fetchTree, fetchAtributos, getAtributos }
})
