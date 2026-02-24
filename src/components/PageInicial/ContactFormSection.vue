<template>
  <section id="contacto" class="contact">
    <div class="bs-wrap">
      <div class="header" v-reveal>
        <h2 class="title">
          Hablemos de tu
          <span>proyecto</span>
        </h2>
        <p class="subtitle">
          Cuéntanos qué necesitas y te responderemos en menos de 24 horas con una propuesta clara.
        </p>
      </div>

      <q-form 
        ref="formRef" 
        class="contact-form" 
        @submit.prevent="onSubmit"
        v-reveal
        data-delay="100"
      >
        <div class="form-grid">
          <div class="field">
            <label class="label">Nombres *</label>
            <q-input 
              v-model="form.firstName" 
              outlined 
              dense
              class="input"
              placeholder="Tu nombre"
              :rules="[required]"
            />
          </div>

          <div class="field">
            <label class="label">Apellidos *</label>
            <q-input 
              v-model="form.lastName" 
              outlined 
              dense
              class="input"
              placeholder="Tus apellidos"
              :rules="[required]"
            />
          </div>

          <div class="field">
            <label class="label">Email corporativo *</label>
            <q-input 
              v-model="form.email" 
              outlined 
              dense
              type="email"
              class="input"
              placeholder="nombre@empresa.com"
              :rules="[required, emailRule]"
            />
          </div>

          <div class="field">
            <label class="label">Celular *</label>
            <q-input 
              v-model="form.phone" 
              outlined 
              dense
              class="input"
              placeholder="+57 300 000 0000"
              :rules="[required]"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">¿Cuéntanos en qué podemos ayudarte? *</label>
          <q-input 
            v-model="form.message" 
            outlined
            type="textarea"
            autogrow
            class="textarea"
            placeholder="Describe tu proyecto, necesidad o pregunta..."
            :rules="[required]"
          />
        </div>

        <div class="form-footer">
          <q-checkbox 
            v-model="form.acceptTerms" 
            class="checkbox"
            :rules="[(v) => v === true || 'Debes aceptar los términos']"
          >
            <span class="checkbox-label">
              Acepto el tratamiento de mis datos personales según la 
              <a href="/politica-privacidad" class="link">política de privacidad</a>
            </span>
          </q-checkbox>

          <q-btn 
            unelevated 
            type="submit"
            class="submit-btn" 
            label="Enviar mensaje"
            icon-right="send"
            :loading="sending"
          />
        </div>
      </q-form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)
const sending = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  acceptTerms: false
})

const required = (val) => (val !== null && val !== undefined && String(val).trim() !== '') || 'Campo obligatorio'

const emailRule = (val) => {
  if (!val) return 'Campo obligatorio'
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).trim())
  return ok || 'Correo inválido'
}

async function onSubmit() {
  const ok = await formRef.value?.validate?.()
  if (!ok) return

  sending.value = true
  try {
    const to = 'comercial@novaindustria.co'
    const subject = `Contacto web: ${form.value.firstName} ${form.value.lastName}`
    const body = [
      `Nombres: ${form.value.firstName}`,
      `Apellidos: ${form.value.lastName}`,
      `Email: ${form.value.email}`,
      `Celular: ${form.value.phone}`,
      ``,
      `Mensaje:`,
      `${form.value.message}`
    ].join('%0D%0A')

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
  } finally {
    setTimeout(() => {
      sending.value = false
    }, 400)
  }
}

const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const delay = Number(el.dataset.delay || 0)
    el.style.transitionDelay = `${delay}ms`
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
    )
    obs.observe(el)
    el.__obs = obs
  },
  unmounted(el) {
    el.__obs?.disconnect?.()
  }
}
</script>

<style scoped>
.bs-wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.contact {
  padding: 100px 0;
  background: #fff;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  margin: 0;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #1b1b1b;
}

.title span {
  display: block;
  color: #0071e3;
}

.subtitle {
  margin: 20px auto 0;
  max-width: 600px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(27, 27, 27, 0.7);
}

.contact-form {
  background: #fff;
  border: 2px solid rgba(27, 27, 27, 0.08);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(27, 27, 27, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
}

.input :deep(.q-field__control),
.textarea :deep(.q-field__control) {
  background: #fff !important;
  border-radius: 10px !important;
}

.input :deep(.q-field--outlined .q-field__control:before),
.textarea :deep(.q-field--outlined .q-field__control:before) {
  border: 2px solid rgba(27, 27, 27, 0.15) !important;
}

.input :deep(.q-field--outlined .q-field__control:hover:before),
.textarea :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(27, 27, 27, 0.25) !important;
}

.input :deep(.q-field--outlined.q-field--focused .q-field__control:before),
.textarea :deep(.q-field--outlined.q-field--focused .q-field__control:before) {
  border-color: #0071e3 !important;
}

.input :deep(.q-field__native),
.textarea :deep(textarea) {
  color: #1b1b1b !important;
  font-size: 15px !important;
}

.input :deep(.q-field__native::placeholder),
.textarea :deep(textarea::placeholder) {
  color: rgba(27, 27, 27, 0.4) !important;
}

.textarea :deep(textarea) {
  min-height: 120px !important;
}

.form-footer {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkbox {
  align-items: flex-start;
}

.checkbox-label {
  font-size: 14px;
  color: rgba(27, 27, 27, 0.7);
  line-height: 1.5;
}

.link {
  color: #0071e3;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

.submit-btn {
  height: 54px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 16px;
  background: #0071e3;
  color: #fff;
}

.submit-btn:hover {
  background: #0066cc;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .contact {
    padding: 70px 0;
  }
  
  .contact-form {
    padding: 32px 24px;
  }
}
</style>
