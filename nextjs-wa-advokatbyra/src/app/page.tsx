import { client } from "@/sanity/client";
// import Link from "next/link";
import { HOMEPAGE_QUERY, EMPLOYEES_QUERY } from "@/sanity/queries";
// import Image from "next/image";
// import { urlFor } from "@/sanity/image";
import CardContainer from "@/components/cards/CardContainer";
import Button from "@/components/Button";
import EmployeeCard from "@/components/EmployeeCard";
import Section from "@/components/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import HeroHome from "@/components/heros/HeroHome";

const options = { next: { revalidate: 0 } };



export default async function IndexPage() {

  const employees = await client.fetch(EMPLOYEES_QUERY, {}, options);
  const homepage = await client.fetch(HOMEPAGE_QUERY, {}, options);

  const intro = homepage?.introSection
  const tjanster = homepage?.tjansterSection
  const teamSection = homepage?.employeeSection
  const cardData = homepage?.servicesCard;
  return (
    <>
      <HeroHome />
      <main>
        <Section 
          color="bg-surface" 
          hideEyebrow 
          heading={intro?.introTitle ?? "Titel saknas"}
          >
          {intro?.introText ? (
            <CustomPortableText value={intro.introText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
        </Section>
        <Section color="canvas" eyebrow={tjanster?.tjansterEyebrow ?? ""} heading={tjanster?.tjansterTitle ?? "Titel Saknas"}>
          {tjanster?.tjansterText ? (
            <CustomPortableText value={tjanster.tjansterText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          <Button
            href=""
            >
            Läs mer
          </Button>
          <CardContainer
            accordions={cardData?.accordions ?? undefined}
            hideDescription
            hideImage
            hideCardSmall
          />
        </Section>
        <Section color="bg-surface" eyebrow={teamSection?.employeeEyebrow ?? ""} heading={teamSection?.employeeTitle ?? "Titel saknas"}>
          {teamSection?.employeeText ? (
            <CustomPortableText value={teamSection.employeeText} />
          ) : (
            <p className="font-body text-gray-400">Text saknas i Sanity.</p>
          )}
          {employees.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-md gap-x-md">
              {employees.map((employee) => (
                <EmployeeCard key={employee._id} employee={employee} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-8 text-center">Inga medarbetare hittades.</p>
          )}
          {employees.length === 0 && (
            <p className="text-gray-500">Inga medarbetare hittades.</p>
          )}
        </Section>
        <Section eyebrow="kontakt" heading="Kontakta oss idag!">
          <p className="font-body">Be om juridisk rådgivning i bygg- och fastighetsrelaterade frågor. Vi hjälper er i tidigt i processen eller när tvist uppstår. WA Advokatbyrå är specialister på offentlig upphandling och vet vilka problem som brukar uppstå samt hur de kan lösas på bästa sätt. Ta del av våra juridiska utbildningar och anmäl intresse till någon av våra kurser. </p>
        </Section>
      </main>
    </>
  )
}