import http from './http'

export const productImportApi = {
  analizar: (file) => {
    const form = new FormData()
    form.append('file', file)
    return http.post('/products/import/analizar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // la IA puede tardar en documentos largos
    })
  },
  confirmar: (productos) => http.post('/products/import/confirmar', { productos }),
}
