import {client} from "@/sanity/client"

import HeroRegular from "@/components/heros/HeroRegular";
import { STUDENT_PAGE_QUERY } from "@/sanity/queries";
import type { STUDENT_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import EmployeeMessage from "@/components/messages/EmployeeMessage";


const options = { next: { revalidate: 30 } };


export default async function StudentPage() {

  const page = await client.fetch<STUDENT_PAGE_QUERY_RESULT>(
    STUDENT_PAGE_QUERY,
    {},
    options,
  )

  const intro = page?.intro?.block ?? []

  console.log(page)

  return (
    <>
      <HeroRegular image={page?.image} eyebrow={page?.eyebrow} title={page?.title}  />
      <Section heading="En möjlighet att komma närmare juridiken i praktiken">
        <CustomPortableText value={intro}/>
      </Section>
      <EmployeeMessage isStudent name="studentpoolen" email="admin@wa-advokat.se" />
    </>
  )
}