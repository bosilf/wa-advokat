import DocumentStatus from './DocumentStatus'
import {useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {AddIcon, HomeIcon, DocumentTextIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {usePaneRouter} from 'sanity/structure'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import PaneDocumentLink from './PaneDocumentLink'

type Article = {
  _id: string
  title?: string
  image?: SanityImageSource & {asset?: {_ref: string}}
}

export default function ArticleStructure() {
  const client = useClient({apiVersion: '2025-02-19'})
  const imageBuilder = createImageUrlBuilder(client)
  const {routerPanesState, groupIndex} = usePaneRouter()
  const selectedId = routerPanesState[groupIndex + 1]?.[0]?.id
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    let request = 0
    async function load() {
      const currentRequest = ++request
      try {
        const result = await client.fetch<Article[]>(
          '*[_type == "article"] | order(coalesce(publishedAt, _createdAt) desc) {_id, title, image {asset, crop, hotspot}}',
          {},
          {perspective: 'drafts'},
        )
        if (active && currentRequest === request) {
          setArticles(result)
          setError(false)
        }
      } catch {
        if (active && currentRequest === request) setError(true)
      }
    }
    void load()
    const subscription = client.listen('*[_type == "article"]', {}, {includeResult: false}).subscribe({
      next: () => void load(),
      error: () => {
        if (active) setError(true)
      },
    })
    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [client, retry])

  return (
    <Card padding={3} height="fill" overflow="auto">
      <Stack space={3}>
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'article-main-page', type: 'articleMainPage'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === 'article-main-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><HomeIcon /></Text>
            <Text size={1} weight="semibold">Artiklar – samlingssida</Text>
            <DocumentStatus id="article-main-page" />
          </Flex>
        </Card>
        <Card borderTop role="separator" />
        <Box paddingX={3} paddingTop={2}><Text size={1} weight="semibold">Alla artiklar</Text></Box>
        <Button as={PaneDocumentLink} intent="create" params={{type: 'article'}} icon={AddIcon} text="Lägg till artikel" mode="bleed" justify="flex-start" />
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} role="alert">Kunde inte uppdatera artikellistan.</Text>
              <Button text="Försök igen" mode="ghost" onClick={() => setRetry((value) => value + 1)} />
            </Stack>
          </Card>
        )}
        {!articles && !error && <Box padding={3}><Text size={1} role="status">Laddar artiklar…</Text></Box>}
        {articles?.length === 0 && <Box padding={3}><Text size={1} muted>Inga artiklar har lagts till ännu.</Text></Box>}
        <Stack space={1}>
          {articles?.map((article) => (
            <Card key={article._id} as={PaneDocumentLink} intent="edit" params={{id: article._id, type: 'article'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === article._id}>
              <Flex align="center" gap={3}>
                {article.image?.asset ? (
                  <img src={imageBuilder.image(article.image).width(80).height(80).fit('crop').url()} alt="" width={40} height={40} loading="lazy" style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 3, flexShrink: 0}} />
                ) : (
                  <Box padding={2}><Text size={2} muted><DocumentTextIcon /></Text></Box>
                )}
                <Text size={1} weight="semibold">{article.title || 'Namnlös artikel'}</Text>
                <DocumentStatus id={article._id} />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
