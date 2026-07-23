<template>
  <q-page class="page">
    <section id="formulario-maquinaria" class="projects">
      <div class="bs-wrap">

        <div class="col-left" :class="{ ready }">

          <h1 class="h1">
            Importamos la maquinaria
            <span>que tu operación necesita</span>,
            con criterio técnico real.
          </h1>

          <p class="sub">
            Dinos qué equipo buscas y cuántas unidades requieres.
            Nuestro equipo lo gestiona desde la selección hasta la puesta en marcha.
          </p>

          <a href="https://calendly.com/ZIFCOR/llamada" target="_blank" class="calendly-card" rel="noopener">
            <div class="cal-inner">
              <div class="cal-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div class="cal-q">¿Prefieres que te llamemos?</div>
                <div class="cal-cta">Agenda una llamada gratuita →</div>
              </div>
            </div>
            <div class="cal-foot">
              <div class="av av1">JR</div>
              <div class="av av2">MC</div>
              <div class="av av3">SA</div>
              <div class="cal-team">Nuestro equipo te atiende</div>
            </div>
          </a>

        </div>

        <q-form ref="formRef" class="contact-form" :class="{ ready }" @submit.prevent="onSubmit">

          <div v-if="success" class="success-msg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            ¡Solicitud enviada! Te contactaremos pronto.
          </div>

          <div v-if="error" class="error-msg">{{ error }}</div>

          <div class="form-grid">
            <div class="field">
              <label class="label">Nombre de la empresa *</label>
              <q-input v-model="form.empresa" outlined dense class="inp" placeholder="Nova Industria S.A.S."
                :rules="[required]" />
            </div>
            <div class="field">
              <label class="label">NIT / ID fiscal *</label>
              <q-input v-model="form.nit" outlined dense class="inp" placeholder="900123456-7" :rules="[required]" />
            </div>
          </div>

          <div class="form-grid">
            <div class="field">
              <label class="label">Nombre de contacto *</label>
              <q-input v-model="form.contacto" outlined dense class="inp" placeholder="Nombre y apellido"
                :rules="[required]" />
            </div>
            <div class="field">
              <label class="label">Teléfono *</label>
              <q-input v-model="form.telefono" outlined dense class="inp" placeholder="+57 300 000 0000"
                :rules="[required]" />
            </div>
          </div>

          <div class="field">
            <label class="label">Correo corporativo *</label>
            <q-input v-model="form.correo" outlined dense class="inp" type="email" placeholder="nombre@empresa.com"
              :rules="[required, emailRule]" />
          </div>

          <div class="field">
            <label class="label">¿Qué maquinaria necesitas? *</label>
            <q-input v-model="form.maquinaria" outlined class="ta" type="textarea" autogrow
              placeholder="Describe el equipo o maquinaria que buscas, marca, modelo, capacidad, uso..."
              :rules="[required]" />
          </div>

          <div class="field">
            <label class="label">Adjuntar imagen de referencia (opcional)</label>
            <q-file v-model="form.imagen" outlined dense class="inp" accept="image/*" :max-files="5" multiple use-chips
              label="Subir imagen(es)">
              <template #prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>

          <div class="field">
            <label class="label">¿Cuántas unidades necesitas? *</label>
            <q-input v-model="form.unidades" outlined dense class="inp" type="number" min="1" placeholder="Ej: 2"
              :rules="[required, positivo]" />
          </div>

          <div class="form-footer">
            <q-checkbox v-model="form.aceptaDatos" class="chk">
              <span class="check-lbl">
                Acepto el tratamiento de mis datos según la
                <a href="/politica-privacidad" class="link">política de privacidad</a>
              </span>
            </q-checkbox>

            <q-btn unelevated type="submit" class="submit-btn" label="Enviar solicitud" icon-right="send"
              :loading="sending" :disable="!form.aceptaDatos" />
          </div>

        </q-form>

      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { publicApi } from '../../api/publicCatalog'

const ready = ref(false)
const sending = ref(false)
const success = ref(false)
const error = ref('')
const formRef = ref(null)

const form = ref({
  empresa: '',
  nit: '',
  contacto: '',
  telefono: '',
  correo: '',
  maquinaria: '',
  imagen: [],
  unidades: '',
  aceptaDatos: false,
})

const required = (v) => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'
const emailRule = (v) => {
  if (!v) return 'Campo obligatorio'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()) || 'Correo inválido'
}
const positivo = (v) => (!v || Number(v) >= 1) || 'Debe ser al menos 1'

async function onSubmit() {
  const ok = await formRef.value?.validate?.()
  if (!ok) return
  if (!form.value.aceptaDatos) return

  sending.value = true
  error.value = ''
  success.value = false

  try {
    await publicApi.enviarSolicitudMaquinaria({
      empresa: form.value.empresa,
      nit: form.value.nit,
      contacto: form.value.contacto,
      telefono: form.value.telefono,
      correo: form.value.correo,
      maquinaria: form.value.maquinaria,
      unidades: Number(form.value.unidades),
    })

    success.value = true
    form.value = {
      empresa: '',
      nit: '',
      contacto: '',
      telefono: '',
      correo: '',
      maquinaria: '',
      imagen: [],
      unidades: '',
      aceptaDatos: false,
    }
    await nextTick()
    formRef.value?.resetValidation()

  } catch (e) {
    error.value = 'Ocurrió un error al enviar la solicitud. Intenta de nuevo.'
  } finally {
    sending.value = false
  }
}

onMounted(() => requestAnimationFrame(() => (ready.value = true)))
</script>

<style scoped>
.page {
  background: #ffffff;
}

.projects {
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
  grid-template-columns: 1fr 1.15fr;
  gap: 64px;
  align-items: start;
}

.col-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.col-left.ready {
  opacity: 1;
  transform: translateY(0);
}

.h1 {
  margin: 0;
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 900;
  line-height: 1.13;
  letter-spacing: -0.5px;
  color: #0b1220;
}

.h1 span {
  color: var(--blue);
}

.sub {
  font-size: 15px;
  line-height: 1.72;
  color: rgba(11, 18, 32, 0.55);
}

.calendly-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px;
  border-radius: 16px;
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, 0.10);
  text-decoration: none;
  transition: border-color 220ms, box-shadow 220ms, transform 220ms;
  box-shadow: 0 2px 8px rgba(11, 18, 32, 0.06), 0 8px 24px rgba(11, 18, 32, 0.08);
}

.calendly-card:hover {
  border-color: rgba(0, 113, 227, 0.35);
  box-shadow: 0 4px 16px rgba(11, 18, 32, 0.08), 0 12px 32px rgba(0, 113, 227, 0.10);
  transform: translateY(-2px);
}

.cal-inner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.cal-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 11px;
  background: rgba(0, 113, 227, 0.08);
  border: 1px solid rgba(0, 113, 227, 0.18);
  display: grid;
  place-items: center;
  color: var(--blue);
}

.cal-q {
  font-size: 14.5px;
  font-weight: 800;
  color: #0b1220;
  margin-bottom: 4px;
}

.cal-cta {
  font-size: 13px;
  font-weight: 600;
  color: var(--blue);
}

.cal-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid rgba(11, 18, 32, 0.08);
}

.av {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 900;
  border: 2px solid #ffffff;
  margin-left: -8px;
  flex-shrink: 0;
}

.av:first-child {
  margin-left: 0;
}

.av1 {
  background: #0071e3;
  color: #fff;
}

.av2 {
  background: #fdda24;
  color: #0b1220;
}

.av3 {
  background: #22c55e;
  color: #fff;
}

.cal-team {
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, 0.42);
  margin-left: 4px;
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
}

.error-msg {
  padding: 14px 18px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.30);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
}

.contact-form {
  background: #ffffff;
  border: 1.5px solid rgba(11, 18, 32, 0.10);
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 2px 8px rgba(11, 18, 32, 0.05), 0 20px 56px rgba(11, 18, 32, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ease 80ms, transform 700ms ease 80ms;
}

.contact-form.ready {
  opacity: 1;
  transform: translateY(0);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
}

.inp :deep(.q-field__control),
.ta :deep(.q-field__control) {
  background: #ffffff !important;
  border-radius: 10px !important;
}

.inp :deep(.q-field--outlined .q-field__control:before),
.ta :deep(.q-field--outlined .q-field__control:before) {
  border: 1.5px solid rgba(11, 18, 32, 0.15) !important;
}

.inp :deep(.q-field--outlined .q-field__control:hover:before),
.ta :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(11, 18, 32, 0.28) !important;
}

.inp :deep(.q-field--outlined.q-field--focused .q-field__control:before),
.ta :deep(.q-field--outlined.q-field--focused .q-field__control:before) {
  border-color: var(--blue) !important;
}

.inp :deep(.q-field__native),
.ta :deep(textarea) {
  color: #0b1220 !important;
  font-size: 14px !important;
}

.inp :deep(.q-field__native::placeholder),
.ta :deep(textarea::placeholder) {
  color: rgba(11, 18, 32, 0.32) !important;
}

.ta :deep(textarea) {
  min-height: 100px !important;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 4px;
}

.check-lbl {
  font-size: 13px;
  color: rgba(11, 18, 32, 0.52);
  line-height: 1.5;
}

.link {
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
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

@media (max-width: 960px) {
  .bs-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 600px) {
  .projects {
    padding: 64px 0;
  }

  .contact-form {
    padding: 24px 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
