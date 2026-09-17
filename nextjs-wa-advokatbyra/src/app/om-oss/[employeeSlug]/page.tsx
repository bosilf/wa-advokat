import {client} from "@/sanity/client"
import HeroRegular from "@/components/heros/HeroRegular"
import { EMPLOYEE_PAGE_QUERY } from "@/sanity/queries";
import { EMPLOYEE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import Message from "@/components/messages/Message";
import { link } from "fs";
import HeroEmployee from "@/components/heros/HeroEmployee";
import SectionTwo from "@/components/sections/SectionTwo";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import EmployeeMessage from "@/components/messages/EmployeeMessage";
import ColumnSection from "@/components/sections/ColumnSection";

type PageProps = {
  params: Promise<{
    employeeSlug: string;
  }>;
};

export const revalidate = 30;

export default async function EmployeePage({params}: PageProps) {

  const {employeeSlug} = await params;

  const employee = await client.fetch<EMPLOYEE_PAGE_QUERY_RESULT>(
    EMPLOYEE_PAGE_QUERY,
    {employeeSlug},
    {
      next: {
        revalidate
      }
    }
  )
  const roleTitles = (employee?.roles ?? [])
    .map((role) => role?.title)
    .filter((title): title is string => Boolean(title))
    .join(" & ");

  return (
    <>
    <HeroEmployee title={employee?.employeeDescription || 'Erfaren jurist'} eyebrow="wa advokatbyrå" image={employee?.image} employee={
      {
      email: employee?.email || 'epost saknas', firstName: employee?.firstName || 'namn saknas', lastName: employee?.lastName || 'namn saknas', phone: employee?.phone || 'nummer saknas', roles: roleTitles
    }
    }  />

      <main>
        <ColumnSection heading="Erfarenhet & utbildning" color="bg-surface" eyebrow="bakgrund" >
        <div className="flex-3 flex flex-col gap-lg">
              <div className="flex flex-col gap-md">
                <p className="font-eyebrow text-muted">Yrkesbakgrund</p>
                <div className="border-b border-border" />
                <ul>
                  {employee?.jobHistory?.map((item, index) => (
                    <li key={index} className="font-body text-ink flex gap-md justify-start">
                      <div className="font-caption mt-4 w-20">{item.yearStart}-{item.yearEnd || 'nu'}</div>
                      <div>
                        <h3 className="font-subheading text-ink">{item.jobTitle}</h3>
                        <p className="font-body text-body">{item.employer}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-md">
                <p className="font-eyebrow text-muted">utbildning</p>
                <div className="border-b border-border" />
                <ul>
                  {employee?.educationList?.map((item, index) => (
                    <li key={index} className="font-body text-ink flex gap-md justify-start">
                      <div className="font-caption mt-4 w-20">{item.yearStart}-{item.yearEnd}</div>
                      <div>
                        <h3 className="font-subheading text-ink">{item.education}</h3>
                        <p className="font-body text-body">{item.school}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </ColumnSection>
        <Section color="bg-canvas" eyebrow="bio" heading={`Om ${employee?.firstName}`}>
          <CustomPortableText value={employee?.bio} />
        </Section>
          <EmployeeMessage name={employee!.firstName || ''} email={employee?.email || ''} />
      </main>
    </>
  );
}