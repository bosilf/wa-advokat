import ContentPage from "@/components/pages/ContentPage";
import {client} from "@/sanity/client"
import type {Metadata} from "next";
import {cache, type ReactNode} from "react";
import { COURSE_PAGE_QUERY, PAGE_BY_PATH_QUERY } from "@/sanity/queries"
import { COURSE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types"
import {CustomPortableText} from "@/components/common/CustomPortableText"
import ImageComponent from "@/components/common/Image";
import CourseSection from "@/components/sections/CourseSection";
import CourseBlocksSection, {type CourseBlockItem} from "@/components/sections/CourseBlocksSection";
import {splitCourseMoments} from "@/lib/splitCourseMoments";
import AsideCourse from "@/components/asides/AsideCourse"
import CourseMessage from "@/components/messages/CourseMessage"
import HeroCourse from "@/components/heroes/HeroCourse"
import AsideLarge from "@/components/asides/AsideLarge";
import AsideIntroSection from "@/components/sections/AsideIntroSection";

type PageProps = {
  params: Promise<{ categorySlug: string; courseSlug: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, courseSlug } = await params;
  const course = await getCourse(categorySlug, courseSlug);
  if (!course) {
    const page = await client.fetch(
      PAGE_BY_PATH_QUERY,
      { path: `${categorySlug}/${courseSlug}` },
      { next: { revalidate } },
    );
    if (page) return {};
  }
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

export default async function CoursePage({ params }: PageProps) {
  const { categorySlug, courseSlug } = await params;
  const course = await getCourse(categorySlug, courseSlug);
  if (!course) return <ContentPage path={`${categorySlug}/${courseSlug}`} />;

  const lecturer = course?.lecturer
  const roles = lecturer?.roles 
    ?.filter((role): role is string => Boolean(role))
    .join(' | ') ?? ("");


  const lecturerImg = lecturer?.image || null

  const fullName = `${lecturer?.firstName || ''} ${lecturer?.lastName || ''}`.trim() 

  const courseSections = course?.courseSections ?? []
  const courseItems: CourseBlockItem[] = [];
  const introExtras: ReactNode[] = [];

  for (const section of courseSections) {
    if (section._type === "courseTextSection") {
      const {intro, moments} = splitCourseMoments(section.sectionContent ?? []);
      if (moments.length > 0) {
        if (intro.length > 0) {
          introExtras.push(<CustomPortableText key={section._key} value={intro} />);
        }
        courseItems.push(...moments.map(moment => ({
          id: `${section._key}-${moment.id}`,
          title: moment.title,
          content: <CustomPortableText value={moment.blocks} />,
        })));
      } else {
        courseItems.push({
          id: section._key,
          title: section.sectionTitle || "Namnlöst kursmoment",
          content: <CustomPortableText value={section.sectionContent} />,
        });
      }
    } else if (section._type === "image" && section.asset) {
      const image = <ImageComponent key={section._key} image={{asset: section.asset, crop: section.crop, hotspot: section.hotspot, alt: section.alt}} />;
      const previousItem = courseItems[courseItems.length - 1];
      if (previousItem) {
        previousItem.content = <>{previousItem.content}{image}</>;
      } else {
        introExtras.push(image);
      }
    }
  }


  return (
    <>
      <HeroCourse 
        title={course?.courseName || 'Kursnamn saknas'} 
        eyebrow={`kurser i ${course?.category?.title}`}
        image={course?.lecturer?.image}
      />
      <div className="grid lg:grid-cols-[2fr_5fr]">
        <div className="hidden lg:block">
          <AsideCourse
            teamCard={{
              link: `/team/${lecturer?.slug}`,
              image: lecturerImg,
              caption: roles,
              name: fullName,
            }}
            link={`/${course?.category?.slug}` || "#"}
            courseName={course?.courseName ?? ""}
            categoryName={course?.category?.title ?? ""}
            length={course?.length ?? ""}
            date="Som passar dig."
            cost="Enligt överenskommelse."
            />
          </div>
      <main>
        <div className="hidden lg:block">
          <CourseSection 
            color="bg-canvas" 
            heading={course?.courseName || 'Kursnamn saknas'}
            eyebrowCrumbs={[
              { href: '/', label: 'Hem' },
              { href: '/juridikkurser', label: 'juridikkurser' },
              { href: `/${course?.category?.slug}` || '#', label: course?.category?.title || 'Kategori saknas' },
            ]}
            >
            <CustomPortableText value={course?.intro} />
          </CourseSection>
        </div>
        <AsideIntroSection color="bg-canvas">
          <AsideLarge
            bg="bg-canvas"
            teamCard={{
              link: `/team/${lecturer?.slug}`,
              image: lecturerImg,
              caption: roles,
              name: fullName,
            }}
            link={`/${course?.category?.slug}` || "#"}
            courseName={course?.courseName ?? ""}
            categoryName={course?.category?.title ?? ""}
            length={course?.length ?? ""}
            date="Som passar dig."
            cost="Enligt överenskommelse llll."
            />
            <p className="font-eyebrow text-muted">Introduktion</p>
            <h3 className="font-heading text-ink">{course?.courseName}</h3>
          <CustomPortableText value={course?.aboutCourse} />
        </AsideIntroSection>
      <CourseSection 
        color="bg-surface" 
        heading="Förutsättningar"
      >
        <CustomPortableText value={course?.aimCourse} />
      </CourseSection>
      {courseSections.length > 0 && (
        <CourseBlocksSection
          heading="Innehåll i utbildningen"
          eyebrow={course.courseName ?? "Kursinnehåll"}
          description={null}
          listTitle={`${course.courseName ?? "Utbildningen"} – kursinnehåll`}
          introContent={
            <>
              <CustomPortableText value={course.aboutCourse} />
              {introExtras}
            </>
          }
          items={courseItems}
        />
      )}
      <div id="bokning" className="scroll">
        <CourseMessage name={course?.courseName || 'kurs'}email=""></CourseMessage>
      </div>
      </main>
      </div>
    </>
  )
}
