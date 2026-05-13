import { client } from "@/sanity/client";
// import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { CustomPortableText } from "@/components/CustomPortableText";
import { COURSE_DETAIL_PAGE_QUERY } from "@/sanity/queries";

export default async function CourseDetailPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;

  const course = await client.fetch(COURSE_DETAIL_PAGE_QUERY, { category, slug });

  if (!course) return <main className="p-8">Kursen hittades inte...</main>;

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/juridikkurser" className="hover:underline">Utbildningar</Link>
        <span className="mx-2">/</span>
        <Link href={`/juridikkurser/${category}`} className="hover:underline">
          {course.categoryTitle || "Kategori"}
        </Link>
      </nav>

      {course.lecturer?.image && (
        <div className="relative w-[400px] h-[400px] mb-8 overflow-hidden rounded-2xl">
          <Image 
            src={urlFor(course.lecturer.image).url()} 
            alt={course.lecturer.name || "Föreläsare"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
        <h1 className="text-5xl font-bold mb-4">{course.courseName}</h1>
        <div className="flex items-center gap-4 text-lg text-gray-600">
          <Link href={`/medarbetare/${course.lecturer?.slug?.current || ""}`}>
            <strong>Föreläsare:</strong> {course.lecturer?.name}
          </Link>

          {course.lecturer?.number && (
            <div>
              <p>
                <strong>Telefon:</strong> 
                <a href={`tel:${course.lecturer?.number}`} className="hover:underline">
                  {course.lecturer.number}
                </a>
              </p>
              <p>{course.lecturer.role}</p>
              <p>
                <strong>Telefon:</strong> 
                <a href={`tel:${course.lecturer?.email}`} className="hover:underline">
                  {course.lecturer.email}
                </a>
              </p>
            </div>
          )}
        </div>

      <section className="prose prose-lg max-w-none border-t pt-8">
        <h3>{course.courseName}</h3>
        {course.aimCourse ? (
          <div>
            <CustomPortableText value={course.aimCourse} />
          </div>
        ) : (
          <p className="italic text-gray-500">Kursbeskrivning saknas.</p>
        )}
      </section>
      <section className="prose prose-lg max-w-none border-t pt-8">
        <h3>Om Utbildningen</h3>
        {course.aboutCourse ? (
          <div>
            <CustomPortableText value={course.aboutCourse} />
          </div>
        ) : (
          <p className="italic text-gray-500">Kursbeskrivning saknas.</p>
        )}
      </section>
      <div className="space-y-10">
        {course.courseSections?.map((section, index: number) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.sectionTitle}</h2>
    
            <CustomPortableText value={section.sectionText} />
          </div>
        ))}
      </div>

      <footer className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4">Vill du boka denna kurs?</h2>
        <p className="mb-6 text-gray-700">Kontakta oss för prisförslag och bokning av {course.courseName}.</p>
        <a 
          href={`mailto:info@wa-advokat.se?subject=Bokningsförfrågan: ${course.courseName}`}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          Skicka bokningsförfrågan
        </a>
      </footer>
    </main>
  );
}
