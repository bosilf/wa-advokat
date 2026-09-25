import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { COURSE_CATEGORY_PAGE_QUERY } from "@/sanity/queries";

import type {
  COURSE_CATEGORY_PAGE_QUERY_RESULT,
} from "@/sanity/sanity.types";

import HeroRegular from "@/components/heros/HeroRegular";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import CardContainer from "@/components/cards/CardContainer";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleSlideSection from "@/components/sections/ArticleSlideSection";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import Section from "@/components/sections/Section";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ButtonComp from "@/components/buttons/Button";
import ColumnSection from "@/components/sections/ColumnSection";

type PageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export const revalidate = 30;

export default async function CourseCategoryPage({
  params,
}: PageProps) {
  const { categorySlug } = await params;

  const category =
    await client.fetch<COURSE_CATEGORY_PAGE_QUERY_RESULT>(
      COURSE_CATEGORY_PAGE_QUERY,
      {
        categorySlug,
      },
      {
        next: {
          revalidate,
        },
      },
    );

  if (!category) {
    notFound();
  }

  const categoryTitle =
    category.title ?? "Namnlös kurskategori";

  const introBlocks =
    category.introText?.block ?? [];

  const companySection =
    category.companyCourseSection;

  const companyBlocks =
    companySection?.text?.block ?? [];

  const lecturerSection =
    category.courseLecturerSection;

  const lecturer =
    lecturerSection?.lecturer;

  const lecturerDescription =
    lecturerSection?.text?.block ?? [];

  const lecturerName = [
    lecturer?.firstName,
    lecturer?.lastName,
  ]
    .filter(
      (name): name is string =>
        Boolean(name),
    )
    .join(" ");

  const lecturerRole =
    lecturer?.jobTitles
      ?.filter(
        (title): title is string =>
          Boolean(title),
      )
      .join(" | ") ?? "";

  const lecturerImageSrc =
    lecturer?.image
      ? urlFor(lecturer.image)
          .width(300)
          .height(300)
          .fit("crop")
          .url()
      : "";

  const categoryLecturerImageSrc =
    lecturerSection?.image
      ? urlFor(lecturerSection.image)
          .width(1200)
          .height(650)
          .fit("crop")
          .url()
      : "";

  const lecturerHref =
    lecturer?.slug
      ? `/medarbetare/${lecturer.slug}`
      : undefined;
    

  const courseListSection =
    category.courseListSection;

  const courseListIntro =
    courseListSection?.text?.block ?? [];

  const courseAccordions =
    courseListSection?.accordions ?? [];

  const infoSection =
    category.courseInfoSection;

  const infoSectionText =
      infoSection?.text?.block ?? []

  const infoAccordions =
    infoSection?.accordions ?? [];

  return (
    <>
      <HeroRegular
        eyebrow="Juridikkurser"
        title={categoryTitle}
        image={category.image}
      />

      <main>
        <Section 
          eyebrowCrumbs={[
            {
              label: "Hem",
              href: "/",
            },
            {
              label: "Juridikkurser",
              href: "/juridikkurser",
            },
            {
              label: categoryTitle,
            },
          ]} 
          heading={category.introTitle || "Introduktion"}
        >
            <CustomPortableText
              value={introBlocks || 'introtext saknas'}
            />
        </Section>
        {/* Introduktion */}

        {/* Företagsanpassad kurs */}
        <section className="bg-surface">
          <div className="section-spacing m-auto max-w-section px-section-sides py-section-tb">
            <p className="font-eyebrow text-muted">
              Boka kurs
            </p>

            {companySection?.title?.title && (
              <h2 className="mb-md font-heading text-ink">
                {
                  companySection.title
                    .title
                }
              </h2>
            )}

              <CustomPortableText
                value={companyBlocks || 'text saknas'}
              />
          </div>
        </section>

        <ImageGridSection eyebrow="kursledare" heading={`${lecturerSection?.lecturer?.firstName} ${lecturerSection?.lecturer?.lastName}`}  image={{
          asset: lecturerSection?.image?.asset,
          alt: lecturerSection?.image?.alt,
          crop: lecturerSection?.image?.crop,
          hotspot: lecturerSection?.image?.hotspot,
          }}
        >
          <CustomPortableText value={lecturerSection?.text?.block} />
          <ButtonComp href={`/om-oss/${lecturerSection?.lecturer?.slug}`} variant="secondary" >Mer om kursledaren</ButtonComp>
        </ImageGridSection>

        <ColumnSection
          largeLeft
          color="bg-surface"
          heading={
            courseListSection?.title
              ?.title ?? "Kursutbud"
          }
          eyebrow={
            courseListSection?.title
              ?.eyebrow?.text ??
            "Juridikkurser"
          }
          description={
            courseListIntro.length > 0 ? (
              <CustomPortableText
                value={courseListIntro}
              />
            ) : <></>
          }
        >
          {courseAccordions.length >
          0 ? (
            <CardContainer
              noAccordionPadding
              hasAccordion
              accordions={
                courseAccordions
              }
              bg="bg-white lg:bg-white/0"
            />
          ) : (
            <p className="font-body text-gray-400">
              Inga kurser har valts i
              Sanity.
            </p>
          )}
        </ColumnSection>

        {infoSection && (
          <HeadingIntroGridSection
            heading={
              infoSection.title?.title ??
              "Information"
            }
            eyebrow={
              infoSection.title?.eyebrow
                ?.text ?? "Info"
            }
            description={
              infoSectionText.length > 0 ? (
                <CustomPortableText value={infoSectionText} />
              ) : undefined
            }
          >
            {infoAccordions.length >
            0 ? (
              <CardContainer
                noAccordionPadding
                hasAccordion
                
                accordions={infoAccordions.map((item) => ({
                  ...item,
                  description: item.description ? (
                    <CustomPortableText value={item.description} />
                  ) : null,
                }))}
                bg="bg-none"
              />
            ) : (
              <p className="font-body text-gray-400">
                Ingen kursinformation
                har lagts till.
              </p>
            )}
            {/* <ArticleSlideSection articles={[
              { title: "title till tiel jnhökjh jkhökjh ", 
                lead: "lorum ipådoij piuh uy gyt yt fgytf iyt fkuysöih pisau hpiuoiajdoi  o8tgtuyg uo o uytu oyouy  rdey54 75d ui oiuhkhj fcdxskjgty", 
                link: "/" },
              { title: "title till tiel jnhökjh jkhökjh ", 
                lead: "lorum ipådoij piuh uy gyt yt fgytf iyt fkuysöih pisau hpiuoiajdoi  o8tgtuyg uo o uytu oyouy  rdey54 75d ui oiuhkhj fcdxskjgty", 
                link: "/" },
              { title: "title till tiel jnhökjh jkhökjh ", 
                lead: "lorum ipådoij piuh uy gyt yt fgytf iyt fkuysöih pisau hpiuoiajdoi  o8tgtuyg uo o uytu oyouy  rdey54 75d ui oiuhkhj fcdxskjgty", 
                link: "/" },
            ]} />
            <ArticleCard title="title till tiel jnhökjh jkhökjh " lead="lorum ipådoij piuh uy gyt yt fgytf iyt fkuysöih pisau hpiuoiajdoi  o8tgtuyg uo o uytu oyouy  rdey54 75d ui oiuhkhj fcdxskjgty" link="/" /> */}
          </HeadingIntroGridSection>
        )}
      </main>
    </>
  );
}