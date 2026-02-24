# Instrucciones de Configuración - Video y Carrusel de Logos

## 📹 Video

### Ubicación del video
Coloca tu video en: `/public/videos/industrial-demo.mp4`

### Formatos recomendados
- MP4 (H.264) - mejor compatibilidad
- WebM - menor tamaño
- Resolución: 1920x1080 (Full HD)
- Relación de aspecto: 16:9
- Duración recomendada: 30-60 segundos

### Si quieres cambiar la ruta del video
Edita el archivo `VideoCarouselSection.vue` línea 56:
```javascript
const videoSrc = ref('/videos/TU-VIDEO-AQUI.mp4')
```

---

## 🏢 Logos de Marcas

### Ubicación de los logos
Crea una carpeta: `/public/logos/`

Coloca tus logos ahí:
```
/public/logos/
  ├── marca1.png
  ├── marca2.png
  ├── marca3.png
  ├── marca4.png
  ├── marca5.png
  └── marca6.png
```

### Configurar tus logos
Edita el archivo `VideoCarouselSection.vue` líneas 61-68:

```javascript
const logos = ref([
  { src: '/logos/siemens.png', alt: 'Siemens' },
  { src: '/logos/abb.png', alt: 'ABB' },
  { src: '/logos/schneider.png', alt: 'Schneider Electric' },
  { src: '/logos/rockwell.png', alt: 'Rockwell Automation' },
  { src: '/logos/mitsubishi.png', alt: 'Mitsubishi Electric' },
  { src: '/logos/fanuc.png', alt: 'FANUC' },
  // Agrega más logos aquí
])
```

### Formatos recomendados para logos
- PNG con fondo transparente (mejor opción)
- SVG (si tienes versiones vectoriales)
- Tamaño recomendado: 300x150px aproximadamente
- Los logos se mostrarán en blanco y negro automáticamente
- Al hacer hover, vuelven a color

### Ejemplo de logos industriales que podrías usar
- Fabricantes de maquinaria: Siemens, ABB, Schneider Electric
- Automatización: Rockwell, Mitsubishi Electric, FANUC
- Componentes: SKF, Bosch Rexroth, Festo
- Herramientas: Hilti, DeWalt, Makita

---

## 🎨 Personalización

### Cambiar velocidad del carrusel
En `VideoCarouselSection.vue` línea 264:
```css
animation: scroll 30s linear infinite;
```
Cambia `30s` a un valor mayor (más lento) o menor (más rápido)

### Cambiar cantidad de logos visibles
Ajusta el `gap` en línea 262:
```css
gap: 60px; /* Más gap = menos logos visibles */
```

### Cambiar tamaño de logos
En líneas 280-285:
```css
.logo-item {
  width: 160px;  /* Ancho */
  height: 80px;  /* Alto */
}
```

---

## ✅ Checklist de Implementación

- [ ] Video colocado en `/public/videos/`
- [ ] Logos colocados en `/public/logos/`
- [ ] Rutas actualizadas en `VideoCarouselSection.vue`
- [ ] Probado en navegador
- [ ] Video reproduce automáticamente
- [ ] Carrusel hace scroll infinito
- [ ] Logos se ven correctamente

---

## 🐛 Solución de Problemas

### El video no se reproduce
- Verifica que la ruta sea correcta
- Asegúrate que el formato sea MP4 (H.264)
- Revisa la consola del navegador para errores

### Los logos no aparecen
- Verifica que las rutas en el código coincidan con los archivos
- Asegúrate que los archivos estén en `/public/logos/`
- Revisa que los nombres de archivo no tengan espacios ni caracteres especiales

### El carrusel no hace scroll
- Verifica que tengas al menos 6 logos
- Si tienes menos logos, duplica el array de logos en el código

---

## 📱 Responsive

La sección está optimizada para:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (< 768px)

El video y los logos se adaptan automáticamente al tamaño de pantalla.
