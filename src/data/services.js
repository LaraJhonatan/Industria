export const SERVICES = [
  {
    id: 'corte-laser',
    title: 'Corte láser y manufactura metálica',
    kicker: 'Manufactura',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    products: [
      {
        id: 'cl-1',
        name: 'Corte Láser en Acero al Carbono',
        shortDesc: 'Corte de alta precisión en lámina de acero al carbono hasta 25 mm de espesor.',
        longDesc:
          'Servicio de corte láser CO₂ y fibra para acero al carbono en espesores de 0.5 mm a 25 mm. Bordes limpios, tolerancias de ±0.1 mm y acabado superficial de calidad industrial. Ideal para piezas estructurales, soportes y componentes en serie.',
        normativasOptions: ['NTC 2289:2017', 'ASTM A36', 'ISO 9013'],
        specs: [
          { l: 'Espesor máximo', v: '25 mm' },
          { l: 'Tolerancia', v: '±0.1 mm' },
          { l: 'Mesa de trabajo', v: '3000 × 1500 mm' },
          { l: 'Potencia láser', v: '6 kW' },
        ],
        images: [
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cl-2',
        name: 'Corte Láser en Acero Inoxidable',
        shortDesc: 'Corte limpio en aceros inoxidables 304, 316L y dúplex hasta 20 mm.',
        longDesc:
          'Corte por láser de fibra en aceros inoxidables. Gas de corte nitrógeno para borde brillante sin oxidación. Aplicaciones en industria alimentaria, farmacéutica y química.',
        normativasOptions: ['ASTM A240', 'EN 10088'],
        specs: [
          { l: 'Espesor máximo', v: '20 mm' },
          { l: 'Gas de corte', v: 'N₂ / O₂' },
          { l: 'Rugosidad Ra', v: '< 3.2 µm' },
          { l: 'Grados', v: '304 / 316L / Dúplex' },
        ],
        images: [
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cl-3',
        name: 'Corte Láser en Aluminio',
        shortDesc: 'Corte de aluminio y sus aleaciones de 0.5 mm a 15 mm con acabado fino.',
        longDesc:
          'Corte láser de fibra en aluminio 1100, 3003, 5052, 6061. Excelente relación calidad-velocidad. Tolerancias estrechas para componentes aeronáuticos y automotrices.',
        normativasOptions: ['ASTM B209', 'EN 573-3'],
        specs: [
          { l: 'Espesor máximo', v: '15 mm' },
          { l: 'Aleaciones', v: '1100/3003/5052/6061' },
          { l: 'Tolerancia', v: '±0.15 mm' },
          { l: 'Velocidad', v: 'hasta 60 m/min' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cl-4',
        name: 'Corte Láser en Metales Especiales',
        shortDesc: 'Corte de titanio, cobre, latón y metales de alta aleación.',
        longDesc:
          'Servicio especializado para metales de difícil mecanizado: titanio Ti-6Al-4V, cobre, latón, Inconel. Parámetros de proceso optimizados para cada material. Certificación de calidad incluida.',
        normativasOptions: ['ASTM B265', 'ASTM B152', 'ISO 9013'],
        specs: [
          { l: 'Materiales', v: 'Ti / Cu / Latón / Inconel' },
          { l: 'Espesor Ti máx.', v: '10 mm' },
          { l: 'Certificación', v: 'ISO 9001' },
          { l: 'Entrega', v: '3-5 días hábiles' },
        ],
        images: [
          'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'diseno-piezas',
    title: 'Diseño de piezas',
    kicker: 'Ingeniería',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    products: [
      {
        id: 'dp-1',
        name: 'Diseño CAD 3D de Piezas',
        shortDesc: 'Modelado 3D paramétrico en SolidWorks, CATIA o Fusion 360.',
        longDesc:
          'Diseño y modelado tridimensional de piezas mecánicas con software CAD profesional. Generación de archivos para manufactura (STEP, IGES, STL). Revisiones ilimitadas hasta aprobación.',
        normativasOptions: ['ISO 2768', 'ASME Y14.5'],
        specs: [
          { l: 'Software', v: 'SolidWorks / CATIA' },
          { l: 'Formato entrega', v: 'STEP / IGES / STL' },
          { l: 'Tiempo estimado', v: '3-7 días hábiles' },
          { l: 'Revisiones', v: 'Ilimitadas' },
        ],
        images: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dp-2',
        name: 'Planos Técnicos ISO/ANSI',
        shortDesc: 'Planos de taller con GD&T, vistas y acotación completa.',
        longDesc:
          'Elaboración de planos técnicos según norma ISO o ANSI con tolerancias dimensionales, geométricas y de acabado superficial. Listos para producción o certificación.',
        normativasOptions: ['ISO 128', 'ASME Y14.5M', 'ISO 1101'],
        specs: [
          { l: 'Norma', v: 'ISO / ANSI' },
          { l: 'Cotización', v: 'GD&T completo' },
          { l: 'Escala', v: 'A3 / A1 / personalizado' },
          { l: 'Formato', v: 'PDF + DWG' },
        ],
        images: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dp-3',
        name: 'Ingeniería Inversa',
        shortDesc: 'Digitalización y rediseño de piezas sin planos originales.',
        longDesc:
          'Escaneado 3D de piezas físicas para obtener modelos CAD precisos. Ideal para repuestos obsoletos, mejoras de diseño o documentación de piezas legadas.',
        normativasOptions: ['ISO 1101', 'VDI 2634'],
        specs: [
          { l: 'Exactitud escáner', v: '±0.05 mm' },
          { l: 'Tamaño máx.', v: '2000 mm' },
          { l: 'Entregable', v: 'CAD + Plano + Informe' },
          { l: 'Tiempo', v: '5-10 días' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dp-4',
        name: 'Validación y Simulación FEA',
        shortDesc: 'Análisis de elementos finitos para verificar resistencia y rigidez.',
        longDesc:
          'Simulación estructural por FEA con ANSYS o Abaqus. Verificación de esfuerzos, deformaciones, factores de seguridad y modos de falla.',
        normativasOptions: ['ASME VIII', 'EN 13445'],
        specs: [
          { l: 'Software', v: 'ANSYS / Abaqus' },
          { l: 'Tipo análisis', v: 'Estático / Modal / Fatiga' },
          { l: 'Informe', v: 'PDF técnico detallado' },
          { l: 'Revisiones', v: '2 incluidas' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'diseno-industrial',
    title: 'Diseño industrial',
    kicker: 'Ingeniería',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    products: [
      {
        id: 'di-1',
        name: 'Diseño de Producto Industrial',
        shortDesc: 'Concepto, ergonomía y forma de nuevos productos industriales.',
        longDesc:
          'Proceso completo de diseño industrial: investigación, conceptualización, ergonomía, modelado 3D y renders fotorrealistas. Desde la idea hasta el archivo listo para manufactura.',
        normativasOptions: ['ISO 9241', 'IEC 60068'],
        specs: [
          { l: 'Entregables', v: 'CAD + Renders + Planos' },
          { l: 'Fases', v: '4 (concepto→detalle)' },
          { l: 'Revisiones', v: 'Ilimitadas' },
          { l: 'Tiempo', v: '2-6 semanas' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'di-2',
        name: 'Prototipado Funcional',
        shortDesc: 'Prototipos físicos funcionales para validación de concepto.',
        longDesc:
          'Fabricación de prototipos funcionales mediante impresión 3D FDM/SLA, mecanizado CNC y procesos combinados. Pruebas de ajuste, forma y función antes de producción en serie.',
        normativasOptions: ['ISO 9001', 'ASTM F2792'],
        specs: [
          { l: 'Tecnologías', v: 'FDM / SLA / CNC' },
          { l: 'Materiales', v: 'PLA/PETG/ABS/Nylon/Metal' },
          { l: 'Precisión', v: '±0.2 mm' },
          { l: 'Entrega', v: '5-10 días' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'di-3',
        name: 'Optimización Topológica',
        shortDesc: 'Reducción de peso manteniendo resistencia estructural.',
        longDesc:
          'Optimización matemática de la distribución de material para maximizar rigidez y minimizar masa. Geometrías aptas para manufactura aditiva o CNC.',
        normativasOptions: ['ASME Y14.46', 'ISO 52900'],
        specs: [
          { l: 'Reducción peso', v: 'hasta 60%' },
          { l: 'Software', v: 'ANSYS / Altair' },
          { l: 'Compatible con', v: 'AM / CNC' },
          { l: 'Informe', v: 'PDF + CAD optimizado' },
        ],
        images: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'di-4',
        name: 'Análisis CFD',
        shortDesc: 'Simulación de fluidos y transferencia de calor.',
        longDesc:
          'Análisis de dinámica de fluidos computacional para ventilación, refrigeración, aerodinámica y sistemas de tuberías.',
        normativasOptions: ['ASME V&V 20', 'ISO 5167'],
        specs: [
          { l: 'Software', v: 'ANSYS Fluent / OpenFOAM' },
          { l: 'Tipo', v: 'Interno / Externo / Térmico' },
          { l: 'Entregable', v: 'Informe + Animaciones' },
          { l: 'Tiempo', v: '1-3 semanas' },
        ],
        images: [
          'https://images.unsplash.com/photo-1587613752020-d40b6e11e3f7?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'cnc',
    title: 'CNC mecanizado',
    kicker: 'Manufactura',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    products: [
      {
        id: 'cnc-1',
        name: 'Torneado CNC de Precisión',
        shortDesc: 'Torneado en torno CNC con tolerancias ±0.01 mm para piezas de revolución.',
        longDesc:
          'Torneado CNC en aceros, aluminio, bronce, nylon y otros materiales. Cilindrado, roscado, careado, taladrado y ranurado con control Fanuc.',
        normativasOptions: ['ISO 286-1', 'ASME B4.1'],
        specs: [
          { l: 'Tolerancia', v: '±0.01 mm' },
          { l: 'Diámetro max.', v: '500 mm' },
          { l: 'Longitud max.', v: '1500 mm' },
          { l: 'Materiales', v: 'Metales y plásticos técnicos' },
        ],
        images: [
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cnc-2',
        name: 'Fresado CNC Multieje',
        shortDesc: 'Fresado 3, 4 y 5 ejes para geometrías complejas con alta precisión.',
        longDesc:
          'Centro de mecanizado vertical y horizontal de 5 ejes. Fresado de superficies libres, cavidades, moldes y piezas aeroespaciales.',
        normativasOptions: ['ISO 286-1', 'DIN 7168'],
        specs: [
          { l: 'Ejes', v: '3 / 4 / 5' },
          { l: 'Mesa de trabajo', v: '850×600 mm' },
          { l: 'Tolerancia', v: '±0.01 mm' },
          { l: 'Control', v: 'Fanuc / Heidenhain' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cnc-3',
        name: 'Rectificado CNC',
        shortDesc: 'Rectificado cilíndrico y plano para acabados superficiales Ra < 0.4µm.',
        longDesc:
          'Rectificado de alta precisión para piezas que requieren tolerancias IT5-IT6 y rugosidades superficiales muy bajas.',
        normativasOptions: ['ISO 286-1', 'ISO 1302'],
        specs: [
          { l: 'Rugosidad Ra', v: '< 0.4 µm' },
          { l: 'Tolerancia IT', v: 'IT5 / IT6' },
          { l: 'Diámetro max.', v: '300 mm' },
          { l: 'Longitud max.', v: '1000 mm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'cnc-4',
        name: 'Electroerosión por Hilo (EDM)',
        shortDesc: 'Corte por hilo para geometrías internas complejas y aceros templados.',
        longDesc:
          'Electroerosión por hilo para corte de materiales conductores sin importar la dureza. Ideal para matrices, punzones, calibres y piezas con geometrías imposibles de fresar.',
        normativasOptions: ['ISO 286-1'],
        specs: [
          { l: 'Espesor máx.', v: '400 mm' },
          { l: 'Tolerancia', v: '±0.005 mm' },
          { l: 'Material', v: 'Cualquier conductor' },
          { l: 'Rugosidad', v: 'Ra < 0.8 µm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'probetas',
    title: 'Probetas',
    kicker: 'Ensayos',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>`,
    products: [
      {
        id: 'pr-1',
        name: 'Probetas de Tracción Metálicas',
        shortDesc: 'Probetas ASTM E8/E8M y ISO 6892-1 para ensayos de tracción.',
        longDesc:
          'Mecanizado de probetas normalizadas para ensayos de tracción en metales: planas y redondas tipo proporcional y no proporcional. Acabado superficial controlado.',
        normativasOptions: ['ASTM E8/E8M', 'ISO 6892-1', 'NTC 2076'],
        specs: [
          { l: 'Norma', v: 'ASTM E8 / ISO 6892-1' },
          { l: 'Material', v: 'Acero / Aluminio / Cu' },
          { l: 'Tolerancia', v: '±0.02 mm' },
          { l: 'Superficie Ra', v: '< 1.6 µm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'pr-2',
        name: 'Probetas de Impacto Charpy',
        shortDesc: 'Probetas tipo Charpy V y U según ASTM E23 / ISO 148-1.',
        longDesc:
          'Fabricación de probetas de impacto Charpy con entalla V o U mecanizada con alta precisión.',
        normativasOptions: ['ASTM E23', 'ISO 148-1', 'NTC 4026'],
        specs: [
          { l: 'Norma', v: 'ASTM E23 / ISO 148-1' },
          { l: 'Tipo entalla', v: 'V / U' },
          { l: 'Dimensiones', v: '10×10×55 mm' },
          { l: 'Tolerancia entalla', v: '±0.025 mm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'pr-3',
        name: 'Probetas de Fatiga',
        shortDesc: 'Probetas para ensayos de fatiga uniaxial rotativa y axial.',
        longDesc:
          'Mecanizado de probetas para ensayos de fatiga con acabado superficial espejo en zona calibrada.',
        normativasOptions: ['ASTM E466', 'ASTM E606', 'ISO 1099'],
        specs: [
          { l: 'Norma', v: 'ASTM E466 / E606' },
          { l: 'Tipo', v: 'Rotativa / Axial' },
          { l: 'Ra zona calibrada', v: '< 0.4 µm' },
          { l: 'Kt geométrico', v: 'definido por diseño' },
        ],
        images: [
          'https://images.unsplash.com/photo-1587613752020-d40b6e11e3f7?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'pr-4',
        name: 'Probetas de Doblado',
        shortDesc: 'Probetas rectangulares normalizadas para ensayo de doblado guiado.',
        longDesc:
          'Fabricación de probetas para ensayo de doblado guiado según ASTM E290 e ISO 7438. Dimensiones precisas para garantizar resultados reproducibles.',
        normativasOptions: ['ASTM E290', 'ISO 7438', 'NTC 5806'],
        specs: [
          { l: 'Norma', v: 'ASTM E290 / ISO 7438' },
          { l: 'Ancho', v: '25 – 38 mm' },
          { l: 'Espesor', v: 'según material' },
          { l: 'Tolerancia', v: '±0.05 mm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'fibra-carbono',
    title: 'Manejo de fibra de carbono',
    kicker: 'Materiales Compuestos',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    products: [
      {
        id: 'fc-1',
        name: 'Laminado Manual (Layup)',
        shortDesc: 'Fabricación de piezas CFRP por laminado manual con resinas epoxi.',
        longDesc:
          'Fabricación de estructuras en fibra de carbono mediante layup manual húmedo. Secuencia de laminado personalizada, resinas epoxi de alta resistencia y curado en horno.',
        normativasOptions: ['ASTM D3039', 'ISO 14130'],
        specs: [
          { l: 'Fibra', v: 'UD / Tejido 2D / NCF' },
          { l: 'Resina', v: 'Epoxi / Viniléster' },
          { l: 'Vf fibra', v: '55-65%' },
          { l: 'Curado', v: 'Ciclo en horno' },
        ],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
      },
      {
        id: 'fc-2',
        name: 'Infusión al Vacío (VARTM)',
        shortDesc: 'Manufactura de grandes estructuras CFRP/GFRP por infusión.',
        longDesc:
          'Proceso VARTM para piezas de gran formato con excelente control de fracción volumétrica. Bajo desperdicio de resina y propiedades mecánicas reproducibles.',
        normativasOptions: ['ASTM D5687', 'EN 2565'],
        specs: [
          { l: 'Área máx.', v: '3000×2000 mm' },
          { l: 'Espesor', v: '1 – 50 mm' },
          { l: 'Vf fibra', v: '50-60%' },
          { l: 'Porosidad', v: '< 2%' },
        ],
        images: [
          'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'fc-3',
        name: 'Prepreg en Autoclave',
        shortDesc: 'Máxima calidad con preimpregnados curados en autoclave.',
        longDesc:
          'Fabricación con materiales prepreg y curado en autoclave para obtener las propiedades mecánicas más altas. Aplicación en industria aeroespacial y de competición.',
        normativasOptions: ['ASTM D7249', 'EN 2374', 'NADCAP'],
        specs: [
          { l: 'Temperatura curado', v: '120 – 180 °C' },
          { l: 'Presión autoclave', v: 'hasta 7 bar' },
          { l: 'Vf fibra', v: '60-68%' },
          { l: 'Porosidad', v: '< 0.5%' },
        ],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
      },
      {
        id: 'fc-4',
        name: 'Reparación de Estructuras CFRP',
        shortDesc: 'Reparación certificada de daños en estructuras de carbono.',
        longDesc:
          'Evaluación por ultrasonido, escarpado cónico y laminado de parches de reparación. Cumplimiento de manuales SRM de fabricantes aeronáuticos.',
        normativasOptions: ['ASTM D5767', 'FAA AC 145-6'],
        specs: [
          { l: 'Inspección', v: 'Ultrasonido / Termografía' },
          { l: 'Tipo reparación', v: 'Parche / Escarpado' },
          { l: 'Certificación', v: 'Informe de conformidad' },
          { l: 'Garantía', v: '12 meses' },
        ],
        images: [
          'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'masa-lineal',
    title: 'Determinación de masa lineal',
    kicker: 'Metrología',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><polyline points="4.93 4.93 7.76 7.76"/><polyline points="16.24 16.24 19.07 19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><polyline points="4.93 19.07 7.76 16.24"/><polyline points="16.24 7.76 19.07 4.93"/></svg>`,
    products: [
      {
        id: 'ml-1',
        name: 'Masa Lineal en Cables Metálicos',
        shortDesc: 'Determinación de masa por unidad de longitud en cables de acero y aluminio.',
        longDesc:
          'Medición de masa lineal en cables de acero galvanizado, ACSR, cobre y aluminio según normas IEC y NTC. Trazabilidad ONAC. Informe técnico de ensayo incluido.',
        normativasOptions: ['IEC 60888', 'IEC 61232', 'NTC 1365'],
        specs: [
          { l: 'Resolución balanza', v: '0.001 g' },
          { l: 'Longitud muestra', v: '1000 mm ± 0.5 mm' },
          { l: 'Trazabilidad', v: 'ONAC / NIST' },
          { l: 'Informe', v: 'Certificado de calibración' },
        ],
        images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop'],
      },
      {
        id: 'ml-2',
        name: 'Masa Lineal en Varillas de Acero',
        shortDesc: 'Pesaje normalizado de varillas para refuerzo de concreto.',
        longDesc:
          'Determinación de masa lineal en varillas lisas y corrugadas según ASTM A615 y NTC 2289.',
        normativasOptions: ['ASTM A615', 'NTC 2289', 'NTC 5806'],
        specs: [
          { l: 'Diámetro varilla', v: '4 mm – 57 mm' },
          { l: 'Longitud muestra', v: '500 mm' },
          { l: 'Resolución', v: '0.01 g' },
          { l: 'Certificado', v: 'ONAC trazable' },
        ],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
      },
      {
        id: 'ml-3',
        name: 'Masa Lineal en Perfiles Metálicos',
        shortDesc: 'Medición de masa lineal en perfiles laminados y extrusionados.',
        longDesc:
          'Determinación de masa por metro lineal en perfiles estructurales laminados en caliente y extrusionados de aluminio.',
        normativasOptions: ['EN 10034', 'ASTM A6', 'ISO 1035'],
        specs: [
          { l: 'Tipo perfil', v: 'IPE/HEB/UPN/L/T' },
          { l: 'Longitud muestra', v: '1000 mm' },
          { l: 'Trazabilidad', v: 'ONAC' },
          { l: 'Informe', v: 'PDF certificado' },
        ],
        images: [
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'ml-4',
        name: 'Masa Lineal en Fibras Textiles',
        shortDesc: 'Determinación de título (tex/denier) en fibras y cordajes.',
        longDesc:
          'Medición del título lineal en fibras naturales, sintéticas y técnicas (carbono, aramida, vidrio) según ISO 1973.',
        normativasOptions: ['ISO 1973', 'ASTM D1907', 'ISO 2060'],
        specs: [
          { l: 'Norma', v: 'ISO 1973 / ASTM D1907' },
          { l: 'Resolución', v: '0.0001 g' },
          { l: 'Tipos fibra', v: 'Natural / Sintética / Técnica' },
          { l: 'Unidad', v: 'tex / den / g/m' },
        ],
        images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop'],
      },
    ],
  },
  {
    id: 'doblado',
    title: 'Doblado',
    kicker: 'Ensayos Mecánicos',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 12 6"/><polyline points="12 6 18 18"/><polyline points="18 18 21 18"/></svg>`,
    products: [
      {
        id: 'd-1',
        name: 'Ensayo de Doblado Para Alambre de Acero Liso, Usado en Refuerzo de Concreto',
        shortDesc:
          'Ensayo de doblado para alambre de acero liso, usado en refuerzo de concreto designación 4,0 mm a 12,0 mm.',
        longDesc:
          'Ensayo de doblado guiado para alambre de acero liso destinado a refuerzo de concreto. Evaluación de la ductilidad superficial mediante doblado a 180° sobre mandril normalizado. Se verifica ausencia de fisuras, grietas o delaminaciones en la zona deformada.',
        normativasOptions: ['NTC 5806:2019', 'ASTM A370:2022', 'ASTM E290:2022'],
        specs: [
          { l: 'Designación', v: '4,0 mm – 12,0 mm' },
          { l: 'Ángulo de doblado', v: '180°' },
          { l: 'Criterio', v: 'Pasa / No pasa' },
          { l: 'Trazabilidad', v: 'ONAC' },
        ],
        images: [
          'https://acerolab.com.co/wp-content/uploads/2023/08/varilla-y-alambre-grafilado-300x300.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBvpra8sYLm3SHgB_hfdniYxZyitXlcUJWcOIYoai&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLzhJ5I4fCY1nI6U_Z-l577WMd1BkQO9DoA&s',
        ],
      },
      {
        id: 'd-2',
        name: 'Ensayo de Doblado Para Malla Electrosoldada, Usadas en Refuerzo de Concreto',
        shortDesc:
          'Evaluación de la ductilidad en uniones soldadas de malla electrosoldada para refuerzo de hormigón.',
        longDesc:
          'Ensayo de doblado sobre muestras extraídas de malla electrosoldada. Se evalúa el comportamiento de los alambres y las uniones soldadas frente al doblado.',
        normativasOptions: ['NTC 4040', 'ASTM A185', 'ASTM E290:2022'],
        specs: [
          { l: 'Tipo muestra', v: 'Sección de malla' },
          { l: 'Ángulo', v: '180° / 90°' },
          { l: 'Norma', v: 'NTC 4040 / ASTM A185' },
          { l: 'Informe', v: 'Certificado técnico' },
        ],
        images: [
          'https://lirp.cdn-website.com/1344683c/dms3rep/multi/opt/873883d7-f864-4e9b-9d06-6776badd7f7b-ff2bfae1-640w.jpg',
          'https://lirp.cdn-website.com/1344683c/dms3rep/multi/opt/873883d7-f864-4e9b-9d06-6776badd7f7b-ff2bfae1-640w.jpg',
        ],
      },
      {
        id: 'd-3',
        name: 'Ensayo de Doblado Guiado',
        shortDesc: 'Doblado guiado para soldaduras y materiales base según ASTM E190 / E290.',
        longDesc:
          'Ensayo de doblado guiado con mandril y matrices normalizadas para evaluar ductilidad de soldaduras y materiales base. Tipos: raíz, cara y lado.',
        normativasOptions: ['ASTM E290:2022', 'AWS D1.1', 'ISO 5173'],
        specs: [
          { l: 'Tipo', v: 'Cara / Raíz / Lado' },
          { l: 'Ángulo', v: '180° (configurable)' },
          { l: 'Aplicación', v: 'Soldaduras / Metal base' },
          { l: 'Certif.', v: 'WPS / PQR' },
        ],
        images: [
          'http://i.ytimg.com/vi/7eDUeeGZKQc/maxresdefault.jpg',
          'http://i.ytimg.com/vi/7eDUeeGZKQc/maxresdefault.jpg',
        ],
      },
      {
        id: 'd-4',
        name: 'Ensayo de Doblado Para Barras Corrugadas de Acero usadas en Refuerzo de Concreto',
        shortDesc: 'Ensayo de ductilidad en barras corrugadas #3 a #18 según NTC 2289 y ASTM A615.',
        longDesc:
          'Ensayo de doblado a 180° en barras de acero corrugado para refuerzo de concreto. Obligatorio para proyectos de construcción bajo NSR-10.',
        normativasOptions: ['NTC 2289:2017', 'ASTM A615:2022', 'ASTM E290:2022'],
        specs: [
          { l: 'Designación', v: '#3 – #18 (10–57 mm)' },
          { l: 'Ángulo', v: '180°' },
          { l: 'Norma NSR-10', v: 'Compatible' },
          { l: 'Trazabilidad', v: 'ONAC certificado' },
        ],
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXabm069Do5JqAKR1zBKYjyau2MIEmoBCMdg&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXabm069Do5JqAKR1zBKYjyau2MIEmoBCMdg&s',
        ],
      },
    ],
  },
  {
    id: 'traccion',
    title: 'Tracción',
    kicker: 'Ensayos Mecánicos',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="2" x2="12" y2="22"/><path d="M8 6l4-4 4 4"/><path d="M8 18l4 4 4-4"/></svg>`,
    products: [
      {
        id: 'tr-1',
        name: 'Ensayo de Tracción en Barras Corrugadas',
        shortDesc: 'Rm, Re, Rp0.2, A% y Z% en barras de refuerzo para concreto.',
        longDesc:
          'Ensayo de tracción uniaxial en barras de acero corrugado #3 a #18. Determinación de resistencia máxima, límite elástico, elongación y estricción.',
        normativasOptions: ['ASTM A615', 'NTC 2289', 'ASTM E8'],
        specs: [
          { l: 'Carga máx.', v: '600 kN' },
          { l: 'Extensómetro', v: 'Alta precisión ISO 9513' },
          { l: 'Velocidad', v: 'ASTM E8 controlada' },
          { l: 'Informe', v: 'Curva esfuerzo-deformación' },
        ],
        images: [
          'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'tr-2',
        name: 'Ensayo de Tracción en Alambre de Acero',
        shortDesc: 'Propiedades mecánicas en tracción para alambres de 1 a 12 mm.',
        longDesc:
          'Ensayo de tracción en alambres de acero liso, galvanizado, pretensado y cordones para concreto.',
        normativasOptions: ['ASTM A370', 'NTC 5806', 'ISO 6892-1'],
        specs: [
          { l: 'Diámetro', v: '1 – 12 mm' },
          { l: 'Carga máx.', v: '200 kN' },
          { l: 'Extensómetro', v: 'Clip-on ISO 9513 Cl.1' },
          { l: 'Velocidad', v: '2 mm/min' },
        ],
        images: [
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'tr-3',
        name: 'Ensayo de Tracción en Perfiles Metálicos',
        shortDesc: 'Caracterización mecánica de perfiles laminados y extruidos.',
        longDesc:
          'Extracción y ensayo de probetas de tracción a partir de perfiles IPE, HEB, L, T, U y tubos.',
        normativasOptions: ['ASTM A6', 'EN 10025', 'ASTM E8'],
        specs: [
          { l: 'Tipo perfil', v: 'Laminado / Extruido' },
          { l: 'Dirección', v: 'Longitudinal / Transversal' },
          { l: 'Carga máx.', v: '600 kN' },
          { l: 'Temperatura', v: 'Ambiente / -20°C' },
        ],
        images: [
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'tr-4',
        name: 'Ensayo de Tracción en Materiales Poliméricos',
        shortDesc: 'Propiedades en tracción de plásticos, elastómeros y compuestos.',
        longDesc:
          'Ensayo de tracción en materiales poliméricos rígidos y flexibles. Determinación de módulo, resistencia a tracción, elongación y energía de rotura.',
        normativasOptions: ['ASTM D638', 'ISO 527', 'ASTM D412'],
        specs: [
          { l: 'Norma', v: 'ASTM D638 / ISO 527' },
          { l: 'Carga máx.', v: '50 kN' },
          { l: 'Velocidad', v: '1 – 500 mm/min' },
          { l: 'Temperatura', v: '-40°C a +150°C' },
        ],
        images: [
          'https://images.unsplash.com/photo-1587613752020-d40b6e11e3f7?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'dimensional',
    title: 'Dimensional',
    kicker: 'Metrología',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="12" x2="22" y2="12"/><path d="M2 8l4 4-4 4"/><path d="M22 8l-4 4 4 4"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
    products: [
      {
        id: 'dim-1',
        name: 'Verificación Dimensional por CMM',
        shortDesc: 'Inspección de piezas con Máquina de Medición por Coordenadas.',
        longDesc:
          'Medición dimensional completa con CMM de alta precisión. Verificación de diámetros, distancias, ángulos, planeidad, circularidad y perpendicularidad con trazabilidad ISO 17025.',
        normativasOptions: ['ISO 10360', 'ASME B89', 'ISO 17025'],
        specs: [
          { l: 'Volumen de medición', v: '700×1000×600 mm' },
          { l: 'Incertidumbre', v: 'U = 1.7+3L/1000 µm' },
          { l: 'Trazabilidad', v: 'ISO 17025 / ONAC' },
          { l: 'Informe', v: 'GD&T completo' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dim-2',
        name: 'Medición de Perfiles por Escáner 3D',
        shortDesc: 'Digitalización de formas complejas con escáner de luz estructurada.',
        longDesc:
          'Escaneado 3D de piezas para inspección de forma libre, análisis de deformación y comparación nominal-real.',
        normativasOptions: ['VDI 2634', 'ISO 10360-8'],
        specs: [
          { l: 'Exactitud', v: '±0.05 mm' },
          { l: 'Puntos/s', v: 'millones' },
          { l: 'Tamaño pieza', v: '10 mm – 3000 mm' },
          { l: 'Entregable', v: 'Nube de puntos + Informe' },
        ],
        images: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dim-3',
        name: 'Inspección GD&T',
        shortDesc: 'Verificación de tolerancias geométricas según ASME Y14.5.',
        longDesc:
          'Evaluación completa de tolerancias geométricas: forma, orientación, posición y runout. Generación de informe GD&T con referencia a datums.',
        normativasOptions: ['ASME Y14.5', 'ISO 1101'],
        specs: [
          { l: 'Norma', v: 'ASME Y14.5 / ISO 1101' },
          { l: 'Instrumentos', v: 'CMM + Calibres digitales' },
          { l: 'Informe', v: 'GD&T detallado' },
          { l: 'Trazabilidad', v: 'ONAC' },
        ],
        images: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dim-4',
        name: 'Rugosidad Superficial Ra / Rz',
        shortDesc: 'Medición de acabado superficial Ra, Rz, Rmax con perfilómetro táctil.',
        longDesc:
          'Determinación de parámetros de rugosidad superficial Ra, Rz, Rt, Rmax, Rsk y Rku con perfilómetro táctil calibrado.',
        normativasOptions: ['ISO 4287', 'ASME B46.1', 'ISO 1302'],
        specs: [
          { l: 'Norma', v: 'ISO 4287 / ASME B46.1' },
          { l: 'Rango Ra', v: '0.02 – 100 µm' },
          { l: 'Longitud evaluación', v: '0.8 – 25 mm' },
          { l: 'Resolución', v: '0.001 µm' },
        ],
        images: [
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'dureza',
    title: 'Dureza',
    kicker: 'Ensayos Mecánicos',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    products: [
      {
        id: 'dur-1',
        name: 'Ensayo de Dureza Brinell (HB)',
        shortDesc: 'Dureza Brinell en fundiciones, aceros recocidos y aleaciones blandas.',
        longDesc:
          'Ensayo de dureza Brinell con penetrador de bola de carburo. Cargas de 187.5 a 3000 kgf.',
        normativasOptions: ['ASTM E10', 'ISO 6506', 'NTC 4540'],
        specs: [
          { l: 'Norma', v: 'ASTM E10 / ISO 6506' },
          { l: 'Cargas', v: '187.5 – 3000 kgf' },
          { l: 'Penetrador', v: 'Bola WC ø1–10mm' },
          { l: 'Incertidumbre', v: 'U ≤ 2% HBW' },
        ],
        images: [
          'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dur-2',
        name: 'Ensayo de Dureza Rockwell (HRC/HRB)',
        shortDesc: 'Dureza Rockwell en aceros templados y materiales endurecidos.',
        longDesc:
          'Ensayo de dureza Rockwell escalas A, B, C y otras. Rápido y de alta repetibilidad.',
        normativasOptions: ['ASTM E18', 'ISO 6508'],
        specs: [
          { l: 'Norma', v: 'ASTM E18 / ISO 6508' },
          { l: 'Escalas', v: 'A / B / C / F / G' },
          { l: 'Penetrador', v: 'Cono diamante / Bola WC' },
          { l: 'Resolución', v: '0.5 HR' },
        ],
        images: [
          'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dur-3',
        name: 'Ensayo de Dureza Vickers (HV)',
        shortDesc: 'Dureza Vickers micro y macro en recubrimientos y materiales duros.',
        longDesc:
          'Ensayo Vickers con cargas de 1 gf a 30 kgf. Aplicable a materiales muy duros, recubrimientos y capas superficiales delgadas. Mapas de dureza.',
        normativasOptions: ['ASTM E92', 'ISO 6507', 'ASTM E384'],
        specs: [
          { l: 'Norma', v: 'ASTM E92 / ISO 6507' },
          { l: 'Cargas', v: '0.001 – 30 kgf' },
          { l: 'Diagonal mínima', v: '10 µm' },
          { l: 'Objetivo', v: 'Mapa de dureza' },
        ],
        images: [
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'dur-4',
        name: 'Mapa de Dureza Superficial',
        shortDesc: 'Perfil o mapa bidimensional de dureza en secciones transversales.',
        longDesc:
          'Determinación de gradientes de dureza para caracterización de tratamientos térmicos (cementación, nitruración, temple inductivo).',
        normativasOptions: ['ISO 2639', 'ASTM A255', 'ISO 4970'],
        specs: [
          { l: 'Escala', v: 'HV0.1 – HV10' },
          { l: 'Paso mínimo', v: '10 µm' },
          { l: 'Perfil', v: 'Superficie → núcleo' },
          { l: 'Gráfico', v: 'Incluido en informe' },
        ],
        images: [
          'https://images.unsplash.com/photo-1587613752020-d40b6e11e3f7?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
  {
    id: 'ensayo-especializado',
    title: 'Ensayo especializado',
    kicker: 'Ensayos Especiales',
    color: '#0071e3',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>`,
    products: [
      {
        id: 'ee-1',
        name: 'Ensayo de Impacto Charpy / Izod',
        shortDesc: 'Tenacidad al impacto en metales según ASTM E23 / ISO 148-1.',
        longDesc:
          'Determinación de energía absorbida al impacto a temperatura ambiente y bajas temperaturas. Péndulo calibrado ONAC.',
        normativasOptions: ['ASTM E23', 'ISO 148-1', 'NTC 4026'],
        specs: [
          { l: 'Energía péndulo', v: '150 J / 300 J' },
          { l: 'Temperatura', v: '-80°C a +20°C' },
          { l: 'Tipo probeta', v: 'Charpy V / U / Izod' },
          { l: 'Trazabilidad', v: 'ONAC' },
        ],
        images: [
          'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'ee-2',
        name: 'Ensayo de Fatiga Axial',
        shortDesc: 'Curva S-N y límite de fatiga en metales y compuestos.',
        longDesc:
          'Ensayo de fatiga uniaxial en control de carga o deformación. Generación de curva S-N (Wöhler), determinación de límite de fatiga y análisis de superficies de fractura.',
        normativasOptions: ['ASTM E466', 'ASTM E468', 'ISO 1099'],
        specs: [
          { l: 'Carga máx.', v: '±100 kN' },
          { l: 'Frecuencia', v: '0.1 – 100 Hz' },
          { l: 'Ciclos máx.', v: '10⁷' },
          { l: 'R ratio', v: '-1 / 0.1 / configurable' },
        ],
        images: [
          'https://images.unsplash.com/photo-1587613752020-d40b6e11e3f7?w=800&h=600&fit=crop',
        ],
      },
      {
        id: 'ee-3',
        name: 'Ensayo de Corrosión Acelerada',
        shortDesc: 'Niebla salina, cámara climática y ensayos electroquímicos.',
        longDesc:
          'Evaluación de resistencia a la corrosión mediante cámara de niebla salina ASTM B117, corrosión acelerada CASS y ensayos electroquímicos.',
        normativasOptions: ['ASTM B117', 'ISO 9227', 'ASTM G59'],
        specs: [
          { l: 'Norma', v: 'ASTM B117 / ISO 9227' },
          { l: 'Temperatura', v: '35°C ±2°C' },
          { l: 'Duración', v: '24 – 2000 h' },
          { l: 'Solución', v: 'NaCl 5% pH 6.5-7.2' },
        ],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
      },
      {
        id: 'ee-4',
        name: 'Ensayo de Fluencia (Creep)',
        shortDesc: 'Deformación viscosa a alta temperatura bajo carga constante.',
        longDesc:
          'Ensayo de fluencia uniaxial en hornos de alta temperatura. Determinación de velocidad de fluencia en estado estacionario, deformación total y tiempo de ruptura.',
        normativasOptions: ['ASTM E139', 'ISO 204'],
        specs: [
          { l: 'Temperatura', v: 'hasta 1100°C' },
          { l: 'Carga', v: 'constante / escalonada' },
          { l: 'Duración', v: 'hasta 10,000 h' },
          { l: 'Informe', v: 'Curva fluencia + análisis' },
        ],
        images: [
          'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&h=600&fit=crop',
        ],
      },
    ],
  },
]
