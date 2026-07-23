<template>
  <div class="callback-page">
    <div class="callback-box">
      <img src="/IconoZ.png" alt="ZIFCOR" class="cb-logo" />
      <div class="cb-spinner" />
      <p class="cb-txt">Iniciando sesión con Google...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  const token = route.query.token

  if (!token) {
    router.replace('/auth?error=google')
    return
  }

  authStore.setTokenUsuario(token)

  router.replace('/')
})
</script>

<style scoped>
.callback-page {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: #eef0f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.callback-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.cb-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  opacity: .7;
}

.cb-spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid rgba(0, 113, 227, .15);
  border-top-color: #0071e3;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cb-txt {
  font-size: 14px;
  font-weight: 600;
  color: rgba(11, 18, 32, .45);
}
</style>
