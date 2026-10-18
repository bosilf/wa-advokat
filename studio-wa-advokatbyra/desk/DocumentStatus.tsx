import {Box} from '@sanity/ui'
import {DocumentStatusIndicator, useDocumentVersionInfo} from 'sanity'

export default function DocumentStatus({id}: {id: string}) {
  const {draft, published, versions, isLoading} = useDocumentVersionInfo(id.replace(/^drafts\./, ''))
  if (isLoading) return null

  const label = [published && 'Publicerad', draft && (published ? 'Opublicerade ändringar' : 'Utkast')]
    .filter(Boolean)
    .join(' · ')

  return (
    <Box style={{marginLeft: 'auto', flexShrink: 0}} title={label} aria-label={label}>
      <DocumentStatusIndicator draft={draft} published={published} versions={versions} />
    </Box>
  )
}
