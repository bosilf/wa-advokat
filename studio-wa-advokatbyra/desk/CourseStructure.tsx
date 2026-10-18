import DocumentStatus from './DocumentStatus'
import {useEffect, useState} from 'react'
import {Badge, Box, Button, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import {usePaneRouter} from 'sanity/structure'
import {useClient} from 'sanity'
import PaneDocumentLink from './PaneDocumentLink'
import CategoryTag from '../src/studio/CategoryTag'
import {AddIcon, BookIcon, CalendarIcon, EditIcon, HomeIcon} from '@sanity/icons'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

type Category = {
  _id: string
  title?: string
  image?: SanityImageSource & {asset?: {_ref: string}; alt?: string}
}
type Course = Category & {parentId?: string; description?: string; length?: string; nextDate?: string; categoryTitle?: string; categorySlug?: string}
type Booking = {_id: string; title?: string; categoryTitle?: string; categorySlug?: string; dates?: string[]; nextDate?: string}
type Content = {categories: Category[]; courses: Course[]; bookings: Booking[]}

const query = `{
  "categories": *[_type == "courseCategory"] | order(sortOrder asc, title asc) {_id, title, image {asset, crop, hotspot, alt}},
  "courses": *[_type == "course"] | order(courseName asc) {
    _id,
    "title": courseName,
    "parentId": category._ref,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    "image": coalesce(hero.image, lecturer->image, category->image),
    "description": coalesce(pt::text(intro), pt::text(aboutCourse), seo.metaDescription),
    length,
    "nextDate": (*[_type == "futureCourse" && coursePick._ref == ^._id] {
      "date": (dates[@ >= $today] | order(@ asc))[0]
    } | order(defined(date) desc, date asc))[0].date
  },
  "bookings": *[_type == "futureCourse"] {
    _id,
    "title": coursePick->courseName,
    "categoryTitle": coursePick->category->title,
    "categorySlug": coursePick->category->slug.current,
    "nextDate": (dates[@ >= $today] | order(@ asc))[0],
    "dates": dates | order(@ asc)
  } | order(defined(nextDate) desc, nextDate asc, title asc)
}`

export default function CourseStructure() {
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
        const today = new Intl.DateTimeFormat('sv-SE', {
          timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit',
        }).format(new Date())
        const result = await client.fetch<Content>(query, {today}, {perspective: 'drafts'})
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
      .listen('*[_type in ["courseCategory", "course", "futureCourse"]]', {}, {includeResult: false})
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

  const unassigned = content?.courses.filter(
    (course) => !content.categories.some((category) => category._id === course.parentId),
  ) ?? []

  function thumbnail(item: Category, size = 40) {
    return item.image?.asset ? (
      <img
        src={imageBuilder.image(item.image).width(size * 2).height(size * 2).fit('crop').url()}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        style={{width: size, height: size, objectFit: 'cover', borderRadius: 3, flexShrink: 0}}
      />
    ) : (
      <Card as="span" padding={2} radius={2} tone="transparent" style={{width: size, height: size, flexShrink: 0}}>
        <Flex as="span" align="center" justify="center" height="fill"><Text as="span" muted><BookIcon /></Text></Flex>
      </Card>
    )
  }

  function courseRow(course: Course) {
    return (
      <Card key={course._id} as={PaneDocumentLink} intent="edit" params={{id: course._id, type: 'course'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === course._id}>
        <Flex align="center" gap={3}>
          {thumbnail(course)}
          <Box flex={1} style={{minWidth: 0}}>
            <Stack space={3}>
              <Text size={1} weight="semibold">{course.title || 'Namnlös kurs'}</Text>
              {course.description && <Text size={1} muted textOverflow="ellipsis">{course.description}</Text>}
              <Flex gap={2} wrap="wrap">
                <CategoryTag title={course.categoryTitle} slug={course.categorySlug} />
                {course.length && <Badge fontSize={0} mode="outline">{course.length}</Badge>}
                <Badge fontSize={0} mode="outline" tone={course.nextDate ? 'primary' : 'default'}>
                  {course.nextDate ? `Nästa datum: ${course.nextDate}` : 'Inga kommande datum'}
                </Badge>
              </Flex>
            </Stack>
          </Box>
          <DocumentStatus id={course._id} />
        </Flex>
      </Card>
    )
  }

  return (
    <Card padding={3} height="fill" overflow="auto">
      <Stack space={4}>
        <Box padding={3}>
          <Stack space={3}>
            <Heading size={2}>Hantera kurser</Heading>
            <Text size={1} muted>Redigera kurskategorier, kurser och bokningsbara kurstillfällen.</Text>
          </Stack>
        </Box>
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} role="alert">Kunde inte uppdatera kurserna.</Text>
              <Button text="Försök igen" mode="ghost" onClick={() => setRetry((value) => value + 1)} />
            </Stack>
          </Card>
        )}
        {!content && !error && <Box padding={3}><Text size={1} role="status">Laddar kurser…</Text></Box>}
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'course-main-page', type: 'courseMainPage'}} data-as="a" tone="transparent" padding={3} radius={2} selected={selectedId === 'course-main-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><HomeIcon /></Text>
            <Text size={1} weight="semibold">Juridikkurser – samlingssida</Text>
            <DocumentStatus id="course-main-page" />
          </Flex>
        </Card>
        <Card as={PaneDocumentLink} intent="edit" params={{id: 'book-course-page', type: 'bookCoursePage'}} data-as="a" tone="transparent" padding={3} radius={2} selected={selectedId === 'book-course-page'}>
          <Flex align="center" gap={3}>
            <Text size={2} muted><CalendarIcon /></Text>
            <Text size={1} weight="semibold">Boka kurs – bokningssida</Text>
            <DocumentStatus id="book-course-page" />
          </Flex>
        </Card>
        <details className="wa-course-group">
          <Card as="summary" data-as="button" tone="transparent" padding={3} radius={2}>
            <Flex as="span" align="center" gap={3}>
              <Text as="span" size={2} muted><CalendarIcon /></Text>
              <Text as="span" size={1} weight="semibold">Bokningsbara kurser</Text>
              <Badge fontSize={0}>{content?.bookings.length ?? 0}</Badge>
            </Flex>
          </Card>
          <Box paddingLeft={3} paddingTop={2}>
            <Stack space={1}>
              <Button as={PaneDocumentLink} intent="create" params={{type: 'futureCourse'}} icon={AddIcon} text="Lägg till bokningsbar kurs" mode="bleed" justify="flex-start" />
              {content?.bookings.length === 0 && <Box padding={3}><Text size={1} muted>Inga bokningsbara kurser har skapats ännu.</Text></Box>}
              {content?.bookings.map((booking) => (
                <Card key={booking._id} as={PaneDocumentLink} intent="edit" params={{id: booking._id, type: 'futureCourse'}} data-as="a" tone="transparent" radius={2} padding={3} selected={selectedId === booking._id}>
                  <Flex align="center" gap={3} wrap="wrap">
                    <Box flex={1} style={{minWidth: 160}}>
                      <Stack space={3}>
                        <Text size={1} weight="semibold">{booking.title || 'Välj kurs för detta kurstillfälle'}</Text>
                        <Text size={1} muted>{booking.nextDate ? `Nästa datum: ${booking.nextDate}` : booking.dates?.length ? 'Inga kommande datum' : 'Inga datum angivna'}</Text>
                      </Stack>
                    </Box>
                    <CategoryTag title={booking.categoryTitle} slug={booking.categorySlug} />
                    <DocumentStatus id={booking._id} />
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Box>
        </details>
        <Box paddingX={3} paddingTop={3}><Text size={1} weight="semibold" muted>Kurskategorier</Text></Box>
        <Button as={PaneDocumentLink} intent="create" params={{type: 'courseCategory'}} icon={AddIcon} text="Lägg till kurskategori" mode="bleed" justify="flex-start" />
        {content?.categories.length === 0 && <Box padding={3}><Text size={1} muted>Inga kurskategorier har skapats ännu.</Text></Box>}
        <Stack space={1}>
          {content?.categories.map((category) => (
            <details key={category._id} className="wa-course-group">
              <Card as="summary" data-as="button" tone="transparent" padding={3} radius={2}>
                <Flex as="span" align="center" gap={3}>
                  {thumbnail(category)}
                  <Text as="span" size={1} weight="semibold">{category.title || 'Namnlös kurskategori'}</Text>
                  <Badge fontSize={0}>{content.courses.filter((course) => course.parentId === category._id).length}</Badge>
                  <DocumentStatus id={category._id} />
                </Flex>
              </Card>
              <Box paddingLeft={3} paddingTop={2}>
                <Stack space={1}>
                  <Button as={PaneDocumentLink} intent="edit" params={{id: category._id, type: 'courseCategory'}} icon={EditIcon} text={`Uppdatera kurskategori: ${category.title || 'Namnlös kurskategori'}`} mode="bleed" justify="flex-start" />
                  <Button
                    as={PaneDocumentLink}
                    intent="create"
                    params={[
                      {type: 'course', template: 'course-for-category'},
                      {categoryId: category._id},
                    ]}
                    icon={AddIcon}
                    text={`Lägg till kurs i: ${category.title || 'kategorin'}`}
                    mode="bleed"
                    justify="flex-start"
                  />
                  {content.courses.filter((course) => course.parentId === category._id).map(courseRow)}
                </Stack>
              </Box>
            </details>
          ))}
        </Stack>
        {unassigned.length > 0 && (
          <Stack space={3}>
            <Box padding={3}><Text size={1} weight="semibold">Kurser utan kategori</Text></Box>
            <Box paddingX={3}><Text size={1} muted>Öppna en kurs och välj Kategori under Innehåll.</Text></Box>
            <Stack space={1}>{unassigned.map(courseRow)}</Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
