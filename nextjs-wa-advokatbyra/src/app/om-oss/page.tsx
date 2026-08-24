import { client } from "@/sanity/client";
import Section from "@/components/Section"
import { EMPLOYEES_QUERY } from "@/sanity/queries";
import EmployeeCard from "@/components/EmployeeCard";
import Button from "@/components/Button";

const options = { next: { revalidate: 0 } };

export default async function OmOss() {
  const employees = await client.fetch(EMPLOYEES_QUERY, {}, options);

  return (
    <>
    
    <div className="bg-accent self-stretch px-6 py-12 bg-blend-overlay rounded-b-md shadow-[inset_0px_20px_15px_-11px_rgba(0,0,0,0.10)] inline-flex flex-col justify-end items-start overflow-hidden">
    <div data-color="Default" className="size- inline-flex justify-start items-start gap-2.5">
        <div className="justify-center text-white text-[10px] font-eyebrow">Avtalsrätt</div>
    </div>
    <div data-type="Hero" className="w-full max-w-[650px] inline-flex justify-start items-center gap-2.5">
        <div className="flex-1 justify-center text-white font-display text-3xl font-normal font-['Cormorant_Garamond']">Advokat inom kommeriell avtalsrätt</div>
    </div>
  </div>
    <Section heading="Möt våra medarbetare" eyebrow="Medarbetare" color="bg-surface">
      <p>Vi är lösningsorienterade och vi strävar efter att inte enbart peka på risker utan att försöka hitta lösningar och möjligheter på olika problem och frågor. </p>
      {employees.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-md gap-x-md">
          {employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-8 text-center">Inga medarbetare hittades.</p>
      )}
      <Button 
      href=""
      >oss</Button>
      <p>Be om juridisk rådgivning i frågor kring offentlig upphandling, bygg- och entreprenad. Vi hjälper er tidigt i processen eller när tvist uppstår. WA Advokatbyrå är också specialister på offentlig upphandling och vet vilka problem som brukar uppstå samt hur de kan lösas på bästa sätt. Ta del av våra juridiska utbildningar och anmäl intresse till någon av våra kurser. </p>
    </Section>
    <Section heading="" >
      <ul>
        <li>
          <Button 
          href=""
          >child</Button>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </Section>
    </>
  )
}