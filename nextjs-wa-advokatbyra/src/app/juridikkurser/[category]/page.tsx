import Link from "next/link";
import { client } from "@/sanity/client";
import { COURSE_BY_CATEGORY_QUERY } from "@/sanity/queries";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;



  const data = await client.fetch(COURSE_BY_CATEGORY_QUERY, { category });

  if (!data) return <main className="p-8 text-white">Kategorin hittades inte.</main>;

  return (
    <main className="container mx-auto p-8 text-white">
      <Link href="/juridikkurser" className="text-blue-400 hover:underline mb-8 block">
        ← Tillbaka till alla utbildningar
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-400 max-w-xl">{data.description}</p>
        </div>

        <div className="w-full md:w-1/3">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Kurser inom {data.title}:
          </p>
          <div className="flex flex-wrap gap-3">
            {data.courses && data.courses.length > 0 ? (
              data.courses.map((course) => (
                <Link
                  key={course._id}
                  href={`/juridikkurser/${category}/${course.slug || ""}`}
                  className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors"
                >
                  {course.courseName}
                </Link>
              ))
            ) : (
              <p className="text-gray-500 italic">Inga kurser publicerade ännu.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
