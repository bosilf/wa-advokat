import { SERVICE_PAGE_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { SERVICE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { cache } from "react";
import HeroCourse from "@/components/heroes/HeroCourse";
import PageBuilder from "@/components/page-builder/PageBuilder";
import ServiceBlockSection from "@/components/sections/ServiceBlockSection";
import { urlFor } from "@/sanity/image";

type PageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export const revalidate = 30;

function truncateWords(value: string, maxWords = 150) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return `${words.slice(0, maxWords).join(" ")}${words.length > maxWords ? "…" : ""}`;
}

function serviceDescription(
  body: unknown,
  excerpt: string | null | undefined,
) {
  const bodyText = (Array.isArray(body) ? body : [])
    .flatMap((block) => (typeof block === "object" && block && "children" in block && Array.isArray(block.children) ? block.children : []))
    .map((child) => (typeof child === "object" && child && "text" in child && typeof child.text === "string" ? child.text : ""))
    .join(" ")
    .trim();
  return truncateWords(bodyText || excerpt || "");
}

const getService = cache(async (serviceSlug: string) => {
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
});

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

export default async function ServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;

  const service = await getService(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <HeroCourse
        image={{
          asset: service.image?.asset,
          alt: service.image?.alt,
          hotspot: service.image?.hotspot,
          crop: service.image?.crop,
        }}
        title={service.title || ""}
        eyebrow={service.eyebrow?.text || ""}
      />
  
        <main>
          {service.serviceSections.length > 0 && (
            <ServiceBlockSection
              eyebrow={service.areas?.eyebrow ?? "Tjänsteområden"}
              introContent={
                <div className="flex flex-col gap-md">
                  <p>
                    WA Advokatbyrå i Stockholm erbjuder juridisk rådgivning inom entreprenadrätt och konsulträtt för beställare, entreprenörer och tekniska konsulter. Vi hjälper er att tydliggöra ansvar, hantera risker och tillvarata era rättigheter genom hela byggprocessen – från avtal och upphandling till projektets genomförande och eventuella tvister.
                  </p>
                  <p>
                    Vår rådgivning omfattar granskning och utformning av avtal, löpande projektstöd och frågor om bland annat ÄTA-arbeten, tidsförlängning och konsultansvar. Vi förenar juridisk kompetens med förståelse för projektets tekniska och kommersiella förutsättningar. När parterna är oense hjälper vi er att bedöma handlingsalternativen och företräder er i förhandlingar, domstol och skiljeförfarande.
                  </p>
                  <p>
                    Ansvarig advokat är Sven Albinsson, delägare på WA Advokatbyrå, med lång erfarenhet av entreprenadjuridik, konsulträtt och byggsektorns avtalsfrågor. Kontakta oss för att diskutera hur vi kan hjälpa er i ert projekt eller er tvist.
                  </p>
                </div>
              }
              items={service.serviceSections.map((area) => ({
                id: area._id,
                title: area.title ?? "Namnlöst tjänsteområde",
                href: area.slug ? `/juridiska-tjanster/${area.slug}` : "#",
                imageUrl: area.image?.asset
                  ? urlFor(area.image).width(1400).height(800).fit("crop").url()
                  : undefined,
                thumbnailUrl: area.image?.asset
                  ? urlFor(area.image).width(96).height(96).fit("crop").url()
                  : undefined,
                content: <p>{serviceDescription(area.body, area.excerpt)}</p>,
              }))}
            />
          )}
          <PageBuilder sections={service.sections ?? []} />
        </main>
    </>
  );
}
