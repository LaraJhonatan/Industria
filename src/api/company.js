import http from './http'

export const companyApi = {
  getPerfil: () => http.get('/auth/empresa/perfil'),
  updatePerfil: (dto) => http.patch('/auth/empresa/perfil', dto),
}
