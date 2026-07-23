<template>
  <div class="auth-page">

    <div class="auth-hero">
      <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=1400&fit=crop&q=85"
        class="hero-bg" alt="" />
      <div class="hero-overlay" />
      <div class="hero-inner">

        <div class="hero-top">
          <router-link to="/" class="hero-logo-link" aria-label="Volver al inicio">
            <img src="/IconoZ.png" alt="ZIFCOR" class="hero-logo" />
          </router-link>
        </div>

        <div class="hero-body">
          <h1 class="hero-title">
            Digitaliza y conecta<br />
            tu empresa en<br />
            <em class="hero-em">un solo lugar</em>
          </h1>
          <p class="hero-sub">Crea tu cuenta empresarial con validación segura y empieza a gestionar en minutos.</p>
          <ul class="hero-list">
            <li>
              <span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>
              Validación con RUES, DIAN y Cámara de Comercio
            </li>
            <li>
              <span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>
              Verificación de correo corporativo
            </li>
            <li>
              <span class="chk"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg></span>
              Plataforma B2B industrial colombiana
            </li>
          </ul>
        </div>

        <div class="hero-stats">
          <div class="hs-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <div class="hs-val">Gratis</div>
            <div class="hs-lbl">Registro sin costo</div>
          </div>
          <div class="hs-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div class="hs-val">100%</div>
            <div class="hs-lbl">Seguro y verificado</div>
          </div>
          <div class="hs-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div class="hs-val">24/7</div>
            <div class="hs-lbl">Plataforma disponible</div>
          </div>
          <div class="hs-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div class="hs-val">Conecta</div>
            <div class="hs-lbl">Con proveedores calificados</div>
          </div>
        </div>

        <div class="hero-foot">
          <span class="hero-cert">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Registro 100% seguro y verificado
          </span>
          <div class="hero-partners">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Dian_%28Colombia%29_logo.svg" alt="DIAN"
              class="partner-logo" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/22/C%C3%A1mara_de_Comercio_de_Bogot%C3%A1_logo.svg"
              alt="Cámara de Comercio" class="partner-logo" />
          </div>
        </div>

      </div>
    </div>

    <div class="auth-panel">
      <div class="auth-box">

        <div class="panel-head">
          <div class="panel-brand">
            <router-link to="/"><img src="/IconoZ.png" alt="ZIFCOR" class="panel-logo" /></router-link>
            <div class="brand-sep" />
            <span class="brand-label">Portal empresarial</span>
          </div>
        </div>

        <div class="panel-body">

          <template v-if="vista === 'selector'">
            <div class="fh fh--center">
              <div class="selector-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h2 class="fh-title">¿Qué deseas hacer hoy?</h2>
              <p class="fh-sub">Elige cómo quieres acceder a la plataforma</p>
            </div>

            <div class="type-grid">
              <button class="type-card" @click="vista = 'usuario'">
                <div class="tc-ico tc-ico--blue">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 class="tc-title">Soy usuario</h3>
                <p class="tc-desc">Quiero comprar, cotizar o buscar proveedores.</p>
                <span class="tc-btn tc-btn--blue">Acceder como usuario →</span>
              </button>

              <button class="type-card" @click="vista = 'empresa-selector'">
                <div class="tc-ico tc-ico--green">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h3 class="tc-title">Soy empresa</h3>
                <p class="tc-desc">Quiero vender, publicar productos o servicios y conectar con clientes.</p>
                <span class="tc-btn tc-btn--green">Acceder como empresa →</span>
              </button>
            </div>

            <div class="or-row">
              <div class="or-line" />
              <span class="or-txt">o</span>
              <div class="or-line" />
            </div>

            <button class="quick-login-btn" @click="vista = 'empresa-selector'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Iniciar sesión — si ya tienes cuenta
            </button>

            <div class="type-info-row">
              <div class="ti-col">
                <div class="ti-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p class="ti-title">Para usuarios</p>
                  <p class="ti-desc">Accede para comprar, cotizar, guardar favoritos y contactar empresas verificadas.
                  </p>
                  <button class="tlink" @click="vista = 'usuario'">Más información →</button>
                </div>
              </div>
              <div class="ti-divider" />
              <div class="ti-col">
                <div class="ti-ico ti-ico--green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <p class="ti-title">Para empresas</p>
                  <p class="ti-desc">Crea tu cuenta empresarial y empieza a vender tus productos y servicios
                    industriales.</p>
                  <button class="tlink" @click="vista = 'empresa-selector'">Más información →</button>
                </div>
              </div>
            </div>
          </template>

          <template v-if="vista === 'usuario'">
            <button class="back-btn" @click="vista = 'selector'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Volver
            </button>

            <div class="fh">
              <div class="user-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Acceso de usuarios
              </div>
              <h2 class="fh-title">Accede con tu cuenta</h2>
              <p class="fh-sub">Usa tu cuenta de Google para entrar a la plataforma de forma rápida y segura.</p>
            </div>

            <div v-if="userErr" class="alert alert--err">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r=".6" fill="currentColor" />
              </svg>
              {{ userErr }}
            </div>

            <button class="google-btn" :class="{ loading: userLoading }" @click="loginConGoogle"
              :disabled="userLoading">
              <span v-if="userLoading" class="spinner spinner--dark" />
              <template v-else>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4" />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853" />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05" />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335" />
                </svg>
                Continuar con Google
              </template>
            </button>

            <div class="gmail-info">
              <div class="gi-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Inicio de sesión seguro con OAuth 2.0 de Google</span>
              </div>
              <div class="gi-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Acceso en segundos, sin necesidad de contraseña</span>
              </div>
              <div class="gi-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Solo usamos tu nombre, foto y correo de Google</span>
              </div>
            </div>

            <div class="or-row or-row--sm">
              <div class="or-line" />
              <span class="or-txt">¿Eres empresa?</span>
              <div class="or-line" />
            </div>

            <button class="empresa-link-btn" @click="vista = 'empresa-selector'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Acceder como empresa con NIT
            </button>
          </template>

          <template v-if="vista === 'empresa-selector'">
            <button class="back-btn" @click="vista = 'selector'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Volver
            </button>

            <div class="fh">
              <div class="user-badge user-badge--green">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Portal empresarial
              </div>
              <h2 class="fh-title">Acceso de empresas</h2>
              <p class="fh-sub">Elige si ya tienes cuenta o quieres registrar tu empresa.</p>
            </div>

            <div class="tabs">
              <button class="tab" :class="{ 'tab--on': modeEmpresa === 'login' }" @click="modeEmpresa = 'login'">
                Iniciar sesión
              </button>
              <button class="tab" :class="{ 'tab--on': modeEmpresa === 'register' }" @click="switchToRegister">
                Registrar empresa
              </button>
            </div>

            <div v-if="modeEmpresa === 'login'" style="margin-top: 20px">
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
                    @keydown.enter="doLogin" />
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
                    @keydown.enter="doLogin" />
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
                <div style="text-align:right;margin-top:6px">
                  <button type="button" class="tlink" @click.prevent="() => { }">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              <button class="btn-p w-full" :class="{ loading: loginLoading }" @click="doLogin" :disabled="loginLoading">
                <span v-if="loginLoading" class="spinner" />
                <span v-else>Iniciar sesión →</span>
              </button>
              <p class="foot-txt">¿Aún no tienes cuenta?
                <button class="tlink tlink--b" @click="switchToRegister">Regístrate</button>
              </p>
            </div>

            <div v-if="modeEmpresa === 'register'" style="margin-top: 20px">
              <div class="stepper">
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

              <div v-if="reg.step === 1">
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
                <p class="foot-txt">¿Ya tienes cuenta?
                  <button class="tlink tlink--b" @click="modeEmpresa = 'login'">Iniciar sesión</button>
                </p>
              </div>

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
                        :class="reg.empresa.estado === 'ACTIVA' ? 'ec-badge--ok' : 'ec-badge--warn'">
                        {{ reg.empresa.estado }}
                      </span>
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
                    <p class="dz-hint">Solo archivos .pdf · Máx. 5 MB</p>
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
                    @click="reg.step = 1; reg.empresa = null; reg.rutFile = null; reg.rutValidado = false">
                    ← Volver
                  </button>
                  <button v-if="!reg.rutValidado" class="btn-p" :class="{ loading: reg.loading }"
                    :disabled="!reg.rutFile || reg.loading" @click="validarRUT">
                    <span v-if="reg.loading" class="spinner" />
                    <span v-else>Validar RUT</span>
                  </button>
                  <button v-else class="btn-p" @click="enviarCodigo">Continuar →</button>
                </div>
              </div>

              <div v-if="reg.step === 3">
                <div class="otp-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div class="fh">
                  <h2 class="fh-title">Verifica tu correo</h2>
                  <p class="fh-sub">Enviamos un código a <strong class="em-blue">{{ reg.correoEnmascarado }}</strong>
                  </p>
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
                  <span v-if="reg.loading" class="spinner" />
                  <span v-else>Verificar código</span>
                </button>
                <div class="resend-row">
                  <span class="resend-txt">¿No recibiste el código?</span>
                  <button class="tlink" @click="reenviarOTP">Reenviar</button>
                </div>
                <button class="btn-g w-full mt-8" @click="reg.step = 2">← Volver</button>
              </div>

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
                    <li :class="{ ok: reg.pw.length >= 8 }">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>Mínimo 8 caracteres
                    </li>
                    <li :class="{ ok: /[a-zA-Z]/.test(reg.pw) }">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>Al menos una letra
                    </li>
                    <li :class="{ ok: /\d/.test(reg.pw) }">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>Al menos un número
                    </li>
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
                  <span v-if="reg.pwc && reg.pw !== reg.pwc" class="fhint fhint--err">
                    Las contraseñas no coinciden
                  </span>
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

              <div v-if="reg.step === 5" class="success-block">
                <div class="success-ico">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 class="fh-title" style="text-align:center">¡Cuenta creada!</h2>
                <p class="fh-sub" style="text-align:center">
                  Tu empresa <strong>{{ reg.empresa?.razonSocial }}</strong> ya tiene acceso al sistema.
                </p>
                <div class="success-detail">
                  <div class="sd-row">
                    <span class="sd-l">NIT</span>
                    <span class="sd-v">{{ reg.empresa?.nit }}-{{ reg.empresa?.dv }}</span>
                  </div>
                  <div class="sd-row">
                    <span class="sd-l">Correo</span>
                    <span class="sd-v">{{ reg.correoEnmascarado }}</span>
                  </div>
                </div>
                <button class="btn-p w-full mt-16" @click="irAlLogin">Ir a iniciar sesión →</button>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
})

api.interceptors.request.use(config => {
  const sesion = localStorage.getItem('ZIFCOR_sesion')
  if (sesion) {
    try {
      const { accessToken } = JSON.parse(sesion)
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    } catch { void 0 }
  }
  return config
})

function getError(err, fallback = 'Ocurrió un error. Intenta de nuevo.') {
  const d = err?.response?.data
  if (!d) return fallback
  if (d.motivo) return d.motivo
  if (typeof d.message === 'string') return d.message
  if (Array.isArray(d.message) && d.message.length) return d.message[0]
  return fallback
}

const vista = ref('selector')
const modeEmpresa = ref('login')

const login = reactive({ id: '', pw: '' })
const loginErr = ref('')
const loginLoading = ref(false)
const showLP = ref(false)

const userErr = ref('')
const userLoading = ref(false)

const steps = ['Empresa', 'RUT', 'Verificar', 'Contraseña']
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

const pStrength = computed(() =>
  [reg.pw.length >= 8, /[a-zA-Z]/.test(reg.pw), /\d/.test(reg.pw), /[^a-zA-Z0-9]/.test(reg.pw)]
    .filter(Boolean).length
)
const pLabel = computed(() => (['', 'débil', 'regular', 'buena', 'fuerte'])[pStrength.value] ?? 'débil')
const pValid = computed(() =>
  reg.pw.length >= 8 && /[a-zA-Z]/.test(reg.pw) && /\d/.test(reg.pw) && reg.pw === reg.pwc
)

function fmtBytes(b) {
  if (b < 1024) return b + ' B'
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB'
  return (b / 1048576).toFixed(1) + ' MB'
}

function switchToRegister() {
  modeEmpresa.value = 'register'
  Object.assign(reg, {
    step: 1, nit: '', nitErr: '', empresa: null, loading: false,
    rutFile: null, rutErr: '', rutValidado: false,
    correoEnmascarado: '',
    otp: ['', '', '', '', '', ''], otpErr: '', otpResent: false,
    pw: '', pwc: '', passErr: '', acepta: false,
  })
}

async function doLogin() {
  if (loginLoading.value) return
  loginErr.value = ''
  loginLoading.value = true
  try {
    await authStore.login(login.id, login.pw)
    await router.push('/dashboard')
  } catch (err) {
    loginErr.value = getError(err)
  } finally {
    loginLoading.value = false
  }
}

async function loginConGoogle() {
  if (userLoading.value) return
  userLoading.value = true
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`
}

async function consultarNIT() {
  reg.nitErr = ''
  const n = reg.nit.trim().replace(/\D/g, '')
  if (!n) { reg.nitErr = 'Ingresa el NIT de la empresa.'; return }
  if (n.length < 6) { reg.nitErr = 'El NIT debe tener al menos 6 dígitos.'; return }
  reg.loading = true
  try {
    const { data } = await api.post('/auth/empresas/consultar-nit', { nit: n })
    reg.empresa = { ...data.empresa }
    reg.step = 2
  } catch (err) {
    reg.nitErr = getError(err, 'No encontramos una empresa con ese NIT.')
  } finally {
    reg.loading = false
  }
}

function onFile(e) {
  const f = e.target.files?.[0]
  if (!f) return
  if (!f.name.toLowerCase().endsWith('.pdf')) { reg.rutErr = 'Solo se aceptan archivos PDF.'; return }
  if (f.size > 5 * 1024 * 1024) { reg.rutErr = 'El archivo supera el límite de 5 MB.'; return }
  reg.rutErr = ''; reg.rutFile = f; reg.rutValidado = false
}

function onDrop(e) {
  reg.drag = false
  const f = e.dataTransfer.files?.[0]
  if (!f) return
  if (!f.name.toLowerCase().endsWith('.pdf')) { reg.rutErr = 'Solo archivos PDF.'; return }
  if (f.size > 5 * 1024 * 1024) { reg.rutErr = 'El archivo supera el límite de 5 MB.'; return }
  reg.rutErr = ''; reg.rutFile = f; reg.rutValidado = false
}

async function validarRUT() {
  reg.rutErr = ''
  if (!reg.rutFile) return
  reg.loading = true
  try {
    const form = new FormData()
    form.append('nit', reg.empresa.nit)
    form.append('rut', reg.rutFile)
    const { data } = await api.post('/auth/rut/validar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    reg.correoEnmascarado = data.correoEnmascarado
    reg.rutValidado = true
  } catch (err) {
    reg.rutErr = getError(err, 'No se pudo validar el RUT. Intenta de nuevo.')
  } finally {
    reg.loading = false
  }
}

async function enviarCodigo() {
  reg.loading = true
  try {
    await api.post('/auth/enviar-codigo', { nit: reg.empresa.nit })
    reg.otp = ['', '', '', '', '', '']
    reg.otpErr = ''
    reg.otpResent = false
    reg.step = 3
  } catch (err) {
    reg.rutErr = getError(err, 'Error al enviar el código. Intenta de nuevo.')
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
    await api.post('/auth/verificar-codigo', { nit: reg.empresa.nit, codigo: c })
    reg.step = 4
  } catch (err) {
    reg.otpErr = getError(err, 'Código incorrecto. Inténtalo de nuevo.')
  } finally {
    reg.loading = false
  }
}

async function reenviarOTP() {
  try {
    await api.post('/auth/enviar-codigo', { nit: reg.empresa.nit })
    reg.otp = ['', '', '', '', '', '']
    reg.otpErr = ''
    reg.otpResent = true
    setTimeout(() => { reg.otpResent = false }, 4000)
  } catch (err) {
    reg.otpErr = getError(err, 'Error al reenviar el código.')
  }
}

async function crearCuenta() {
  reg.passErr = ''
  if (!pValid.value) { reg.passErr = 'Revisa los requisitos de contraseña.'; return }
  if (!reg.acepta) { reg.passErr = 'Debes confirmar que representas a esta empresa.'; return }
  reg.loading = true
  try {
    await api.post('/auth/crear-cuenta-empresa', {
      nit: reg.empresa.nit,
      password: reg.pw,
      aceptaRepresentacion: true,
    })
    reg.step = 5
  } catch (err) {
    reg.passErr = getError(err, 'Error al crear la cuenta. Intenta de nuevo.')
  } finally {
    reg.loading = false
  }
}

function irAlLogin() {
  login.id = reg.empresa?.nit ?? ''
  login.pw = ''
  modeEmpresa.value = 'login'
  vista.value = 'empresa-selector'
  loginErr.value = ''
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

.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

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
  background: linear-gradient(150deg, rgba(2, 6, 20, .92) 0%, rgba(4, 12, 34, .82) 50%, rgba(4, 12, 30, .65) 100%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 36px 44px 32px;
}

.hero-logo-link {
  display: inline-flex;
  cursor: pointer;
}

.hero-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  transition: opacity 160ms;
}

.hero-logo-link:hover .hero-logo {
  opacity: 0.8;
}

.hero-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 0 24px;
}

.hero-title {
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.8px;
  line-height: 1.12;
  margin-bottom: 16px;
}

.hero-em {
  font-style: normal;
  color: #4f9cf9;
}

.hero-sub {
  font-size: 14.5px;
  color: rgba(255, 255, 255, .65);
  line-height: 1.65;
  margin-bottom: 24px;
  max-width: 42ch;
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

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, .10);
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 24px;
}

.hs-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, .06);
  color: #4f9cf9;
}

.hs-item svg {
  opacity: .8;
  margin-bottom: 4px;
}

.hs-val {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.hs-lbl {
  font-size: 11px;
  color: rgba(255, 255, 255, .50);
  font-weight: 600;
  line-height: 1.3;
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
  color: rgba(255, 255, 255, .50);
  font-weight: 600;
}

.hero-partners {
  display: flex;
  align-items: center;
  gap: 16px;
}

.partner-logo {
  height: 24px;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  opacity: .85;
  filter: brightness(1.2) saturate(0) contrast(0.1) brightness(10);
}

.partner-logo:last-child {
  height: 36px;
  max-width: 130px;
}

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
  max-width: 480px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, .09);
  box-shadow: 0 4px 32px rgba(0, 0, 0, .08), 0 1px 4px rgba(0, 0, 0, .04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-head {
  background: #fff;
  padding: 24px 28px 20px;
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

.panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 28px 28px;
  background: #fff;
}

.fh--center {
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.selector-ico {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(0, 113, 227, .07);
  border: 1px solid rgba(0, 113, 227, .16);
  display: grid;
  place-items: center;
  color: #0071e3;
  margin-bottom: 12px;
}

.type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 14px 16px;
  border: 1.5px solid rgba(15, 23, 42, .10);
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 180ms;
  gap: 8px;
  font-family: inherit;
}

.type-card:hover {
  border-color: #0071e3;
  box-shadow: 0 4px 18px rgba(0, 113, 227, .12);
  transform: translateY(-2px);
}

.tc-ico {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  margin-bottom: 4px;
}

.tc-ico--blue {
  background: rgba(0, 113, 227, .08);
  border: 1px solid rgba(0, 113, 227, .16);
  color: #0071e3;
}

.tc-ico--green {
  background: rgba(22, 163, 74, .08);
  border: 1px solid rgba(22, 163, 74, .18);
  color: #16a34a;
}

.tc-title {
  font-size: 15px;
  font-weight: 900;
  color: #0b1220;
}

.tc-desc {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .55);
  line-height: 1.5;
  flex: 1;
}

.tc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 800;
  width: 100%;
}

.tc-btn--blue {
  background: linear-gradient(135deg, #0071e3, #1a87ff);
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 113, 227, .25);
}

.tc-btn--green {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: #fff;
  box-shadow: 0 2px 10px rgba(22, 163, 74, .25);
}

.or-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.or-row--sm {
  margin: 14px 0 10px;
}

.or-line {
  flex: 1;
  height: 1px;
  background: rgba(15, 23, 42, .09);
}

.or-txt {
  font-size: 12px;
  font-weight: 700;
  color: rgba(11, 18, 32, .38);
  white-space: nowrap;
}

.quick-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border: 1.5px solid rgba(15, 23, 42, .12);
  border-radius: 11px;
  background: none;
  font-size: 13.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .62);
  cursor: pointer;
  font-family: inherit;
  transition: all 150ms;
  margin-bottom: 16px;
}

.quick-login-btn:hover {
  border-color: rgba(15, 23, 42, .24);
  color: #0b1220;
}

.type-info-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  padding: 14px 0 0;
  border-top: 1px solid rgba(15, 23, 42, .07);
}

.ti-divider {
  width: 1px;
  background: rgba(15, 23, 42, .08);
  align-self: stretch;
}

.ti-col {
  display: flex;
  gap: 10px;
}

.ti-ico {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: rgba(0, 113, 227, .07);
  border: 1px solid rgba(0, 113, 227, .14);
  display: grid;
  place-items: center;
  color: #0071e3;
  flex-shrink: 0;
  margin-top: 1px;
}

.ti-ico--green {
  background: rgba(22, 163, 74, .07);
  border-color: rgba(22, 163, 74, .16);
  color: #16a34a;
}

.ti-title {
  font-size: 12px;
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 3px;
}

.ti-desc {
  font-size: 11.5px;
  color: rgba(11, 18, 32, .52);
  line-height: 1.5;
  margin-bottom: 6px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: rgba(11, 18, 32, .45);
  padding: 0;
  font-family: inherit;
  margin-bottom: 18px;
  transition: color 140ms;
}

.back-btn:hover {
  color: #0b1220;
}

.user-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: rgba(0, 113, 227, .08);
  border: 1px solid rgba(0, 113, 227, .18);
  color: #0071e3;
  margin-bottom: 10px;
}

.user-badge--green {
  background: rgba(22, 163, 74, .08);
  border-color: rgba(22, 163, 74, .20);
  color: #16a34a;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 48px;
  border: 1.5px solid rgba(15, 23, 42, .14);
  border-radius: 12px;
  background: #fff;
  font-size: 14.5px;
  font-weight: 700;
  color: #0b1220;
  cursor: pointer;
  font-family: inherit;
  transition: all 160ms;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
  margin-bottom: 16px;
}

.google-btn:hover:not(:disabled) {
  border-color: rgba(15, 23, 42, .26);
  box-shadow: 0 3px 12px rgba(0, 0, 0, .10);
  transform: translateY(-1px);
}

.google-btn:disabled {
  opacity: .6;
  cursor: wait;
}

.gmail-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: rgba(15, 23, 42, .03);
  border: 1px solid rgba(15, 23, 42, .07);
  border-radius: 10px;
}

.gi-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .55);
  font-weight: 600;
}

.gi-row svg {
  color: #0071e3;
  flex-shrink: 0;
}

.empresa-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border: 1.5px solid rgba(22, 163, 74, .22);
  border-radius: 11px;
  background: rgba(22, 163, 74, .04);
  font-size: 13.5px;
  font-weight: 700;
  color: #15803d;
  cursor: pointer;
  font-family: inherit;
  transition: all 150ms;
}

.empresa-link-btn:hover {
  background: rgba(22, 163, 74, .08);
  border-color: rgba(22, 163, 74, .36);
}

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

.alert svg {
  flex-shrink: 0;
  margin-top: 1px;
}

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
}

.ec-v {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
}

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
  min-width: 0;
}

.dz-file>div {
  min-width: 0;
  flex: 1;
}

.dz-fn {
  font-size: 13.5px;
  font-weight: 800;
  color: #0b1220;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
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
  transition: all 180ms;
  box-shadow: 0 3px 14px rgba(0, 113, 227, .28);
}

.btn-p:hover:not(:disabled) {
  background: linear-gradient(135deg, #005fcd, #0071e3);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 113, 227, .34);
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

.spinner--dark {
  border-color: rgba(11, 18, 32, .2);
  border-top-color: #0b1220;
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

.mt-8 {
  margin-top: 8px;
}

.mt-12 {
  margin-top: 12px;
}

.mt-16 {
  margin-top: 16px;
}

@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .auth-hero {
    min-height: unset;
    max-height: unset;
    height: auto;
  }

  .hero-inner {
    padding: 20px 24px 20px;
    gap: 0;
  }

  .hero-top {
    margin-bottom: 16px;
  }

  .hero-body {
    padding: 0;
    margin-bottom: 16px;
  }

  .hero-title {
    font-size: clamp(22px, 5vw, 32px);
    margin-bottom: 10px;
  }

  .hero-sub,
  .hero-list {
    display: none;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 16px;
  }

  .hs-item {
    padding: 10px 12px;
  }

  .hs-val {
    font-size: 15px;
  }

  .hs-lbl {
    font-size: 10px;
  }

  .hero-foot {
    display: none;
  }

  .auth-panel {
    min-height: unset;
    padding: 0;
    background: #eef0f5;
    align-items: flex-start;
  }

  .auth-box {
    border-radius: 20px 20px 0 0;
    border: none;
    border-top: 1px solid rgba(15, 23, 42, .09);
    box-shadow: 0 -4px 24px rgba(0, 0, 0, .08);
    width: 100%;
    max-width: 100%;
  }

  .panel-head {
    padding: 20px 20px 16px;
  }

  .panel-body {
    padding: 20px 20px 32px;
  }

  .type-info-row {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .ti-divider {
    width: 100%;
    height: 1px;
    align-self: auto;
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

  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .hs-lbl {
    display: none;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }
}
</style>
