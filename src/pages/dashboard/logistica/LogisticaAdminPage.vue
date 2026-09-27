<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Logística</h1>
        <p class="page-sub">Tarifas, vehículos y servicios del cotizador de transporte. El cliente ve el valor base
          + {{ datos.margenPct }} % de margen.</p>
      </div>
      <q-btn flat no-caps icon="open_in_new" label="Ver cotizador" color="blue-6" to="/tienda/logistica"
        target="_blank" class="action-btn" />
    </div>

    <div v-if="cargando" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else-if="sinPermiso" class="empty-state column items-center q-py-xl">
      <q-icon name="lock" size="48px" color="grey-4" class="q-mb-md" />
      <p class="empty-title">Tu empresa no tiene acceso a este módulo</p>
      <p class="empty-sub">La administración de logística solo está habilitada para empresas autorizadas por ZIFCOR.</p>
    </div>

    <div v-else-if="errorCarga" class="empty-state column items-center q-py-xl">
      <q-icon name="cloud_off" size="48px" color="grey-4" class="q-mb-md" />
      <p class="empty-title">No se pudo cargar la información</p>
      <p class="empty-sub">{{ errorCarga }}</p>
      <q-btn unelevated no-caps color="blue-6" label="Reintentar" class="action-btn q-mt-md" @click="cargar" />
    </div>

    <template v-else>
      <q-tabs v-model="tab" align="left" no-caps active-color="blue-6" indicator-color="blue-6" class="la-tabs"
        dense>
        <q-tab name="tarifas" icon="price_change" label="Tarifas" />
        <q-tab name="vehiculos" icon="local_shipping" label="Vehículos" />
        <q-tab name="servicios" icon="add_task" label="Servicios adicionales" />
        <q-tab name="imagenes" icon="image" label="Imágenes" />
        <q-tab name="cotizaciones" icon="request_quote" label="Cotizaciones" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="la-panels">
        <!-- Tarifas -->
        <q-tab-panel name="tarifas" class="q-pa-none">
          <div class="la-toolbar">
            <p class="la-help">
              <q-icon name="info" size="16px" /> Escribe el <strong>valor base</strong> (costo del transportador) por
              ruta y vehículo. Debajo ves el precio que verá el cliente. Deja la celda vacía si ese vehículo no se
              presta en esa ruta. <strong>Cada ruta vale lo mismo en ambos sentidos</strong> (Bogotá → Barranquilla =
              Barranquilla → Bogotá).
            </p>
            <div class="row q-gutter-sm no-wrap">
              <q-btn flat no-caps icon="add_road" label="Agregar ruta" color="blue-6" @click="abrirRuta()" />
              <q-btn v-if="cambiosTarifas" flat no-caps icon="undo" label="Descartar" color="grey-7"
                @click="cambios = {}" />
              <q-btn unelevated no-caps icon="save" color="blue-6" class="action-btn"
                :label="cambiosTarifas ? `Guardar ${cambiosTarifas} cambio(s)` : 'Sin cambios'"
                :disable="!cambiosTarifas" :loading="guardandoTarifas" @click="guardarTarifas" />
            </div>
          </div>

          <div class="la-excel">
            <q-icon name="grid_on" size="26px" color="green-8" />
            <div class="la-excel-text">
              <strong>Actualizar tarifas con Excel</strong>
              <span>Descarga la plantilla con los valores actuales, cambia los precios y súbela. Antes de guardar te
                mostramos exactamente qué cambia.</span>
            </div>
            <q-btn outline no-caps color="green-8" icon="download" label="Descargar plantilla"
              :loading="descargando" @click="descargar" />
            <q-btn unelevated no-caps color="green-8" icon="upload_file" label="Subir plantilla"
              :loading="leyendoExcel" @click="elegirExcel" />
            <input ref="inputExcel" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              hidden @change="subirExcel" />
          </div>

          <p class="la-subtitle">Tipologías de vehículo</p>
          <div class="la-table-wrap q-mb-lg">
            <table class="la-list la-tipologias">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Tipología</th>
                  <th>Capacidad peso</th>
                  <th>Capacidad m³</th>
                  <th>Medida interna (L × A × H)</th>
                  <th>Carrocería</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in datos.vehiculos" :key="v.id" :class="{ inactive: !v.activo }">
                  <td><span class="la-code">{{ v.codigo }}</span></td>
                  <td class="la-strong">{{ v.nombre }}<span v-if="!v.activo" class="la-tag la-tag-off q-ml-xs">Inactivo</span></td>
                  <td>{{ rangoPeso(v) }}</td>
                  <td>{{ rangoVolumen(v) }}</td>
                  <td>{{ medidasInternas(v) }}</td>
                  <td>{{ v.tipoCarroceria || '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="la-subtitle">Tarifas por ruta (valor base por viaje, igual en ambos sentidos)</p>
          <div class="la-table-wrap">
            <table class="la-matrix">
              <thead>
                <tr>
                  <th class="la-sticky">Destino</th>
                  <th class="la-th-small">Origen</th>
                  <th class="la-th-small">Cantidad entregas</th>
                  <th v-for="v in datos.vehiculos" :key="v.id" :class="{ inactive: !v.activo }">
                    <div class="la-th-code">{{ v.codigo }}</div>
                    <div class="la-th-name">{{ v.nombre }}</div>
                    <div class="la-th-cap">hasta {{ formatPeso(v.pesoMaxKg) }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in datos.rutas" :key="r.id" :class="{ inactive: !r.activo }">
                  <td class="la-sticky">
                    <div class="la-ruta">
                      <div>
                        <strong>{{ r.destino }}</strong>
                        <span v-if="r.tipo === 'urbano'" class="la-tag">Urbano</span>
                        <span v-if="!r.activo" class="la-tag la-tag-off">Oculto</span>
                      </div>
                      <q-btn flat round dense size="sm" icon="edit" color="grey-7" @click="abrirRuta(r)">
                        <q-tooltip>Editar ruta</q-tooltip>
                      </q-btn>
                    </div>
                  </td>
                  <td class="la-td-center">{{ r.origen }}</td>
                  <td class="la-td-center">{{ r.entregasIncluidas }}</td>
                  <td v-for="v in datos.vehiculos" :key="v.id" :class="{ dirty: esCambio(r.id, v.id) }">
                    <input :value="celda(r.id, v.id)" type="number" min="0" step="1000" class="la-cell"
                      placeholder="—" :aria-label="`Valor base ${r.destino} ${v.nombre}`"
                      @input="(e) => editarCelda(r.id, v.id, e.target.value)" />
                    <div v-if="celda(r.id, v.id)" class="la-cliente">
                      Cliente: {{ formatMoney(precioCliente(celda(r.id, v.id))) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </q-tab-panel>

        <!-- Vehículos -->
        <q-tab-panel name="vehiculos" class="q-pa-none">
          <div class="la-toolbar">
            <p class="la-help">
              <q-icon name="info" size="16px" /> El cotizador elige el vehículo más económico que soporte el
              <strong>peso</strong> y donde <strong>quepan</strong> las medidas y el volumen de la carga en un solo viaje.
              Si una medida queda vacía se usa el espacio estándar de furgón (13,5 × 2,45 × 2,6 m); si falta el volumen
              máximo se calcula con las medidas. Lo que no quepa en ningún vehículo se envía a WhatsApp.
            </p>
            <q-btn unelevated no-caps icon="add" label="Agregar vehículo" color="blue-6" class="action-btn"
              @click="abrirVehiculo()" />
          </div>
          <div class="la-cards">
            <div v-for="v in datos.vehiculos" :key="v.id" class="la-card" :class="{ inactive: !v.activo }">
              <div class="la-foto">
                <img v-if="v.imagenUrl" :src="v.imagenUrl" :alt="v.nombre" />
                <div v-else class="la-foto-vacia"><q-icon name="local_shipping" size="32px" />Sin foto</div>
              </div>
              <div class="la-card-head">
                <span class="la-code">{{ v.codigo }}</span>
                <strong>{{ v.nombre }}</strong>
                <span v-if="!v.activo" class="la-tag la-tag-off">Inactivo</span>
                <q-space />
                <q-btn flat dense no-caps icon="edit" label="Editar" color="blue-6" @click="abrirVehiculo(v)" />
              </div>
              <dl>
                <div><dt>Peso</dt><dd>{{ v.pesoMinKg ? `${formatNum(v.pesoMinKg)} – ` : 'hasta ' }}{{ formatNum(v.pesoMaxKg) }} kg</dd></div>
                <div><dt>Volumen</dt><dd>{{ rangoVolumen(v) }}</dd></div>
                <div><dt>Medidas internas (L × A × H)</dt><dd>{{ medidasInternas(v) }}</dd></div>
                <div><dt>Carrocería</dt><dd>{{ v.tipoCarroceria || '—' }}</dd></div>
              </dl>
            </div>
          </div>
        </q-tab-panel>

        <!-- Servicios -->
        <q-tab-panel name="servicios" class="q-pa-none">
          <div class="la-toolbar">
            <p class="la-help">
              <q-icon name="info" size="16px" /> Opciones que el cliente puede sumar a su cotización. El precio se
              suma tal cual al total (sin margen).
            </p>
            <q-btn unelevated no-caps icon="add" label="Agregar servicio" color="blue-6" class="action-btn"
              @click="abrirServicio()" />
          </div>
          <div v-if="!datos.servicios.length" class="empty-state column items-center q-py-xl">
            <p class="empty-title">No hay servicios adicionales</p>
          </div>
          <div class="la-cards">
            <div v-for="s in datos.servicios" :key="s.id" class="la-card" :class="{ inactive: !s.activo }">
              <div class="la-card-head">
                <strong>{{ s.nombre }}</strong>
                <span v-if="!s.activo" class="la-tag la-tag-off">Inactivo</span>
                <q-space />
                <q-btn flat dense no-caps icon="edit" label="Editar" color="blue-6" @click="abrirServicio(s)" />
              </div>
              <p class="la-desc">{{ s.descripcion || 'Sin descripción' }}</p>
              <p class="la-price">{{ formatMoney(s.precio) }}</p>
            </div>
          </div>
        </q-tab-panel>

        <!-- Imágenes -->
        <q-tab-panel name="imagenes" class="q-pa-none">
          <div class="la-toolbar">
            <p class="la-help">
              <q-icon name="info" size="16px" /> Las fotos se cambian aquí y se ven de inmediato en la página, sin
              volver a publicar. Las fotos de cada vehículo se cambian en la pestaña <strong>Vehículos</strong> →
              Editar.
            </p>
            <q-btn unelevated no-caps icon="save" color="blue-6" class="action-btn" label="Guardar imágenes"
              :disable="!imagenesCambiadas" :loading="guardandoImagenes" @click="guardarImagenes" />
          </div>
          <div class="la-imagenes">
            <div class="la-card">
              <strong class="la-img-title">Banner de la página de inicio</strong>
              <p class="la-desc">Franja «Logística Empresarial» debajo del buscador. Se muestra recortada a la
                derecha del banner.</p>
              <SubirImagen v-model="imagenes.banner" proporcion="2 / 1" :permitir-quitar="false"
                hint="Horizontal, idealmente 1200 × 600 px o más." />
            </div>
            <div class="la-card">
              <strong class="la-img-title">Encabezado del cotizador</strong>
              <p class="la-desc">Foto grande a la derecha del título «Cotiza tu transporte».</p>
              <SubirImagen v-model="imagenes.encabezado" proporcion="20 / 9" :permitir-quitar="false"
                hint="Muy horizontal, idealmente 1600 × 700 px o más." />
            </div>
          </div>
        </q-tab-panel>

        <!-- Cotizaciones -->
        <q-tab-panel name="cotizaciones" class="q-pa-none">
          <div v-if="cargandoCotizaciones" class="column items-center q-py-xl">
            <q-spinner color="blue-6" size="32px" />
          </div>
          <div v-else-if="!cotizaciones.length" class="empty-state column items-center q-py-xl">
            <q-icon name="request_quote" size="48px" color="grey-4" class="q-mb-md" />
            <p class="empty-title">Aún no hay cotizaciones</p>
            <p class="empty-sub">Aquí aparecen las cotizaciones que los clientes confirman en el cotizador.</p>
          </div>
          <div v-else class="la-table-wrap">
            <table class="la-list">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Ruta · vehículo</th>
                  <th class="num">Costo</th>
                  <th class="num">Ganancia</th>
                  <th class="num">Total cliente</th>
                  <th>Pago</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in cotizaciones" :key="c.id">
                  <td><strong>{{ c.numero }}</strong></td>
                  <td>{{ formatFecha(c.createdAt) }}</td>
                  <td>
                    <div class="la-strong">{{ c.comprador.nombre }}</div>
                    <div class="la-muted">{{ c.comprador.documento }} · {{ c.comprador.telefono }}</div>
                  </td>
                  <td>
                    <div class="la-strong">{{ c.origen }} → {{ c.destino }}</div>
                    <div class="la-muted">{{ c.vehiculo }} · {{ formatPeso(c.pesoKg) }} · {{ c.producto }}</div>
                  </td>
                  <td class="num">{{ formatMoney(c.valorBase) }}</td>
                  <td class="num la-green">{{ formatMoney(c.ganancia) }}</td>
                  <td class="num"><strong>{{ formatMoney(c.total) }}</strong></td>
                  <td>
                    <q-chip dense :color="estadoPago(c).color" text-color="white" class="la-chip">
                      {{ estadoPago(c).label }}
                    </q-chip>
                  </td>
                  <td>
                    <q-btn flat round dense icon="visibility" color="grey-7"
                      :to="`/tienda/logistica/cotizacion/${c.token}`" target="_blank">
                      <q-tooltip>Ver cotización</q-tooltip>
                    </q-btn>
                    <q-btn flat round dense icon="picture_as_pdf" color="grey-7" @click="abrirPdf(c.token)">
                      <q-tooltip>PDF</q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>

    <!-- Diálogo vehículo -->
    <q-dialog v-model="dlgVehiculo.abierto">
      <q-card class="la-dialog">
        <q-card-section class="la-dialog-head">
          <strong>{{ dlgVehiculo.id ? 'Editar vehículo' : 'Nuevo vehículo' }}</strong>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>
        <q-card-section class="la-form">
          <div class="la-grid-2">
            <q-input v-model="dlgVehiculo.f.codigo" label="Código (ej. T9)" outlined dense maxlength="10" />
            <q-input v-model="dlgVehiculo.f.nombre" label="Nombre" outlined dense maxlength="100" />
            <q-input v-model.number="dlgVehiculo.f.pesoMinKg" type="number" label="Peso mínimo (kg, opcional)"
              outlined dense />
            <q-input v-model.number="dlgVehiculo.f.pesoMaxKg" type="number" label="Peso máximo (kg)" outlined dense />
            <q-input v-model.number="dlgVehiculo.f.volumenMinM3" type="number" label="Volumen mínimo (m³, opcional)"
              outlined dense />
            <q-input v-model.number="dlgVehiculo.f.volumenMaxM3" type="number" label="Volumen máximo (m³, opcional)"
              outlined dense />
          </div>
          <p class="la-form-sub">Medidas internas en metros (vacío = estándar 13,5 × 2,45 × 2,6 m)</p>
          <div class="la-grid-3">
            <q-input v-model.number="dlgVehiculo.f.largoM" type="number" label="Largo" suffix="m" outlined dense />
            <q-input v-model.number="dlgVehiculo.f.anchoM" type="number" label="Ancho" suffix="m" outlined dense />
            <q-input v-model.number="dlgVehiculo.f.altoM" type="number" label="Alto" suffix="m" outlined dense />
          </div>
          <div class="la-grid-2">
            <q-input v-model="dlgVehiculo.f.tipoCarroceria" label="Tipo de carrocería (opcional)" outlined dense
              maxlength="100" />
            <q-input v-model.number="dlgVehiculo.f.orden" type="number" label="Orden" outlined dense />
          </div>
          <p class="la-form-sub">Foto del vehículo</p>
          <SubirImagen v-model="dlgVehiculo.f.imagenUrl" proporcion="4 / 3"
            hint="Se muestra en la tarjeta «Vehículo recomendado» del cotizador. Mejor horizontal." />
          <q-toggle v-model="dlgVehiculo.f.activo" label="Activo (se ofrece en el cotizador)" color="blue-6" />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Cancelar" color="grey-8" v-close-popup />
          <q-btn unelevated no-caps label="Guardar" color="blue-6" :loading="guardando" @click="guardarVehiculo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo ruta -->
    <q-dialog v-model="dlgRuta.abierto">
      <q-card class="la-dialog">
        <q-card-section class="la-dialog-head">
          <strong>{{ dlgRuta.id ? 'Editar ruta' : 'Nueva ruta' }}</strong>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>
        <q-card-section class="la-form">
          <div class="la-grid-2">
            <q-input v-model="dlgRuta.f.origen" label="Ciudad A (origen)" outlined dense maxlength="100" />
            <q-input v-model="dlgRuta.f.destino" label="Ciudad B (destino)" outlined dense maxlength="100"
              :hint="dlgRuta.f.tipo === 'urbano' ? 'En urbano, la misma ciudad del origen' : ''" />
            <q-select v-model="dlgRuta.f.tipo" :options="[{ label: 'Nacional', value: 'nacional' }, { label: 'Urbano', value: 'urbano' }]"
              emit-value map-options label="Tipo" outlined dense />
            <q-input v-model.number="dlgRuta.f.entregasIncluidas" type="number" min="1" label="Entregas incluidas"
              outlined dense />
            <q-input v-model.number="dlgRuta.f.orden" type="number" label="Orden" outlined dense />
          </div>
          <q-toggle v-model="dlgRuta.f.activo" label="Visible en el cotizador" color="blue-6" />
          <p class="la-form-sub">
            La ruta sirve en ambos sentidos con el mismo precio: no hace falta crear la de regreso.
            <template v-if="!dlgRuta.id">Después de crearla, llena sus tarifas en la tabla.</template>
          </p>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Cancelar" color="grey-8" v-close-popup />
          <q-btn unelevated no-caps label="Guardar" color="blue-6" :loading="guardando" @click="guardarRuta" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo servicio -->
    <q-dialog v-model="dlgServicio.abierto">
      <q-card class="la-dialog">
        <q-card-section class="la-dialog-head">
          <strong>{{ dlgServicio.id ? 'Editar servicio' : 'Nuevo servicio' }}</strong>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>
        <q-card-section class="la-form">
          <q-input v-model="dlgServicio.f.nombre" label="Nombre (ej. Seguro de transporte)" outlined dense
            maxlength="150" />
          <q-input v-model="dlgServicio.f.descripcion" label="Descripción para el cliente (opcional)" outlined dense
            autogrow maxlength="500" />
          <div class="la-grid-2">
            <q-input v-model.number="dlgServicio.f.precio" type="number" label="Precio" prefix="$" outlined dense />
            <q-input v-model.number="dlgServicio.f.orden" type="number" label="Orden" outlined dense />
          </div>
          <q-toggle v-model="dlgServicio.f.activo" label="Activo (se ofrece en el cotizador)" color="blue-6" />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Cancelar" color="grey-8" v-close-popup />
          <q-btn unelevated no-caps label="Guardar" color="blue-6" :loading="guardando" @click="guardarServicio" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Vista previa de la plantilla subida -->
    <q-dialog v-model="excel.abierto" :maximized="$q.screen.lt.sm">
      <q-card class="la-dialog la-dialog-wide">
        <q-card-section class="la-dialog-head">
          <div>
            <strong>Revisar cambios de la plantilla</strong>
            <div class="la-muted">{{ excel.archivo }} · {{ excel.filasLeidas }} destinos y {{ excel.vehiculosLeidos }}
              vehículos leídos</div>
          </div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="la-form">
          <div v-if="excel.errores.length" class="la-aviso la-aviso-error">
            <q-icon name="error_outline" size="20px" />
            <div>
              <strong>{{ excel.errores.length }} celda(s) con valores no válidos</strong> — no se guardarán; corrígelas en
              el archivo si quieres incluirlas.
              <ul>
                <li v-for="(e, i) in excel.errores.slice(0, 12)" :key="i">{{ e }}</li>
                <li v-if="excel.errores.length > 12">y {{ excel.errores.length - 12 }} más…</li>
              </ul>
            </div>
          </div>
          <div v-if="excel.avisos.length" class="la-aviso">
            <q-icon name="info" size="20px" />
            <ul>
              <li v-for="(a, i) in excel.avisos" :key="i">{{ a }}</li>
            </ul>
          </div>

          <div v-if="!excel.cambios.length" class="empty-state column items-center q-py-lg">
            <q-icon name="task_alt" size="40px" color="green-6" class="q-mb-sm" />
            <p class="empty-title">No hay cambios de precio</p>
            <p class="empty-sub">Los valores del archivo son iguales a los que ya están guardados.</p>
          </div>

          <template v-else>
            <p class="la-resumen-cambios">
              <strong>{{ excel.cambios.length }} cambio(s):</strong>
              <span v-if="resumenExcel.nuevos">{{ resumenExcel.nuevos }} nuevo(s)</span>
              <span v-if="resumenExcel.modificados">{{ resumenExcel.modificados }} modificado(s)</span>
              <span v-if="resumenExcel.quitados" class="la-rojo">{{ resumenExcel.quitados }} quitado(s)</span>
            </p>
            <div class="la-table-wrap la-cambios-wrap">
              <table class="la-list">
                <thead>
                  <tr>
                    <th>Destino</th>
                    <th>Vehículo</th>
                    <th class="num">Antes</th>
                    <th class="num">Ahora</th>
                    <th class="num">Cliente verá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(c, i) in excel.cambios" :key="i">
                    <td class="la-strong">{{ c.ruta.destino }}</td>
                    <td>{{ c.vehiculo.codigo }} · {{ c.vehiculo.nombre }}</td>
                    <td class="num la-muted">{{ c.antes == null ? '—' : formatMoney(c.antes) }}</td>
                    <td class="num" :class="c.despues == null ? 'la-rojo' : 'la-strong'">
                      {{ c.despues == null ? 'Se quita' : formatMoney(c.despues) }}
                    </td>
                    <td class="num la-green">{{ c.despues == null ? '—' : formatMoney(precioCliente(c.despues)) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="resumenExcel.quitados" class="la-form-sub la-rojo">
              "Se quita" = la celda quedó vacía: ese vehículo dejará de ofrecerse en esa ruta.
            </p>
          </template>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Cancelar" color="grey-8" v-close-popup />
          <q-btn v-if="excel.cambios.length" unelevated no-caps color="green-8" icon="check"
            :label="`Aplicar ${excel.cambios.length} cambio(s)`" :loading="aplicandoExcel" @click="aplicarExcel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { logisticaApi } from '../../../api/logistica'
import SubirImagen from '../../../components/logistica/SubirImagen.vue'
import {
  descargarPlantilla, leerPlantilla, rangoPeso, rangoVolumen, medidasInternas,
} from '../../../utils/tarifasExcel'

const $q = useQuasar()

const cargando = ref(true)
const sinPermiso = ref(false)
const errorCarga = ref('')
const tab = ref('tarifas')
const guardando = ref(false)

const datos = reactive({ margenPct: 30, imagenes: {}, vehiculos: [], rutas: [], tarifas: [], servicios: [] })

// ── Imágenes (banner de inicio y encabezado del cotizador) ──

const imagenes = reactive({ banner: '', encabezado: '' })
const guardandoImagenes = ref(false)

const imagenesCambiadas = computed(
  () => imagenes.banner !== (datos.imagenes.banner || '') || imagenes.encabezado !== (datos.imagenes.encabezado || ''),
)

async function guardarImagenes() {
  guardandoImagenes.value = true
  try {
    const { data } = await logisticaApi.guardarImagenes({ banner: imagenes.banner, encabezado: imagenes.encabezado })
    datos.imagenes = { ...data }
    imagenes.banner = data.banner
    imagenes.encabezado = data.encabezado
    $q.notify({ message: 'Imágenes guardadas. Ya se ven en la página.', color: 'green-6', position: 'top' })
  } catch (e) {
    $q.notify({ message: mensajeError(e, 'No se pudieron guardar las imágenes.'), color: 'red-5', position: 'top' })
  } finally {
    guardandoImagenes.value = false
  }
}

const origen = computed(() => datos.rutas[0]?.origen || 'Bogotá')

// ── Carga ──

function aplicarDatos(d) {
  datos.margenPct = d.margenPct
  datos.imagenes = { ...d.imagenes }
  imagenes.banner = d.imagenes?.banner || ''
  imagenes.encabezado = d.imagenes?.encabezado || ''
  datos.vehiculos = d.vehiculos
  datos.rutas = d.rutas
  datos.tarifas = d.tarifas
  datos.servicios = d.servicios
  cambios.value = {}
}

async function cargar() {
  cargando.value = true
  errorCarga.value = ''
  try {
    const { data: permiso } = await logisticaApi.getPermiso()
    if (!permiso.editor) {
      sinPermiso.value = true
      return
    }
    const { data } = await logisticaApi.getDatosAdmin()
    aplicarDatos(data)
  } catch (e) {
    if (e?.response?.status === 403) sinPermiso.value = true
    else errorCarga.value = mensajeError(e, 'Intenta de nuevo en un momento.')
  } finally {
    cargando.value = false
  }
}

// ── Tarifas ──

const cambios = ref({}) // clave `${rutaId}|${vehiculoId}` → número | null
const guardandoTarifas = ref(false)

const clave = (rutaId, vehiculoId) => `${rutaId}|${vehiculoId}`.toUpperCase()

const tarifasIndex = computed(() => {
  const m = new Map()
  for (const t of datos.tarifas) m.set(clave(t.rutaId, t.vehiculoId), t.valorBase)
  return m
})

function celda(rutaId, vehiculoId) {
  const k = clave(rutaId, vehiculoId)
  if (k in cambios.value) return cambios.value[k] ?? ''
  return tarifasIndex.value.get(k) ?? ''
}

function editarCelda(rutaId, vehiculoId, valor) {
  const k = clave(rutaId, vehiculoId)
  const nuevo = valor === '' ? null : Number(valor)
  const original = tarifasIndex.value.get(k) ?? null
  const siguiente = { ...cambios.value }
  if (nuevo === original) delete siguiente[k]
  else siguiente[k] = nuevo
  cambios.value = siguiente
}

const esCambio = (rutaId, vehiculoId) => clave(rutaId, vehiculoId) in cambios.value

const cambiosTarifas = computed(() => Object.keys(cambios.value).length)

const precioCliente = (base) => Math.round(Number(base) * (1 + datos.margenPct / 100))

async function guardarTarifas() {
  const invalidas = Object.values(cambios.value).some((v) => v != null && (!Number.isFinite(v) || v < 0))
  if (invalidas) {
    $q.notify({ message: 'Hay valores inválidos en la tabla.', color: 'red-5', position: 'top' })
    return
  }
  guardandoTarifas.value = true
  try {
    const porId = (lista, k) => lista.find((x) => x.id.toUpperCase() === k)
    const items = Object.entries(cambios.value).map(([k, valorBase]) => {
      const [r, v] = k.split('|')
      return { rutaId: porId(datos.rutas, r).id, vehiculoId: porId(datos.vehiculos, v).id, valorBase }
    })
    const { data } = await logisticaApi.guardarTarifas(items)
    aplicarDatos(data)
    $q.notify({ message: 'Tarifas guardadas. El cotizador ya usa los nuevos valores.', color: 'green-6', position: 'top' })
  } catch (e) {
    $q.notify({ message: mensajeError(e, 'No se pudieron guardar las tarifas.'), color: 'red-5', position: 'top' })
  } finally {
    guardandoTarifas.value = false
  }
}

// ── Plantilla Excel ──

const descargando = ref(false)
const leyendoExcel = ref(false)
const aplicandoExcel = ref(false)
const inputExcel = ref(null)
const excel = reactive({ abierto: false, archivo: '', cambios: [], errores: [], avisos: [], filasLeidas: 0, vehiculosLeidos: 0 })

const resumenExcel = computed(() => ({
  nuevos: excel.cambios.filter((c) => c.antes == null && c.despues != null).length,
  modificados: excel.cambios.filter((c) => c.antes != null && c.despues != null).length,
  quitados: excel.cambios.filter((c) => c.despues == null).length,
}))

async function descargar() {
  if (cambiosTarifas.value) {
    $q.notify({
      message: 'Tienes cambios sin guardar en la tabla: la plantilla sale con los valores guardados.',
      color: 'orange-8', position: 'top',
    })
  }
  descargando.value = true
  try {
    await descargarPlantilla(datos)
  } catch (e) {
    $q.notify({ message: e?.message || 'No se pudo generar la plantilla.', color: 'red-5', position: 'top' })
  } finally {
    descargando.value = false
  }
}

function elegirExcel() {
  if (cambiosTarifas.value) {
    $q.notify({ message: 'Guarda o descarta primero los cambios de la tabla.', color: 'orange-8', position: 'top' })
    return
  }
  inputExcel.value?.click()
}

async function subirExcel(e) {
  const archivo = e.target.files?.[0]
  e.target.value = ''
  if (!archivo) return
  if (archivo.size > 5 * 1024 * 1024) {
    $q.notify({ message: 'El archivo pesa más de 5 MB.', color: 'orange-8', position: 'top' })
    return
  }
  leyendoExcel.value = true
  try {
    const r = await leerPlantilla(archivo, datos)
    Object.assign(excel, { ...r, archivo: archivo.name, abierto: true })
  } catch (err) {
    $q.notify({ message: err?.message || 'No se pudo leer el archivo.', color: 'red-5', position: 'top', timeout: 5000 })
  } finally {
    leyendoExcel.value = false
  }
}

async function aplicarExcel() {
  aplicandoExcel.value = true
  try {
    const items = excel.cambios.map((c) => ({ rutaId: c.ruta.id, vehiculoId: c.vehiculo.id, valorBase: c.despues }))
    const { data } = await logisticaApi.guardarTarifas(items)
    aplicarDatos(data)
    excel.abierto = false
    $q.notify({
      message: `${items.length} tarifa(s) actualizadas desde el Excel. El cotizador ya usa los nuevos valores.`,
      color: 'green-6', position: 'top',
    })
  } catch (err) {
    $q.notify({ message: mensajeError(err, 'No se pudieron guardar las tarifas.'), color: 'red-5', position: 'top' })
  } finally {
    aplicandoExcel.value = false
  }
}

// ── Vehículos ──

const vacioVehiculo = () => ({
  codigo: '', nombre: '', pesoMinKg: null, pesoMaxKg: null, volumenMinM3: null, volumenMaxM3: null,
  largoM: null, anchoM: null, altoM: null, tipoCarroceria: '', imagenUrl: '', orden: datos.vehiculos.length + 1,
  activo: true,
})
const dlgVehiculo = reactive({ abierto: false, id: null, f: vacioVehiculo() })

function abrirVehiculo(v) {
  dlgVehiculo.id = v?.id || null
  dlgVehiculo.f = v
    ? {
        codigo: v.codigo, nombre: v.nombre, pesoMinKg: v.pesoMinKg, pesoMaxKg: v.pesoMaxKg,
        volumenMinM3: v.volumenMinM3, volumenMaxM3: v.volumenMaxM3, largoM: v.largoM, anchoM: v.anchoM,
        altoM: v.altoM, tipoCarroceria: v.tipoCarroceria || '', imagenUrl: v.imagenUrl || '', orden: v.orden,
        activo: v.activo,
      }
    : vacioVehiculo()
  dlgVehiculo.abierto = true
}

const numONull = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v))

async function guardarVehiculo() {
  const f = dlgVehiculo.f
  if (!f.codigo.trim() || !f.nombre.trim() || !(numONull(f.pesoMaxKg) > 0)) {
    $q.notify({ message: 'Código, nombre y peso máximo son obligatorios.', color: 'orange-8', position: 'top' })
    return
  }
  const payload = {
    codigo: f.codigo.trim(),
    nombre: f.nombre.trim(),
    pesoMinKg: numONull(f.pesoMinKg),
    pesoMaxKg: numONull(f.pesoMaxKg),
    volumenMinM3: numONull(f.volumenMinM3),
    volumenMaxM3: numONull(f.volumenMaxM3),
    largoM: numONull(f.largoM),
    anchoM: numONull(f.anchoM),
    altoM: numONull(f.altoM),
    tipoCarroceria: f.tipoCarroceria.trim() || null,
    imagenUrl: f.imagenUrl.trim() || null,
    orden: numONull(f.orden) ?? 0,
    activo: f.activo,
  }
  await guardarCon(
    () => (dlgVehiculo.id ? logisticaApi.actualizarVehiculo(dlgVehiculo.id, payload) : logisticaApi.crearVehiculo(payload)),
    () => (dlgVehiculo.abierto = false),
    'Vehículo guardado.',
  )
}

// ── Rutas ──

const vacioRuta = () => ({
  origen: origen.value, destino: '', tipo: 'nacional', entregasIncluidas: 1, orden: datos.rutas.length + 1, activo: true,
})
const dlgRuta = reactive({ abierto: false, id: null, f: vacioRuta() })

function abrirRuta(r) {
  dlgRuta.id = r?.id || null
  dlgRuta.f = r
    ? { origen: r.origen, destino: r.destino, tipo: r.tipo, entregasIncluidas: r.entregasIncluidas, orden: r.orden, activo: r.activo }
    : vacioRuta()
  dlgRuta.abierto = true
}

async function guardarRuta() {
  const f = dlgRuta.f
  if (!f.origen.trim() || !f.destino.trim()) {
    $q.notify({ message: 'Origen y destino son obligatorios.', color: 'orange-8', position: 'top' })
    return
  }
  const payload = {
    origen: f.origen.trim(),
    destino: f.destino.trim(),
    tipo: f.tipo,
    entregasIncluidas: Math.max(1, Math.round(numONull(f.entregasIncluidas) || 1)),
    orden: numONull(f.orden) ?? 0,
    activo: f.activo,
  }
  await guardarCon(
    () => (dlgRuta.id ? logisticaApi.actualizarRuta(dlgRuta.id, payload) : logisticaApi.crearRuta(payload)),
    () => (dlgRuta.abierto = false),
    'Ruta guardada.',
  )
}

// ── Servicios ──

const vacioServicio = () => ({ nombre: '', descripcion: '', precio: null, orden: datos.servicios.length + 1, activo: true })
const dlgServicio = reactive({ abierto: false, id: null, f: vacioServicio() })

function abrirServicio(s) {
  dlgServicio.id = s?.id || null
  dlgServicio.f = s
    ? { nombre: s.nombre, descripcion: s.descripcion || '', precio: s.precio, orden: s.orden, activo: s.activo }
    : vacioServicio()
  dlgServicio.abierto = true
}

async function guardarServicio() {
  const f = dlgServicio.f
  if (!f.nombre.trim() || numONull(f.precio) == null || numONull(f.precio) < 0) {
    $q.notify({ message: 'Nombre y precio son obligatorios.', color: 'orange-8', position: 'top' })
    return
  }
  const payload = {
    nombre: f.nombre.trim(),
    descripcion: f.descripcion.trim() || null,
    precio: numONull(f.precio),
    orden: numONull(f.orden) ?? 0,
    activo: f.activo,
  }
  await guardarCon(
    () => (dlgServicio.id ? logisticaApi.actualizarServicio(dlgServicio.id, payload) : logisticaApi.crearServicio(payload)),
    () => (dlgServicio.abierto = false),
    'Servicio guardado.',
  )
}

/** Guarda, recarga los datos (sin perder cambios pendientes de la tabla de tarifas) y avisa. */
async function guardarCon(accion, cerrar, mensajeOk) {
  guardando.value = true
  try {
    await accion()
    const pendientes = cambios.value
    const { data } = await logisticaApi.getDatosAdmin()
    aplicarDatos(data)
    cambios.value = pendientes
    cerrar()
    $q.notify({ message: mensajeOk, color: 'green-6', position: 'top' })
  } catch (e) {
    $q.notify({ message: mensajeError(e, 'No se pudo guardar.'), color: 'red-5', position: 'top' })
  } finally {
    guardando.value = false
  }
}

// ── Cotizaciones ──

const cotizaciones = ref([])
const cargandoCotizaciones = ref(false)
let cotizacionesCargadas = false

watch(tab, async (t) => {
  if (t !== 'cotizaciones' || cotizacionesCargadas) return
  cargandoCotizaciones.value = true
  try {
    const { data } = await logisticaApi.getCotizacionesAdmin()
    cotizaciones.value = data
    cotizacionesCargadas = true
  } catch (e) {
    $q.notify({ message: mensajeError(e, 'No se pudieron cargar las cotizaciones.'), color: 'red-5', position: 'top' })
  } finally {
    cargandoCotizaciones.value = false
  }
})

function estadoPago(c) {
  if (c.estadoPago === 'approved') return { label: 'Pagada', color: 'green-6' }
  if (['declined', 'voided', 'error'].includes(c.estadoPago)) return { label: 'Pago fallido', color: 'red-5' }
  if (new Date(c.vigenteHasta) < new Date()) return { label: 'Vencida', color: 'grey-6' }
  return { label: 'Pendiente', color: 'orange-6' }
}

// El PDF se pide con la sesión (las cotizaciones de clientes con cuenta la exigen).
async function abrirPdf(token) {
  try {
    await logisticaApi.abrirPdf(token)
  } catch (e) {
    $q.notify({ message: mensajeError(e, 'No se pudo abrir el PDF.'), color: 'red-5', position: 'top' })
  }
}

// ── Formato ──

function formatNum(n) {
  return Number(n).toLocaleString('es-CO', { maximumFractionDigits: 2 })
}

function formatPeso(kg) {
  return kg >= 1000 ? `${formatNum(kg / 1000)} t` : `${formatNum(kg)} kg`
}

function formatMoney(n) {
  return `$ ${Number(n || 0).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
}

function formatFecha(v) {
  return new Date(v).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

function mensajeError(e, porDefecto) {
  const m = e?.response?.data?.message
  if (Array.isArray(m)) return m.join(' ')
  return m || porDefecto
}

onMounted(cargar)
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  margin: 0;
}

.page-sub {
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  margin: 0;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
}

.empty-title {
  font-size: 16px;
  font-weight: 800;
  color: #0b1220;
  margin: 0 0 4px;
}

.empty-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .5);
  margin: 0;
  text-align: center;
  max-width: 420px;
}

.la-tabs {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}

.la-panels {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 0 0 12px 12px;
  padding: 18px;
}

.la-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
}

.la-help {
  margin: 0;
  max-width: 720px;
  font-size: 13px;
  color: rgba(11, 18, 32, .6);
  line-height: 1.5;
}

.la-table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(11, 18, 32, .08);
  border-radius: 10px;
}

.la-matrix {
  border-collapse: collapse;
  font-size: 12.5px;
  min-width: 100%;
}

.la-matrix th,
.la-matrix td {
  border-bottom: 1px solid rgba(11, 18, 32, .07);
  border-right: 1px solid rgba(11, 18, 32, .05);
  padding: 8px;
  vertical-align: top;
}

.la-matrix th {
  background: #f7f9fc;
  text-align: center;
  min-width: 118px;
}

.la-matrix th.inactive,
.la-matrix tr.inactive td {
  opacity: .5;
}

.la-sticky {
  position: sticky;
  left: 0;
  z-index: 1;
  background: #fff;
  min-width: 190px;
  text-align: left !important;
}

.la-matrix th.la-sticky {
  background: #f7f9fc;
}

.la-th-code {
  font-weight: 900;
  color: #0071e3;
}

.la-th-name {
  font-weight: 700;
  color: #0b1220;
}

.la-th-cap {
  font-size: 11px;
  color: rgba(11, 18, 32, .45);
  font-weight: 600;
}

.la-ruta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.la-ruta strong {
  display: block;
  font-size: 13px;
  color: #0b1220;
}

.la-tag {
  display: inline-block;
  margin-top: 2px;
  margin-right: 4px;
  padding: 1px 7px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 10.5px;
  font-weight: 700;
}

.la-tag-off {
  background: #f1f5f9;
  color: #64748b;
}

.la-cell {
  width: 100%;
  min-width: 100px;
  padding: 6px 8px;
  border: 1px solid rgba(11, 18, 32, .12);
  border-radius: 8px;
  font: inherit;
  font-weight: 700;
  text-align: right;
  color: #0b1220;
  background: #fff;
}

.la-cell:focus {
  outline: none;
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, .15);
}

td.dirty .la-cell {
  border-color: #f59e0b;
  background: #fffbeb;
}

.la-cliente {
  margin-top: 3px;
  font-size: 10.5px;
  color: #16a34a;
  font-weight: 700;
  text-align: right;
}

.la-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.la-card {
  border: 1px solid rgba(11, 18, 32, .09);
  border-radius: 12px;
  padding: 14px;
}

.la-card.inactive {
  opacity: .6;
}

.la-foto {
  margin: -14px -14px 12px;
  aspect-ratio: 4 / 3;
  max-height: 170px;
  width: calc(100% + 28px);
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: #f1f5f9;
}

.la-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.la-foto-vacia {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
}

.la-imagenes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 14px;
}

.la-img-title {
  display: block;
  font-size: 15px;
  color: #0b1220;
  margin-bottom: 2px;
}

.la-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.la-code {
  padding: 2px 8px;
  border-radius: 6px;
  background: #0071e3;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
}

.la-card dl {
  margin: 0;
}

.la-card dl>div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 3px 0;
  font-size: 12.5px;
}

.la-card dt {
  color: rgba(11, 18, 32, .5);
}

.la-card dd {
  margin: 0;
  font-weight: 700;
  color: #0b1220;
  text-align: right;
}

.la-desc {
  margin: 0 0 6px;
  font-size: 12.5px;
  color: rgba(11, 18, 32, .6);
}

.la-price {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: #0071e3;
}

.la-list {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.la-list th {
  text-align: left;
  padding: 10px;
  background: #f7f9fc;
  color: rgba(11, 18, 32, .55);
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: .4px;
  white-space: nowrap;
}

.la-list td {
  padding: 10px;
  border-bottom: 1px solid rgba(11, 18, 32, .06);
  vertical-align: top;
}

.la-list .num {
  text-align: right;
  white-space: nowrap;
}

.la-strong {
  font-weight: 700;
  color: #0b1220;
}

.la-muted {
  font-size: 11.5px;
  color: rgba(11, 18, 32, .5);
}

.la-green {
  color: #16a34a;
  font-weight: 700;
}

.la-excel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;
  border-radius: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.la-excel-text {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: rgba(11, 18, 32, .6);
}

.la-excel-text strong {
  font-size: 14px;
  color: #14532d;
}

.la-excel .q-btn {
  border-radius: 10px;
  font-weight: 700;
}

.la-subtitle {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: rgba(11, 18, 32, .45);
}

.la-tipologias tr.inactive td {
  opacity: .5;
}

.la-matrix th.la-th-small {
  min-width: 90px;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .6);
}

.la-td-center {
  text-align: center;
  font-weight: 600;
  color: rgba(11, 18, 32, .7);
}

.la-dialog-wide {
  width: 860px;
}

.la-aviso {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eff6ff;
  color: #1e40af;
  font-size: 12.5px;
}

.la-aviso ul {
  margin: 4px 0 0;
  padding-left: 18px;
}

.la-aviso-error {
  background: #fef2f2;
  color: #b91c1c;
}

.la-resumen-cambios {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  font-size: 13.5px;
  color: #0b1220;
}

.la-cambios-wrap {
  max-height: 46vh;
  overflow-y: auto;
}

.la-rojo {
  color: #dc2626;
  font-weight: 700;
}

.la-chip {
  font-size: 11px;
  height: 22px;
  font-weight: 800;
}

.la-dialog {
  width: 600px;
  max-width: 96vw;
  border-radius: 16px;
}

.la-dialog-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  border-bottom: 1px solid rgba(11, 18, 32, .08);
}

.la-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.la-form-sub {
  margin: 4px 0 -4px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(11, 18, 32, .5);
}

.la-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.la-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 700px) {
  .la-toolbar {
    flex-direction: column;
  }

  .la-grid-2,
  .la-grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
