import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '../api/products'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const current = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const pages = ref(0)

  async function fetchAll(params = {}) {
    loading.value = true
    try {
      const { data } = await productsApi.getAll(params)
      products.value = data.data
      total.value = data.total
      pages.value = data.pages
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    loading.value = true
    try {
      const { data } = await productsApi.getById(id)
      current.value = data
      return data
    } finally {
      loading.value = false
    }
  }

  async function create(dto) {
    const { data } = await productsApi.create(dto)
    return data
  }

  async function update(id, dto) {
    const { data } = await productsApi.update(id, dto)
    return data
  }

  async function changeStatus(id, estado, motivo) {
    const { data } = await productsApi.changeStatus(id, { estado, motivo })
    if (current.value?.id === id) current.value = data
    return data
  }

  async function remove(id) {
    await productsApi.delete(id)
    products.value = products.value.filter((p) => p.id !== id)
  }

  return {
    products,
    current,
    loading,
    total,
    pages,
    fetchAll,
    fetchById,
    create,
    update,
    changeStatus,
    remove,
  }
})
