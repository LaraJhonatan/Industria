export function useWhatsAppQuote() {
  // Si esta función se llama después de un `await` (ej. tras subir archivos o
  // guardar en la BD), el navegador bloquea un window.open() nuevo porque ya
  // no lo considera parte del gesto de click original. Por eso, para flujos
  // async, hay que reservar la pestaña ANTES del await con
  // `window.open('', '_blank')` y pasarla aquí en `targetWindow`.
  function openWhatsApp({ producto, empresa, variante = null, mensaje = null, targetWindow = null }) {
    const numero = empresa?.profile?.whatsapp || empresa?.telefono
    if (!numero) {
      targetWindow?.close()
      return
    }

    const cleanNumero = numero.replace(/\D/g, '')
    const varianteText = variante ? ` en presentación ${variante}` : ''
    const nombre = empresa?.profile?.nombreComercial || empresa?.razonSocial || 'su empresa'
    const msg = mensaje ||
      `Hola, estoy interesado en *${producto}*${varianteText} de *${nombre}*. Los contacto desde ZIFCOR. ¿Me pueden dar más información?`

    const url = `https://wa.me/${cleanNumero}?text=${encodeURIComponent(msg)}`

    if (targetWindow && !targetWindow.closed) {
      targetWindow.location.href = url
    } else {
      window.open(url, '_blank', 'noopener')
    }
  }

  function hasWhatsApp(empresa) {
    return !!(empresa?.profile?.whatsapp || empresa?.telefono)
  }

  return { openWhatsApp, hasWhatsApp }
}
