import { defineStore } from 'pinia'
import { ref } from 'vue'
import { companyApi } from '../api/company'

export const useCompanyStore = defineStore('company', () => {
  const perfil = ref(null)
  const loading = ref(false)

  async function fetchPerfil() {
    loading.value = true
    try {
      const { data } = await companyApi.getPerfil()
      perfil.value = data
    } finally {
      loading.value = false
    }
  }

  async function updatePerfil(dto) {
    loading.value = true
    try {
      const { data } = await companyApi.updatePerfil(dto)
      perfil.value = data
      return data
    } finally {
      loading.value = false
    }
  }

  return { perfil, loading, fetchPerfil, updatePerfil }
})
