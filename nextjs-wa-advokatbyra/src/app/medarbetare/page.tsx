import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import RoleFilter  from "@/components/RoleFilter";
import PageHeader from "@/components/PageHeader";

const EMPLOYEES_QUERY = `
  *[_type == "employee" && defined(slug.current)]
  | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    image,
    "roles": roles[]->{ title, "slug": slug.current }
  }
`

export default async function MedarbetarePage() {
  // Hämta datan från Sanity
  const employees = await client.fetch<SanityDocument[]>(EMPLOYEES_QUERY);

  return (
    <div className="min-h-screen container flex flex-col mx-auto p-8">
      <PageHeader pageName="medarbetare" />
      <RoleFilter />
      
      {/* Vi skapar ett rutnät (grid) för att visa medarbetarna */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Link 
            key={employee._id} 
            href={`/medarbetare/${employee.slug}`}
            className="group block border p-6 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            {employee.image && (
              <Image
                src={urlFor(employee.image).url()}
                alt={employee.name || "Medarbetare"}
                width={600}
                height={600}
                className="rounded-lg mb-4 object-cover"
              />
            )}
            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
              {employee.name}
            </h2>
            <p className="text-gray-600 mt-2 capitalize">
            <div className="flex flex-row gap-2 w-full text-sm font-medium">
              {employee.roles?.map((role: any, index: number) => (
                <Link  
                  href={`/medarbetare/yrkesroll/${role.slug}`}
                  key={index}
                  className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"

                  // className="transition duration-2 hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"
                >
                  {role.title}
                </Link>
              ))}
            </div>
            </p>
            <span className="text-blue-500 mt-4 inline-block font-medium">
              Läs mer →
            </span>
          </Link>
        ))}
      </div>

      {employees.length === 0 && (
        <p className="text-gray-500">Inga medarbetare hittades.</p>
      )}
    </div>
  );
}
