export function useWhatsAppQuote() {
  function openWhatsApp({ producto, empresa, variante = null }) {
    const numero = empresa?.profile?.whatsapp || empresa?.telefono
    if (!numero) return

    const cleanNumero = numero.replace(/\D/g, '')
    const varianteText = variante ? ` en presentación ${variante}` : ''
    const nombre = empresa?.profile?.nombreComercial || empresa?.razonSocial || 'su empresa'
    const msg = `Hola, estoy interesado en *${producto}*${varianteText} de *${nombre}*. Los contacto desde ZiFux. ¿Me pueden dar más información?`

    window.open(
      `https://wa.me/${cleanNumero}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener',
    )
  }

  function hasWhatsApp(empresa) {
    return !!(empresa?.profile?.whatsapp || empresa?.telefono)
  }

  return { openWhatsApp, hasWhatsApp }
}
