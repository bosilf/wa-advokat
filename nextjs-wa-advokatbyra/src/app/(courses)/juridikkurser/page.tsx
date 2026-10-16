import { notFound } from "next/navigation";

import HeroRegular from "@/components/heroes/HeroRegular";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";

import { client } from "@/sanity/client";
import { COURSE_CARD_QUERY, COURSE_MAIN_PAGE_QUERY } from "@/sanity/queries";
import { COURSE_MAIN_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import CardContainer from "@/components/cards/CardContainer";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import ButtonComp from "@/components/buttons/Button";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ImageGridSectionRight from "@/components/sections/ImageGridSectionRight";
import HeroCta from "@/components/heroes/HeroCta";
import AsideIntroSection from "@/components/sections/AsideIntroSection";
import CourseCard, {
  type CourseCardProps,
} from "@/components/cards/CourseCard";

export const revalidate = 30;

export default async function CoursePage() {
  const page = await client.fetch<COURSE_MAIN_PAGE_QUERY_RESULT>(
    COURSE_MAIN_PAGE_QUERY,
    {},
    {
      next: {
        revalidate,
      },
    },
  );

  const courses = await client.fetch<(CourseCardProps & { _id: string })[]>(
    COURSE_CARD_QUERY,
    {},
    { next: { revalidate } },
  );

  if (!page) {
    notFound();
  }

  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const sortedCourses = courses
    .map((course) => ({
      course,
      nextDate:
        course.dates?.filter((date) => date >= today).sort()[0] ?? "9999-12-31",
    }))
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
    .map(({ course }) => course);

  return (
    <>
      <HeroCta
        eyebrow={page.eyebrow}
        title={page.title}
        image={page.image}
        button={{
          href: "/boka-kurs/",
          children: "Önska datum",
        }}
      />

      <main id="main">
        <div className="z-10 m-auto">
          <section className="flex px-section-sides m-auto py-section-tb max-w-200">
            <div className="max-w-300 m-auto section-spacing">
              <div className="flex gap-sm">
                <Link
                  className="font-eyebrow text-body hover:text-ink hover:underline"
                  href="/"
                >
                  hem
                </Link>
                <p className="font-eyebrow text-body">/</p>
                <p className="font-eyebrow text-footer cursor-default">
                  {page.introSection?.eyebrow?.text || "text saknas"}
                </p>
              </div>
              <h2 className="mb-md font-heading text-ink">
                {page.introSection?.title || "text saknas"}
              </h2>
              <CustomPortableText
                value={page.introSection?.text?.block || "text saknas"}
              />
            </div>
          </section>
          <Section
            eyebrow="aktiva kurser"
            color="bg-surface"
            heading={page.courseOpportunities?.title || "text saknas"}
          >
            <div className="text-balance">
              {page.courseOpportunities?.textContent?.block && (
                <CustomPortableText
                  value={page.courseOpportunities.textContent.block}
                />
              )}
            </div>
            <div className="grid lg:grid-cols-2 gap-md">
              {sortedCourses.map((course) => (
                <CourseCard key={course._id} {...course} />
              ))}
            </div>
            <div className="max-w-200 m-auto px-section-sides gap-4 p-4">
              <h3 className="font-heading-sm">{page.companyCourse?.title}</h3>
              {page.companyCourse?.textContent?.block && (
                <CustomPortableText
                  value={page.companyCourse.textContent.block}
                />
              )}
              <div className="h-md" />
              <Button variant="secondary" href="/boka-kurs" showIcon={false}>
                Önska datum
              </Button>
            </div>
          </Section>

          <section className="col-span-full hidden lg:block lg:order-3 lg:col-span-2 lg:grid-cols-2">
            {page.cardContainers?.map((category, index) => {
              const chosenCategory = category.chosenCourseCategory;

              const links = (category.links ?? []).flatMap((link) => {
                if (!link.href) {
                  return [];
                }

                return [
                  {
                    _id: link._id,
                    title: link.title ?? "Namnlös kurs",
                    href: link.href,
                  },
                ];
              });

              if (!chosenCategory?.image) {
                return null;
              }

              return (
                <ImageGridSection
                  color="bg-canvas"
                  key={category._key}
                  image={chosenCategory.image}
                  imagePosition={index % 2 === 0 ? "left" : "right"}
                  heading={chosenCategory.title ?? ""}
                  eyebrow="Kursutbud"
                >
                  <CustomPortableText value={category.description?.block} />
                  <div className="flex gap-md">
                    <ButtonComp
                      showIcon={false}
                      href={`/boka-kurs/${category.chosenCourseCategory?.slug?.current}`}
                    >
                      Boka kurs i {category.chosenCourseCategory?.title}
                    </ButtonComp>
                    <ButtonComp
                      variant="secondary"
                      href={`/${category.chosenCourseCategory?.slug?.current}`}
                    >
                      kursutbud
                    </ButtonComp>
                  </div>
                </ImageGridSection>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-lg bg-canvas p-section-sides py-section lg:hidden">
            {page.cardContainers?.map((category) => {
              const chosenCategory = category.chosenCourseCategory;

              const expert = chosenCategory?.courseLecturerSection?.lecturer;

              const categoryTitle =
                chosenCategory?.title ?? "Namnlös kurskategori";

              const categoryDescription = category.description?.block ?? [];

              const categoryImageSrc = chosenCategory?.image
                ? urlFor(chosenCategory.image)
                    .width(1200)
                    .height(650)
                    .fit("crop")
                    .url()
                : "";

              const lecturerName = [expert?.firstName, expert?.lastName]
                .filter(Boolean)
                .join(" ");

              const lecturerRole =
                expert?.roles
                  ?.map((role) => role.title)
                  .filter(Boolean)
                  .join(" | ") ||
                expert?.professionalTitle ||
                "";

              const lecturerImageSrc = expert?.image
                ? urlFor(expert.image).width(200).height(200).fit("crop").url()
                : "";

              const links = (category.links ?? []).flatMap((link) => {
                if (!link.href) {
                  return [];
                }

                return [
                  {
                    _id: link._id,
                    title: link.title ?? "Namnlös kurs",
                    href: link.href,
                  },
                ];
              });

              return (
                <CardContainer
                  key={category._key}
                  hasImage={Boolean(categoryImageSrc)}
                  image={{
                    image: {
                      asset: category.chosenCourseCategory?.image?.asset,
                      alt: category.chosenCourseCategory?.image?.alt,
                      crop: category.chosenCourseCategory?.image?.crop,
                      hotspot: category.chosenCourseCategory?.image?.hotspot,
                    },
                    eyebrow: "Kursutbud i",
                    title: categoryTitle,
                  }}
                  hasCardSmall={Boolean(expert)}
                  employee={
                    expert
                      ? {
                          name: lecturerName || "Ingen kursledare vald",

                          role: lecturerRole,

                          imageSrc: lecturerImageSrc,

                          slug: expert.slug?.current
                            ? `/team/${expert.slug.current}`
                            : undefined,
                        }
                      : undefined
                  }
                  hasDescription={categoryDescription.length > 0}
                  description={categoryDescription}
                  hasButton
                  button={{
                    href:
                      `/${category.chosenCourseCategory?.slug?.current}` || "#",
                    children: `Till kurssidan ${category.chosenCourseCategory?.title}`,
                    variant: "simple",
                  }}
                  links={links}
                />
              );
            })}
          </section>
        </div>
        <Section
          eyebrow={page.courseInfo?.infoEyebrow?.text || ""}
          heading={page.courseInfo?.info?.title || ""}
          color="bg-surface"
        >
          <CustomPortableText value={page.courseInfo?.infoBody?.block} />
          <div className="pt-lg">
            <p className="font-eyebrow text-body">
              {page.courseCategoryBlock?.infoEyebrow?.text}
            </p>
            <h2 className="font-heading text-ink mb-md">
              {page.courseCategoryBlock?.info?.title}
            </h2>
            <CustomPortableText
              value={page.courseCategoryBlock?.infoBody?.block}
            />
          </div>
        </Section>
      </main>
    </>
  );
}