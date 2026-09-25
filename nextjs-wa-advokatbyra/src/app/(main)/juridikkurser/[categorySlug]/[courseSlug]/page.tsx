import {client} from "@/sanity/client"
import type {Metadata} from "next";
import {cache} from "react";
import { COURSE_PAGE_QUERY } from "@/sanity/queries"
import { COURSE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types"
import {CustomPortableText} from "@/components/common/CustomPortableText"
import ImageComponent from "@/components/common/Image";
import Link from "next/link";
import CourseSection from "@/components/sections/CourseSection";
import AsideCourse from "@/components/asides/AsideCourse"
import ButtonComp from "@/components/buttons/Button"
import CourseMessage from "@/components/messages/CourseMessage"
import HeroCourse from "@/components/heros/HeroCourse"

type PageProps = {
  params: Promise<{
    categorySlug: string;
    courseSlug: string;
  }>;
};

export const revalidate = 30;

const getCourse = cache(
  async (categorySlug: string, courseSlug: string) => {
    return client.fetch<COURSE_PAGE_QUERY_RESULT>(
      COURSE_PAGE_QUERY,
      {
        categorySlug,
        courseSlug,
      },
      {
        next: {
          revalidate,
        },
      },
    );
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {categorySlug, courseSlug} = await params;

  const course = await getCourse(categorySlug, courseSlug);

  if (!course) {
    return {
      title: "Kursen kunde inte hittas | WA Advokatbyrå",
      description: "Den efterfrågade kursen kunde inte hittas.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    course.seo?.metaTitle ||
    `${course.courseName || "Juridikkurs"} | WA Advokatbyrå`;

  const description =
    course.seo?.metaDescription ||
    `Läs mer om ${course.courseName || "WA Advokatbyrås juridikkurs"}, kursens innehåll och förutsättningar.`;

  return {
    title: {
      absolute: title,
    },
    description,

    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function CoursePage({
  params
}: PageProps) {
  const {categorySlug, courseSlug} = await params;

  const course = await getCourse(categorySlug, courseSlug);



  const lecturer = course?.lecturer
  const roles = lecturer?.roles 
    ?.filter((role): role is string => Boolean(role))
    .join(' | ') ?? ("");

  const introtext = course?.intro ?? []

  const lecturerImg = lecturer?.image || null
  const categoryCourseList = course?.category?.courseListSection?.courseList ?? []

  const fullName = `${lecturer?.firstName || ''} ${lecturer?.lastName || ''}`.trim() 

  const courseSections = course?.courseSections ?? []


  return (
    <>
      <HeroCourse 
        title={course?.courseName || 'Kursnamn saknas'} 
        eyebrow={`kurser i ${course?.category?.title}`}
        image={course?.lecturer?.image}
      />
      <div className="grid lg:grid-cols-[1fr_4fr]">
        <div className="hidden lg:block">
      <AsideCourse
        teamCard={{
          link: `/om-oss/${lecturer?.slug}`,
          image: lecturerImg,
          caption: roles,
          name: fullName,
        }}
        link={`/juridikkurser/${course?.category?.slug}` || "#"}
        courseName={course?.courseName ?? ""}
        categoryName={course?.category?.title ?? ""}
        length={course?.length ?? ""}
        date="Som passar dig."
        cost="Enligt överenskommelse."
        />
      </div>
      
      <main>
      <CourseSection 
        color="bg-canvas" 
        heading={course?.courseName || 'Kursnamn saknas'}
        eyebrowCrumbs={[
          { href: '/', label: 'Hem' },
          { href: '/juridikkurser', label: 'juridikkurser' },
          { href: `/juridikkurser/${course?.category?.slug}` || '#', label: course?.category?.title || 'Kategori saknas' },
        ]}
      >
        {/* <CustomPortableText value={introtext || 'text saknas'} /> */}
        {/* <h3 className="font-heading text-ink mt-md">Om utbildningen</h3> */}
        <CustomPortableText value={course?.aboutCourse} />
      </CourseSection>
      <div className="block lg:hidden">
      <AsideCourse
      bg="bg-canvas"
        teamCard={{
          link: `/om-oss/${lecturer?.slug}`,
          image: lecturerImg,
          caption: roles,
          name: fullName,
        }}
        link={`/juridikkurser/${course?.category?.slug}` || "#"}
        courseName={course?.courseName ?? ""}
        categoryName={course?.category?.title ?? ""}
        length={course?.length ?? ""}
        date="Som passar dig."
        cost="Enligt överenskommelse."
        />
      </div>
      <CourseSection 
        color="bg-surface" 
        heading="Förutsättningar"
      >
        <CustomPortableText value={course?.aimCourse} />
      </CourseSection>
      <CourseSection  heading="Innehåll i utbildningen">
        {courseSections.map((section) => {
          if (section._type === "courseTextSection") {
            return (
              <section key={section._key}>
                {section.sectionTitle && (
                  <h2>{section.sectionTitle}</h2>
                )}
                {section.sectionContent && (
                  <CustomPortableText value={section.sectionContent} />
                )}
              </section>
            );
          }
        
          if (section._type === "image" && section.asset) {
            return (
              <ImageComponent key={section._key} image={{
                asset: section.asset, 
                crop: section.crop, 
                hotspot: section.hotspot, 
                alt: section.alt
              }} />
            );
          }
          return null;
        })}
      </CourseSection>
      <div id="bokning" className="scroll">
        <CourseMessage name={course?.courseName || 'kurs'}email=""></CourseMessage>
      </div>
      </main>
      </div>
    </>
  )
}