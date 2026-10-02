import { SERVICE_PAGE_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import { SERVICE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { cache } from "react";
import CardContainer from "@/components/cards/CardContainer";
import AsideService from "@/components/asides/AsideService";
import HeroCourse from "@/components/heroes/HeroCourse";
import CourseSection from "@/components/sections/CourseSection";
import AsideSectionPageBuilder from "@/components/page-builder/AsideSectionPageBuilder";

type PageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export const revalidate = 30

const getService = cache(
  async (serviceSlug: string) => {
    return client.fetch<SERVICE_PAGE_QUERY_RESULT>(
      SERVICE_PAGE_QUERY,
      {
        serviceSlug,
      },
      {
        next: {
          revalidate,
        },
      },
    );
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getService(serviceSlug);

  return createPageMetadata({
    seo: service?.seo,
    notFound: !service,
    fallbackTitle: service
      ? `${service.title || "Rättsområde"} | WA Advokatbyrå`
      : "Rättsområdet kunde inte hittas | WA Advokatbyrå",
    fallbackDescription: service
      ? `Läs mer om ${
          service.title || "WA Advokatbyrås rättsområde"
        }, kursens innehåll och förutsättningar.`
      : "Det efterfrågade rättsområdet kunde inte hittas.",
  });
}


export default async function ServicePage({
  params,
}: PageProps) {
  const { serviceSlug } = await params


  const service = await getService(serviceSlug);

  if (!service) {
    notFound();
  }

  const experts = service.experts ?? []
  const asideExperts = experts.map((expert) => ({
    name: [expert.firstName, expert.lastName]
      .filter(Boolean)
      .join(" "),
    link: expert.slug?.current
      ? `/om-oss/${expert.slug.current}`
      : undefined,
    image: expert.image,
    caption: (expert.roles ?? [])
      .map((role) => role?.title)
      .filter(Boolean)
      .join(" | "),
  }));

  const sectionsLog = service.sections ?? []

  
  console.log('sectionsLog', sectionsLog)

  return (
    <>
      <HeroCourse 
        image={{
          asset: service.image?.asset,
          alt: service.image?.alt,
          hotspot: service.image?.hotspot,
          crop: service.image?.crop
        }} 
        title={service.title || ''}
        eyebrow={service.eyebrow?.text || ''}
      />
      <div className="grid lg:grid-cols-[1fr_4fr]">
      <div className="hidden lg:block">
        <AsideService
          service={service.title ?? ''}
          experts={asideExperts}
        />
      </div>
      <main>
        <CourseSection
          heading={service.title || ''}
          eyebrow="introduktion"
        >
          <CustomPortableText value={service.intro} />
          <div className="grid grid-cols-1 px-xl sm:px-0 sm:grid-cols-2 gap-lg sm:gap-md pb-section-tb pt-md lg:hidden">
            {experts && experts.map((expert, _id) =>
              <CardContainer
                hasImage
                key={_id}
                image={{  
                  link: `/om-oss/${expert.slug?.current}/`,
                  image: {
                    asset: expert.image?.asset,
                    hotspot: expert.image?.hotspot,
                    alt: expert.image?.alt,
                    crop: expert.image?.crop,
                  },
                  eyebrow: 'ansvarig advokat',
                  title: `${expert.firstName} ${expert.lastName}`
                }}
                contact={{
                  email: expert.email || '',
                  phone: expert.phone || '',
                  name: `${expert.firstName} ${expert.lastName}` || '',
                  slug: `/om-oss/${expert.slug?.current}/`
                }}
              />
            )}

          </div>
        </CourseSection>
        <AsideSectionPageBuilder sections={service.sections ?? []} />
      </main>
      </div>

    </>
  )
}