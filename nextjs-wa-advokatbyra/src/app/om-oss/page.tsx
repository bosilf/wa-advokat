import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/sanity/client";
import { OM_OSS_PAGE_QUERY } from "@/sanity/queries";

import type { OM_OSS_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

import Section from "@/components/Section";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Button from "@/components/buttons/Button";
import HeroRegular from "@/components/heros/HeroRegular";
import Icon from "@/components/Icon";

import { CustomPortableText } from "@/components/common/CustomPortableText";

import PageBuilder from "@/components/page-builder/PageBuilder";
import ServiceGridBlock from "@/components/page-builder/blocks/ServiceGridBlock";
import CardContainer from "@/components/cards/CardContainer";

const options = {
  next: {
    revalidate: 0,
  },
};

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
  const page =
    await client.fetch<OM_OSS_PAGE_QUERY_RESULT>(
      OM_OSS_PAGE_QUERY,
      {},
      options,
    );

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
        {/* Benefits */}

        {benefits?.items &&
          benefits.items.length > 0 && (
            <section className="w-full bg-canvas snap-start snap-normal">
              <div className="m-auto flex flex-col p-xl">
                <ul className="grid gap-lg md:grid-cols-3">
                  {benefits.items.map((item) => (
                    <li
                      key={item._key}
                      className="flex flex-col gap-sm"
                    >
                      
                      <h2 className="font-subheading text-ink flex w-fit">
                        {item.title}
                        {/* <Icon
                          size=""
                          name={
                            item.icon ?? "check"
                          }
                          className="shrink-0 w-fill"
                        /> */}
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
                <ul className="grid grid-cols-2 gap-md md:grid-cols-3">
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
            className="bg-canvas py-section px-section-sides"
          >
            <div className="max-w-200 mx-auto">

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

        {courses && (
          <Section
            heading={courses.title ?? ""}
            eyebrow={
              courses.eyebrow?.text ??
              undefined
            }
            eyebrowHref={
              courses.eyebrow?.resolvedLink
                ?.href ?? undefined
            }
            color="bg-canvas"
          >
          <CardContainer
            accordions={
              courses?.courseAccordions ?? []
            }
            hideDescription
            hideImage
            hideCardSmall
          />
              {courses.subheading && (
                <h3 className="font-subheading text-ink">
                  {courses.subheading}
                </h3>
              )}

              {courses.text && (
                <CustomPortableText
                  value={courses.text}
                />
              )}

              {courses.courseAccordions &&
                courses.courseAccordions.length > 0 && (
                  <ul className="grid gap-md md:grid-cols-2">
                    {courses.courseAccordions.map(
                      (course) => {
                        if (!course.btnHref) {
                          return null;
                        }

                        return (
                          <li key={course._key}>
                            <Link
                              href={`${course.btnHref}`}
                              className="flex h-full flex-col gap-sm rounded-md border border-ink/20 p-lg transition-colors hover:bg-surface"
                            >
                              <h3 className="font-subheading text-ink">
                                {course.title ??
                                  "Namnlös kurs"}
                              </h3>

                              {course.description && (
                                <p className="font-body text-muted">
                                  {
                                    course.description
                                  }
                                </p>
                              )}
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                )}

              <SectionCta cta={courses.cta} />
          </Section>
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