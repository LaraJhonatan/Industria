<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Ventas manuales</h1>
        <p class="page-sub">Registra ventas pagadas por transferencia u otro medio fuera de PSE</p>
      </div>
      <q-btn unelevated label="Nueva venta" icon="add" color="blue-6" class="action-btn" @click="openCreate" />
    </div>

    <div v-if="loading" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else-if="!orders.length" class="empty-state column items-center q-py-xl">
      <div class="empty-icon q-mb-md">
        <q-icon name="receipt_long" size="48px" color="grey-4" />
      </div>
      <p class="empty-title">Aún no tienes ventas manuales</p>
      <p class="empty-sub">Regístralas cuando un cliente pague por transferencia u otro medio distinto a PSE.</p>
      <q-btn unelevated label="Registrar venta" icon="add" color="blue-6" class="action-btn q-mt-md" @click="openCreate" />
    </div>

    <div v-else class="orders-list">
      <div v-for="o in orders" :key="o.id" class="order-card">
        <div class="order-card-header">
          <div>
            <div class="order-comprador">{{ o.compradorNombre }}</div>
            <div class="order-meta">
              <span v-if="o.compradorDocumento">Doc: {{ o.compradorDocumento }}</span>
              <span v-if="o.compradorEmail">{{ o.compradorEmail }}</span>
              <span>{{ formatDate(o.createdAt) }}</span>
            </div>
          </div>
          <q-chip dense :color="o.estado === 'approved' ? 'green-6' : 'orange-6'" text-color="white"
            style="font-size:11px;height:22px;font-weight:800">
            {{ o.estado === 'approved' ? 'Pagada' : 'Cotización' }}
          </q-chip>
        </div>

        <div class="order-items">
          <div v-for="item in o.items" :key="item.id" class="order-item-row">
            <span class="oi-name">{{ item.nombre }}</span>
            <span class="oi-qty">x{{ item.cantidad }}</span>
            <span class="oi-subtotal">${{ formatMoney(item.subtotal) }}</span>
          </div>
        </div>

        <div class="order-card-footer">
          <div class="order-total">
            <span>Total</span>
            <strong>${{ formatMoney(o.subtotal) }} {{ o.moneda }}</strong>
          </div>
          <div class="order-actions">
            <q-btn v-if="o.estado !== 'approved'" flat dense no-caps label="Editar" color="grey-8"
              style="font-weight:700;font-size:12.5px" @click="openEdit(o)" />
            <q-btn v-if="o.estado !== 'approved'" unelevated dense no-caps label="Marcar pagada" color="blue-6"
              style="font-weight:700;font-size:12.5px" @click="openPagar(o)" />
            <q-btn unelevated dense no-caps :label="o.estado === 'approved' ? 'Comprobante' : 'Cotización (PDF)'"
              icon="download" :color="o.estado === 'approved' ? 'dark' : 'orange-8'"
              :loading="descargando === o.id" style="font-weight:700;font-size:12.5px" @click="onDescargar(o)" />
          </div>
        </div>
      </div>
    </div>

    <!-- Crear / editar venta manual -->
    <q-dialog v-model="formOpen" persistent>
      <q-card style="width:640px;max-width:95vw;border-radius:16px">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">{{ editingId ? 'Editar venta' : 'Nueva venta manual' }}</div>
          <q-btn flat round dense icon="close" v-close-popup @click="formOpen = false" />
        </q-card-section>

        <q-card-section style="max-height:70vh;overflow-y:auto">
          <p class="section-label">Comprador</p>
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-12"><q-input v-model="form.comprador.nombre" outlined dense label="Nombre completo *" /></div>
            <div class="col-6"><q-input v-model="form.comprador.documento" outlined dense label="Documento (NIT/CC)" /></div>
            <div class="col-6"><q-input v-model="form.comprador.telefono" outlined dense label="Teléfono" /></div>
            <div class="col-12"><q-input v-model="form.comprador.email" outlined dense label="Email (opcional)" /></div>
          </div>

          <p class="section-label">Productos / servicios</p>
          <div v-for="(item, idx) in form.items" :key="idx" class="item-row">
            <q-select
              v-model="item.selectedProduct"
              :options="productOptions"
              option-label="nombre"
              use-input
              outlined dense clearable
              class="col-item-name"
              label="Buscar en mi catálogo (o deja vacío para línea libre)"
              @filter="onFilterProducts"
              @update:model-value="(v) => onSelectProduct(item, v)"
            >
              <template #no-option>
                <q-item><q-item-section class="text-grey">Sin resultados</q-item-section></q-item>
              </template>
            </q-select>
            <q-input v-if="!item.productId" v-model="item.nombre" outlined dense label="Nombre de la línea *"
              class="col-item-name-free" />
            <q-input v-model.number="item.precioUnitario" type="number" outlined dense label="Precio" class="col-item-price" />
            <q-input v-model.number="item.cantidad" type="number" outlined dense label="Cant." class="col-item-qty" />
            <q-btn flat round dense icon="delete_outline" color="red-5" @click="removeItem(idx)" />
          </div>
          <q-btn flat dense no-caps label="+ Agregar línea" color="blue-6" class="q-mb-md" @click="addItem" />

          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-12"><q-input v-model="form.envio.direccion" outlined dense label="Dirección de entrega (opcional)" /></div>
            <div class="col-6"><q-input v-model="form.envio.ciudad" outlined dense label="Ciudad" /></div>
            <div class="col-6"><q-input v-model="form.envio.departamento" outlined dense label="Departamento" /></div>
          </div>

          <q-checkbox v-model="form.yaPagado" label="Esta venta ya está pagada" />
          <q-select v-if="form.yaPagado" v-model="form.medioPago" :options="MEDIOS_PAGO" outlined dense
            label="Medio de pago *" class="q-mt-sm" />

          <p v-if="formError" class="form-error">{{ formError }}</p>

          <div class="row justify-end q-mt-md" style="font-size:14px;font-weight:800">
            Total: ${{ formatMoney(totalForm) }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Cancelar" v-close-popup @click="formOpen = false" />
          <q-btn unelevated no-caps label="Guardar" color="blue-6" :loading="saving" @click="onSaveForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Marcar como pagada -->
    <q-dialog v-model="pagarOpen">
      <q-card style="width:380px;border-radius:16px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Marcar como pagada</div>
          <p class="text-caption text-grey-6">{{ pagarTarget?.compradorNombre }}</p>
        </q-card-section>
        <q-card-section>
          <q-select v-model="medioPagoConfirm" :options="MEDIOS_PAGO" outlined dense label="Medio de pago *" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat no-caps label="Cancelar" v-close-popup />
          <q-btn unelevated no-caps label="Confirmar" color="green-6" :loading="pagando" @click="onConfirmPagar" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { ordersApi } from '../../../api/orders'
import { productsApi } from '../../../api/products'
import { downloadBlob } from '../../../utils/downloadBlob'

const $q = useQuasar()
const MEDIOS_PAGO = ['Transferencia bancaria', 'Efectivo', 'Cheque', 'Otro']

const orders = ref([])
const loading = ref(true)
const descargando = ref(null)

const formOpen = ref(false)
const editingId = ref(null)
const saving = ref(false)
const formError = ref('')
const productOptions = ref([])

function emptyForm() {
  return {
    comprador: { nombre: '', documento: '', email: '', telefono: '', usuarioId: null },
    items: [{ productId: null, selectedProduct: null, nombre: '', precioUnitario: null, cantidad: 1 }],
    envio: { direccion: '', ciudad: '', departamento: '' },
    yaPagado: false,
    medioPago: null,
  }
}
const form = ref(emptyForm())

const totalForm = computed(() =>
  form.value.items.reduce((s, i) => s + (Number(i.precioUnitario) || 0) * (Number(i.cantidad) || 0), 0),
)

function formatMoney(value) {
  if (value == null) return '0'
  return Number(value).toLocaleString('es-CO')
}

function formatDate(value) {
  return new Date(value).toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

function addItem() {
  form.value.items.push({ productId: null, selectedProduct: null, nombre: '', precioUnitario: null, cantidad: 1 })
}

function removeItem(idx) {
  if (form.value.items.length <= 1) return
  form.value.items.splice(idx, 1)
}

function onSelectProduct(item, product) {
  if (!product) {
    item.productId = null
    item.nombre = ''
    return
  }
  item.productId = product.id
  item.nombre = product.nombre
  if (product.precioBase != null) item.precioUnitario = Number(product.precioBase)
}

async function onFilterProducts(val, update) {
  try {
    const { data } = await productsApi.getAll({ q: val, limit: 15 })
    update(() => { productOptions.value = data?.data || data?.items || data || [] })
  } catch {
    update(() => { productOptions.value = [] })
  }
}

function openCreate() {
  editingId.value = null
  form.value = emptyForm()
  formError.value = ''
  formOpen.value = true
}

function openEdit(order) {
  editingId.value = order.id
  form.value = {
    comprador: {
      nombre: order.compradorNombre || '',
      documento: order.compradorDocumento || '',
      email: order.compradorEmail || '',
      telefono: order.compradorTelefono || '',
      usuarioId: order.usuarioId || null,
    },
    items: order.items.map((i) => ({
      productId: i.productId,
      selectedProduct: i.productId ? { id: i.productId, nombre: i.nombre } : null,
      nombre: i.nombre,
      precioUnitario: Number(i.precioUnitario),
      cantidad: i.cantidad,
    })),
    envio: {
      direccion: order.envioDireccion || '',
      ciudad: order.envioCiudad || '',
      departamento: order.envioDepartamento || '',
    },
    yaPagado: false,
    medioPago: null,
  }
  formError.value = ''
  formOpen.value = true
}

function buildPayload() {
  return {
    comprador: { ...form.value.comprador },
    items: form.value.items.map((i) => ({
      productId: i.productId || undefined,
      nombre: i.productId ? undefined : i.nombre,
      precioUnitario: Number(i.precioUnitario),
      cantidad: Number(i.cantidad),
    })),
    envio: form.value.envio.direccion ? { ...form.value.envio } : undefined,
    yaPagado: form.value.yaPagado,
    medioPago: form.value.yaPagado ? form.value.medioPago : undefined,
  }
}

async function onSaveForm() {
  formError.value = ''
  if (!form.value.comprador.nombre.trim()) {
    formError.value = 'Ingresa el nombre del comprador.'
    return
  }
  for (const i of form.value.items) {
    if (!i.productId && !i.nombre?.trim()) {
      formError.value = 'Cada línea sin producto del catálogo necesita un nombre.'
      return
    }
    if (!i.precioUnitario || i.precioUnitario <= 0) {
      formError.value = 'Cada línea necesita un precio mayor a cero.'
      return
    }
    if (!i.cantidad || i.cantidad <= 0) {
      formError.value = 'Cada línea necesita una cantidad mayor a cero.'
      return
    }
  }
  if (form.value.yaPagado && !form.value.medioPago) {
    formError.value = 'Indica el medio de pago.'
    return
  }

  saving.value = true
  try {
    const payload = buildPayload()
    if (editingId.value) {
      await ordersApi.updateManual(editingId.value, payload)
    } else {
      await ordersApi.createManual(payload)
    }
    formOpen.value = false
    await loadOrders()
    $q.notify({ message: 'Venta guardada', color: 'green-6', position: 'top', timeout: 2000 })
  } catch (e) {
    formError.value = e.response?.data?.message || 'No se pudo guardar la venta.'
  } finally {
    saving.value = false
  }
}

const pagarOpen = ref(false)
const pagarTarget = ref(null)
const medioPagoConfirm = ref(null)
const pagando = ref(false)

function openPagar(order) {
  pagarTarget.value = order
  medioPagoConfirm.value = null
  pagarOpen.value = true
}

async function onConfirmPagar() {
  if (!medioPagoConfirm.value) return
  pagando.value = true
  try {
    await ordersApi.marcarPagadaManual(pagarTarget.value.id, medioPagoConfirm.value)
    pagarOpen.value = false
    await loadOrders()
    $q.notify({ message: 'Venta marcada como pagada', color: 'green-6', position: 'top', timeout: 2000 })
  } catch (e) {
    $q.notify({ message: e.response?.data?.message || 'No se pudo marcar como pagada', color: 'red-5', position: 'top' })
  } finally {
    pagando.value = false
  }
}

async function onDescargar(order) {
  descargando.value = order.id
  try {
    const { data } = await ordersApi.getComprobante(order.id)
    downloadBlob(data, `comprobante-${order.id.slice(0, 8)}.pdf`)
  } catch {
    $q.notify({ message: 'No se pudo descargar el comprobante', color: 'red-5', position: 'top' })
  } finally {
    descargando.value = null
  }
}

async function loadOrders() {
  loading.value = true
  try {
    const { data } = await ordersApi.getManual()
    orders.value = data || []
  } catch {
    orders.value = []
  } finally {
    loading.value = false
  }
}

loadOrders()
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
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.empty-state {
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(11, 18, 32, .04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.empty-title {
  font-size: 16px;
  font-weight: 800;
  color: #0b1220;
  margin: 0 0 6px;
}

.empty-sub {
  font-size: 13.5px;
  color: rgba(11, 18, 32, .45);
  margin: 0;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-card {
  background: #fff;
  border: 1.5px solid rgba(11, 18, 32, .08);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 1px 4px rgba(11, 18, 32, .04);
  position: relative;
}

.order-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.order-comprador {
  font-size: 14.5px;
  font-weight: 800;
  color: #0b1220;
}

.order-meta {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: rgba(11, 18, 32, .45);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.order-item-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.oi-name {
  flex: 1;
  min-width: 0;
  color: #0b1220;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oi-qty {
  color: rgba(11, 18, 32, .45);
  font-weight: 700;
}

.oi-subtotal {
  color: #0b1220;
  font-weight: 800;
  white-space: nowrap;
}

.order-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(11, 18, 32, .06);
}

.order-total {
  display: flex;
  flex-direction: column;
  font-size: 11.5px;
  color: rgba(11, 18, 32, .45);
  font-weight: 700;
}

.order-total strong {
  font-size: 15px;
  color: #0b1220;
}

.order-actions {
  display: flex;
  gap: 6px;
}

.section-label {
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(11, 18, 32, .55);
  text-transform: uppercase;
  letter-spacing: .4px;
  margin: 0 0 8px;
}

.item-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.col-item-name {
  flex: 1;
  min-width: 0;
}

.col-item-name-free {
  flex: 1;
  min-width: 0;
}

.col-item-price {
  width: 120px;
  flex-shrink: 0;
}

.col-item-qty {
  width: 80px;
  flex-shrink: 0;
}

.form-error {
  margin: 8px 0 0;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(220, 38, 38, .08);
  color: #dc2626;
  font-size: 12.5px;
  font-weight: 700;
}
</style>
