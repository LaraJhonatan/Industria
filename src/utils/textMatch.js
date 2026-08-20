export function normalizeText(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function singularize(token) {
  if (token.length > 4 && token.endsWith('es')) return token.slice(0, -2)
  if (token.length > 3 && token.endsWith('s')) return token.slice(0, -1)
  return token
}

function tokenSet(text) {
  const tokens = normalizeText(text).split(' ').filter(Boolean).map(singularize)
  return new Set(tokens)
}

/**
 * Score de similitud entre dos textos (0 a 1), pensado para nombres cortos
 * (categorías, productos): compara por tokens singularizados (para que
 * "drone" y "Drones" den match) y da un piso alto si un texto contiene
 * literalmente al otro.
 */
export function tokenOverlapScore(a, b) {
  const normA = normalizeText(a)
  const normB = normalizeText(b)
  if (!normA || !normB) return 0
  if (normA === normB) return 1

  const setA = tokenSet(a)
  const setB = tokenSet(b)
  if (!setA.size || !setB.size) return 0

  let inter = 0
  for (const t of setA) if (setB.has(t)) inter++
  const union = new Set([...setA, ...setB]).size
  const jaccard = union ? inter / union : 0

  const contains = normA.includes(normB) || normB.includes(normA) ? 0.85 : 0

  return Math.max(jaccard, contains)
}

/**
 * Aplana el árbol de categorías (categoría + sus hijos directos) y devuelve
 * las que se parecen al texto buscado, ordenadas de más a menos parecidas.
 */
export function findSimilarCategories(query, tree, { threshold = 0.4 } = {}) {
  const q = (query || '').trim()
  if (!q) return []

  const flat = []
  for (const cat of tree || []) {
    flat.push({ id: cat.id, nombre: cat.nombre, parentId: null, path: cat.nombre })
    for (const sub of cat.hijos || []) {
      flat.push({ id: sub.id, nombre: sub.nombre, parentId: cat.id, path: `${cat.nombre} › ${sub.nombre}` })
    }
  }

  return flat
    .map((c) => ({ ...c, score: tokenOverlapScore(q, c.nombre) }))
    .filter((c) => c.score >= threshold)
    .sort((a, b) => b.score - a.score)
}
