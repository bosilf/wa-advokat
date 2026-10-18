import DocumentStatus from './DocumentStatus'
import {useEffect, useState} from 'react'
import {Badge, Box, Button, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import {usePaneRouter} from 'sanity/structure'
import {AddIcon, CaseIcon, EditIcon, HomeIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import PaneDocumentLink from './PaneDocumentLink'
import CategoryTag, {categoryPalette} from '../src/studio/CategoryTag'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

type Service = {
  _id: string
  title?: string
  slug?: string
  image?: SanityImageSource & {asset?: {_ref: string}; alt?: string}
}
type Subarea = Service & {parentId?: string; excerpt?: string}
type Content = {services: Service[]; subareas: Subarea[]}

const query = `{
  "services": *[_type == "service"] | order(sortOrder asc, title asc) {_id, title, "slug": slug.current, image {asset, crop, hotspot, alt}},
  "subareas": *[_type == "serviceSection"] | order(sortOrder asc, title asc) {
    _id, title, excerpt, image {asset, crop, hotspot, alt}, "parentId": parentService._ref
  }
}`

export default function ServiceStructure() {
  const client = useClient({apiVersion: '2025-02-19'})
  const imageBuilder = createImageUrlBuilder(client)
  const {routerPanesState, groupIndex} = usePaneRouter()
  const selectedId = routerPanesState[groupIndex + 1]?.[0]?.id
  const [content, setContent] = useState<Content | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    let request = 0
    async function load() {
      const currentRequest = ++request
      try {
        const result = await client.fetch<Content>(query, {}, {perspective: 'drafts'})
        if (active && currentRequest === request) {
          setContent(result)
          setError(false)
        }
      } catch {
        if (active && currentRequest === request) setError(true)
      }
    }
    void load()
    const subscription = client
      .listen('*[_type in ["service", "serviceSection"]]', {}, {includeResult: false})
      .subscribe({
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

  const unassigned = content?.subareas.filter(
    (area) => !content.services.some((service) => service._id === area.parentId),
  ) ?? []

  function thumbnail(item: Service) {
    return item.image?.asset ? (
      <img src={imageBuilder.image(item.image).width(80).height(80).fit('crop').url()} alt="" width={40} height={40} loading="lazy" style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 3, flexShrink: 0}} />
    ) : (
      <Card as="span" padding={2} radius={2} tone="transparent" style={{width: 40, height: 40, flexShrink: 0}}>
        <Flex as="span" align="center" justify="center" height="fill"><Text as="span" muted><CaseIcon /></Text></Flex>
      </Card>
    )
  }

  function subareaRow(area: Subarea, parent?: Service) {
    return (
      <Card key={area._id} as={PaneDocumentLink} intent="edit" params={{id: area._id, type: 'serviceSection'}} data-as="a" tone="transparent" padding={3} radius={2} selected={selectedId === area._id}>
        <Flex align="center" gap={3}>
          {thumbnail(area)}
          <Box flex={1} style={{minWidth: 0}}>
            <Stack space={3}>
              <Text size={1} weight="semibold">{area.title || 'Namnlöst område'}</Text>
              {area.excerpt && <Text size={1} muted textOverflow="ellipsis">{area.excerpt}</Text>}
              {parent && categoryPalette(parent.slug, parent.title) && <CategoryTag title={parent.title} slug={parent.slug} />}
            </Stack>
          </Box>
          <DocumentStatus id={area._id} />
        </Flex>
      </Card>
    )
  }

  return (
    <Card padding={3} height="fill" overflow="auto">
      <Stack space={4}>
        <Box padding={3}>
          <Stack space={3}>
            <Heading size={2}>Hantera rättsområden</Heading>
            <Text size={1} muted>Öppna ett rättsområde för att redigera huvudsidan eller dess fördjupningar.</Text>
          </Stack>
        </Box>
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'service-main-page', type: 'serviceMainPage'}} data-as="a" tone="transparent" padding={3} radius={2} selected={selectedId === 'service-main-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><HomeIcon /></Text>
            <Text size={1} weight="semibold">Rättsområden – samlingssida</Text>
            <DocumentStatus id="service-main-page" />
          </Flex>
        </Card>
        <Button as={PaneDocumentLink} intent="create" params={{type: 'service'}} icon={AddIcon} text="Lägg till rättsområde" mode="bleed" justify="flex-start" />
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} role="alert">Kunde inte uppdatera rättsområdena.</Text>
              <Button text="Försök igen" mode="ghost" onClick={() => setRetry((value) => value + 1)} />
            </Stack>
          </Card>
        )}
        {!content && !error && <Box padding={3}><Text size={1} role="status">Laddar rättsområden…</Text></Box>}
        {content?.services.length === 0 && <Box padding={3}><Text size={1} muted>Inga rättsområden har skapats ännu.</Text></Box>}
        <Stack space={1}>
          {content?.services.map((service) => (
            <details key={service._id} className="wa-course-group">
              <Card as="summary" data-as="button" tone="transparent" padding={3} radius={2}>
                <Flex as="span" align="center" gap={3}>
                  {thumbnail(service)}
                  <Text as="span" size={1} weight="semibold">{service.title || 'Namnlöst rättsområde'}</Text>
                  <Badge fontSize={0}>{content.subareas.filter((area) => area.parentId === service._id).length}</Badge>
                  <DocumentStatus id={service._id} />
                </Flex>
              </Card>
              <Box paddingLeft={3} paddingTop={2}>
                <Stack space={1}>
                  <Button as={PaneDocumentLink} intent="edit" params={{id: service._id, type: 'service'}} icon={EditIcon} text={`Uppdatera rättsområde: ${service.title || 'Namnlöst rättsområde'}`} mode="bleed" justify="flex-start" />
                  <Button
                    as={PaneDocumentLink}
                    intent="create"
                    params={[
                      {type: 'serviceSection', template: 'service-section-for-service'},
                      {parentServiceId: service._id},
                    ]}
                    icon={AddIcon}
                    text={`Lägg till område i: ${service.title || 'rättsområdet'}`}
                    mode="bleed"
                    justify="flex-start"
                  />
                  {content.subareas.filter((area) => area.parentId === service._id).map((area) => subareaRow(area, service))}
                </Stack>
              </Box>
            </details>
          ))}
        </Stack>
        {unassigned.length > 0 && (
          <Stack space={3}>
            <Box padding={3}><Text size={1} weight="semibold">Fördjupningar utan rättsområde</Text></Box>
            <Box paddingX={3}><Text size={1} muted>Öppna en fördjupning och välj Tillhör rättsområde under Experter och kopplingar.</Text></Box>
            <Stack space={1}>{unassigned.map((area) => subareaRow(area))}</Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
