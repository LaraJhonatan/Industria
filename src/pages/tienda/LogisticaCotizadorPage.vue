<template>
  <div class="lq-page">
    <!-- Encabezado -->
    <section class="lq-hero">
      <div class="lq-hero-inner">
        <div class="lq-hero-icon">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="6" width="14" height="11" rx="1.5" />
            <path d="M15 10h4l3 3v4h-7z" />
            <circle cx="6" cy="19" r="1.8" />
            <circle cx="17.5" cy="19" r="1.8" />
          </svg>
        </div>
        <div class="lq-hero-text">
          <h1>Cotiza tu transporte de forma <span>rápida y segura</span></h1>
          <p>Ingresa los datos de tu carga: elegimos el vehículo adecuado, te damos el precio al instante y pagas por
            PSE.</p>
        </div>
      </div>
      <div class="lq-hero-photo" aria-hidden="true">
        <img v-if="fotoEncabezado" :src="fotoEncabezado" alt=""
          @error="fotoEncabezado = '/logistica/encabezado-cotizador.jpg'" />
      </div>
    </section>

    <!-- Pasos -->
    <nav class="lq-steps-bar" aria-label="Pasos de la cotización">
      <div class="lq-steps">
        <button v-for="(s, i) in pasos" :key="s.id" type="button" class="lq-step"
          :class="{ done: s.completo, current: pasoActual === i }" @click="irA(s.id)">
          <span class="lq-step-num">
            <q-icon v-if="s.completo" name="check" size="14px" />
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="lq-step-label">{{ s.label }}</span>
        </button>
      </div>
    </nav>

    <!-- Cotizaciones ya generadas (este navegador o la cuenta): para volver a ellas y pagar -->
    <div class="lq-mis">
      <MisCotizacionesLogistica compacto :limite="3" />
    </div>

    <div v-if="cargandoCatalogo" class="lq-loading">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="errorCatalogo" class="lq-error-box">
      <q-icon name="cloud_off" size="28px" />
      <div>
        <strong>No pudimos cargar el cotizador.</strong>
        <p>{{ errorCatalogo }}</p>
        <q-btn unelevated color="primary" no-caps label="Reintentar" @click="cargarCatalogo" />
      </div>
    </div>

    <div v-else class="lq-grid">
      <!-- Formulario -->
      <div class="lq-form">
        <!-- 1. Ruta -->
        <section id="paso-ruta" class="lq-card">
          <header class="lq-card-head">
            <span class="lq-badge">1</span>
            <div>
              <h2>Ruta</h2>
              <p>¿Desde dónde y hacia dónde va tu carga?</p>
            </div>
          </header>

          <div class="lq-row lq-row-ruta">
            <div class="lq-field">
              <label for="lq-origen">Ciudad de origen <span class="req">*</span></label>
              <q-select for="lq-origen" v-model="form.origen" :options="opcionesOrigen" emit-value map-options
                outlined dense options-dense class="lq-input" :class="{ 'lq-ph': !form.origen }"
                :display-value="form.origen ? undefined : 'Selecciona la ciudad de origen'">
                <template #prepend><q-icon name="trip_origin" color="primary" /></template>
              </q-select>
            </div>
            <q-btn flat round dense icon="swap_horiz" color="primary" class="lq-swap" :disable="!tramo"
              aria-label="Invertir origen y destino" @click="invertirRuta">
              <q-tooltip>Invertir: mismo precio en ambos sentidos</q-tooltip>
            </q-btn>
            <div class="lq-field">
              <label for="lq-destino">Destino <span class="req">*</span></label>
              <q-select for="lq-destino" v-model="form.destino" :options="opcionesDestino" emit-value map-options
                outlined dense options-dense class="lq-input" :class="{ 'lq-ph': !form.destino }"
                :disable="!form.origen"
                :display-value="form.destino ? undefined : form.origen ? 'Selecciona la ciudad de destino' : 'Primero elige el origen'"
                :error="!!errores.ruta" :error-message="errores.ruta" hide-bottom-space>
                <template #prepend><q-icon name="place" color="primary" /></template>
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label v-if="scope.opt.caption" caption>{{ scope.opt.caption }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <div class="lq-row">
            <div class="lq-field">
              <label for="lq-recogida">Punto de recogida <span class="opt">(opcional)</span></label>
              <q-input for="lq-recogida" v-model="form.puntoRecogida" outlined dense maxlength="300"
                placeholder="Ej: Bodega, dirección, referencia" class="lq-input">
                <template #prepend><q-icon name="warehouse" color="grey-6" /></template>
              </q-input>
            </div>
            <div class="lq-field">
              <label for="lq-entrega">Punto de entrega <span class="opt">(opcional)</span></label>
              <q-input for="lq-entrega" v-model="form.puntoEntrega" outlined dense maxlength="300"
                placeholder="Ej: Dirección, bodega, punto de referencia" class="lq-input">
                <template #prepend><q-icon name="flag" color="grey-6" /></template>
              </q-input>
            </div>
          </div>
          <p v-if="tramo?.ruta.tipo === 'urbano'" class="lq-note">
            <q-icon name="info" size="16px" />
            Servicio urbano dentro de {{ tramo.origen }}: incluye hasta {{ tramo.ruta.entregasIncluidas }} entregas.
            Detállalas en los comentarios.
          </p>
        </section>

        <!-- 2. Mercancía -->
        <section id="paso-mercancia" class="lq-card">
          <header class="lq-card-head">
            <span class="lq-badge">2</span>
            <div>
              <h2>Producto a transportar</h2>
              <p>Cuéntanos qué vas a enviar.</p>
            </div>
          </header>

          <div class="lq-row">
            <div class="lq-field">
              <label for="lq-producto">Producto <span class="req">*</span></label>
              <q-input for="lq-producto" v-model="form.producto" outlined dense maxlength="200"
                placeholder="Ej: Barras de acero, maquinaria, alimentos" class="lq-input" :error="!!errores.producto"
                :error-message="errores.producto" hide-bottom-space>
                <template #prepend><q-icon name="inventory_2" color="primary" /></template>
              </q-input>
            </div>
            <div class="lq-field">
              <label for="lq-tipo">Tipo de mercancía <span class="opt">(opcional)</span></label>
              <q-select for="lq-tipo" v-model="form.tipoMercancia" :options="tiposMercancia" outlined dense
                clearable class="lq-input" :class="{ 'lq-ph': !form.tipoMercancia }"
                :display-value="form.tipoMercancia || 'Selecciona el tipo'">
                <template #prepend><q-icon name="category" color="grey-6" /></template>
              </q-select>
            </div>
          </div>
          <div class="lq-field">
            <label for="lq-desc">Descripción <span class="opt">(opcional)</span></label>
            <q-input for="lq-desc" v-model="form.descripcion" outlined dense autogrow maxlength="1000"
              placeholder="Ej: Barra metálica curva de acero, empacada en atados" class="lq-input" />
          </div>
        </section>

        <!-- 3. Carga -->
        <section id="paso-carga" class="lq-card">
          <header class="lq-card-head">
            <span class="lq-badge">3</span>
            <div>
              <h2>Peso y dimensiones</h2>
              <p>Con esto elegimos el vehículo que soporta tu carga y donde cabe.</p>
            </div>
          </header>

          <div class="lq-row">
            <div class="lq-field">
              <label for="lq-peso">Peso total <span class="req">*</span></label>
              <div class="lq-with-toggle">
                <q-input for="lq-peso" v-model.number="form.peso" type="number" min="0" step="any" outlined dense
                  :placeholder="form.unidadPeso === 't' ? 'Ej: 3' : 'Ej: 800'" class="lq-input"
                  :error="!!errores.peso" :error-message="errores.peso" hide-bottom-space>
                  <template #prepend><q-icon name="scale" color="primary" /></template>
                </q-input>
                <q-btn-toggle v-model="form.unidadPeso" :options="[{ label: 'kg', value: 'kg' }, { label: 'ton', value: 't' }]"
                  unelevated dense no-caps toggle-color="primary" color="grey-2" text-color="grey-8"
                  class="lq-toggle" />
              </div>
              <span class="lq-hint">De toda la carga (todas las unidades juntas).</span>
            </div>
            <div class="lq-field">
              <label for="lq-cantidad">Cantidad de unidades <span class="req">*</span></label>
              <q-input for="lq-cantidad" v-model.number="form.cantidad" type="number" min="1" step="1" outlined dense
                placeholder="Ej: 10" class="lq-input" :error="!!errores.cantidad" :error-message="errores.cantidad"
                hide-bottom-space>
                <template #prepend><q-icon name="layers" color="primary" /></template>
              </q-input>
              <span class="lq-hint">Bultos, piezas o estibas.</span>
            </div>
          </div>

          <p class="lq-subtitle">Medidas de cada unidad (en metros)</p>
          <div class="lq-row lq-row-3">
            <div class="lq-field">
              <label for="lq-largo">Largo <span class="req">*</span></label>
              <q-input for="lq-largo" v-model.number="form.largo" type="number" min="0" step="any" outlined dense
                placeholder="Ej: 6" suffix="m" class="lq-input" :error="!!errores.largo"
                :error-message="errores.largo" hide-bottom-space>
                <template #prepend><q-icon name="straighten" color="primary" /></template>
              </q-input>
            </div>
            <div class="lq-field">
              <label for="lq-ancho">Ancho <span class="req">*</span></label>
              <q-input for="lq-ancho" v-model.number="form.ancho" type="number" min="0" step="any" outlined dense
                placeholder="Ej: 2.5" suffix="m" class="lq-input" :error="!!errores.ancho"
                :error-message="errores.ancho" hide-bottom-space>
                <template #prepend><q-icon name="width" color="primary" /></template>
              </q-input>
            </div>
            <div class="lq-field">
              <label for="lq-alto">Alto <span class="req">*</span></label>
              <q-input for="lq-alto" v-model.number="form.alto" type="number" min="0" step="any" outlined dense
                placeholder="Ej: 2" suffix="m" class="lq-input" :error="!!errores.alto"
                :error-message="errores.alto" hide-bottom-space>
                <template #prepend><q-icon name="height" color="primary" /></template>
              </q-input>
            </div>
          </div>

          <div class="lq-volumen">
            <q-icon name="view_in_ar" size="20px" color="primary" />
            <span>Volumen total</span>
            <strong>{{ volumen > 0 ? `${formatNum(volumen)} m³` : '—' }}</strong>
            <span class="lq-hint">Se calcula solo: largo × ancho × alto × cantidad.</span>
          </div>
        </section>

        <!-- 4. Comentarios -->
        <section id="paso-comentarios" class="lq-card">
          <header class="lq-card-head">
            <span class="lq-badge">4</span>
            <div>
              <h2>Comentarios y observaciones <span class="opt">(opcional)</span></h2>
              <p>Condiciones de cargue o descargue, acceso al lugar, cuidados especiales...</p>
            </div>
          </header>
          <q-input v-model="form.comentarios" outlined autogrow maxlength="2000" type="textarea"
            placeholder="Ej: Las barras miden 12 metros y requieren cuidado especial durante el cargue y descargue."
            class="lq-input" input-style="min-height: 72px" />
        </section>
      </div>

      <!-- Resultado -->
      <aside id="paso-resumen" class="lq-side">
        <section class="lq-card lq-vehiculo">
          <header class="lq-card-head">
            <q-icon name="local_shipping" size="26px" color="primary" />
            <div>
              <h2>Vehículo recomendado</h2>
              <p>Lo elegimos según el peso, el volumen y las medidas de tu carga.</p>
            </div>
          </header>

          <div v-if="!listoParaCotizar" class="lq-empty">
            <q-icon name="touch_app" size="30px" />
            <p>Completa el <strong>destino</strong>, el <strong>peso</strong> y las <strong>medidas</strong> para ver
              qué vehículo necesitas y cuánto cuesta.</p>
          </div>

          <div v-else-if="cotizando && !resultado" class="lq-empty">
            <q-spinner-dots color="primary" size="32px" />
            <p>Buscando el vehículo ideal...</p>
          </div>

          <div v-else-if="especial" class="lq-alert lq-alert-warn" data-test="cotizacion-especial">
            <q-icon name="support_agent" size="26px" />
            <div>
              <strong>{{ especial.titulo }}</strong>
              <p v-if="especial.detalle">{{ especial.detalle }}</p>
              <p v-if="especial.sugerencia" class="lq-sugerencia">{{ especial.sugerencia }}</p>
              <a :href="whatsappEspecial" target="_blank" rel="noopener" class="lq-wa">
                <q-icon name="chat" size="16px" /> Cotizar esta carga por WhatsApp
              </a>
              <p class="lq-wa-hint">Te enviamos los datos de tu carga en el mensaje, no tienes que escribirlos.</p>
            </div>
          </div>

          <div v-else-if="resultado?.ok" class="lq-vehiculo-box" :class="{ refreshing: cotizando }">
            <div class="lq-vehiculo-photo">
              <img v-if="fotoVehiculo" :src="fotoVehiculo" :alt="resultado.vehiculo.nombre" />
              <div v-else class="lq-vehiculo-ph">
                <q-icon name="local_shipping" size="46px" />
                <span>{{ resultado.vehiculo.codigo }}</span>
              </div>
            </div>
            <div class="lq-vehiculo-info">
              <div class="lq-vehiculo-title">
                <h3>{{ resultado.vehiculo.nombre }}</h3>
                <span class="lq-chip">Recomendado</span>
              </div>
              <ul>
                <li>
                  <q-icon name="scale" size="18px" color="primary" />
                  <div><span>Capacidad de carga</span><strong>Hasta {{ formatPeso(resultado.vehiculo.pesoMaxKg) }}</strong></div>
                </li>
                <li v-if="resultado.vehiculo.volumenMaxM3">
                  <q-icon name="view_in_ar" size="18px" color="primary" />
                  <div><span>Capacidad volumétrica</span><strong>Hasta {{ formatNum(resultado.vehiculo.volumenMaxM3) }} m³</strong></div>
                </li>
                <li v-if="medidasVehiculo">
                  <q-icon name="straighten" size="18px" color="primary" />
                  <div><span>Medidas internas</span><strong>{{ medidasVehiculo }}</strong></div>
                </li>
                <li v-if="resultado.vehiculo.tipoCarroceria">
                  <q-icon name="local_shipping" size="18px" color="primary" />
                  <div><span>Tipo de carrocería</span><strong>{{ resultado.vehiculo.tipoCarroceria }}</strong></div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="lq-card lq-resumen">
          <header class="lq-card-head">
            <q-icon name="receipt_long" size="24px" color="primary" />
            <div>
              <h2>Resumen de la cotización</h2>
            </div>
          </header>

          <dl class="lq-dl">
            <div><dt>Ruta</dt><dd>{{ tramo ? `${tramo.origen} → ${tramo.destino}` : '—' }}</dd></div>
            <div><dt>Producto</dt><dd>{{ form.producto || '—' }}</dd></div>
            <div><dt>Medidas por unidad (L × A × H)</dt><dd>{{ medidasCarga || '—' }}</dd></div>
            <div><dt>Cantidad</dt><dd>{{ form.cantidad > 0 ? form.cantidad : '—' }}</dd></div>
            <div><dt>Volumen total</dt><dd>{{ volumen > 0 ? `${formatNum(volumen)} m³` : '—' }}</dd></div>
            <div><dt>Peso total</dt><dd>{{ pesoKg > 0 ? formatPeso(pesoKg) : '—' }}</dd></div>
            <div><dt>Vehículo</dt><dd>{{ resultado?.ok ? resultado.vehiculo.nombre : '—' }}</dd></div>
          </dl>

          <div class="lq-precio">
            <span>Precio del transporte</span>
            <strong>{{ resultado?.ok ? formatMoney(resultado.valorTransporte) : '—' }}</strong>
          </div>

          <div v-if="catalogo.servicios.length" class="lq-servicios">
            <p class="lq-servicios-title">Servicios adicionales</p>
            <label v-for="s in catalogo.servicios" :key="s.id" class="lq-servicio"
              :class="{ checked: form.servicioIds.includes(s.id) }">
              <q-checkbox v-model="form.servicioIds" :val="s.id" dense />
              <span class="lq-servicio-name">
                {{ s.nombre }}
                <q-icon v-if="s.descripcion" name="info_outline" size="15px" color="grey-6">
                  <q-tooltip max-width="260px">{{ s.descripcion }}</q-tooltip>
                </q-icon>
              </span>
              <span class="lq-servicio-price">+ {{ formatMoney(s.precio) }}</span>
            </label>
          </div>

          <div class="lq-total">
            <q-icon name="verified_user" size="24px" />
            <span>Total a pagar</span>
            <strong>{{ resultado?.ok ? formatMoney(total) : '—' }}</strong>
          </div>

          <q-btn unelevated color="primary" no-caps class="lq-cta" icon="check" label="Confirmar y continuar"
            :disable="!puedeConfirmar" @click="abrirFacturacion" />
          <p v-if="!puedeConfirmar && listoParaCotizar && !form.producto.trim()" class="lq-cta-hint">
            Falta indicar el producto a transportar.
          </p>
          <p class="lq-secure">
            <q-icon name="lock" size="14px" /> Pago seguro por PSE con Wompi.
          </p>
        </section>
      </aside>
    </div>

    <!-- Barra móvil: el resumen queda al final del formulario, así que el total se muestra siempre abajo -->
    <div v-if="resultado?.ok" class="lq-mobile-bar">
      <div>
        <span>{{ resultado.vehiculo.nombre }}</span>
        <strong>{{ formatMoney(total) }}</strong>
      </div>
      <q-btn unelevated no-caps color="primary" label="Ver resumen" icon-right="expand_more"
        @click="irA('paso-resumen')" />
    </div>
    <div v-else-if="listoParaCotizar && especial && !cotizando" class="lq-mobile-bar">
      <div>
        <span>Carga especial</span>
        <strong class="lq-mobile-especial">Cotización por WhatsApp</strong>
      </div>
      <q-btn unelevated no-caps color="green-7" icon="chat" label="Cotizar" :href="whatsappEspecial" target="_blank" />
    </div>

    <!-- Datos de facturación -->
    <q-dialog v-model="dialogoFacturacion" :maximized="$q.screen.lt.sm">
      <q-card class="lq-dialog">
        <q-card-section class="lq-dialog-head">
          <div>
            <h2>Datos para tu cotización y factura</h2>
            <p>Con estos datos generamos el documento de tu compra.</p>
          </div>
          <q-btn flat round dense icon="close" v-close-popup aria-label="Cerrar" />
        </q-card-section>

        <q-card-section class="lq-dialog-body">
          <div class="lq-row">
            <div class="lq-field lq-field-tipo">
              <label>Tipo de documento</label>
              <q-select v-model="comprador.tipoDocumento" :options="tiposDocumento" emit-value map-options outlined
                dense class="lq-input" />
            </div>
            <div class="lq-field">
              <label for="lq-doc">Número de documento <span class="req">*</span></label>
              <q-input for="lq-doc" v-model="comprador.documento" outlined dense maxlength="40" class="lq-input"
                :placeholder="comprador.tipoDocumento === 'NIT' ? 'Ej: 900123456-7' : 'Ej: 1020304050'"
                :error="!!erroresComprador.documento" :error-message="erroresComprador.documento" hide-bottom-space />
            </div>
          </div>
          <div class="lq-field">
            <label for="lq-nombre">{{ comprador.tipoDocumento === 'NIT' ? 'Razón social' : 'Nombre completo' }} <span
                class="req">*</span></label>
            <q-input for="lq-nombre" v-model="comprador.nombre" outlined dense maxlength="200" class="lq-input"
              :error="!!erroresComprador.nombre" :error-message="erroresComprador.nombre" hide-bottom-space />
          </div>
          <div class="lq-row">
            <div class="lq-field">
              <label for="lq-email">Correo <span class="req">*</span></label>
              <q-input for="lq-email" v-model="comprador.email" type="email" outlined dense maxlength="200"
                class="lq-input" placeholder="Te enviaremos aquí la confirmación" :error="!!erroresComprador.email"
                :error-message="erroresComprador.email" hide-bottom-space />
            </div>
            <div class="lq-field">
              <label for="lq-tel">Teléfono <span class="req">*</span></label>
              <q-input for="lq-tel" v-model="comprador.telefono" type="tel" outlined dense maxlength="30"
                class="lq-input" :error="!!erroresComprador.telefono" :error-message="erroresComprador.telefono"
                hide-bottom-space />
            </div>
          </div>
          <div class="lq-row">
            <div class="lq-field">
              <label for="lq-dir">Dirección de facturación <span class="req">*</span></label>
              <q-input for="lq-dir" v-model="comprador.direccion" outlined dense maxlength="300" class="lq-input"
                :error="!!erroresComprador.direccion" :error-message="erroresComprador.direccion" hide-bottom-space />
            </div>
            <div class="lq-field">
              <label for="lq-ciudad">Ciudad <span class="req">*</span></label>
              <q-input for="lq-ciudad" v-model="comprador.ciudad" outlined dense maxlength="100" class="lq-input"
                :error="!!erroresComprador.ciudad" :error-message="erroresComprador.ciudad" hide-bottom-space />
            </div>
          </div>

          <div class="lq-dialog-total">
            <div>
              <span>{{ tramo ? `${tramo.origen} → ${tramo.destino}` : '' }} · {{ resultado?.vehiculo?.nombre }}</span>
              <strong>Total: {{ formatMoney(total) }}</strong>
            </div>
          </div>

          <div v-if="errorConfirmar" class="lq-alert lq-alert-error q-mt-md">
            <q-icon name="error_outline" size="20px" />
            <div>{{ errorConfirmar }}</div>
          </div>
        </q-card-section>

        <q-card-actions class="lq-dialog-actions">
          <q-btn flat no-caps color="grey-8" label="Volver" v-close-popup />
          <q-btn unelevated no-caps color="primary" icon="description" label="Generar cotización"
            :loading="confirmando" @click="confirmar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { logisticaApi } from '../../api/logistica'
import { guardarCotizacion } from '../../utils/cotizacionesGuardadas'
import { imagenCloudinary, TAMANOS } from '../../utils/imagenCloudinary'
import MisCotizacionesLogistica from '../../components/logistica/MisCotizacionesLogistica.vue'

const WHATSAPP = '573114799224'

const router = useRouter()
const $q = useQuasar()

const catalogo = reactive({ rutas: [], vehiculos: [], servicios: [] })
// Se administra desde el dashboard (Logística → Imágenes).
const fotoEncabezado = ref(null)
const cargandoCatalogo = ref(true)
const errorCatalogo = ref('')

const form = reactive({
  origen: null,
  destino: null,
  puntoRecogida: '',
  puntoEntrega: '',
  producto: '',
  tipoMercancia: null,
  descripcion: '',
  peso: null,
  unidadPeso: 'kg',
  cantidad: 1,
  largo: null,
  ancho: null,
  alto: null,
  comentarios: '',
  servicioIds: [],
})

const tiposMercancia = [
  'Carga general',
  'Acero y materiales de construcción',
  'Maquinaria y equipos',
  'Alimentos y bebidas',
  'Carga frágil',
  'Electrónica',
  'Otro',
]

const tiposDocumento = [
  { label: 'NIT', value: 'NIT' },
  { label: 'Cédula de ciudadanía', value: 'CC' },
  { label: 'Cédula de extranjería', value: 'CE' },
  { label: 'Pasaporte', value: 'PAS' },
]

// ── Derivados ──

// Una ruta sirve en ambos sentidos con el mismo precio (Bogotá ↔ Barranquilla). Las ciudades se
// identifican por su nombre normalizado para que "Bogotá" y "bogota" sean la misma.
const claveCiudad = (t) =>
  String(t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()

const ciudades = computed(() => {
  const m = new Map()
  for (const r of catalogo.rutas) {
    for (const nombre of [r.origen, r.destino]) {
      const k = claveCiudad(nombre)
      const c = m.get(k) || { clave: k, nombre, rutas: 0 }
      c.rutas++
      m.set(k, c)
    }
  }
  return m
})

const nombreCiudad = (k) => ciudades.value.get(k)?.nombre || ''

/** Destinos posibles desde una ciudad, con la ruta y si se recorre al revés. */
function conexiones(k) {
  const lista = []
  for (const ruta of catalogo.rutas) {
    const [o, d] = [claveCiudad(ruta.origen), claveCiudad(ruta.destino)]
    if (o === k) lista.push({ clave: d, ruta, invertida: false })
    else if (d === k) lista.push({ clave: o, ruta, invertida: true })
  }
  return lista
}

const opcionesOrigen = computed(() =>
  [...ciudades.value.values()]
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    .map((c) => ({ value: c.clave, label: c.nombre })),
)

const opcionesDestino = computed(() => {
  if (!form.origen) return []
  return conexiones(form.origen)
    .map(({ clave, ruta }) =>
      ruta.tipo === 'urbano'
        ? {
            value: clave, orden: '0',
            label: `${nombreCiudad(clave)} (dentro de la ciudad)`,
            caption: `Servicio urbano · hasta ${ruta.entregasIncluidas} entregas`,
          }
        : { value: clave, orden: `1${nombreCiudad(clave)}`, label: nombreCiudad(clave), caption: null },
    )
    .sort((a, b) => a.orden.localeCompare(b.orden, 'es'))
})

/** Ruta elegida, en el sentido del cliente. */
const tramo = computed(() => {
  if (!form.origen || !form.destino) return null
  const c = conexiones(form.origen).find((x) => x.clave === form.destino)
  return c ? { ruta: c.ruta, invertida: c.invertida, origen: nombreCiudad(form.origen), destino: nombreCiudad(form.destino) } : null
})

// Si el destino elegido no sale desde el nuevo origen, se limpia.
watch(
  () => form.origen,
  () => {
    if (form.destino && !conexiones(form.origen).some((x) => x.clave === form.destino)) form.destino = null
  },
)

function invertirRuta() {
  if (!tramo.value) return
  ;[form.origen, form.destino] = [form.destino, form.origen]
}

const positivo = (v) => typeof v === 'number' && Number.isFinite(v) && v > 0

const pesoKg = computed(() => {
  if (!positivo(form.peso)) return 0
  return form.unidadPeso === 't' ? form.peso * 1000 : form.peso
})

const cantidadValida = computed(() => Number.isInteger(form.cantidad) && form.cantidad >= 1)

const volumen = computed(() => {
  if (!positivo(form.largo) || !positivo(form.ancho) || !positivo(form.alto) || !cantidadValida.value) return 0
  return Math.round(form.largo * form.ancho * form.alto * form.cantidad * 100) / 100
})

const medidasCarga = computed(() =>
  positivo(form.largo) && positivo(form.ancho) && positivo(form.alto)
    ? `${formatNum(form.largo)} × ${formatNum(form.ancho)} × ${formatNum(form.alto)} m`
    : '',
)

const errores = computed(() => {
  const e = {}
  if (form.peso != null && form.peso !== '' && !positivo(form.peso)) e.peso = 'Debe ser mayor que cero.'
  if (form.cantidad != null && form.cantidad !== '' && !cantidadValida.value) e.cantidad = 'Mínimo 1, sin decimales.'
  for (const k of ['largo', 'ancho', 'alto']) {
    if (form[k] != null && form[k] !== '' && !positivo(form[k])) e[k] = 'Debe ser mayor que cero.'
  }
  if (intentoConfirmar.value) {
    if (!tramo.value) e.ruta = form.origen ? 'Selecciona el destino.' : 'Selecciona el origen y el destino.'
    if (!form.producto.trim()) e.producto = 'Indica qué vas a transportar.'
  }
  return e
})

const listoParaCotizar = computed(
  () => !!tramo.value && pesoKg.value > 0 && volumen.value > 0 && cantidadValida.value,
)

const pasos = computed(() => [
  { id: 'paso-ruta', label: 'Ruta', completo: !!tramo.value },
  { id: 'paso-mercancia', label: 'Producto', completo: !!form.producto.trim() },
  { id: 'paso-carga', label: 'Peso y dimensiones', completo: pesoKg.value > 0 && volumen.value > 0 },
  { id: 'paso-resumen', label: 'Resumen y pago', completo: !!resultado.value?.ok && !!form.producto.trim() },
])

const pasoActual = computed(() => {
  const idx = pasos.value.findIndex((p) => !p.completo)
  return idx === -1 ? pasos.value.length - 1 : idx
})

// ── Cotización en vivo ──

const resultado = ref(null)
const cotizando = ref(false)
const errorCotizar = ref('')
let temporizador = null
let secuencia = 0

const payloadCarga = computed(() => ({
  rutaId: tramo.value?.ruta.id,
  invertida: !!tramo.value?.invertida,
  producto: form.producto.trim() || 'Mercancía',
  pesoKg: pesoKg.value,
  largoM: form.largo,
  anchoM: form.ancho,
  altoM: form.alto,
  cantidad: form.cantidad,
}))

watch(
  () => (listoParaCotizar.value ? JSON.stringify({ ...payloadCarga.value, producto: '' }) : null),
  (clave) => {
    clearTimeout(temporizador)
    errorCotizar.value = ''
    if (!clave) {
      resultado.value = null
      cotizando.value = false
      return
    }
    cotizando.value = true
    temporizador = setTimeout(cotizar, 450)
  },
)

async function cotizar() {
  const mia = ++secuencia
  try {
    const { data } = await logisticaApi.cotizar(payloadCarga.value)
    if (mia !== secuencia) return
    resultado.value = data
  } catch (e) {
    if (mia !== secuencia) return
    resultado.value = null
    errorCotizar.value = e?.response
      ? mensajeError(e, 'El cálculo no respondió como esperábamos.')
      : 'Parece que hay un problema de conexión.'
  } finally {
    if (mia === secuencia) cotizando.value = false
  }
}

const serviciosElegidos = computed(() => catalogo.servicios.filter((s) => form.servicioIds.includes(s.id)))

const total = computed(() => {
  if (!resultado.value?.ok) return 0
  return resultado.value.valorTransporte + serviciosElegidos.value.reduce((s, x) => s + x.precio, 0)
})

const puedeConfirmar = computed(
  () => !!resultado.value?.ok && !cotizando.value && !!form.producto.trim() && listoParaCotizar.value,
)

// Se administra por vehículo desde el dashboard; sin foto se muestra un ícono.
const fotoVehiculo = computed(() =>
  imagenCloudinary(resultado.value?.vehiculo?.imagenUrl || null, TAMANOS.vehiculo),
)

const medidasVehiculo = computed(() => {
  const v = resultado.value?.vehiculo
  if (!v) return ''
  const partes = [v.largoM, v.anchoM, v.altoM]
  if (partes.every((x) => x == null)) return ''
  if (partes.filter((x) => x != null).length === 1 && v.largoM != null) return `${formatNum(v.largoM)} m de largo`
  return `${partes.map((x) => (x == null ? '—' : formatNum(x))).join(' × ')} m`
})

/**
 * Todo lo que no se puede cotizar solo (carga fuera de los vehículos, o el cálculo no respondió)
 * se deriva a WhatsApp; nunca se muestra como un error sin salida.
 */
const especial = computed(() => {
  if (errorCotizar.value) {
    return {
      titulo: 'No pudimos calcular el precio automáticamente.',
      detalle: errorCotizar.value,
      sugerencia: 'Escríbenos y te cotizamos esta carga directamente.',
    }
  }
  if (resultado.value && !resultado.value.ok) {
    return {
      titulo: resultado.value.mensaje,
      detalle: resultado.value.detalle,
      sugerencia: resultado.value.sugerencia,
    }
  }
  return null
})

const whatsappEspecial = computed(() => {
  const lineas = [
    'Hola ZIFCOR, necesito una cotización especial de transporte.',
    `Ruta: ${tramo.value ? `${tramo.value.origen} → ${tramo.value.destino}` : 'N/A'}`,
    form.puntoRecogida.trim() && `Recogida: ${form.puntoRecogida.trim()}`,
    form.puntoEntrega.trim() && `Entrega: ${form.puntoEntrega.trim()}`,
    `Producto: ${form.producto.trim() || 'N/A'}${form.tipoMercancia ? ` (${form.tipoMercancia})` : ''}`,
    `Peso total: ${pesoKg.value ? formatPeso(pesoKg.value) : 'N/A'}`,
    `Cantidad: ${cantidadValida.value ? formatNum(form.cantidad) : 'N/A'} unidad(es)`,
    `Medidas por unidad (L × A × H): ${medidasCarga.value || 'N/A'}`,
    `Volumen total: ${volumen.value > 0 ? `${formatNum(volumen.value)} m³` : 'N/A'}`,
    especial.value?.detalle && `Motivo: ${especial.value.detalle}`,
    form.comentarios.trim() && `Comentarios: ${form.comentarios.trim().slice(0, 500)}`,
  ].filter(Boolean)
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join('\n'))}`
})

// ── Confirmación ──

const intentoConfirmar = ref(false)
const dialogoFacturacion = ref(false)
const confirmando = ref(false)
const errorConfirmar = ref('')
const intentoComprador = ref(false)

const comprador = reactive({
  tipoDocumento: 'NIT',
  documento: '',
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
})

const erroresComprador = computed(() => {
  if (!intentoComprador.value) return {}
  const e = {}
  if (!comprador.documento.trim()) e.documento = 'Ingresa el número de documento.'
  if (!comprador.nombre.trim()) e.nombre = 'Este dato es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comprador.email.trim())) e.email = 'Ingresa un correo válido.'
  if (!comprador.telefono.trim()) e.telefono = 'Ingresa un teléfono.'
  if (!comprador.direccion.trim()) e.direccion = 'Ingresa la dirección.'
  if (!comprador.ciudad.trim()) e.ciudad = 'Ingresa la ciudad.'
  return e
})

function abrirFacturacion() {
  intentoConfirmar.value = true
  if (!puedeConfirmar.value) return
  errorConfirmar.value = ''
  dialogoFacturacion.value = true
}

async function confirmar() {
  intentoComprador.value = true
  if (Object.keys(erroresComprador.value).length) return
  if (confirmando.value) return
  confirmando.value = true
  errorConfirmar.value = ''
  try {
    const { data } = await logisticaApi.confirmar({
      ...payloadCarga.value,
      producto: form.producto.trim(),
      tipoMercancia: form.tipoMercancia || undefined,
      descripcion: form.descripcion.trim() || undefined,
      puntoRecogida: form.puntoRecogida.trim() || undefined,
      puntoEntrega: form.puntoEntrega.trim() || undefined,
      comentarios: form.comentarios.trim() || undefined,
      servicioIds: form.servicioIds,
      comprador: {
        tipoDocumento: comprador.tipoDocumento,
        documento: comprador.documento.trim(),
        nombre: comprador.nombre.trim(),
        email: comprador.email.trim(),
        telefono: comprador.telefono.trim(),
        direccion: comprador.direccion.trim(),
        ciudad: comprador.ciudad.trim(),
      },
    })
    dialogoFacturacion.value = false
    // Este navegador la recuerda para volver a ella (y pagarla) aunque se recargue o se cierre la página.
    guardarCotizacion(data.token)
    router.push(`/tienda/logistica/cotizacion/${data.token}`)
  } catch (e) {
    errorConfirmar.value = mensajeError(e, 'No pudimos generar la cotización. Intenta de nuevo.')
  } finally {
    confirmando.value = false
  }
}

// ── Utilidades ──

function irA(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function mensajeError(e, porDefecto) {
  const m = e?.response?.data?.message
  if (Array.isArray(m)) return m.join(' ')
  return m || porDefecto
}

function formatNum(n) {
  return Number(n).toLocaleString('es-CO', { maximumFractionDigits: 2 })
}

function formatPeso(kg) {
  return kg >= 1000 ? `${formatNum(kg / 1000)} t` : `${formatNum(kg)} kg`
}

function formatMoney(n) {
  return `$ ${Number(n || 0).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
}

async function cargarCatalogo() {
  cargandoCatalogo.value = true
  errorCatalogo.value = ''
  try {
    const { data } = await logisticaApi.getCatalogo()
    catalogo.rutas = data.rutas
    catalogo.vehiculos = data.vehiculos
    catalogo.servicios = data.servicios
    // Origen sugerido: la ciudad con más rutas (hoy Bogotá); el cliente lo puede cambiar.
    if (!form.origen) {
      form.origen = [...ciudades.value.values()].sort((a, b) => b.rutas - a.rutas)[0]?.clave || null
    }
    fotoEncabezado.value =
      imagenCloudinary(data.imagenes?.encabezado, TAMANOS.encabezado) || '/logistica/encabezado-cotizador.jpg'
  } catch (e) {
    fotoEncabezado.value = '/logistica/encabezado-cotizador.jpg'
    errorCatalogo.value = mensajeError(e, 'Revisa tu conexión e intenta de nuevo.')
  } finally {
    cargandoCatalogo.value = false
  }
}

onMounted(cargarCatalogo)
onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<style scoped>
.lq-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding-bottom: 48px;
}

/* ── Encabezado ── */
.lq-hero {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 150px;
  background: linear-gradient(110deg, #051a3d 0%, #0a3a80 55%, #0b4aa3 100%);
  overflow: hidden;
}

.lq-hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 28px 48px;
  max-width: 760px;
}

.lq-hero-icon {
  flex-shrink: 0;
  width: 76px;
  height: 76px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0071e3, #2b8fff);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 26px rgba(0, 113, 227, .45);
}

.lq-hero-text h1 {
  margin: 0;
  font-size: clamp(22px, 2.6vw, 32px);
  font-weight: 900;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.6px;
}

.lq-hero-text h1 span {
  display: block;
  color: #4ea3ff;
}

.lq-hero-text p {
  margin: 8px 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, .78);
  line-height: 1.5;
}

.lq-hero-photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 46%;
  clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%);
}

.lq-hero-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, rgba(10, 58, 128, .55) 0%, transparent 35%);
}

.lq-hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
}

/* ── Pasos ── */
.lq-steps-bar {
  background: #fff;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.lq-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

.lq-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 4px;
  border: none;
  border-bottom: 3px solid transparent;
  background: none;
  cursor: pointer;
  font: inherit;
  color: rgba(11, 18, 32, .5);
  text-align: left;
  transition: color 150ms, border-color 150ms;
}

.lq-step:hover {
  color: #0b1220;
}

.lq-step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eef2f7;
  color: rgba(11, 18, 32, .55);
  font-size: 13px;
  font-weight: 800;
}

.lq-step-label {
  font-size: 13.5px;
  font-weight: 700;
}

.lq-step.current {
  color: #0071e3;
  border-bottom-color: #0071e3;
}

.lq-step.current .lq-step-num {
  background: #0071e3;
  color: #fff;
}

.lq-step.done {
  color: #0b1220;
}

.lq-step.done .lq-step-num {
  background: #16a34a;
  color: #fff;
}

/* ── Layout ── */
.lq-loading {
  display: grid;
  place-items: center;
  padding: 80px 0;
}

.lq-error-box {
  max-width: 560px;
  margin: 40px auto;
  display: flex;
  gap: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(220, 38, 38, .2);
  color: #b91c1c;
}

.lq-error-box p {
  margin: 4px 0 12px;
  color: rgba(11, 18, 32, .6);
}

.lq-mis {
  max-width: 1400px;
  margin: 24px auto 0;
  padding: 0 48px;
}

.lq-mis:empty {
  display: none;
}

@media (max-width: 700px) {
  .lq-mis {
    padding: 0 16px;
    margin-top: 16px;
  }
}

.lq-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(360px, 1fr);
  gap: 24px;
  max-width: 1400px;
  margin: 24px auto 0;
  padding: 0 48px;
  align-items: start;
}

.lq-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lq-side {
  position: sticky;
  top: 84px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-margin-top: 84px;
}

.lq-card {
  background: #fff;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 1px 3px rgba(11, 18, 32, .04);
  scroll-margin-top: 84px;
}

.lq-card-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.lq-card-head h2 {
  margin: 0;
  font-size: 16.5px;
  font-weight: 800;
  color: #0b1220;
  line-height: 1.3;
}

.lq-card-head p {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .5);
}

.lq-badge {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0071e3;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 14px;
}

.lq-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 12px;
}

.lq-row-3 {
  grid-template-columns: repeat(3, 1fr);
}

.lq-row-ruta {
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
}

.lq-swap {
  margin-top: 26px;
  background: #eff6ff;
}

.lq-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.lq-field label {
  font-size: 12.5px;
  font-weight: 700;
  color: #1f2937;
}

.req {
  color: #dc2626;
}

.opt {
  font-weight: 500;
  color: rgba(11, 18, 32, .42);
  font-size: 12px;
}

.lq-hint {
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
}

.lq-subtitle {
  margin: 6px 0 8px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: rgba(11, 18, 32, .45);
}

.lq-input :deep(.q-field__control) {
  border-radius: 10px;
}

.lq-ph :deep(.q-field__native) {
  color: rgba(11, 18, 32, .45);
}

.lq-static {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 6px 12px;
  border: 1px dashed rgba(0, 113, 227, .35);
  border-radius: 10px;
  background: #f5f9ff;
  font-weight: 700;
  color: #0b1220;
  font-size: 14px;
}

.lq-static-hint {
  font-size: 11.5px;
  font-weight: 500;
  color: rgba(11, 18, 32, .5);
}

.lq-with-toggle {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.lq-with-toggle .lq-input {
  flex: 1;
}

.lq-toggle {
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(11, 18, 32, .18);
}

.lq-toggle :deep(.q-btn) {
  min-height: 38px;
  padding: 0 14px;
  font-weight: 700;
}

.lq-note {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 4px 0 0;
  padding: 10px 12px;
  border-radius: 10px;
  background: #eff6ff;
  color: #1e40af;
  font-size: 12.5px;
}

.lq-volumen {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f5f9ff;
  border: 1px solid rgba(0, 113, 227, .12);
  font-size: 13px;
  color: #1f2937;
}

.lq-volumen strong {
  font-size: 15px;
  color: #0071e3;
}

.lq-volumen .lq-hint {
  flex-basis: 100%;
  margin-left: 28px;
}

/* ── Vehículo ── */
.lq-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 22px 12px;
  text-align: center;
  color: rgba(11, 18, 32, .5);
  background: #f8fafc;
  border: 1px dashed rgba(11, 18, 32, .12);
  border-radius: 12px;
}

.lq-empty p {
  margin: 0;
  font-size: 13px;
  max-width: 300px;
}

.lq-alert {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  font-size: 13px;
}

.lq-alert p {
  margin: 6px 0 10px;
}

.lq-alert-warn {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  color: #92400e;
}

.lq-alert-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
}

.lq-wa {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: #16a34a;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}

.lq-vehiculo-box {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border: 1.5px solid rgba(0, 113, 227, .35);
  border-radius: 14px;
  background: #fbfdff;
  transition: opacity 200ms;
}

.lq-vehiculo-box.refreshing {
  opacity: .55;
}

.lq-vehiculo-photo img,
.lq-vehiculo-ph {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  object-fit: cover;
}

.lq-vehiculo-ph {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: linear-gradient(135deg, #e8f1ff, #d4e6ff);
  color: #0071e3;
  font-weight: 900;
}

.lq-vehiculo-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.lq-vehiculo-title h3 {
  margin: 0;
  font-size: 19px;
  font-weight: 900;
  color: #0071e3;
}

.lq-chip {
  padding: 3px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
  font-size: 11px;
  font-weight: 800;
}

.lq-vehiculo-info ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lq-vehiculo-info li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.lq-vehiculo-info li span {
  display: block;
  font-size: 11px;
  color: rgba(11, 18, 32, .5);
}

.lq-vehiculo-info li strong {
  font-size: 13px;
  color: #0b1220;
}

/* ── Resumen ── */
.lq-dl {
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f8fafc;
}

.lq-dl>div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 3px 0;
  font-size: 12.5px;
}

.lq-dl dt {
  color: rgba(11, 18, 32, .55);
}

.lq-dl dd {
  margin: 0;
  font-weight: 700;
  color: #0b1220;
  text-align: right;
}

.lq-precio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 4px 10px;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
  font-weight: 700;
  font-size: 14px;
  color: #0b1220;
}

.lq-precio strong {
  font-size: 20px;
  color: #0071e3;
}

.lq-servicios {
  padding: 10px 0 4px;
}

.lq-servicios-title {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(11, 18, 32, .45);
  text-transform: uppercase;
  letter-spacing: .5px;
}

.lq-servicio {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 10px;
  border: 1px solid rgba(11, 18, 32, .08);
  cursor: pointer;
  transition: border-color 150ms, background 150ms;
}

.lq-servicio.checked {
  border-color: rgba(0, 113, 227, .45);
  background: #f5f9ff;
}

.lq-servicio-name {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.lq-servicio-price {
  font-size: 13px;
  font-weight: 800;
  color: #0b1220;
}

.lq-total {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(100deg, #e8f1ff, #f2f7ff);
  color: #0071e3;
}

.lq-total span {
  flex: 1;
  font-weight: 800;
  font-size: 15px;
}

.lq-total strong {
  font-size: 24px;
  font-weight: 900;
}

.lq-cta {
  width: 100%;
  margin-top: 14px;
  height: 48px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 15px;
}

.lq-cta-hint {
  margin: 8px 0 0;
  text-align: center;
  font-size: 12px;
  color: #b45309;
}

.lq-secure {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 10px 0 0;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
}

/* ── Diálogo ── */
.lq-dialog {
  width: 640px;
  max-width: 96vw;
  border-radius: 18px;
}

.lq-dialog-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.lq-dialog-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: #0b1220;
}

.lq-dialog-head p {
  margin: 4px 0 0;
  font-size: 13px;
  color: rgba(11, 18, 32, .5);
}

.lq-dialog-body .lq-field {
  margin-bottom: 12px;
}

.lq-dialog-body .lq-row {
  margin-bottom: 0;
}

.lq-dialog-total {
  margin-top: 6px;
  padding: 14px;
  border-radius: 12px;
  background: #f5f9ff;
  border: 1px solid rgba(0, 113, 227, .15);
}

.lq-dialog-total div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}

.lq-dialog-total span {
  font-size: 13px;
  color: rgba(11, 18, 32, .6);
}

.lq-dialog-total strong {
  font-size: 18px;
  color: #0071e3;
}

.lq-dialog-actions {
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px 16px;
  border-top: 1px solid rgba(11, 18, 32, .08);
}

.lq-mobile-bar {
  display: none;
}

.lq-sugerencia {
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .7);
  color: #78350f;
  font-weight: 600;
}

.lq-wa-hint {
  margin: 8px 0 0 !important;
  font-size: 11.5px;
  color: rgba(120, 53, 15, .75);
}

.lq-mobile-especial {
  font-size: 15px !important;
  color: #15803d !important;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .lq-grid {
    grid-template-columns: 1fr;
  }

  .lq-side {
    position: static;
  }

  .lq-page {
    padding-bottom: 96px;
  }

  .lq-mobile-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    /* A la derecha queda libre el botón flotante de WhatsApp del layout. */
    padding: 10px 96px calc(10px + env(safe-area-inset-bottom)) 16px;
    background: #fff;
    border-top: 1px solid rgba(11, 18, 32, .1);
    box-shadow: 0 -6px 20px rgba(11, 18, 32, .08);
  }

  .lq-mobile-bar > div > span {
    display: block;
    font-size: 11.5px;
    color: rgba(11, 18, 32, .55);
  }

  .lq-mobile-bar > div > strong {
    font-size: 19px;
    font-weight: 900;
    color: #0071e3;
  }

  .lq-mobile-bar .q-btn {
    flex-shrink: 0;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 800;
  }

  .lq-mobile-bar .q-btn :deep(.q-btn__content) {
    flex-wrap: nowrap;
  }
}

@media (max-width: 900px) {
  .lq-hero-photo {
    display: none;
  }

  .lq-steps {
    padding: 0 16px;
  }

  .lq-step-label {
    display: none;
  }

  .lq-step {
    justify-content: center;
  }
}

@media (max-width: 700px) {
  .lq-hero-inner {
    padding: 22px 16px;
    gap: 14px;
  }

  .lq-hero-icon {
    width: 56px;
    height: 56px;
  }

  .lq-grid {
    padding: 0 16px;
    margin-top: 16px;
  }

  .lq-card {
    padding: 16px;
  }

  .lq-row,
  .lq-row-3,
  .lq-row-ruta {
    grid-template-columns: 1fr;
  }

  .lq-swap {
    margin: -4px auto;
    transform: rotate(90deg);
  }

  .lq-vehiculo-box {
    grid-template-columns: 1fr;
  }

  .lq-vehiculo-photo img,
  .lq-vehiculo-ph {
    max-height: 220px;
  }
}
</style>
