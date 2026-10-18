import {Badge} from '@sanity/ui'
import type {CSSProperties} from 'react'

const palettes = {
  entreprenadjuridik: {background: '#C1C9DE', foreground: '#29385E'},
  'offentlig-upphandling': {background: '#D2DDC1', foreground: '#575F4B'},
}

export function categoryPalette(slug?: string, title?: string) {
  const key = (slug || title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')
  if (key === 'entreprenadjuridik' || key === 'entreprenadratt') return palettes.entreprenadjuridik
  if (key === 'offentlig-upphandling') return palettes['offentlig-upphandling']
  return undefined
}

export default function CategoryTag({title, slug}: {title?: string; slug?: string}) {
  const palette = categoryPalette(slug, title)
  const style: CSSProperties & Record<`--${string}`, string> = {
    width: 'fit-content',
    alignSelf: 'flex-start',
    flexShrink: 0,
    ...(palette ? {
    backgroundColor: palette.background,
    color: palette.foreground,
    '--card-bg-color': palette.background,
    '--card-fg-color': palette.foreground,
    '--card-border-color': palette.background,
    } : {}),
  }

  return <Badge fontSize={0} mode="outline" style={style}>{title || 'Saknar kategori'}</Badge>
}
