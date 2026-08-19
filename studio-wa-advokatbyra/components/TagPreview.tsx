// ./components/TagPreview.tsx

import { PreviewProps } from 'sanity'
import { Flex, Text, Box } from '@sanity/ui'

type TagPreviewProps = PreviewProps & {
  tagColor?: { hex: string }
  tagName?: string
}

export function TagPreview(props: PreviewProps) {
  const { tagColor, tagName } = props as TagPreviewProps

  return (
    <Flex align="center" gap={3} padding={2}>
      {tagColor?.hex && (
        <Box
          style={{
            backgroundColor: tagColor.hex,
            width: 24,
            height: 24,
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      )}
      <Text>{tagName ?? 'Unnamed tag'}</Text>
    </Flex>
  )
}