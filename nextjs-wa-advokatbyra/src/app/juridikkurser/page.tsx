import Link from "next/link";
import { client } from "@/sanity/client";
import PageHeader from "@/components/PageHeader";
import { COURSE_CATEGORIES_QUERY } from "@/sanity/queries";

export default async function CoursesPage() {
//   const categories = await client.fetch<any[]>(`
//     *[_type == "courseCategory"]{
//       _id,
//       title,
//       "slug": slug.current
//     } | order(title asc)
//   `);
const categories = await client.fetch(COURSE_CATEGORIES_QUERY);
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Utbildningsområden</h1>
      <PageHeader pageName="juridikkurser" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link 
            key={category._id} 
            href={`/juridikkurser/${category.slug}`}
            className="group p-12 border-2 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center text-center shadow-sm"
          >
            <h2 className="text-2xl font-bold group-hover:scale-105 transition-transform">
              {category.title}
            </h2>
            <span className="text-blue-600 mt-4 font-medium italic">
              Visa kurser inom {(category.title || "område").toLowerCase()} →
            </span>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center p-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">Inga utbildningskategorier hittades i Sanity Studio.</p>
        </div>
      )}
    </main>
  );
}
