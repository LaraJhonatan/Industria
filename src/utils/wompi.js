let wompiScriptPromise = null

/** Carga una sola vez el widget de pago de Wompi (tarjeta, PSE, Nequi...). */
export function loadWompiScript() {
  if (window.WidgetCheckout) return Promise.resolve()
  if (wompiScriptPromise) return wompiScriptPromise
  wompiScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.wompi.co/widget.js'
    script.onload = resolve
    script.onerror = () => {
      wompiScriptPromise = null
      reject(new Error('No se pudo cargar la pasarela de pago.'))
    }
    document.head.appendChild(script)
  })
  return wompiScriptPromise
}

/**
 * Abre el widget con los parámetros firmados que devuelve el backend
 * ({ currency, amountInCents, reference, publicKey, signature, redirectUrl }).
 * Resuelve con la transacción que reporta el widget (o null si el usuario lo cierra).
 */
export async function abrirWompi(pago) {
  await loadWompiScript()
  const checkout = new window.WidgetCheckout({
    currency: pago.currency,
    amountInCents: pago.amountInCents,
    reference: pago.reference,
    publicKey: pago.publicKey,
    signature: { integrity: pago.signature },
    redirectUrl: pago.redirectUrl,
  })
  return new Promise((resolve) => {
    checkout.open((result) => resolve(result?.transaction || null))
  })
}
