import {Box, Flex} from '@sanity/ui'
import type {PreviewProps} from 'sanity'
import CategoryTag, {categoryPalette} from './CategoryTag'

type Props = PreviewProps & {categoryTitle?: string; categorySlug?: string}

/** Preserve Sanity's preview, status and media; add only a small category tag. */
export default function CategoryPreview(props: Props) {
  if (!categoryPalette(props.categorySlug, props.categoryTitle) || (props.layout && !['default', 'compact', 'detail'].includes(props.layout))) {
    return props.renderDefault(props)
  }
  return (
    <Flex align="center" gap={2}>
      <Box flex={1} style={{minWidth: 0}}>{props.renderDefault(props)}</Box>
      <Box paddingRight={2}><CategoryTag title={props.categoryTitle} slug={props.categorySlug} /></Box>
    </Flex>
  )
}
