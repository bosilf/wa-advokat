import Link from "next/link";
import { client } from "@/sanity/client";
import { ALL_COURSES_QUERY } from "@/sanity/queries";

export default async function ArbetsomradenPage() {
  const courses = await client.fetch(ALL_COURSES_QUERY);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Våra Arbetsområden & Kurser</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <Link 
              key={course._id} 
              href={`/juridikkurser/omrade/${course.slug || ""}`}
              className="p-6 border rounded-xl hover:border-blue-500 hover:shadow-md transition-all bg-white block"
            >
              <h2 className="text-2xl font-bold mb-2">{course.courseName}</h2>
              {course.categoryTitle && (
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {course.categoryTitle}
                </span>
              )}
              {course.lecturer?.name && (
                <p className="text-sm text-gray-500 mt-4">
                  Föreläsare: {course.lecturer.name}
                </p>
              )}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 italic">Inga arbetsområden hittades.</p>
        )}
      </div>
    </main>
  );
}
