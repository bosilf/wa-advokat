import {client} from "@/sanity/client"
import HeroRegular from "@/components/heros/HeroRegular"
import { COURSE_PAGE_QUERY } from "@/sanity/queries"
import { COURSE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types"
import EmployeeCard from "@/components/cards/EmployeeCard";
import Button from "@/components/buttons/Button";
import Section from "@/components/sections/Section"
import {CustomPortableText} from "@/components/common/CustomPortableText"
import Image  from 'next/image'
import ImageComponent from "@/components/common/Image";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export const revalidate = 30;

export default async function CoursePage({
  params
}: PageProps) {
  const {courseSlug} = await params;

  const course = 
  await client.fetch<COURSE_PAGE_QUERY_RESULT>(
    COURSE_PAGE_QUERY,
    {courseSlug},
    {
      next: {
        revalidate
      }
    }
  )
  const lecturer = course?.lecturer
  const introtext = course?.intro ?? []

  const lecturerImg = lecturer?.image || null
  const categoryCourseList = course?.category?.courseListSection?.courseList ?? []


  return (
    <>
      <HeroRegular 
        title={course?.courseName || 'Kursnamn saknas'} 
        eyebrow={`kurser i ${course?.category?.title}`}
        image={course?.lecturer?.image}
      />
      <aside className="bg-white sticky top-0 h-screen py-section-tb px-md left-0 w-70 flex flex-col gap-xl">
        <div className="flex flex-col gap-md">
        <h3 className="font-subheading text-ink">Kursutbud {course?.category?.title}</h3>
        <ul className="flex flex-col gap-sm">
          {categoryCourseList && categoryCourseList.map((courseItem, index) => (
            <li key={index}><Link className="font-caption lowercase text-ink hover:underline" href={courseItem?.slug || "#"}>{courseItem?.courseName || 'Kursnamn saknas'}</Link></li>
          ))}
        </ul>
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-heading-sm text-ink">Kursledare</h3>
          <div className="aspect-square h-fit w-full overflow-hidden rounded-md">
          <ImageComponent image={lecturerImg} />
          </div>
          <h4 className="font-subheading">{lecturer?.firstName} {lecturer?.lastName}</h4>
          <Button href={lecturer?.lastName || '#'} variant="primary" showIcon={false} >Kontakta {lecturer?.firstName}</Button>

        </div>
      </aside>
      <Section 
        color="bg-canvas" 
        heading={course?.courseName || 'Kursnamn saknas'}
        eyebrowCrumbs={[
          { href: '/', label: 'Hem' },
          { href: '/juridikkurser', label: 'juridikkurser' },
          { href: `/juridikkurser/${course?.category?.slug}` || '#', label: course?.category?.title || 'Kategori saknas' },
        ]}
      >
        <CustomPortableText value={introtext || 'text saknas'} />
        <h3 className="font-heading text-ink">Om utbildningen</h3>
        <CustomPortableText value={course?.aboutCourse} />
      </Section>
      <section className="section-spacing bg-surface">
        <div className="rounded-r-2xl flex-1 h-fit w-fit aspect-square overflow-hidden bg-accent">
          <ImageComponent image={lecturerImg} />
        </div>
      </section>
      <Section 
        color="bg-surface" 
        heading="Förutsättningar">
        <CustomPortableText value={course?.aimCourse} />
        </Section>
        <Section heading="innehåll i utbildningen">
        <CustomPortableText value={course?.courseSections} />
        </Section>
    </>
  )
}