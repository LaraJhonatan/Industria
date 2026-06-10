export function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s-]/g, '') // quita caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // espacios → guiones
    .replace(/-+/g, '-') // guiones múltiples → uno
}
