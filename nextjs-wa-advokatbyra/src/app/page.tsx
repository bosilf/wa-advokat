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

const options = { next: { revalidate: 0 } };



export default async function IndexPage() {

  const employees = await client.fetch(EMPLOYEES_QUERY, {}, options);
  const homepage = await client.fetch(HOMEPAGE_QUERY, {}, options);

  // const intro = homepage?.introSection || {};
  const intro = homepage?.introSection
  // const tjanster = homepage?.tjansterSection || {};
  // const teamSection = homepage?.employeeSection || {};
  const cardData = homepage?.servicesCard;
  console.log(homepage);
  console.log('Card container test: ', homepage?.servicesCard);
  return (
    <div className="">
      {/* <p >{homepage?.homeText}</p> */}
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
        <Section color="canvas" eyebrow="juridiska tjänster" heading="Juridisk expertis du kan lita på">
          <p className="font-body whitespace-pre-line">
            Du får rådgivning på hög nivå, där både juridiska 
            och kommersiella aspekter vägs in. Du möts av ett prestigelöst förhållningssätt och en stark samarbetspartner i dina affärer.
          </p>
          <Button
            href=""
          >
            Läs mer
          </Button>
          <CardContainer
            descriptionText={cardData?.descriptionText ?? undefined}
            accordions={cardData?.accordions ?? undefined}
            hideDescription={cardData?.hideDescription ?? undefined}
            hideAccordion={cardData?.hideAccordion ?? undefined}
            hideImage={cardData?.hideImage ?? undefined}
            hideCardSmall={cardData?.hideCardSmall ?? undefined}
          />
        </Section>
        <Section color="bg-surface" eyebrow="medarbetare" heading="Möt teamet">
          <p className="font-body">
            Vi är lösningsorienterade och vi strävar efter att inte enbart peka på risker utan att försöka hitta lösningar och möjligheter på olika problem och frågor. 
          </p>
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
    </div>
  )
}