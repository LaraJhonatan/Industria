import http from './http'

export const uploadsApi = {
  uploadImage: (file, folder = 'general') => {
    const form = new FormData()
    form.append('file', file)
    return http.post(`/uploads/image?folder=${folder}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteImage: (publicId) => http.delete(`/uploads/${publicId}`),
}
