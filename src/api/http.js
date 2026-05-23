import axios from 'axios'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const sesion = localStorage.getItem('ZIFCOR_sesion')
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
  (res) => {
    // console.log('HTTP response url:', res.config.url, 'data:', res.data)
    return res
  },
  (err) => {
    if (err.response?.status === 401) {
      const url = err.config?.url || ''
      if (!url.includes('/auth/')) {
        localStorage.removeItem('ZIFCOR_sesion')
        window.location.href = '/auth'
      }
    }
    return Promise.reject(err)
  },
)

export default http
