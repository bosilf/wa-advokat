import CardScroller from "@/components/sections/CardScroller";
import { client } from "@/sanity/client";
import { ARTICLES_QUERY, COURSE_CATEGORY_PAGE_QUERY } from "@/sanity/queries";
import ContentPage from "@/components/pages/ContentPage";

import type { ARTICLES_QUERY_RESULT, COURSE_CATEGORY_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

import { CustomPortableText } from "@/components/common/CustomPortableText";
import CardContainer from "@/components/cards/CardContainer";
import Section from "@/components/sections/Section";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ButtonComp from "@/components/buttons/Button";
import ColumnSection from "@/components/sections/ColumnSection";
import HeroCta from "@/components/heroes/HeroCta";
import CourseBlocksSection from "@/components/sections/CourseBlocksSection";
import ImageColorSection from "@/components/sections/ImageColorSection";
import Icon from "@/components/Icon";
import Link from "next/link";
import QuoteCard from "@/components/cards/QuoteCard";
import ArticleCard from "@/components/cards/ArticleCard";
import ScrollerEndCard from "@/components/cards/ScrollerEndCard";

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

  const articles = await client.fetch<ARTICLES_QUERY_RESULT>(
    `${ARTICLES_QUERY}[0...4]`,
    {},
    { next: { revalidate }, perspective: "published" },
  );

  const categoryTitle = category.title ?? "Namnlös kurskategori";

  const introBlocks = category.introText?.block ?? [];

  const companySection = category.companyCourseSection;

  const companyBlocks = companySection?.text?.block ?? [];

  const lecturerSection = category.courseLecturerSection;

  const courseListSection = category.courseListSection;

  const courseListIntro = courseListSection?.text?.block ?? [];

  const courseAccordions = courseListSection?.accordions ?? [];

  const infoSection = category.courseInfoLongSection;

  const infoSectionText = infoSection?.text?.block ?? [];

  const courseInfoItems = category.courseInfoSection ?? [];

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
          <CustomPortableText value={introBlocks || "introtext saknas"} />
        </Section>

        <section className="bg-surface">
          <div className="section-spacing m-auto max-w-section px-section-sides py-section-tb">
            <p className="font-eyebrow text-muted">Boka kurs</p>

            {companySection?.title?.title && (
              <h2 className="mb-md font-heading text-ink">
                Aktiva kurser
                {companySection.title.title}
              </h2>
            )}

            <CustomPortableText value={companyBlocks || "text saknas"} />
          </div>
        </section>

        <ImageGridSection
          eyebrow="kursledare"
          heading={`${lecturerSection?.lecturer?.firstName} ${lecturerSection?.lecturer?.lastName}`}
          image={{
            asset: lecturerSection?.image?.asset,
            alt: lecturerSection?.image?.alt,
            crop: lecturerSection?.image?.crop,
            hotspot: lecturerSection?.image?.hotspot,
          }}
        >
          <CustomPortableText value={lecturerSection?.text?.block} />
          <div className="flex gap-2 flex-col lg:flex-row">
            <ButtonComp
              href={`/boka-kurs/${categorySlug}`}
              showIcon={false}
              variant="primary"
            >
              Boka kurs i {categoryTitle}
            </ButtonComp>
            <ButtonComp
              href={`/team/${lecturerSection?.lecturer?.slug}`}
              variant="secondary"
            >
              Om kursledaren
            </ButtonComp>
          </div>
        </ImageGridSection>

        <ColumnSection
          largeLeft
          color="bg-surface"
          heading={courseListSection?.title?.title ?? "Kursutbud"}
          eyebrow={courseListSection?.title?.eyebrow?.text ?? "Juridikkurser"}
          description={
            courseListIntro.length > 0 ? (
              <CustomPortableText value={courseListIntro} />
            ) : (
              <></>
            )
          }
        >
          {courseAccordions.length > 0 ? (
            <CardContainer
              noAccordionPadding
              hasAccordion
              accordions={courseAccordions}
              bg="bg-white lg:bg-white/0"
            />
          ) : (
            <p className="font-body text-gray-400">
              Inga kurser har valts i Sanity.
            </p>
          )}
        </ColumnSection>
        {category.imageDivider?.image?.asset && (
          <ImageColorSection
            className="min-h-60"
            image={category.imageDivider.image}
            color="bg-footer"
          />
        )}
        {(infoSection || courseInfoItems.length > 0) && (
          <CourseBlocksSection
            heading={
              infoSection?.title?.title ?? `${categoryTitle} – kursinnehåll`
            }
            eyebrow={infoSection?.title?.eyebrow?.text ?? "Info"}
            description={
              infoSectionText.length > 0 ? (
                <CustomPortableText value={infoSectionText} />
              ) : null
            }
            listTitle={`${categoryTitle} – kursinnehåll`}
            introContent={
              infoSectionText.length > 0 ? (
                <CustomPortableText value={category.excerpt?.block} />
              ) : (
                <CustomPortableText value={category.excerpt?.block} />
              )
            }
            items={courseInfoItems.map((item) => ({
              id: item._key,
              title: item.title ?? "Namnlöst kursmoment",
              content: item.text?.block ? (
                <CustomPortableText key={item._key} value={item.text.block} />
              ) : null,
            }))}
          />
        )}
        <ImageColorSection
          color="bg-footer"
          paperTexture
          image={category.image?.asset?._ref}
          className="bg-canvas w-full"
        >
          <div className="grid my-xl drop-shadow-2xl/20 p-8 grid-cols-[auto_1fr] md:mx-xl justify-start items-start md:w-[55%] max-w-140 gap-4">
            {/* <div className="grid my-xl backdrop-blur-3xl bg-ink/10 backdrop-brightness-90 rounded-4xl outline outline-border/40 drop-shadow-2xl/70 p-8 grid-cols-[auto_1fr] md:mx-xl justify-start items-start md:w-[55%] max-w-140 gap-4"> */}
            <h2 className="col-span-full font-heading text-white">
              Så säger våra kunder
            </h2>
            <Icon
              name="doubleQuotes"
              size={43}
              className="text-white mb-auto"
            />
            <blockquote className="font-sans drop-shadow-2xl/90 text-white mb-auto">
              <p className="text-pretty">
                Utmärkt utbildning med bra kursledare! Känner att jag efter
                kursen har fått en grundläggande förståelse för
                entreprenadjuridiken och framförallt mer kunskap om grundavtalen
                i branchen.
              </p>
            </blockquote>
            <p className="font-sans col-start-2 text-white">
              Sofia,{" "}
              <Link
                className="font-semibold"
                href="/entreprenadjuridik/grundkurs"
              >
                Grundkurs i entreprenadjuridik
              </Link>
            </p>
            <ButtonComp className="col-start-2" href="/boka-kurs/entreprenadjuridik/grundkurs">Boka kursen</ButtonComp>
          </div>
        </ImageColorSection>
        <Section
          heading="Så säger tidigare deltagare om utbildningarna"
          eyebrow="citat"
        >
          <CardScroller>
            {category.courseQuotesSection?.map((item) => (
              <QuoteCard
                key={item._key}
                quote={item.quote ?? ""}
                person={item.person ?? ""}
                course={{
                  name: item.courseLabel ?? item.courseTaken?.courseName ?? "",
                  slug: item.courseTaken?.category?.slug && item.courseTaken.slug
                    ? `/${item.courseTaken.category.slug}/${item.courseTaken.slug}`
                    : undefined,
                }}
              />
            ))}
          </CardScroller>
          <h3 className="font-heading-sm mt-5 text-ink">
            Entreprenadjuridik – vårt utbildningserbjudande
          </h3>
            <CustomPortableText value={category.courseOfferingText?.block} />
          
        </Section>
        <Section color="bg-surface" eyebrow="kontakt" heading="Det är enkelt att registrera dig eller be om mer kursinformation">
          <ButtonComp href="#">Boka kurs</ButtonComp>
        </Section>
        <Section eyebrow="artiklar" heading="Lär dig mer inom entreprenadrätt">
          <ButtonComp href="/artiklar">Se alla artiklar</ButtonComp>
          <CardScroller>
            {articles.map((article) => (
              <div key={article._id} className="shrink-0">
                <ArticleCard
                  title={article.title ?? "Artikel"}
                  lead={article.excerpt}
                  link={`/artiklar/${article.slug}`}
                  image={article.image}
                  writers={article.writers}
                />
              </div>
            ))}
            <ScrollerEndCard />
          </CardScroller>
        </Section>
      </main>
    </>
  );
}
