import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '../api/http'

export const useAuthStore = defineStore('auth', () => {
  const sesion = ref(JSON.parse(localStorage.getItem('ZIFCOR_sesion') || 'null'))

  const isAuthenticated = computed(() => !!sesion.value?.accessToken)
  const empresa = computed(() => sesion.value?.empresa || null)
  const token = computed(() => sesion.value?.accessToken || null)

  async function login(identificador, password) {
    const { data } = await http.post('/auth/login', { identificador, password })
    sesion.value = data
    localStorage.setItem('ZIFCOR_sesion', JSON.stringify(data))
    return data
  }

  function logout() {
    sesion.value = null
    localStorage.removeItem('ZIFCOR_sesion')
  }

  function restoreSession() {
    const stored = localStorage.getItem('ZIFCOR_sesion')
    if (stored) sesion.value = JSON.parse(stored)
  }

  function updateLogoUrl(url) {
    if (!sesion.value?.empresa) return
    sesion.value = {
      ...sesion.value,
      empresa: { ...sesion.value.empresa, logoUrl: url },
    }
    localStorage.setItem('ZIFCOR_sesion', JSON.stringify(sesion.value))
  }
  function setTokenUsuario(accessToken) {
    try {
      const base64 = accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(decodeURIComponent(escape(atob(base64))))
      const data = {
        accessToken,
        usuario: {
          id: payload.sub,
          email: payload.email,
          nombre: payload.nombre,
          fotoUrl: payload.fotoUrl || null,
          tipo: 'usuario',
        },
      }
      sesion.value = data
      localStorage.setItem('ZIFCOR_sesion', JSON.stringify(data))
    } catch (e) {
      console.error('Error decodificando token:', e)
    }
  }
  return {
    sesion,
    isAuthenticated,
    empresa,
    token,
    login,
    logout,
    restoreSession,
    updateLogoUrl,
    setTokenUsuario,
  }
})
