<template>
  <div class="reset-page">
    <div class="reset-box">
      <div class="panel-brand">
        <router-link to="/"><img src="/IconoZ.png" alt="ZIFCOR" class="panel-logo" /></router-link>
      </div>

      <template v-if="!token">
        <div class="fh fh--center">
          <div class="err-ico">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r=".6" fill="currentColor" />
            </svg>
          </div>
          <h2 class="fh-title">Enlace inválido</h2>
          <p class="fh-sub">Este enlace de recuperación no es válido. Solicita uno nuevo desde la pantalla de
            inicio de sesión.</p>
        </div>
        <button class="btn-p w-full mt-16" @click="router.push('/auth')">Ir a iniciar sesión →</button>
      </template>

      <template v-else-if="!hecho">
        <div class="fh fh--center">
          <h2 class="fh-title">Crea tu nueva contraseña</h2>
          <p class="fh-sub">Define una contraseña segura para tu cuenta empresarial.</p>
        </div>

        <div v-if="err" class="alert alert--err">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <circle cx="12" cy="16" r=".6" fill="currentColor" />
          </svg>
          {{ err }}
        </div>

        <div class="fg">
          <label class="fl">Contraseña <span class="req">*</span></label>
          <div class="iw">
            <input v-model="pw" class="fi" :type="showP ? 'text' : 'password'" placeholder="Mínimo 8 caracteres"
              @input="err = ''" @keydown.enter="submit" />
            <button class="eye" type="button" @click="showP = !showP">
              <svg v-if="!showP" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <ul class="rules">
            <li :class="{ ok: pw.length >= 8 }">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>Mínimo 8 caracteres
            </li>
            <li :class="{ ok: /[a-zA-Z]/.test(pw) }">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>Al menos una letra
            </li>
            <li :class="{ ok: /\d/.test(pw) }">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>Al menos un número
            </li>
          </ul>
        </div>

        <div class="fg">
          <label class="fl">Confirmar contraseña <span class="req">*</span></label>
          <div class="iw">
            <input v-model="pwc" class="fi" :type="showPC ? 'text' : 'password'" placeholder="Repite la contraseña"
              @input="err = ''" @keydown.enter="submit" />
            <button class="eye" type="button" @click="showPC = !showPC">
              <svg v-if="!showPC" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <span v-if="pwc && pw !== pwc" class="fhint fhint--err">Las contraseñas no coinciden</span>
        </div>

        <button class="btn-p w-full mt-8" :class="{ loading }" :disabled="!valido || loading" @click="submit">
          <span v-if="loading" class="spinner" />
          <span v-else>Restablecer contraseña →</span>
        </button>
      </template>

      <template v-else>
        <div class="fh fh--center">
          <div class="success-ico">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 class="fh-title">¡Contraseña actualizada!</h2>
          <p class="fh-sub">Ya puedes iniciar sesión con tu nueva contraseña.</p>
        </div>
        <button class="btn-p w-full mt-16" @click="router.push('/auth')">Ir a iniciar sesión →</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''))

const pw = ref('')
const pwc = ref('')
const showP = ref(false)
const showPC = ref(false)
const err = ref('')
const loading = ref(false)
const hecho = ref(false)

const valido = computed(() =>
  pw.value.length >= 8 && /[a-zA-Z]/.test(pw.value) && /\d/.test(pw.value) && pw.value === pwc.value
)

function getError(e, fallback = 'Ocurrió un error. Intenta de nuevo.') {
  const d = e?.response?.data
  if (!d) return fallback
  if (typeof d.message === 'string') return d.message
  if (Array.isArray(d.message) && d.message.length) return d.message[0]
  return fallback
}

async function submit() {
  if (!valido.value || loading.value) return
  err.value = ''
  loading.value = true
  try {
    await api.post('/auth/restablecer-password', { token: token.value, password: pw.value })
    hecho.value = true
  } catch (e) {
    err.value = getError(e, 'El enlace expiró o ya fue utilizado. Solicita uno nuevo.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.reset-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #eef0f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 24px;
}

.reset-box {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 20px 50px rgba(11, 18, 32, .08);
}

.panel-brand {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.panel-logo {
  height: 28px;
  width: auto;
}

.fh {
  margin-bottom: 22px;
}

.fh--center {
  text-align: center;
}

.fh-title {
  font-size: 21px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -0.4px;
  margin-bottom: 6px;
}

.fh-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .55);
  line-height: 1.5;
}

.err-ico {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(220, 38, 38, .1);
  color: #dc2626;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
}

.success-ico {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(22, 163, 74, .1);
  border: 2px solid rgba(22, 163, 74, .25);
  color: #16a34a;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
}

.fg {
  margin-bottom: 16px;
}

.fl {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: #0b1220;
  margin-bottom: 6px;
}

.req {
  color: #dc2626;
}

.iw {
  position: relative;
  display: flex;
  align-items: center;
}

.fi {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 14px;
  border: 1.5px solid rgba(11, 18, 32, .12);
  border-radius: 11px;
  font-size: 14px;
  font-family: inherit;
  color: #0b1220;
  outline: none;
  transition: border-color 140ms;
}

.fi:focus {
  border-color: #0071e3;
}

.eye {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(11, 18, 32, .4);
  display: flex;
}

.fhint {
  display: block;
  font-size: 12px;
  margin-top: 6px;
  color: rgba(11, 18, 32, .45);
}

.fhint--err {
  color: #dc2626;
}

.rules {
  list-style: none;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.rules li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(11, 18, 32, .4);
}

.rules li svg {
  opacity: .3;
}

.rules li.ok {
  color: #16a34a;
}

.rules li.ok svg {
  opacity: 1;
}

.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 11px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.alert--err {
  background: rgba(220, 38, 38, .08);
  color: #dc2626;
}

.btn-p {
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #0071e3;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 140ms;
}

.btn-p:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.w-full {
  width: 100%;
}

.mt-8 {
  margin-top: 8px;
}

.mt-16 {
  margin-top: 16px;
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, .35);
  border-top-color: #fff;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
