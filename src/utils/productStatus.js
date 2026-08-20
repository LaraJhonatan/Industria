const COLORS = { draft: 'grey-5', published: 'green-6', paused: 'orange-5', archived: 'red-4' }
const LABELS = { draft: 'Borrador', published: 'Publicado', paused: 'Pausado', archived: 'Archivado' }

export const PRODUCT_STATUS_OPTIONS = [
  { label: 'Borrador', value: 'draft' },
  { label: 'Publicado', value: 'published' },
  { label: 'Pausado', value: 'paused' },
  { label: 'Archivado', value: 'archived' },
]

export function statusColor(estado) {
  return COLORS[estado] || 'grey-5'
}

export function statusLabel(estado) {
  return LABELS[estado] || estado
}
