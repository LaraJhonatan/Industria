<template>
  <div class="plb-wrap">
    <div class="plb-inner">

      <div class="plb-left">
        <span class="plb-rocket" aria-hidden="true">🚀</span>
        <div class="plb-text">
          <span class="plb-eyebrow">PRE LANZAMIENTO</span>
          <span class="plb-title">Lanzamiento oficial en:</span>
          <span class="plb-sub">El software ya está disponible en versión BETA para nuestros primeros usuarios.</span>
        </div>
      </div>

      <div class="plb-countdown" role="timer" aria-live="polite" aria-label="Tiempo hasta el lanzamiento">
        <div class="plb-unit">
          <span class="plb-num">{{ pad(timeLeft.months) }}</span>
          <span class="plb-label">MESES</span>
        </div>
        <span class="plb-sep" aria-hidden="true">:</span>
        <div class="plb-unit">
          <span class="plb-num">{{ pad(timeLeft.days) }}</span>
          <span class="plb-label">DÍAS</span>
        </div>
        <span class="plb-sep" aria-hidden="true">:</span>
        <div class="plb-unit">
          <span class="plb-num">{{ pad(timeLeft.hours) }}</span>
          <span class="plb-label">HORAS</span>
        </div>
        <span class="plb-sep" aria-hidden="true">:</span>
        <div class="plb-unit">
          <span class="plb-num">{{ pad(timeLeft.minutes) }}</span>
          <span class="plb-label">MINUTOS</span>
        </div>
        <span class="plb-sep" aria-hidden="true">:</span>
        <div class="plb-unit">
          <span class="plb-num">{{ pad(timeLeft.seconds) }}</span>
          <span class="plb-label">SEGUNDOS</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'

const TARGET = new Date('2026-11-20T12:00:00')

const timeLeft = reactive({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
let ticker = null

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function calcTimeLeft() {
  const now = new Date()
  if (now >= TARGET) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  let months = (TARGET.getFullYear() - now.getFullYear()) * 12 + (TARGET.getMonth() - now.getMonth())

  const afterMonths = new Date(now)
  afterMonths.setMonth(afterMonths.getMonth() + months)
  if (afterMonths > TARGET) {
    months--
    afterMonths.setMonth(afterMonths.getMonth() - 1)
  }

  const diffMs = TARGET - afterMonths
  const totalSec = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  return { months, days, hours, minutes, seconds }
}

function tick() {
  const t = calcTimeLeft()
  timeLeft.months = t.months
  timeLeft.days = t.days
  timeLeft.hours = t.hours
  timeLeft.minutes = t.minutes
  timeLeft.seconds = t.seconds
}

onMounted(() => {
  tick()
  ticker = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  clearInterval(ticker)
})
</script>

<style scoped>

.plb-wrap {
  width: 100%;
  background: linear-gradient(100deg, #1648d4 0%, #0071e3 55%, #1a8fff 100%);
  position: relative;
  overflow: hidden;
  z-index: 9998;

}

.plb-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(110deg,
      transparent 0px,
      transparent 120px,
      rgba(255, 255, 255, 0.04) 120px,
      rgba(255, 255, 255, 0.04) 240px);
  pointer-events: none;
}

.plb-inner {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 5px 40px 5px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.plb-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.plb-rocket {
  font-size: 20px;
  line-height: 1;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.18));
  flex-shrink: 0;
}

.plb-text {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.plb-eyebrow {
  font-size: 8.5px;
  font-weight: 900;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1;
}

.plb-title {
  font-size: 13px;
  font-weight: 900;
  color: #fff;
  line-height: 1.15;
  white-space: nowrap;
}

.plb-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.62);
  white-space: nowrap;
  line-height: 1.3;
}

.plb-countdown {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.plb-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 36px;
}

.plb-num {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  background: rgba(0, 0, 0, 0.18);
  border-radius: 6px;
  padding: 3px 8px;
  min-width: 38px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.plb-label {
  font-size: 7.5px;
  font-weight: 900;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.plb-sep {
  font-size: 16px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 10px;

  flex-shrink: 0;
}

@media (max-width: 960px) {
  .plb-inner {
    flex-wrap: wrap;
    gap: 14px;
    padding: 6px 16px;
  }

  .plb-countdown {
    margin-left: 0;
    gap: 4px;
  }

  .plb-num {
    font-size: 20px;
    min-width: 40px;
    padding: 4px 8px;
  }

  .plb-sub {
    display: none;
  }
}

@media (max-width: 600px) {
  .plb-title {
    font-size: 13px;
  }

  .plb-num {
    font-size: 17px;
    min-width: 34px;
    padding: 3px 6px;
  }

  .plb-unit {
    min-width: 36px;
  }

  .plb-rocket {
    font-size: 22px;
  }
}
</style>
