import http from './http'

export const cartApi = {
  get: () => http.get('/cart'),
  addItem: (productId, cantidad = 1) => http.post('/cart/items', { productId, cantidad }),
  updateItem: (productId, cantidad) => http.patch(`/cart/items/${productId}`, { cantidad }),
  removeItem: (productId) => http.delete(`/cart/items/${productId}`),
  clear: () => http.delete('/cart'),
}
