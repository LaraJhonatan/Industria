import { ref } from 'vue'
import { categoriesApi } from '../api/categories'

// El modelo CLIP que usamos (gratis, corre en el navegador) fue entrenado con
// texto en inglés — comparar directo contra nuestros nombres en español da
// resultados basura. Por eso cada categoría real de la BD tiene aquí una
// traducción/descripción en inglés SOLO para que el modelo la reconozca mejor;
// la búsqueda que se ejecuta después sigue siendo con el nombre en español.
const LABEL_HINTS = {
  'Electrónica': 'electronics circuit board',
  'Componentes Electrónicos': 'electronic components, resistors capacitors connectors',
  'Iluminación y Señalización': 'LED light, traffic signal baton, flashlight',
  'Tarjetas de Desarrollo (Microcontroladores)': 'small green ESP32 WiFi microcontroller devkit board with header pins',
  'Tarjetas de Desarrollo (SBC / IA)': 'single board computer like Raspberry Pi or Jetson, with heatsink',
  'Diseño y Fabricación de PCB': 'PCB design and manufacturing service, laser prototyping machine',
  'Drones': 'drone, quadcopter, propeller, aircraft',
  'Vidrios y Ventanería': 'glass window pane, glass roll',
  'Construcción y Vidriería': 'construction materials, glass, windows',
  'Maquinaria Industrial': 'industrial machinery, heavy equipment',
  'Impresión 3D': '3D printer, filament spool',
  'Alimentos': 'packaged food product',
  'Café': 'ground coffee bag or beans',
  'Maquinaria de Café': 'espresso coffee machine',
  'Determinación de Masa Lineal': 'weighing scale, measuring equipment',
  'Dimensional': 'caliper, dimensional measuring tool',
  'Dureza': 'hardness testing equipment',
  'Ensayo Especializado': 'specialized laboratory testing equipment',
  'Ensayos de Doblado': 'metal bending test equipment',
  'Tracción': 'tensile traction testing machine',
}

let classifierPromise = null
function getClassifier(onProgress) {
  if (!classifierPromise) {
    classifierPromise = import('@huggingface/transformers').then(({ pipeline }) =>
      pipeline('zero-shot-image-classification', 'Xenova/clip-vit-base-patch32', {
        progress_callback: onProgress,
      }),
    )
  }
  return classifierPromise
}

function flattenCategorias(tree) {
  const items = []
  const seen = new Set()
  for (const cat of tree || []) {
    if (!seen.has(cat.nombre)) {
      items.push({ id: cat.id, nombre: cat.nombre, categoryId: cat.id, subcategoryId: null })
      seen.add(cat.nombre)
    }
    for (const hijo of cat.hijos || []) {
      if (!seen.has(hijo.nombre)) {
        items.push({ id: hijo.id, nombre: hijo.nombre, categoryId: cat.id, subcategoryId: hijo.id })
        seen.add(hijo.nombre)
      }
    }
  }
  return items
}

export function useImageSearch() {
  const loading = ref(false)
  const loadingModel = ref(false)
  const modelProgress = ref(0)
  const error = ref('')

  async function classifyImage(file) {
    error.value = ''
    loading.value = true
    try {
      const { data: tree } = await categoriesApi.getTree()
      const categorias = flattenCategorias(tree)
      if (!categorias.length) throw new Error('No hay categorías para comparar.')

      const candidateLabels = categorias.map((c) => LABEL_HINTS[c.nombre] || c.nombre)

      loadingModel.value = true
      const classifier = await getClassifier((p) => {
        if (p?.status === 'progress' && p.progress != null) modelProgress.value = Math.round(p.progress)
      })
      loadingModel.value = false

      const url = URL.createObjectURL(file)
      let resultados
      try {
        resultados = await classifier(url, candidateLabels)
      } finally {
        URL.revokeObjectURL(url)
      }

      const mejor = resultados?.[0]
      if (!mejor) return null

      const idx = candidateLabels.indexOf(mejor.label)
      const categoria = categorias[idx]
      return {
        nombreEspanol: categoria.nombre,
        categoryId: categoria.categoryId,
        subcategoryId: categoria.subcategoryId,
        score: mejor.score,
      }
    } catch (e) {
      error.value = e.message || 'No se pudo analizar la imagen.'
      return null
    } finally {
      loading.value = false
      loadingModel.value = false
    }
  }

  return { classifyImage, loading, loadingModel, modelProgress, error }
}
