import React from 'react'
import { TagIcon } from '@sanity/icons'
import { PreviewProps } from 'sanity'

// Vi skapar ett eget interface för att tala om för TypeScript exakt vad fälten innehåller
interface RoleValue {
  title?: string
  backgroundColor?: string
  textColor?: string
}

export default function RolePreview(props: PreviewProps & { value?: RoleValue }) {
  const title = props.value?.title || 'Namnlös titel'
  const bg = props.value?.backgroundColor || '#4B5563'
  const text = props.value?.textColor || '#fffff'

  return (
      
      <div
  style={{
    backgroundColor: bg,
    color: text,
    padding: "6px 12px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
  }}
>
  <TagIcon />
  {title}
</div>

  )
}