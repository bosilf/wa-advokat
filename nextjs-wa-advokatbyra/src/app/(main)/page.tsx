import { client } from "@/sanity/client";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import type { HOMEPAGE_QUERY_RESULT, internalGroqTypeReferenceTo } from "@/sanity/sanity.types";
import CardContainer from "@/components/cards/CardContainer";
import ButtonComp from "@/components/buttons/Button";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import HeroHome from "@/components/heroes/HeroHome";
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

  const employees = team?.teamMembers ?? [];
  const teamCta = team?.cta ?? [];
  const accordions = services?.AccordionItemData ?? []
  const serviceIntro = services?.tjansterText;
  const serviceCta = services?.tjansterCta
  const serviceBtnProps = serviceCta?.btnProps

  console.log(page?.employeeSection?.description)


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
              button={{
                _type: serviceCta?._type || 'button',
                btnProps: serviceBtnProps,
                hasButton: serviceCta?.hasButton
              }}
              description={ serviceIntro }
              
              heading={services?.tjansterTitle || 'text saknas'} eyebrow={services?.eyebrow?.text || 'Rättsområden'} eyebrowHref={services.eyebrow?.link?.href || "/"}>
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
            team?.eyebrow?.link?.href ?? undefined
          }
          heading={team?.title ?? "Title saknas"}
          color="bg-surface" 
        >
          <CustomPortableText value={page?.employeeSection?.description} />
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
          eyebrow={contact?.eyebrow?.text || "testing"}
          eyebrowHref={contact?.eyebrow?.link?.href || "/boll"}
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