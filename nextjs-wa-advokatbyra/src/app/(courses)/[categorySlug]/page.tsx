import { client } from "@/sanity/client";
import { COURSE_CATEGORY_PAGE_QUERY } from "@/sanity/queries";
import ContentPage from "@/components/pages/ContentPage";

import type {
  COURSE_CATEGORY_PAGE_QUERY_RESULT,
} from "@/sanity/sanity.types";

import { CustomPortableText } from "@/components/common/CustomPortableText";
import CardContainer from "@/components/cards/CardContainer";
import HeadingIntroGridSection from "@/components/sections/HeadingIntroGridSection";
import Section from "@/components/sections/Section";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ButtonComp from "@/components/buttons/Button";
import ColumnSection from "@/components/sections/ColumnSection";
import HeroCta from "@/components/heroes/HeroCta";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export const revalidate = 30;

export default async function CourseCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = await client.fetch<COURSE_CATEGORY_PAGE_QUERY_RESULT>(
    COURSE_CATEGORY_PAGE_QUERY,
    { categorySlug },
    { next: { revalidate } },
  );

  if (!category) return <ContentPage path={categorySlug} />;

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
      <HeroCta
        button={{
          href: `/boka-kurs/${categorySlug}`,
          children: "Se kursutbud",
          
        }}
        eyebrow="Juridikkurser"
        title={categoryTitle}
        image={category.image}
      />

      <main id="main">
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
          <div className="flex gap-2 flex-col lg:flex-row">

          <ButtonComp href={`/boka-kurs/${categorySlug}`} showIcon={false} variant="primary"  >Boka kurs i {categoryTitle}</ButtonComp>
          <ButtonComp href={`/team/${lecturerSection?.lecturer?.slug}`} variant="secondary" >Om kursledaren</ButtonComp>
          </div>
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