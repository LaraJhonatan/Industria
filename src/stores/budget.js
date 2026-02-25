import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'presupuesto-items'

async function loadFromStorage() {
  try {
    if (typeof window !== 'undefined' && window.storage) {
      const r = await window.storage.get(STORAGE_KEY)
      return r ? JSON.parse(r.value) : []
    }
  } catch { /* no storage available */ }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

async function saveToStorage(items) {
  try {
    if (typeof window !== 'undefined' && window.storage) {
      await window.storage.set(STORAGE_KEY, JSON.stringify(items))
      return
    }
  } catch { /* no storage available */ }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch { /* noop */ }
}

export const useBudgetStore = defineStore('budget', () => {
  const items = ref([])
  const loaded = ref(false)

  async function init() {
    if (loaded.value) return
    items.value = await loadFromStorage()
    loaded.value = true
  }

  async function addItem(payload) {
    const exists = items.value.some(i => i.productId === payload.productId)
    if (exists) return
    items.value.push(payload)
    await saveToStorage(items.value)
  }

  async function removeItem(productId) {
    items.value = items.value.filter(i => i.productId !== productId)
    await saveToStorage(items.value)
  }

  async function clearAll() {
    items.value = []
    await saveToStorage([])
  }

  function isInBudget(productId) {
    return items.value.some(i => i.productId === productId)
  }

  return { items, loaded, init, addItem, removeItem, clearAll, isInBudget }
})
