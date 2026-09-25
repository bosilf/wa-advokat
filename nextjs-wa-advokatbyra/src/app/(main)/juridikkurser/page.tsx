import { notFound } from "next/navigation";

import HeroRegular from "@/components/heros/HeroRegular";
import Section from "@/components/sections/Section";
import { CustomPortableText } from "@/components/common/CustomPortableText";

import { client } from "@/sanity/client";
import { COURSE_MAIN_PAGE_QUERY } from "@/sanity/queries";
import { COURSE_MAIN_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";
import CardContainer from "@/components/cards/CardContainer";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import ButtonComp from "@/components/buttons/Button";
import ImageGridSection from "@/components/sections/ImageGridSection";
import ImageGridSectionRight from "@/components/sections/ImageGridSectionRight";


export const revalidate = 30;

export default async function CoursePage() {
  const page =
  await client.fetch<COURSE_MAIN_PAGE_QUERY_RESULT>(
    COURSE_MAIN_PAGE_QUERY,
    {},
    {
      next: {
        revalidate,
      },
    },
  );

if (!page) {
  notFound();
}
  return (
    <>
      <HeroRegular
        eyebrow={page.eyebrow}
        title={page.title}
        image={page.image}
      />

      <main>
        <div className="z-10 m-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
          <section className="flex px-section-sides m-auto py-section-tb max-w-200 lg:max-w-full">
            <div className="lg:max-w-120 section-spacing">
              <div className="flex gap-sm">
                <Link className="font-eyebrow text-muted hover:text-ink hover:underline" href="/">hem</Link>
                <p className="font-eyebrow text-muted">/</p>
                <p className="font-eyebrow text-accent cursor-default">{page.introSection?.eyebrow?.text || 'text saknas'}</p>
              </div>
              <h2 className="mb-md font-heading text-ink">{page.introSection?.title || 'text saknas'}</h2>
              <CustomPortableText value={ page.introSection?.text?.block || 'text saknas' } />
            </div>
          </section>
          <section className="col-span-full hidden lg:block lg:order-3 lg:col-span-2 lg:grid-cols-2">

          {page.cardContainers?.map((category, index) => {
            const chosenCategory = category.chosenCourseCategory;

            const links = (
              category.links ?? []
            ).flatMap((link) => {
              if (!link.href) {
                return [];
              }
        
              return [
                {
                  _id: link._id,
                  title:
                    link.title ??
                    "Namnlös kurs",
                  href: link.href,
                },
              ];
            });
            
            if (!chosenCategory?.image) {
              return null;
            }
            
            return (
              <ImageGridSection
              color="bg-surface"
              key={category._key}
              image={chosenCategory.image}
              imagePosition={index % 2 === 0 ? "left" : "right"}
              heading={chosenCategory.title ?? ""}
              eyebrow="Kursutbud"
              >
                <CustomPortableText
                  value={category.description?.block}
                />
                <ButtonComp href={`/juridikkurser/${category.chosenCourseCategory?.slug?.current}`}>{category.chosenCourseCategory?.title} kursutbud</ButtonComp>
              </ImageGridSection>
            );
          })}
          </section>
          <section className="grid grid-cols-1 gap-lg bg-surface p-section-sides py-section lg:hidden">
            {page.cardContainers?.map((category) => {
              const chosenCategory =
                category.chosenCourseCategory;
            
              const expert =
                chosenCategory?.courseLecturerSection
                  ?.lecturer;
            
              const categoryTitle =
                chosenCategory?.title ??
                "Namnlös kurskategori";
            
              const categoryDescription =
                category.description?.block ?? [];
            
              const categoryImageSrc =
                chosenCategory?.image
                  ? urlFor(chosenCategory.image)
                      .width(1200)
                      .height(650)
                      .fit("crop")
                      .url()
                  : "";
            
              const lecturerName = [
                expert?.firstName,
                expert?.lastName,
              ]
                .filter(Boolean)
                .join(" ");
            
              const lecturerRole =
                expert?.roles
                  ?.map((role) => role.title)
                  .filter(Boolean)
                  .join(" | ") ||
                expert?.professionalTitle ||
                "";
            
              const lecturerImageSrc =
                expert?.image
                  ? urlFor(expert.image)
                      .width(200)
                      .height(200)
                      .fit("crop")
                      .url()
                  : "";
            
              const links = (
                category.links ?? []
              ).flatMap((link) => {
                if (!link.href) {
                  return [];
                }
              
                return [
                  {
                    _id: link._id,
                    title:
                      link.title ??
                      "Namnlös kurs",
                    href: link.href,
                  },
                ];
              });
            
              return (
                <CardContainer
                  key={category._key}
                  hasImage={Boolean(categoryImageSrc)}
                  image={{
                    src: categoryImageSrc,
                    eyebrow: "Kursutbud i",
                    title: categoryTitle,
                  }}
                  hasCardSmall={Boolean(expert)}
                  employee={
                    expert
                      ? {
                          name:
                            lecturerName ||
                            "Ingen kursledare vald",
                      
                          role: lecturerRole,
                      
                          imageSrc:
                            lecturerImageSrc,
                      
                          slug:
                            expert.slug?.current
                              ? `/medarbetare/${expert.slug.current}`
                              : undefined,
                        }
                      : undefined
                  }
                  hasDescription={categoryDescription.length > 0}
                  description={categoryDescription}
                  hasButton
                  button={{href: `juridikkurser/${category.chosenCourseCategory?.slug?.current}` || "#", children: `Till kurssidan ${category.chosenCourseCategory?.title}`, variant: 'simple' }}
                  links={links}
                />
              );
            })}
          </section>
          <section className="lg:bg-white bg-surface flex lg:order-2">
            <div className="max-w-200 m-auto lg:max-w-90 section-spacing pb-section-tb pt-md lg:pt-section-tb px-section-sides">
              <h3 className="font-heading-sm mb-md text-ink">{page.courseOpportunities?.title}</h3>
              {page.courseOpportunities?.textContent?.block && (
                <CustomPortableText
                value={
                  page.courseOpportunities.textContent.block
                }
                />
              )}
              <Button variant="primary" href="/boka-burs" showIcon={false} >Önska datum</Button>
            </div>
            <div className=" bg-white hidden lg:block flex-1"/>
          </section>
          </div>
          <Section eyebrow={page.courseInfo?.infoEyebrow?.text || ""}  heading={page.courseInfo?.info?.title || ""} color="bg-canvas">
            <CustomPortableText value={page.courseInfo?.infoBody?.block} />
              <div className="pt-lg">
                <p className="font-eyebrow text-muted">{page.courseCategoryBlock?.infoEyebrow?.text}</p>
                <h2 className="font-heading text-ink mb-md">{page.courseCategoryBlock?.info?.title}</h2>
                <CustomPortableText value={page.courseCategoryBlock?.infoBody?.block} />
              </div>
          </Section>
      </main>
    </>
  );
}