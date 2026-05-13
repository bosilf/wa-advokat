import Link from "next/link";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import RoleFilter from "@/components/RoleFilter";
import { EMPLOYEE_ROLE_QUERY } from "@/sanity/queries";



export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  const data = await client.fetch(EMPLOYEE_ROLE_QUERY, { role });

  return (
    <main className="container mx-auto p-8">
      <RoleFilter />
      <h1 className="text-4xl capitalize font-bold mb-8">
        Våra Medarbetare / {data.role?.title || "Hittade inte rollen"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.employees.map((employee) => (
          <Link
            key={employee._id}
            href={`/medarbetare/${employee.slug}`}
            className="group block border p-6 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            {employee.image && (
              <Image
                src={urlFor(employee.image).width(600).url()}
                alt={employee.name || "Bild Medarabetare"}
                width={600}
                height={400}
                className="rounded-lg mb-4 object-cover"
              />
            )}

            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
              {employee.name}
            </h2>

            <div className="flex flex-row gap-2 w-full text-sm font-medium">
              {employee.roles?.map((role, index: number) => (
                <Link  
                  href={`/medarbetare/yrkesroll/${role.slug}`}
                  key={index}
                  className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] place-self-end capitalize hover:bg-white bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"

                  // className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full border border-gray-200"
                >
                  {role.title}
                </Link>))}
            </div>
          </Link>
        ))}
      </div>
      
      {data.employees.length === 0 && (
        <p className="text-gray-500 italic">Inga medarbetare hittades för denna kategori.</p>
      )}
    </main>
  );
}
