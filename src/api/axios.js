import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const sesion = localStorage.getItem('ZIFCOR_sesion')
  if (sesion) {
    try {
      const { accessToken } = JSON.parse(sesion)
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    } catch { void 0 }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Error de conexión con el servidor.'
    return Promise.reject(new Error(msg))
  },
)

export default api
