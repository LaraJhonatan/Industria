<template>
  <section id="contacto" class="contact">
    <div class="bs-wrap">

      <div class="col-left" v-reveal>

        <div class="status-badge">
          <span class="status-dot" />
          Aceptando nuevos proyectos
        </div>

        <h2 class="title">
          Hablemos de tu
          <span>proyecto industrial</span>
        </h2>

        <p class="subtitle">
          Cuéntanos qué necesitas y te responderemos en menos de 24 horas
          con una propuesta clara y sin compromisos.
        </p>

      </div>

      <q-form ref="formRef" class="contact-form" @submit.prevent="onSubmit" v-reveal data-delay="100">

        <div v-if="success" class="success-msg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ¡Mensaje enviado! Te responderemos en menos de 24 horas.
        </div>

        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <div class="form-grid">
          <div class="field">
            <label class="label">Nombres *</label>
            <q-input v-model="form.firstName" outlined dense class="input" placeholder="Tu nombre"
              :rules="[required]" />
          </div>

          <div class="field">
            <label class="label">Apellidos *</label>
            <q-input v-model="form.lastName" outlined dense class="input" placeholder="Tus apellidos"
              :rules="[required]" />
          </div>

          <div class="field">
            <label class="label">Email *</label>
            <q-input v-model="form.email" outlined dense type="email" class="input" placeholder="nombre@empresa.com"
              :rules="[required, emailRule]" />
          </div>

          <div class="field">
            <label class="label">Celular *</label>
            <q-input v-model="form.phone" outlined dense class="input" placeholder="+57 300 000 0000"
              :rules="[required]" />
          </div>
        </div>

        <div class="field">
          <label class="label">¿En qué podemos ayudarte? *</label>
          <q-input v-model="form.message" outlined type="textarea" autogrow class="textarea"
            placeholder="Describe tu proyecto, necesidad o pregunta..." :rules="[required]" />
        </div>

        <div class="form-footer">
          <q-checkbox v-model="form.acceptTerms" class="checkbox">
            <span class="checkbox-label">
              Acepto el tratamiento de mis datos según la
              <a href="/politica-privacidad" class="link">política de privacidad</a>
            </span>
          </q-checkbox>

          <q-btn unelevated type="submit" class="submit-btn" label="Enviar mensaje" icon-right="send" :loading="sending"
            :disable="!form.acceptTerms" />
        </div>
      </q-form>

    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { publicApi } from '../../api/publicCatalog'

const formRef = ref(null)
const sending = ref(false)
const success = ref(false)
const error = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  acceptTerms: false
})

const required = (v) => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'
const emailRule = (v) => {
  if (!v) return 'Campo obligatorio'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()) || 'Correo inválido'
}

async function onSubmit() {
  const ok = await formRef.value?.validate?.()
  if (!ok) return
  if (!form.value.acceptTerms) return

  sending.value = true
  error.value = ''
  success.value = false

  try {
    await publicApi.enviarContacto({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
    })

    success.value = true
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false
    }
    await nextTick()
    formRef.value?.resetValidation()

  } catch (e) {
    error.value = 'Ocurrió un error al enviar el mensaje. Intenta de nuevo.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>

.contact {
  --blue: #0071e3;
  --blue-dark: #005fcd;

  padding: 100px 0;
  background: #ffffff;
  color: #0b1220;
}

.bs-wrap {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.col-left {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 13px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.60);
  width: fit-content;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.22);
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-size: clamp(32px, 3.5vw, 50px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: #0b1220;
}

.title span {
  display: block;
  color: var(--blue);
}

.subtitle {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: rgba(11, 18, 32, 0.55);
  max-width: 420px;
}

.success-msg {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.30);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 20px;
}

.error-msg {
  padding: 14px 18px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.30);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 20px;
}

.contact-form {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, 0.10);
  border-radius: 20px;
  padding: 36px;
  box-shadow:
    0 2px 8px rgba(11, 18, 32, 0.05),
    0 20px 56px rgba(11, 18, 32, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
}

.input :deep(.q-field__control),
.textarea :deep(.q-field__control) {
  background: #ffffff !important;
  border-radius: 10px !important;
}

.input :deep(.q-field--outlined .q-field__control:before),
.textarea :deep(.q-field--outlined .q-field__control:before) {
  border: 1.5px solid rgba(11, 18, 32, 0.15) !important;
}

.input :deep(.q-field--outlined .q-field__control:hover:before),
.textarea :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(11, 18, 32, 0.28) !important;
}

.input :deep(.q-field--outlined.q-field--focused .q-field__control:before),
.textarea :deep(.q-field--outlined.q-field--focused .q-field__control:before) {
  border-color: var(--blue) !important;
}

.input :deep(.q-field__native),
.textarea :deep(textarea) {
  color: #0b1220 !important;
  font-size: 14px !important;
}

.input :deep(.q-field__native::placeholder),
.textarea :deep(textarea::placeholder) {
  color: rgba(11, 18, 32, 0.35) !important;
}

.textarea :deep(textarea) {
  min-height: 110px !important;
}

.form-footer {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.checkbox-label {
  font-size: 13px;
  color: rgba(11, 18, 32, 0.55);
  line-height: 1.5;
}

.link {
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline
}

.submit-btn {
  height: 52px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  background: var(--blue);
  color: #fff;
  box-shadow: 0 4px 18px rgba(0, 113, 227, 0.32);
  transition: background 180ms, box-shadow 180ms, transform 180ms;
}

.submit-btn :deep(.q-btn__content) {
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.submit-btn:hover {
  background: var(--blue-dark);
  box-shadow: 0 8px 28px rgba(0, 113, 227, 0.45);
  transform: translateY(-1px);
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .bs-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .subtitle {
    max-width: 100%
  }
}

@media (max-width: 600px) {
  .contact {
    padding: 64px 0
  }

  .contact-form {
    padding: 24px 20px
  }

  .form-grid {
    grid-template-columns: 1fr
  }
}
</style>
