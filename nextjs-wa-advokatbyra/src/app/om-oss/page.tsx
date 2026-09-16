import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/sanity/client";
import { OM_OSS_PAGE_QUERY } from "@/sanity/queries";

import type { OM_OSS_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

import Section from "@/components/sections/Section";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Button from "@/components/buttons/Button";
import HeroRegular from "@/components/heros/HeroRegular";
import Icon from "@/components/Icon";

import { CustomPortableText } from "@/components/common/CustomPortableText";

import PageBuilder from "@/components/page-builder/PageBuilder";
import ServiceGridBlock from "@/components/page-builder/blocks/ServiceGridBlock";
import CardContainer from "@/components/cards/CardContainer";
import { cache } from "react";
import type { Metadata } from "next";

import { urlFor } from "@/sanity/image";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import Image from "next/image";
import ImageSection from "@/components/sections/ImageSection";


const options = {
  next: {
    revalidate: 0,
  },
};

const getAboutPage = cache(() =>
  client.fetch<OM_OSS_PAGE_QUERY_RESULT>(
    OM_OSS_PAGE_QUERY,
    {},
    options,
  ),
);

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  const seo = page?.seo;

  const title =
    seo?.metaTitle?.trim() ||
    page?.hero?.title ||
    "Om oss | WA Advokatbyrå";

  const description =
    seo?.metaDescription?.trim() ||
    "Lär känna WA Advokatbyrå och våra jurister inom entreprenadrätt och offentlig upphandling.";

  const socialImageUrl = seo?.socialImage?.asset
    ? urlFor(seo.socialImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: seo?.canonicalUrl
      ? {
          canonical: seo.canonicalUrl,
        }
      : undefined,

    robots: {
      index: !seo?.noIndex,
      follow: true,
    },

    openGraph: {
      title,
      description,
      type: "website",
      siteName: "WA Advokatbyrå",
      images: socialImageUrl
        ? [
            {
              url: socialImageUrl,
              width: 1200,
              height: 630,
              alt:
                seo?.socialImage?.alt ||
                title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: socialImageUrl
        ? "summary_large_image"
        : "summary",
      title,
      description,
      images: socialImageUrl
        ? [socialImageUrl]
        : undefined,
    },
  };
}

type CtaData = {
  hasIcon?: boolean | null;
  ariaLabel?: string | null;

  resolvedLink?: {
    label?: string | null;
    href?: string | null;
  } | null;
};

function SectionCta({
  cta,
}: {
  cta?: CtaData | null;
}) {
  const href = cta?.resolvedLink?.href;

  if (!href) {
    return null;
  }

  return (
    <Button
      href={href}
      showIcon={cta?.hasIcon ?? false}
      ariaLabel={cta?.ariaLabel ?? undefined}
    >
      {cta?.resolvedLink?.label ??
        cta?.ariaLabel ??
        "Läs mer"}
    </Button>
  );
}

export default async function OmOss() {
  const page = await getAboutPage();

  if (!page) {
    notFound();
  }

  const benefits = page.benefitsSection;
  const team = page.teamSection;
  const practiceAreas =
    page.practiceAreasSection;
  const advice = page.adviceSection;
  const courses = page.coursesSection;
  const contact = page.contactSection;

  const teamMembers =
    team?.teamMembers ?? [];

  const additionalSections =
    page.additionalSections ?? [];

  return (
    <>
      {page.hero && (
        <HeroRegular
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          image={page.hero.image}
        />
      )}

      <main className="relative z-10">

        {benefits?.items &&
          benefits.items.length > 0 && (
            <section className="w-full bg-canvas">
              <div className="m-auto flex flex-col p-xl">
                <ul className="grid gap-lg md:grid-cols-3">
                  {benefits.items.map((item) => (
                    <li
                      key={item._key}
                      className="flex flex-col gap-sm"
                    >
                      
                      <h2 className="font-subheading text-ink flex w-fit">
                        {item.title}
                      </h2>

                      {item.text && (
                        <p className="font-body text-body">
                          {item.text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        {/* Team */}

        {team && (
          <Section
            heading={team.title ?? ""}
            eyebrow={
              team.eyebrow?.text ?? undefined
            }
            eyebrowHref={
              team.eyebrow?.resolvedLink
                ?.href ?? undefined
            }
            color="bg-surface"
          >
              {team.text && (
                <p className="font-body">
                  {team.text}
                </p>
              )}

              {teamMembers.length > 0 ? (
                <ul className="grid grid-cols-1 gap-md md:grid-cols-3">
                  {teamMembers.map(
                    (employee) => (
                      <li key={employee._id}>
                        <EmployeeCard
                          employee={employee}
                        />
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p className="font-body text-muted">
                  Inga medarbetare har valts.
                </p>
              )}
              <SectionCta cta={team.cta} />
          </Section>
        )}

        {practiceAreas && (
          <section
            className="bg-canvas"
          >
            <div className="max-w-200 m-auto py-section-tb px-section-sides">

              <ServiceGridBlock
                block={{
                  _key:
                  "about-practice-areas",
                  _type:
                  "serviceGridBlock",
                  services:
                  practiceAreas.services ??
                  [],
                }}
                />

              <SectionCta
                cta={practiceAreas.cta}
                />
            </div>
          </section>
        )}

        {/* Advice */}

        {advice && (
          <Section
            heading={advice.title ?? ""}
            eyebrow={
              advice.eyebrow?.text ??
              undefined
            }
            eyebrowHref={
              advice.eyebrow?.resolvedLink
                ?.href ?? undefined
            }
            color="bg-surface"
          >
              {advice.text && (
                <CustomPortableText
                  value={advice.text}
                />
              )}

              <SectionCta cta={advice.cta} />
          </Section>
        )}

        {/* Courses */}
        {page.hero && (
          <ImageSection image={page.hero?.image}>test test</ImageSection>
        )}
        {courses && (
          <HeadingIntroGridSection
            heading={courses.title ?? ""}
            eyebrow={
              courses.eyebrow?.text ??
              undefined
            }
            description={
              courses.text?.length ? (
                <CustomPortableText value={courses.text} />
              ) : undefined
            }
            eyebrowHref={
              courses.eyebrow?.resolvedLink
                ?.href ?? undefined
            }
            color="bg-canvas"
            button={courses.cta}
          >
          <CardContainer
            hasAccordion
            accordions={
              courses?.courseAccordions ?? []
            }
            noAccordionPadding={true}
            bg="lg:bg-white/0 bg-white"
          />

          </HeadingIntroGridSection>
        )}


        {additionalSections.length > 0 && (
          <PageBuilder
            sections={additionalSections}
          />
        )}


        {contact && (
          <Section
            heading={contact.title ?? "Kontakt"}
            eyebrow={
              contact.eyebrow?.text ??
              undefined
            }
            eyebrowHref={
              contact.eyebrow?.resolvedLink
                ?.href ?? undefined
            }
            color="bg-surface"
          >
              <div className="flex flex-col gap-md">
                {contact.text && (
                  <p className="font-body">
                    {contact.text}
                  </p>
                )}
              </div>

              {contact.showContactForm &&
                contact.form && (
                  <form className="flex flex-col gap-md">
                    {contact.form.title && (
                      <h3 className="font-subheading text-ink">
                        {contact.form.title}
                      </h3>
                    )}

                    <label className="flex flex-col gap-xs font-body">
                      <span>
                        {contact.form
                          .nameLabel ??
                          "För- och efternamn"}
                      </span>

                      <input
                        type="text"
                        name="name"
                        required
                        className="rounded-md border border-ink/30 bg-white p-sm"
                      />
                    </label>

                    <label className="flex flex-col gap-xs font-body">
                      <span>
                        {contact.form
                          .emailLabel ??
                          "E-post"}
                      </span>

                      <input
                        type="email"
                        name="email"
                        required
                        className="rounded-md border border-ink/30 bg-white p-sm"
                      />
                    </label>

                    <label className="flex flex-col gap-xs font-body">
                      <span>
                        {contact.form
                          .phoneLabel ??
                          "Telefon"}
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        className="rounded-md border border-ink/30 bg-white p-sm"
                      />
                    </label>

                    <label className="flex flex-col gap-xs font-body">
                      <span className="sr-only">
                        Meddelande
                      </span>

                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder={
                          contact.form
                            .messagePlaceholder ??
                          undefined
                        }
                        className="resize-y rounded-md border border-ink/30 bg-white p-sm"
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-fit rounded-md bg-ink px-lg py-sm font-subheading text-white"
                    >
                      {contact.form
                        .submitLabel ??
                        "Skicka meddelande"}
                    </button>
                  </form>
                )}
          </Section>
        )}
      </main>
    </>
  );
}