// src/data/store-products.js
// ─────────────────────────────────────────────────────────────
// Catálogos iniciales: DRONES y FILAMENTOS
// ─────────────────────────────────────────────────────────────

// ── Imágenes DRONES (IDs Unsplash verificados) ────────────────
// Todos estos IDs están confirmados en el CDN images.unsplash.com
const D = {
  // Drone volando al atardecer
  hero: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&h=560&fit=crop&q=85',
  fly1: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&q=80',
  // Drone DJI en mano / en tierra
  fly2: 'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=600&fit=crop&q=80',
  // Hélices / propeller closeup
  prop: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop&q=80',
  // Circuito electrónico / PCB
  pcb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80',
  // Electrónica general
  elec: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop&q=80',
  // Fibra de carbono / industrial
  carbon: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=80',
}

// ── Imágenes FILAMENTOS (Picsum con seeds fijos) ──────────────
// Picsum garantiza que cada seed siempre devuelve la misma imagen real.
// Nota: reemplaza estas por fotos reales de tus proveedores cuando las tengas.
const F = {
  // Hero — spool de filamento colorido
  hero: 'https://picsum.photos/seed/filament-hero/1400/560',
  // Spool de filamento / carrete
  spool1: 'https://picsum.photos/seed/filament-spool1/800/600',
  spool2: 'https://picsum.photos/seed/filament-spool2/800/600',
  // Impresora 3D imprimiendo
  print1: 'https://picsum.photos/seed/3dprinter-pla/800/600',
  print2: 'https://picsum.photos/seed/3dprinter-petg/800/600',
  // Material plástico / industrial
  mat1: 'https://picsum.photos/seed/plastic-material/800/600',
  mat2: 'https://picsum.photos/seed/nylon-material/800/600',
}

export const STORE_CATEGORIES = [
  // ══════════════════════════════════════════════════════════
  //  DRONES
  // ══════════════════════════════════════════════════════════
  {
    id: 'drones',
    title: 'Drones',
    kicker: 'Drones & Accesorios',
    color: '#0a0a1a',
    accentColor: '#4f9cf9',
    heroImg: D.hero,
    description: 'Todo para tus drones: motores, baterías, estructuras, controladores y más.',
    subcategories: [
      { id: 'motores', name: 'Motores', count: 32, img: D.elec },
      { id: 'helices', name: 'Hélices', count: 45, img: D.prop },
      { id: 'estructuras', name: 'Estructuras', count: 18, img: D.fly1 },
      { id: 'baterias', name: 'Baterías', count: 22, img: D.pcb },
      { id: 'controladores', name: 'Controladores', count: 14, img: D.pcb },
      { id: 'sensores', name: 'Sensores', count: 27, img: D.elec },
      { id: 'gps', name: 'GPS & Nav', count: 21, img: D.elec },
      { id: 'camaras', name: 'Cámaras', count: 15, img: D.fly2 },
    ],
    products: [
      // ── Baterías ─────────────────────────────────────────
      {
        id: 'dr-bat-01',
        subcategory: 'baterias',
        name: 'Batería Lipo 2200mAh 3S',
        shortDesc: 'Batería LiPo 3S 2200mAh 25C para drones FPV y fotografía. Conector XT60.',
        longDesc:
          'Batería LiPo de 3 celdas diseñada para drones FPV y de fotografía. Descarga máxima de 25C continua y 50C de pico. Conector XT60 incluido. Carga de equilibrio integrada. Ideal para vuelos de 10-15 minutos en drones de 250 a 450mm.',
        price: 89900,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['3S 11.1V', '4S 14.8V'],
        specs: [
          { l: 'Capacidad', v: '2200mAh' },
          { l: 'Celdas', v: '3S (11.1V)' },
          { l: 'Descarga', v: '25C / 50C pico' },
          { l: 'Conector', v: 'XT60' },
        ],
        images: [D.pcb, D.elec, D.fly1],
      },
      {
        id: 'dr-bat-02',
        subcategory: 'baterias',
        name: 'Batería 5800mAh 4S',
        shortDesc:
          'LiPo 4S 5800mAh de alta capacidad para drones de carga y fotografía profesional.',
        longDesc:
          'Batería de alta capacidad para drones de fotografía profesional y carga. Tiempo de vuelo extendido de 25-30 minutos. Protección contra sobrecarga y sobredescarga integrada. Compatible con cargadores iMax B6, B8 y similares.',
        price: 245000,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['4S 14.8V', '6S 22.2V'],
        specs: [
          { l: 'Capacidad', v: '5800mAh' },
          { l: 'Celdas', v: '4S (14.8V)' },
          { l: 'Descarga', v: '20C / 40C pico' },
          { l: 'Conector', v: 'XT90' },
        ],
        images: [D.elec, D.pcb, D.prop],
      },
      {
        id: 'dr-bat-03',
        subcategory: 'baterias',
        name: 'Batería Alta Capacidad 6S 10Ah',
        shortDesc:
          'LiPo 6S 10000mAh para drones industriales de larga duración. Hasta 45 min de vuelo.',
        longDesc:
          'La solución ideal para drones de inspección industrial y agricultura de precisión. Alta capacidad para vuelos de hasta 45 minutos. Celdas de grado industrial con menos del 2% de variación entre celdas.',
        price: 485000,
        originalPrice: 562000,
        discount: 15,
        stock: true,
        normativasOptions: ['6S 22.2V'],
        specs: [
          { l: 'Capacidad', v: '10000mAh' },
          { l: 'Celdas', v: '6S (22.2V)' },
          { l: 'Descarga', v: '15C / 30C pico' },
          { l: 'Peso', v: '980g' },
        ],
        images: [D.pcb, D.elec, D.fly1],
      },
      // ── Motores ──────────────────────────────────────────
      {
        id: 'dr-mot-01',
        subcategory: 'motores',
        name: 'Motor Brushless 2306 2450KV',
        shortDesc: 'Motor sin escobillas de alta velocidad para drones FPV de carreras 5".',
        longDesc:
          'Motor brushless diseñado para drones de carreras FPV 5". Alta eficiencia y bajo calentamiento gracias a su diseño de ventilación optimizada. Compatible con hélices de 5" y 5.1". Viene con tornillería M3 y adaptadores de hélice.',
        price: 125000,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['2450KV', '2650KV'],
        specs: [
          { l: 'KV Rating', v: '2450KV' },
          { l: 'Talla estátor', v: '2306' },
          { l: 'Peso', v: '30g' },
          { l: 'Corriente máx.', v: '35A' },
        ],
        images: [D.elec, D.prop, D.fly1],
      },
      {
        id: 'dr-mot-02',
        subcategory: 'motores',
        name: 'Motor Multirotors 4114 400KV',
        shortDesc:
          'Motor de baja KV para drones de fotografía y carga. Hexacópteros y octacópteros.',
        longDesc:
          'Motor de gran formato para hexacópteros y octacópteros de fotografía profesional y carga. Alta eficiencia con cargas pesadas y vuelos estabilizados de larga duración. Resistente al agua y polvo (IP54).',
        price: 285000,
        originalPrice: 320000,
        discount: 10,
        stock: true,
        normativasOptions: ['400KV', '320KV'],
        specs: [
          { l: 'KV Rating', v: '400KV' },
          { l: 'Talla estátor', v: '4114' },
          { l: 'Peso', v: '185g' },
          { l: 'Corriente máx.', v: '28A' },
        ],
        images: [D.prop, D.elec],
      },
      // ── Controladores ────────────────────────────────────
      {
        id: 'dr-ctrl-01',
        subcategory: 'controladores',
        name: 'Flight Controller F7 + ESC 4en1',
        shortDesc: 'Stack controladora F7 con ESC 4-en-1 de 45A integrado. Betaflight listo.',
        longDesc:
          'Stack de controladora F7 con procesador de alta velocidad y ESC 4-en-1 de 45A BLHeli32. Perfecta para builds FPV de 5". Incluye barómetro, giroscopio de 6 ejes ICM42688-P y OSD integrado.',
        price: 365000,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['30×30mm', '20×20mm'],
        specs: [
          { l: 'Procesador', v: 'STM32F745' },
          { l: 'Giroscopio', v: 'ICM42688-P' },
          { l: 'ESC incluido', v: '4×45A BLHeli32' },
          { l: 'Conexión', v: 'USB-C / UART×6' },
        ],
        images: [D.pcb, D.elec],
      },
      // ── Estructuras ──────────────────────────────────────
      {
        id: 'dr-str-01',
        subcategory: 'estructuras',
        name: 'Frame FPV 5" Fibra de Carbono 3K',
        shortDesc: 'Chasis de fibra de carbono 3K para drones FPV de 5". Brazos de 4mm.',
        longDesc:
          'Frame ultraligero de fibra de carbono 3K trenzado. Diseño aerodinámico tipo X con protección de motores integrada. Incluye tornillería de titanio M3, standoffs de aluminio y placas de protección.',
        price: 198000,
        originalPrice: 248000,
        discount: 20,
        stock: true,
        normativasOptions: ['220mm', '230mm'],
        specs: [
          { l: 'Wheelbase', v: '220mm' },
          { l: 'Brazos', v: '4mm fibra de carbono' },
          { l: 'Peso', v: '92g' },
          { l: 'Tornillería', v: 'Titanio M3' },
        ],
        images: [D.carbon, D.fly1],
      },
      {
        id: 'dr-str-02',
        subcategory: 'estructuras',
        name: 'Frame Hexacóptero Industrial 1000mm',
        shortDesc: 'Estructura Al6061 + CFRP para hexacóptero de carga. Brazos plegables.',
        longDesc:
          'Frame industrial de alta resistencia para aplicaciones agrícolas e inspección. Soporte de carga útil hasta 8kg. Brazos plegables para transporte en campo. Sistema anti-vibración en placa central.',
        price: 1250000,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['1000mm', '1200mm'],
        specs: [
          { l: 'Wheelbase', v: '1000mm' },
          { l: 'Carga útil', v: 'hasta 8kg' },
          { l: 'Brazos', v: 'Plegables' },
          { l: 'Material', v: 'Al6061 + CFRP' },
        ],
        images: [D.fly2, D.fly1],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  FILAMENTOS
  // ══════════════════════════════════════════════════════════
  {
    id: 'filamentos',
    title: 'Filamentos',
    kicker: 'Impresión 3D',
    color: '#c0392b',
    accentColor: '#e74c3c',
    heroImg: F.hero,
    description:
      'Filamentos de alta calidad para impresión 3D: PLA, PETG, ABS, TPU, Nylon y especiales.',
    subcategories: [
      { id: 'pla', name: 'PLA', count: 24, img: F.spool1 },
      { id: 'petg', name: 'PETG', count: 18, img: F.spool2 },
      { id: 'abs', name: 'ABS', count: 12, img: F.print1 },
      { id: 'tpu', name: 'TPU Flexible', count: 8, img: F.mat1 },
      { id: 'nylon', name: 'Nylon', count: 6, img: F.mat2 },
      { id: 'especiales', name: 'Especiales', count: 15, img: F.print2 },
    ],
    products: [
      {
        id: 'fil-pla-01',
        subcategory: 'pla',
        name: 'Filamento PLA Estándar 1.75mm 1kg',
        shortDesc:
          'PLA premium tolerancia ±0.02mm, 20+ colores disponibles. Secado al vacío en fábrica.',
        longDesc:
          'Filamento PLA premium para impresión FDM. Excelente terminado superficial, mínimo warping y alta compatibilidad con cualquier impresora 3D. Secado en fábrica y sellado al vacío con desecante incluido. Compatible con Ender 3, Prusa, Bambu, Voron y más.',
        price: 45900,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['1.75mm', '2.85mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.02mm' },
          { l: 'Peso neto', v: '1kg (carrete incluido)' },
          { l: 'Temp. impresión', v: '190–220°C' },
          { l: 'Temp. cama', v: '0–60°C' },
        ],
        images: [F.spool1, F.print1, F.spool2],
      },
      {
        id: 'fil-pla-02',
        subcategory: 'pla',
        name: 'Filamento PLA+ Reforzado 1kg',
        shortDesc: 'PLA Plus con mayor resistencia al impacto y temperatura. Piezas funcionales.',
        longDesc:
          'PLA+ mejorado para piezas funcionales que requieren mayor resistencia. Mayor tenacidad al impacto, menos fragilidad y temperatura de deflexión superior al PLA convencional. Ideal para prototipos funcionales, piezas de encaje y componentes mecánicos ligeros.',
        price: 55900,
        originalPrice: 65000,
        discount: 12,
        stock: true,
        normativasOptions: ['1.75mm', '2.85mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.02mm' },
          { l: 'Peso', v: '1kg' },
          { l: 'Temp. impresión', v: '200–230°C' },
          { l: 'Resistencia', v: '+30% vs PLA std' },
        ],
        images: [F.spool2, F.spool1],
      },
      {
        id: 'fil-petg-01',
        subcategory: 'petg',
        name: 'Filamento PETG 1.75mm 1kg',
        shortDesc: 'PETG resistente al impacto y químicos. Semi-transparente. Fácil de imprimir.',
        longDesc:
          'PETG de alta calidad para piezas mecánicas y funcionales. Excelente resistencia química, temperatura y transparencia. Más fácil de imprimir que el ABS con mayor resistencia que el PLA. Ideal para contenedores, piezas mecánicas y drones.',
        price: 62900,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['1.75mm', '2.85mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.02mm' },
          { l: 'Peso', v: '1kg' },
          { l: 'Temp. impresión', v: '230–250°C' },
          { l: 'Temp. cama', v: '70–90°C' },
        ],
        images: [F.print1, F.spool1],
      },
      {
        id: 'fil-abs-01',
        subcategory: 'abs',
        name: 'Filamento ABS 1.75mm 1kg',
        shortDesc: 'ABS resistente al calor para piezas de alto rendimiento. Temp. deflexión 98°C.',
        longDesc:
          'ABS premium para piezas que requieren resistencia al calor, impacto y abrasión. Ideal para carcasas, piezas automotrices y aplicaciones industriales. Requiere recinto cerrado para mejores resultados y evitar warping.',
        price: 48900,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['1.75mm', '2.85mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.02mm' },
          { l: 'Peso', v: '1kg' },
          { l: 'Temp. impresión', v: '220–250°C' },
          { l: 'Temp. deflexión', v: '98°C' },
        ],
        images: [F.print2, F.mat1],
      },
      {
        id: 'fil-tpu-01',
        subcategory: 'tpu',
        name: 'Filamento TPU Flexible 95A 1kg',
        shortDesc: 'TPU Shore 95A para piezas flexibles, protectores de drones, juntas y calzado.',
        longDesc:
          'TPU flexible de alta calidad para piezas que requieren elasticidad y absorción de vibración. Shore 95A ideal para protectores de drones, fundas, juntas y piezas con absorción de golpes. Elongación a rotura de 580%.',
        price: 78900,
        originalPrice: 92000,
        discount: 15,
        stock: true,
        normativasOptions: ['1.75mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.03mm' },
          { l: 'Shore', v: '95A' },
          { l: 'Temp. impresión', v: '220–240°C' },
          { l: 'Elongación', v: '580%' },
        ],
        images: [F.mat1, F.spool1],
      },
      {
        id: 'fil-nylon-01',
        subcategory: 'nylon',
        name: 'Filamento Nylon PA12 500g',
        shortDesc: 'Nylon PA12 para piezas de ingeniería de alta resistencia mecánica y desgaste.',
        longDesc:
          'Nylon Poliamida 12 para piezas funcionales de ingeniería que requieren resistencia al desgaste, química y fatiga. Requiere impresora con extrusor de temperatura alta (>250°C). Mantener sellado hasta uso inmediato.',
        price: 125000,
        originalPrice: null,
        discount: 0,
        stock: true,
        normativasOptions: ['1.75mm'],
        specs: [
          { l: 'Diámetro', v: '1.75mm ±0.02mm' },
          { l: 'Peso', v: '0.5kg' },
          { l: 'Temp. impresión', v: '250–270°C' },
          { l: 'Uso', v: 'Alta fricción y desgaste' },
        ],
        images: [F.mat2, F.print2],
      },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────
export function getCategoryById(id) {
  return STORE_CATEGORIES.find((c) => c.id === id) ?? null
}

export function getProductById(categoryId, productId) {
  const cat = getCategoryById(categoryId)
  return cat?.products.find((p) => p.id === productId) ?? null
}

export function formatCOP(n) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}
