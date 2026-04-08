import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor request — agrega token JWT si existe
api.interceptors.request.use((config) => {
  const sesion = localStorage.getItem('zifux_sesion')
  if (sesion) {
    try {
      const { accessToken } = JSON.parse(sesion)
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    } catch {
      // Si el JSON es inválido, simplemente no se agrega el token
    }
  }
  return config
})

// Interceptor response — manejo global de errores
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
