import { client } from "@/sanity/client";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import type { HOMEPAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import CardContainer from "@/components/cards/CardContainer";
import ButtonComp from "@/components/buttons/Button";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import HeroHome from "@/components/heros/HeroHome";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import HomeEmployeeGridSection from "@/components/pages/HomeEmployeeGridSection";
import SanityButton from "@/components/buttons/SanityButton";

const options = { next: { revalidate: 30 } };


export default async function IndexPage() {

  const page = await client.fetch<HOMEPAGE_QUERY_RESULT>(
    HOMEPAGE_QUERY,
    {},
    options,
  );

  const intro = page?.introSection;
  const services = page?.tjansterSection;
  const team = page?.employeeSection;
  const contact = page?.contactSection;
  const contactEyebrow = contact?.contactEyebrow ?? [];

  const employees = team?.teamMembers ?? [];
  const teamCta = team?.cta ?? [];
  const accordions = services?.AccordionItemData ?? []
  const serviceIntro = services?.tjansterText;
  const serviceEyebrow = services?.tjansterEyebrow ?? [];
  const serviceCta = services?.tjansterCta ?? null

  console.log(services)


  return (
    <>
      <HeroHome />
      <main className="z-10">
        <Section 
          color="bg-surface" 
          hideEyebrow 
          heading={intro?.introTitle ?? "Title saknas"}
          >
          {intro?.introText ? (
            <CustomPortableText value={intro.introText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
        </Section>
        {
          services && (
            <HeadingIntroGridSection 
              button={serviceCta}
              description={
                services?.tjansterText ? (
                  <CustomPortableText value={services.tjansterText} />
                ) : (
                  <p className="font-body text-gray-400">Text saknas i Sanity.</p>
                )
              }
            heading={services?.tjansterTitle || 'text saknas'} eyebrow={services?.tjansterEyebrow?.text || 'Rättsområden'} eyebrowHref={services?.tjansterEyebrow?.link || "/"}>
              {accordions.length > 0 ? (
                <CardContainer
                  hasAccordion
                  accordions={accordions}
                  noAccordionPadding
                  bg="bg-white lg:bg-white/0"
                />
              ) : (
                <p className="font-body text-gray-400">
                  Inga rättsområden har valts i Sanity.
                </p>
              )}
            </HeadingIntroGridSection>
          )
        }

        <Section 
          eyebrow={team?.eyebrow?.text || "Medarbetare"}
          eyebrowHref={
            team?.eyebrow?.link ?? undefined
          }
          heading={team?.title ?? "Title saknas"}
          color="bg-surface" 
        >
          {/* <p className="font-body text-balance">
          Vi är lösningsorienterade och vi strävar efter att inte enbart peka på risker utan att försöka hitta lösningar och möjligheter på olika problem och frågor.
          </p> */}
          {team?.description ? (
            <CustomPortableText value={team.description} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          <HomeEmployeeGridSection>
            {employees.map(
              (employee, index) => (
                <li
                  key={employee._id}
                  style={{
                    zIndex: index + 1,
                  }}
                  className="
                    relative
                    col-span-3
                    odd:col-start-2
                    md:col-span-1
                    md:odd:col-start-auto
                  "
                >
                  <EmployeeCard
                    employee={employee}
                  />
                </li>
              ),
            )}
          </HomeEmployeeGridSection>
          <SanityButton button={team?.cta} />
        </Section>
        <Section
          eyebrow={contact?.contactEyebrow?.text ?? "Kontakt"}
          eyebrowHref={contact?.contactEyebrow?.link ?? "/kontakt"}
          heading={contact?.contactTitle ?? "Kontakta oss"}
        >
          {contact?.contactText ? (
            <p className="font-body text-body">{contact.contactText}</p>
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          <ButtonComp
            variant="primary"
            showIcon
            icon="arrow"
            href="/kontakt"
          >
            Kontakta oss
          </ButtonComp>
        </Section>
      </main>
    </>
  )
}