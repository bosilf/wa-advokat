import { client } from "@/sanity/client";
// import Link from "next/link";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import type { HOMEPAGE_QUERY_RESULT } from "@/sanity/sanity.types";
// import Image from "next/image";
// import { urlFor } from "@/sanity/image";
import CardContainer from "@/components/cards/CardContainer";
import Button from "@/components/buttons/Button";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Section from "@/components/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import HeroHome from "@/components/heros/HeroHome";

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
  
  const employees = team?.employees ?? [];

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
        <Section
          color="bg-canvas"
          eyebrow={services?.tjansterEyebrow?.text ?? ""}
          eyebrowHref={
            services?.tjansterEyebrow?.resolvedLink?.href ?? undefined
          }
          heading={services?.tjansterTitle ?? "Title saknas"}
        >
          {services?.tjansterText ? (
            <CustomPortableText value={services.tjansterText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          <Button
            href=""
            >
            Läs mer
          </Button>
          <CardContainer
            accordions={services?.accordions ?? undefined}
            hideDescription
            hideImage
            hideCardSmall
          />
        </Section>
        <Section 
          eyebrow={team?.employeeEyebrow?.text ?? ""}
          eyebrowHref={
            team?.employeeEyebrow?.resolvedLink?.href ?? undefined
          }
          heading={team?.employeeTitle ?? "Title saknas"}
          color="bg-surface" 
        >
          <p className="font-body">
          Vi är lösningsorienterade och vi strävar efter att inte enbart peka på risker utan att försöka hitta lösningar och möjligheter på olika problem och frågor.
          </p>
          {team?.employeeText ? (
            <CustomPortableText value={team.employeeText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          {employees.length > 0 ? (
            <ul className="grid grid-cols-2 gap-md md:grid-cols-3">
            {employees.map((employee) => (
              <li key={employee._id}>
                <EmployeeCard employee={employee} />
              </li>
            ))}
          </ul>
          ) : (
            <p className="text-gray-500 mt-8 text-center">Inga medarbetare hittades.</p>
          )}
        </Section>
        <Section
          eyebrow={contact?.contactEyebrow?.text ?? undefined}
          eyebrowHref={
            contact?.contactEyebrow?.resolvedLink?.href ?? undefined
          }
          heading={contact?.contactTitle ?? "Kontakta oss"}
        >
          {contact?.contactText && (
            <p className="font-body">
              {contact.contactText}
            </p>
          )}
          
          {contact?.contactCta?.resolvedLink?.href && (
            <Button
              href={contact.contactCta.resolvedLink.href}
              showIcon={contact.contactCta.hasIcon ?? false}
            >
              {contact.contactCta.resolvedLink.label ??
                contact.contactCta.ariaLabel ??
                "Kontakta oss"}
            </Button>
          )}
        </Section>
      </main>
    </>
  )
}