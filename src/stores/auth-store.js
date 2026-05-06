import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '../api/http'

export const useAuthStore = defineStore('auth', () => {
  const sesion = ref(JSON.parse(localStorage.getItem('zifux_sesion') || 'null'))

  const isAuthenticated = computed(() => !!sesion.value?.accessToken)
  const empresa = computed(() => sesion.value?.empresa || null)
  const token = computed(() => sesion.value?.accessToken || null)

  async function login(identificador, password) {
    const { data } = await http.post('/auth/login', { identificador, password })
    sesion.value = data
    localStorage.setItem('zifux_sesion', JSON.stringify(data))
    return data
  }

  function logout() {
    sesion.value = null
    localStorage.removeItem('zifux_sesion')
  }

  function restoreSession() {
    const stored = localStorage.getItem('zifux_sesion')
    if (stored) sesion.value = JSON.parse(stored)
  }

  return { sesion, isAuthenticated, empresa, token, login, logout, restoreSession }
})
