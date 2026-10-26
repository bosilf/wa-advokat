import {useEffect, useState} from 'react'
import {Badge, Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {AddIcon, EditIcon} from '@sanity/icons'
import {useClient, useFormValue, type StringInputProps} from 'sanity'
import {usePaneRouter} from 'sanity/structure'
import DocumentStatus from '../../desk/DocumentStatus'

type OpenCourse = {
  _id: string
  dates?: string[]
  nextDate?: string
  location?: string
  type?: string
  cost?: string
}

const query = `*[_type == "futureCourse" && coursePick._ref == $courseId] {
  _id, location, type, cost,
  "dates": dates | order(@ asc),
  "nextDate": (dates[@ >= $today] | order(@ asc))[0]
} | order(defined(nextDate) desc, nextDate asc, dates[0] desc)`

export default function CourseOpenCoursesInput({readOnly}: StringInputProps) {
  const documentId = useFormValue(['_id'])
  const courseId = typeof documentId === 'string' ? documentId.replace(/^drafts\./, '') : undefined
  const client = useClient({apiVersion: '2025-02-19'})
  const {handleEditReference} = usePaneRouter()
  const [courses, setCourses] = useState<OpenCourse[] | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!courseId) return
    let active = true
    let request = 0
    async function load() {
      const currentRequest = ++request
      const today = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Europe/Stockholm'}).format(new Date())
      try {
        const result = await client.fetch<OpenCourse[]>(query, {courseId, today}, {perspective: 'drafts'})
        if (active && currentRequest === request) {
          setCourses(result)
          setError(false)
        }
      } catch {
        if (active && currentRequest === request) setError(true)
      }
    }
    void load()
    const subscription = client.listen(
      '*[_type == "futureCourse"]', {}, {includeResult: false},
    ).subscribe({next: () => void load(), error: () => {if (active) setError(true)}})
    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [client, courseId, retry])

  function openCourse(id: string) {
    if (!courseId) return
    handleEditReference({
      id,
      type: 'futureCourse',
      parentRefPath: [],
      template: {id: 'future-course-for-course', params: {courseId}},
    })
  }

  return (
    <Stack space={4}>
      <Text size={1} muted>
        Lägg till datum, pris och undervisningsform. Kurstillfällena går även att redigera under Bokningsbara kurser.
      </Text>
      <Button
        icon={AddIcon}
        text="Lägg till öppen kurs"
        mode="ghost"
        disabled={readOnly || !courseId}
        onClick={() => openCourse(crypto.randomUUID())}
      />
      {error && (
        <Card tone="critical" padding={3} radius={2}>
          <Stack space={3}>
            <Text size={1} role="alert">Kunde inte uppdatera kurstillfällena.</Text>
            <Button text="Försök igen" mode="ghost" onClick={() => setRetry(value => value + 1)} />
          </Stack>
        </Card>
      )}
      {!courses && !error && courseId && <Text size={1} role="status">Laddar kurstillfällen…</Text>}
      {courses?.length === 0 && <Text size={1} muted>Inga öppna kurstillfällen har lagts till för denna kurs ännu.</Text>}
      <Stack space={2}>
        {courses?.map(course => (
          <Card key={course._id} padding={3} radius={2} border>
            <Stack space={4}>
              <Flex align="center" gap={3}>
                <Box flex={1}>
                  <Text size={1} weight="semibold">
                    {course.nextDate ? `Nästa datum: ${formatDate(course.nextDate)}` : course.dates?.length ? 'Tidigare kurstillfälle' : 'Datum saknas'}
                  </Text>
                </Box>
                <DocumentStatus id={course._id} />
              </Flex>
              <Flex gap={2} wrap="wrap">
                <Badge fontSize={0} tone={course.nextDate ? 'positive' : 'default'}>{course.nextDate ? 'Kommande' : course.dates?.length ? 'Avslutad' : 'Utkast utan datum'}</Badge>
                {course.type && <Badge fontSize={0} mode="outline">{course.type === 'digital' ? 'Digitalt' : 'På plats'}</Badge>}
              </Flex>
              <Text size={1} muted>{course.dates?.length ? course.dates.map(formatDate).join(', ') : 'Inga datum angivna'}</Text>
              {course.location && <Text size={1}>Plats: {course.location}</Text>}
              <Text size={1}>Pris: {course.cost?.trim() ? `${course.cost} SEK` : 'Enligt överenskommelse'}</Text>
              <Button icon={EditIcon} text="Redigera kurstillfälle" mode="bleed" justify="flex-start" onClick={() => openCourse(course._id)} />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('sv-SE', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(new Date(`${date}T00:00:00Z`))
}
