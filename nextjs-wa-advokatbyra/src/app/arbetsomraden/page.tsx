import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image"; 
import Image from "next/image";
import Link from "next/link";
import { WORK_PAGE_QUERY } from "@/sanity/queries";
import { CustomPortableText } from "@/components/CustomPortableText";


export default async function WorkPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;

  const course = await client.fetch(WORK_PAGE_QUERY, { category, slug });

  if (!course) return <main className="p-8">Kursen hittades inte...</main>;

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/juridikkurser" className="hover:underline">Utbildningar</Link>
        <span className="mx-2">/</span>
        <Link href={`/juridikkurser/${category}`} className="hover:underline">{course.categoryTitle}</Link>
      </nav>

      {/* Kursbild */}
      {course.image && (
        <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-2xl">
          <Image 
            src={urlFor(course.image).width(1200).url()} 
            alt={course.courseName || "Kursnamn"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{course.courseName}</h1>
        <div className="flex items-center gap-4 text-lg text-gray-600">
        <Link href={`/medarbetare/${course.lecturer?.slug}`} ><strong>Föreläsare:</strong> {course.lecturer?.name}</Link>
  
        {course.lecturer?.number && (
          <p>
            <strong>Telefon:</strong> 
            <a href={`tel:${course.lecturer.number}`} className="hover:underline">
              {course.lecturer.number}
            </a>
          </p>
        )}
        {course.lecturer?.email && (
          <p>
            <strong>Telefon:</strong> 
            <a href={`tel:${course.lecturer.email}`} className="hover:underline">
              {course.lecturer.email}
            </a>
          </p>
        )}
        </div>
      </header>

      <section className="prose prose-lg max-w-none border-t pt-8">
        {course.content ? (
          <CustomPortableText value={course.content} />
        ) : (
          <p className="italic text-gray-500">Kursbeskrivning saknas.</p>
        )}
      </section>

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
