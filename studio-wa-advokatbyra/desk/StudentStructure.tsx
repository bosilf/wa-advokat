import DocumentStatus from './DocumentStatus'
import {useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {AddIcon, HomeIcon, UserIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import {usePaneRouter} from 'sanity/structure'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import PaneDocumentLink from './PaneDocumentLink'

type Student = {
  _id: string
  name?: string
  image?: SanityImageSource & {asset?: {_ref: string}}
}

export default function StudentStructure() {
  const client = useClient({apiVersion: '2025-02-19'})
  const imageBuilder = createImageUrlBuilder(client)
  const {routerPanesState, groupIndex} = usePaneRouter()
  const selectedId = routerPanesState[groupIndex + 1]?.[0]?.id
  const [students, setStudents] = useState<Student[] | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    let request = 0
    async function load() {
      const currentRequest = ++request
      try {
        const result = await client.fetch<Student[]>(
          '*[_type == "studentPool"] | order(name asc) {_id, name, image {asset, crop, hotspot}}',
          {},
          {perspective: 'drafts'},
        )
        if (active && currentRequest === request) {
          setStudents(result)
          setError(false)
        }
      } catch {
        if (active && currentRequest === request) setError(true)
      }
    }
    void load()
    const subscription = client.listen('*[_type == "studentPool"]', {}, {includeResult: false}).subscribe({
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
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'student-pool-page', type: 'studentPoolPage'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === 'student-pool-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><HomeIcon /></Text>
            <Text size={1} weight="semibold">Studentpoolens sida</Text>
            <DocumentStatus id="student-pool-page" />
          </Flex>
        </Card>
        <Card borderTop role="separator" />
        <Button as={PaneDocumentLink} intent="create" params={{type: 'studentPool'}} icon={AddIcon} text="Lägg till student" mode="bleed" justify="flex-start" />
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} role="alert">Kunde inte uppdatera studentlistan.</Text>
              <Button text="Försök igen" mode="ghost" onClick={() => setRetry((value) => value + 1)} />
            </Stack>
          </Card>
        )}
        {!students && !error && <Box padding={3}><Text size={1} role="status">Laddar studenter…</Text></Box>}
        {students?.length === 0 && <Box padding={3}><Text size={1} muted>Inga studenter har lagts till ännu.</Text></Box>}
        <Stack space={1}>
          {students?.map((student) => (
            <Card key={student._id} as={PaneDocumentLink} intent="edit" params={{id: student._id, type: 'studentPool'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === student._id}>
              <Flex align="center" gap={3}>
                {student.image?.asset ? (
                  <img src={imageBuilder.image(student.image).width(80).height(80).fit('crop').url()} alt="" width={40} height={40} loading="lazy" style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 3, flexShrink: 0}} />
                ) : (
                  <Box padding={2}><Text size={2} muted><UserIcon /></Text></Box>
                )}
                <Text size={1} weight="semibold">{student.name || 'Namnlös student'}</Text>
                <DocumentStatus id={student._id} />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
