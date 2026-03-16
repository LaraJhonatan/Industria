// src/stores/cart.js
// ─────────────────────────────────────────────────────────────────────────────
// Pinia cart store con persistencia en localStorage
// Compatible con Vue 3 + Quasar (usa localStorage nativo para máx. compatibilidad)
// ─────────────────────────────────────────────────────────────────────────────
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'nova_cart_v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage lleno o modo privado — continúa sin persistencia
  }
}

export const useCartStore = defineStore('cart', () => {
  // ── State ────────────────────────────────────────────────────────────────
  const items = ref(loadFromStorage())

  // ── Persist helper ───────────────────────────────────────────────────────
  function persist() {
    saveToStorage(items.value)
  }

  // ── Getters ──────────────────────────────────────────────────────────────
  /** Número total de unidades en el carrito */
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

  /** Precio total sin envío */
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.qty, 0))

  /** Envío: gratis si subtotal >= 500000 */
  const shipping = computed(() => (subtotal.value >= 500000 ? 0 : 25000))

  /** Total final */
  const total = computed(() => subtotal.value + shipping.value)

  /** Carrito vacío */
  const isEmpty = computed(() => items.value.length === 0)

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Verifica si un producto ya está en el carrito */
  function isInCart(productId) {
    return items.value.some((i) => i.productId === productId)
  }

  /** Obtiene la cantidad de un producto en el carrito */
  function getQty(productId) {
    return items.value.find((i) => i.productId === productId)?.qty ?? 0
  }

  /**
   * Añade un ítem al carrito.
   * Si ya existe, suma la cantidad.
   *
   * @param {{ productId, name, categoryId, categoryTitle, image, price, qty?, variant? }} item
   */
  function addItem(item) {
    const existing = items.value.find((i) => i.productId === item.productId)
    if (existing) {
      existing.qty += item.qty ?? 1
    } else {
      items.value.push({
        productId: item.productId,
        name: item.name,
        categoryId: item.categoryId,
        categoryTitle: item.categoryTitle,
        image: item.image,
        price: item.price,
        qty: item.qty ?? 1,
        variant: item.variant ?? null, // ej: "1.75mm", "3S 11.1V"
      })
    }
    persist()
  }

  /**
   * Elimina completamente un ítem del carrito por productId.
   */
  function removeItem(productId) {
    items.value = items.value.filter((i) => i.productId !== productId)
    persist()
  }

  /**
   * Actualiza la cantidad de un ítem.
   * Si qty <= 0, elimina el ítem.
   */
  function setQty(productId, qty) {
    if (qty <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find((i) => i.productId === productId)
    if (item) {
      item.qty = qty
      persist()
    }
  }

  /** Incrementa la cantidad en 1 */
  function increment(productId) {
    const item = items.value.find((i) => i.productId === productId)
    if (item) {
      item.qty++
      persist()
    }
  }

  /** Decrementa la cantidad en 1 (mínimo 1) */
  function decrement(productId) {
    const item = items.value.find((i) => i.productId === productId)
    if (item) {
      if (item.qty <= 1) removeItem(productId)
      else {
        item.qty--
        persist()
      }
    }
  }

  /** Vacía el carrito completamente */
  function clear() {
    items.value = []
    persist()
  }

  return {
    // state
    items,
    // getters
    totalItems,
    subtotal,
    shipping,
    total,
    isEmpty,
    // actions
    isInCart,
    getQty,
    addItem,
    removeItem,
    setQty,
    increment,
    decrement,
    clear,
  }
})
