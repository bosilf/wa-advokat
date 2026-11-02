import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";

import { client } from "@/sanity/client";
import { SERVICE_SECTION_PAGE_QUERY } from "@/sanity/queries";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import HeroCourse from "@/components/heroes/HeroCourse";
import PageBuilder from "@/components/page-builder/PageBuilder";
import ServiceBlockSection from "@/components/sections/ServiceBlockSection";
import { urlFor } from "@/sanity/image";

type PageProps = {
  params: Promise<{ juridicalServiceSlug: string }>;
};

type ServiceSection = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  intro: unknown[] | null;
  body: unknown[] | null;
  image: {
    asset: unknown;
    alt: string | null;
    hotspot: unknown;
    crop: unknown;
  } | null;
  sections: Array<Record<string, unknown>>;
  parentService: {
    title: string | null;
    slug: string | null;
    serviceSections?: ServiceSection[];
  } | null;
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
};

export const revalidate = 30;

const getServiceSection = cache(async (juridicalServiceSlug: string) =>
  client.fetch<ServiceSection | null>(
    SERVICE_SECTION_PAGE_QUERY,
    { juridicalServiceSlug },
    { next: { revalidate } },
  ),
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { juridicalServiceSlug } = await params;
  const serviceSection = await getServiceSection(juridicalServiceSlug);

  return createPageMetadata({
    seo: serviceSection?.seo,
    notFound: !serviceSection,
    fallbackTitle: serviceSection
      ? `${serviceSection.title || "Tjänsteområde"} | WA Advokatbyrå`
      : "Tjänsteområdet kunde inte hittas | WA Advokatbyrå",
    fallbackDescription: serviceSection?.excerpt || "Läs mer om WA Advokatbyrås tjänsteområden.",
  });
}

export default async function JuridicalServicePage({ params }: PageProps) {
  const { juridicalServiceSlug } = await params;
  const serviceSection = await getServiceSection(juridicalServiceSlug);

  if (!serviceSection) notFound();

  return (
    <>
      <HeroCourse
        image={{
          asset: serviceSection.image?.asset as never,
          alt: serviceSection.image?.alt,
          hotspot: serviceSection.image?.hotspot as never,
          crop: serviceSection.image?.crop as never,
        }}
        title={serviceSection.title || ""}
        eyebrow={serviceSection.parentService?.title || "Tjänsteområde"}
      />
      <main>
        {serviceSection.intro?.length ? (
          <section className="mx-auto max-w-250 px-section-sides py-section-tb">
            <CustomPortableText value={serviceSection.intro as never} />
          </section>
        ) : null}
        {serviceSection.body?.length ? (
          <section className="mx-auto max-w-250 px-section-sides py-section-tb">
            <CustomPortableText value={serviceSection.body as never} />
          </section>
        ) : null}
        <PageBuilder sections={serviceSection.sections ?? []} />
        {serviceSection.parentService?.serviceSections?.length ? (
          <ServiceBlockSection
            eyebrow="Våra specialistområden"
            navigationOnly
            introHref={serviceSection.parentService.slug ? `/rattsomraden/${serviceSection.parentService.slug}` : "/rattsomraden"}
            introLabel={`Tillbaka till ${serviceSection.parentService.title || "rättsområdet"}`}
            items={serviceSection.parentService.serviceSections.map((area: ServiceSection) => ({
              id: area._id,
              title: area.title || "Tjänsteområde",
              href: area.slug ? `/juridiska-tjanster/${area.slug}` : "#",
              imageUrl: area.image?.asset ? urlFor(area.image).width(1400).height(800).fit("crop").url() : undefined,
              thumbnailUrl: area.image?.asset ? urlFor(area.image).width(96).height(96).fit("crop").url() : undefined,
            }))}
          />
        ) : null}
      </main>
    </>
  );
}
