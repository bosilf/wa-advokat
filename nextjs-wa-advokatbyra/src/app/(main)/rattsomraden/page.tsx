import { client } from "@/sanity/client";
import { notFound } from "next/navigation";

import HeroRegular from "@/components/heroes/HeroRegular";
import { SERVICE_MAIN_PAGE_QUERY } from "@/sanity/queries";
import { SERVICE_MAIN_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import CardContainer from "@/components/cards/CardContainer";
import ColumnSection from "@/components/sections/ColumnSection";
import SectionTwo from "@/components/sections/SectionTwo";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import Message from "./form";

export const revalidate = 30;

export default async function ServicePage() {
  const page =
  await client.fetch<SERVICE_MAIN_PAGE_QUERY_RESULT>(
    SERVICE_MAIN_PAGE_QUERY,
    {},
    {
      next: {
        revalidate,
      },
    },
  );

if (!page) {
  notFound();
}

  const intro = page.introSection
  const introText = intro?.text ?? []
  const accordions = page.AccordionItemData ?? []
  return (
    <>
      <HeroRegular title={page.title} eyebrow={page.eyebrow} 
        image={{
          asset: page.image?.asset,
          alt: page.image?.alt,
          hotspot: page.image?.hotspot,
          crop: page.image?.crop
        }} 
      />
      <main>
        <HeadingIntroGridSection
          heading={intro?.title || 'Titel saknas'}
          eyebrow={intro?.eyebrow?.text || 'intro'}
          description={intro?.text?.block}
          // description={intro?.text?.block}
        >
          <CardContainer 
            hasAccordion
            accordions={accordions}
            noAccordionPadding
            bg="lg:bg-canvas bg-white"
          />
        </HeadingIntroGridSection>
        <Message />
      </main>
    </>
  )
}