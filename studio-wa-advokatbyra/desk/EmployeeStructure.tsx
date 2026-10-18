import DocumentStatus from './DocumentStatus'
import {useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {AddIcon, HomeIcon, UserIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {usePaneRouter} from 'sanity/structure'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import PaneDocumentLink from './PaneDocumentLink'

type Employee = {
  _id: string
  name?: string
  image?: SanityImageSource & {asset?: {_ref: string}}
}

export default function EmployeeStructure() {
  const client = useClient({apiVersion: '2025-02-19'})
  const imageBuilder = createImageUrlBuilder(client)
  const {routerPanesState, groupIndex} = usePaneRouter()
  const selectedId = routerPanesState[groupIndex + 1]?.[0]?.id
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    let request = 0
    async function load() {
      const currentRequest = ++request
      try {
        const result = await client.fetch<Employee[]>(
          '*[_type == "employee"] | order(firstName asc, lastName asc) {_id, "name": coalesce(firstName, "") + " " + coalesce(lastName, ""), image {asset, crop, hotspot}}',
          {},
          {perspective: 'drafts'},
        )
        if (active && currentRequest === request) {
          setEmployees(result)
          setError(false)
        }
      } catch {
        if (active && currentRequest === request) setError(true)
      }
    }
    void load()
    const subscription = client.listen('*[_type == "employee"]', {}, {includeResult: false}).subscribe({
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
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'about-page', type: 'aboutPage'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === 'about-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><HomeIcon /></Text>
            <Text size={1} weight="semibold">Om oss – samlingssida</Text>
            <DocumentStatus id="about-page" />
          </Flex>
        </Card>
        <Card borderTop role="separator" />
        <Button as={PaneDocumentLink} intent="create" params={{type: 'employee'}} icon={AddIcon} text="Lägg till medarbetare" mode="bleed" justify="flex-start" />
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} role="alert">Kunde inte uppdatera medarbetarlistan.</Text>
              <Button text="Försök igen" mode="ghost" onClick={() => setRetry((value) => value + 1)} />
            </Stack>
          </Card>
        )}
        {!employees && !error && <Box padding={3}><Text size={1} role="status">Laddar medarbetare…</Text></Box>}
        {employees?.length === 0 && <Box padding={3}><Text size={1} muted>Inga medarbetare har lagts till ännu.</Text></Box>}
        <Stack space={1}>
          {employees?.map((employee) => (
            <Card key={employee._id} as={PaneDocumentLink} intent="edit" params={{id: employee._id, type: 'employee'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === employee._id}>
              <Flex align="center" gap={3}>
                {employee.image?.asset ? (
                  <img src={imageBuilder.image(employee.image).width(80).height(80).fit('crop').url()} alt="" width={40} height={40} loading="lazy" style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 3, flexShrink: 0}} />
                ) : (
                  <Box padding={2}><Text size={2} muted><UserIcon /></Text></Box>
                )}
                <Text size={1} weight="semibold">{employee.name?.trim() || 'Namnlös medarbetare'}</Text>
                <DocumentStatus id={employee._id} />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
