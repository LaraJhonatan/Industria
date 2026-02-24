<template>
  <section id="como-funciona" class="process" aria-label="Cómo funciona el proceso">
    <div class="bs-wrap">
      <div class="top" :class="{ ready }">
        <div class="kicker">PROCESO DE SUMINISTRO</div>

        <div class="headlineRow">
          <div class="headlineLeft">
            <h2 class="h2">
              Desde la selección hasta <span>la máquina operando</span>
            </h2>

            <p class="sub">
              Importamos maquinaria industrial de alto desempeño bajo criterios técnicos rigurosos.
              Gestionamos todo el proceso: desde la selección técnica hasta la instalación y puesta en marcha en tu
              planta.
              <br /><br />
              No es solo "traer una máquina": es integrarla inteligentemente a tu operación,
              dejándola funcionando según tus especificaciones productivas.
            </p>
          </div>

          <div class="headlineRight">
            <q-btn unelevated class="talkBtn" label="Solicitar cotización" icon-right="description" @click="onQuote" />
          </div>
        </div>
      </div>

      <div class="steps" :class="{ ready }">
        <article v-for="(s, idx) in steps" :key="s.key" class="step" :style="{
          '--a1': s.a1,
          '--a2': s.a2
        }">
          <div class="stepText">
            <h3 class="stepTitle">{{ s.title }}</h3>
            <p class="stepDesc">{{ s.desc }}</p>
          </div>

          <div class="arc" aria-hidden="true">
            <div class="arcFill" />
            <div class="arcBorder" />

            <div class="disc">
              <q-icon v-if="idx === 0" name="search" size="36px" class="icon" />
              <q-icon v-else-if="idx === 1" name="local_shipping" size="36px" class="icon" />
              <q-icon v-else-if="idx === 2" name="build" size="36px" class="icon" />
              <q-icon v-else name="rocket_launch" size="36px" class="icon" />
            </div>
          </div>
        </article>
      </div>

      <div class="note" :class="{ ready }">
        <div class="noteCard">
          <div class="noteTitle">Tiempos de entrega</div>
          <div class="noteText">
            El tiempo total desde orden hasta instalación varía según disponibilidad del fabricante y complejidad de
            instalación.
            Típicamente: <strong>12-16 semanas para importación</strong> + <strong>2-3 semanas para instalación</strong>
            y puesta en marcha.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ready = ref(false)

function onQuote() {
  router.push('/contacto')
}

const steps = ref([
  {
    key: 's1',
    title: 'Fase 1: Selección técnica',
    desc:
      'Analizamos tu proceso productivo, restricciones de planta y objetivo. Seleccionamos fabricantes, evaluamos especificaciones y presentamos propuesta técnica-comercial.',
    a1: 'rgba(0, 113, 227, 0.08)',
    a2: 'rgba(253, 218, 36, 0.04)'
  },
  {
    key: 's2',
    title: 'Fase 2: Gestión de importación',
    desc:
      'Negociamos con fabricantes internacionales, gestionamos trámites aduaneros, permisos, certificaciones y transporte hasta tu planta.',
    a1: 'rgba(253, 218, 36, 0.08)',
    a2: 'rgba(0, 113, 227, 0.04)'
  },
  {
    key: 's3',
    title: 'Fase 3: Instalación en planta',
    desc:
      'Montaje completo: cimentación, nivelación, conexiones eléctricas, neumáticas e hidráulicas. Verificación de precisión geométrica.',
    a1: 'rgba(0, 113, 227, 0.08)',
    a2: 'rgba(253, 218, 36, 0.06)'
  },
  {
    key: 's4',
    title: 'Fase 4: Puesta en marcha',
    desc:
      'Pruebas de funcionamiento, ajustes finos, capacitación de operadores y técnicos. Dejamos la máquina produciendo según especificaciones.',
    a1: 'rgba(253, 218, 36, 0.08)',
    a2: 'rgba(0, 113, 227, 0.06)'
  }
])

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})
</script>

<style scoped>
.bs-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.process {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 100px 0;
  color: #1b1b1b;
}

.top,
.steps,
.note {
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.top.ready,
.steps.ready,
.note.ready {
  opacity: 1;
  transform: translateY(0);
}

.kicker {
  display: inline-flex;
  width: fit-content;
  padding: 9px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1b1b1b;
  border: 2px solid rgba(0, 113, 227, 0.2);
  background: rgba(0, 113, 227, 0.08);
}

.headlineRow {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: start;
}

.h2 {
  margin: 0;
  font-weight: 900;
  letter-spacing: -0.6px;
  line-height: 1.1;
  font-size: clamp(32px, 3.5vw, 48px);
}

.h2 span {
  color: #0071e3;
}

.sub {
  margin: 16px 0 0;
  max-width: 86ch;
  color: rgba(27, 27, 27, 0.7);
  font-size: 16px;
  line-height: 1.7;
}

.talkBtn {
  height: 48px;
  border-radius: 999px;
  padding: 0 24px;
  font-weight: 900;
  color: #fff;
  background: #0071e3;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.talkBtn:hover {
  background: #0066cc;
}

.steps {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-radius: 16px;
  border: 2px solid rgba(27, 27, 27, 0.08);
  background: #fff;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  min-height: 340px;
}

.step:not(:first-child)::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 24px;
  bottom: 24px;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(180deg,
      rgba(0, 113, 227, 0.0),
      rgba(0, 113, 227, 0.3),
      rgba(253, 218, 36, 0.3),
      rgba(0, 0, 0, 0.0));
}

.stepTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: -0.2px;
  color: #1b1b1b;
}

.stepDesc {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.65);
  max-width: 42ch;
}

.arc {
  margin-top: auto;
  position: relative;
  height: 150px;
  border-radius: 220px 220px 0 0;
  overflow: hidden;
}

.arcFill {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 110% at 50% 15%, var(--a1), transparent 58%),
    radial-gradient(120% 110% at 50% 35%, var(--a2), transparent 62%);
}

.arcBorder {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 12px;
  bottom: -2px;
  border-radius: 220px 220px 0 0;
  border: 1px dashed rgba(27, 27, 27, 0.15);
  border-bottom: none;
}

.disc {
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 2px solid rgba(0, 113, 227, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.icon {
  color: #0071e3;
}

.note {
  margin-top: 32px;
}

.noteCard {
  border-radius: 16px;
  padding: 20px;
  border: 2px solid rgba(253, 218, 36, 0.3);
  background: rgba(253, 218, 36, 0.04);
}

.noteTitle {
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #1b1b1b;
  margin-bottom: 8px;
}

.noteText {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(27, 27, 27, 0.65);
}

.noteText strong {
  color: #0071e3;
  font-weight: 900;
}

@media (max-width: 1024px) {
  .headlineRow {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .step:not(:first-child)::before {
    display: none;
  }

  .step {
    border-top: 2px solid rgba(27, 27, 27, 0.06);
  }

  .step:nth-child(1),
  .step:nth-child(2) {
    border-top: none;
  }

  .step:nth-child(2),
  .step:nth-child(4) {
    border-left: 2px solid rgba(27, 27, 27, 0.06);
  }
}

@media (max-width: 640px) {
  .process {
    padding: 70px 0;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .step {
    min-height: 320px;
  }
}
</style>
