import CardScroller from "@/components/sections/CardScroller";
import PlainQuoteMarquee from "@/components/sections/PlainQuoteMarquee";
import CourseCardList from "@/components/sections/CourseCardList";
import { client } from "@/sanity/client";
import { ARTICLES_QUERY, COURSE_CATEGORY_PAGE_QUERY } from "@/sanity/queries";
import ContentPage from "@/components/pages/ContentPage";

import type {
  ARTICLES_QUERY_RESULT,
  COURSE_CATEGORY_PAGE_QUERY_RESULT,
} from "@/sanity/sanity.types";

import { CustomPortableText } from "@/components/common/CustomPortableText";
import CourseCard from "@/components/cards/CourseCard";
import Section from "@/components/sections/Section";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ButtonComp from "@/components/buttons/Button";
import HeroCta from "@/components/heroes/HeroCta";
import CourseBlocksSection from "@/components/sections/CourseBlocksSection";
import ImageColorSection from "@/components/sections/ImageColorSection";
import Icon from "@/components/Icon";
import Link from "next/link";
import QuoteCard from "@/components/cards/QuoteCard";
import ArticleCard from "@/components/cards/ArticleCard";
import ScrollerEndCard from "@/components/cards/ScrollerEndCard";
import CourseCardNotUpcoming from "@/components/cards/CourseCardNotUpcoming";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export const revalidate = 30;

export default async function CourseCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const category = await client.fetch<COURSE_CATEGORY_PAGE_QUERY_RESULT>(
    COURSE_CATEGORY_PAGE_QUERY,
    { categorySlug, today },
    { next: { revalidate } },
  );

  if (!category) return <ContentPage path={categorySlug} />;

  const articles = await client.fetch<ARTICLES_QUERY_RESULT>(
    `${ARTICLES_QUERY}[0...3]`,
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

  const categoryCourses = [...(category.categoryCourses ?? [])].sort((a, b) => {
    const aDate = a.upcoming?.dates?.[0] ?? "9999-12-31";
    const bDate = b.upcoming?.dates?.[0] ?? "9999-12-31";
    return (
      aDate.localeCompare(bDate) ||
      (a.title ?? "").localeCompare(b.title ?? "", "sv")
    );
  });

  const activeCourses = categoryCourses.filter((course) => course.upcoming);

  const infoSection = category.courseInfoLongSection;

  const infoSectionText = infoSection?.text?.block ?? [];

  const courseInfoItems = category.courseInfoSection ?? [];

  return (
    <div className="relative">
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

        <section className="bg-surface relative z-15">
          <div className="section-spacing m-auto max-w-section px-section-sides py-section-tb">
            <div className="flex flex-col gap-xl">
              {activeCourses.length > 0 && (
                <div className="flex flex-col gap-md">
                  <p className="font-eyebrow text-muted">Boka kurs</p>
                  <h2 className="font-heading text-ink">Kommande kurser</h2>
                  {activeCourses.map((course) => (
                    <CourseCard
                      key={course._key}
                      name={course.title ?? "Namnlös kurs"}
                      description={course.description}
                      length={course.length}
                      slug={course.slug}
                      categorySlug={course.categorySlug}
                      categoryTitle={course.categoryTitle}
                      dates={course.upcoming?.dates}
                      location={course.upcoming?.location}
                      cost={course.upcoming?.cost}
                      type={course.upcoming?.type}
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-md">
                {companySection?.title?.title && (
                  <h3 className="mb-md font-heading text-ink">
                    {companySection.title.title}
                  </h3>
                )}

                <CustomPortableText value={companyBlocks || "text saknas"} />
                <ButtonComp href="/boka-kurs">Önska datum</ButtonComp>
              </div>
            </div>
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

        <Section
          color="bg-surface"
          heading={courseListSection?.title?.title ?? "Kursutbud"}
          eyebrow={courseListSection?.title?.eyebrow?.text ?? "Juridikkurser"}
        >
          {courseListIntro.length > 0 && (
            <CustomPortableText value={courseListIntro} />
          )}
          {categoryCourses.length > 0 ? (
            <CourseCardList>
              {categoryCourses.map((course) =>
                course.upcoming ? (
                  <CourseCard
                    key={course._key}
                    name={course.title ?? "Namnlös kurs"}
                    description={course.description}
                    length={course.length}
                    slug={course.slug}
                    categorySlug={course.categorySlug}
                    categoryTitle={course.categoryTitle}
                    dates={course.upcoming?.dates}
                    location={course.upcoming?.location}
                    cost={course.upcoming?.cost}
                    type={course.upcoming?.type}
                    bookingLabel={course.upcoming ? "Boka kurs" : "Önska datum"}
                  />
                ) : (
                  <CourseCardNotUpcoming
                    key={course._key}
                    name={course.title ?? "Namnlös kurs"}
                    description={course.description}
                    length={course.length}
                    slug={course.slug}
                    categorySlug={course.categorySlug}
                    categoryTitle={course.categoryTitle}
                    bookingLabel={course.upcoming ? "Boka kurs" : "Önska datum"}
                  />
                ),
              )}
            </CourseCardList>
          ) : (
            <p className="font-body text-gray-400">
              Inga kurser har publicerats i denna kategori ännu.
            </p>
          )}
        </Section>
        {category.imageDivider?.image?.asset && (
          <ImageColorSection
            className="min-h-100"
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
            <ButtonComp
              className="col-start-2"
              href="/boka-kurs/entreprenadjuridik/grundkurs"
            >
              Boka kursen
            </ButtonComp>
          </div>
        </ImageColorSection>
        <Section
          heading="Så säger tidigare deltagare om utbildningarna"
          eyebrow="citat"
        >
          <PlainQuoteMarquee>
            {category.courseQuotesSection?.map((item) => (
              <QuoteCard
                key={item._key}
                quote={item.quote ?? ""}
                person={item.person ?? ""}
                course={{
                  name: item.courseLabel ?? item.courseTaken?.courseName ?? "",
                  slug:
                    item.courseTaken?.category?.slug && item.courseTaken.slug
                      ? `/${item.courseTaken.category.slug}/${item.courseTaken.slug}`
                      : undefined,
                }}
              />
            ))}
          </PlainQuoteMarquee>
          <h3 className="font-heading-sm mt-5 text-ink">
            Entreprenadjuridik – vårt utbildningserbjudande
          </h3>
          <CustomPortableText value={category.courseOfferingText?.block} />
        </Section>
        <Section
          color="bg-footer text-white shadow-inline-2xl/70"
          textColor="text-white"
          paperTexture
          zIndex={5}
          eyebrow="kontakt"
          heading="Det är enkelt att registrera dig eller be om mer kursinformation"
        >
          <ButtonComp href="/boka-kurs">Boka kurs</ButtonComp>
        </Section>
        <Section eyebrow="artiklar" heading="Lär dig mer inom entreprenadrätt">
          <div className="min-w-0 lg:w-[calc(100vw-2*var(--spacing-section-sides))] lg:self-center">
            <CardScroller expanded>
              {articles.map((article) => (
                <div key={article._id} className="shrink-0 lg:min-w-0">
                  <ArticleCard
                    title={article.title ?? "Artikel"}
                    lead={article.excerpt}
                    link={`/artiklar/${article.slug}`}
                    image={article.image}
                    writers={article.writers}
                  />
                </div>
              ))}
              <div className="shrink-0 lg:hidden">
                <ScrollerEndCard />
              </div>
            </CardScroller>
          </div>
          <ButtonComp
            variant="primary"
            showIcon={false}
            className="self-center"
            href="/artiklar"
          >
            Se alla artiklar
          </ButtonComp>
        </Section>
      </main>
    </div>
  );
}
