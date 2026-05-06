<template>
  <section id="portal" class="portal-section">
    <div class="ps-wrap">

      <div class="ps-left" v-reveal>
        <div class="ps-pill">PORTAL B2B</div>
        <h2 class="ps-title">
          El cerebro de<br />
          tu empresa<br />
          <span class="ps-title-blue">en un solo lugar</span>
        </h2>
        <p class="ps-desc">
          Gestiona productos, pedidos, clientes y conexiones B2B
          desde un solo lugar. Toma mejores decisiones y haz crecer
          tu negocio sin perder el control.
        </p>

        <router-link to="/auth" class="ps-cta">
          Accede a tu dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </router-link>

        <div class="ps-features">
          <div class="ps-feat">
            <div class="ps-feat-icon" style="background:rgba(0,113,227,0.10);color:#0071e3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <div class="ps-feat-title">Todo en uno</div>
              <div class="ps-feat-sub">Productos, pedidos, clientes y conexiones desde un solo lugar.</div>
            </div>
          </div>
          <div class="ps-feat">
            <div class="ps-feat-icon" style="background:rgba(34,197,94,0.10);color:#16a34a">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <div class="ps-feat-title">Datos en tiempo real</div>
              <div class="ps-feat-sub">Métricas actualizadas que te ayudan a tomar mejores decisiones.</div>
            </div>
          </div>
          <div class="ps-feat">
            <div class="ps-feat-icon" style="background:rgba(139,92,246,0.10);color:#7c3aed">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div class="ps-feat-title">Conexiones B2B</div>
              <div class="ps-feat-sub">Encuentra empresas y proveedores, y crea tus alianzas.</div>
            </div>
          </div>
          <div class="ps-feat">
            <div class="ps-feat-icon" style="background:rgba(251,146,60,0.10);color:#ea580c">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div>
              <div class="ps-feat-title">Escala sin caos</div>
              <div class="ps-feat-sub">Da el siguiente paso con la claridad de tu operación.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="ps-right" v-reveal>
        <div class="ps-mockup">
          <div class="ps-mockup-bar">
            <span class="dot-r" /><span class="dot-y" /><span class="dot-g" />
            <div class="ps-mockup-url">portal.zifux.com/dashboard</div>
          </div>
          <div class="ps-mockup-screen">
            <div class="ps-screen-fallback">
              <div class="db-topbar">
                <div class="db-logo">
                  <img src="/IconoZ.png" alt="ZiFux" style="height:20px" />
                  <span style="font-size:11px;font-weight:900;opacity:.5;margin-left:4px">PORTAL B2B</span>
                </div>
                <div class="db-search">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Buscar productos, pedidos...
                </div>
                <div class="db-user">
                  <div class="db-avatar">AS</div>
                  <div style="line-height:1.2">
                    <div style="font-size:10px;font-weight:800">ACERO LAB SAS</div>
                    <div style="font-size:9px;opacity:.5">Mi perfil</div>
                  </div>
                </div>
              </div>

              <div class="db-body">
                <div class="db-sidebar">
                  <div style="font-size:9px;font-weight:900;letter-spacing:1px;opacity:.35;margin-bottom:8px">PRINCIPAL
                  </div>
                  <div v-for="item in sidebarItems" :key="item.label" class="db-nav-item"
                    :class="{ active: item.active }">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      v-html="item.icon" />
                    {{ item.label }}
                    <span v-if="item.badge" class="db-badge">{{ item.badge }}</span>
                  </div>
                </div>

                <div class="db-main">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
                    <div>
                      <div style="font-size:13px;font-weight:900;color:#0b1220">Bienvenido, ACERO LAB SAS</div>
                      <div style="font-size:9px;opacity:.45;margin-top:2px">Aquí tienes un resumen de tu actividad hoy
                      </div>
                    </div>
                    <button class="db-new-btn">+ Nuevo producto</button>
                  </div>

                  <div class="db-stats">
                    <div v-for="stat in stats" :key="stat.label" class="db-stat">
                      <div class="db-stat-icon" :style="{ background: stat.bg, color: stat.color }">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2" v-html="stat.icon" />
                      </div>
                      <div style="font-size:16px;font-weight:900;color:#0b1220;margin-top:4px">{{ stat.value }}</div>
                      <div style="font-size:8.5px;opacity:.45;margin-top:1px">{{ stat.label }}</div>
                      <div style="font-size:8px;margin-top:3px" :style="{ color: stat.upColor }">{{ stat.change }}</div>
                    </div>
                  </div>

                  <div class="db-bottom-row">
                    <div class="db-quick">
                      <div style="font-size:10px;font-weight:800;margin-bottom:7px">Accesos rápidos</div>
                      <div class="db-quick-grid">
                        <div v-for="q in quickAccess" :key="q.label" class="db-quick-item">
                          <div class="db-quick-icon" :style="{ color: q.color }">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              stroke-width="2" v-html="q.icon" />
                          </div>
                          <div style="font-size:8.5px;font-weight:700;opacity:.65;margin-top:3px">{{ q.label }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="db-recent">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">
                        <span style="font-size:10px;font-weight:800">Productos recientes</span>
                        <span style="font-size:8px;color:#0071e3;font-weight:700">VER TODOS</span>
                      </div>
                      <div v-for="p in recentProducts" :key="p.name" class="db-product-row">
                        <div class="db-product-thumb" />
                        <div style="flex:1;min-width:0">
                          <div
                            style="font-size:9px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                            {{ p.name }}</div>
                          <div style="font-size:8px;opacity:.4">{{ p.cat }}</div>
                        </div>
                        <span class="db-status-badge" :class="p.status === 'Publicado' ? 'published' : 'pending'">{{
                          p.status }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const sidebarItems = [
  { label: 'Inicio', active: true, icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' },
  { label: 'Mi Tienda', icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>' },
  { label: 'Productos', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/>' },
  { label: 'Pedidos', badge: 2, icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>' },
  { label: 'Mensajes', badge: 1, icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
  { label: 'Alianzas B2B', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5"/><circle cx="9" cy="7" r="4"/>' },
  { label: 'Oportunidades', icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>' },
  { label: 'Analíticas', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
]

const stats = [
  { value: '128', label: 'Productos activos', change: '↑ +24 este mes', upColor: '#16a34a', bg: 'rgba(0,113,227,.08)', color: '#0071e3', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/>' },
  { value: '2.450', label: 'Visitas al perfil', change: '↑ +18.7%', upColor: '#16a34a', bg: 'rgba(34,197,94,.08)', color: '#16a34a', icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
  { value: '320', label: 'Ventas realizadas', change: '↑ +15.2%', upColor: '#16a34a', bg: 'rgba(251,146,60,.08)', color: '#ea580c', icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>' },
  { value: '24', label: 'Cotizaciones', change: '↓ 5 pendientes', upColor: '#dc2626', bg: 'rgba(139,92,246,.08)', color: '#7c3aed', icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10"/>' },
]

const quickAccess = [
  { label: 'Nuevo producto', color: '#0071e3', icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' },
  { label: 'Mi tienda', color: '#16a34a', icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' },
  { label: 'Pedidos', color: '#ea580c', icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>' },
  { label: 'Perfil empresa', color: '#7c3aed', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5"/><circle cx="9" cy="7" r="4"/>' },
]

const recentProducts = [
  { name: 'Filamento PLA', cat: 'Impresión 3D', status: 'Pendiente' },
  { name: 'Ensayo de Doblado Alambre', cat: 'Ensayos de Doblado', status: 'Publicado' },
  { name: 'Ensayo Barras Corrugadas', cat: 'Ensayos de Doblado', status: 'Publicado' },
  { name: 'Malla Electrosoldada', cat: 'Ensayos de Doblado', status: 'Publicado' },
]
</script>

<style scoped>
.portal-section {
  --blue: #0071e3;
  background: #ffffff;
  padding: 100px 0;
  overflow: hidden;
}

.ps-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  align-items: center;
  gap: 64px;
}

.ps-pill {
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 1px solid rgba(0, 113, 227, .20);
  color: #0071e3;
  background: rgba(0, 113, 227, .06);
  margin-bottom: 20px;
}

.ps-title {
  font-size: clamp(32px, 3.8vw, 52px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -1px;
  color: #0b1220;
  margin: 0 0 16px;
}

.ps-title-blue {
  color: var(--blue);
}

.ps-desc {
  font-size: 16px;
  line-height: 1.7;
  color: rgba(11, 18, 32, .55);
  margin: 0 0 28px;
  max-width: 420px;
}

.ps-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 28px;
  background: var(--blue);
  color: #fff;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 900;
  text-decoration: none;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 113, 227, .30);
  transition: background 160ms, transform 160ms, box-shadow 160ms;
}

.ps-cta:hover {
  background: #005fcd;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0, 113, 227, .40);
}

.ps-features {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.ps-feat {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.ps-feat-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.ps-feat-title {
  font-size: 14px;
  font-weight: 900;
  color: #0b1220;
  line-height: 1.2;
}

.ps-feat-sub {
  font-size: 12.5px;
  color: rgba(11, 18, 32, .50);
  line-height: 1.5;
  margin-top: 2px;
}

/* ══ Mockup 3D ════════════════════════════════════ */
.ps-right {
  display: flex;
  justify-content: center;
  padding: 20px 20px 20px 0;
}

.ps-mockup {
  width: 100%;
  max-width: 620px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(11, 18, 32, .10);
  box-shadow:
    -8px 8px 0px rgba(11, 18, 32, .04),
    -16px 16px 0px rgba(11, 18, 32, .03),
    0 24px 60px rgba(11, 18, 32, .16),
    0 48px 80px -16px rgba(11, 18, 32, .12);
  background: #fff;
  transform: perspective(1200px) rotateY(-8deg) rotateX(3deg);
  transition: transform 500ms cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 500ms ease;
}

.ps-right:hover .ps-mockup {
  transform: perspective(1200px) rotateY(-3deg) rotateX(1deg);
  box-shadow:
    -4px 4px 0px rgba(11, 18, 32, .03),
    0 24px 60px rgba(11, 18, 32, .12),
    0 48px 80px -16px rgba(11, 18, 32, .08);
}

.ps-mockup-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #f1f3f5;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.dot-r {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
}

.dot-y {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #febc2e;
}

.dot-g {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #28c840;
}

.ps-mockup-url {
  margin-left: 10px;
  font-size: 10px;
  color: rgba(11, 18, 32, .40);
  font-weight: 700;
}

/* ── Dashboard ── */
.ps-screen-fallback {
  background: #fff;
  font-family: inherit;
}

.db-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-bottom: 1px solid rgba(11, 18, 32, .07);
  background: #fff;
}

.db-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.db-search {
  flex: 1;
  height: 26px;
  border: 1px solid rgba(11, 18, 32, .10);
  border-radius: 6px;
  background: rgba(0, 0, 0, .025);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  font-size: 9.5px;
  color: rgba(11, 18, 32, .35);
}

.db-user {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.db-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #0071e3;
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.db-body {
  display: flex;
}

.db-sidebar {
  width: 130px;
  flex-shrink: 0;
  padding: 12px 10px;
  border-right: 1px solid rgba(11, 18, 32, .07);
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.db-nav-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 9.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .60);
  cursor: pointer;
}

.db-nav-item.active {
  background: rgba(0, 113, 227, .08);
  color: #0071e3;
}

.db-badge {
  margin-left: auto;
  background: #0071e3;
  color: #fff;
  border-radius: 999px;
  font-size: 7px;
  font-weight: 900;
  padding: 1px 5px;
}

.db-main {
  flex: 1;
  padding: 12px;
  min-width: 0;
}

.db-new-btn {
  height: 24px;
  padding: 0 10px;
  background: #0071e3;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.db-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.db-stat {
  background: #f8fafc;
  border: 1px solid rgba(11, 18, 32, .07);
  border-radius: 8px;
  padding: 8px;
}

.db-stat-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: grid;
  place-items: center;
}

.db-bottom-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8px;
}

.db-quick {
  background: #f8fafc;
  border: 1px solid rgba(11, 18, 32, .07);
  border-radius: 8px;
  padding: 10px;
}

.db-quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.db-quick-item {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 7px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: border-color 140ms;
}

.db-quick-item:hover {
  border-color: rgba(0, 113, 227, .25);
}

.db-quick-icon {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
}

.db-recent {
  background: #f8fafc;
  border: 1px solid rgba(11, 18, 32, .07);
  border-radius: 8px;
  padding: 10px;
}

.db-product-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(11, 18, 32, .05);
}

.db-product-row:last-child {
  border-bottom: none;
}

.db-product-thumb {
  width: 28px;
  height: 28px;
  border-radius: 5px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  flex-shrink: 0;
}

.db-status-badge {
  font-size: 7.5px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 999px;
  flex-shrink: 0;
}

.db-status-badge.published {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
}

.db-status-badge.pending {
  background: rgba(251, 146, 60, .12);
  color: #ea580c;
}

/* ══ Reveal ══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Responsive ══════════════════════════════════ */
@media (max-width: 1024px) {
  .ps-wrap {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .ps-right {
    order: -1;
    padding: 0;
  }

  .ps-mockup {
    max-width: 100%;
    transform: none;
  }

  .ps-right:hover .ps-mockup {
    transform: none;
  }
}

@media (max-width: 600px) {
  .portal-section {
    padding: 64px 0;
  }

  .ps-wrap {
    padding: 0 16px;
  }

  .db-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .db-bottom-row {
    grid-template-columns: 1fr;
  }

  .db-sidebar {
    display: none;
  }
}
</style>
