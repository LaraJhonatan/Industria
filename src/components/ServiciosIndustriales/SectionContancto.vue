<template>
  <q-page class="page">
    <section id="formulario-proyectos" class="projects" aria-label="Formulario de proyectos">
      <div class="bs-wrap">

        <!-- TOP -->
        <div class="top" :class="{ ready }">
          <div class="kicker">FORMULARIO DE PROYECTOS</div>
          <div class="headlineRow">
            <h1 class="h1">
              Manejamos <span>cualquier proyecto de ingeniería</span>, sin fórmulas rígidas.
            </h1>
            <q-btn unelevated class="talkBtn" label="Hablemos" icon-right="chat_bubble_outline" @click="onTalk" />
          </div>
          <p class="sub">
            Cuéntanos tu necesidad y lo aterrizamos con criterio técnico. Desde el diagnóstico hasta la implementación
            final.
          </p>
        </div>

        <!-- FORM -->
        <q-form ref="formRef" class="formWrap" @submit.prevent="onSubmit" :class="{ ready }">

          <!-- Fila A: Servicio + Empresa -->
          <div class="card">
            <div class="row-head">
              <span class="step">01</span>
              <div>
                <div class="cardTitle">Servicio y empresa</div>
                <div class="cardHint">Tipo de solicitud e información básica</div>
              </div>
            </div>
            <q-checkbox v-model="form.servicioIngenieria" label="Estás buscando el servicio de ingeniería y proyectos"
              class="chk mb12" />
            <div class="grid3">
              <div class="field">
                <div class="label">Nombre de la empresa</div>
                <q-input v-model="form.empresa" class="inp" outlined dense placeholder="Nova Industria S.A.S."
                  :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">NIT / ID fiscal</div>
                <q-input v-model="form.nit" class="inp" outlined dense placeholder="900123456-7" :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">Sector</div>
                <q-select v-model="form.sector" class="inp" outlined dense emit-value map-options
                  :options="sectorOptions" placeholder="Selecciona un sector" :rules="[required]" />
              </div>
            </div>
          </div>

          <!-- Fila B: Contacto -->
          <div class="card">
            <div class="row-head">
              <span class="step">02</span>
              <div>
                <div class="cardTitle">Persona de contacto</div>
                <div class="cardHint">A quién contactar para afinar el alcance</div>
              </div>
            </div>
            <div class="grid4">
              <div class="field">
                <div class="label">Nombre</div>
                <q-input v-model="form.contacto" class="inp" outlined dense placeholder="Nombre y apellido"
                  :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">Cargo</div>
                <q-input v-model="form.cargo" class="inp" outlined dense placeholder="Jefe de mantenimiento"
                  :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">Correo corporativo</div>
                <q-input v-model="form.correo" class="inp" outlined dense placeholder="nombre@empresa.com"
                  :rules="[required, emailRule]" />
              </div>
              <div class="field">
                <div class="label">Celular</div>
                <q-input v-model="form.celular" class="inp" outlined dense placeholder="+57 300 000 0000"
                  :rules="[required]" />
              </div>
            </div>
          </div>

          <!-- Fila C: Proyecto + Ejecución -->
          <div class="card">
            <div class="row-head">
              <span class="step">03</span>
              <div>
                <div class="cardTitle">Proyecto y tiempos</div>
                <div class="cardHint">Detalle, región, fecha y presupuesto</div>
              </div>
            </div>
            <div class="field mb12">
              <div class="label">Cuéntanos qué necesitas o qué problema buscas resolver.</div>
              <q-input v-model="form.detalle" class="ta" outlined type="textarea" autogrow :rules="[required]"
                @focus="clearExampleOnFocus" />
              <div class="tiny">Ej: "Proyecto de drones para cuidar bases aéreas de Colombia".</div>
            </div>
            <div class="grid3">
              <div class="field">
                <div class="label">Ciudad o región</div>
                <q-input v-model="form.region" class="inp" outlined dense placeholder="Bogotá / Antioquia / ..."
                  :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">Fecha estimada de inicio</div>
                <q-input v-model="form.fechaInicio" class="inp" outlined dense type="date" :rules="[required]" />
              </div>
              <div class="field">
                <div class="label">¿Tienes presupuesto aproximado?</div>
                <q-option-group v-model="form.presupuestoEstado" :options="budgetOptions" type="radio" inline
                  class="radios" />
              </div>
            </div>
            <div v-if="form.presupuestoEstado === 'si'" class="grid2 mt12">
              <div class="field">
                <div class="label">Presupuesto mínimo (COP)</div>
                <q-input v-model="form.presupuestoMin" class="inp" outlined dense type="number" min="0"
                  placeholder="20000000" :rules="[required, minPositive]" />
              </div>
              <div class="field">
                <div class="label">Presupuesto máximo (COP)</div>
                <q-input v-model="form.presupuestoMax" class="inp" outlined dense type="number" min="0"
                  placeholder="80000000" :rules="[required, maxGteMin]" />
              </div>
            </div>
          </div>

          <!-- Fila D: Adjuntos + Submit -->
          <div class="card">
            <div class="row-head">
              <span class="step">04</span>
              <div>
                <div class="cardTitle">Adjuntos y envío</div>
                <div class="cardHint">Documentos técnicos opcionales</div>
              </div>
            </div>

            <q-checkbox v-model="form.adjuntarDocs" label="¿Adjuntar documentos técnicos?" class="chk" />

            <div v-if="form.adjuntarDocs" class="grid3 mt12">
              <div class="field">
                <div class="label">Planos</div>
                <q-file v-model="form.planos" class="inp file" outlined dense multiple use-chips counter :max-files="10"
                  label="Subir planos" />
              </div>
              <div class="field">
                <div class="label">Especificaciones</div>
                <q-file v-model="form.especificaciones" class="inp file" outlined dense multiple use-chips counter
                  :max-files="10" label="Subir especificaciones" />
              </div>
              <div class="field">
                <div class="label">Fotos</div>
                <q-file v-model="form.fotos" class="inp file" outlined dense multiple use-chips counter accept="image/*"
                  :max-files="20" label="Subir fotos" />
              </div>
            </div>

            <div class="footer-row">
              <div class="footer-left">
                <div class="msg">
                  Te contactaremos en menos de <b>24 horas hábiles</b>.
                </div>
                <q-checkbox v-model="form.aceptaDatos" class="chk consent"
                  :rules="[(v) => v === true || 'Debes aceptar el tratamiento de datos personales']"
                  label="Acepto el tratamiento de datos personales." />
              </div>
              <q-btn unelevated class="submitBtn" label="Solicitar cotización" type="submit" :loading="sending" />
            </div>
          </div>

        </q-form>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ready = ref(false)
const sending = ref(false)
const formRef = ref(null)

const exampleText = 'Estamos buscando ayuda para nuestro proyecto de drones para cuidar bases aéreas de Colombia'

const form = ref({
  servicioIngenieria: false,
  empresa: '', nit: '', sector: null,
  contacto: '', cargo: '', correo: '', celular: '',
  detalle: exampleText,
  region: '', fechaInicio: '',
  presupuestoEstado: 'en_evaluacion', presupuestoMin: '', presupuestoMax: '',
  adjuntarDocs: false, planos: [], especificaciones: [], fotos: [],
  aceptaDatos: false,
})

const sectorOptions = [
  { label: 'Construcción', value: 'construccion' },
  { label: 'Industria', value: 'industria' },
  { label: 'Energía', value: 'energia' },
  { label: 'Educación/Universidades', value: 'educacion' },
  { label: 'Entidad pública', value: 'publica' },
  { label: 'Otro', value: 'otro' },
]

const budgetOptions = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
  { label: 'En evaluación', value: 'en_evaluacion' },
]

const required = (v) => (v !== null && v !== undefined && String(v).trim() !== '') || 'Campo obligatorio'
const emailRule = (v) => { if (!v) return 'Campo obligatorio'; return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()) || 'Correo inválido' }
const minPositive = (v) => { if (!v) return true; return Number(v) >= 0 || 'Debe ser un número válido' }
const maxGteMin = (v) => {
  const min = Number(form.value.presupuestoMin), max = Number(v)
  if (!form.value.presupuestoMin || !v) return true
  if (isNaN(min) || isNaN(max)) return 'Valores inválidos'
  return max >= min || 'El máximo debe ser ≥ al mínimo'
}

function clearExampleOnFocus() {
  if (form.value.detalle === exampleText) form.value.detalle = ''
}

function onTalk() {
  window.location.href = `mailto:comercial@novaindustria.co?subject=${encodeURIComponent('Hablemos: proyecto de ingeniería')}&body=Hola%2C%20quiero%20contarte%20un%20proyecto.%0A%0A`
}

async function onSubmit() {
  const ok = await formRef.value?.validate?.()
  if (!ok) return
  sending.value = true
  try {
    const to = 'comercial@novaindustria.co'
    const subject = `Solicitud de cotización — ${form.value.empresa || 'Proyecto'}`
    const lines = [
      'Servicio: Ingeniería y proyectos', '',
      `Empresa: ${form.value.empresa}`, `NIT: ${form.value.nit}`,
      `Sector: ${sectorOptions.find(x => x.value === form.value.sector)?.label || form.value.sector}`, '',
      `Contacto: ${form.value.contacto}`, `Cargo: ${form.value.cargo}`,
      `Correo: ${form.value.correo}`, `Celular: ${form.value.celular}`, '',
      'Detalle:', form.value.detalle, '',
      `Región: ${form.value.region}`, `Inicio: ${form.value.fechaInicio}`,
      `Presupuesto: ${budgetOptions.find(x => x.value === form.value.presupuestoEstado)?.label}`,
      form.value.presupuestoEstado === 'si' ? `Rango: ${form.value.presupuestoMin} - ${form.value.presupuestoMax} COP` : null,
    ].filter(Boolean)
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${lines.join('%0D%0A')}`
  } finally {
    setTimeout(() => { sending.value = false }, 400)
  }
}

onMounted(() => { requestAnimationFrame(() => { ready.value = true }) })
</script>

<style scoped>
.page {
  background: #fff;
}

.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.projects {
  padding: 72px 0 80px;
  color: #1b1b1b;
}

/* ── TOP ──────────────────────────────── */
.top,
.formWrap {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.top.ready,
.formWrap.ready {
  opacity: 1;
  transform: translateY(0);
}

.formWrap {
  transition-delay: 80ms;
}

.kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.07);
  border: 1.5px solid rgba(0, 113, 227, 0.2);
  margin-bottom: 16px;
}

.headlineRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.h1 {
  margin: 0;
  font-weight: 900;
  letter-spacing: -0.8px;
  line-height: 1.1;
  font-size: clamp(30px, 3.8vw, 52px);
  flex: 1;
  min-width: 0;
}

.h1 span {
  color: #0071e3;
}

.sub {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(27, 27, 27, 0.65);
  max-width: 80ch;
}

.talkBtn {
  height: 44px;
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
  background: #0071e3;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.28);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── FORM ─────────────────────────────── */
.formWrap {
  margin-top: 36px;
  display: grid;
  gap: 16px;
}

.card {
  border-radius: 16px;
  border: 2px solid rgba(27, 27, 27, 0.08);
  background: #fff;
  padding: 22px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.row-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(27, 27, 27, 0.06);
  margin-bottom: 16px;
}

.step {
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -1px;
  color: rgba(0, 113, 227, 0.15);
  line-height: 1;
  flex-shrink: 0;
}

.cardTitle {
  font-size: 15px;
  font-weight: 900;
  color: #1b1b1b;
}

.cardHint {
  font-size: 12.5px;
  color: rgba(27, 27, 27, 0.45);
  margin-top: 2px;
}

.label {
  margin-bottom: 7px;
  font-size: 13.5px;
  font-weight: 800;
  color: #1b1b1b;
}

.tiny {
  margin-top: 6px;
  font-size: 12.5px;
  color: rgba(27, 27, 27, 0.45);
}

.mb12 {
  margin-bottom: 12px;
}

.mt12 {
  margin-top: 12px;
}

.grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.grid4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.field {
  min-width: 0;
}

.radios {
  padding-top: 6px;
}

.chk {
  margin-top: 2px;
}

.consent {
  margin-top: 10px;
}

/* Footer row inside last card */
.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(27, 27, 27, 0.06);
}

.footer-left {
  flex: 1;
  min-width: 0;
}

.msg {
  font-size: 14px;
  color: rgba(27, 27, 27, 0.65);
}

.msg b {
  color: #0071e3;
  font-weight: 900;
}

.submitBtn {
  height: 48px;
  border-radius: 12px;
  padding: 0 28px;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
  background: #0071e3;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.28);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Quasar overrides ────────────────── */
.inp :deep(.q-field__control),
.ta :deep(.q-field__control),
.file:deep(.q-field__control) {
  background: rgba(27, 27, 27, 0.02) !important;
  border-radius: 10px !important;
}

.inp :deep(.q-field--outlined .q-field__control:before),
.ta :deep(.q-field--outlined .q-field__control:before),
.file:deep(.q-field--outlined .q-field__control:before) {
  border: 2px solid rgba(27, 27, 27, 0.12) !important;
}

.inp :deep(.q-field--outlined .q-field__control:hover:before),
.ta :deep(.q-field--outlined .q-field__control:hover:before),
.file:deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(27, 27, 27, 0.2) !important;
}

.inp :deep(.q-field--outlined.q-field--focused .q-field__control:before),
.ta :deep(.q-field--outlined.q-field--focused .q-field__control:before),
.file:deep(.q-field--outlined.q-field--focused .q-field__control:before) {
  border-color: #0071e3 !important;
}

.inp :deep(.q-field--outlined.q-field--focused .q-field__control),
.ta :deep(.q-field--outlined.q-field--focused .q-field__control),
.file:deep(.q-field--outlined.q-field--focused .q-field__control) {
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1) !important;
}

.inp :deep(.q-field__native),
.inp :deep(.q-field__input),
.ta :deep(.q-field__native),
.ta :deep(textarea),
.file:deep(.q-field__native),
.file:deep(.q-field__input) {
  color: #1b1b1b !important;
  caret-color: #0071e3 !important;
}

.inp :deep(.q-field__native::placeholder),
.inp :deep(.q-field__input::placeholder),
.ta :deep(textarea::placeholder) {
  color: rgba(27, 27, 27, 0.38) !important;
}

:deep(.q-checkbox__label),
:deep(.q-radio__label) {
  color: #1b1b1b !important;
}

/* ── Responsive ──────────────────────── */
@media (max-width: 1024px) {
  .grid4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid3 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .projects {
    padding: 56px 0 64px;
  }

  .grid4,
  .grid2 {
    grid-template-columns: 1fr;
  }

  .headlineRow {
    flex-direction: column;
  }

  .footer-row {
    flex-direction: column;
    align-items: stretch;
  }

  .submitBtn {
    width: 100%;
  }
}
</style>
