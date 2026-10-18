import {Button, Card, Heading, Stack, Text} from '@sanity/ui'
import { Link } from 'sanity/router'

export default function StudioOverview() {
  return (
    <Card padding={5}>
      <div style={{maxWidth: 600}}>
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading size={5}>
              <span className="wa-overview-heading">Välkommen till WA Advokatbyrå Sanity innehållshantering</span>
            </Heading>
            <Text>
              <span className="wa-overview-body">
                Här uppdaterar du innehållet på WA Advokatbyrås webbplats. Använd menyn till vänster
                för att redigera sidor, hantera kurser och artiklar eller uppdatera information om
                våra medarbetare och rättsområden.
              </span>
            </Text>
          </Stack>
          <Stack gap={4}>
            <Heading size={1}>
              <span className="wa-overview-subheading">Från ändring till publicering</span>
            </Heading>
            <Text>
              <span className="wa-overview-body">
                Dina ändringar sparas automatiskt som utkast. När innehållet är granskat och redo
                att visas på webbplatsen klickar du på Publicera.
              </span>
            </Text>
            <Text>
              <span className="wa-overview-body">
                Skriv tydligt och med besökarens behov i fokus. Kontrollera att uppgifter, länkar
                och kontaktinformation stämmer innan du publicerar.
              </span>
            </Text>
          </Stack>
          <Stack gap={4}>
            <Heading size={1}>Har du funderingar?</Heading>
            <Text>
              <span className="wa-overview-body">
                Har du fastnat med något i Sanity, eller är du osäker på hur du ska publicera eller skapa ett nytt dokument?
              </span>
            </Text>
            <Link label='mail' href='mailto:emelie.silfverberg@outlook.com?subject=Sanity:' type='mail'>
            <Button mode='default' text="Skicka epost" className='bg-ink hover:bg-muted' style={{cursor: 'pointer'}} >
            </Button>
            </Link>
          </Stack>
        </Stack>
      </div>
    </Card>
  )
}
