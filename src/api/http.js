import axios from 'axios'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_ARMELLINI_BASE_URL}/api`,
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const sesion = localStorage.getItem('zifux_sesion')
  if (sesion) {
    try {
      const { accessToken } = JSON.parse(sesion)
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    } catch {
      // ignore malformed session data
    }
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('zifux_sesion')
      window.location.href = '/auth'
    }
    return Promise.reject(err)
  },
)

export default http
