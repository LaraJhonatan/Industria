// src/stores/cart.js
// ─────────────────────────────────────────────────────────────────────────────
// Carrito persistido en la base de datos, atado al usuario logueado con Gmail.
// Requiere sesión de tipo 'usuario'. Si no hay sesión, addItem lanza
// 'LOGIN_REQUIRED' para que la UI redirija al login.
// ─────────────────────────────────────────────────────────────────────────────
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartApi } from '../api/cart'
import { useAuthStore } from './auth-store'

const EMPTY_RESUMEN = {
  totalItems: 0,
  subtotalPagable: 0,
  totalPagables: 0,
  totalCotizacion: 0,
}

export const useCartStore = defineStore('cart', () => {
  const auth = useAuthStore()

  const items = ref([])
  const resumen = ref({ ...EMPTY_RESUMEN })
  const loading = ref(false)
  const loaded = ref(false)

  // ── Getters ────────────────────────────────────────────────────────────────
  const esUsuario = computed(() => auth.sesion?.usuario?.tipo === 'usuario')
  const totalItems = computed(() => resumen.value.totalItems)
  const isEmpty = computed(() => items.value.length === 0)

  /** Ítems que se pueden pagar por PSE (tienen precio y flag pagableEnLinea) */
  const pagables = computed(() =>
    items.value.filter((i) => i.pagableEnLinea && i.precioBase != null),
  )
  /** Ítems que requieren cotización (servicios / sin precio fijo) */
  const cotizacion = computed(() =>
    items.value.filter((i) => !i.pagableEnLinea || i.precioBase == null),
  )
  const subtotalPagable = computed(() => resumen.value.subtotalPagable)

  // ── Helpers ──────────────────────────────────────────────────────────────
  function setFromResponse(data) {
    items.value = data?.items || []
    resumen.value = data?.resumen || { ...EMPTY_RESUMEN }
  }

  function reset() {
    items.value = []
    resumen.value = { ...EMPTY_RESUMEN }
    loaded.value = false
  }

  function isInCart(productId) {
    return items.value.some((i) => i.productId === productId)
  }

  function getQty(productId) {
    return items.value.find((i) => i.productId === productId)?.cantidad ?? 0
  }

  // ── Actions ──────────────────────────────────────────────────────────────
  async function fetch() {
    if (!esUsuario.value) {
      reset()
      loaded.value = true
      return
    }
    loading.value = true
    try {
      const { data } = await cartApi.get()
      setFromResponse(data)
    } catch {
      reset()
    } finally {
      loading.value = false
      loaded.value = true
    }
  }

  /** Agrega un producto. Lanza 'LOGIN_REQUIRED' si no hay sesión de usuario. */
  async function addItem(productId, cantidad = 1) {
    if (!esUsuario.value) throw new Error('LOGIN_REQUIRED')
    loading.value = true
    try {
      const { data } = await cartApi.addItem(productId, cantidad)
      setFromResponse(data)
    } finally {
      loading.value = false
    }
  }

  async function setQty(productId, cantidad) {
    if (!esUsuario.value) return
    loading.value = true
    try {
      const { data } = await cartApi.updateItem(productId, cantidad)
      setFromResponse(data)
    } finally {
      loading.value = false
    }
  }

  function increment(productId) {
    return setQty(productId, getQty(productId) + 1)
  }

  function decrement(productId) {
    return setQty(productId, getQty(productId) - 1)
  }

  async function removeItem(productId) {
    if (!esUsuario.value) return
    loading.value = true
    try {
      const { data } = await cartApi.removeItem(productId)
      setFromResponse(data)
    } finally {
      loading.value = false
    }
  }

  async function clear() {
    if (!esUsuario.value) return
    loading.value = true
    try {
      const { data } = await cartApi.clear()
      setFromResponse(data)
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    items,
    resumen,
    loading,
    loaded,
    // getters
    esUsuario,
    totalItems,
    isEmpty,
    pagables,
    cotizacion,
    subtotalPagable,
    // actions
    fetch,
    reset,
    isInCart,
    getQty,
    addItem,
    setQty,
    increment,
    decrement,
    removeItem,
    clear,
  }
})
