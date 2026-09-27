// Plantilla Excel de tarifas de logística: se descarga con los datos actuales y, una vez editada,
// se vuelve a subir para actualizar los valores base. exceljs se carga solo cuando se usa.

const HOJA_TARIFAS = 'Tarifas'
const HOJA_TIPOLOGIAS = 'Tipologías'
const FILA_IDS = 3 // fila oculta con el id de cada vehículo
const FILA_ENCABEZADO = 4
const COL_ID = 1
const COL_DESTINO = 2
const COL_ORIGEN = 3
const COL_ENTREGAS = 4
const PRIMERA_COL_VEHICULO = 5
const FORMATO_PESOS = '"$" #,##0'
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const AZUL = 'FF0B4AA3'
const AZUL_CLARO = 'FFE8F1FF'
const VERDE_CLARO = 'FFE7F7EC'
const GRIS = 'FF64748B'

async function cargarExcelJS() {
  const mod = await import('exceljs')
  return mod.default || mod
}

const fmtNum = (n) => Number(n).toLocaleString('es-CO', { maximumFractionDigits: 2 })

export function rangoPeso(v) {
  return v.pesoMinKg ? `${fmtNum(v.pesoMinKg)} – ${fmtNum(v.pesoMaxKg)} kg` : `hasta ${fmtNum(v.pesoMaxKg)} kg`
}

export function rangoVolumen(v) {
  if (v.volumenMaxM3) {
    return v.volumenMinM3 ? `${fmtNum(v.volumenMinM3)} – ${fmtNum(v.volumenMaxM3)} m³` : `hasta ${fmtNum(v.volumenMaxM3)} m³`
  }
  const derivado = (v.largoM ?? 13.5) * (v.anchoM ?? 2.45) * (v.altoM ?? 2.6)
  return `hasta ${fmtNum(derivado)} m³ (según medidas)`
}

export function medidasInternas(v) {
  const p = [v.largoM, v.anchoM, v.altoM]
  if (p.every((x) => x == null)) return 'Estándar 13,5 × 2,45 × 2,6 m'
  return `${p.map((x) => (x == null ? '—' : fmtNum(x))).join(' × ')} m`
}

const normalizar = (t) =>
  String(t ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Texto plano de una celda de exceljs (número, texto, fórmula o texto enriquecido). */
function valorCelda(cell) {
  const v = cell?.value
  if (v == null) return null
  if (typeof v === 'object') {
    if ('result' in v) return v.result ?? null
    if (Array.isArray(v.richText)) return v.richText.map((r) => r.text).join('')
    if ('text' in v) return v.text
  }
  return v
}

/** Valor base de una celda: número ≥ 0, null si está vacía, o { error } si no se entiende. */
function leerPrecio(cell) {
  const v = valorCelda(cell)
  if (v == null) return null
  if (typeof v === 'number') {
    if (!Number.isFinite(v) || v < 0) return { error: 'no puede ser negativo' }
    return v === 0 ? null : Math.round(v)
  }
  const t = String(v).trim()
  if (!t || /^[-–—]+$/.test(t)) return null
  if (!/^[\s$]*[\d.,\s]+$/.test(t)) return { error: `"${t}" no es un valor válido` }
  const n = Number(t.replace(/\D/g, ''))
  return n === 0 ? null : n
}

/** Genera y descarga la plantilla con las tarifas y vehículos actuales. */
export async function descargarPlantilla({ vehiculos, rutas, tarifas, margenPct }) {
  const ExcelJS = await cargarExcelJS()
  const wb = new ExcelJS.Workbook()
  wb.creator = 'ZIFCOR'
  wb.created = new Date()

  const precio = new Map(tarifas.map((t) => [`${t.rutaId}|${t.vehiculoId}`.toUpperCase(), t.valorBase]))
  const ultimaCol = PRIMERA_COL_VEHICULO + vehiculos.length - 1

  // ── Hoja Tarifas ──
  const ws = wb.addWorksheet(HOJA_TARIFAS, { views: [{ state: 'frozen', xSplit: COL_DESTINO, ySplit: FILA_ENCABEZADO }] })
  ws.getColumn(COL_ID).width = 4
  ws.getColumn(COL_ID).hidden = true
  ws.getColumn(COL_DESTINO).width = 22
  ws.getColumn(COL_ORIGEN).width = 14
  ws.getColumn(COL_ENTREGAS).width = 11
  vehiculos.forEach((_, i) => (ws.getColumn(PRIMERA_COL_VEHICULO + i).width = 17))

  ws.mergeCells(1, COL_DESTINO, 1, ultimaCol)
  const titulo = ws.getCell(1, COL_DESTINO)
  titulo.value = 'Tarifas de transporte ZIFCOR — valor base por viaje (costo del transportador, sin margen)'
  titulo.font = { bold: true, size: 14, color: { argb: AZUL } }

  ws.mergeCells(2, COL_DESTINO, 2, ultimaCol)
  const ayuda = ws.getCell(2, COL_DESTINO)
  ayuda.value =
    `Edita solo las celdas de precio (fondo blanco). Deja una celda vacía si ese vehículo no se presta en la ruta. ` +
    `El cliente ve el valor base + ${margenPct} %. Destinos y vehículos nuevos se crean en el panel antes de usar la plantilla.`
  ayuda.font = { italic: true, size: 10, color: { argb: GRIS } }
  ayuda.alignment = { wrapText: true, vertical: 'top' }
  ws.getRow(2).height = 32

  const filaIds = ws.getRow(FILA_IDS)
  filaIds.getCell(COL_ID).value = 'ids'
  vehiculos.forEach((v, i) => (filaIds.getCell(PRIMERA_COL_VEHICULO + i).value = v.id))
  filaIds.hidden = true

  const enc = ws.getRow(FILA_ENCABEZADO)
  enc.getCell(COL_ID).value = 'ID'
  enc.getCell(COL_DESTINO).value = 'Destino'
  enc.getCell(COL_ORIGEN).value = 'Origen'
  enc.getCell(COL_ENTREGAS).value = 'Cantidad entregas'
  vehiculos.forEach((v, i) => (enc.getCell(PRIMERA_COL_VEHICULO + i).value = `${v.codigo}\n${v.nombre}`))
  enc.height = 34
  enc.eachCell((c) => {
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
  })

  rutas.forEach((r, idx) => {
    const fila = ws.getRow(FILA_ENCABEZADO + 1 + idx)
    fila.getCell(COL_ID).value = r.id
    fila.getCell(COL_DESTINO).value = r.destino
    fila.getCell(COL_ORIGEN).value = r.origen
    fila.getCell(COL_ENTREGAS).value = r.entregasIncluidas
    for (const c of [COL_DESTINO, COL_ORIGEN, COL_ENTREGAS]) {
      const cell = fila.getCell(c)
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: r.tipo === 'urbano' ? 'FFFDE7D9' : VERDE_CLARO } }
      cell.alignment = { horizontal: c === COL_DESTINO ? 'left' : 'center' }
      if (!r.activo) cell.font = { color: { argb: GRIS }, italic: true }
    }
    vehiculos.forEach((v, i) => {
      const cell = fila.getCell(PRIMERA_COL_VEHICULO + i)
      cell.value = precio.get(`${r.id}|${v.id}`.toUpperCase()) ?? null
      cell.numFmt = FORMATO_PESOS
      cell.protection = { locked: false }
      cell.dataValidation = {
        type: 'decimal',
        operator: 'greaterThanOrEqual',
        formulae: [0],
        allowBlank: true,
        showErrorMessage: true,
        errorTitle: 'Valor no válido',
        error: 'Escribe el valor base en pesos (un número mayor o igual a 0) o deja la celda vacía.',
      }
    })
  })

  const filaNota = FILA_ENCABEZADO + rutas.length + 2
  ws.mergeCells(filaNota, COL_DESTINO, filaNota, ultimaCol)
  const nota = ws.getCell(filaNota, COL_DESTINO)
  nota.value = 'Filas en verde: destinos nacionales. En naranja: servicio urbano. En gris cursiva: destinos ocultos en el cotizador.'
  nota.font = { size: 9, color: { argb: GRIS } }

  const bordeFin = FILA_ENCABEZADO + rutas.length
  for (let f = FILA_ENCABEZADO; f <= bordeFin; f++) {
    for (let c = COL_DESTINO; c <= ultimaCol; c++) {
      ws.getCell(f, c).border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } }, bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } }, right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      }
    }
  }
  // Protege la estructura (ids, destinos, encabezados): solo los precios quedan editables.
  await ws.protect('', { selectLockedCells: true, selectUnlockedCells: true, formatColumns: true, formatRows: true })

  // ── Hoja Tipologías (referencia) ──
  const wt = wb.addWorksheet(HOJA_TIPOLOGIAS)
  wt.columns = [
    { header: 'Código', width: 9 },
    { header: 'Tipología', width: 22 },
    { header: 'Capacidad peso', width: 22 },
    { header: 'Capacidad m³', width: 26 },
    { header: 'Medida interna (L × A × H)', width: 28 },
    { header: 'Carrocería', width: 22 },
    { header: 'Estado', width: 10 },
  ]
  vehiculos.forEach((v) =>
    wt.addRow([v.codigo, v.nombre, rangoPeso(v), rangoVolumen(v), medidasInternas(v), v.tipoCarroceria || '', v.activo ? 'Activo' : 'Inactivo']),
  )
  wt.getRow(1).eachCell((c) => {
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
  })
  wt.eachRow((row, n) => {
    if (n > 1) row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL_CLARO } }
  })
  wt.addRow([])
  wt.addRow(['', 'Esta hoja es solo de referencia: pesos, medidas y fotos de los vehículos se editan en el panel (Logística → Vehículos).'])
    .getCell(2).font = { italic: true, size: 9, color: { argb: GRIS } }
  await wt.protect('', { selectLockedCells: true, selectUnlockedCells: true, formatColumns: true })

  const buffer = await wb.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tarifas-logistica-${new Date().toISOString().slice(0, 10)}.xlsx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/**
 * Lee una plantilla editada y la compara con las tarifas actuales.
 * Devuelve los cambios a aplicar (sin guardar nada), los errores de celdas y los avisos.
 */
export async function leerPlantilla(archivo, { vehiculos, rutas, tarifas }) {
  const ExcelJS = await cargarExcelJS()
  const wb = new ExcelJS.Workbook()
  try {
    await wb.xlsx.load(await archivo.arrayBuffer())
  } catch {
    throw new Error('No se pudo leer el archivo. Sube la plantilla en formato .xlsx.')
  }

  const ws = wb.getWorksheet(HOJA_TARIFAS) || wb.worksheets[0]
  if (!ws) throw new Error('El archivo no tiene hojas.')

  // Encabezado: la fila que tenga una celda "Destino".
  let filaEnc = null
  let colDestino = null
  for (let f = 1; f <= Math.min(ws.rowCount, 30) && !filaEnc; f++) {
    ws.getRow(f).eachCell((c, col) => {
      if (!filaEnc && normalizar(valorCelda(c)) === 'destino') {
        filaEnc = f
        colDestino = col
      }
    })
  }
  if (!filaEnc) throw new Error('No encontramos la columna "Destino". Usa la plantilla descargada desde este panel.')

  const vehiculoPorId = new Map(vehiculos.map((v) => [v.id.toUpperCase(), v]))
  const vehiculoPorCodigo = new Map(vehiculos.map((v) => [normalizar(v.codigo), v]))
  const rutaPorId = new Map(rutas.map((r) => [r.id.toUpperCase(), r]))
  const rutaPorDestino = new Map(rutas.map((r) => [normalizar(r.destino), r]))
  const actual = new Map(tarifas.map((t) => [`${t.rutaId}|${t.vehiculoId}`.toUpperCase(), t.valorBase]))

  const avisos = []
  const errores = []
  const cambios = []

  // Columnas de vehículo: por id (fila oculta) o por el código al inicio del encabezado.
  const columnas = []
  ws.getRow(filaEnc).eachCell((c, col) => {
    const titulo = String(valorCelda(c) ?? '').trim()
    if (col <= colDestino || !titulo) return
    const clave = normalizar(titulo)
    if (['origen', 'cantidad entregas', 'entregas', 'id'].includes(clave)) return
    const id = String(valorCelda(ws.getRow(filaEnc - 1).getCell(col)) ?? '')
    const codigo = normalizar(titulo.split(/[\n·]/)[0])
    const v = (GUID.test(id) && vehiculoPorId.get(id.toUpperCase())) || vehiculoPorCodigo.get(codigo)
    if (v) columnas.push({ col, v })
    else avisos.push(`La columna "${titulo.replace(/\n/g, ' ')}" no corresponde a ningún vehículo del panel; se ignoró.`)
  })
  if (!columnas.length) throw new Error('No encontramos columnas de vehículos (T1, T2…). Usa la plantilla descargada desde este panel.')

  let filasLeidas = 0
  for (let f = filaEnc + 1; f <= ws.rowCount; f++) {
    const fila = ws.getRow(f)
    const destino = String(valorCelda(fila.getCell(colDestino)) ?? '').trim()
    if (!destino) continue
    const idCelda = String(valorCelda(fila.getCell(COL_ID)) ?? '')
    const r = (GUID.test(idCelda) && rutaPorId.get(idCelda.toUpperCase())) || rutaPorDestino.get(normalizar(destino))
    if (!r) {
      // Notas al pie (celdas combinadas con texto) u otras filas: solo se avisa si la fila trae precios.
      if (columnas.some(({ col }) => typeof leerPrecio(fila.getCell(col)) === 'number')) {
        avisos.push(`El destino "${destino}" (fila ${f}) no existe en el panel; créalo primero con "Agregar destino". Se ignoró.`)
      }
      continue
    }
    filasLeidas++
    for (const { col, v } of columnas) {
      const leido = leerPrecio(fila.getCell(col))
      if (leido && typeof leido === 'object') {
        errores.push(`Fila ${f}, ${r.destino} · ${v.codigo}: ${leido.error}.`)
        continue
      }
      const antes = actual.get(`${r.id}|${v.id}`.toUpperCase()) ?? null
      if (leido !== antes) cambios.push({ ruta: r, vehiculo: v, antes, despues: leido })
    }
  }

  const leidas = new Set()
  for (let f = filaEnc + 1; f <= ws.rowCount; f++) {
    const fila = ws.getRow(f)
    const id = String(valorCelda(fila.getCell(COL_ID)) ?? '').toUpperCase()
    if (GUID.test(id)) leidas.add(id)
    const d = normalizar(valorCelda(fila.getCell(colDestino)))
    const r = d && rutaPorDestino.get(d)
    if (r) leidas.add(r.id.toUpperCase())
  }
  const faltantes = rutas.filter((r) => !leidas.has(r.id.toUpperCase()))
  if (faltantes.length) {
    avisos.push(`No vienen en el archivo (se dejan como están): ${faltantes.map((r) => r.destino).join(', ')}.`)
  }

  return { cambios, errores, avisos, filasLeidas, vehiculosLeidos: columnas.length }
}
