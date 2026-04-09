<template>
  <div class="auth-page">

    <!-- HERO -->
    <div class="auth-hero">
      <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=1400&fit=crop&q=85"
        class="hero-bg" alt="" />
      <div class="hero-overlay" />
      <div class="hero-inner">
        <div class="hero-body">
          <h1 class="hero-title">Digitaliza y conecta<br /><em class="hero-em">tu empresa en un solo lugar</em></h1>
          <p class="hero-sub">Crea tu cuenta empresarial con validación segura y empieza a gestionar en minutos.</p>
          <ul class="hero-list">
            <li><span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>Validación con RUES, DIAN</li>
            <li><span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>Verificación de correo corporativo</li>
            <li><span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>+500 empresas registradas</li>
          </ul>
        </div>
        <div class="hero-foot">
          <span class="hero-cert"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>Registro 100% seguro y verificado</span>
          <div class="hero-partners"><span class="partner">DIAN</span><span class="partner">Cámara de Comercio</span>
          </div>
        </div>
      </div>
    </div>

    <!-- PANEL DERECHO -->
    <div class="auth-panel">
      <div class="auth-box">

        <!-- CABECERA -->
        <div class="panel-head">
          <div class="panel-brand">
            <router-link to="/"><img src="/IconoZ.png" alt="ZiFux" class="panel-logo" /></router-link>
            <div class="brand-sep" />
            <span class="brand-label">Portal empresarial</span>
          </div>
          <!-- Badge de modo mock visible solo en desarrollo -->
          <!-- <div v-if="mockActive" class="mock-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Mock activo · Bancolombia
          </div> -->
          <div class="tabs" v-if="reg.step < 5">
            <button class="tab" :class="{ 'tab--on': mode === 'login' }" @click="switchMode('login')">Iniciar
              sesión</button>
            <button class="tab" :class="{ 'tab--on': mode === 'register' }" @click="switchMode('register')">Registrar
              empresa</button>
          </div>
        </div>

        <!-- CONTENIDO DINÁMICO -->
        <div class="panel-body">

          <!-- ════ LOGIN ════ -->
          <template v-if="mode === 'login'">
            <div class="fh">
              <h2 class="fh-title">Iniciar sesión</h2>
              <p class="fh-sub">Entra a tu cuenta empresarial con seguridad</p>
            </div>

            <div v-if="loginErr" class="alert alert--err">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r=".6" fill="currentColor" />
              </svg>
              {{ loginErr }}
            </div>

            <div class="fg">
              <label class="fl">NIT o correo corporativo <span class="req">*</span></label>
              <div class="iw">
                <input v-model="login.id" class="fi" type="text" placeholder="900123456 o correo@empresa.com"
                  @keydown.enter="doLogin" @focus="loginErr = ''" />
                <svg class="fi-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div class="fg">
              <label class="fl">Contraseña <span class="req">*</span></label>
              <div class="iw">
                <input v-model="login.pw" class="fi" :type="showLP ? 'text' : 'password'" placeholder="Tu contraseña"
                  @keydown.enter="doLogin" @focus="loginErr = ''" />
                <button class="eye" type="button" @click="showLP = !showLP">
                  <svg v-if="!showLP" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
              <div style="text-align:right;margin-top:6px"><a href="#" class="tlink">¿Olvidaste tu contraseña?</a></div>
            </div>

            <button class="btn-p w-full" :class="{ loading: loginLoading }" @click="doLogin" :disabled="loginLoading">
              <span v-if="loginLoading" class="spinner" />
              <span v-else>Iniciar sesión y continuar →</span>
            </button>
            <p class="foot-txt">¿Aún no tienes cuenta? <button class="tlink tlink--b"
                @click="switchMode('register')">Regístrate</button></p>
          </template>

          <!-- ════ WIZARD ════ -->
          <template v-else>

            <!-- Stepper -->
            <div class="stepper" v-if="reg.step < 5">
              <div v-for="(s, i) in steps" :key="i" class="st"
                :class="{ 'st--done': reg.step > i + 1, 'st--on': reg.step === i + 1 }">
                <div class="st-dot">
                  <svg v-if="reg.step > i + 1" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span class="st-lbl">{{ s }}</span>
                <div v-if="i < steps.length - 1" class="st-line" :class="{ 'st-line--on': reg.step > i + 1 }" />
              </div>
            </div>

            <!-- PASO 1 — NIT -->
            <div v-if="reg.step === 1">
              <div class="fh">
                <h2 class="fh-title">Registra tu empresa</h2>
                <p class="fh-sub">Crea tu cuenta empresarial con validación segura</p>
              </div>

              <!-- Hint de mock -->
              <!-- <div v-if="mockActive" class="alert alert--mock">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Modo demo — usa cualquier NIT (ej: <strong>890903938</strong>) para cargar datos de Bancolombia
              </div> -->

              <div class="section-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                Identidad legal
              </div>
              <div v-if="reg.nitErr" class="alert alert--err">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r=".6" fill="currentColor" />
                </svg>
                {{ reg.nitErr }}
              </div>
              <div class="fg">
                <label class="fl">NIT de la empresa <span class="req">*</span></label>
                <div class="iw">
                  <input v-model="reg.nit" class="fi" type="text" placeholder="900 123 456"
                    @keydown.enter="consultarNIT" @input="reg.nitErr = ''" />
                  <svg class="fi-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <span class="fhint">Sin dígito de verificación</span>
              </div>
              <button class="btn-p w-full" :class="{ loading: reg.loading }" @click="consultarNIT"
                :disabled="reg.loading || !reg.nit">
                <span v-if="reg.loading" class="spinner" />
                <template v-else>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Consultar empresa
                </template>
              </button>
              <p class="foot-txt">¿Ya tienes cuenta? <button class="tlink tlink--b" @click="switchMode('login')">Iniciar
                  sesión</button></p>
            </div>

            <!-- PASO 2 — Empresa + RUT -->
            <div v-if="reg.step === 2">
              <div class="fh">
                <h2 class="fh-title">Empresa encontrada</h2>
                <p class="fh-sub">Verifica los datos y carga el RUT en PDF</p>
              </div>
              <div class="empresa-card">
                <div class="ec-head">
                  <div class="ec-avatar">{{ reg.empresa.razonSocial?.charAt(0) }}</div>
                  <div class="ec-info">
                    <p class="ec-name">{{ reg.empresa.razonSocial }}</p>
                    <span class="ec-badge"
                      :class="reg.empresa.estado === 'ACTIVA' ? 'ec-badge--ok' : 'ec-badge--warn'">{{
                        reg.empresa.estado }}</span>
                  </div>
                  <svg class="ec-ok" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div class="ec-grid">
                  <div class="ec-f">
                    <span class="ec-l">NIT</span>
                    <span class="ec-v">{{ reg.empresa.nit }}-{{ reg.empresa.dv }}</span>
                  </div>
                  <div class="ec-f">
                    <span class="ec-l">Estado</span>
                    <span class="ec-v">{{ reg.empresa.estado ?? '—' }}</span>
                  </div>
                  <div class="ec-f">
                    <span class="ec-l">Tipo de sociedad</span>
                    <span class="ec-v">{{ reg.empresa.tipoSociedad ?? '—' }}</span>
                  </div>
                  <div class="ec-f">
                    <span class="ec-l">Cámara de comercio</span>
                    <span class="ec-v">{{ reg.empresa.camara ?? '—' }}</span>
                  </div>
                  <div class="ec-f" style="grid-column: 1 / -1">
                    <span class="ec-l">Representante legal</span>
                    <span class="ec-v">{{ reg.empresa.representanteLegal ?? '—' }}</span>
                  </div>
                  <div class="ec-f" style="grid-column: 1 / -1">
                    <span class="ec-l">Tipo contribuyente</span>
                    <span class="ec-v">{{ reg.empresa.tipoContribuyente ?? '—' }}</span>
                  </div>
                </div>
              </div>

              <div class="section-tag mt-12">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Cargar RUT
              </div>

              <!-- Hint mock en paso 2 -->
              <div v-if="mockActive" class="alert alert--mock">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Demo — sube cualquier PDF, el RUT se validará automáticamente con datos de Bancolombia
              </div>

              <div v-if="reg.rutErr" class="alert alert--err">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r=".6" fill="currentColor" />
                </svg>
                {{ reg.rutErr }}
              </div>

              <div class="dropzone" :class="{ 'dz--has': reg.rutFile, 'dz--drag': reg.drag }"
                @click="!reg.rutFile && $refs.fi.click()" @dragover.prevent="reg.drag = true"
                @dragleave.prevent="reg.drag = false" @drop.prevent="onDrop">
                <input ref="fi" type="file" accept=".pdf" style="display:none" @change="onFile" />
                <template v-if="!reg.rutFile">
                  <svg class="dz-ico" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p class="dz-txt">Arrastra el PDF o <span class="dz-link">selecciona</span></p>
                  <p class="dz-hint">Solo archivos .pdf</p>
                </template>
                <template v-else>
                  <div class="dz-file">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <div>
                      <p class="dz-fn">{{ reg.rutFile.name }}</p>
                      <p class="dz-fs">{{ fmtBytes(reg.rutFile.size) }}</p>
                    </div>
                    <button class="dz-rm" @click.stop="reg.rutFile = null; reg.rutValidado = false">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </template>
              </div>

              <div v-if="reg.rutValidado" class="alert alert--ok mt-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                RUT validado. Correo: <strong>{{ reg.correoEnmascarado }}</strong>
              </div>

              <div class="btn-row mt-16">
                <button class="btn-g"
                  @click="reg.step = 1; reg.empresa = null; reg.rutFile = null; reg.rutValidado = false">←
                  Volver</button>
                <button v-if="!reg.rutValidado" class="btn-p" :class="{ loading: reg.loading }"
                  :disabled="!reg.rutFile || reg.loading" @click="validarRUT">
                  <span v-if="reg.loading" class="spinner" /><span v-else>Validar RUT</span>
                </button>
                <button v-else class="btn-p" @click="enviarCodigo">Continuar →</button>
              </div>
            </div>

            <!-- PASO 3 — OTP -->
            <div v-if="reg.step === 3">
              <div class="otp-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div class="fh">
                <h2 class="fh-title">Verifica tu correo</h2>
                <p class="fh-sub">Enviamos un código a <strong class="em-blue">{{ reg.correoEnmascarado }}</strong></p>
              </div>

              <!-- Hint mock en OTP -->
              <div v-if="mockActive" class="alert alert--mock">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Demo — ingresa cualquier código de 6 dígitos para continuar (ej: <strong>123456</strong>)
              </div>

              <div v-if="reg.otpErr" class="alert alert--err">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r=".6" fill="currentColor" />
                </svg>
                {{ reg.otpErr }}
              </div>
              <div v-if="reg.otpResent" class="alert alert--ok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Código reenviado. Revisa tu correo.
              </div>
              <div class="otp-group">
                <input v-for="(_, i) in 6" :key="i" :ref="el => { if (el) otpR[i] = el }" v-model="reg.otp[i]"
                  class="otp-box" type="text" maxlength="1" inputmode="numeric" @input="otpIn(i, $event)"
                  @keydown="otpKd(i, $event)" @paste="otpPaste($event)" @focus="reg.otpErr = ''" />
              </div>
              <button class="btn-p w-full" :class="{ loading: reg.loading }"
                :disabled="reg.otp.join('').length < 6 || reg.loading" @click="verificarOTP">
                <span v-if="reg.loading" class="spinner" /><span v-else>Verificar código</span>
              </button>
              <div class="resend-row">
                <span class="resend-txt">¿No recibiste el código?</span>
                <button class="tlink" @click="reenviarOTP">Reenviar</button>
              </div>
              <button class="btn-g w-full mt-8" @click="reg.step = 2">← Volver</button>
            </div>

            <!-- PASO 4 — Contraseña -->
            <div v-if="reg.step === 4">
              <div class="fh">
                <h2 class="fh-title">Crea tu contraseña</h2>
                <p class="fh-sub">Define una contraseña segura para tu empresa</p>
              </div>
              <div v-if="reg.passErr" class="alert alert--err">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r=".6" fill="currentColor" />
                </svg>
                {{ reg.passErr }}
              </div>
              <div class="fg">
                <label class="fl">Contraseña <span class="req">*</span></label>
                <div class="iw">
                  <input v-model="reg.pw" class="fi" :type="showP ? 'text' : 'password'"
                    placeholder="Mínimo 8 caracteres" @input="reg.passErr = ''" />
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
                <div v-if="reg.pw" class="strength-row">
                  <div class="sbars">
                    <div v-for="n in 4" :key="n" class="sbar" :class="pStrength >= n ? `sbar--${pLabel}` : ''" />
                  </div>
                  <span class="slabel" :class="`slabel--${pLabel}`">{{ pLabel }}</span>
                </div>
                <ul class="rules">
                  <li :class="{ ok: reg.pw.length >= 8 }"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>Mínimo 8 caracteres</li>
                  <li :class="{ ok: /[a-zA-Z]/.test(reg.pw) }"><svg width="10" height="10" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>Al menos una letra</li>
                  <li :class="{ ok: /\d/.test(reg.pw) }"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>Al menos un número</li>
                </ul>
              </div>
              <div class="fg">
                <label class="fl">Confirmar contraseña <span class="req">*</span></label>
                <div class="iw">
                  <input v-model="reg.pwc" class="fi" :type="showPC ? 'text' : 'password'"
                    placeholder="Repite la contraseña" @input="reg.passErr = ''" />
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
                <span v-if="reg.pwc && reg.pw !== reg.pwc" class="fhint fhint--err">Las contraseñas no coinciden</span>
              </div>
              <label class="checkbox-row">
                <input v-model="reg.acepta" type="checkbox" class="checkbox" />
                <span class="checkbox-lbl">Confirmo que represento legalmente a esta empresa <span
                    class="req">*</span></span>
              </label>
              <div class="info-tip mt-12">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r=".6" fill="currentColor" />
                </svg>
                Tu cuenta quedará asociada a esta empresa.
              </div>
              <button class="btn-p w-full mt-16" :class="{ loading: reg.loading }"
                :disabled="!pValid || !reg.acepta || reg.loading" @click="crearCuenta">
                <span v-if="reg.loading" class="spinner" />
                <template v-else>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
                  </svg>
                  Crear cuenta →
                </template>
              </button>
            </div>

            <!-- PASO 5 — Éxito -->
            <div v-if="reg.step === 5" class="success-block">
              <div class="success-ico">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 class="fh-title" style="text-align:center">¡Cuenta creada!</h2>
              <p class="fh-sub" style="text-align:center">Tu empresa <strong>{{ reg.empresa?.razonSocial }}</strong> ya
                tiene acceso
                al sistema.</p>
              <div class="success-detail">
                <div class="sd-row"><span class="sd-l">NIT</span><span class="sd-v">{{ reg.empresa?.nit }}-{{
                  reg.empresa?.dv
                    }}</span></div>
                <div class="sd-row"><span class="sd-l">Correo</span><span class="sd-v">{{ reg.correoEnmascarado
                }}</span></div>
              </div>
              <button class="btn-p w-full mt-16" @click="irAlLogin">Ir a iniciar sesión →</button>
            </div>

          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// ─── Stub de API: cuando el API real esté listo, reemplaza esto con:
// import api from '../api/axios'
// Con FORCE_MOCK = true este objeto nunca se invoca de todas formas.
const api = {
  post: async () => { throw new Error('API no disponible') },
  get: async () => { throw new Error('API no disponible') },
}

// ════════════════════════════════════════════════════════════════════
// MOCK DATA — Bancolombia
// Cambia FORCE_MOCK a false cuando el API real esté disponible.
// ════════════════════════════════════════════════════════════════════
const FORCE_MOCK = true   // ← pon en false para desactivar

const MOCK = {
  empresa: {
    nit: '890903938',
    dv: '8',
    razonSocial: 'BANCOLOMBIA S.A.',
    estado: 'ACTIVA',
    tipoSociedad: 'Sociedad Anónima',
    camara: 'Cámara de Comercio de Medellín',
    representanteLegal: 'JUAN CARLOS MORA URIBE',
    tipoContribuyente: 'Gran Contribuyente - Régimen Común',
  },
  correoEnmascarado: 'ge****@bancolombia.com.co',
  // Si quieres validar el código exacto, cámbialo aquí; null = acepta cualquiera
  otpSecreto: null,
}

// Indicador reactivo de si el mock está activo (para mostrar los hints en UI)
const mockActive = ref(FORCE_MOCK)

/**
 * tryApi(apiFn, mockFn)
 * Ejecuta apiFn (llamada al API real).
 * Si falla — por red, CORS, 4xx, 5xx — cae silenciosamente a mockFn.
 * Si FORCE_MOCK=true nunca llega al API real.
 */
async function tryApi(apiFn, mockFn) {
  if (FORCE_MOCK) {
    await delay(750)        // latencia realista
    mockActive.value = true
    return mockFn()
  }
  try {
    return await apiFn()
  } catch {
    await delay(750)
    mockActive.value = true
    return mockFn()
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

// ════════════════════════════════════════════════════════════════════
// Estado
// ════════════════════════════════════════════════════════════════════
const mode = ref('login')
const steps = ['Empresa', 'RUT', 'Verificar', 'Contraseña']

const login = reactive({ id: '', pw: '' })
const loginErr = ref('')
const loginLoading = ref(false)
const showLP = ref(false)

const reg = reactive({
  step: 1, nit: '', nitErr: '', empresa: null, loading: false,
  rutFile: null, rutErr: '', rutValidado: false, drag: false,
  correoEnmascarado: '',
  otp: ['', '', '', '', '', ''], otpErr: '', otpResent: false,
  pw: '', pwc: '', passErr: '', acepta: false,
})
const showP = ref(false)
const showPC = ref(false)
const otpR = ref([])

// ════════════════════════════════════════════════════════════════════
// Computeds
// ════════════════════════════════════════════════════════════════════
const pStrength = computed(() =>
  [reg.pw.length >= 8, /[a-zA-Z]/.test(reg.pw), /\d/.test(reg.pw), /[^a-zA-Z0-9]/.test(reg.pw)]
    .filter(Boolean).length
)
const pLabel = computed(() => (['', 'débil', 'regular', 'buena', 'fuerte'])[pStrength.value] ?? 'débil')
const pValid = computed(() =>
  reg.pw.length >= 8 && /[a-zA-Z]/.test(reg.pw) && /\d/.test(reg.pw) && reg.pw === reg.pwc
)

// ════════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════════
function fmtBytes(b) {
  if (b < 1024) return b + ' B'
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB'
  return (b / 1048576).toFixed(1) + ' MB'
}

function switchMode(m) {
  mode.value = m
  loginErr.value = ''
  if (m === 'register') Object.assign(reg, {
    step: 1, nit: '', nitErr: '', empresa: null, loading: false,
    rutFile: null, rutErr: '', rutValidado: false,
    correoEnmascarado: '',
    otp: ['', '', '', '', '', ''], otpErr: '', otpResent: false,
    pw: '', pwc: '', passErr: '', acepta: false,
  })
}

// ════════════════════════════════════════════════════════════════════
// LOGIN
// ════════════════════════════════════════════════════════════════════
async function doLogin() {
  loginErr.value = ''
  if (!login.id || !login.pw) { loginErr.value = 'Completa todos los campos.'; return }
  loginLoading.value = true
  try {
    const data = await tryApi(
      () => api.post('/auth/login', { identificador: login.id, password: login.pw }).then(r => r.data),
      () => ({
        token: 'mock-jwt-bancolombia',
        empresa: { ...MOCK.empresa },
      })
    )
    localStorage.setItem('zifux_sesion', JSON.stringify(data))
    // TODO: reemplaza el alert por tu router.push('/dashboard')
    alert(`✅ Bienvenido, ${data.empresa.razonSocial}`)
  } catch (err) {
    loginErr.value = err.message || 'NIT/correo o contraseña incorrectos.'
  } finally {
    loginLoading.value = false
  }
}

// ════════════════════════════════════════════════════════════════════
// PASO 1 — Consultar NIT
// ════════════════════════════════════════════════════════════════════
async function consultarNIT() {
  reg.nitErr = ''
  const n = reg.nit.trim().replace(/\D/g, '')
  if (!n) { reg.nitErr = 'Ingresa el NIT de la empresa.'; return }
  if (n.length < 6) { reg.nitErr = 'El NIT debe tener al menos 6 dígitos.'; return }
  reg.loading = true
  try {
    const data = await tryApi(
      () => api.post('/auth/empresas/consultar-nit', { nit: n }).then(r => r.data),
      () => ({ empresa: { ...MOCK.empresa } })
    )
    reg.empresa = { ...data.empresa }
    reg.step = 2
  } catch (err) {
    reg.nitErr = err.message || 'No encontramos una empresa con ese NIT.'
  } finally {
    reg.loading = false
  }
}

// ════════════════════════════════════════════════════════════════════
// PASO 2 — Dropzone + Validar RUT
// ════════════════════════════════════════════════════════════════════
function onFile(e) {
  const f = e.target.files?.[0]
  if (!f) return
  if (!f.name.toLowerCase().endsWith('.pdf')) { reg.rutErr = 'Solo se aceptan archivos PDF.'; return }
  reg.rutErr = ''; reg.rutFile = f; reg.rutValidado = false
}
function onDrop(e) {
  reg.drag = false
  const f = e.dataTransfer.files?.[0]
  if (!f) return
  if (!f.name.toLowerCase().endsWith('.pdf')) { reg.rutErr = 'Solo archivos PDF.'; return }
  reg.rutErr = ''; reg.rutFile = f; reg.rutValidado = false
}

async function validarRUT() {
  reg.rutErr = ''
  if (!reg.rutFile) return
  reg.loading = true
  try {
    const data = await tryApi(
      () => {
        const form = new FormData()
        form.append('nit', reg.empresa.nit)
        form.append('rut', reg.rutFile)
        return api.post('/auth/rut/validar', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(r => r.data)
      },
      () => ({ correoEnmascarado: MOCK.correoEnmascarado })
    )
    reg.correoEnmascarado = data.correoEnmascarado
    reg.rutValidado = true
  } catch (err) {
    reg.rutErr = err.message || 'No se pudo validar el RUT. Intenta de nuevo.'
  } finally {
    reg.loading = false
  }
}

// ════════════════════════════════════════════════════════════════════
// PASO 3 — OTP
// ════════════════════════════════════════════════════════════════════
async function enviarCodigo() {
  reg.loading = true
  try {
    await tryApi(
      () => api.post('/auth/enviar-codigo', { nit: reg.empresa.nit }),
      () => ({ ok: true })
    )
    reg.otp = ['', '', '', '', '', '']
    reg.otpErr = ''
    reg.otpResent = false
    reg.step = 3
  } catch (err) {
    reg.rutErr = err.message || 'Error al enviar el código.'
  } finally {
    reg.loading = false
  }
}

function otpIn(i, e) {
  const v = e.target.value.replace(/\D/g, '')
  reg.otp[i] = v.slice(-1)
  if (v && i < 5) otpR.value[i + 1]?.focus()
}
function otpKd(i, e) {
  if (e.key === 'Backspace' && !reg.otp[i] && i > 0) otpR.value[i - 1]?.focus()
}
function otpPaste(e) {
  e.preventDefault()
  const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  for (let i = 0; i < 6; i++) reg.otp[i] = t[i] ?? ''
}

async function verificarOTP() {
  reg.otpErr = ''
  const c = reg.otp.join('')
  if (c.length < 6) { reg.otpErr = 'Ingresa los 6 dígitos.'; return }
  reg.loading = true
  try {
    await tryApi(
      () => api.post('/auth/verificar-codigo', { nit: reg.empresa.nit, codigo: c }),
      () => {
        // Descomenta la siguiente línea para validar el código exacto del mock:
        // if (MOCK.otpSecreto && c !== MOCK.otpSecreto) throw new Error('Código incorrecto.')
        return { ok: true }
      }
    )
    reg.step = 4
  } catch (err) {
    reg.otpErr = err.message || 'Código incorrecto. Inténtalo de nuevo.'
  } finally {
    reg.loading = false
  }
}

async function reenviarOTP() {
  try {
    await tryApi(
      () => api.post('/auth/enviar-codigo', { nit: reg.empresa.nit }),
      () => ({ ok: true })
    )
    reg.otp = ['', '', '', '', '', '']
    reg.otpErr = ''
    reg.otpResent = true
    setTimeout(() => reg.otpResent = false, 4000)
  } catch (err) {
    reg.otpErr = err.message || 'Error al reenviar el código.'
  }
}

// ════════════════════════════════════════════════════════════════════
// PASO 4 — Crear cuenta
// ════════════════════════════════════════════════════════════════════
async function crearCuenta() {
  reg.passErr = ''
  if (!pValid.value) { reg.passErr = 'Revisa los requisitos de contraseña.'; return }
  if (!reg.acepta) { reg.passErr = 'Debes confirmar que representas a esta empresa.'; return }
  reg.loading = true
  try {
    await tryApi(
      () => api.post('/auth/crear-cuenta-empresa', {
        nit: reg.empresa.nit,
        password: reg.pw,
        aceptaRepresentacion: true,
      }),
      () => ({ ok: true })
    )
    reg.step = 5
  } catch (err) {
    reg.passErr = err.message || 'Error al crear la cuenta. Intenta de nuevo.'
  } finally {
    reg.loading = false
  }
}

function irAlLogin() {
  login.id = reg.empresa?.nit ?? ''
  login.pw = ''
  switchMode('login')
}
</script>

<style scoped>
/* ── PAGE SPLIT ─────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ── HERO ───────────────────────────── */
.auth-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(150deg, rgba(4, 8, 22, .90) 0%, rgba(4, 12, 30, .70) 60%, rgba(4, 12, 30, .55) 100%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 40px 44px;
}

.hero-body {
  padding-top: 60px;
}

.hero-title {
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.6px;
  line-height: 1.13;
  margin-bottom: 16px;
}

.hero-em {
  font-style: normal;
  color: #4f9cf9;
}

.hero-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, .68);
  line-height: 1.65;
  margin-bottom: 28px;
  max-width: 44ch;
}

.hero-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.hero-list li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, .82);
}

.chk {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(79, 156, 249, .18);
  border: 1.5px solid rgba(79, 156, 249, .4);
  display: grid;
  place-items: center;
  color: #4f9cf9;
  flex-shrink: 0;
}

.hero-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-cert {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: rgba(255, 255, 255, .55);
  font-weight: 600;
}

.hero-partners {
  display: flex;
  gap: 8px;
}

.partner {
  padding: 4px 11px;
  border-radius: 7px;
  background: rgba(255, 255, 255, .10);
  border: 1px solid rgba(255, 255, 255, .18);
  font-size: 11.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, .7);
  letter-spacing: .4px;
}

/* ── PANEL DERECHO ──────────────────── */
.auth-panel {
  background: #eef0f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  overflow-y: auto;
  min-height: 100vh;
}

.auth-box {
  width: 100%;
  max-width: 460px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, .09);
  box-shadow: 0 4px 32px rgba(0, 0, 0, .08), 0 1px 4px rgba(0, 0, 0, .04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Cabecera */
.panel-head {
  background: #fff;
  padding: 28px 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-bottom: 1px solid rgba(15, 23, 42, .07);
}

.panel-brand {
  display: flex;
  align-items: center;
  gap: 13px;
}

.panel-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.brand-sep {
  width: 1px;
  height: 22px;
  background: rgba(15, 23, 42, .16);
  flex-shrink: 0;
}

.brand-label {
  font-size: 11.5px;
  font-weight: 900;
  color: rgba(11, 18, 32, .42);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Badge de mock */
.mock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  background: rgba(234, 179, 8, .10);
  border: 1px solid rgba(234, 179, 8, .30);
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 800;
  color: #92400e;
  letter-spacing: .2px;
  align-self: flex-start;
}

/* Tabs */
.tabs {
  display: flex;
  background: #f1f3f7;
  border: 1px solid rgba(15, 23, 42, .08);
  border-radius: 11px;
  padding: 4px;
  gap: 3px;
}

.tab {
  flex: 1;
  height: 42px;
  border: none;
  background: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, .48);
  cursor: pointer;
  transition: all 200ms;
  font-family: inherit;
  letter-spacing: -.01em;
}

.tab--on {
  background: linear-gradient(135deg, #0071e3, #1a87ff);
  color: #fff;
  box-shadow: 0 3px 14px rgba(0, 113, 227, .3);
}

.tab:not(.tab--on):hover {
  background: rgba(0, 0, 0, .04);
  color: #0b1220;
}

/* Cuerpo */
.panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 28px 32px 32px;
  background: #fff;
}

/* ── FORMS ──────────────────────────── */
.fh {
  margin-bottom: 20px;
}

.fh-title {
  font-size: 22px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  margin-bottom: 5px;
}

.fh-sub {
  font-size: 14px;
  color: rgba(11, 18, 32, .55);
  line-height: 1.55;
}

.em-blue {
  color: #0071e3;
}

.fg {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.fl {
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
}

.req {
  color: #e74c3c;
}

.iw {
  position: relative;
}

.fi {
  width: 100%;
  height: 44px;
  padding: 0 38px 0 13px;
  border: 1.5px solid rgba(15, 23, 42, .12);
  border-radius: 10px;
  font-size: 14px;
  color: #0b1220;
  background: #fff;
  outline: none;
  font-family: inherit;
  transition: border-color 160ms, box-shadow 160ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.fi:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .11), 0 1px 3px rgba(0, 0, 0, .04);
}

.fi:hover:not(:focus) {
  border-color: rgba(15, 23, 42, .22);
}

.fi-ico {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(11, 18, 32, .3);
  pointer-events: none;
}

.eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(11, 18, 32, .38);
  padding: 0;
  display: grid;
  place-items: center;
  transition: color 140ms;
}

.eye:hover {
  color: #0b1220;
}

.fhint {
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
}

.fhint--err {
  color: #b91c1c;
  font-weight: 600;
}

/* ── Alerts ─────────────────────────── */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 11px 13px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 14px;
}

.alert--err {
  background: rgba(239, 68, 68, .07);
  border: 1px solid rgba(239, 68, 68, .2);
  color: #b91c1c;
}

.alert--ok {
  background: rgba(26, 171, 92, .07);
  border: 1px solid rgba(26, 171, 92, .22);
  color: #15803d;
}

/* Alert de mock/demo — amarillo suave */
.alert--mock {
  background: rgba(234, 179, 8, .08);
  border: 1px solid rgba(234, 179, 8, .28);
  color: #78350f;
}

.alert svg {
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Stepper ────────────────────────── */
.stepper {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}

.st {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.st:last-child {
  flex: 0;
}

.st-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
  background: rgba(15, 23, 42, .08);
  color: rgba(11, 18, 32, .45);
  transition: all 220ms;
}

.st--done .st-dot,
.st--on .st-dot {
  background: #0071e3;
  color: #fff;
}

.st--on .st-dot {
  box-shadow: 0 0 0 4px rgba(0, 113, 227, .16);
}

.st-lbl {
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .45);
  white-space: nowrap;
}

.st--on .st-lbl,
.st--done .st-lbl {
  color: #0071e3;
}

.st-line {
  flex: 1;
  height: 2px;
  background: rgba(15, 23, 42, .10);
  border-radius: 999px;
  margin: 0 6px;
  transition: background 300ms;
}

.st-line--on {
  background: #0071e3;
}

/* ── Section tag ────────────────────── */
.section-tag {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, .55);
  text-transform: uppercase;
  letter-spacing: .7px;
  margin-bottom: 12px;
}

.section-tag svg {
  color: #0071e3;
}

/* ── Empresa card ───────────────────── */
.empresa-card {
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, .09);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .05);
}

.ec-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(15, 23, 42, .07);
}

.ec-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0071e3, #4f9cf9);
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  flex-shrink: 0;
}

.ec-info {
  flex: 1;
  min-width: 0;
}

.ec-name {
  font-size: 14.5px;
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 4px;
}

.ec-badge {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .3px;
  text-transform: uppercase;
}

.ec-badge--ok {
  background: rgba(26, 171, 92, .10);
  color: #15803d;
  border: 1px solid rgba(26, 171, 92, .22);
}

.ec-badge--warn {
  background: rgba(239, 68, 68, .09);
  color: #b91c1c;
  border: 1px solid rgba(239, 68, 68, .2);
}

.ec-ok {
  color: #16a34a;
  flex-shrink: 0;
}

.ec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.ec-f {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(15, 23, 42, .06);
  border-right: 1px solid rgba(15, 23, 42, .06);
}

.ec-f:nth-child(2n) {
  border-right: none;
}

.ec-f:nth-last-child(-n+2) {
  border-bottom: none;
}

.ec-l {
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .42);
  text-transform: uppercase;
  letter-spacing: .5px;
}

.ec-v {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
}

/* ── Dropzone ───────────────────────── */
.dropzone {
  border: 2px dashed rgba(15, 23, 42, .17);
  border-radius: 12px;
  background: #fff;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  transition: all 160ms;
  text-align: center;
}

.dropzone:hover,
.dz--drag {
  border-color: #0071e3;
  background: rgba(0, 113, 227, .03);
}

.dz--has {
  cursor: default;
  padding: 16px 20px;
}

.dz-ico {
  color: rgba(11, 18, 32, .32);
}

.dz-txt {
  font-size: 14px;
  font-weight: 600;
  color: rgba(11, 18, 32, .6);
}

.dz-link {
  color: #0071e3;
  font-weight: 800;
}

.dz-hint {
  font-size: 12px;
  color: rgba(11, 18, 32, .38);
}

.dz-file {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.dz-fn {
  font-size: 13.5px;
  font-weight: 800;
  color: #0b1220;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dz-fs {
  font-size: 12px;
  color: rgba(11, 18, 32, .42);
}

.dz-rm {
  width: 28px;
  height: 28px;
  border: 1px solid rgba(15, 23, 42, .12);
  border-radius: 7px;
  background: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: rgba(11, 18, 32, .45);
  transition: all 140ms;
  margin-left: auto;
}

.dz-rm:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* ── OTP ────────────────────────────── */
.otp-icon {
  width: 52px;
  height: 52px;
  border-radius: 13px;
  background: rgba(0, 113, 227, .08);
  border: 1px solid rgba(0, 113, 227, .18);
  display: grid;
  place-items: center;
  color: #0071e3;
  margin-bottom: 14px;
}

.otp-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 10px 0 14px;
}

.otp-box {
  width: 48px;
  height: 58px;
  border: 1.5px solid rgba(15, 23, 42, .14);
  border-radius: 11px;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
  color: #0b1220;
  background: #fff;
  outline: none;
  font-family: inherit;
  transition: border-color 150ms, box-shadow 150ms;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .05);
}

.otp-box:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .13);
}

.resend-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.resend-txt {
  font-size: 13px;
  color: rgba(11, 18, 32, .52);
}

/* ── Password strength ──────────────── */
.strength-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.sbars {
  display: flex;
  gap: 4px;
  flex: 1;
}

.sbar {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: rgba(15, 23, 42, .10);
  transition: background 200ms;
}

.sbar--débil {
  background: #ef4444;
}

.sbar--regular {
  background: #f59e0b;
}

.sbar--buena {
  background: #3b82f6;
}

.sbar--fuerte {
  background: #22c55e;
}

.slabel {
  font-size: 11.5px;
  font-weight: 800;
  text-transform: capitalize;
}

.slabel--débil {
  color: #ef4444;
}

.slabel--regular {
  color: #f59e0b;
}

.slabel--buena {
  color: #3b82f6;
}

.slabel--fuerte {
  color: #22c55e;
}

.rules {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  margin-bottom: 4px;
}

.rules li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(11, 18, 32, .42);
  transition: color 200ms;
}

.rules li svg {
  opacity: .35;
  transition: opacity 200ms;
}

.rules li.ok {
  color: #16a34a;
}

.rules li.ok svg {
  opacity: 1;
}

/* ── Checkbox ───────────────────────── */
.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  margin-top: 4px;
}

.checkbox {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: #0071e3;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-lbl {
  font-size: 13px;
  font-weight: 600;
  color: rgba(11, 18, 32, .68);
  line-height: 1.5;
}

.info-tip {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  padding: 10px 13px;
  background: rgba(0, 113, 227, .05);
  border: 1px solid rgba(0, 113, 227, .15);
  border-radius: 9px;
  font-size: 12.5px;
  color: #0056b3;
  font-weight: 600;
  line-height: 1.5;
}

.info-tip svg {
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Success ────────────────────────── */
.success-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 0;
}

.success-ico {
  width: 68px;
  height: 68px;
  border-radius: 18px;
  background: rgba(26, 171, 92, .09);
  border: 2px solid rgba(26, 171, 92, .22);
  display: grid;
  place-items: center;
  color: #16a34a;
  margin-bottom: 18px;
}

.success-detail {
  width: 100%;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, .09);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 14px;
}

.sd-row {
  display: flex;
  justify-content: space-between;
  padding: 11px 16px;
  border-bottom: 1px solid rgba(15, 23, 42, .07);
}

.sd-row:last-child {
  border-bottom: none;
}

.sd-l {
  font-size: 13px;
  color: rgba(11, 18, 32, .48);
  font-weight: 600;
}

.sd-v {
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
}

/* ── Buttons ────────────────────────── */
.btn-p {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  background: linear-gradient(135deg, #0071e3, #1a87ff);
  color: #fff;
  border: none;
  border-radius: 11px;
  font-size: 14px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -.01em;
  transition: all 180ms;
  box-shadow: 0 3px 14px rgba(0, 113, 227, .28);
}

.btn-p:hover:not(:disabled) {
  background: linear-gradient(135deg, #005fcd, #0071e3);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 113, 227, .34);
}

.btn-p:active:not(:disabled) {
  transform: translateY(0);
}

.btn-p:disabled {
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-p.loading {
  opacity: .8;
  cursor: wait;
}

.btn-g {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 46px;
  padding: 0 18px;
  background: none;
  border: 1.5px solid rgba(15, 23, 42, .14);
  border-radius: 11px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(11, 18, 32, .62);
  cursor: pointer;
  font-family: inherit;
  transition: all 150ms;
}

.btn-g:hover {
  border-color: rgba(15, 23, 42, .26);
  color: #0b1220;
}

.w-full {
  width: 100%;
}

.btn-row {
  display: flex;
  gap: 10px;
}

.btn-row .btn-p {
  flex: 1;
}

.tlink {
  background: none;
  border: none;
  cursor: pointer;
  color: #0071e3;
  font-size: 13.5px;
  font-weight: 700;
  padding: 0;
  font-family: inherit;
  transition: opacity 140ms;
}

.tlink:hover {
  opacity: .75;
}

.tlink--b {
  font-weight: 800;
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, .35);
  border-top-color: #fff;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.foot-txt {
  text-align: center;
  font-size: 13.5px;
  color: rgba(11, 18, 32, .52);
  margin-top: 14px;
}

/* Espaciado */
.mt-8 {
  margin-top: 8px;
}

.mt-12 {
  margin-top: 12px;
}

.mt-16 {
  margin-top: 16px;
}

/* ── Responsive ─────────────────────── */
@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-hero {
    min-height: 200px;
    max-height: 240px;
  }

  .hero-body {
    padding-top: 20px;
  }

  .hero-sub,
  .hero-list {
    display: none;
  }

  .auth-panel {
    padding: 24px 16px;
  }

  .panel-head {
    padding: 22px 22px 16px;
  }

  .panel-body {
    padding: 22px 22px 28px;
  }
}

@media (max-width: 480px) {
  .ec-grid {
    grid-template-columns: 1fr;
  }

  .ec-f {
    border-right: none !important;
  }

  .ec-f:nth-last-child(-n+2) {
    border-bottom: 1px solid rgba(15, 23, 42, .06);
  }

  .ec-f:last-child {
    border-bottom: none;
  }

  .otp-box {
    width: 42px;
    height: 52px;
    font-size: 22px;
  }

  .otp-group {
    gap: 6px;
  }
}
</style>
